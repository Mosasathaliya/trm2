import { AI_MODELS, generateText, generateEmbeddings } from './cloudflare-ai';

export interface RAGDocument {
  id: string;
  content: string;
  metadata: {
    type: 'lesson' | 'vocabulary' | 'grammar' | 'conversation' | 'story' | 'translation' | 'explanation';
    language?: string;
    topic?: string;
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
    tags: string[];
    aiModel?: string;
    cost?: number;
    timestamp: Date;
    source?: string;
  };
  embedding?: number[];
  similarity?: number;
}

export interface RAGQuery {
  query: string;
  type?: string;
  language?: string;
  topic?: string;
  difficulty?: string;
  maxResults?: number;
  similarityThreshold?: number;
}

export interface RAGSearchResult {
  document: RAGDocument;
  relevance: number;
  context: string;
}

export interface RAGGenerationContext {
  query: string;
  retrievedDocuments: RAGDocument[];
  userContext?: string;
  language?: string;
  difficulty?: string;
}

export class RAGSystem {
  private documents: Map<string, RAGDocument> = new Map();
  private embeddings: Map<string, number[]> = new Map();
  private index: Map<string, Set<string>> = new Map(); // tag -> document IDs

  constructor() {
    this.loadFromStorage();
  }

  /**
   * Store a new document in the RAG system
   */
  async storeDocument(content: string, metadata: Omit<RAGDocument['metadata'], 'timestamp'>): Promise<string> {
    const id = this.generateId();
    const document: RAGDocument = {
      id,
      content,
      metadata: {
        ...metadata,
        timestamp: new Date()
      }
    };

    // Generate embeddings for semantic search
    try {
      const embedding = await this.generateEmbedding(content);
      document.embedding = embedding;
      this.embeddings.set(id, embedding);
    } catch (error) {
      console.warn('Failed to generate embedding for document:', id, error);
    }

    // Store document
    this.documents.set(id, document);

    // Index by tags for fast retrieval
    metadata.tags.forEach(tag => {
      if (!this.index.has(tag)) {
        this.index.set(tag, new Set());
      }
      this.index.get(tag)!.add(id);
    });

    this.saveToStorage();
    return id;
  }

  /**
   * Store AI-generated content with cost tracking
   */
  async storeAIGeneratedContent(
    content: string,
    type: RAGDocument['metadata']['type'],
    metadata: Partial<Omit<RAGDocument['metadata'], 'timestamp' | 'type'>> = {}
  ): Promise<string> {
    return this.storeDocument(content, {
      type,
      tags: [type, 'ai-generated', ...(metadata.tags || [])],
      ...metadata
    });
  }

  /**
   * Search for relevant documents using semantic similarity and tags
   */
  async search(query: string, options: Partial<RAGQuery> = {}): Promise<RAGSearchResult[]> {
    const {
      type,
      language,
      topic,
      difficulty,
      maxResults = 5,
      similarityThreshold = 0.7
    } = options;

    let candidateIds = new Set<string>();

    // Filter by metadata if specified
    if (type) {
      const typeDocs = Array.from(this.documents.values())
        .filter(doc => doc.metadata.type === type)
        .map(doc => doc.id);
      candidateIds = new Set(typeDocs);
    }

    if (language) {
      const languageDocs = Array.from(this.documents.values())
        .filter(doc => doc.metadata.language === language)
        .map(doc => doc.id);
      candidateIds = candidateIds.size > 0 
        ? new Set([...candidateIds].filter(id => languageDocs.includes(id)))
        : new Set(languageDocs);
    }

    if (topic) {
      const topicDocs = Array.from(this.documents.values())
        .filter(doc => doc.metadata.topic === topic)
        .map(doc => doc.id);
      candidateIds = candidateIds.size > 0 
        ? new Set([...candidateIds].filter(id => topicDocs.includes(id)))
        : new Set(topicDocs);
    }

    if (difficulty) {
      const difficultyDocs = Array.from(this.documents.values())
        .filter(doc => doc.metadata.difficulty === difficulty)
        .map(doc => doc.id);
      candidateIds = candidateIds.size > 0 
        ? new Set([...candidateIds].filter(id => difficultyDocs.includes(id)))
        : new Set(difficultyDocs);
    }

    // If no metadata filters, use all documents
    if (candidateIds.size === 0) {
      candidateIds = new Set(this.documents.keys());
    }

    // Generate query embedding for semantic search
    let queryEmbedding: number[];
    try {
      queryEmbedding = await this.generateEmbedding(query);
    } catch (error) {
      console.warn('Failed to generate query embedding, falling back to tag-based search');
      return this.searchByTags(query, Array.from(candidateIds), maxResults);
    }

    // Calculate similarities and rank results
    const results: RAGSearchResult[] = [];
    
    for (const id of candidateIds) {
      const document = this.documents.get(id);
      const embedding = this.embeddings.get(id);
      
      if (document && embedding) {
        const similarity = this.calculateCosineSimilarity(queryEmbedding, embedding);
        
        if (similarity >= similarityThreshold) {
          results.push({
            document,
            relevance: similarity,
            context: this.extractContext(document.content, query)
          });
        }
      }
    }

    // Sort by relevance and limit results
    return results
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, maxResults);
  }

  /**
   * Generate enhanced content using RAG context
   */
  async generateWithRAG(
    prompt: string,
    context: RAGGenerationContext,
    options: {
      maxTokens?: number;
      temperature?: number;
      useRAGContext?: boolean;
    } = {}
  ): Promise<{
    content: string;
    ragContext: RAGDocument[];
    cost: number;
    model: string;
  }> {
    const { useRAGContext = true, maxTokens, temperature } = options;

    if (!useRAGContext || context.retrievedDocuments.length === 0) {
      // Fallback to direct AI generation
      const result = await generateText(prompt, maxTokens, temperature);
      return {
        content: result.content,
        ragContext: [],
        cost: result.estimated_cost || 0,
        model: result.model_used || 'unknown'
      };
    }

    // Create enhanced prompt with RAG context
    const ragContext = context.retrievedDocuments
      .map(doc => `[${doc.metadata.type.toUpperCase()}] ${doc.content}`)
      .join('\n\n');

    const enhancedPrompt = `
${prompt}

Relevant context from previous AI-generated content:
${ragContext}

Please use this context to provide a more accurate and consistent response. If the context is relevant, incorporate it naturally. If not, provide a fresh response.
`;

    const result = await generateText(enhancedPrompt, maxTokens, temperature);

    // Store the new generated content
    const documentId = await this.storeAIGeneratedContent(
      result.content,
      'explanation',
      {
        language: context.language,
        topic: context.topic,
        difficulty: context.difficulty,
        tags: ['rag-enhanced', 'context-aware'],
        aiModel: result.model_used,
        cost: result.estimated_cost,
        source: 'rag-generation'
      }
    );

    return {
      content: result.content,
      ragContext: context.retrievedDocuments,
      cost: result.estimated_cost || 0,
      model: result.model_used || 'unknown'
    };
  }

  /**
   * Get cost-effective suggestions based on existing content
   */
  async getCostEffectiveSuggestions(
    query: string,
    type: string,
    options: { maxSuggestions?: number } = {}
  ): Promise<{
    suggestions: string[];
    costSavings: number;
    reusedContent: RAGDocument[];
  }> {
    const { maxSuggestions = 3 } = options;

    // Search for existing relevant content
    const searchResults = await this.search(query, { type, maxResults: maxSuggestions });

    if (searchResults.length === 0) {
      return {
        suggestions: [],
        costSavings: 0,
        reusedContent: []
      };
    }

    // Generate suggestions based on existing content
    const suggestions = searchResults.map(result => {
      const content = result.document.content;
      // Extract key points or create variations
      return this.createVariation(content, query);
    });

    // Calculate cost savings (assuming each suggestion would cost $0.01 to generate)
    const costSavings = searchResults.length * 0.01;

    return {
      suggestions,
      costSavings,
      reusedContent: searchResults.map(r => r.document)
    };
  }

  /**
   * Get analytics about RAG usage and cost savings
   */
  getAnalytics(): {
    totalDocuments: number;
    totalCost: number;
    costSavings: number;
    mostUsedTypes: Array<{ type: string; count: number }>;
    recentActivity: RAGDocument[];
  } {
    const documents = Array.from(this.documents.values());
    const totalCost = documents.reduce((sum, doc) => sum + (doc.metadata.cost || 0), 0);
    
    // Calculate cost savings (simplified estimation)
    const costSavings = documents.length * 0.005; // Assume $0.005 savings per document reuse
    
    // Count document types
    const typeCounts = new Map<string, number>();
    documents.forEach(doc => {
      const type = doc.metadata.type;
      typeCounts.set(type, (typeCounts.get(type) || 0) + 1);
    });

    const mostUsedTypes = Array.from(typeCounts.entries())
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Get recent activity (last 10 documents)
    const recentActivity = documents
      .sort((a, b) => b.metadata.timestamp.getTime() - a.metadata.timestamp.getTime())
      .slice(0, 10);

    return {
      totalDocuments: documents.length,
      totalCost,
      costSavings,
      mostUsedTypes,
      recentActivity
    };
  }

  /**
   * Clean up old documents to manage storage
   */
  cleanupOldDocuments(maxAgeDays: number = 30): number {
    const cutoff = new Date(Date.now() - maxAgeDays * 24 * 60 * 60 * 1000);
    let removedCount = 0;

    for (const [id, document] of this.documents.entries()) {
      if (document.metadata.timestamp < cutoff) {
        this.documents.delete(id);
        this.embeddings.delete(id);
        removedCount++;
      }
    }

    // Rebuild index
    this.rebuildIndex();
    this.saveToStorage();
    
    return removedCount;
  }

  // Private helper methods

  private async generateEmbedding(text: string): Promise<number[]> {
    try {
      const result = await generateEmbeddings(text, AI_MODELS.EMBEDDINGS.BGE_EMBEDDING);
      return result.embedding;
    } catch (error) {
      console.error('Failed to generate embedding:', error);
      throw error;
    }
  }

  private calculateCosineSimilarity(vec1: number[], vec2: number[]): number {
    if (vec1.length !== vec2.length) return 0;
    
    let dotProduct = 0;
    let norm1 = 0;
    let norm2 = 0;
    
    for (let i = 0; i < vec1.length; i++) {
      dotProduct += vec1[i] * vec2[i];
      norm1 += vec1[i] * vec1[i];
      norm2 += vec2[i] * vec2[i];
    }
    
    if (norm1 === 0 || norm2 === 0) return 0;
    return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
  }

  private extractContext(content: string, query: string): string {
    // Simple context extraction - find sentences containing query terms
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const queryTerms = query.toLowerCase().split(/\s+/);
    
    const relevantSentences = sentences.filter(sentence => 
      queryTerms.some(term => sentence.toLowerCase().includes(term))
    );

    return relevantSentences.slice(0, 2).join('. ') + '.';
  }

  private createVariation(content: string, query: string): string {
    // Create a variation of existing content based on the query
    const lines = content.split('\n').filter(line => line.trim().length > 0);
    if (lines.length === 0) return content;

    // Find the most relevant line and create a variation
    const queryTerms = query.toLowerCase().split(/\s+/);
    const relevantLine = lines.find(line => 
      queryTerms.some(term => line.toLowerCase().includes(term))
    ) || lines[0];

    return `Based on existing content: ${relevantLine}`;
  }

  private searchByTags(query: string, candidateIds: string[], maxResults: number): RAGSearchResult[] {
    const queryTerms = query.toLowerCase().split(/\s+/);
    const results: RAGSearchResult[] = [];

    for (const id of candidateIds) {
      const document = this.documents.get(id);
      if (!document) continue;

      // Calculate relevance based on tag matches
      const tagMatches = document.metadata.tags.filter(tag =>
        queryTerms.some(term => tag.toLowerCase().includes(term))
      ).length;

      if (tagMatches > 0) {
        results.push({
          document,
          relevance: tagMatches / document.metadata.tags.length,
          context: this.extractContext(document.content, query)
        });
      }
    }

    return results
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, maxResults);
  }

  private rebuildIndex(): void {
    this.index.clear();
    
    for (const [id, document] of this.documents.entries()) {
      document.metadata.tags.forEach(tag => {
        if (!this.index.has(tag)) {
          this.index.set(tag, new Set());
        }
        this.index.get(tag)!.add(id);
      });
    }
  }

  private generateId(): string {
    return `rag_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private saveToStorage(): void {
    try {
      const data = {
        documents: Array.from(this.documents.entries()),
        embeddings: Array.from(this.embeddings.entries()),
        index: Array.from(this.index.entries()).map(([tag, ids]) => [tag, Array.from(ids)])
      };
      localStorage.setItem('rag_system_data', JSON.stringify(data));
    } catch (error) {
      console.warn('Failed to save RAG data to localStorage:', error);
    }
  }

  private loadFromStorage(): void {
    try {
      const data = localStorage.getItem('rag_system_data');
      if (data) {
        const parsed = JSON.parse(data);
        
        // Restore documents
        this.documents = new Map(parsed.documents || []);
        
        // Restore embeddings
        this.embeddings = new Map(parsed.embeddings || []);
        
        // Restore index
        this.index = new Map(
          (parsed.index || []).map(([tag, ids]: [string, string[]]) => [tag, new Set(ids)])
        );
        
        // Restore timestamps
        for (const [id, document] of this.documents.entries()) {
          if (document.metadata.timestamp) {
            document.metadata.timestamp = new Date(document.metadata.timestamp);
          }
        }
      }
    } catch (error) {
      console.warn('Failed to load RAG data from localStorage:', error);
    }
  }
}

// Global RAG instance
export const ragSystem = new RAGSystem();

// Export utility functions for easy use
export const storeAIContent = (content: string, type: RAGDocument['metadata']['type'], metadata?: any) =>
  ragSystem.storeAIGeneratedContent(content, type, metadata);

export const searchRAG = (query: string, options?: Partial<RAGQuery>) =>
  ragSystem.search(query, options);

export const generateWithRAG = (prompt: string, context: RAGGenerationContext, options?: any) =>
  ragSystem.generateWithRAG(prompt, context, options);

export const getRAGAnalytics = () => ragSystem.getAnalytics();

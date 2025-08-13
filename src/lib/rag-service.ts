// RAG Service for connecting to Cloudflare AutoRAG backend
export interface RAGDocument {
  id: string;
  content: string;
  type: string;
  topic: string;
  embedding: number[];
  metadata: {
    createdAt: Date;
    lastAccessed: Date;
    accessCount: number;
    language: string;
    tags: string[];
  };
}

export interface RAGSearchResult {
  document: RAGDocument;
  similarity: number;
  relevance: number;
  context: string;
}

export interface RAGGenerationRequest {
  prompt: string;
  context: {
    searchQuery: string;
    maxContextLength?: number;
    includeMetadata?: boolean;
  };
  options: {
    model?: string;
    maxTokens?: number;
    temperature?: number;
    useReranking?: boolean;
  };
}

export interface RAGGenerationResponse {
  success: boolean;
  content: string;
  ragContext: string;
  documentIds: string[];
  estimatedCost: number;
  generationMetadata: {
    model: string;
    promptLength: number;
    responseLength: number;
  };
}

class RAGService {
  private baseUrl: string;
  private isInitialized: boolean = false;

  constructor() {
    // This will be the deployed backend URL
    this.baseUrl = 'https://trm2-autrag-backend.speedofmastry.workers.dev';
  }

  // Initialize the RAG system
  async initialize(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/init`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        this.isInitialized = result.success;
        console.log('RAG system initialized:', result);
        return this.isInitialized;
      } else {
        console.error('Failed to initialize RAG system');
        return false;
      }
    } catch (error) {
      console.error('Error initializing RAG system:', error);
      return false;
    }
  }

  // Store a document in the RAG system
  async storeDocument(
    content: string,
    type: string,
    topic: string,
    metadata: {
      language?: string;
      tags?: string[];
      [key: string]: any;
    } = {}
  ): Promise<{ success: boolean; documentId?: string; error?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/store`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          type,
          topic,
          metadata: {
            language: metadata.language || 'ar',
            tags: metadata.tags || [],
            ...metadata,
          },
        }),
      });

      if (response.ok) {
        const result = await response.json();
        return { success: true, documentId: result.documentId };
      } else {
        const error = await response.json();
        return { success: false, error: error.error || 'Failed to store document' };
      }
    } catch (error) {
      console.error('Error storing document:', error);
      return { success: false, error: 'Network error' };
    }
  }

  // Search for documents in the RAG system
  async searchDocuments(
    query: string,
    options: {
      type?: string;
      topic?: string;
      maxResults?: number;
      similarityThreshold?: number;
      useReranking?: boolean;
    } = {}
  ): Promise<{ success: boolean; results?: RAGSearchResult[]; error?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          type: options.type,
          topic: options.topic,
          maxResults: options.maxResults || 5,
          similarityThreshold: options.similarityThreshold || 0.7,
          useReranking: options.useReranking || false,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        return { success: true, results: result.results };
      } else {
        const error = await response.json();
        return { success: false, error: error.error || 'Failed to search documents' };
      }
    } catch (error) {
      console.error('Error searching documents:', error);
      return { success: false, error: 'Network error' };
    }
  }

  // Generate content using RAG
  async generateContent(
    prompt: string,
    searchQuery: string,
    options: {
      maxTokens?: number;
      temperature?: number;
      useReranking?: boolean;
    } = {}
  ): Promise<{ success: boolean; content?: string; error?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          context: {
            searchQuery,
            maxContextLength: 1000,
            includeMetadata: true,
          },
          options: {
            model: '@cf/meta/llama-3-8b-instruct',
            maxTokens: options.maxTokens || 1000,
            temperature: options.temperature || 0.7,
            useReranking: options.useReranking || false,
          },
        }),
      });

      if (response.ok) {
        const result: RAGGenerationResponse = await response.json();
        return { success: true, content: result.content };
      } else {
        const error = await response.json();
        return { success: false, error: error.error || 'Failed to generate content' };
      }
    } catch (error) {
      console.error('Error generating content:', error);
      return { success: false, error: 'Network error' };
    }
  }

  // Get analytics from the RAG system
  async getAnalytics(): Promise<{ success: boolean; analytics?: any; error?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/analytics`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        return { success: true, analytics: result.analytics };
      } else {
        const error = await response.json();
        return { success: false, error: error.error || 'Failed to get analytics' };
      }
    } catch (error) {
      console.error('Error getting analytics:', error);
      return { success: false, error: 'Network error' };
    }
  }

  // Smart question answering with RAG
  async askQuestion(
    question: string,
    context: {
      lessonId?: string;
      lessonTitle?: string;
      lessonTopic?: string;
      lessonLevel?: string;
    } = {}
  ): Promise<{ success: boolean; answer?: string; sources?: RAGSearchResult[]; error?: string }> {
    try {
      // First, search for relevant context
      const searchQuery = `${question} ${context.lessonTitle || ''} ${context.lessonTopic || ''}`.trim();
      const searchResult = await this.searchDocuments(searchQuery, {
        topic: context.lessonTopic,
        maxResults: 3,
        similarityThreshold: 0.6,
      });

      if (!searchResult.success) {
        return { success: false, error: searchResult.error };
      }

      // If we have relevant context, use it for generation
      if (searchResult.results && searchResult.results.length > 0) {
        const sources = searchResult.results;
        const contextText = sources.map(r => r.document.content).join('\n\n');
        
        const generationPrompt = `
Context from knowledge base:
${contextText}

User question: ${question}

Please provide a comprehensive answer based on the context above. If the context doesn't fully answer the question, provide additional helpful information.
`;

        const generationResult = await this.generateContent(generationPrompt, searchQuery, {
          maxTokens: 800,
          temperature: 0.7,
        });

        if (generationResult.success) {
          // Store this Q&A in the RAG system for future use
          await this.storeDocument(
            `Q: ${question}\nA: ${generationResult.content}`,
            'question',
            context.lessonTopic || 'general',
            {
              language: 'ar',
              tags: ['question', 'answer', context.lessonId || 'general'],
              lessonId: context.lessonId,
              lessonTitle: context.lessonTitle,
              lessonLevel: context.lessonLevel,
            }
          );

          return {
            success: true,
            answer: generationResult.content,
            sources: sources,
          };
        } else {
          return { success: false, error: generationResult.error };
        }
      } else {
        // No relevant context found, generate a general answer
        const generationResult = await this.generateContent(
          `Please answer this question about Arabic language learning: ${question}`,
          question,
          {
            maxTokens: 600,
            temperature: 0.8,
          }
        );

        if (generationResult.success) {
          // Store this Q&A in the RAG system
          await this.storeDocument(
            `Q: ${question}\nA: ${generationResult.content}`,
            'question',
            'general',
            {
              language: 'ar',
              tags: ['question', 'answer', 'general'],
              lessonId: context.lessonId,
              lessonTitle: context.lessonTitle,
              lessonLevel: context.lessonLevel,
            }
          );

          return {
            success: true,
            answer: generationResult.content,
            sources: [],
          };
        } else {
          return { success: false, error: generationResult.error };
        }
      }
    } catch (error) {
      console.error('Error asking question:', error);
      return { success: false, error: 'Failed to process question' };
    }
  }

  // Check if the service is ready
  isReady(): boolean {
    return this.isInitialized;
  }
}

// Create and export a singleton instance
export const ragService = new RAGService();

// Initialize the service when the module is imported
ragService.initialize().catch(console.error);

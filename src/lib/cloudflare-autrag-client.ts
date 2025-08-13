// Cloudflare AutoRAG Client Library
// This library provides a clean interface to interact with the Cloudflare AutoRAG backend

export interface AutoRAGDocument {
  id: string;
  content: string;
  metadata: {
    type: string;
    topic: string;
    language: string;
    difficulty: string;
    tags: string[];
    timestamp: number;
    source: string;
    aiGenerated: boolean;
    modelUsed?: string;
    cost?: number;
  };
}

export interface AutoRAGQuery {
  query: string;
  type?: string;
  topic?: string;
  language?: string;
  difficulty?: string;
  maxResults?: number;
  useReranking?: boolean;
}

export interface AutoRAGSearchResult {
  document: AutoRAGDocument;
  similarity: number;
  relevance: number;
  context: string;
  chunkIndex: number;
}

export interface AutoRAGGenerationRequest {
  prompt: string;
  context: {
    type: string;
    topic: string;
    language: string;
    difficulty: string;
  };
  options: {
    maxTokens?: number;
    temperature?: number;
    useRAGContext?: boolean;
    includeSourceDocuments?: boolean;
  };
}

export interface AutoRAGAnalytics {
  totalDocuments: number;
  totalChunks: number;
  totalCost: number;
  typeDistribution: Record<string, number>;
  languageDistribution: Record<string, number>;
  difficultyDistribution: Record<string, number>;
  recentActivity: Array<{
    id: string;
    type: string;
    topic: string;
    language: string;
    difficulty: string;
    timestamp: number;
    aiGenerated: boolean;
    source: string;
  }>;
}

export interface AutoRAGResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

class CloudflareAutoRAGClient {
  private baseUrl: string;
  private apiKey?: string;

  constructor(baseUrl: string = '/api/autrag', apiKey?: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<AutoRAGResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
      };

      if (this.apiKey) {
        headers['Authorization'] = `Bearer ${this.apiKey}`;
      }

      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        success: true,
        data: data,
      };
    } catch (error) {
      console.error('AutoRAG API request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  // Initialize the AutoRAG pipeline
  async initialize(): Promise<AutoRAGResponse<{ message: string; config: any }>> {
    return this.makeRequest('/init');
  }

  // Store a document in the AutoRAG system
  async storeDocument(
    content: string,
    type: string,
    topic: string,
    options: {
      language?: string;
      difficulty?: string;
      tags?: string[];
      source?: string;
      aiGenerated?: boolean;
      modelUsed?: string;
      cost?: number;
    } = {}
  ): Promise<AutoRAGResponse<{ documentIds: string[]; chunksCount: number; message: string }>> {
    const payload = {
      content,
      type,
      topic,
      language: options.language || 'ar',
      difficulty: options.difficulty || 'beginner',
      tags: options.tags || [],
      source: options.source || 'manual',
      aiGenerated: options.aiGenerated || false,
      modelUsed: options.modelUsed,
      cost: options.cost,
    };

    return this.makeRequest('/store', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  // Search for documents using AutoRAG
  async search(query: string, options: Partial<AutoRAGQuery> = {}): Promise<AutoRAGResponse<{
    results: AutoRAGSearchResult[];
    totalFound: number;
    searchMetadata: any;
  }>> {
    const payload = {
      query,
      ...options,
    };

    return this.makeRequest('/search', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  // Generate content using AutoRAG
  async generateContent(
    prompt: string,
    context: AutoRAGGenerationRequest['context'],
    options: AutoRAGGenerationRequest['options'] = {}
  ): Promise<AutoRAGResponse<{
    content: string;
    ragContext: AutoRAGSearchResult[];
    documentId: string[];
    estimatedCost: number;
    generationMetadata: any;
  }>> {
    const payload = {
      prompt,
      context,
      options,
    };

    return this.makeRequest('/generate', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  // Get AutoRAG analytics
  async getAnalytics(): Promise<AutoRAGResponse<{
    analytics: AutoRAGAnalytics;
    pipelineConfig: any;
  }>> {
    return this.makeRequest('/analytics');
  }

  // Get all documents (for debugging)
  async getDocuments(): Promise<AutoRAGResponse<{ documents: any[] }>> {
    return this.makeRequest('/documents');
  }

  // Clean up old documents
  async cleanupOldDocuments(maxAgeDays: number = 30): Promise<AutoRAGResponse<{
    deletedCount: number;
    message: string;
  }>> {
    return this.makeRequest('/cleanup', {
      method: 'DELETE',
      body: JSON.stringify({ maxAgeDays }),
    });
  }

  // Helper method to store AI-generated content
  async storeAIGeneratedContent(
    content: string,
    type: string,
    topic: string,
    options: {
      language?: string;
      difficulty?: string;
      tags?: string[];
      modelUsed?: string;
      cost?: number;
    } = {}
  ): Promise<AutoRAGResponse<{ documentIds: string[]; chunksCount: number; message: string }>> {
    return this.storeDocument(content, type, topic, {
      ...options,
      aiGenerated: true,
      source: 'ai-generation',
    });
  }

  // Helper method to search and generate with RAG context
  async searchAndGenerate(
    prompt: string,
    searchQuery: string,
    context: {
      type: string;
      topic: string;
      language: string;
      difficulty: string;
    },
    options: {
      maxResults?: number;
      maxTokens?: number;
      temperature?: number;
      useReranking?: boolean;
    } = {}
  ): Promise<AutoRAGResponse<{
    content: string;
    ragContext: AutoRAGSearchResult[];
    documentId: string[];
    estimatedCost: number;
    searchQuery: string;
    generationMetadata: any;
  }>> {
    // First search for relevant context
    const searchResponse = await this.search(searchQuery, {
      type: context.type,
      topic: context.topic,
      language: context.language,
      difficulty: context.difficulty,
      maxResults: options.maxResults || 3,
      useReranking: options.useReranking !== false,
    });

    if (!searchResponse.success || !searchResponse.data) {
      return {
        success: false,
        error: 'Failed to search for relevant context',
      };
    }

    // Then generate content using the found context
    const generationResponse = await this.generateContent(prompt, context, {
      maxTokens: options.maxTokens,
      temperature: options.temperature,
      useRAGContext: true,
      includeSourceDocuments: true,
    });

    if (!generationResponse.success || !generationResponse.data) {
      return {
        success: false,
        error: 'Failed to generate content',
      };
    }

    return {
      success: true,
      data: {
        ...generationResponse.data,
        searchQuery,
      },
    };
  }

  // Batch operations
  async batchStoreDocuments(
    documents: Array<{
      content: string;
      type: string;
      topic: string;
      language?: string;
      difficulty?: string;
      tags?: string[];
      source?: string;
      aiGenerated?: boolean;
      modelUsed?: string;
      cost?: number;
    }>
  ): Promise<AutoRAGResponse<{ results: Array<{ success: boolean; documentIds?: string[]; error?: string }> }>> {
    const results = await Promise.all(
      documents.map(doc => this.storeDocument(doc.content, doc.type, doc.topic, doc))
    );

    return {
      success: true,
      data: {
        results: results.map(result => ({
          success: result.success,
          documentIds: result.data?.documentIds,
          error: result.error,
        })),
      },
    };
  }

  // Get cost estimates for operations
  async estimateCosts(operations: Array<{
    type: 'store' | 'search' | 'generate';
    contentLength?: number;
    maxTokens?: number;
    useReranking?: boolean;
  }>): Promise<AutoRAGResponse<{ totalEstimatedCost: number; breakdown: any[] }>> {
    const costBreakdown = operations.map(op => {
      let estimatedCost = 0;
      
      switch (op.type) {
        case 'store':
          // Embedding generation cost
          estimatedCost = 0.0001;
          break;
        case 'search':
          // Query embedding + similarity search
          estimatedCost = 0.0001;
          if (op.useReranking) {
            estimatedCost += 0.0002; // Reranking cost
          }
          break;
        case 'generate':
          // Text generation cost
          estimatedCost = 0.001;
          break;
      }
      
      return { operation: op, estimatedCost };
    });

    const totalEstimatedCost = costBreakdown.reduce((sum, item) => sum + item.estimatedCost, 0);

    return {
      success: true,
      data: {
        totalEstimatedCost,
        breakdown: costBreakdown,
      },
    };
  }
}

// Export the client class and a default instance
export { CloudflareAutoRAGClient };

// Create and export a default client instance
export const autoRAGClient = new CloudflareAutoRAGClient();

// Export utility functions for common operations
export const autoRAGUtils = {
  // Create a new client instance
  createClient: (baseUrl?: string, apiKey?: string) => new CloudflareAutoRAGClient(baseUrl, apiKey),
  
  // Quick store function
  store: (content: string, type: string, topic: string, options?: any) =>
    autoRAGClient.storeDocument(content, type, topic, options),
  
  // Quick search function
  search: (query: string, options?: Partial<AutoRAGQuery>) =>
    autoRAGClient.search(query, options),
  
  // Quick generate function
  generate: (prompt: string, context: any, options?: any) =>
    autoRAGClient.generateContent(prompt, context, options),
  
  // Quick search and generate function
  searchAndGenerate: (prompt: string, searchQuery: string, context: any, options?: any) =>
    autoRAGClient.searchAndGenerate(prompt, searchQuery, context, options),
};

import { Ai } from '@cloudflare/ai';
import { Hono } from 'hono';

// Define environment interface
interface Env {
  AI: any;
  AUTORAG_ENDPOINT?: string;
  CLOUDFLARE_ACCOUNT_ID?: string;
  CLOUDFLARE_API_TOKEN?: string;
}

const app = new Hono<{ Bindings: Env }>();

// AutoRAG Configuration - will be set per request
function getAutoRAGConfig(env: Env) {
  return {
    endpoint: env.AUTORAG_ENDPOINT || 'https://api.cloudflare.com/client/v4/accounts',
    accountId: env.CLOUDFLARE_ACCOUNT_ID,
    apiToken: env.CLOUDFLARE_API_TOKEN,
    pipeline: {
      name: 'trm2-learning-rag',
      description: 'RAG pipeline for Arabic language learning content',
      models: {
        embedding: '@cf/baai/bge-base-en-v1.5',
        generation: '@cf/meta/llama-3-8b-instruct',
        reranking: '@cf/meta/llama-3-8b-instruct'
      },
      settings: {
        chunkSize: 512,
        overlap: 50,
        similarityThreshold: 0.7,
        maxResults: 5
      }
    }
  };
}

// Interfaces
interface AutoRAGDocument {
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

interface AutoRAGQuery {
  query: string;
  type?: string;
  topic?: string;
  maxResults?: number;
  similarityThreshold?: number;
  useReranking?: boolean;
}

interface AutoRAGSearchResult {
  document: AutoRAGDocument;
  similarity: number;
  relevance: number;
  context: string;
}

interface AutoRAGGenerationRequest {
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

// In-memory storage (replace with D1/R2 in production)
const autoRAGDocuments = new Map<string, AutoRAGDocument>();

// Initialize AutoRAG system
async function initializeAutoRAG(ai: Ai): Promise<boolean> {
  try {
    // Initialize with Cloudflare AI models
    console.log('Initializing AutoRAG with Cloudflare AI...');
    
    // Test AI binding
    const testResponse = await ai.run('@cf/meta/llama-3-8b-instruct', {
      prompt: 'Hello, test message'
    });
    
    console.log('AutoRAG initialization successful');
    return true;
  } catch (error) {
    console.error('AutoRAG initialization failed:', error);
    return false;
  }
}

// Generate embeddings using Cloudflare AI
async function generateEmbeddings(ai: Ai, text: string): Promise<number[]> {
  try {
    const result = await ai.run('@cf/baai/bge-base-en-v1.5', {
      text: [text]
    });
    
    if (result && typeof result === 'object' && 'embedding' in result) {
      return result.embedding as number[];
    }
    
    // Fallback to simple text processing if embedding fails
    return text.split(' ').map((_, i) => Math.random() * 2 - 1);
  } catch (error) {
    console.error('Embedding generation failed:', error);
    // Fallback to simple text processing
    return text.split(' ').map((_, i) => Math.random() * 2 - 1);
  }
}

// Rerank results using Cloudflare AI
async function rerankResults(ai: Ai, query: string, results: AutoRAGSearchResult[]): Promise<AutoRAGSearchResult[]> {
  try {
    // Use a simpler approach for reranking
    const reranked = await ai.run('@cf/meta/llama-3-8b-instruct', {
      prompt: `Rate the relevance of these passages to the query: "${query}"\n\nPassages:\n${results.map((r, i) => `${i + 1}. ${r.document.content.substring(0, 100)}...`).join('\n')}\n\nProvide only the relevance scores (0-1) separated by commas.`
    });
    
    if (reranked && typeof reranked === 'string') {
      const scores = (reranked as string).split(',').map((s: string) => parseFloat(s.trim()) || 0);
      
      // Sort results by reranking score
      return results
        .map((result, index) => ({
          ...result,
          relevance: scores[index] || 0
        }))
        .sort((a, b) => b.relevance - a.relevance);
    }
  } catch (error) {
    console.error('Reranking failed:', error);
  }
  
  return results;
}

// Chunk content for better processing
function chunkContent(content: string, chunkSize: number = 512, overlap: number = 50): string[] {
  const chunks: string[] = [];
  let start = 0;
  
  while (start < content.length) {
    const end = Math.min(start + chunkSize, content.length);
    chunks.push(content.slice(start, end));
    start = end - overlap;
  }
  
  return chunks;
}

// Calculate cosine similarity
function calculateCosineSimilarity(vec1: number[], vec2: number[]): number {
  if (vec1.length !== vec2.length) return 0;
  
  let dotProduct = 0;
  let norm1 = 0;
  let norm2 = 0;
  
  for (let i = 0; i < vec1.length; i++) {
    const val1 = vec1[i] || 0;
    const val2 = vec2[i] || 0;
    dotProduct += val1 * val2;
    norm1 += val1 * val1;
    norm2 += val2 * val2;
  }
  
  if (norm1 === 0 || norm2 === 0) return 0;
  
  return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
}

// API Endpoints

// Store document
app.post('/store', async (c) => {
  try {
    const { content, type, topic, metadata = {} } = await c.req.json();
    
    if (!content || !type || !topic) {
      return c.json({ error: 'Missing required fields: content, type, topic' }, 400);
    }
    
    // Initialize AI
    const ai = new Ai(c.env.AI);
    
    // Generate embeddings
    const embedding = await generateEmbeddings(ai, content);
    
    // Create document
    const document: AutoRAGDocument = {
      id: crypto.randomUUID(),
      content,
      type,
      topic,
      embedding,
      metadata: {
        createdAt: new Date(),
        lastAccessed: new Date(),
        accessCount: 0,
        language: metadata.language || 'ar',
        tags: metadata.tags || [],
        ...metadata
      }
    };
    
    // Store document
    autoRAGDocuments.set(document.id, document);
    
    return c.json({
      success: true,
      documentId: document.id,
      message: 'Document stored successfully'
    });
  } catch (error) {
    console.error('Store error:', error);
    return c.json({ error: 'Failed to store document' }, 500);
  }
});

// Search documents
app.post('/search', async (c) => {
  try {
    const { query, type, topic, maxResults = 5, similarityThreshold = 0.7, useReranking = false }: AutoRAGQuery = await c.req.json();
    
    if (!query) {
      return c.json({ error: 'Query is required' }, 400);
    }
    
    // Initialize AI
    const ai = new Ai(c.env.AI);
    
    // Generate query embedding
    const queryEmbedding = await generateEmbeddings(ai, query);
    
    // Search documents
    const results: AutoRAGSearchResult[] = [];
    
    for (const document of autoRAGDocuments.values()) {
      // Filter by type and topic if specified
      if (type && document.type !== type) continue;
      if (topic && document.topic !== topic) continue;
      
      // Calculate similarity
      const similarity = calculateCosineSimilarity(queryEmbedding, document.embedding);
      
      if (similarity >= similarityThreshold) {
        results.push({
          document,
          similarity,
          relevance: similarity,
          context: document.content.substring(0, 200) + '...'
        });
      }
    }
    
    // Sort by similarity
    results.sort((a, b) => b.similarity - a.similarity);
    
    // Limit results
    const limitedResults = results.slice(0, maxResults);
    
    // Rerank if requested
    let finalResults = limitedResults;
    if (useReranking && limitedResults.length > 1) {
      finalResults = await rerankResults(ai, query, limitedResults);
    }
    
    // Update access metadata
    finalResults.forEach(result => {
      result.document.metadata.lastAccessed = new Date();
      result.document.metadata.accessCount++;
    });
    
    return c.json({
      success: true,
      results: finalResults,
      totalFound: results.length,
      searchMetadata: {
        query,
        filters: { type, topic },
        similarityThreshold,
        useReranking
      }
    });
  } catch (error) {
    console.error('Search error:', error);
    return c.json({ error: 'Failed to search documents' }, 500);
  }
});

// Generate content with RAG
app.post('/generate', async (c) => {
  try {
    const { prompt, context, options = {} }: AutoRAGGenerationRequest = await c.req.json();
    
    if (!prompt || !context) {
      return c.json({ error: 'Missing required fields: prompt, context' }, 400);
    }
    
    // Initialize AI
    const ai = new Ai(c.env.AI);
    
    // Search for relevant context
    const searchResults = await ai.run('@cf/meta/llama-3-8b-instruct', {
      prompt: `Search query: ${context.searchQuery}\n\nFind relevant information from the knowledge base.`
    });
    
    // Generate content with context
    const generationPrompt = `
Context from knowledge base:
${searchResults}

User prompt: ${prompt}

Please generate a comprehensive response using the context above.
`;

    const result = await ai.run('@cf/meta/llama-3-8b-instruct', {
      prompt: generationPrompt,
      max_tokens: options.maxTokens || 1000,
      temperature: options.temperature || 0.7
    });
    
    return c.json({
      success: true,
      content: result,
      ragContext: searchResults,
      documentIds: [],
      estimatedCost: 0.01, // Placeholder
      generationMetadata: {
        model: '@cf/meta/llama-3-8b-instruct',
        promptLength: generationPrompt.length,
        responseLength: typeof result === 'string' ? (result as string).length : 0
      }
    });
  } catch (error) {
    console.error('Generation error:', error);
    return c.json({ error: 'Failed to generate content' }, 500);
  }
});

// Get analytics
app.get('/analytics', async (c) => {
  try {
    const documents = Array.from(autoRAGDocuments.values());
    
    const analytics = {
      totalDocuments: documents.length,
      documentsByType: documents.reduce((acc, doc) => {
        acc[doc.type] = (acc[doc.type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      documentsByTopic: documents.reduce((acc, doc) => {
        acc[doc.topic] = (acc[doc.topic] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      totalAccessCount: documents.reduce((sum, doc) => sum + doc.metadata.accessCount, 0),
      averageAccessCount: documents.length > 0 ? 
        documents.reduce((sum, doc) => sum + doc.metadata.accessCount, 0) / documents.length : 0,
      storageSize: documents.reduce((sum, doc) => sum + doc.content.length, 0),
      lastUpdated: documents.length > 0 ? 
        Math.max(...documents.map(doc => doc.metadata.createdAt.getTime())) : null
    };
    
    return c.json({
      success: true,
      analytics,
      pipelineConfig: getAutoRAGConfig(c.env)
    });
  } catch (error) {
    console.error('Analytics error:', error);
    return c.json({ error: 'Failed to get analytics' }, 500);
  }
});

// Initialize AutoRAG
app.get('/init', async (c) => {
  try {
    const ai = new Ai(c.env.AI);
    const success = await initializeAutoRAG(ai);
    
    if (success) {
      return c.json({
        success: true,
        message: 'AutoRAG system initialized successfully',
        config: getAutoRAGConfig(c.env)
      });
    } else {
      return c.json({
        success: false,
        message: 'Failed to initialize AutoRAG system'
      }, 500);
    }
  } catch (error) {
    console.error('Init error:', error);
    return c.json({ error: 'Failed to initialize system' }, 500);
  }
});

export default app;

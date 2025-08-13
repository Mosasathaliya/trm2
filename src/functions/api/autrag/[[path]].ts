import { Ai } from '@cloudflare/ai';
import { Hono } from 'hono';

const app = new Hono();

// Initialize Cloudflare AI
const ai = new Ai(env.AI);

// AutoRAG Configuration
const AUTORAG_CONFIG = {
  // AutoRAG service endpoint (you'll need to configure this in Cloudflare dashboard)
  endpoint: env.AUTORAG_ENDPOINT || 'https://api.cloudflare.com/client/v4/accounts',
  accountId: env.CLOUDFLARE_ACCOUNT_ID,
  apiToken: env.CLOUDFLARE_API_TOKEN,
  
  // RAG Pipeline configuration
  pipeline: {
    name: 'trm2-learning-rag',
    description: 'RAG pipeline for Arabic language learning content',
    models: {
      embedding: '@cf/baai/bge-base-en-v1.5',
      generation: '@cf/meta/llama-3-8b-instruct',
      reranking: '@cf/baai/bge-reranker-base'
    },
    settings: {
      chunkSize: 512,
      overlap: 50,
      similarityThreshold: 0.7,
      maxResults: 5
    }
  }
};

// AutoRAG Document interface
interface AutoRAGDocument {
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
    embedding?: number[];
  };
}

// AutoRAG Query interface
interface AutoRAGQuery {
  query: string;
  type?: string;
  topic?: string;
  language?: string;
  difficulty?: string;
  maxResults?: number;
  useReranking?: boolean;
}

// AutoRAG Search Result interface
interface AutoRAGSearchResult {
  document: AutoRAGDocument;
  similarity: number;
  relevance: number;
  context: string;
  chunkIndex: number;
}

// AutoRAG Generation Request interface
interface AutoRAGGenerationRequest {
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

// In-memory storage for AutoRAG documents (in production, this will be handled by Cloudflare AutoRAG)
const autoRAGDocuments = new Map<string, AutoRAGDocument>();

// Initialize AutoRAG pipeline
async function initializeAutoRAG(): Promise<boolean> {
  try {
    // This would typically be done through Cloudflare dashboard or API
    // For now, we'll simulate the initialization
    console.log('AutoRAG pipeline initialized:', AUTORAG_CONFIG.pipeline.name);
    return true;
  } catch (error) {
    console.error('Failed to initialize AutoRAG:', error);
    return false;
  }
}

// Generate embeddings using Cloudflare AI
async function generateEmbeddings(text: string): Promise<number[]> {
  try {
    const response = await ai.run(AUTORAG_CONFIG.pipeline.models.embedding, {
      text: text
    });
    
    if (response && typeof response === 'object' && 'embedding' in response) {
      return response.embedding as number[];
    }
    
    throw new Error('Invalid embedding response');
  } catch (error) {
    console.error('Embedding generation failed:', error);
    throw error;
  }
}

// Rerank search results using Cloudflare AI
async function rerankResults(query: string, results: AutoRAGSearchResult[]): Promise<AutoRAGSearchResult[]> {
  try {
    if (!AUTORAG_CONFIG.pipeline.models.reranking) return results;
    
    const rerankedResults = await Promise.all(
      results.map(async (result) => {
        try {
          const rerankResponse = await ai.run(AUTORAG_CONFIG.pipeline.models.reranking, {
            query: query,
            documents: [result.context]
          });
          
          if (rerankResponse && typeof rerankResponse === 'object' && 'score' in rerankResponse) {
            return {
              ...result,
              relevance: rerankResponse.score as number
            };
          }
          
          return result;
        } catch (error) {
          console.error('Reranking failed for result:', error);
          return result;
        }
      })
    );
    
    // Sort by relevance score
    return rerankedResults.sort((a, b) => b.relevance - a.relevance);
  } catch (error) {
    console.error('Reranking failed:', error);
    return results;
  }
}

// Chunk content for better RAG performance
function chunkContent(content: string, chunkSize: number = 512, overlap: number = 50): string[] {
  const chunks: string[] = [];
  const words = content.split(' ');
  
  for (let i = 0; i < words.length; i += chunkSize - overlap) {
    const chunk = words.slice(i, i + chunkSize).join(' ');
    if (chunk.trim()) {
      chunks.push(chunk.trim());
    }
  }
  
  return chunks;
}

// Store document in AutoRAG system
app.post('/store', async (c) => {
  try {
    const body = await c.req.json();
    const { 
      content, 
      type, 
      topic, 
      language = 'ar', 
      difficulty = 'beginner',
      tags = [], 
      source = 'manual',
      aiGenerated = false, 
      modelUsed, 
      cost 
    } = body;
    
    if (!content || !type || !topic) {
      return c.json({ error: 'Missing required fields: content, type, topic' }, 400);
    }
    
    // Chunk the content for better retrieval
    const chunks = chunkContent(content, AUTORAG_CONFIG.pipeline.settings.chunkSize, AUTORAG_CONFIG.pipeline.settings.overlap);
    
    const storedChunks: string[] = [];
    
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const id = crypto.randomUUID();
      const timestamp = Date.now();
      
      // Generate embeddings for the chunk
      const embedding = await generateEmbeddings(chunk);
      
      const document: AutoRAGDocument = {
        id,
        content: chunk,
        metadata: {
          type,
          topic,
          language,
          difficulty,
          tags: [...tags, `chunk-${i + 1}`],
          timestamp,
          source,
          aiGenerated,
          modelUsed,
          cost: cost ? cost / chunks.length : undefined,
          embedding
        }
      };
      
      autoRAGDocuments.set(id, document);
      storedChunks.push(id);
    }
    
    return c.json({
      success: true,
      documentIds: storedChunks,
      chunksCount: chunks.length,
      message: 'Document stored successfully in AutoRAG system'
    });
    
  } catch (error) {
    console.error('Error storing document in AutoRAG:', error);
    return c.json({ error: 'Failed to store document in AutoRAG' }, 500);
  }
});

// Search using AutoRAG
app.post('/search', async (c) => {
  try {
    const body = await c.req.json();
    const { 
      query, 
      type, 
      topic, 
      language, 
      difficulty, 
      maxResults = 5, 
      useReranking = true 
    }: AutoRAGQuery = body;
    
    if (!query) {
      return c.json({ error: 'Query is required' }, 400);
    }
    
    // Generate embedding for the query
    const queryEmbedding = await generateEmbeddings(query);
    
    // Search through documents with filters
    const results: AutoRAGSearchResult[] = [];
    
    for (const [id, document] of autoRAGDocuments) {
      // Apply filters
      if (type && document.metadata.type !== type) continue;
      if (topic && document.metadata.topic !== topic) continue;
      if (language && document.metadata.language !== language) continue;
      if (difficulty && document.metadata.difficulty !== difficulty) continue;
      
      if (document.metadata.embedding) {
        // Calculate cosine similarity
        const similarity = calculateCosineSimilarity(queryEmbedding, document.metadata.embedding);
        
        if (similarity >= AUTORAG_CONFIG.pipeline.settings.similarityThreshold) {
          results.push({
            document,
            similarity,
            relevance: similarity, // Will be updated by reranking if enabled
            context: document.content,
            chunkIndex: parseInt(document.metadata.tags.find(t => t.startsWith('chunk-'))?.split('-')[1] || '0')
          });
        }
      }
    }
    
    // Sort by similarity and limit results
    results.sort((a, b) => b.similarity - a.similarity);
    let limitedResults = results.slice(0, maxResults);
    
    // Apply reranking if enabled
    if (useReranking && limitedResults.length > 0) {
      limitedResults = await rerankResults(query, limitedResults);
    }
    
    return c.json({
      success: true,
      results: limitedResults,
      totalFound: results.length,
      searchMetadata: {
        query,
        filters: { type, topic, language, difficulty },
        similarityThreshold: AUTORAG_CONFIG.pipeline.settings.similarityThreshold,
        rerankingApplied: useReranking
      }
    });
    
  } catch (error) {
    console.error('Error searching AutoRAG:', error);
    return c.json({ error: 'Failed to search AutoRAG' }, 500);
  }
});

// Generate content using AutoRAG
app.post('/generate', async (c) => {
  try {
    const body = await c.req.json();
    const { prompt, context, options }: AutoRAGGenerationRequest = body;
    
    if (!prompt || !context) {
      return c.json({ error: 'Missing required fields: prompt, context' }, 400);
    }
    
    const {
      maxTokens = 500,
      temperature = 0.7,
      useRAGContext = true,
      includeSourceDocuments = true
    } = options || {};
    
    let ragContext = '';
    let sourceDocuments: AutoRAGSearchResult[] = [];
    
    if (useRAGContext) {
      // Search for relevant context
      const searchResults = await (await fetch(`${c.req.url}/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: prompt,
          type: context.type,
          topic: context.topic,
          language: context.language,
          difficulty: context.difficulty,
          maxResults: 3,
          useReranking: true
        })
      })).json();
      
      if (searchResults.success && searchResults.results.length > 0) {
        sourceDocuments = searchResults.results;
        ragContext = `\n\nRelevant context:\n${sourceDocuments.map(r => r.context).join('\n\n')}`;
      }
    }
    
    // Generate enhanced prompt with RAG context
    const enhancedPrompt = `${prompt}${ragContext}\n\nPlease provide a comprehensive response based on the context above.`;
    
    // Use Cloudflare AI to generate content
    const response = await ai.run(AUTORAG_CONFIG.pipeline.models.generation, {
      prompt: enhancedPrompt,
      max_tokens: maxTokens,
      temperature: temperature
    });
    
    const generatedContent = response.response || response;
    
    // Store the generated content in AutoRAG system
    const documentId = await (await fetch(`${c.req.url}/store`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: generatedContent,
        type: context.type,
        topic: context.topic,
        language: context.language,
        difficulty: context.difficulty,
        tags: ['ai-generated', 'rag-enhanced', 'auto-generated'],
        source: 'ai-generation',
        aiGenerated: true,
        modelUsed: AUTORAG_CONFIG.pipeline.models.generation,
        cost: 0.001 // Estimated cost
      })
    })).json();
    
    return c.json({
      success: true,
      content: generatedContent,
      ragContext: sourceDocuments,
      documentId: documentId.documentIds,
      estimatedCost: 0.001,
      generationMetadata: {
        model: AUTORAG_CONFIG.pipeline.models.generation,
        maxTokens,
        temperature,
        ragContextUsed: useRAGContext,
        sourceDocumentsCount: sourceDocuments.length
      }
    });
    
  } catch (error) {
    console.error('Error generating content with AutoRAG:', error);
    return c.json({ error: 'Failed to generate content with AutoRAG' }, 500);
  }
});

// Get AutoRAG analytics
app.get('/analytics', async (c) => {
  try {
    const documents = Array.from(autoRAGDocuments.values());
    
    const analytics = {
      totalDocuments: documents.length,
      totalChunks: documents.filter(d => d.metadata.tags.some(t => t.startsWith('chunk-'))).length,
      totalCost: documents.reduce((sum, doc) => sum + (doc.metadata.cost || 0), 0),
      typeDistribution: {} as Record<string, number>,
      languageDistribution: {} as Record<string, number>,
      difficultyDistribution: {} as Record<string, number>,
      recentActivity: documents
        .sort((a, b) => b.metadata.timestamp - a.metadata.timestamp)
        .slice(0, 10)
        .map(doc => ({
          id: doc.id,
          type: doc.metadata.type,
          topic: doc.metadata.topic,
          language: doc.metadata.language,
          difficulty: doc.metadata.difficulty,
          timestamp: doc.metadata.timestamp,
          aiGenerated: doc.metadata.aiGenerated,
          source: doc.metadata.source
        }))
    };
    
    // Calculate distributions
    documents.forEach(doc => {
      const type = doc.metadata.type;
      const language = doc.metadata.language;
      const difficulty = doc.metadata.difficulty;
      
      analytics.typeDistribution[type] = (analytics.typeDistribution[type] || 0) + 1;
      analytics.languageDistribution[language] = (analytics.languageDistribution[language] || 0) + 1;
      analytics.difficultyDistribution[difficulty] = (analytics.difficultyDistribution[difficulty] || 0) + 1;
    });
    
    return c.json({
      success: true,
      analytics,
      pipelineConfig: AUTORAG_CONFIG.pipeline
    });
    
  } catch (error) {
    console.error('Error getting AutoRAG analytics:', error);
    return c.json({ error: 'Failed to get AutoRAG analytics' }, 500);
  }
});

// Initialize AutoRAG on startup
app.get('/init', async (c) => {
  try {
    const initialized = await initializeAutoRAG();
    
    if (initialized) {
      return c.json({
        success: true,
        message: 'AutoRAG pipeline initialized successfully',
        config: AUTORAG_CONFIG.pipeline
      });
    } else {
      return c.json({
        success: false,
        message: 'Failed to initialize AutoRAG pipeline'
      }, 500);
    }
  } catch (error) {
    console.error('Error initializing AutoRAG:', error);
    return c.json({ error: 'Failed to initialize AutoRAG' }, 500);
  }
});

// Helper function for cosine similarity
function calculateCosineSimilarity(vec1: number[], vec2: number[]): number {
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

export default app;

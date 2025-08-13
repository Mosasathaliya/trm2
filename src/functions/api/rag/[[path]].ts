import { Ai } from '@cloudflare/ai';
import { Hono } from 'hono';

const app = new Hono();

// Initialize Cloudflare AI
const ai = new Ai(env.AI);

// RAG Document interface
interface RAGDocument {
  id: string;
  content: string;
  metadata: {
    type: string;
    topic: string;
    tags: string[];
    timestamp: number;
    aiGenerated: boolean;
    modelUsed?: string;
    cost?: number;
  };
  embedding?: number[];
}

// RAG Query interface
interface RAGQuery {
  query: string;
  type?: string;
  topic?: string;
  maxResults?: number;
  similarityThreshold?: number;
}

// RAG Search Result interface
interface RAGSearchResult {
  document: RAGDocument;
  similarity: number;
  context: string;
}

// RAG Generation Context interface
interface RAGGenerationContext {
  type: string;
  topic: string;
  language?: string;
  difficulty?: string;
  maxTokens?: number;
  temperature?: number;
}

// In-memory storage for RAG documents (in production, use Cloudflare D1 or R2)
const ragDocuments = new Map<string, RAGDocument>();

// Generate embeddings using Cloudflare AI
async function generateEmbeddings(text: string): Promise<number[]> {
  try {
    const response = await ai.run('@cf/baai/bge-base-en-v1.5', {
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

// Calculate cosine similarity between two vectors
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

// Extract relevant context from content
function extractContext(content: string, query: string, maxLength: number = 500): string {
  // Simple context extraction - in production, use more sophisticated NLP
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const relevantSentences = sentences.filter(sentence => 
    sentence.toLowerCase().includes(query.toLowerCase()) ||
    query.toLowerCase().split(' ').some(word => sentence.toLowerCase().includes(word))
  );
  
  if (relevantSentences.length === 0) {
    return content.substring(0, maxLength) + (content.length > maxLength ? '...' : '');
  }
  
  return relevantSentences.slice(0, 3).join('. ') + '.';
}

// Store a document in the RAG system
app.post('/store', async (c) => {
  try {
    const body = await c.req.json();
    const { content, type, topic, tags = [], aiGenerated = false, modelUsed, cost } = body;
    
    if (!content || !type || !topic) {
      return c.json({ error: 'Missing required fields: content, type, topic' }, 400);
    }
    
    const id = crypto.randomUUID();
    const timestamp = Date.now();
    
    // Generate embeddings for the content
    const embedding = await generateEmbeddings(content);
    
    const document: RAGDocument = {
      id,
      content,
      metadata: {
        type,
        topic,
        tags,
        timestamp,
        aiGenerated,
        modelUsed,
        cost
      },
      embedding
    };
    
    ragDocuments.set(id, document);
    
    return c.json({
      success: true,
      documentId: id,
      message: 'Document stored successfully'
    });
    
  } catch (error) {
    console.error('Error storing document:', error);
    return c.json({ error: 'Failed to store document' }, 500);
  }
});

// Search for relevant documents
app.post('/search', async (c) => {
  try {
    const body = await c.req.json();
    const { query, type, topic, maxResults = 5, similarityThreshold = 0.3 }: RAGQuery = body;
    
    if (!query) {
      return c.json({ error: 'Query is required' }, 400);
    }
    
    // Generate embedding for the query
    const queryEmbedding = await generateEmbeddings(query);
    
    // Search through documents
    const results: RAGSearchResult[] = [];
    
    for (const [id, document] of ragDocuments) {
      // Filter by type and topic if specified
      if (type && document.metadata.type !== type) continue;
      if (topic && document.metadata.topic !== topic) continue;
      
      if (document.embedding) {
        const similarity = calculateCosineSimilarity(queryEmbedding, document.embedding);
        
        if (similarity >= similarityThreshold) {
          results.push({
            document,
            similarity,
            context: extractContext(document.content, query)
          });
        }
      }
    }
    
    // Sort by similarity and limit results
    results.sort((a, b) => b.similarity - a.similarity);
    const limitedResults = results.slice(0, maxResults);
    
    return c.json({
      success: true,
      results: limitedResults,
      totalFound: results.length
    });
    
  } catch (error) {
    console.error('Error searching documents:', error);
    return c.json({ error: 'Failed to search documents' }, 500);
  }
});

// Generate content using RAG context
app.post('/generate', async (c) => {
  try {
    const body = await c.req.json();
    const { prompt, context, maxTokens = 500, temperature = 0.7 }: {
      prompt: string;
      context: RAGGenerationContext;
      maxTokens?: number;
      temperature?: number;
    } = body;
    
    if (!prompt || !context) {
      return c.json({ error: 'Missing required fields: prompt, context' }, 400);
    }
    
    // Search for relevant context
    const searchResults = await (await fetch(`${c.req.url}/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: prompt,
        type: context.type,
        topic: context.topic,
        maxResults: 3
      })
    })).json();
    
    let ragContext = '';
    if (searchResults.success && searchResults.results.length > 0) {
      ragContext = `\n\nRelevant context:\n${searchResults.results.map(r => r.context).join('\n\n')}`;
    }
    
    // Generate enhanced prompt with RAG context
    const enhancedPrompt = `${prompt}${ragContext}\n\nPlease provide a comprehensive response based on the context above.`;
    
    // Use Cloudflare AI to generate content
    const response = await ai.run('@cf/meta/llama-3-8b-instruct', {
      prompt: enhancedPrompt,
      max_tokens: maxTokens,
      temperature: temperature
    });
    
    const generatedContent = response.response || response;
    
    // Store the generated content in RAG system
    const documentId = await (await fetch(`${c.req.url}/store`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: generatedContent,
        type: context.type,
        topic: context.topic,
        tags: ['ai-generated', 'rag-enhanced'],
        aiGenerated: true,
        modelUsed: '@cf/meta/llama-3-8b-instruct',
        cost: 0.001 // Estimated cost
      })
    })).json();
    
    return c.json({
      success: true,
      content: generatedContent,
      ragContext: searchResults.results || [],
      documentId: documentId.documentId,
      estimatedCost: 0.001
    });
    
  } catch (error) {
    console.error('Error generating content:', error);
    return c.json({ error: 'Failed to generate content' }, 500);
  }
});

// Get RAG analytics
app.get('/analytics', async (c) => {
  try {
    const documents = Array.from(ragDocuments.values());
    
    const analytics = {
      totalDocuments: documents.length,
      totalCost: documents.reduce((sum, doc) => sum + (doc.metadata.cost || 0), 0),
      typeDistribution: {} as Record<string, number>,
      recentActivity: documents
        .sort((a, b) => b.metadata.timestamp - a.metadata.timestamp)
        .slice(0, 10)
        .map(doc => ({
          id: doc.id,
          type: doc.metadata.type,
          topic: doc.metadata.topic,
          timestamp: doc.metadata.timestamp,
          aiGenerated: doc.metadata.aiGenerated
        }))
    };
    
    // Calculate type distribution
    documents.forEach(doc => {
      const type = doc.metadata.type;
      analytics.typeDistribution[type] = (analytics.typeDistribution[type] || 0) + 1;
    });
    
    return c.json({
      success: true,
      analytics
    });
    
  } catch (error) {
    console.error('Error getting analytics:', error);
    return c.json({ error: 'Failed to get analytics' }, 500);
  }
});

// Get all documents (for debugging)
app.get('/documents', async (c) => {
  try {
    const documents = Array.from(ragDocuments.values()).map(doc => ({
      id: doc.id,
      content: doc.content.substring(0, 200) + '...',
      metadata: doc.metadata
    }));
    
    return c.json({
      success: true,
      documents
    });
    
  } catch (error) {
    console.error('Error getting documents:', error);
    return c.json({ error: 'Failed to get documents' }, 500);
  }
});

// Clean up old documents
app.delete('/cleanup', async (c) => {
  try {
    const { maxAgeDays = 30 } = await c.req.json();
    const cutoffTime = Date.now() - (maxAgeDays * 24 * 60 * 60 * 1000);
    
    let deletedCount = 0;
    for (const [id, document] of ragDocuments) {
      if (document.metadata.timestamp < cutoffTime) {
        ragDocuments.delete(id);
        deletedCount++;
      }
    }
    
    return c.json({
      success: true,
      deletedCount,
      message: `Cleaned up ${deletedCount} old documents`
    });
    
  } catch (error) {
    console.error('Error cleaning up documents:', error);
    return c.json({ error: 'Failed to cleanup documents' }, 500);
  }
});

export default app;

// Cloudflare Pages compatible AI library
// Environment variables will be injected by Cloudflare Pages

// Access environment variables safely
function getEnvVar(name: string): string | undefined {
  // For Cloudflare Pages, these are injected at runtime
  if (typeof globalThis !== 'undefined' && (globalThis as any)[name]) {
    return (globalThis as any)[name];
  }
  return undefined;
}

const CLOUDFLARE_API_TOKEN = getEnvVar('CLOUDFLARE_API_TOKEN');
const CLOUDFLARE_ACCOUNT_ID = getEnvVar('CLOUDFLARE_ACCOUNT_ID');

// Only check environment variables at runtime, not during build
if (typeof window !== 'undefined' && (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_API_TOKEN)) {
  console.warn("Cloudflare Account ID or API Token not set - AI features may not work. Set them in Cloudflare Pages environment variables.");
}

// Comprehensive AI model mapping for cost-effective usage
export const AI_MODELS = {
  // Text Generation - Cost: $0.20 per 1M tokens
  TEXT_GENERATION: {
    LLAMA_3_8B: '@cf/meta/llama-3-8b-instruct',
    LLAMA_3_70B: '@cf/meta/llama-3-70b-instruct', // Higher quality, higher cost
    MISTRAL_7B: '@cf/mistralai/mistral-7b-instruct-v0.2',
    GEMMA_2B: '@cf/google/gemma-2b-it', // Fastest, lowest cost
  },
  
  // Translation - Cost: $0.20 per 1M tokens
  TRANSLATION: {
    M2M100: '@cf/meta/m2m100-1.2b', // Best for Arabic
    NLLB200: '@cf/meta/nllb-200-3.3b', // Alternative
  },
  
  // Text-to-Speech - Cost: $0.15 per 1M characters
  TTS: {
    MELOTTS: '@cf/myshell-ai/melotts', // Best Arabic support
    ELEVENLABS: '@cf/elevenlabs/eleven-multilingual-v2',
  },
  
  // Speech-to-Text - Cost: $0.006 per 1M characters
  STT: {
    WHISPER: '@cf/openai/whisper',
  },
  
  // Image Generation - Cost: $0.0025 per image
  IMAGE: {
    STABLE_DIFFUSION: '@cf/stabilityai/stable-diffusion-xl-base-1.0',
    PIXELART: '@cf/lykon/dreamshaper-v8',
  },
  
  // Embeddings & Reranking - Cost: $0.10 per 1M tokens
  EMBEDDINGS: {
    BGE_RERANKER: '@cf/baai/bge-reranker-base',
    BGE_EMBEDDING: '@cf/baai/bge-base-en-v1.5',
  }
} as const;

// Extract all model values into a union type
type AiModel = 
  | '@cf/meta/llama-3-8b-instruct'
  | '@cf/meta/llama-3-70b-instruct'
  | '@cf/mistralai/mistral-7b-instruct-v0.2'
  | '@cf/google/gemma-2b-it'
  | '@cf/meta/m2m100-1.2b'
  | '@cf/meta/nllb-200-3.3b'
  | '@cf/myshell-ai/melotts'
  | '@cf/elevenlabs/eleven-multilingual-v2'
  | '@cf/openai/whisper'
  | '@cf/stabilityai/stable-diffusion-xl-base-1.0'
  | '@cf/lykon/dreamshaper-v8'
  | '@cf/baai/bge-reranker-base'
  | '@cf/baai/bge-base-en-v1.5';

interface RunAiOptions {
  model: AiModel;
  inputs: object;
  stream?: boolean;
  maxTokens?: number; // For cost control
  temperature?: number; // For creativity control
}

// Type definitions for API responses
interface TextGenerationResponse {
  result?: {
    response?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

interface TranslationResponse {
  result?: {
    translated_text?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

interface EmbeddingResponse {
  result?: {
    embedding?: number[];
    [key: string]: any;
  };
  embedding?: number[];
  [key: string]: any;
}

/**
 * Enhanced Cloudflare AI runner with cost optimization and fallback strategies
 */
export async function runAi({ 
  model, 
  inputs, 
  stream = false, 
  maxTokens = 1000, // Default token limit for cost control
  temperature = 0.7 
}: RunAiOptions) {
  // Check if credentials are available
  if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_API_TOKEN) {
    throw new Error("Cloudflare AI credentials are not set in the environment variables.");
  }

  const isImageOrAudio = model.includes('stable-diffusion') || model.includes('melotts') || model.includes('whisper');
  const isTextGeneration = model.includes('llama') || model.includes('mistral') || model.includes('gemma');

  const directUrl = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/run/${model}`;

  let body: any;
  const headers: HeadersInit = { 
    'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
    'CF-Client-Version': 'trinav-ai-v1.0' // For analytics
  };

  if (model.includes('whisper') && 'audio' in inputs && (inputs.audio instanceof Buffer || inputs.audio instanceof Uint8Array)) {
    headers['Content-Type'] = 'application/octet-stream';
    body = inputs.audio;
  } else {
    headers['Content-Type'] = 'application/json';
    
    // Enhanced inputs with cost optimization
    const enhancedInputs = {
      ...inputs,
      ...(isTextGeneration && stream ? { stream: true } : {}),
      ...(isTextGeneration && maxTokens ? { max_tokens: maxTokens } : {}),
      ...(isTextGeneration && temperature !== undefined ? { temperature } : {}),
    };
    
    body = JSON.stringify(enhancedInputs);
  }

  try {
    const response = await fetch(directUrl, {
      method: 'POST',
      headers,
      body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Cloudflare AI API error for model ${model}:`, errorText);
      throw new Error(`Cloudflare AI request failed: ${response.statusText}`);
    }

    if (stream) {
      return response;
    }

    if (isImageOrAudio) {
      return response;
    }

    // For non-streamed, non-binary responses, wrap in {result: ...} for consistency
    const jsonResponse = await response.json();
    return new Response(JSON.stringify({ result: jsonResponse }), {
      headers: {'Content-Type': 'application/json'},
      status: 200
    });
  } catch (error) {
    console.error(`AI request failed for model ${model}:`, error);
    throw error;
  }
}

/**
 * Cost-effective text generation with fallback models
 */
export async function generateText(
  prompt: string, 
  options: {
    maxTokens?: number;
    temperature?: number;
    useFallback?: boolean; // Use cheaper models first
  } = {}
) {
  const { maxTokens = 500, temperature = 0.7, useFallback = true } = options;
  
  const models: AiModel[] = useFallback 
    ? [AI_MODELS.TEXT_GENERATION.GEMMA_2B, AI_MODELS.TEXT_GENERATION.LLAMA_3_8B]
    : [AI_MODELS.TEXT_GENERATION.LLAMA_3_8B];
  
  for (const model of models) {
    try {
      const response = await runAi({
        model,
        inputs: { 
          messages: [{ role: 'user', content: prompt }],
          max_tokens: maxTokens,
          temperature
        },
        maxTokens,
        temperature
      });
      
      const result = await response.json() as TextGenerationResponse;
      return result.result?.response || result.result || 'No response generated';
    } catch (error) {
      console.warn(`Model ${model} failed, trying next...`, error);
      if (model === models[models.length - 1]) {
        throw error; // Last model failed
      }
    }
  }
}

/**
 * Enhanced translation with fallback models
 */
export async function translateTextEnhanced(
  text: string,
  targetLang: string,
  sourceLang: string = 'en',
  options: { useFallback?: boolean } = {}
) {
  const { useFallback = true } = options;
  
  const models: AiModel[] = useFallback 
    ? [AI_MODELS.TRANSLATION.M2M100, AI_MODELS.TRANSLATION.NLLB200]
    : [AI_MODELS.TRANSLATION.M2M100];
  
  for (const model of models) {
    try {
      const response = await runAi({
        model,
        inputs: {
          text,
          source_lang: sourceLang,
          target_lang: targetLang
        }
      });
      
      const result = await response.json() as TranslationResponse;
      return result.result?.translated_text || result.result || text;
    } catch (error) {
      console.warn(`Translation model ${model} failed, trying next...`, error);
      if (model === models[models.length - 1]) {
        throw error;
      }
    }
  }
}

/**
 * Cost-effective image generation
 */
export async function generateImage(
  prompt: string,
  options: {
    width?: number;
    height?: number;
    steps?: number; // Lower = faster/cheaper
  } = {}
) {
  const { width = 1024, height = 1024, steps = 20 } = options;
  
  try {
    const response = await runAi({
      model: AI_MODELS.IMAGE.STABLE_DIFFUSION,
      inputs: {
        prompt,
        width,
        height,
        steps,
        seed: Math.floor(Math.random() * 1000000) // For reproducibility
      }
    });
    
    return response;
  } catch (error) {
    console.error('Image generation failed:', error);
    throw error;
  }
}

/**
 * Enhanced TTS with quality options
 */
export async function generateSpeech(
  text: string,
  options: {
    voice?: string;
    speed?: number;
    quality?: 'low' | 'medium' | 'high';
  } = {}
) {
  const { voice = 'ar', speed = 1.0, quality = 'medium' } = options;
  
  try {
    const response = await runAi({
      model: AI_MODELS.TTS.MELOTTS,
      inputs: {
        text,
        voice,
        speed,
        quality
      }
    });
    
    return response;
  } catch (error) {
    console.error('Speech generation failed:', error);
    throw error;
  }
}

/**
 * Get AI usage analytics and cost estimates
 */
export function getAiCostEstimate(
  model: AiModel,
  inputTokens: number,
  outputTokens: number = 0
) {
  const costs: Record<AiModel, { input: number; output: number }> = {
    [AI_MODELS.TEXT_GENERATION.LLAMA_3_8B]: { input: 0.20, output: 0.20 },
    [AI_MODELS.TEXT_GENERATION.GEMMA_2B]: { input: 0.15, output: 0.15 },
    [AI_MODELS.TEXT_GENERATION.LLAMA_3_70B]: { input: 0.25, output: 0.25 },
    [AI_MODELS.TEXT_GENERATION.MISTRAL_7B]: { input: 0.20, output: 0.20 },
    [AI_MODELS.TRANSLATION.M2M100]: { input: 0.20, output: 0.20 },
    [AI_MODELS.TRANSLATION.NLLB200]: { input: 0.20, output: 0.20 },
    [AI_MODELS.TTS.MELOTTS]: { input: 0.15, output: 0 },
    [AI_MODELS.TTS.ELEVENLABS]: { input: 0.15, output: 0 },
    [AI_MODELS.STT.WHISPER]: { input: 0.006, output: 0 },
    [AI_MODELS.IMAGE.STABLE_DIFFUSION]: { input: 0.0025, output: 0 },
    [AI_MODELS.IMAGE.PIXELART]: { input: 0.0025, output: 0 },
    [AI_MODELS.EMBEDDINGS.BGE_RERANKER]: { input: 0.10, output: 0.10 },
    [AI_MODELS.EMBEDDINGS.BGE_EMBEDDING]: { input: 0.10, output: 0.10 },
  };
  
  const modelCost = costs[model] || { input: 0.20, output: 0.20 };
  const totalCost = (inputTokens * modelCost.input + outputTokens * modelCost.output) / 1000000;
  
  return {
    model,
    inputTokens,
    outputTokens,
    estimatedCost: totalCost,
    currency: 'USD'
  };
}

/**
 * Generate embeddings using Cloudflare AI embedding models
 */
export async function generateEmbeddings(
  text: string,
  model: string = AI_MODELS.EMBEDDINGS.BGE_EMBEDDING
): Promise<{
  embedding: number[];
  model_used: string;
  estimated_cost: number;
}> {
  try {
    const inputs = { text };
    const result = await runAi({ model: model as AiModel, inputs });
    
    if (result.ok) {
      const jsonResult = await result.json() as EmbeddingResponse;
      const embedding = jsonResult.result?.embedding || jsonResult.embedding;
      
      if (embedding) {
        return {
          embedding,
          model_used: model,
          estimated_cost: 0.0001 // Fixed cost for embeddings
        };
      } else {
        throw new Error('No embedding generated');
      }
    } else {
      throw new Error(`Embedding request failed: ${result.statusText}`);
    }
  } catch (error) {
    console.error('Embedding generation failed:', error);
    throw error;
  }
}

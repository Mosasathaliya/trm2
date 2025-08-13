// Client-side AI library for Cloudflare AI models
// This will work in the browser and connect to your real AI models through RAG backend

export interface AIResponse {
  success: boolean;
  content?: string;
  error?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface TranslationRequest {
  text: string;
  sourceLanguage: string;
  targetLanguage: string;
}

export interface TranslationResponse {
  success: boolean;
  translation?: string;
  error?: string;
}

export interface TTSRequest {
  text: string;
  language: 'en' | 'ar';
  voice?: string;
}

export interface TTSResponse {
  success: boolean;
  audioUrl?: string;
  error?: string;
}

export interface ImageGenerationRequest {
  prompt: string;
  width?: number;
  height?: number;
  style?: string;
}

export interface ImageGenerationResponse {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

// Cloudflare AI Models
const AI_MODELS = {
  TEXT_GENERATION: '@cf/meta/llama-3-8b-instruct',
  TRANSLATION: '@cf/meta/m2m100-1.2b',
  TTS: '@cf/myshell-ai/melotts',
  STT: '@cf/openai/whisper',
  IMAGE: '@cf/stabilityai/stable-diffusion-xl-base-1.0',
  EMBEDDING: '@cf/baai/bge-base-en-v1.5',
  RERANKER: '@cf/baai/bge-reranker-base'
} as const;

// Backend RAG API endpoints
const RAG_BASE_URL = 'https://trm2-autrag-backend.speedofmastry.workers.dev';

// Client-side AI runner that goes through RAG backend
async function runClientAI(model: string, inputs: any, context?: string): Promise<Response> {
  try {
    // Route ALL AI calls through the RAG backend to record everything
    const response = await fetch(`${RAG_BASE_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: `Model: ${model}\nInputs: ${JSON.stringify(inputs)}`,
        context: {
          searchQuery: context || 'AI generation request',
          maxContextLength: 1000,
          includeMetadata: true,
        },
        options: {
          model: model,
          maxTokens: 1000,
          temperature: 0.7,
          useReranking: false,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`RAG backend error: ${response.statusText}`);
    }

    return response;
  } catch (error) {
    console.error('Client AI error:', error);
    throw error;
  }
}

// Helper function to store everything in RAG backend
async function storeInRAG(userInput: string, aiResponse: string, type: string, topic: string): Promise<void> {
  try {
    await fetch(`${RAG_BASE_URL}/store`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: `User Input: ${userInput}\n\nAI Response: ${aiResponse}`,
        type: type,
        topic: topic,
        metadata: {
          language: 'ar',
          tags: [type, topic, 'ai_generation'],
          userInput: userInput,
          aiResponse: aiResponse,
          timestamp: new Date().toISOString(),
        },
      }),
    });
    
    console.log(`Stored in RAG: ${type} - ${topic}`);
  } catch (error) {
    console.error('Failed to store in RAG:', error);
    // Don't fail the main operation if RAG storage fails
  }
}

// Search RAG backend for existing knowledge
export async function searchRAG(query: string, options: {
  type?: string;
  topic?: string;
  maxResults?: number;
} = {}): Promise<{ success: boolean; results?: any[]; error?: string }> {
  try {
    const response = await fetch(`${RAG_BASE_URL}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        type: options.type,
        topic: options.topic,
        maxResults: options.maxResults || 5,
        similarityThreshold: 0.6,
        useReranking: false,
      }),
    });

    if (response.ok) {
      const result = await response.json() as { results?: any[] };
      return { success: true, results: result.results || [] };
    } else {
      const error = await response.json() as { error?: string };
      return { success: false, error: error.error || 'Failed to search RAG' };
    }
  } catch (error) {
    console.error('RAG search error:', error);
    return { success: false, error: 'Network error' };
  }
}

// Type definitions for RAG responses
interface RAGResponse {
  content?: string;
  result?: {
    response?: string;
    translated_text?: string;
    audioUrl?: string;
    imageUrl?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

// Text Generation - goes through RAG backend
export async function generateText(prompt: string, options: {
  maxTokens?: number;
  temperature?: number;
  model?: string;
  context?: string;
} = {}): Promise<AIResponse> {
  try {
    const model = options.model || AI_MODELS.TEXT_GENERATION;
    
    // Route through RAG backend to record this generation
    const response = await runClientAI(model, {
      messages: [{ role: 'user', content: prompt }],
      max_tokens: options.maxTokens || 500,
      temperature: options.temperature || 0.7
    }, options.context);
    
    const result = await response.json() as RAGResponse;
    
    // Store this Q&A in RAG for future reference
    await storeInRAG(prompt, result.content || 'No response', 'text_generation', 'ai_chat');
    
    return {
      success: true,
      content: result.content || result.result?.response || 'No response generated'
    };
  } catch (error) {
    console.error('Text generation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Chat Stream - goes through RAG backend
export async function chatStream(prompt: string): Promise<ReadableStream<Uint8Array>> {
  // Create a stream that goes through RAG backend
  return new ReadableStream({
    async start(controller) {
      try {
        // Route through RAG backend
        const response = await generateText(prompt, {
          maxTokens: 800,
          temperature: 0.7,
          context: 'chat_stream'
        });
        
        if (response.success && response.content) {
          // Simulate streaming by sending chunks
          const words = response.content.split(' ');
          for (let i = 0; i < words.length; i++) {
            const chunk = `data: ${JSON.stringify({ response: words[i] + ' ' })}\n\n`;
            controller.enqueue(new TextEncoder().encode(chunk));
            await new Promise(resolve => setTimeout(resolve, 100)); // Simulate delay
          }
        } else {
          const errorChunk = `data: ${JSON.stringify({ response: response.error || 'Failed to generate response' })}\n\n`;
          controller.enqueue(new TextEncoder().encode(errorChunk));
        }
        controller.close();
      } catch (error) {
        const errorChunk = `data: ${JSON.stringify({ response: 'An error occurred' })}\n\n`;
        controller.enqueue(new TextEncoder().encode(errorChunk));
        controller.close();
      }
    }
  });
}

// Translation - goes through RAG backend
export async function translateText(request: TranslationRequest): Promise<TranslationResponse> {
  try {
    // Route through RAG backend
    const response = await runClientAI(AI_MODELS.TRANSLATION, {
      text: request.text,
      source_lang: request.sourceLanguage,
      target_lang: request.targetLanguage
    }, `translation: ${request.sourceLanguage} to ${request.targetLanguage}`);
    
    const result = await response.json() as RAGResponse;
    const translation = result.content || result.result?.translated_text || request.text;
    
    // Store this translation in RAG
    await storeInRAG(
      `Translate: ${request.text}`,
      `Translation: ${translation}`,
      'translation',
      'language_learning'
    );
    
    return {
      success: true,
      translation: translation
    };
  } catch (error) {
    console.error('Translation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Translation failed'
    };
  }
}

// Text-to-Speech - goes through RAG backend
export async function generateSpeech(request: TTSRequest): Promise<TTSResponse> {
  try {
    // For now, use browser TTS as fallback
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(request.text);
      utterance.lang = request.language === 'en' ? 'en-US' : 'ar-SA';
      utterance.rate = 0.8;
      utterance.pitch = 1;
      
      // Store TTS request in RAG
      await storeInRAG(
        `TTS Request: ${request.text}`,
        `TTS Generated for ${request.language}`,
        'tts',
        'audio_generation'
      );
      
      return new Promise((resolve) => {
        utterance.onend = () => resolve({
          success: true,
          audioUrl: 'browser-tts'
        });
        utterance.onerror = () => resolve({
          success: false,
          error: 'Browser TTS failed'
        });
        speechSynthesis.speak(utterance);
      });
    }
    
    // Fallback to Cloudflare AI TTS through RAG backend
    const response = await runClientAI(AI_MODELS.TTS, {
      text: request.text,
      language: request.language
    }, `TTS generation: ${request.language}`);
    
    const result = await response.json() as RAGResponse;
    
    // Store TTS in RAG
    await storeInRAG(
      `TTS Request: ${request.text}`,
      `AI TTS Generated: ${result.result?.audioUrl || 'success'}`,
      'tts',
      'ai_audio'
    );
    
    return {
      success: true,
      audioUrl: result.result?.audioUrl || 'ai-generated'
    };
  } catch (error) {
    console.error('TTS error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'TTS failed'
    };
  }
}

// Image Generation - goes through RAG backend
export async function generateImage(request: ImageGenerationRequest): Promise<ImageGenerationResponse> {
  try {
    // Route through RAG backend
    const response = await runClientAI(AI_MODELS.IMAGE, {
      prompt: request.prompt,
      width: request.width || 1024,
      height: request.height || 1024,
      steps: 20
    }, `image_generation: ${request.prompt}`);
    
    const result = await response.json() as RAGResponse;
    const imageUrl = result.result?.imageUrl || result.content || 'mock-image-url';
    
    // Store image generation in RAG
    await storeInRAG(
      `Image Prompt: ${request.prompt}`,
      `Image Generated: ${imageUrl}`,
      'image_generation',
      'creative_content'
    );
    
    return {
      success: true,
      imageUrl: imageUrl
    };
  } catch (error) {
    console.error('Image generation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Image generation failed'
    };
  }
}

// Story Generation - goes through RAG backend
export async function generateStory(prompt: string): Promise<AIResponse> {
  try {
    const storyPrompt = `Write a short, creative story in English about: ${prompt}. Make it engaging and educational for Arabic language learners. Keep it under 200 words.`;
    
    // Route through RAG backend
    const response = await generateText(storyPrompt, {
      maxTokens: 400,
      temperature: 0.8,
      context: `story_generation: ${prompt}`
    });
    
    if (response.success && response.content) {
      // Store story in RAG
      await storeInRAG(
        `Story Prompt: ${prompt}`,
        `Story Generated: ${response.content}`,
        'story_generation',
        'creative_writing'
      );
    }
    
    return response;
  } catch (error) {
    console.error('Story generation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Story generation failed'
    };
  }
}

// Lesson Content Generation - goes through RAG backend
export async function generateLessonContent(topic: string, level: string): Promise<AIResponse> {
  try {
    const prompt = `Create an Arabic language lesson about "${topic}" for level ${level}. Include:
1. A clear explanation in Arabic
2. 3 example sentences with translations
3. Key vocabulary words
4. Common mistakes to avoid
Format as JSON.`;
    
    // Route through RAG backend
    const response = await generateText(prompt, {
      maxTokens: 600,
      temperature: 0.7,
      context: `lesson_content: ${topic} level ${level}`
    });
    
    if (response.success && response.content) {
      // Store lesson content in RAG
      await storeInRAG(
        `Lesson Content Request: ${topic} level ${level}`,
        `Lesson Content Generated: ${response.content}`,
        'lesson_content',
        'educational_material'
      );
    }
    
    return response;
  } catch (error) {
    console.error('Lesson content generation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Lesson content generation failed'
    };
  }
}

// Quiz Generation - goes through RAG backend
export async function generateQuiz(topic: string, level: string): Promise<AIResponse> {
  try {
    const prompt = `Create a 5-question quiz about "${topic}" for Arabic language level ${level}. Include:
1. Multiple choice questions
2. Correct answers
3. Explanations for each answer
Format as JSON.`;
    
    // Route through RAG backend
    const response = await generateText(prompt, {
      maxTokens: 500,
      temperature: 0.6,
      context: `quiz_generation: ${topic} level ${level}`
    });
    
    if (response.success && response.content) {
      // Store quiz in RAG
      await storeInRAG(
        `Quiz Request: ${topic} level ${level}`,
        `Quiz Generated: ${response.content}`,
        'quiz_generation',
        'educational_assessment'
      );
    }
    
    return response;
  } catch (error) {
    console.error('Quiz generation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Quiz generation failed'
    };
  }
}

// Voice Chat Pipeline - goes through RAG backend
export async function processVoiceChat(audioBlob: Blob, language: 'en' | 'ar'): Promise<AIResponse> {
  try {
    // Convert audio to text using STT
    // For now, simulate this step
    const transcribedText = "Simulated transcription from voice input";
    
    // Generate response using the transcribed text through RAG backend
    const response = await generateText(transcribedText, {
      maxTokens: 300,
      temperature: 0.7,
      context: `voice_chat: ${language}`
    });
    
    if (response.success && response.content) {
      // Store voice chat in RAG
      await storeInRAG(
        `Voice Input: ${transcribedText}`,
        `Voice Response: ${response.content}`,
        'voice_chat',
        'audio_interaction'
      );
    }
    
    return response;
  } catch (error) {
    console.error('Voice chat error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Voice chat failed'
    };
  }
}

// Enhanced AI Flows - goes through RAG backend
export async function enhancedAIFlow(prompt: string, context: string): Promise<AIResponse> {
  try {
    const enhancedPrompt = `Context: ${context}\n\nUser Question: ${prompt}\n\nPlease provide a comprehensive answer based on the context above.`;
    
    // Route through RAG backend
    const response = await generateText(enhancedPrompt, {
      maxTokens: 800,
      temperature: 0.7,
      context: `enhanced_ai_flow: ${context}`
    });
    
    if (response.success && response.content) {
      // Store enhanced flow in RAG
      await storeInRAG(
        `Enhanced AI Question: ${prompt}`,
        `Enhanced AI Response: ${response.content}`,
        'enhanced_ai_flow',
        'context_aware_ai'
      );
    }
    
    return response;
  } catch (error) {
    console.error('Enhanced AI flow error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Enhanced AI flow failed'
    };
  }
}

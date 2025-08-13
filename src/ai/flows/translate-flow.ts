
'use server';
/**
 * @fileOverview Enhanced translation flow using Cloudflare AI models with fallback strategies.
 * This has been updated to use the new enhanced AI system for better cost-effectiveness.
 */
import { z } from 'zod';
import { translateTextEnhanced, AI_MODELS } from '../../lib/cloudflare-ai';

export type TranslateInput = z.infer<typeof TranslateInputSchema>;
const TranslateInputSchema = z.object({
  text: z.union([z.string(), z.array(z.string())]).describe('The text or array of texts to be translated.'),
  sourceLanguage: z.string().default('en').describe('The source language code (e.g., "en" for English).'),
  targetLanguage: z.string().describe('The target language for translation (e.g., "ar" for Arabic).'),
  useFallback: z.boolean().default(true).describe('Whether to use fallback models for cost optimization.'),
  quality: z.enum(['fast', 'balanced', 'high']).default('balanced').describe('Translation quality preference.')
});

export type TranslateOutput = {
  translation: any;
  model_used: string;
  estimated_cost: number;
  quality: 'fast' | 'balanced' | 'high';
};

export async function translateText({ 
  text, 
  sourceLanguage = 'en', 
  targetLanguage,
  useFallback = true,
  quality = 'balanced'
}: TranslateInput): Promise<TranslateOutput> {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    // Client-side: return placeholder content
    if (Array.isArray(text)) {
      return { 
        translation: text.map(() => "محتوى مؤقت - سيتم تحديثه عند التشغيل"),
        model_used: 'placeholder',
        estimated_cost: 0,
        quality: 'fast'
      };
    }
    return { 
      translation: "محتوى مؤقت - سيتم تحديثه عند التشغيل",
      model_used: 'placeholder',
      estimated_cost: 0,
      quality: 'fast'
    };
  }
  
  try {
    // Use enhanced translation with fallback models
    const translation = await translateTextEnhanced(
      Array.isArray(text) ? text.join('\n') : text,
      targetLanguage,
      sourceLanguage,
      { useFallback }
    );
    
    // Determine which model was used based on quality preference
    let modelUsed = AI_MODELS.TRANSLATION.M2M100;
    if (quality === 'high') {
      modelUsed = AI_MODELS.TRANSLATION.M2M100; // Best quality
    } else if (quality === 'fast') {
      modelUsed = AI_MODELS.TRANSLATION.NLLB200; // Faster alternative
    }
    
    // Calculate estimated cost
    const inputTokens = Array.isArray(text) 
      ? text.reduce((total, t) => total + t.length / 4, 0) // Rough token estimation
      : text.length / 4;
    const outputTokens = translation.length / 4;
    
    const estimatedCost = (inputTokens + outputTokens) * 0.0000002; // $0.20 per 1M tokens
    
    // Handle batch vs single translation
    let finalTranslation;
    if (Array.isArray(text)) {
      // Split the translated text back into array format
      const sentences = translation.split(/[.!?]+/).filter(s => s.trim());
      finalTranslation = sentences.slice(0, text.length);
    } else {
      finalTranslation = translation;
    }
    
    return {
      translation: finalTranslation,
      model_used: modelUsed,
      estimated_cost: estimatedCost,
      quality
    };
    
  } catch (error) {
    console.error('Enhanced translation failed:', error);
    
    // Fallback to basic translation
    if (Array.isArray(text)) {
      return { 
        translation: text.map(() => "ترجمة مؤقتة - سيتم تحديثها عند التشغيل"),
        model_used: 'fallback',
        estimated_cost: 0,
        quality: 'fast'
      };
    }
    
    return { 
      translation: "ترجمة مؤقتة - سيتم تحديثها عند التشغيل",
      model_used: 'fallback',
      estimated_cost: 0,
      quality: 'fast'
    };
  }
}

/**
 * Batch translation with cost optimization
 */
export async function translateBatch(
  texts: string[],
  sourceLanguage: string = 'en',
  targetLanguage: string,
  batchSize: number = 10
): Promise<TranslateOutput[]> {
  const results: TranslateOutput[] = [];
  
  // Process in batches to optimize costs
  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize);
    
    try {
      const batchResult = await translateText({
        text: batch,
        sourceLanguage,
        targetLanguage,
        useFallback: true,
        quality: 'balanced'
      });
      
      // Distribute the batch result to individual texts
      if (Array.isArray(batchResult.translation)) {
        for (let j = 0; j < batch.length; j++) {
          results.push({
            translation: batchResult.translation[j] || batch[j],
            model_used: batchResult.model_used,
            estimated_cost: batchResult.estimated_cost / batch.length,
            quality: batchResult.quality
          });
        }
      }
    } catch (error) {
      console.error(`Batch translation failed for batch ${i / batchSize + 1}:`, error);
      
      // Add fallback results for failed batch
      for (const text of batch) {
        results.push({
          translation: "ترجمة مؤقتة - سيتم تحديثها عند التشغيل",
          model_used: 'fallback',
          estimated_cost: 0,
          quality: 'fast'
        });
      }
    }
  }
  
  return results;
}

/**
 * Get translation cost estimate
 */
export function getTranslationCostEstimate(
  textLength: number,
  targetLanguage: string,
  quality: 'fast' | 'balanced' | 'high' = 'balanced'
): { estimated_cost: number; model: string; quality: string } {
  const inputTokens = textLength / 4; // Rough estimation
  const outputTokens = inputTokens * 1.2; // Translation typically expands text
  
  let model = AI_MODELS.TRANSLATION.M2M100;
  let costMultiplier = 1.0;
  
  if (quality === 'high') {
    model = AI_MODELS.TRANSLATION.M2M100;
    costMultiplier = 1.0;
  } else if (quality === 'fast') {
    model = AI_MODELS.TRANSLATION.NLLB200;
    costMultiplier = 0.9; // Slightly cheaper
  }
  
  const estimatedCost = (inputTokens + outputTokens) * 0.0000002 * costMultiplier;
  
  return {
    estimated_cost: estimatedCost,
    model,
    quality
  };
}

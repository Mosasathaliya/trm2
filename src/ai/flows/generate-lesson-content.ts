'use server';
/**
 * @fileOverview Enhanced lesson content generation using Cloudflare AI models.
 * This has been updated to use the new enhanced AI system for better content quality and cost-effectiveness.
 */
import { z } from 'zod';
import { generateText, AI_MODELS, getAiCostEstimate } from '../../lib/cloudflare-ai';

export type GenerateExplanationInput = z.infer<typeof GenerateExplanationInputSchema>;
const GenerateExplanationInputSchema = z.object({
  grammarTopic: z.string().describe('The specific English grammar topic to be explained.'),
  level: z.string().describe('The level of the student (e.g., Beginner, Intermediate).'),
  language: z.enum(['en', 'ar']).default('ar').describe('Target language for the explanation.'),
  includeExamples: z.boolean().default(true).describe('Whether to include practical examples.'),
  includeExercises: z.boolean().default(false).describe('Whether to include practice exercises.'),
  maxTokens: z.number().default(800).describe('Maximum tokens for the response.')
});

export type GenerateExplanationOutput = {
  arabicExplanation: string;
  englishExplanation?: string;
  examples?: string[];
  exercises?: string[];
  model_used: string;
  estimated_cost: number;
  generation_time: number;
};

export async function generateArabicExplanation(input: GenerateExplanationInput): Promise<GenerateExplanationOutput> {
  const { 
    grammarTopic, 
    level, 
    language = 'ar', 
    includeExamples = true, 
    includeExercises = false,
    maxTokens = 800 
  } = input;
  
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    return { 
      arabicExplanation: `شرح مؤقت لموضوع "${grammarTopic}" للمستوى ${level}. سيتم تحديث هذا المحتوى عند التشغيل.`,
      model_used: 'placeholder',
      estimated_cost: 0,
      generation_time: 0
    };
  }
  
  const startTime = Date.now();
  
  try {
    // Generate main explanation
    const explanationPrompt = `Create a comprehensive explanation of the English grammar topic "${grammarTopic}" for ${level} level students.
    
    The explanation should:
    - Be clear and easy to understand
    - Include the basic concept and rules
    - Provide practical usage guidelines
    - Be suitable for the specified level
    - Include key points and tips
    
    ${includeExamples ? 'Include 3-5 practical examples showing correct usage.' : ''}
    ${includeExercises ? 'Include 2-3 simple practice exercises with answers.' : ''}
    
    Make it engaging and educational.`;
    
    const englishExplanation = await generateText(explanationPrompt, {
      maxTokens: Math.floor(maxTokens * 0.6),
      temperature: 0.4,
      useFallback: true
    });
    
    // Generate Arabic translation if needed
    let arabicExplanation = englishExplanation;
    if (language === 'ar') {
      const translationPrompt = `Translate this English grammar explanation to Arabic: "${englishExplanation}"
      
      Make sure the Arabic translation:
      - Is natural and fluent
      - Uses appropriate Arabic grammar terminology
      - Maintains the educational tone
      - Is suitable for Arabic-speaking learners`;
      
      arabicExplanation = await generateText(translationPrompt, {
        maxTokens: Math.floor(maxTokens * 0.4),
        temperature: 0.3,
        useFallback: true
      });
    }
    
    // Generate examples if requested
    let examples: string[] = [];
    if (includeExamples) {
      const examplesPrompt = `Generate 3-5 practical examples for the grammar topic "${grammarTopic}" at ${level} level.
      
      Each example should:
      - Demonstrate the grammar rule clearly
      - Be relevant to everyday situations
      - Include both positive and negative examples
      - Be appropriate for the student's level`;
      
      const examplesResponse = await generateText(examplesPrompt, {
        maxTokens: 300,
        temperature: 0.6,
        useFallback: true
      });
      
      examples = examplesResponse.split('\n')
        .filter(line => line.trim())
        .map(line => line.replace(/^[-•]\s*/, ''))
        .slice(0, 5);
    }
    
    // Generate exercises if requested
    let exercises: string[] = [];
    if (includeExercises) {
      const exercisesPrompt = `Create 2-3 simple practice exercises for the grammar topic "${grammarTopic}" at ${level} level.
      
      Each exercise should:
      - Test understanding of the grammar rule
      - Be appropriate for the student's level
      - Include clear instructions
      - Have a definite correct answer
      - Include an explanation of why it's correct`;
      
      const exercisesResponse = await generateText(exercisesPrompt, {
        maxTokens: 400,
        temperature: 0.4,
        useFallback: true
      });
      
      exercises = exercisesResponse.split('\n\n')
        .filter(section => section.trim())
        .slice(0, 3);
    }
    
    // Calculate costs and performance metrics
    const totalTokens = (englishExplanation.length + arabicExplanation.length) / 4;
    const estimatedCost = getAiCostEstimate(AI_MODELS.TEXT_GENERATION.LLAMA_3_8B, totalTokens, totalTokens);
    const generationTime = Date.now() - startTime;
    
    return {
      arabicExplanation,
      englishExplanation: language === 'en' ? englishExplanation : undefined,
      examples: examples.length > 0 ? examples : undefined,
      exercises: exercises.length > 0 ? exercises : undefined,
      model_used: AI_MODELS.TEXT_GENERATION.LLAMA_3_8B,
      estimated_cost: estimatedCost.estimatedCost,
      generation_time: generationTime
    };
    
  } catch (error) {
    console.error('Enhanced lesson content generation failed:', error);
    
    // Return fallback content
    return {
      arabicExplanation: `شرح مؤقت لموضوع "${grammarTopic}" للمستوى ${level}. حدث خطأ في توليد المحتوى.`,
      model_used: 'fallback',
      estimated_cost: 0,
      generation_time: Date.now() - startTime
    };
  }
}

/**
 * Generate comprehensive lesson content with multiple sections
 */
export async function generateComprehensiveLesson(
  topic: string,
  level: 'beginner' | 'intermediate' | 'advanced',
  options: {
    includeVocabulary?: boolean;
    includeGrammar?: boolean;
    includeConversation?: boolean;
    includeCultural?: boolean;
    maxTokens?: number;
  } = {}
): Promise<{
  vocabulary: string[];
  grammar: string;
  conversation: string;
  cultural: string[];
  model_used: string;
  estimated_cost: number;
}> {
  const {
    includeVocabulary = true,
    includeGrammar = true,
    includeConversation = true,
    includeCultural = true,
    maxTokens = 1500
  } = options;
  
  const startTime = Date.now();
  let totalTokens = 0;
  const results: any = {};
  
  try {
    // Generate vocabulary
    if (includeVocabulary) {
      const vocabPrompt = `Generate 8-10 essential vocabulary words for learning about "${topic}" at ${level} level.
      
      For each word include:
      - The word itself
      - Simple definition
      - Example sentence
      - Difficulty level`;
      
      const vocabResponse = await generateText(vocabPrompt, {
        maxTokens: Math.floor(maxTokens * 0.2),
        temperature: 0.3,
        useFallback: true
      });
      
      results.vocabulary = vocabResponse.split('\n')
        .filter(line => line.trim())
        .map(line => line.replace(/^[-•]\s*/, ''))
        .slice(0, 10);
      
      totalTokens += vocabResponse.length / 4;
    }
    
    // Generate grammar explanation
    if (includeGrammar) {
      const grammarPrompt = `Explain the key grammar concepts related to "${topic}" for ${level} level students.
      
      Include:
      - Basic grammar rules
      - Common patterns
      - Usage examples
      - Common mistakes to avoid`;
      
      const grammarResponse = await generateText(grammarPrompt, {
        maxTokens: Math.floor(maxTokens * 0.3),
        temperature: 0.4,
        useFallback: true
      });
      
      results.grammar = grammarResponse;
      totalTokens += grammarResponse.length / 4;
    }
    
    // Generate conversation practice
    if (includeConversation) {
      const conversationPrompt = `Create a conversation practice scenario for "${topic}" at ${level} level.
      
      Include:
      - Setting and context
      - Sample dialogue
      - Key expressions
      - Practice tips`;
      
      const conversationResponse = await generateText(conversationPrompt, {
        maxTokens: Math.floor(maxTokens * 0.3),
        temperature: 0.6,
        useFallback: true
      });
      
      results.conversation = conversationResponse;
      totalTokens += conversationResponse.length / 4;
    }
    
    // Generate cultural notes
    if (includeCultural) {
      const culturalPrompt = `Provide cultural insights related to "${topic}" for language learners.
      
      Include:
      - Cultural context
      - Social norms
      - Language etiquette
      - Cultural expressions`;
      
      const culturalResponse = await generateText(culturalPrompt, {
        maxTokens: Math.floor(maxTokens * 0.2),
        temperature: 0.5,
        useFallback: true
      });
      
      results.cultural = culturalResponse.split('\n')
        .filter(line => line.trim())
        .map(line => line.replace(/^[-•]\s*/, ''))
        .slice(0, 5);
      
      totalTokens += culturalResponse.length / 4;
    }
    
    // Calculate final metrics
    const estimatedCost = getAiCostEstimate(AI_MODELS.TEXT_GENERATION.LLAMA_3_8B, totalTokens, totalTokens);
    const generationTime = Date.now() - startTime;
    
    console.log(`Comprehensive lesson generated in ${generationTime}ms with cost: $${estimatedCost.estimatedCost}`);
    
    return {
      ...results,
      model_used: AI_MODELS.TEXT_GENERATION.LLAMA_3_8B,
      estimated_cost: estimatedCost.estimatedCost
    };
    
  } catch (error) {
    console.error('Comprehensive lesson generation failed:', error);
    
    return {
      vocabulary: ['محتوى مؤقت'],
      grammar: 'محتوى مؤقت',
      conversation: 'محتوى مؤقت',
      cultural: ['محتوى مؤقت'],
      model_used: 'fallback',
      estimated_cost: 0
    };
  }
}

/**
 * Generate lesson summary and key takeaways
 */
export async function generateLessonSummary(
  lessonContent: string,
  level: 'beginner' | 'intermediate' | 'advanced',
  maxTokens: number = 300
): Promise<{
  summary: string;
  keyPoints: string[];
  nextSteps: string[];
  model_used: string;
  estimated_cost: number;
}> {
  try {
    const summaryPrompt = `Create a concise summary of this lesson content for ${level} level students:
    
    "${lessonContent}"
    
    Provide:
    - Brief summary (2-3 sentences)
    - 3-4 key points to remember
    - 2-3 suggested next steps for practice
    
    Make it clear and actionable.`;
    
    const response = await generateText(summaryPrompt, {
      maxTokens,
      temperature: 0.3,
      useFallback: true
    });
    
    const sections = response.split('\n\n').filter(section => section.trim());
    
    const summary = sections[0] || '';
    const keyPoints = sections[1]?.split('\n')
      .filter(line => line.trim())
      .map(line => line.replace(/^[-•]\s*/, ''))
      .slice(0, 4) || [];
    const nextSteps = sections[2]?.split('\n')
      .filter(line => line.trim())
      .map(line => line.replace(/^[-•]\s*/, ''))
      .slice(0, 3) || [];
    
    const totalTokens = response.length / 4;
    const estimatedCost = getAiCostEstimate(AI_MODELS.TEXT_GENERATION.GEMMA_2B, totalTokens, totalTokens);
    
    return {
      summary,
      keyPoints,
      nextSteps,
      model_used: AI_MODELS.TEXT_GENERATION.GEMMA_2B,
      estimated_cost: estimatedCost.estimatedCost
    };
    
  } catch (error) {
    console.error('Lesson summary generation failed:', error);
    
    return {
      summary: 'ملخص مؤقت للدرس',
      keyPoints: ['نقطة رئيسية مؤقتة'],
      nextSteps: ['خطوة تالية مؤقتة'],
      model_used: 'fallback',
      estimated_cost: 0
    };
  }
}

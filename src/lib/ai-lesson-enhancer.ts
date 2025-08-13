/**
 * AI-Powered Lesson Enhancement System
 * Dynamically generates and enhances lesson content using Cloudflare AI
 */

import { 
  generateText, 
  translateTextEnhanced, 
  generateImage,
  AI_MODELS 
} from './cloudflare-ai';
import { speakText } from './tts-system';

export interface EnhancedLesson {
  id: string;
  title: string;
  title_arabic?: string;
  content: {
    english: string;
    arabic: string;
  };
  vocabulary: VocabularyItem[];
  exercises: Exercise[];
  pronunciation: PronunciationGuide[];
  cultural_notes: CulturalNote[];
  audio_lessons: AudioLesson[];
  generated_at: string;
  ai_models_used: string[];
  estimated_cost: number;
}

export interface VocabularyItem {
  word: string;
  translation: string;
  definition: string;
  example_sentence: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  audio_url?: string;
}

export interface Exercise {
  type: 'multiple_choice' | 'fill_blank' | 'matching' | 'conversation';
  question: string;
  options?: string[];
  correct_answer: string;
  explanation: string;
  difficulty: number; // 1-5
}

export interface PronunciationGuide {
  word: string;
  phonetic: string;
  audio_url?: string;
  tips: string[];
  common_mistakes: string[];
}

export interface CulturalNote {
  topic: string;
  description: string;
  relevance: string;
  examples: string[];
}

export interface AudioLesson {
  title: string;
  content: string;
  audio_url?: string;
  duration: number; // seconds
  transcript: string;
}

/**
 * Enhanced lesson generation with AI
 */
export async function generateEnhancedLesson(
  baseLesson: {
    id: string;
    title: string;
    topic: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    target_language: 'en' | 'ar';
  },
  options: {
    includeVocabulary?: boolean;
    includeExercises?: boolean;
    includePronunciation?: boolean;
    includeCulturalNotes?: boolean;
    includeAudio?: boolean;
    maxTokens?: number;
  } = {}
): Promise<EnhancedLesson> {
  const {
    includeVocabulary = true,
    includeExercises = true,
    includePronunciation = true,
    includeCulturalNotes = true,
    includeAudio = true,
    maxTokens = 2000
  } = options;

  const startTime = Date.now();
  const aiModelsUsed: string[] = [];
  let totalCost = 0;

  try {
    // 1. Generate main lesson content
    const contentPrompt = `Create a comprehensive lesson about "${baseLesson.topic}" for ${baseLesson.level} level students learning ${baseLesson.target_language === 'en' ? 'English' : 'Arabic'}.
    
    The lesson should include:
    - Clear explanation of the topic
    - Practical examples
    - Real-world applications
    - Learning objectives
    - Key takeaways
    
    Make it engaging, educational, and appropriate for the level.`;
    
    const englishContent = await generateText(contentPrompt, {
      maxTokens: Math.floor(maxTokens * 0.4),
      temperature: 0.4,
      useFallback: true
    });
    aiModelsUsed.push(AI_MODELS.TEXT_GENERATION.LLAMA_3_8B);

    // 2. Translate content to Arabic
    const arabicContent = await translateTextEnhanced(
      englishContent,
      'ar',
      'en',
      { useFallback: true }
    );
    aiModelsUsed.push(AI_MODELS.TRANSLATION.M2M100);

    // 3. Generate vocabulary list
    let vocabulary: VocabularyItem[] = [];
    if (includeVocabulary) {
      vocabulary = await generateLessonVocabulary(
        baseLesson.topic,
        baseLesson.level,
        baseLesson.target_language,
        maxTokens * 0.2
      );
      aiModelsUsed.push(AI_MODELS.TEXT_GENERATION.GEMMA_2B);
    }

    // 4. Generate exercises
    let exercises: Exercise[] = [];
    if (includeExercises) {
      exercises = await generateLessonExercises(
        baseLesson.topic,
        baseLesson.level,
        maxTokens * 0.2
      );
      aiModelsUsed.push(AI_MODELS.TEXT_GENERATION.GEMMA_2B);
    }

    // 5. Generate pronunciation guides
    let pronunciation: PronunciationGuide[] = [];
    if (includePronunciation) {
      pronunciation = await generatePronunciationGuides(
        vocabulary.map(v => v.word),
        baseLesson.target_language,
        maxTokens * 0.1
      );
      aiModelsUsed.push(AI_MODELS.TEXT_GENERATION.GEMMA_2B);
    }

    // 6. Generate cultural notes
    let culturalNotes: CulturalNote[] = [];
    if (includeCulturalNotes) {
      culturalNotes = await generateCulturalNotes(
        baseLesson.topic,
        baseLesson.target_language === 'ar' ? 'arabic' : 'english',
        maxTokens * 0.1
      );
      aiModelsUsed.push(AI_MODELS.TEXT_GENERATION.GEMMA_2B);
    }

    // 7. Generate audio lessons
    let audioLessons: AudioLesson[] = [];
    if (includeAudio) {
      audioLessons = await generateAudioLessons(
        englishContent,
        baseLesson.target_language,
        maxTokens * 0.1
      );
      aiModelsUsed.push(AI_MODELS.TEXT_GENERATION.GEMMA_2B);
    }

    // Calculate estimated cost
    const estimatedCost = calculateEstimatedCost(aiModelsUsed, maxTokens);

    const enhancedLesson: EnhancedLesson = {
      id: baseLesson.id,
      title: baseLesson.title,
      content: {
        english: englishContent,
        arabic: arabicContent
      },
      vocabulary,
      exercises,
      pronunciation,
      cultural_notes: culturalNotes,
      audio_lessons: audioLessons,
      generated_at: new Date().toISOString(),
      ai_models_used: aiModelsUsed,
      estimated_cost: estimatedCost
    };

    const generationTime = Date.now() - startTime;
    console.log(`Enhanced lesson generated in ${generationTime}ms with cost: $${estimatedCost}`);

    return enhancedLesson;

  } catch (error) {
    console.error('Enhanced lesson generation failed:', error);
    throw error;
  }
}

/**
 * Generate vocabulary for the lesson
 */
async function generateLessonVocabulary(
  topic: string,
  level: 'beginner' | 'intermediate' | 'advanced',
  language: 'en' | 'ar',
  maxTokens: number
): Promise<VocabularyItem[]> {
  const prompt = `Generate 10 essential vocabulary words for learning about "${topic}" at ${level} level in ${language === 'en' ? 'English' : 'Arabic'}.
  
  For each word include:
  - The word itself
  - Translation
  - Simple definition
  - Example sentence
  - Difficulty level (beginner/intermediate/advanced)
  
  Format as a structured list.`;
  
  try {
    const response = await generateText(prompt, {
      maxTokens,
      temperature: 0.3,
      useFallback: true
    });
    
    // Parse the response and structure it
    const lines = response.split('\n').filter(line => line.trim());
    const vocabulary: VocabularyItem[] = [];
    
    for (let i = 0; i < lines.length && vocabulary.length < 10; i++) {
      const line = lines[i];
      if (line.includes('-') || line.includes('•')) {
        const parts = line.split(/[-•]/).map(part => part.trim()).filter(part => part);
        if (parts.length >= 4) {
          vocabulary.push({
            word: parts[0] || '',
            translation: parts[1] || '',
            definition: parts[2] || '',
            example_sentence: parts[3] || '',
            difficulty: level,
            audio_url: undefined
          });
        }
      }
    }
    
    return vocabulary;
  } catch (error) {
    console.error('Vocabulary generation failed:', error);
    return [];
  }
}

/**
 * Generate exercises for the lesson
 */
async function generateLessonExercises(
  topic: string,
  level: 'beginner' | 'intermediate' | 'advanced',
  maxTokens: number
): Promise<Exercise[]> {
  const prompt = `Create 5 practice exercises for learning about "${topic}" at ${level} level.
  
  Include different types:
  - Multiple choice questions
  - Fill in the blank
  - Matching exercises
  - Conversation practice
  
  For each exercise provide:
  - Question or instruction
  - Multiple choice options (if applicable)
  - Correct answer
  - Explanation
  - Difficulty rating (1-5)`;
  
  try {
    const response = await generateText(prompt, {
      maxTokens,
      temperature: 0.4,
      useFallback: true
    });
    
    // Parse exercises from response
    const exercises: Exercise[] = [];
    const sections = response.split(/\n\s*\n/).filter(section => section.trim());
    
    for (const section of sections) {
      if (exercises.length >= 5) break;
      
      const lines = section.split('\n').filter(line => line.trim());
      if (lines.length >= 3) {
        exercises.push({
          type: 'multiple_choice',
          question: lines[0] || '',
          options: lines.slice(1, -2).filter(line => line.startsWith('-') || line.startsWith('•')),
          correct_answer: lines[lines.length - 2] || '',
          explanation: lines[lines.length - 1] || '',
          difficulty: Math.floor(Math.random() * 5) + 1
        });
      }
    }
    
    return exercises;
  } catch (error) {
    console.error('Exercise generation failed:', error);
    return [];
  }
}

/**
 * Generate pronunciation guides
 */
async function generatePronunciationGuides(
  words: string[],
  language: 'en' | 'ar',
  maxTokens: number
): Promise<PronunciationGuide[]> {
  const prompt = `Create pronunciation guides for these ${language === 'en' ? 'English' : 'Arabic'} words: ${words.join(', ')}.
  
  For each word include:
  - Phonetic transcription
  - Pronunciation tips
  - Common mistakes to avoid
  - Practice suggestions`;
  
  try {
    const response = await generateText(prompt, {
      maxTokens,
      temperature: 0.3,
      useFallback: true
    });
    
    // Parse pronunciation guides
    const guides: PronunciationGuide[] = [];
    const sections = response.split(/\n\s*\n/).filter(section => section.trim());
    
    for (let i = 0; i < Math.min(sections.length, words.length); i++) {
      const section = sections[i];
      const word = words[i];
      
      guides.push({
        word,
        phonetic: '',
        audio_url: undefined,
        tips: section.split('\n').filter(line => line.includes('tip') || line.includes('Tip')),
        common_mistakes: section.split('\n').filter(line => line.includes('mistake') || line.includes('Mistake'))
      });
    }
    
    return guides;
  } catch (error) {
    console.error('Pronunciation guide generation failed:', error);
    return [];
  }
}

/**
 * Generate cultural notes
 */
async function generateCulturalNotes(
  topic: string,
  culture: 'arabic' | 'english',
  maxTokens: number
): Promise<CulturalNote[]> {
  const prompt = `Provide cultural insights about "${topic}" in ${culture} culture.
  
  Include:
  - Historical background
  - Modern relevance
  - Cultural expressions
  - Examples of usage
  - Learning tips`;
  
  try {
    const response = await generateText(prompt, {
      maxTokens,
      temperature: 0.5,
      useFallback: true
    });
    
    // Parse cultural notes
    const notes: CulturalNote[] = [];
    const sections = response.split(/\n\s*\n/).filter(section => section.trim());
    
    for (const section of sections) {
      const lines = section.split('\n').filter(line => line.trim());
      if (lines.length >= 2) {
        notes.push({
          topic: lines[0] || '',
          description: lines[1] || '',
          relevance: lines[2] || '',
          examples: lines.slice(3).filter(line => line.startsWith('-') || line.startsWith('•'))
        });
      }
    }
    
    return notes;
  } catch (error) {
    console.error('Cultural notes generation failed:', error);
    return [];
  }
}

/**
 * Generate audio lessons
 */
async function generateAudioLessons(
  content: string,
  language: 'en' | 'ar',
  maxTokens: number
): Promise<AudioLesson[]> {
  const prompt = `Create 3 audio lesson segments from this content for ${language === 'en' ? 'English' : 'Arabic'} learners.
  
  Break the content into logical segments:
  - Introduction
  - Main content
  - Summary/Review
  
  For each segment provide:
  - Title
  - Content (2-3 sentences)
  - Estimated duration
  - Transcript`;
  
  try {
    const response = await generateText(prompt, {
      maxTokens,
      temperature: 0.4,
      useFallback: true
    });
    
    // Parse audio lessons
    const lessons: AudioLesson[] = [];
    const sections = response.split(/\n\s*\n/).filter(section => section.trim());
    
    for (const section of sections) {
      if (lessons.length >= 3) break;
      
      const lines = section.split('\n').filter(line => line.trim());
      if (lines.length >= 3) {
        lessons.push({
          title: lines[0] || '',
          content: lines[1] || '',
          audio_url: undefined,
          duration: Math.floor(Math.random() * 60) + 30, // 30-90 seconds
          transcript: lines.slice(2).join(' ')
        });
      }
    }
    
    return lessons;
  } catch (error) {
    console.error('Audio lesson generation failed:', error);
    return [];
  }
}

/**
 * Calculate estimated cost for AI usage
 */
function calculateEstimatedCost(aiModels: string[], totalTokens: number): number {
  const costPerToken = 0.0000002; // $0.20 per 1M tokens
  const baseCost = totalTokens * costPerToken;
  
  // Add model-specific costs
  let additionalCost = 0;
  for (const model of aiModels) {
    if (model.includes('stable-diffusion')) {
      additionalCost += 0.0025; // $0.0025 per image
    } else if (model.includes('melotts')) {
      additionalCost += 0.00000015; // $0.15 per 1M characters
    }
  }
  
  return baseCost + additionalCost;
}

/**
 * Cache enhanced lessons for cost optimization
 */
export class LessonCache {
  private cache = new Map<string, { lesson: EnhancedLesson; timestamp: number }>();
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  set(key: string, lesson: EnhancedLesson): void {
    this.cache.set(key, {
      lesson,
      timestamp: Date.now()
    });
  }

  get(key: string): EnhancedLesson | null {
    const cached = this.cache.get(key);
    if (!cached) return null;
    
    if (Date.now() - cached.timestamp > this.CACHE_DURATION) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.lesson;
  }

  clear(): void {
    this.cache.clear();
  }

  getStats(): { size: number; hitRate: number } {
    return {
      size: this.cache.size,
      hitRate: 0 // Would need to track hits/misses for accurate rate
    };
  }
}

// Global lesson cache instance
export const lessonCache = new LessonCache();

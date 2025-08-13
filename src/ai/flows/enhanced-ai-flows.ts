/**
 * Enhanced AI Flows using Cloudflare AI Models
 * Cost-effective and feature-rich AI integration
 */

import { 
  generateText, 
  translateTextEnhanced, 
  generateImage, 
  generateSpeech,
  AI_MODELS,
  getAiCostEstimate 
} from '../../lib/cloudflare-ai';
import { speakText } from '../../lib/tts-system';

// ===== VOCABULARY LEARNING =====

/**
 * Generate vocabulary quiz with AI
 */
export async function generateVocabularyQuiz(
  topic: string,
  level: 'beginner' | 'intermediate' | 'advanced',
  language: 'en' | 'ar' = 'en'
) {
  const prompt = `Create a vocabulary quiz about "${topic}" for ${level} level students. 
  Include 10 words with:
  - Word definition
  - Example sentence
  - Multiple choice options (4 choices)
  - Correct answer
  - Difficulty level
  
  Format as JSON.`;
  
  try {
    const response = await generateText(prompt, {
      maxTokens: 800,
      temperature: 0.3,
      useFallback: true
    });
    
    // Parse JSON response
    try {
      return JSON.parse(response);
    } catch {
      // Fallback: return structured text
      return {
        topic,
        level,
        words: response.split('\n').filter(line => line.trim()),
        generatedAt: new Date().toISOString()
      };
    }
  } catch (error) {
    console.error('Vocabulary quiz generation failed:', error);
    throw error;
  }
}

/**
 * Generate contextual sentences for vocabulary
 */
export async function generateContextualSentences(
  word: string,
  language: 'en' | 'ar' = 'en',
  count: number = 3
) {
  const prompt = `Generate ${count} contextual sentences using the word "${word}" in ${language === 'en' ? 'English' : 'Arabic'}.
  Make sentences:
  - Natural and everyday usage
  - Different contexts
  - Appropriate for language learners
  - Include translation if needed`;
  
  try {
    const response = await generateText(prompt, {
      maxTokens: 400,
      temperature: 0.7,
      useFallback: true
    });
    
    return {
      word,
      language,
      sentences: response.split('\n').filter(line => line.trim()),
      generatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Contextual sentences generation failed:', error);
    throw error;
  }
}

// ===== GRAMMAR LEARNING =====

/**
 * Generate grammar explanations
 */
export async function generateGrammarExplanation(
  grammarTopic: string,
  level: 'beginner' | 'intermediate' | 'advanced',
  language: 'en' | 'ar' = 'ar'
) {
  const prompt = `Explain the grammar topic "${grammarTopic}" for ${level} level students in ${language === 'en' ? 'English' : 'Arabic'}.
  Include:
  - Clear explanation
  - Examples
  - Common mistakes to avoid
  - Practice exercises
  - When to use this grammar`;
  
  try {
    const response = await generateText(prompt, {
      maxTokens: 600,
      temperature: 0.4,
      useFallback: true
    });
    
    return {
      topic: grammarTopic,
      level,
      language,
      explanation: response,
      generatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Grammar explanation generation failed:', error);
    throw error;
  }
}

/**
 * Generate grammar practice exercises
 */
export async function generateGrammarExercises(
  grammarTopic: string,
  level: 'beginner' | 'intermediate' | 'advanced',
  exerciseCount: number = 5
) {
  const prompt = `Create ${exerciseCount} grammar practice exercises for "${grammarTopic}" at ${level} level.
  Each exercise should include:
  - Question
  - Multiple choice answers (4 options)
  - Correct answer
  - Explanation
  - Difficulty rating (1-5)`;
  
  try {
    const response = await generateText(prompt, {
      maxTokens: 800,
      temperature: 0.3,
      useFallback: true
    });
    
    return {
      topic: grammarTopic,
      level,
      exercises: response.split('\n\n').filter(ex => ex.trim()),
      generatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Grammar exercises generation failed:', error);
    throw error;
  }
}

// ===== CONVERSATION PRACTICE =====

/**
 * Generate conversation scenarios
 */
export async function generateConversationScenario(
  topic: string,
  level: 'beginner' | 'intermediate' | 'advanced',
  participants: number = 2
) {
  const prompt = `Create a natural conversation scenario about "${topic}" for ${level} level language learners.
  Include:
  - Setting/context
  - ${participants} participants with distinct personalities
  - Natural dialogue with common expressions
  - Vocabulary notes
  - Cultural context if relevant
  - Practice questions`;
  
  try {
    const response = await generateText(prompt, {
      maxTokens: 1000,
      temperature: 0.6,
      useFallback: true
    });
    
    return {
      topic,
      level,
      participants,
      scenario: response,
      generatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Conversation scenario generation failed:', error);
    throw error;
  }
}

/**
 * Generate role-play dialogues
 */
export async function generateRolePlayDialogue(
  situation: string,
  level: 'beginner' | 'intermediate' | 'advanced',
  roles: string[] = ['Person A', 'Person B']
) {
  const prompt = `Create a role-play dialogue for the situation: "${situation}" at ${level} level.
  Roles: ${roles.join(', ')}
  
  Include:
  - Opening lines
  - Natural conversation flow
  - Common expressions and phrases
  - Cultural notes
  - Alternative responses
  - Practice tips`;
  
  try {
    const response = await generateText(prompt, {
      maxTokens: 800,
      temperature: 0.5,
      useFallback: true
    });
    
    return {
      situation,
      level,
      roles,
      dialogue: response,
      generatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Role-play dialogue generation failed:', error);
    throw error;
  }
}

// ===== STORY GENERATION =====

/**
 * Generate educational stories
 */
export async function generateEducationalStory(
  topic: string,
  level: 'beginner' | 'intermediate' | 'advanced',
  storyType: 'adventure' | 'moral' | 'educational' | 'cultural' = 'educational'
) {
  const prompt = `Create a ${storyType} story about "${topic}" for ${level} level language learners.
  The story should:
  - Be engaging and age-appropriate
  - Include target vocabulary naturally
  - Have a clear beginning, middle, and end
  - Include dialogue and descriptions
  - Be 300-500 words
  - Include comprehension questions at the end`;
  
  try {
    const response = await generateText(prompt, {
      maxTokens: 1000,
      temperature: 0.7,
      useFallback: true
    });
    
    return {
      topic,
      level,
      type: storyType,
      story: response,
      generatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Educational story generation failed:', error);
    throw error;
  }
}

/**
 * Generate story illustrations
 */
export async function generateStoryIllustration(
  storyDescription: string,
  style: 'cartoon' | 'realistic' | 'watercolor' | 'digital' = 'cartoon'
) {
  try {
    const prompt = `Create a ${style} illustration for this story scene: ${storyDescription}
    Style: Educational, child-friendly, colorful, clear details
    Composition: Engaging, story-telling, appropriate for language learning`;
    
    const response = await generateImage(prompt, {
      width: 1024,
      height: 768,
      steps: 25 // Higher quality
    });
    
    return {
      description: storyDescription,
      style,
      image: response,
      generatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Story illustration generation failed:', error);
    throw error;
  }
}

// ===== PRONUNCIATION & SPEAKING =====

/**
 * Generate pronunciation guides
 */
export async function generatePronunciationGuide(
  word: string,
  language: 'en' | 'ar' = 'en'
) {
  const prompt = `Create a pronunciation guide for "${word}" in ${language === 'en' ? 'English' : 'Arabic'}.
  Include:
  - Phonetic transcription
  - Audio pronunciation tips
  - Common mispronunciations
  - Practice exercises
  - Similar words for practice`;
  
  try {
    const response = await generateText(prompt, {
      maxTokens: 400,
      temperature: 0.3,
      useFallback: true
    });
    
    // Generate audio pronunciation
    const audioResult = await speakText(word, {
      lang: language,
      rate: 0.8, // Slower for learning
      useCloudflare: false // Try browser first
    });
    
    return {
      word,
      language,
      guide: response,
      audio: audioResult.audio,
      audioMethod: audioResult.method,
      generatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Pronunciation guide generation failed:', error);
    throw error;
  }
}

// ===== CULTURAL LEARNING =====

/**
 * Generate cultural insights
 */
export async function generateCulturalInsight(
  topic: string,
  culture: 'arabic' | 'english' | 'general' = 'general',
  aspect: 'customs' | 'traditions' | 'language' | 'food' | 'history' = 'customs'
) {
  const prompt = `Provide cultural insights about "${topic}" focusing on ${aspect} in ${culture} culture.
  Include:
  - Historical background
  - Modern relevance
  - Language connections
  - Cultural expressions
  - Do's and don'ts
  - Interactive learning activities`;
  
  try {
    const response = await generateText(prompt, {
      maxTokens: 800,
      temperature: 0.5,
      useFallback: true
    });
    
    return {
      topic,
      culture,
      aspect,
      insight: response,
      generatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Cultural insight generation failed:', error);
    throw error;
  }
}

// ===== PROGRESS TRACKING =====

/**
 * Generate personalized learning recommendations
 */
export async function generateLearningRecommendations(
  userLevel: 'beginner' | 'intermediate' | 'advanced',
  interests: string[],
  weakAreas: string[],
  goals: string[]
) {
  const prompt = `Create personalized learning recommendations for a ${userLevel} level language learner.
  
  Interests: ${interests.join(', ')}
  Areas to improve: ${weakAreas.join(', ')}
  Goals: ${goals.join(', ')}
  
  Provide:
  - Recommended learning activities
  - Practice exercises
  - Resource suggestions
  - Study schedule
  - Progress milestones
  - Motivation tips`;
  
  try {
    const response = await generateText(prompt, {
      maxTokens: 600,
      temperature: 0.4,
      useFallback: true
    });
    
    return {
      level: userLevel,
      recommendations: response,
      generatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Learning recommendations generation failed:', error);
    throw error;
  }
}

// ===== COST OPTIMIZATION =====

/**
 * Get AI usage analytics and cost estimates
 */
export function getAIUsageAnalytics() {
  return {
    models: AI_MODELS,
    costEstimates: {
      textGeneration: getAiCostEstimate(AI_MODELS.TEXT_GENERATION.LLAMA_3_8B, 1000, 500),
      translation: getAiCostEstimate(AI_MODELS.TRANSLATION.M2M100, 500, 500),
      tts: getAiCostEstimate(AI_MODELS.TTS.MELOTTS, 1000, 0),
      image: getAiCostEstimate(AI_MODELS.IMAGE.STABLE_DIFFUSION, 0, 0)
    },
    optimizationTips: [
      'Use browser TTS when possible (free)',
      'Use fallback models for cost savings',
      'Limit token usage with maxTokens parameter',
      'Cache generated content when possible',
      'Use appropriate model sizes for tasks'
    ]
  };
}

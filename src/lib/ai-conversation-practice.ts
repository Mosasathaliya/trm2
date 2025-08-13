/**
 * AI-Powered Conversation Practice System
 * Provides interactive conversation practice using Cloudflare AI models
 */

import { 
  generateText, 
  translateTextEnhanced,
  AI_MODELS 
} from './cloudflare-ai';
import { speakText } from './tts-system';

export interface ConversationSession {
  id: string;
  topic: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  language: 'en' | 'ar';
  participants: ConversationParticipant[];
  messages: ConversationMessage[];
  vocabulary: VocabularyItem[];
  grammar_focus: string[];
  cultural_notes: string[];
  session_start: string;
  last_activity: string;
  total_messages: number;
  ai_models_used: string[];
  estimated_cost: number;
}

export interface ConversationParticipant {
  id: string;
  name: string;
  role: 'student' | 'teacher' | 'ai_partner' | 'native_speaker';
  personality: string;
  language_level: 'beginner' | 'intermediate' | 'advanced';
  avatar?: string;
}

export interface ConversationMessage {
  id: string;
  participant_id: string;
  content: string;
  translation?: string;
  timestamp: string;
  message_type: 'text' | 'audio' | 'correction' | 'hint';
  corrections?: MessageCorrection[];
  audio_url?: string;
}

export interface MessageCorrection {
  original: string;
  corrected: string;
  explanation: string;
  grammar_rule?: string;
  suggestion?: string;
}

export interface VocabularyItem {
  word: string;
  translation: string;
  definition: string;
  example: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  audio_url?: string;
}

export interface ConversationScenario {
  id: string;
  title: string;
  description: string;
  setting: string;
  participants: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  topics: string[];
  cultural_context?: string;
  learning_objectives: string[];
  estimated_duration: number; // minutes
}

/**
 * Generate conversation scenarios
 */
export async function generateConversationScenarios(
  level: 'beginner' | 'intermediate' | 'advanced',
  topics: string[] = [],
  count: number = 5
): Promise<ConversationScenario[]> {
  const prompt = `Generate ${count} conversation scenarios for ${level} level language learners.
  
  Topics to include: ${topics.length > 0 ? topics.join(', ') : 'general everyday situations'}
  
  For each scenario include:
  - Engaging title
  - Clear description
  - Realistic setting
  - Number of participants
  - Difficulty level
  - Relevant topics
  - Cultural context (if applicable)
  - Learning objectives
  - Estimated duration
  
  Make scenarios practical and engaging for language practice.`;
  
  try {
    const response = await generateText(prompt, {
      maxTokens: 1200,
      temperature: 0.6,
      useFallback: true
    });
    
    // Parse scenarios from response
    const scenarios: ConversationScenario[] = [];
    const sections = response.split(/\n\s*\n/).filter(section => section.trim());
    
    for (const section of sections) {
      if (scenarios.length >= count) break;
      
      const lines = section.split('\n').filter(line => line.trim());
      if (lines.length >= 6) {
        scenarios.push({
          id: `scenario_${scenarios.length + 1}`,
          title: lines[0] || '',
          description: lines[1] || '',
          setting: lines[2] || '',
          participants: parseInt(lines[3]) || 2,
          difficulty: level,
          topics: lines[4]?.split(',').map(t => t.trim()) || [],
          cultural_context: lines[5] || undefined,
          learning_objectives: lines.slice(6).filter(line => line.startsWith('-') || line.startsWith('•')),
          estimated_duration: Math.floor(Math.random() * 15) + 5 // 5-20 minutes
        });
      }
    }
    
    return scenarios;
  } catch (error) {
    console.error('Conversation scenarios generation failed:', error);
    return [];
  }
}

/**
 * Start a new conversation session
 */
export async function startConversationSession(
  scenario: ConversationScenario,
  studentLevel: 'beginner' | 'intermediate' | 'advanced',
  targetLanguage: 'en' | 'ar'
): Promise<ConversationSession> {
  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  // Generate AI conversation partner
  const aiPartner = await generateAIConversationPartner(scenario, studentLevel, targetLanguage);
  
  // Generate initial conversation starter
  const starterMessage = await generateConversationStarter(scenario, aiPartner, targetLanguage);
  
  // Generate relevant vocabulary
  const vocabulary = await generateConversationVocabulary(scenario, studentLevel, targetLanguage);
  
  // Generate grammar focus areas
  const grammarFocus = await generateGrammarFocus(scenario, studentLevel, targetLanguage);
  
  // Generate cultural notes
  const culturalNotes = await generateCulturalNotes(scenario, targetLanguage);
  
  const session: ConversationSession = {
    id: sessionId,
    topic: scenario.title,
    level: studentLevel,
    language: targetLanguage,
    participants: [
      {
        id: 'student',
        name: 'Student',
        role: 'student',
        personality: 'Eager to learn and practice',
        language_level: studentLevel
      },
      aiPartner
    ],
    messages: [starterMessage],
    vocabulary,
    grammar_focus: grammarFocus,
    cultural_notes: culturalNotes,
    session_start: new Date().toISOString(),
    last_activity: new Date().toISOString(),
    total_messages: 1,
    ai_models_used: [AI_MODELS.TEXT_GENERATION.LLAMA_3_8B],
    estimated_cost: 0.001 // Initial setup cost
  };
  
  return session;
}

/**
 * Generate AI conversation partner
 */
async function generateAIConversationPartner(
  scenario: ConversationScenario,
  studentLevel: 'beginner' | 'intermediate' | 'advanced',
  language: 'en' | 'ar'
): Promise<ConversationParticipant> {
  const prompt = `Create an AI conversation partner for a ${scenario.title} scenario.
  
  Student level: ${studentLevel}
  Language: ${language === 'en' ? 'English' : 'Arabic'}
  Setting: ${scenario.setting}
  
  The AI partner should:
  - Have a distinct personality
  - Be appropriate for the student's level
  - Help guide the conversation naturally
  - Provide gentle corrections when needed
  - Be culturally appropriate
  
  Provide:
  - Name
  - Personality description
  - Role in the conversation
  - Language level (should be native or advanced)`;
  
  try {
    const response = await generateText(prompt, {
      maxTokens: 300,
      temperature: 0.7,
      useFallback: true
    });
    
    const lines = response.split('\n').filter(line => line.trim());
    
    return {
      id: 'ai_partner',
      name: lines[0] || 'AI Partner',
      role: 'ai_partner',
      personality: lines[1] || 'Helpful and engaging',
      language_level: 'advanced',
      avatar: undefined
    };
  } catch (error) {
    console.error('AI partner generation failed:', error);
    return {
      id: 'ai_partner',
      name: 'AI Partner',
      role: 'ai_partner',
      personality: 'Helpful and engaging conversation partner',
      language_level: 'advanced'
    };
  }
}

/**
 * Generate conversation starter
 */
async function generateConversationStarter(
  scenario: ConversationScenario,
  aiPartner: ConversationParticipant,
  language: 'en' | 'ar'
): Promise<ConversationMessage> {
  const prompt = `Generate a natural conversation starter for the scenario: ${scenario.title}
  
  Setting: ${scenario.setting}
  AI Partner: ${aiPartner.name} (${aiPartner.personality})
  Language: ${language === 'en' ? 'English' : 'Arabic'}
  
  The starter should:
  - Be natural and engaging
  - Set the context for the conversation
  - Be appropriate for the setting
  - Encourage the student to respond
  - Be culturally appropriate`;
  
  try {
    const response = await generateText(prompt, {
      maxTokens: 200,
      temperature: 0.6,
      useFallback: true
    });
    
    return {
      id: `msg_${Date.now()}`,
      participant_id: 'ai_partner',
      content: response,
      timestamp: new Date().toISOString(),
      message_type: 'text'
    };
  } catch (error) {
    console.error('Conversation starter generation failed:', error);
    return {
      id: `msg_${Date.now()}`,
      participant_id: 'ai_partner',
      content: language === 'en' ? 'Hello! How are you today?' : 'مرحباً! كيف حالك اليوم؟',
      timestamp: new Date().toISOString(),
      message_type: 'text'
    };
  }
}

/**
 * Generate conversation vocabulary
 */
async function generateConversationVocabulary(
  scenario: ConversationScenario,
  level: 'beginner' | 'intermediate' | 'advanced',
  language: 'en' | 'ar'
): Promise<VocabularyItem[]> {
  const prompt = `Generate 8-10 essential vocabulary words for the conversation scenario: ${scenario.title}
  
  Student level: ${level}
  Language: ${language === 'en' ? 'English' : 'Arabic'}
  Topics: ${scenario.topics.join(', ')}
  
  For each word include:
  - The word itself
  - Translation
  - Simple definition
  - Example sentence
  - Difficulty level
  
  Focus on words that will be useful in this specific conversation.`;
  
  try {
    const response = await generateText(prompt, {
      maxTokens: 600,
      temperature: 0.4,
      useFallback: true
    });
    
    // Parse vocabulary from response
    const vocabulary: VocabularyItem[] = [];
    const lines = response.split('\n').filter(line => line.trim());
    
    for (let i = 0; i < lines.length && vocabulary.length < 10; i++) {
      const line = lines[i];
      if (line.includes('-') || line.includes('•')) {
        const parts = line.split(/[-•]/).map(part => part.trim()).filter(part => part);
        if (parts.length >= 4) {
          vocabulary.push({
            word: parts[0] || '',
            translation: parts[1] || '',
            definition: parts[2] || '',
            example: parts[3] || '',
            difficulty: level,
            audio_url: undefined
          });
        }
      }
    }
    
    return vocabulary;
  } catch (error) {
    console.error('Conversation vocabulary generation failed:', error);
    return [];
  }
}

/**
 * Generate grammar focus areas
 */
async function generateGrammarFocus(
  scenario: ConversationScenario,
  level: 'beginner' | 'intermediate' | 'advanced',
  language: 'en' | 'ar'
): Promise<string[]> {
  const prompt = `Identify 3-4 key grammar areas to focus on during this conversation: ${scenario.title}
  
  Student level: ${level}
  Language: ${language === 'en' ? 'English' : 'Arabic'}
  Topics: ${scenario.topics.join(', ')}
  
  Focus on grammar that:
  - Is commonly used in this type of conversation
  - Is appropriate for the student's level
  - Will help improve their speaking skills
  - Is relevant to the cultural context`;
  
  try {
    const response = await generateText(prompt, {
      maxTokens: 300,
      temperature: 0.3,
      useFallback: true
    });
    
    return response.split('\n')
      .filter(line => line.trim())
      .map(line => line.replace(/^[-•]\s*/, ''))
      .slice(0, 4);
  } catch (error) {
    console.error('Grammar focus generation failed:', error);
    return ['Basic greetings', 'Present tense', 'Question formation'];
  }
}

/**
 * Generate cultural notes
 */
async function generateCulturalNotes(
  scenario: ConversationScenario,
  language: 'en' | 'ar'
): Promise<string[]> {
  if (!scenario.cultural_context) {
    return [];
  }
  
  const prompt = `Provide 2-3 cultural insights for the conversation scenario: ${scenario.title}
  
  Cultural context: ${scenario.cultural_context}
  Language: ${language === 'en' ? 'English' : 'Arabic'}
  
  Focus on:
  - Cultural norms and expectations
  - Appropriate behavior
  - Language etiquette
  - Cultural expressions`;
  
  try {
    const response = await generateText(prompt, {
      maxTokens: 400,
      temperature: 0.5,
      useFallback: true
    });
    
    return response.split('\n')
      .filter(line => line.trim())
      .map(line => line.replace(/^[-•]\s*/, ''))
      .slice(0, 3);
  } catch (error) {
    console.error('Cultural notes generation failed:', error);
    return [];
  }
}

/**
 * Generate AI response to student message
 */
export async function generateAIResponse(
  session: ConversationSession,
  studentMessage: string,
  context: {
    previousMessages: ConversationMessage[];
    vocabulary: VocabularyItem[];
    grammarFocus: string[];
  }
): Promise<ConversationMessage> {
  const prompt = `You are ${session.participants.find(p => p.role === 'ai_partner')?.name}, an AI conversation partner.
  
  Conversation topic: ${session.topic}
  Student level: ${session.level}
  Language: ${session.language === 'en' ? 'English' : 'Arabic'}
  
  Student's message: "${studentMessage}"
  
  Previous conversation context:
  ${context.previousMessages.slice(-3).map(msg => `${msg.participant_id}: ${msg.content}`).join('\n')}
  
  Vocabulary to use: ${context.vocabulary.map(v => v.word).join(', ')}
  Grammar focus: ${context.grammarFocus.join(', ')}
  
  Respond naturally as if you're having a real conversation. Your response should:
  - Be engaging and conversational
  - Use some of the target vocabulary
  - Demonstrate proper grammar
  - Encourage the student to continue
  - Be appropriate for their language level
  - Be culturally appropriate
  
  Keep your response to 1-2 sentences.`;
  
  try {
    const response = await generateText(prompt, {
      maxTokens: 150,
      temperature: 0.7,
      useFallback: true
    });
    
    // Check for grammar corrections
    const corrections = await checkGrammar(studentMessage, session.language, session.level);
    
    return {
      id: `msg_${Date.now()}`,
      participant_id: 'ai_partner',
      content: response,
      timestamp: new Date().toISOString(),
      message_type: 'text',
      corrections
    };
  } catch (error) {
    console.error('AI response generation failed:', error);
    return {
      id: `msg_${Date.now()}`,
      participant_id: 'ai_partner',
      content: session.language === 'en' ? 'That\'s interesting! Tell me more.' : 'هذا مثير للاهتمام! أخبرني المزيد.',
      timestamp: new Date().toISOString(),
      message_type: 'text'
    };
  }
}

/**
 * Check grammar and provide corrections
 */
async function checkGrammar(
  message: string,
  language: 'en' | 'ar',
  level: 'beginner' | 'intermediate' | 'advanced'
): Promise<MessageCorrection[]> {
  const prompt = `Check the grammar of this ${language === 'en' ? 'English' : 'Arabic'} message: "${message}"
  
  Student level: ${level}
  
  If there are grammar errors, provide:
  - The original text
  - Corrected version
  - Brief explanation
  - Grammar rule (if applicable)
  - Helpful suggestion
  
  If the grammar is correct, respond with "No corrections needed."
  
  Be gentle and encouraging in your corrections.`;
  
  try {
    const response = await generateText(prompt, {
      maxTokens: 300,
      temperature: 0.3,
      useFallback: true
    });
    
    if (response.toLowerCase().includes('no corrections needed')) {
      return [];
    }
    
    // Parse corrections from response
    const corrections: MessageCorrection[] = [];
    const sections = response.split(/\n\s*\n/).filter(section => section.trim());
    
    for (const section of sections) {
      const lines = section.split('\n').filter(line => line.trim());
      if (lines.length >= 3) {
        corrections.push({
          original: lines[0] || '',
          corrected: lines[1] || '',
          explanation: lines[2] || '',
          grammar_rule: lines[3] || undefined,
          suggestion: lines[4] || undefined
        });
      }
    }
    
    return corrections;
  } catch (error) {
    console.error('Grammar check failed:', error);
    return [];
  }
}

/**
 * Generate audio for message
 */
export async function generateMessageAudio(
  message: string,
  language: 'en' | 'ar'
): Promise<string | null> {
  try {
    const result = await speakText(message, {
      lang: language,
      rate: 0.9, // Slightly slower for learning
      useCloudflare: false // Try browser first
    });
    
    return result.audio || null;
  } catch (error) {
    console.error('Message audio generation failed:', error);
    return null;
  }
}

/**
 * Get conversation analytics
 */
export function getConversationAnalytics(session: ConversationSession) {
  const totalMessages = session.messages.length;
  const studentMessages = session.messages.filter(m => m.participant_id === 'student').length;
  const aiMessages = session.messages.filter(m => m.participant_id === 'ai_partner').length;
  const corrections = session.messages.reduce((total, msg) => total + (msg.corrections?.length || 0), 0);
  
  return {
    sessionId: session.id,
    duration: Date.now() - new Date(session.session_start).getTime(),
    totalMessages,
    studentMessages,
    aiMessages,
    corrections,
    vocabularyUsed: session.vocabulary.length,
    grammarFocusAreas: session.grammar_focus.length,
    culturalNotes: session.cultural_notes.length,
    aiModelsUsed: session.ai_models_used,
    estimatedCost: session.estimated_cost
  };
}

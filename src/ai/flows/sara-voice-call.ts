'use server';

/**
 * @fileOverview Implements the Sara voice call flow using Cloudflare Workers AI.
 */
import { z } from 'zod';
import { runAi } from '@/lib/cloudflare-ai';

const ConversationEntrySchema = z.object({
  speaker: z.enum(['User', 'Sara']),
  message: z.string(),
});

export type SaraVoiceCallInput = z.infer<typeof SaraVoiceCallInputSchema>;
const SaraVoiceCallInputSchema = z.object({
  englishGrammarConcept: z.string().describe('The English grammar concept or question from the user.'),
  userLanguageProficiency: z.string().describe("The user's proficiency level in English."),
  conversationHistory: z.array(ConversationEntrySchema).optional().default([]).describe('The history of the conversation so far.'),
});

export type SaraVoiceCallOutput = {
  explanation: string;
};

export async function saraVoiceCall(input: SaraVoiceCallInput): Promise<SaraVoiceCallOutput> {
  const { englishGrammarConcept, userLanguageProficiency, conversationHistory } = input;
  
  const systemPrompt = `You are Sara, an expert AI teacher from Speed of Mastery. Your personality is friendly, helpful, and patient.
You are a master of both English and Arabic. Your specialty is explaining English grammar concepts using clear, simple, and natural-sounding Arabic.
You MUST tailor your explanation to the user's stated proficiency level: "${userLanguageProficiency}".
Your goal is to provide explanations that are easy for an Arabic speaker to understand. Use useful examples to illustrate your points.
Address the user directly and conversationally.
You MUST reply with ONLY the explanation text, without any introductory phrases like "Here is the explanation:".`;

  const history = conversationHistory.map(entry => ({
      role: entry.speaker === 'User' ? 'user' : 'assistant',
      content: entry.message
  }));

  const messages = [
    { role: 'system', content: systemPrompt },
    ...history,
    { role: 'user', content: englishGrammarConcept },
  ];

  const response = await runAi({ model: '@cf/meta/llama-3-8b-instruct', inputs: { messages } });
  const jsonResponse = await response.json();
  const explanation = jsonResponse.result.response;

  return { explanation };
}

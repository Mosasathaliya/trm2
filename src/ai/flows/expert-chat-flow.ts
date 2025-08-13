'use server';
/**
 * @fileOverview A conversational flow for a lesson-specific expert AI using Cloudflare Workers AI.
 */
import { z } from 'zod';
import { runAi } from '@/lib/cloudflare-ai';

const MessageSchema = z.object({
  role: z.enum(['user', 'model', 'system']),
  content: z.string(),
});

const ExpertChatInputSchema = z.object({
  lessonTitle: z.string().describe('The title of the lesson being discussed.'),
  lessonExplanation: z.string().describe('The core explanation of the lesson topic.'),
  history: z.array(MessageSchema).describe('The previous conversation history.'),
  question: z.string().describe("The user's new question about the lesson."),
});
export type ExpertChatInput = z.infer<typeof ExpertChatInputSchema>;

export type ExpertChatOutput = {
    answer: string;
};

export async function expertChat(input: ExpertChatInput): Promise<ExpertChatOutput> {
    const { lessonTitle, lessonExplanation, history, question } = input;

    const systemPrompt = `You are an expert English language tutor from Speed of Mastery, fluent in both English and Arabic.
Your current topic of expertise is "${lessonTitle}". The core explanation for this topic is: "${lessonExplanation}".
Your primary language for interacting with the user is ARABIC. Answer the user's questions based on the lesson topic and the provided conversation history.
Be friendly, clear, and concise. Your goal is to provide accurate and natural-sounding Arabic explanations.
You MUST reply with ONLY the answer text, without any introductory phrases.`;

    const messages = [
        { role: 'system', content: systemPrompt },
        ...history.map(h => ({ role: h.role === 'model' ? 'assistant' : 'user', content: h.content })),
        { role: 'user', content: question },
    ];

    const response = await runAi({ model: '@cf/meta/llama-3-8b-instruct', inputs: { messages } });
    const jsonResponse = await response.json();
    const responseText = jsonResponse.result.response;
    
    return { answer: responseText };
}

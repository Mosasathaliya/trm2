'use server';
/**
 * @fileOverview This flow generates a detailed Arabic explanation for a specific English grammar topic.
 */
import { z } from 'zod';
import { runAi } from '../../lib/cloudflare-ai';

export type GenerateExplanationInput = z.infer<typeof GenerateExplanationInputSchema>;
const GenerateExplanationInputSchema = z.object({
  grammarTopic: z.string().describe('The specific English grammar topic to be explained.'),
  level: z.string().describe('The level of the student (e.g., Beginner, Intermediate).')
});

export type GenerateExplanationOutput = {
  arabicExplanation: string;
};

export async function generateArabicExplanation(input: GenerateExplanationInput): Promise<GenerateExplanationOutput> {
  const { grammarTopic, level } = input;
  
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    return { 
      arabicExplanation: `شرح مؤقت لموضوع "${grammarTopic}" للمستوى ${level}. سيتم تحديث هذا المحتوى عند التشغيل.` 
    };
  }
  
  const prompt = `Please provide a detailed explanation in Arabic for the following English grammar topic: "${grammarTopic}".
The explanation should be clear, easy to understand, and suitable for a student at the "${level}" level.
Use examples where appropriate to illustrate the concepts.
Your response should ONLY be the Arabic explanation text, without any introductory phrases like "Here is the explanation:".`;

  const messages = [
    { role: 'system', content: 'You are an expert English grammar teacher who is fluent in both English and Arabic. Your task is to provide a clear, comprehensive, and natural-sounding explanation of a given English grammar topic entirely in Arabic.'},
    { role: 'user', content: prompt }
  ];

  try {
    const response = await runAi({ model: '@cf/meta/llama-3-8b-instruct', inputs: { messages } });
    const jsonResponse = await response.json();
    const explanation = jsonResponse.result.response;
    
    return { arabicExplanation: explanation };
  } catch (error) {
    console.error('Failed to generate AI explanation:', error);
    return { 
      arabicExplanation: `شرح مؤقت لموضوع "${grammarTopic}" للمستوى ${level}. حدث خطأ في توليد المحتوى.` 
    };
  }
}

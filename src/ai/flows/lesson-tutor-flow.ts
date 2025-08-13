'use server';
/**
 * @fileOverview Provides AI-powered tutoring assistance for specific lesson content using Cloudflare Workers AI.
 */
import { z } from 'zod';
import { runAi } from '@/lib/cloudflare-ai';

export type LessonTutorInput = z.infer<typeof LessonTutorInputSchema>;
const LessonTutorInputSchema = z.object({
  studentQuestion: z.string().describe('The question asked by the student.'),
  lessonTitle: z.string().describe('The title of the lesson.'),
  lessonTopic: z.string().describe('The topic of the lesson.'),
  lessonLevel: z.string().describe('The level of the lesson (e.g., Beginner, Intermediate, Advanced).'),
  lessonArabicExplanation: z.string().describe('The Arabic explanation of the lesson.'),
  lessonExamples: z.array(
    z.object({
      english: z.string().describe('The English example.'),
      arabic: z.string().describe('The Arabic translation of the example.'),
      imagePrompt: z.string().optional(),
      imageUrl: z.string().optional(),
    })
  ).describe('Examples provided in the lesson.'),
  lessonAdditionalNotesArabic: z.string().optional().describe('Additional notes for the lesson in Arabic.'),
  lessonCommonMistakesArabic: z.string().optional().describe('Common mistakes students make in the lesson in Arabic.'),
});

export type LessonTutorOutput = {
  aiTutorResponse: string;
};

export async function getLessonTutorResponse(input: LessonTutorInput): Promise<LessonTutorOutput> {
  const { studentQuestion, lessonTitle, lessonTopic, lessonLevel, lessonArabicExplanation, lessonExamples, lessonAdditionalNotesArabic, lessonCommonMistakesArabic } = input;
  
  const examplesText = lessonExamples.map(ex => `- English: "${ex.english}", Arabic: "${ex.arabic}"`).join('\n');
  
  const systemPrompt = `You are a specialist AI English language tutor from Speed of Mastery, fluent in English and Arabic.
Your entire response MUST be in natural, helpful, and encouraging Arabic.
Your personality is patient and supportive.`;

  const userPrompt = `You are tutoring a student on an English lesson.
Lesson Title: "${lessonTitle}"
Topic: "${lessonTopic}"
Level: "${level}"

Here is the core lesson material (in Arabic) you must use to answer the question:
---
Lesson Explanation: "${lessonArabicExplanation}"
---
Lesson Examples:
${examplesText}
---
Additional Notes: "${lessonAdditionalNotesArabic || 'None'}"
---
Common Mistakes: "${lessonCommonMistakesArabic || 'None'}"
---

The student's question is: "${studentQuestion}"

Your task is to provide a clear, helpful, and concise answer to the student's question **in Arabic only**.
- Base your answer on the lesson material provided.
- If it helps, refer to the lesson explanation or examples to clarify your answer.
- If the student's question is unclear, politely ask for clarification in Arabic, but try to provide a helpful answer first if possible.
- Your response should be complete and ready to display directly to the student. Do not add any extra conversational text like "Here is the answer". Just provide the answer itself.`;

  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt }
  ];

  const response = await runAi({ model: '@cf/meta/llama-3-8b-instruct', inputs: { messages } });
  const jsonResponse = await response.json();
  const aiTutorResponse = jsonResponse.result.response;

  return { aiTutorResponse };
}

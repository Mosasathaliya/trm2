'use server';

/**
 * @fileOverview Provides AI-powered feedback on user responses to interactive exercises,
 * referencing specific sections of the lesson material, using Cloudflare Workers AI.
 */
import { z } from 'zod';
import { runAi } from '@/lib/cloudflare-ai';

export type ExerciseFeedbackInput = z.infer<typeof ExerciseFeedbackInputSchema>;
const ExerciseFeedbackInputSchema = z.object({
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
  lessonInteractiveExercises: z.array(
    z.object({
      type: z.string().describe('The type of the exercise (e.g., multiple_choice).'),
      question: z.string().describe('The question of the exercise.'),
      choices: z.array(z.string()).optional().describe('The choices for the multiple-choice question.'),
      correct_answer: z.string().describe('The correct answer to the exercise.'),
      user_answer: z.string().describe('The user provided answer to the exercise.'),
    })
  ).describe('Interactive exercises in the lesson.'),
  lessonAdditionalNotes: z.string().optional().describe('Additional notes for the lesson.'),
  lessonCommonMistakes: z.string().optional().describe('Common mistakes students make in the lesson.'),
  lessonAdditionalNotesArabic: z.string().optional().describe('Additional notes for the lesson in Arabic.'),
  lessonCommonMistakesArabic: z.string().optional().describe('Common mistakes students make in the lesson in Arabic.'),
});

export type ExerciseFeedbackOutput = {
  feedback: string;
};

export async function getExerciseFeedback(input: ExerciseFeedbackInput): Promise<ExerciseFeedbackOutput> {
  const { lessonTitle, lessonTopic, lessonLevel, lessonArabicExplanation, lessonExamples, lessonInteractiveExercises, lessonAdditionalNotesArabic, lessonCommonMistakesArabic } = input;
  
  const examplesText = lessonExamples.map(ex => `- English: "${ex.english}", Arabic: "${ex.arabic}"`).join('\n');
  
  const prompt = `You are an expert AI English language tutor from Speed of Mastery.
Your primary language for providing feedback to students MUST be natural-sounding, clear, and encouraging ARABIC. You can use English for specific grammar terms if necessary, but all explanations and clarifications should be in Arabic.

The student is currently working on a lesson titled "${lessonTitle}" on the topic of "${lessonTopic}" at the "${lessonLevel}" level.
Here is the core lesson content (in Arabic):
Explanation: "${lessonArabicExplanation}"
Examples:
${examplesText}
Additional Notes: "${lessonAdditionalNotesArabic || 'None'}"
Common Mistakes: "${lessonCommonMistakesArabic || 'None'}"

Now, consider the following exercise and the student's answer:
Question: "${lessonInteractiveExercises[0].question}"
Correct Answer: "${lessonInteractiveExercises[0].correct_answer}"
Student's Answer: "${lessonInteractiveExercises[0].user_answer}"

Your task is to provide targeted feedback to the student IN ARABIC.
- If the student's answer is correct, congratulate them in Arabic. You can also offer a small additional tip or encouragement in Arabic to reinforce their learning.
- If the student's answer is incorrect, gently explain IN ARABIC why it's incorrect. Clarify the correct answer IN ARABIC and, if possible, reference the lesson material (like the Arabic explanation or examples) to help them understand. Be encouraging and helpful.

Ensure your entire feedback is in ARABIC. Your response should consist ONLY of the feedback text itself. Do not add any extra text like "Here is the feedback:".`;
  
  const messages = [{ role: 'user', content: prompt }];
  const response = await runAi({ model: '@cf/meta/llama-3-8b-instruct', inputs: { messages } });
  const jsonResponse = await response.json();
  const feedback = jsonResponse.result.response;
  
  return { feedback };
}

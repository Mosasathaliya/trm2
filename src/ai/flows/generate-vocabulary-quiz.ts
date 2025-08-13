'use server';

/**
 * @fileOverview An AI agent for generating a vocabulary quiz based on a list of words using Cloudflare Workers AI.
 */
import { z } from 'zod';
import { runAi } from '@/lib/cloudflare-ai';

function isBalanced(str: string) {
    const stack = [];
    const map: Record<string, string> = {
        '(': ')',
        '[': ']',
        '{': '}'
    };
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (map[char]) {
            stack.push(char);
        } else if (Object.values(map).includes(char)) {
            if (map[stack.pop()!] !== char) {
                return false;
            }
        }
    }
    return stack.length === 0;
}

async function queryCloudflareAsJson(prompt: string): Promise<any> {
    const messages = [
        {
            role: "system",
            content: `You are an expert quiz master. Your task is to generate a JSON object representing a vocabulary quiz. The JSON object must have a key "questions" which is an array of exactly 5 multiple-choice question objects. Each question object must have keys "question" (the definition or synonym), "options" (an array of 4 English words), and "correct_answer". Do not output any text other than the JSON object.`
        },
        {
            role: "user",
            content: prompt,
        }
    ];
    
    const response = await runAi({ model: '@cf/meta/llama-3-8b-instruct', inputs: { messages } });
    const jsonResponse = await response.json();
    try {
        const responseText = jsonResponse.result.response;
        const jsonStart = responseText.indexOf('{');
        const jsonEnd = responseText.lastIndexOf('}');
        if (jsonStart !== -1 && jsonEnd !== -1) {
            const jsonString = responseText.substring(jsonStart, jsonEnd + 1);
            if (isBalanced(jsonString)) {
                return JSON.parse(jsonString);
            }
        }
        throw new Error("Incomplete or invalid JSON object found in response");
    } catch (e) {
        console.error("Failed to parse JSON from Cloudflare AI:", jsonResponse.result.response, e);
        throw new Error("Failed to parse JSON from AI response.");
    }
}

const WordSchema = z.object({
  english: z.string(),
  arabic: z.string(),
  definition: z.string(),
  arabicDefinition: z.string(),
  example: z.string(),
  arabicExample: z.string(),
});

const VocabularyQuizInputSchema = z.object({
  words: z.array(WordSchema).describe('The list of words the user has just studied.'),
});
export type VocabularyQuizInput = z.infer<typeof VocabularyQuizInputSchema>;

const QuizQuestionSchema = z.object({
  question: z.string().describe('The quiz question, asking for a definition or a synonym.'),
  options: z.array(z.string()).length(4).describe('An array of 4 possible answers.'),
  correct_answer: z.string().describe('The correct English word from the options.'),
});

const VocabularyQuizOutputSchema = z.object({
  questions: z.array(QuizQuestionSchema).length(5).describe('An array of exactly 5 quiz questions.'),
});
export type VocabularyQuizOutput = z.infer<typeof VocabularyQuizOutputSchema>;

export async function generateVocabularyQuiz({ words }: VocabularyQuizInput): Promise<VocabularyQuizOutput> {
  const wordList = words.map(w => `- ${w.english}: ${w.definition}`).join('\n');

  const prompt = `Based on the following list of vocabulary words, create a quiz with exactly 5 multiple-choice questions.

Each question should test the user's knowledge of one of the words. The question should be a definition or a synonym phrase.
The options should be four English words, one of which is the correct answer. The correct answer must be one of the words from the provided list. The other three options should be plausible but incorrect distractors.

Your output must be a single JSON object with a "questions" key, which holds an array of 5 question objects.

Word List:
${wordList}
`;
    
    try {
        const output = await queryCloudflareAsJson(prompt);
        return output;
    } catch (error) {
        console.error("Failed to generate vocab quiz:", error);
        return { questions: [] };
    }
}

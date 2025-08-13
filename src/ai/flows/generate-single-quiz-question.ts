
'use server';

/**
 * @fileOverview An AI agent for generating a single quiz question from a piece of text.
 * This is a more robust approach than generating a full quiz at once.
 */
import { runAi } from '@/lib/cloudflare-ai';
import type { QuizQuestion } from '@/types/quiz';

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
            content: `You are an expert quiz creator. Your task is to generate a single, valid JSON object for a multiple-choice question based on the provided learning material. The question object must have keys "question", "options" (an array of 4 strings), and "correct_answer". Do not output any text other than the JSON object itself.`
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

export async function generateSingleQuizQuestion({ learningMaterial }: { learningMaterial: string }): Promise<QuizQuestion | null> {
  const prompt = `Based on the following English learning material, generate a single multiple-choice question.
  
  The question must test a key concept, vocabulary word, or comprehension point from the material.
  
  The question object in the JSON output must have 4 options and a clearly indicated correct answer.

  Your response must be ONLY a valid JSON object, with no other text before or after it.

  Here is the material:
  ---
  ${learningMaterial}
  ---`;
  
  try {
      const output = await queryCloudflareAsJson(prompt);
      if (output && output.question && Array.isArray(output.options) && output.correct_answer) {
          return output as QuizQuestion;
      }
      return null;
  } catch(error) {
      console.error("Failed to generate single question, returning null", error);
      return null;
  }
}

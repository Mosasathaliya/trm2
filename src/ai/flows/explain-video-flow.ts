'use server';
/**
 * @fileOverview A flow to generate explanations for a YouTube video topic using Cloudflare Workers AI.
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
            content: `You are an expert science communicator and AI assistant, fluent in both English and Arabic. Your task is to generate a single, valid, and complete JSON object based on the user's request. The JSON object must have three keys: "summary", "keyConcepts", and "analogy". All values must be in simple, clear, and natural-sounding Arabic. Do not output any text other than the JSON object itself.`
        },
        {
            role: "user",
            content: prompt,
        }
    ];

    // Note: The `runAi` helper doesn't support the 'raw' parameter, but the structured system prompt
    // strongly guides the model to produce JSON. We'll parse it carefully.
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


export type ExplainVideoInput = z.infer<typeof ExplainVideoInputSchema>;
const ExplainVideoInputSchema = z.object({
  videoTitle: z.string().describe('The title of the YouTube video to be explained.'),
});

export type ExplainVideoOutput = z.infer<typeof ExplainVideoOutputSchema>;
const ExplainVideoOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the video topic in simple Arabic.'),
  keyConcepts: z.string().describe('A list of key concepts from the video, explained simply in Arabic.'),
  analogy: z.string().describe('An analogy or simple comparison to help understand the topic, in Arabic.'),
});

export async function explainVideoTopic(input: ExplainVideoInput): Promise<ExplainVideoOutput> {
    const prompt = `The user is watching a YouTube video from the 'What If' series titled: "${input.videoTitle}".

Your task is to provide three distinct types of explanations for the main topic of this video. The output must be a single, valid JSON object with three keys as described in the output schema.
All explanations MUST be in simple, clear, and natural-sounding Arabic.

1.  "summary": A concise, one-paragraph summary of the video's main idea.
2.  "keyConcepts": A list and brief explanation of 2-3 key scientific or theoretical concepts discussed in the video.
3.  "analogy": A simple analogy or comparison to a more familiar concept to help a beginner understand the core idea.

The entire response must be only the JSON object, with no other text before or after it. Ensure the JSON is complete and well-formed.`;

    try {
        const output = await queryCloudflareAsJson(prompt);
        return ExplainVideoOutputSchema.parse(output);
    } catch (error) {
        console.error("Error in explainVideoTopic:", error);
        return {
            summary: "عذرًا، لم نتمكن من إنشاء ملخص الآن. يرجى المحاولة مرة أخرى.",
            keyConcepts: "عذرًا، لم نتمكن من إنشاء المفاهيم الرئيسية الآن. يرجى المحاولة مرة أخرى.",
            analogy: "عذرًا، لم نتمكن من إنشاء تشبيه الآن. يرجى المحاولة مرة أخرى."
        };
    }
}

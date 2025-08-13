
'use server';
/**
 * @fileOverview Flows for the text adventure game using Cloudflare Workers AI.
 */
import { z } from 'zod';
import { generateImage } from './image-generation-flow';
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

async function queryCloudflareAsJson(messages: { role: string; content: string }[]): Promise<any> {
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

const getSystemInstruction = (genre: string, historyLength: number) => `You are a world-class interactive fiction author and game master.
You will create a dynamic, branching text adventure IN ENGLISH for a language learner.
The story genre is ${genre}.
Your response MUST be a single, valid, and complete JSON object with no other text before or after it.
The JSON object must adhere to the following schema:
- "narrative": A string of 1-2 paragraphs IN ENGLISH describing the current scene, events, and outcomes. It should be engaging, descriptive, and well-written.
- "imagePrompt": An optional, concise (5-10 words) and evocative text prompt IN ENGLISH for an image generation model, describing the key visual elements of the initial scene. THIS SHOULD ONLY BE INCLUDED FOR THE VERY FIRST NARRATIVE of the story (when history is empty).
- "newWord": An optional unique, plausible-sounding ENGLISH word relevant to the genre. Only invent a new word if the story history has more than ${historyLength > 0 ? historyLength + 2 : 2} entries.
- "promptSuggestions": An array of exactly 3 diverse and interesting strings IN ENGLISH for player actions.
- "gameOver": A boolean value, set to true only if the story has reached a definitive narrative conclusion.`;

const GameResponseSchema = z.object({
  narrative: z.string().describe("The main story text describing the current scene, events, and outcomes. Should be engaging and descriptive."),
  imagePrompt: z.string().optional().describe("A concise (5-10 words) prompt for an image generation model, describing the initial scene. Only included on the first turn."),
  newWord: z.string().optional().nullable().describe("A single, unique, and plausible-sounding new word relevant to the story's genre. Should be naturally integrated into the narrative."),
  promptSuggestions: z.array(z.string()).describe("An array of 3 diverse and interesting actions the player could take next."),
  gameOver: z.boolean().describe("Set to true only if the story has reached a definitive end."),
});

const TextAdventureInputSchema = z.object({
  action: z.enum(['start', 'continue']),
  genre: z.string(),
  playerInput: z.string().optional(),
  history: z.array(z.object({
      id: z.number(),
      sender: z.enum(['user', 'ai']),
      text: z.string(),
      vocabularyWord: z.string().optional(),
      suggestions: z.array(z.string()).optional(),
      gameOver: z.boolean().optional(),
  })).optional(),
});


const textAdventureFlow = async ({ action, genre, playerInput, history }: z.infer<typeof TextAdventureInputSchema>) => {
    const systemInstruction = getSystemInstruction(genre, history?.length || 0);

    const historyMessages = (history || []).map(h => {
        if (h.sender === 'ai') {
            const aiContent = {
                narrative: h.text,
                newWord: h.vocabularyWord,
                promptSuggestions: h.suggestions,
                gameOver: h.gameOver,
            };
            return { role: 'assistant' as const, content: JSON.stringify(aiContent) };
        }
        return { role: 'user' as const, content: h.text };
    });
    
    const userPrompt = action === 'start' ? "Start the adventure in English." : playerInput || "Continue the story in English.";

    const messages = [
        { role: 'system', content: systemInstruction },
        ...historyMessages,
        { role: 'user', content: userPrompt }
    ];
    
    try {
        const output = await queryCloudflareAsJson(messages);
        return GameResponseSchema.parse(output);
    } catch(e) {
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
        console.error("Error in textAdventureFlow:", e);
        // Instead of returning a valid game over state, throw an error
        // that can be caught by the client to display a proper error message.
        // This makes the UI behavior more predictable.
        throw new Error(`The story could not be continued. AI failed with: ${errorMessage}`);
    }
};
export { textAdventureFlow };

const DefineWordInputSchema = z.object({
  word: z.string(),
  genre: z.string(),
});
const DefineWordOutputSchema = z.object({
  definition: z.string().describe("The English definition."),
  arabicWord: z.string().describe("The Arabic translation of the word."),
  arabicDefinition: z.string().describe("The Arabic translation of the English definition."),
});

const defineWordFlow = async ({ word, genre }: z.infer<typeof DefineWordInputSchema>) => {
    const prompt = `You are a creative linguist and an expert in both English and Arabic. For the fictional ${genre} word "${word}", provide a JSON object with:
1.  "definition": A concise, dictionary-style definition in English.
2.  "arabicWord": A plausible, natural-sounding Arabic translation for the word itself.
3.  "arabicDefinition": A direct and accurate Arabic translation of the English definition.
Your output must be ONLY the valid and complete JSON object.`;
    
    const messages = [{role: 'user', content: prompt}];

    try {
        const output = await queryCloudflareAsJson(messages);
        return DefineWordOutputSchema.parse(output);
    } catch (e) {
         console.error("Error in defineWordFlow:", e);
         return {
            definition: "Could not retrieve definition.",
            arabicWord: "فشل",
            arabicDefinition: "تعذر استرداد التعريف."
         };
    }
};
export { defineWordFlow as defineWord };


const GenerateImageInputSchema = z.object({
  word: z.string(),
  definition: z.string(),
  genre: z.string(),
});

const generateImageForWordFlow = async ({ word, definition, genre }: z.infer<typeof GenerateImageInputSchema>) => {
    const prompt = `A vivid, atmospheric, digital painting of "${word}", a concept from a ${genre} world which means: "${definition}". Focus on creating an iconic, visually striking image. Avoid text and borders.`;
    
    const result = await generateImage({ prompt });
    return { imageUrl: result.imageUrl };
};
export { generateImageForWordFlow as generateImageForWord };

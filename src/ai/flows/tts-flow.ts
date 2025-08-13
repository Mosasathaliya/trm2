
'use server';

/**
 * @fileOverview A flow for converting text to speech using Cloudflare's MeloTTS model.
 * This version is updated to handle both binary and JSON responses from the API
 * and correctly selects the voice based on the requested language.
 */
import { z } from 'zod';
import { runAi } from '@/lib/cloudflare-ai';

// Define the schema for the flow's input.
const TextToSpeechInputSchema = z.object({
  prompt: z.string().describe('The text to convert to speech.'),
  lang: z.enum(['en', 'ar']).default('en').describe("The speech language ('en' or 'ar')."),
});
export type TextToSpeechInput = z.infer<typeof TextToSpeechInputSchema>;

export type TextToSpeechOutput = {
  media: string;
};

// Exported wrapper function to be called from the client
export async function textToSpeech(input: TextToSpeechInput): Promise<TextToSpeechOutput | null> {
  const { prompt, lang } = input;
  
  if (!prompt.trim()) {
    console.warn("TTS Flow: Received empty prompt. Aborting.");
    return null;
  }

  // Select the appropriate voice based on the language.
  // 'en-US-Jenny-Neural' is a standard English voice.
  // 'ar-AE-Fatima-Neural' is an Arabic voice.
  const voice = lang === 'ar' ? 'ar-AE-Fatima-Neural' : 'en-US-Jenny-Neural';

  console.log(`TTS Flow: Attempting to generate audio for prompt: "${prompt}" with voice: "${voice}"`);

  try {
    const response = await runAi({
      model: '@cf/myshell-ai/melotts',
      inputs: {
        prompt: prompt,
        voice: voice, // Use the 'voice' parameter instead of 'lang'
      },
    });

    let base64Audio: string;

    // Check the content type to handle both possible API responses
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
        const jsonResponse = await response.json();
        // The API returns a JSON object with a base64-encoded audio string
        if (jsonResponse.result && jsonResponse.result.audio) {
            base64Audio = jsonResponse.result.audio;
        } else {
            console.error("TTS Flow: JSON response did not contain audio data.", jsonResponse);
            return null;
        }
    } else if (contentType && contentType.includes('audio/mpeg')) {
        // The API returns the raw MP3 audio bytes directly
        const audioBuffer = await response.arrayBuffer();
        if (audioBuffer.byteLength < 100) { 
            const errorText = new TextDecoder().decode(audioBuffer);
            console.error(`TTS Flow: Received an empty or very small audio buffer from the API. Potential error: ${errorText}`);
            return null;
        }
        base64Audio = Buffer.from(audioBuffer).toString('base64');
    } else {
        console.error(`TTS Flow: Received unexpected content type: ${contentType}`);
        return null;
    }
    
    return {
      media: `data:audio/mpeg;base64,${base64Audio}`
    };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error(`Error in textToSpeech flow: ${errorMessage}`);
    return null;
  }
}

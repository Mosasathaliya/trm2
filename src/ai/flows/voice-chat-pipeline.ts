
'use server';

/**
 * @fileoverview Defines a consolidated pipeline for voice chat.
 * This flow takes audio data, transcribes it using Cloudflare Whisper,
 * gets a response from a text-generation model, and returns the text response.
 */
import { z } from 'zod';
import { runAi } from '@/lib/cloudflare-ai';


// Cloudflare Speech-to-Text (Whisper)
async function transcribeAudio(audioBuffer: Buffer): Promise<string> {
    const url = `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/openai/whisper`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
            'Content-Type': 'application/octet-stream', // Send as raw audio data
        },
        body: audioBuffer,
    });
    
    if (!response.ok) {
        const errorText = await response.text();
        console.error("Cloudflare STT API error:", errorText);
        throw new Error(`Cloudflare STT API request failed: ${response.statusText}`);
    }

    const jsonResponse = await response.json();
    return jsonResponse.result.text;
}


// Define a schema for a single chat message, which will be used for history
const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});
export type Message = z.infer<typeof MessageSchema>;

// Input schema for the consolidated pipeline
const VoiceChatInputSchema = z.object({
  audioDataUri: z.string().describe("The user's audio speech as a data URI."),
  personality: z.string().describe("The agent's base personality."),
  userName: z.string().optional(),
  userInfo: z.string().optional(),
  history: z.array(MessageSchema),
});
export type VoiceChatInput = z.infer<typeof VoiceChatInputSchema>;

// Output schema for the consolidated pipeline
const VoiceChatOutputSchema = z.object({
  response: z.string().describe("The AI agent's final text response."),
  transcribedText: z.string().optional().describe("The transcribed text from the user's audio."),
});
export type VoiceChatOutput = z.infer<typeof VoiceChatOutputSchema>;


/**
 * An exported async function that runs the voice chat pipeline.
 * This is the function that will be called from the application's frontend.
 * @param input - The voice chat input data.
 * @returns A promise that resolves to the AI's final text response.
 */
export async function runVoiceChatPipeline(
  input: VoiceChatInput
): Promise<VoiceChatOutput> {
  const { audioDataUri, personality, userName, userInfo, history } = input;
  
   // Step 1: Transcribe audio to text (using Cloudflare Whisper)
    const audioBuffer = Buffer.from(audioDataUri.split(',')[1], 'base64');
    const transcribedText = await transcribeAudio(audioBuffer);

    if (!transcribedText || !transcribedText.trim()) {
        return { response: "", transcribedText: "" }; // Return empty if transcription is empty
    }

    const userMessage: Message = { role: 'user', content: transcribedText };
    const currentHistory = [...history, userMessage];
        
  // Step 2: Construct the system prompt for the AI's persona
  let systemPrompt = `You are an AI with the following personality: ${personality}.`;
  if (userName) {
      systemPrompt += ` Address the user as ${userName}.`;
  }
  if (userInfo) {
      systemPrompt += ` Here is some information about the user you are talking to: ${userInfo}.`;
  }
  systemPrompt += ` Keep your responses concise and conversational.`

  // Step 3: Generate the personalized response using Cloudflare
  const messagesForApi = [
    { role: 'system', content: systemPrompt },
    ...currentHistory.map(msg => ({ role: msg.role === 'model' ? 'assistant' : 'user', content: msg.content })),
  ];

  const response = await runAi({ model: '@cf/meta/llama-3-8b-instruct', inputs: { messages: messagesForApi } });
  const jsonResponse = await response.json();
  const responseText = jsonResponse.result.response;


  if (!responseText) {
      return { response: "I'm sorry, I don't have a response for that." };
  }

  return { 
      response: responseText,
      // Pass back the user's transcribed text so the UI can update
      transcribedText: transcribedText
  };
}

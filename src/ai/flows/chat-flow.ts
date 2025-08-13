'use server';
/**
 * @fileOverview A conversational flow using Cloudflare Workers AI, enhanced with a reranker model.
 */
import { z } from 'zod';
import { findMostRelevantLesson } from './reranker-flow';
import { learningItems } from '@/lib/lessons';
import { runAi } from '@/lib/cloudflare-ai';
import { streamToAsyncIterable } from '@/lib/utils';


// A streamable flow that takes a history and a system prompt and returns a stream of the AI's response.
export async function chatStream(prompt: string): Promise<ReadableStream<Uint8Array>> {
  
  // 1. Find the most relevant lesson using the reranker
  const relevantLessonIndex = await findMostRelevantLesson(prompt, learningItems.map(item => item.title + ': ' + (item.type === 'lesson' ? item.explanation : item.content)));

  let systemPrompt = `You are a helpful and friendly English learning assistant from Speed of Mastery. Your primary goal is to assist users with their English language questions.
First, detect the language of the user's prompt.
- If the user's prompt is in English, your entire response MUST be in English.
- If the user's prompt is in Arabic, your entire response MUST be in Arabic.
Answer the user's question clearly and concisely. If relevant, use the provided lesson context to inform your answer.`;
  
  if (relevantLessonIndex !== null) {
      const relevantLesson = learningItems[relevantLessonIndex];
      const lessonContent = relevantLesson.type === 'lesson' ? relevantLesson.explanation : relevantLesson.content;
      systemPrompt += `\n\n---RELEVANT LESSON CONTEXT---\nTitle: ${relevantLesson.title}\nContent: ${lessonContent}\n-----------------------------`;
  }
  
  // 2. Query the LLM with the enhanced prompt to get a streamed response
  const messages = [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt }
  ];

  try {
      const response = await runAi({ model: '@cf/meta/llama-3-8b-instruct', inputs: { messages }, stream: true });
      
      // Transform the raw text stream into the desired JSON event stream format
      const transformStream = new TransformStream({
        async transform(chunk, controller) {
          const decoder = new TextDecoder();
          const text = decoder.decode(chunk);
          // Assuming the raw stream might be Event Stream formatted itself, let's parse it.
          const lines = text.split('\n');
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const json = JSON.parse(line.substring(6));
                if (json.response) {
                  // Re-format into the desired structure
                  const outputChunk = `data: ${JSON.stringify({ response: json.response })}\n\n`;
                  controller.enqueue(new TextEncoder().encode(outputChunk));
                }
              } catch (e) {
                // Not a JSON line, maybe just text. Let's wrap it anyway.
                 const outputChunk = `data: ${JSON.stringify({ response: line })}\n\n`;
                 controller.enqueue(new TextEncoder().encode(outputChunk));
              }
            }
          }
        },
      });

      return response.body!.pipeThrough(transformStream);

  } catch (error) {
      console.error("Error getting chat stream:", error);
      const errorStream = new ReadableStream({
          start(controller) {
              const errorMessage = `data: ${JSON.stringify({ response: "Sorry, I encountered an error. Please try again." })}\n\n`;
              controller.enqueue(new TextEncoder().encode(errorMessage));
              controller.close();
          }
      });
      return errorStream;
  }
}

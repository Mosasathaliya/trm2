'use server';
/**
 * @fileOverview A centralized flow for generating an image using a specified model.
 */
import { z } from 'zod';
import { runAi } from '@/lib/cloudflare-ai';

const ImageInputSchema = z.object({
  prompt: z.string().describe('The text description of the image to generate.'),
});
export type ImageInput = z.infer<typeof ImageInputSchema>;

const ImageOutputSchema = z.object({
  imageUrl: z
    .string()
    .describe(
      "The generated image as a data URI. Expected format: 'data:<mimetype>;base64,<encoded_data>'"
    ),
});
export type ImageOutput = z.infer<typeof ImageOutputSchema>;

export async function generateImage(input: ImageInput): Promise<ImageOutput> {
  try {
    const response = await runAi({
      model: '@cf/stabilityai/stable-diffusion-xl-base-1.0',
      inputs: { prompt: input.prompt },
    });

    // The model returns the raw image bytes directly
    const imageBuffer = await response.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString('base64');
    
    return {
      imageUrl: `data:image/png;base64,${base64Image}`
    };

  } catch (error) {
    console.error("Error in image generation flow:", error);
    // Return a placeholder on error to prevent app crash
    return {
        imageUrl: `https://placehold.co/512x512/FF0000/FFFFFF.png?text=Error`
    };
  }
}

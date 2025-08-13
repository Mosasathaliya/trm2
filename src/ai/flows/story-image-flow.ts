'use server';
/**
 * @fileOverview A flow for generating an image based on a story's content.
 */
import { z } from 'zod';
import { generateImage } from './image-generation-flow';

const StoryImageInputSchema = z.object({
  story: z.string().describe('The text of the story to illustrate.'),
});
export type StoryImageInput = z.infer<typeof StoryImageInputSchema>;

const StoryImageOutputSchema = z.object({
  imageUrl: z
    .string()
    .describe(
      "The generated image as a data URI. Expected format: 'data:<mimetype>;base64,<encoded_data>'"
    ),
});
export type StoryImageOutput = z.infer<typeof StoryImageOutputSchema>;

export async function generateStoryImage(
  input: StoryImageInput
): Promise<StoryImageOutput> {
  const prompt = `A beautiful, vibrant, high-quality digital painting illustrating the following scene: ${input.story}`;
  const result = await generateImage({ prompt });
  return { imageUrl: result.imageUrl };
}

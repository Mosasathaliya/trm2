'use server';
/**
 * @fileOverview A flow for generating a branded certificate background image.
 */
import { z } from 'zod';
import { generateImage } from './image-generation-flow';

const CertificateImageInputSchema = z.object({
  userName: z.string().describe('The name of the user receiving the certificate.'),
});
export type CertificateImageInput = z.infer<typeof CertificateImageInputSchema>;

const CertificateImageOutputSchema = z.object({
  imageUrl: z
    .string()
    .describe(
      "The generated image as a data URI. Expected format: 'data:<mimetype>;base64,<encoded_data>'"
    ),
});
export type CertificateImageOutput = z.infer<typeof CertificateImageOutputSchema>;

/**
 * This flow generates an abstract background image for a certificate.
 */
export async function generateCertificateImage(
  input: CertificateImageInput
): Promise<CertificateImageOutput> {
    const prompt = `An abstract, elegant, and professional background for an award certificate. Use flowing lines and a sophisticated color palette of green, gold, and white. Minimalist and clean.`;
    const result = await generateImage({ prompt });
    return { imageUrl: result.imageUrl };
}

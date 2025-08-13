
'use server';
/**
 * @fileOverview A flow for querying the Cloudflare AutoRAG endpoint.
 */
import { z } from 'zod';

const CLOUDFLARE_ACCOUNT_ID = process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID;
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const CLOUDFLARE_AUTORAG_ID = process.env.NEXT_PUBLIC_CLOUDFLARE_AUTORAG_ID;

const AutoRAGInputSchema = z.object({
  query: z.string().describe('The search query.'),
});
export type AutoRAGInput = z.infer<typeof AutoRAGInputSchema>;

const AutoRAGResultSchema = z.object({
  doc_id: z.string(),
  text: z.string(),
  score: z.number(),
  source: z.object({
    name: z.string(),
    url: z.string().optional().nullable(),
  }),
});

const AutoRAGOutputSchema = z.object({
    results: z.array(AutoRAGResultSchema).describe("The search results from AutoRAG."),
    answer: z.string().optional().nullable().describe("The synthesized answer from the LLM, if available.")
});
export type AutoRAGOutput = z.infer<typeof AutoRAGOutputSchema>;

/**
 * Searches for relevant documents using the configured Cloudflare AutoRAG.
 * @param query The user's question or search term.
 * @returns The search results from AutoRAG.
 */
export async function searchWithAutoRAG(input: AutoRAGInput): Promise<AutoRAGOutput> {
  if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_API_TOKEN || !CLOUDFLARE_AUTORAG_ID) {
    throw new Error("Cloudflare AutoRAG credentials are not set in the environment variables.");
  }
  
  const url = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/autorag/rags/${CLOUDFLARE_AUTORAG_ID}/ai-search`;
  
  const body = {
      query: input.query,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error(`Cloudflare AutoRAG API error:`, errorText);
        throw new Error(`Cloudflare AutoRAG API request failed: ${response.statusText}`);
    }
    
    const jsonResponse = await response.json();

    if (jsonResponse.success && jsonResponse.result && jsonResponse.result.search) {
        return {
            results: jsonResponse.result.search.results,
            answer: jsonResponse.result.answer,
        };
    } else {
        const errorDetails = JSON.stringify(jsonResponse.errors, null, 2);
        throw new Error(`AutoRAG search was not successful. Errors: ${errorDetails}`);
    }

  } catch (error) {
    console.error("Error in AutoRAG flow:", error);
    // Re-throw the original error for better debugging on the client side
    if (error instanceof Error) {
        throw new Error(`Failed to execute AutoRAG search: ${error.message}`);
    }
    throw new Error("Failed to execute AutoRAG search due to an unknown error.");
  }
}

'use server';
/**
 * @fileOverview A flow for finding the most relevant document from a list using a reranker model.
 */
import { z } from 'zod';
import { runAi } from '@/lib/cloudflare-ai';


/**
 * Finds the most relevant document for a given query.
 * @param query The user's question or search term.
 * @param documents An array of strings representing the documents to search through.
 * @returns The index of the most relevant document in the array, or null if an error occurs.
 */
export async function findMostRelevantLesson(query: string, documents: string[]): Promise<number | null> {
  try {
    const response = await runAi({
      model: '@cf/baai/bge-reranker-base',
      inputs: {
        query: query,
        contexts: documents, // The reranker model expects 'contexts' not 'documents'
      },
    });

    const jsonResponse = await response.json();

    if (jsonResponse.success && jsonResponse.result && jsonResponse.result.results.length > 0) {
      // The response is an array of ranked results. The 'id' is the original index.
      return jsonResponse.result.results[0].index;
    }

    return null; // No relevant lesson found

  } catch (error) {
    console.error("Error in reranker flow:", error);
    return null; // Return null on error to indicate failure gracefully
  }
}

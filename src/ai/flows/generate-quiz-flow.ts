
'use server';

/**
 * @fileOverview An AI agent for generating a quiz using Cloudflare AutoRAG.
 * This version uses AutoRAG to find the most relevant learning materials
 * and then generates questions in parallel from the retrieved content.
 */
import type { GenerateQuizOutput, QuizQuestion } from '@/types/quiz';
import { generateSingleQuizQuestion } from './generate-single-quiz-question';
import { searchWithAutoRAG } from './autorag-flow';

const NUM_QUESTIONS_TO_GENERATE = 25;

export async function generateQuiz(): Promise<GenerateQuizOutput> {
  // 1. Use AutoRAG to find the most relevant document chunks for a generic "English test" query.
  const query = "A comprehensive English language test covering grammar, vocabulary, and comprehension.";
  
  const searchResults = await searchWithAutoRAG({ query });
  const documents = searchResults.results;

  // We'll take a slice of the top results to ensure we don't make excessive API calls.
  const itemsToQuery = documents.slice(0, NUM_QUESTIONS_TO_GENERATE);

  // 2. Generate questions in parallel from the retrieved, high-quality document chunks.
  // This is much faster than doing it sequentially.
  const questionPromises = itemsToQuery.map(item => {
    const content = `Title: ${item.source.name}\nContent: ${item.text}`;
    return generateSingleQuizQuestion({ learningMaterial: content }).catch(error => {
      // Log the error but return null so Promise.all doesn't fail completely.
      console.error(`Failed to generate a question for document: "${item.source.name}". Skipping.`, error);
      return null;
    });
  });

  const results = await Promise.all(questionPromises);

  // 3. Filter out any null results from failed generations and return the collected questions.
  const generatedQuestions = results.filter((question): question is QuizQuestion => question !== null);

  return { questions: generatedQuestions };
}

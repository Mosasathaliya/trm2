globalThis.process ??= {}; globalThis.process.env ??= {};
import { r as runAi } from './translate-flow_kN_oiuBh.mjs';
import { o as objectType, s as stringType, a as arrayType } from './astro/server_DbPTNgPy.mjs';

function isBalanced(str) {
  const stack = [];
  const map = {
    "(": ")",
    "[": "]",
    "{": "}"
  };
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (map[char]) {
      stack.push(char);
    } else if (Object.values(map).includes(char)) {
      if (map[stack.pop()] !== char) {
        return false;
      }
    }
  }
  return stack.length === 0;
}
async function queryCloudflareAsJson(prompt) {
  const messages = [
    {
      role: "system",
      content: `You are an expert quiz creator. Your task is to generate a JSON object representing a quiz based on the provided story. The JSON object must have a key "questions" which is an array of exactly 5 multiple-choice question objects. Each question object must have keys "question", "options" (an array of 4 strings), and "correct_answer". Do not output any text other than the JSON object.`
    },
    {
      role: "user",
      content: prompt
    }
  ];
  const response = await runAi({ model: "@cf/meta/llama-3-8b-instruct", inputs: { messages } });
  const jsonResponse = await response.json();
  try {
    const responseText = jsonResponse.result.response;
    const jsonStart = responseText.indexOf("{");
    const jsonEnd = responseText.lastIndexOf("}");
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
objectType({
  storyContent: stringType().describe("The content of the story to generate a quiz from.")
});
const QuizQuestionSchema = objectType({
  question: stringType().describe("The quiz question about the story."),
  options: arrayType(stringType()).length(4).describe("An array of 4 possible answers."),
  correct_answer: stringType().describe("The correct answer from the options.")
});
objectType({
  questions: arrayType(QuizQuestionSchema).length(5).describe("An array of exactly 5 quiz questions based on the story.")
});
async function generateStoryQuiz({ storyContent }) {
  const prompt = `Based on the following short story, generate a quiz with exactly 5 multiple-choice questions to test comprehension. Each question must have 4 options, and you must clearly indicate the correct answer. The questions should be about the plot, characters, or key details of the story.

Your output must be a single JSON object with a "questions" key, which holds an array of 5 question objects.

Story:
---
${storyContent}
---`;
  try {
    const output = await queryCloudflareAsJson(prompt);
    return output;
  } catch (error) {
    console.error("Failed to generate story quiz:", error);
    return { questions: [] };
  }
}

export { generateStoryQuiz };

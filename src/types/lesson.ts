

export interface LessonExample {
  english: string;
  arabic: string;
  imagePrompt?: string; // For AI to suggest an image idea
  imageUrl?: string; // Actual URL of the generated image
}

export interface InteractiveExercise {
  type: "multiple_choice"; // Currently only multiple_choice is supported
  question: string;
  choices: string[];
  correct_answer: string;
  user_answer?: string; // Will be populated by user interaction
}

export interface LessonMeta {
  aiGeneratedContentRequired?: boolean;
  englishGrammarTopic?: string; // Specific topic for AI, e.g., "Present Simple Tense"
}

export interface Lesson {
  lesson_id: string;
  title: string;
  title_arabic: string; // Added Arabic title
  topic: string;
  topic_arabic: string; // Added Arabic topic
  level: "Beginner" | "Intermediate" | "Advanced";
  arabic_explanation: string; // Can be a placeholder if AI-generated
  examples: LessonExample[]; // Can be empty if AI-generated
  interactive_exercises: InteractiveExercise[];
  additional_notes?: string;
  common_mistakes?: string;
  additional_notes_arabic?: string; // AI-generated Arabic notes
  common_mistakes_arabic?: string; // AI-generated Arabic common mistakes
  main_image_prompt_for_ai?: string;
  main_image_url?: string;
  meta?: LessonMeta;
}

'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { StoryQuizOutput } from '@/ai/flows/story-quiz-flow';

export interface SavedStory {
  id: string;
  prompt: string;
  content: string;
  imageUrl: string | null;
}

export interface StoryQuizResult {
    storyId: string;
    questions: StoryQuizOutput['questions'];
    answers: Record<number, string>;
    score: number;
    passed: boolean;
}

interface StoryState {
  stories: SavedStory[];
  addStory: (story: SavedStory) => void;
  clearStories: () => void;
}

const STORY_STORAGE_NAME = 'saved-stories-storage';

export const useStoryStore = create<StoryState>()(
  persist(
    (set) => ({
      stories: [],
      addStory: (story) =>
        set((state) => ({
          stories: [...state.stories, story].slice(-3), // Keep only the last 3 stories
        })),
      clearStories: () => set({ stories: [] }),
    }),
    {
      name: STORY_STORAGE_NAME,
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// New store for quiz results
interface QuizState {
    quizResults: Record<string, StoryQuizResult>;
    setQuizResult: (result: StoryQuizResult) => void;
    clearAllResults: () => void;
}

const QUIZ_STORAGE_NAME = 'story-quiz-results-storage';

export const useQuizStore = create<QuizState>()(
    persist(
        (set) => ({
            quizResults: {},
            setQuizResult: (result) => set((state) => ({
                quizResults: {
                    ...state.quizResults,
                    [result.storyId]: result,
                },
            })),
            clearAllResults: () => set({ quizResults: {} }),
        }),
        {
            name: QUIZ_STORAGE_NAME,
            storage: createJSONStorage(() => localStorage),
        }
    )
);

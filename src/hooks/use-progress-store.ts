
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ProgressState {
  // The title of the highest learning item (lesson or story) the user has successfully completed.
  highestItemCompleted: string | null;
  // A derived value for the number of completed items.
  completedItemsCount: number;
  finalExamPassed: boolean;
  // Function to mark an item as completed.
  completeItem: (itemId: string) => void;
  setFinalExamPassed: (passed: boolean) => void;
  // Function to reset all progress.
  resetProgress: () => void;
}

// We find the index of the completed item and the next item to determine access.
// This requires having the learningItems data available.
import { learningItems } from '@/lib/lessons';

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      highestItemCompleted: null,
      completedItemsCount: 0,
      finalExamPassed: false,
      completeItem: (itemId: string) => {
        const allItemTitles = learningItems.map(item => item.title);
        const currentHighestId = get().highestItemCompleted;
        
        const currentIndex = currentHighestId ? allItemTitles.indexOf(currentHighestId) : -1;
        const newIndex = allItemTitles.indexOf(itemId);

        // Only update if the new item is "higher" than the current one.
        if (newIndex > currentIndex) {
          set({ 
            highestItemCompleted: itemId,
            completedItemsCount: newIndex + 1 
          });
        }
      },
      setFinalExamPassed: (passed: boolean) => {
        set({ finalExamPassed: passed });
      },
      resetProgress: () => set({ highestItemCompleted: null, completedItemsCount: 0, finalExamPassed: false }),
    }),
    {
      name: 'learning-progress-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      onRehydrateStorage: () => (state) => {
        // When rehydrating, ensure completedItemsCount is accurate.
        if (state) {
            const allItemTitles = learningItems.map(item => item.title);
            const index = state.highestItemCompleted ? allItemTitles.indexOf(state.highestItemCompleted) : -1;
            state.completedItemsCount = index + 1;
            if (state.finalExamPassed === undefined) {
                state.finalExamPassed = false;
            }
        }
      }
    }
  )
);

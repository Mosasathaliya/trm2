
"use client";

import { useState } from 'react';
import type { Lesson } from '@/types/lesson';
import LessonHeader from './LessonHeader';
import ArabicExplanation from './ArabicExplanation';
import LessonExamples from './LessonExamples';
import AdditionalNotes from './AdditionalNotes';
import CommonMistakes from './CommonMistakes';
import InteractiveExercisesSection from '@/components/exercise/InteractiveExercisesSection';
import { Button } from '@/components/ui/button';
import { MessageSquarePlus } from 'lucide-react';
import LessonTutorModal from './LessonTutorModal';


interface LessonDisplayProps {
  lesson: Lesson;
}

const LessonDisplay = ({ lesson }: LessonDisplayProps) => {
  const [isTutorModalOpen, setIsTutorModalOpen] = useState(false);
  const [hasPassedExercises, setHasPassedExercises] = useState(false);

  const handleCorrectAnswer = () => {
    if (!hasPassedExercises) {
        setHasPassedExercises(true);
    }
  };

  return (
    <div className="space-y-8 relative pb-20">
      <LessonHeader title={lesson.title} topic={lesson.topic} level={lesson.level} />
      <ArabicExplanation explanation={lesson.arabic_explanation} />
      <LessonExamples examples={lesson.examples} />
      <InteractiveExercisesSection 
        exercises={lesson.interactive_exercises} 
        lesson={lesson} 
        onCorrectAnswer={handleCorrectAnswer}
        hasPassed={hasPassedExercises}
      />
      <AdditionalNotes notes={lesson.additional_notes} notesArabic={lesson.additional_notes_arabic} />
      <CommonMistakes mistakes={lesson.common_mistakes} mistakesArabic={lesson.common_mistakes_arabic} />

      <Button
        onClick={() => setIsTutorModalOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-xl z-50 p-0"
        aria-label="Open AI Lesson Tutor"
        size="icon"
      >
        <MessageSquarePlus className="h-7 w-7" />
      </Button>

      {isTutorModalOpen && (
        <LessonTutorModal
          isOpen={isTutorModalOpen}
          onClose={() => setIsTutorModalOpen(false)}
          lesson={lesson}
        />
      )}
    </div>
  );
};

export default LessonDisplay;

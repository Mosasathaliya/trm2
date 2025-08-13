
import type { FC } from 'react';
import type { InteractiveExercise, Lesson } from '@/types/lesson';
import MultipleChoiceExercise from './MultipleChoiceExercise';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircleQuestion, Award } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface InteractiveExercisesSectionProps {
  exercises: InteractiveExercise[];
  lesson: Lesson;
  onCorrectAnswer: () => void;
  hasPassed: boolean;
}

const InteractiveExercisesSection: FC<InteractiveExercisesSectionProps> = ({ exercises, lesson, onCorrectAnswer, hasPassed }) => {
  if (!exercises || exercises.length === 0) {
    return null;
  }

  return (
    <Card className="mb-6 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <MessageCircleQuestion className="mr-2 h-6 w-6 text-primary" />
          Interactive Exercises (تمارين تفاعلية)
        </CardTitle>
      </CardHeader>
      <CardContent>
        {hasPassed && (
            <Alert variant="default" className="mb-6 border-green-500 bg-green-50 dark:bg-green-900/30 dark:border-green-700">
                <Award className="h-5 w-5 text-green-600 dark:text-green-400" />
                <AlertTitle className="text-green-700 dark:text-green-300">Congratulations! (تهانينا!)</AlertTitle>
                <AlertDescription>
                    You've passed this lesson's exercises! Feel free to keep practicing.
                    <span dir="rtl" className="block">لقد نجحت في تمارين هذا الدرس! يمكنك الاستمرار في الممارسة.</span>
                </AlertDescription>
            </Alert>
        )}
        {exercises.map((exercise, index) => {
          if (exercise.type === 'multiple_choice') {
            return <MultipleChoiceExercise key={index} exercise={exercise} lesson={lesson} onCorrect={onCorrectAnswer} />;
          }
          // Add other exercise types here if needed
          return <p key={index}>Unsupported exercise type: {exercise.type}</p>;
        })}
      </CardContent>
    </Card>
  );
};

export default InteractiveExercisesSection;

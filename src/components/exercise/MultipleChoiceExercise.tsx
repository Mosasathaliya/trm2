
"use client";

import type { FC } from 'react';
import { useState, useTransition } from 'react';
import type { InteractiveExercise, Lesson } from '@/types/lesson';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, CheckCircle, XCircle, MessageSquare } from 'lucide-react';
import { getExerciseFeedback, type ExerciseFeedbackInput } from '@/ai/flows/exercise-feedback';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';

interface MultipleChoiceExerciseProps {
  exercise: InteractiveExercise;
  lesson: Lesson;
  onCorrect: () => void;
}

const MultipleChoiceExercise: FC<MultipleChoiceExerciseProps> = ({ exercise, lesson, onCorrect }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [isLoading, startTransition] = useTransition();

  const handleSubmit = async () => {
    if (!selectedAnswer) return;

    setIsSubmitted(true);
    const correct = selectedAnswer === exercise.correct_answer;
    setIsCorrect(correct);

    if (correct) {
      onCorrect();
    }

    startTransition(async () => {
      try {
        const feedbackInput: ExerciseFeedbackInput = {
          lessonTitle: lesson.title,
          lessonTopic: lesson.topic,
          lessonLevel: lesson.level,
          lessonArabicExplanation: lesson.arabic_explanation,
          lessonExamples: lesson.examples,
          lessonInteractiveExercises: [{ 
            type: exercise.type,
            question: exercise.question,
            choices: exercise.choices,
            correct_answer: exercise.correct_answer,
            user_answer: selectedAnswer 
          }],
          lessonAdditionalNotes: lesson.additional_notes,
          lessonCommonMistakes: lesson.common_mistakes,
          lessonAdditionalNotesArabic: lesson.additional_notes_arabic,
          lessonCommonMistakesArabic: lesson.common_mistakes_arabic,
        };
        const feedbackResponse = await getExerciseFeedback(feedbackInput);
        setAiFeedback(feedbackResponse.feedback);
      } catch (error) {
        console.error("Error fetching AI feedback:", error);
        setAiFeedback("عذرًا، لم أتمكن من الحصول على الملاحظات في الوقت الحالي. يرجى المحاولة مرة أخرى لاحقًا.");
      }
    });
  };

  const handleReset = () => {
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setIsCorrect(null);
    setAiFeedback(null);
  };
  
  const getChoiceStyle = (choice: string) => {
    if (!isSubmitted) return "";
    if (choice === exercise.correct_answer) return "text-green-600 dark:text-green-400 font-semibold";
    if (choice === selectedAnswer && choice !== exercise.correct_answer) return "text-destructive font-semibold";
    return "";
  };

  return (
    <Card className="mb-4 shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">{exercise.question}</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedAnswer ?? ""}
          onValueChange={setSelectedAnswer}
          disabled={isSubmitted}
          className="space-y-3"
        >
          {exercise.choices.map((choice, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={choice} id={`${exercise.question}-choice-${index}`} />
              <Label htmlFor={`${exercise.question}-choice-${index}`} className={`text-md cursor-pointer ${getChoiceStyle(choice)}`}>
                {choice}
                {isSubmitted && choice === exercise.correct_answer && <CheckCircle className="inline ml-2 h-5 w-5 text-green-600 dark:text-green-400" />}
                {isSubmitted && choice === selectedAnswer && choice !== exercise.correct_answer && <XCircle className="inline ml-2 h-5 w-5 text-destructive" />}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-4">
        {!isSubmitted ? (
          <Button onClick={handleSubmit} disabled={!selectedAnswer || isLoading} className="w-full sm:w-auto">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Check Answer
          </Button>
        ) : (
           <Button onClick={handleReset} variant="outline" className="w-full sm:w-auto">
            Try Again
          </Button>
        )}

        {isSubmitted && isCorrect !== null && (
          <Alert variant={isCorrect ? "default" : "destructive"} className={isCorrect ? "border-green-500 bg-green-50 dark:bg-green-900/30 dark:border-green-700" : ""}>
            {isCorrect ? <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" /> : <XCircle className="h-5 w-5 text-destructive" />}
            <AlertTitle className={isCorrect ? "text-green-700 dark:text-green-300" : "text-destructive-foreground"}>
              {isCorrect ? "Correct! (صحيح!)" : "Incorrect. (غير صحيح.)"}
            </AlertTitle>
            {!isCorrect && <AlertDescription>The correct answer is (الإجابة الصحيحة هي): <strong>{exercise.correct_answer}</strong></AlertDescription>}
          </Alert>
        )}

        {isLoading && !aiFeedback && (
           <div className="flex items-center text-muted-foreground">
             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
             <span>Getting feedback from AI tutor... (جاري الحصول على تقييم المعلم الذكي...)</span>
           </div>
        )}

        {aiFeedback && (
          <Alert variant="default" className="mt-4 border-accent bg-accent/10 dark:bg-accent/20">
                                    <MessageSquare className="h-5 w-5 text-primary" /> {/* Changed icon color to primary for better visibility */}
            <AlertTitle className="text-accent-foreground">AI Tutor Feedback (تقييم المعلم الذكي)</AlertTitle>
            <AlertDescription className="text-accent-foreground/80 whitespace-pre-line text-right" dir="rtl">
              {aiFeedback}
            </AlertDescription>
          </Alert>
        )}
      </CardFooter>
    </Card>
  );
};

export default MultipleChoiceExercise;

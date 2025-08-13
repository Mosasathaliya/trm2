
'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { generateQuiz } from '@/ai/flows/generate-quiz-flow';
import type { QuizQuestion } from '@/types/quiz';
import { Button } from './ui/button';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Loader2, XCircle, Award, RefreshCw, CheckCircle, X, Check } from 'lucide-react';
import { Progress } from './ui/progress';
import { useProgressStore } from '@/hooks/use-progress-store';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

type QuizState = 'loading' | 'active' | 'finished';
type AnswerStatus = 'correct' | 'incorrect' | null;

const MAX_RETRIES = 2;
const MAX_ROUNDS = 4;

function AnswerFeedback({ status }: { status: AnswerStatus }) {
  if (status === null) return null;

  const iconVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } },
    exit: { scale: 0.5, opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <motion.div
        variants={iconVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {status === 'correct' ? (
          <CheckCircle className="h-32 w-32 text-green-500" />
        ) : (
          <XCircle className="h-32 w-32 text-destructive" />
        )}
      </motion.div>
    </motion.div>
  );
}


export function QuizScreen() {
  const [quizState, setQuizState] = useState<QuizState>('loading');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answerStatus, setAnswerStatus] = useState<AnswerStatus>(null);
  const { setFinalExamPassed } = useProgressStore();
  const { toast } = useToast();
  const [quizRound, setQuizRound] = useState(1);
  
  const fetchQuiz = useCallback(async (retries = MAX_RETRIES) => {
    setQuizState('loading');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setSelectedOption(null);

    try {
      const quizData = await generateQuiz();
      if (quizData && quizData.questions.length > 0) {
        setQuestions(quizData.questions);
        setQuizState('active');
      } else {
        if (retries > 0) {
          toast({
            variant: "destructive",
            title: "Quiz Generation Failed, Retrying...",
            description: `The AI is trying again. ${retries} attempts left.`,
          });
          setTimeout(() => fetchQuiz(retries - 1), 2000);
        } else {
            toast({
                variant: "destructive",
                title: "Quiz Generation Failed",
                description: "The AI could not create questions after multiple attempts. Please try again later.",
            });
            setQuizState('finished');
        }
      }
    } catch (error) {
       if (retries > 0) {
          toast({
            variant: "destructive",
            title: "Quiz Generation Error, Retrying...",
            description: `The AI is trying again. ${retries} attempts left.`,
          });
          setTimeout(() => fetchQuiz(retries - 1), 2000);
       } else {
            console.error('Failed to generate quiz after multiple retries:', error);
            toast({
                variant: "destructive",
                title: "Quiz Generation Failed",
                description: "There was a problem creating your quiz. Please try again later.",
            });
            setQuizState('finished');
       }
    }
  }, [toast]);

  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz, quizRound]);

  const handleNextQuestion = () => {
    if (selectedOption && questions[currentQuestionIndex]) {
      const isCorrect = selectedOption === questions[currentQuestionIndex].correct_answer;
      setAnswerStatus(isCorrect ? 'correct' : 'incorrect');

      const newAnswers = [...userAnswers, selectedOption];
      setUserAnswers(newAnswers);

      setTimeout(() => {
          setAnswerStatus(null);
          setSelectedOption(null);
    
          if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
          } else {
            const finalAnswers = [...newAnswers];
            const finalScore = finalAnswers.reduce((acc, answer, index) => {
                if (questions[index] && answer === questions[index].correct_answer) {
                    return acc + 1;
                }
                return acc;
            }, 0);
            
            const passed = finalScore / questions.length >= 0.7;
            // Only mark the final exam as passed if they pass the final round
            if (passed && quizRound === MAX_ROUNDS) {
                setFinalExamPassed(true);
                 toast({
                    title: "Final Exam Passed!",
                    description: `Congratulations! You can now generate your certificate!`,
                    className: "bg-green-100 dark:bg-green-900",
                });
            } else if (passed) {
                 toast({
                    title: `Round ${quizRound} Passed!`,
                    description: `You scored ${finalScore}/${questions.length}. Get ready for the next round!`,
                    className: "bg-green-100 dark:bg-green-900",
                });
            } else {
                 toast({
                    variant: "destructive",
                    title: `Round ${quizRound} Failed`,
                    description: `You scored ${finalScore}/${questions.length}. You need at least 70% to pass. Try again!`,
                });
            }
            
            setQuizState('finished');
          }
      }, 1500); // Duration of the feedback animation
    }
  };


  const score = useMemo(() => {
    if (quizState !== 'finished') return 0;
    return userAnswers.reduce((acc, answer, index) => {
      if (questions[index] && answer === questions[index].correct_answer) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }, [quizState, userAnswers, questions]);

  const getResultMessage = () => {
      if (questions.length === 0) {
        return { message: "Quiz Generation Failed", icon: <XCircle className="h-16 w-16 text-destructive" />, color: 'text-destructive' };
      }
      const percentage = (score / (questions.length || 1)) * 100;
      if (percentage >= 70) return { message: `Congratulations! You Passed Round ${quizRound}!`, icon: <Award className="h-16 w-16 text-amber-500" />, color: 'text-amber-500' };
      return { message: "Good effort! Keep studying and try again.", icon: <XCircle className="h-16 w-16 text-destructive" />, color: 'text-destructive' };
  };

  const handleNextRound = () => {
    if (quizRound < MAX_ROUNDS) {
      setQuizRound(prev => prev + 1);
    }
  };

  if (quizState === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <h2 className="text-2xl font-bold">Generating Your Quiz (Round {quizRound})...</h2>
        <p className="text-muted-foreground">Our AI is preparing your questions. This may take a moment.</p>
      </div>
    );
  }

  if (quizState === 'finished') {
    const result = getResultMessage();
    const passed = (score / (questions.length || 1)) * 100 >= 70;
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <div className={result.color}>{result.icon}</div>
            <h2 className={`text-3xl font-bold mt-4 ${result.color}`}>{result.message}</h2>
            {questions.length > 0 && (
                <>
                    <p className="text-2xl font-semibold mt-2">
                        Your Score: {score} / {questions.length}
                    </p>
                    <p className="text-muted-foreground">({((score / questions.length) * 100).toFixed(0)}%)</p>
                </>
            )}
            {quizRound < MAX_ROUNDS ? (
                 <Button onClick={handleNextRound} className="mt-8">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    {passed ? `Start Round ${quizRound + 1}` : 'Try Round Again'}
                </Button>
            ) : (
                 <p className="mt-8 text-lg font-semibold text-primary">You have completed the final exam!</p>
            )}
        </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <h2 className="text-2xl font-bold">Loading question...</h2>
      </div>
    );
  }

  return (
    <>
      <AnimatePresence>
        {answerStatus && <AnswerFeedback status={answerStatus} />}
      </AnimatePresence>
      <div className="flex flex-col h-full p-4 md:p-6">
        <CardHeader>
          <CardTitle>Final Exam (Round {quizRound} of {MAX_ROUNDS})</CardTitle>
          <CardDescription>Test your knowledge with {questions.length} questions from the library.</CardDescription>
          <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="w-full mt-2" />
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-center">
            <div className="text-center mb-8">
                <h3 className="text-xl md:text-2xl font-semibold ">{currentQuestion.question}</h3>
            </div>
          <RadioGroup value={selectedOption ?? ''} onValueChange={setSelectedOption} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option, index) => (
              <div key={index}>
                <RadioGroupItem value={option} id={`option-${index}`} className="sr-only" />
                <Label 
                  htmlFor={`option-${index}`}
                  className={`flex flex-col items-center justify-center text-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedOption === option
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <span>{option}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="justify-end">
          <Button onClick={handleNextQuestion} disabled={!selectedOption || answerStatus !== null}>
            {answerStatus !== null ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question')}
          </Button>
        </CardFooter>
      </div>
    </>
  );
}


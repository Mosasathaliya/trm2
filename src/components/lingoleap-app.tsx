
"use client";

import * as React from "react";
import { useState, useEffect, useCallback, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { CategorySelector } from "@/components/CategorySelector";
import { WordCard, type Word } from "@/components/WordCard";
import { suggestNewWords, getWordDetails } from "@/ai/flows/suggest-new-words";
import { generateVocabularyQuiz } from "@/ai/flows/generate-vocabulary-quiz";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, Lightbulb, Loader2, Award, XCircle } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";

const INITIAL_CATEGORIES = [
  { english: "Emotional", arabic: "عاطفي" },
  { english: "Professional", arabic: "احترافي" },
  { english: "Intellectual", arabic: "فكري" },
  { english: "Personal Growth", arabic: "نمو شخصي" },
  { english: "Relationships", arabic: "علاقات" },
];

const WORDS_PER_QUIZ = 5;
const QUIZ_QUESTIONS_COUNT = 5;
const QUIZ_PASS_SCORE = 4;

interface QuizQuestion {
  question: string;
  options: string[];
  correct_answer: string;
}

function LingoleapAppContainer() {
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [wordQueue, setWordQueue] = useState<string[]>([]);
  const [viewedWords, setViewedWords] = useState<Word[]>([]);
  const [wordsSinceQuiz, setWordsSinceQuiz] = useState(0);

  const [selectedCategory, setSelectedCategory] = useState<string>(INITIAL_CATEGORIES[0].english);
  const [isLoading, setIsLoading] = useState(false);
  const [isAiLoading, startAiTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [quiz, setQuiz] = useState<QuizQuestion[] | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [showQuizResult, setShowQuizResult] = useState(false);

  const { toast } = useToast();

  const fetchNewWordDetails = useCallback(async (word: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const details = await getWordDetails({ word, category: selectedCategory });
      if (details) {
        setCurrentWord(details);
        setViewedWords(prev => [...prev, details]);
        setWordsSinceQuiz(prev => prev + 1);
      } else {
        throw new Error(`Could not fetch details for the word "${word}".`);
      }
    } catch (err) {
      console.error("Error fetching word details:", err);
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(`Oops! Couldn't fetch word details. ${errorMessage}`);
      toast({
        title: "Error Fetching Word Details",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory, toast]);

  const getNextWord = useCallback(async () => {
    if (wordsSinceQuiz >= WORDS_PER_QUIZ && viewedWords.length >= WORDS_PER_QUIZ) {
      startAiTransition(async () => {
        try {
          const quizData = await generateVocabularyQuiz({ words: viewedWords.slice(-WORDS_PER_QUIZ) });
          if (quizData && quizData.questions.length > 0) {
            setQuiz(quizData.questions);
            setShowQuizResult(false);
            setCurrentQuizQuestion(0);
            setQuizAnswers({});
            setQuizScore(0);
            setSelectedQuizOption(null);
          } else {
             throw new Error("AI failed to return quiz questions.");
          }
        } catch (quizError) {
          console.error("Failed to generate quiz", quizError);
          toast({ title: "Quiz Generation Failed", variant: "destructive" });
          setWordsSinceQuiz(0);
        }
      });
      return;
    }

    if (wordQueue.length > 0) {
      const nextWord = wordQueue[0];
      setWordQueue(wordQueue.slice(1));
      await fetchNewWordDetails(nextWord);
    } else {
      startAiTransition(async () => {
        try {
          const newWordList = await suggestNewWords({ category: selectedCategory, numberOfWords: 5 });
          if (newWordList && newWordList.length > 0) {
            const firstWord = newWordList[0];
            setWordQueue(newWordList.slice(1));
            await fetchNewWordDetails(firstWord);
          } else {
            throw new Error("AI did not return any words.");
          }
        } catch (err) {
          console.error("Error fetching new word list:", err);
          const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
          setError(`Oops! Couldn't get new words. ${errorMessage}`);
          toast({ title: "Error Getting Words", description: errorMessage, variant: "destructive" });
        }
      });
    }
  }, [wordQueue, wordsSinceQuiz, viewedWords, toast, fetchNewWordDetails, selectedCategory]);

  useEffect(() => {
    setCurrentWord(null);
    setWordQueue([]);
    setViewedWords([]);
    setWordsSinceQuiz(0);
    getNextWord();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  const handleCategoryChange = (newCategory: string) => {
    setSelectedCategory(newCategory);
  };

  const handleQuizAnswer = () => {
    if (!selectedQuizOption || !quiz) return;

    const newAnswers = { ...quizAnswers, [currentQuizQuestion]: selectedQuizOption };
    setQuizAnswers(newAnswers);

    if (selectedQuizOption === quiz[currentQuizQuestion].correct_answer) {
      setQuizScore(s => s + 1);
    }

    setSelectedQuizOption(null);

    if (currentQuizQuestion < quiz.length - 1) {
      setCurrentQuizQuestion(i => i + 1);
    } else {
      setShowQuizResult(true);
    }
  };

  const handleContinueLearning = () => {
    setQuiz(null);
    setShowQuizResult(false);
    setWordsSinceQuiz(0);
    setViewedWords([]);
    getNextWord();
  };
  
  const renderQuizResult = () => {
    if (!quiz) return null;
    const passed = quizScore >= QUIZ_PASS_SCORE;
    const message = passed ? "Excellent! You passed the quiz." : "Good effort. Let's try again after reviewing.";
    const icon = passed ? <Award className="h-12 w-12 text-green-500" /> : <XCircle className="h-12 w-12 text-destructive" />;
    
    return (
       <Card className="w-full max-w-md p-6 text-center">
         <CardHeader>
           <div className="flex justify-center mb-4">{icon}</div>
           <CardTitle>Quiz Complete!</CardTitle>
           <CardDescription>{message}</CardDescription>
         </CardHeader>
         <CardContent>
           <p className="text-3xl font-bold">Your Score: {quizScore} / {quiz.length}</p>
         </CardContent>
         <CardFooter>
            <Button onClick={handleContinueLearning}>Continue Learning</Button>
         </CardFooter>
       </Card>
    );
  };

  const renderQuiz = () => {
    if (isAiLoading && !quiz) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <h2 className="text-2xl font-bold">Generating Your Quiz...</h2>
        </div>
      );
    }
    if (showQuizResult) return renderQuizResult();
    if (!quiz || quiz.length === 0) return null;

    const question = quiz[currentQuizQuestion];
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Vocabulary Quiz</CardTitle>
          <CardDescription>Question {currentQuizQuestion + 1} of {quiz.length}</CardDescription>
           <Progress value={((currentQuizQuestion + 1) / quiz.length) * 100} className="w-full mt-2" />
        </CardHeader>
        <CardContent>
          <p className="font-semibold mb-4 text-lg">{question.question}</p>
          <RadioGroup value={selectedQuizOption || ""} onValueChange={setSelectedQuizOption}>
            {question.options.map(option => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option} className="text-base">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter>
          <Button onClick={handleQuizAnswer} disabled={!selectedQuizOption}>
            {currentQuizQuestion === quiz.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="lingoleap-app-container flex flex-col items-center h-full p-4 sm:p-8 bg-background text-foreground transition-colors duration-300">
      <header className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-primary mb-2 flex items-center justify-center gap-2">
                          <BookOpen className="h-8 w-8 sm:h-10 sm:w-10" /> LinguaLeap <Lightbulb className="h-8 w-8 sm:h-10 sm:w-10 text-accent" />
        </h1>
        <p className="text-lg text-muted-foreground">Expand Your Vocabulary, One Word at a Time</p>
      </header>

      <main className="flex flex-col items-center gap-8 w-full max-w-md">
        {quiz ? (
          renderQuiz()
        ) : (
          <>
            <CategorySelector
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              categories={INITIAL_CATEGORIES}
              disabled={isLoading || isAiLoading}
            />

            {error && (
              <div className="text-destructive text-center p-4 bg-destructive/10 rounded-md">
                {error}
              </div>
            )}

            <WordCard word={currentWord} isLoading={isLoading || (isAiLoading && !currentWord)} />

            <Button
              onClick={getNextWord}
              disabled={isLoading || isAiLoading}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md w-full"
            >
              {(isLoading || isAiLoading) ? <Loader2 className="animate-spin" /> : '🔄 Next Word'}
            </Button>
            <div className="text-center text-muted-foreground">
              <p>Word {wordsSinceQuiz} of {WORDS_PER_QUIZ}</p>
              <Progress value={(wordsSinceQuiz / WORDS_PER_QUIZ) * 100} className="w-32 mx-auto mt-2 h-2" />
            </div>
          </>
        )}
      </main>

      <footer className="mt-auto pt-8 text-center text-muted-foreground text-sm">
        Powered by Speed of Mastery
      </footer>
    </div>
  );
}

export function LingoleapApp() {
  return (
    <ScrollArea className="h-full">
      <LingoleapAppContainer />
    </ScrollArea>
  );
}

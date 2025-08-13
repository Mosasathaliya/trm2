
"use client";

import type { FC } from 'react';
import { useState, useTransition } from 'react';
import type { Lesson } from '@/types/lesson';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, MessageSquare, Send } from 'lucide-react';
import { getLessonTutorResponse, type LessonTutorInput } from '@/ai/flows/lesson-tutor-flow';

interface LessonTutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  lesson: Lesson;
}

const LessonTutorModal: FC<LessonTutorModalProps> = ({ isOpen, onClose, lesson }) => {
  const [studentQuestion, setStudentQuestion] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, startTransition] = useTransition();

  const handleSubmitQuestion = async () => {
    if (!studentQuestion.trim()) return;

    setError(null);
    setAiResponse(null);
    startTransition(async () => {
      try {
        // This input must exactly match the LessonTutorInputSchema in the flow.
        const tutorInput: LessonTutorInput = {
          studentQuestion,
          lessonTitle: lesson.title,
          lessonTopic: lesson.topic,
          lessonLevel: lesson.level,
          lessonArabicExplanation: lesson.arabic_explanation,
          lessonExamples: lesson.examples.map(ex => ({ 
            english: ex.english, 
            arabic: ex.arabic,
            imagePrompt: ex.imagePrompt,
            imageUrl: ex.imageUrl
          })),
          lessonAdditionalNotesArabic: lesson.additional_notes_arabic,
          lessonCommonMistakesArabic: lesson.common_mistakes_arabic,
        };
        const response = await getLessonTutorResponse(tutorInput);
        setAiResponse(response.aiTutorResponse);
      } catch (err) {
        console.error("Error fetching AI tutor response:", err);
        setError("عذرًا، لم أتمكن من الحصول على رد من المعلم الذكي في الوقت الحالي. يرجى المحاولة مرة أخرى لاحقًا.");
        setAiResponse(null);
      }
    });
  };

  const handleClose = () => {
    setStudentQuestion('');
    setAiResponse(null);
    setError(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[600px] flex flex-col max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl">
                            <MessageSquare className="mr-2 h-6 w-6 text-primary" />
            AI Lesson Tutor (مساعد الدرس الذكي)
          </DialogTitle>
          <DialogDescription dir="rtl" className="text-right">
            اطرح سؤالاً حول هذا الدرس، وسيقوم المعلم الذكي بمساعدتك على فهمه بشكل أفضل.
            اكتب سؤالك باللغة العربية أو الإنجليزية.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-grow overflow-y-auto space-y-4 p-1 pr-3">
          {aiResponse && (
            <Alert variant="default" className="border-accent bg-accent/10 dark:bg-accent/20">
              <MessageSquare className="h-5 w-5 text-primary" />
              <AlertTitle className="text-accent-foreground">AI Tutor's Response (رد المعلم الذكي)</AlertTitle>
              <AlertDescription className="text-accent-foreground/90 whitespace-pre-line text-right" dir="rtl">
                {aiResponse}
              </AlertDescription>
            </Alert>
          )}

           {isLoading && !aiResponse && (
             <div className="flex items-center text-muted-foreground p-4 justify-center">
               <Loader2 className="mr-2 h-5 w-5 animate-spin" />
               <span>جاري الحصول على رد من المعلم الذكي...</span>
             </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error (خطأ)</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
        
        <div className="mt-4 space-y-3 pt-4 border-t">
           <Textarea
            placeholder="اكتب سؤالك هنا... (Type your question here...)"
            value={studentQuestion}
            onChange={(e) => setStudentQuestion(e.target.value)}
            className="min-h-[80px] text-base"
            rows={3}
            dir={studentQuestion.match(/[\u0600-\u06FF]/) ? "rtl" : "ltr"} 
          />
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={handleClose} className="w-full sm:w-auto">
              Close (إغلاق)
            </Button>
            <Button onClick={handleSubmitQuestion} disabled={isLoading || !studentQuestion.trim()} className="w-full sm:w-auto">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
              Ask AI Tutor (اسأل المعلم الذكي)
            </Button>
          </DialogFooter>
        </div>

      </DialogContent>
    </Dialog>
  );
};

export default LessonTutorModal;


"use client";

import type { FC } from 'react';
import { useState, useTransition, useEffect } from 'react';
import type { Lesson } from '../../types/lesson';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';
import { Loader2, MessageSquare, Send, Mic, Volume2, Brain, BookOpen, Languages, Sparkles, Play, Pause, Download, History, Lightbulb } from 'lucide-react';
import { getLessonTutorResponse, type LessonTutorInput } from '../../ai/flows/lesson-tutor-flow';

interface LessonTutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  lesson: Lesson;
}

// Enhanced RAG System for Lesson Tutor
interface TutorRAGDocument {
  id: string;
  lessonId: string;
  question: string;
  answer: string;
  timestamp: Date;
  type: 'question' | 'explanation' | 'example' | 'practice';
  context: string;
}

class TutorRAGSystem {
  private documents: TutorRAGDocument[] = [];

  addDocument(doc: TutorRAGDocument) {
    this.documents.push(doc);
    console.log('Tutor document added to RAG:', doc);
  }

  search(query: string, lessonId?: string): TutorRAGDocument[] {
    let results = this.documents.filter(doc => 
      doc.question.toLowerCase().includes(query.toLowerCase()) ||
      doc.answer.toLowerCase().includes(query.toLowerCase()) ||
      doc.context.toLowerCase().includes(query.toLowerCase())
    );
    
    if (lessonId) {
      results = results.filter(doc => doc.lessonId === lessonId);
    }
    
    return results;
  }

  getRelatedQuestions(lessonId: string, limit: number = 5): TutorRAGDocument[] {
    return this.documents
      .filter(doc => doc.lessonId === lessonId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  }
}

const tutorRAG = new TutorRAGSystem();

const LessonTutorModal: FC<LessonTutorModalProps> = ({ isOpen, onClose, lesson }) => {
  const [studentQuestion, setStudentQuestion] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, startTransition] = useTransition();
  
  // Enhanced states
  const [conversationHistory, setConversationHistory] = useState<Array<{question: string, answer: string, timestamp: Date}>>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');
  const [ragSearchQuery, setRagSearchQuery] = useState('');
  const [ragSearchResults, setRagSearchResults] = useState<TutorRAGDocument[]>([]);
  const [relatedQuestions, setRelatedQuestions] = useState<TutorRAGDocument[]>([]);
  const [activeTab, setActiveTab] = useState<'chat' | 'rag' | 'history' | 'practice'>('chat');

  useEffect(() => {
    if (isOpen) {
      // Load related questions when modal opens
      const related = tutorRAG.getRelatedQuestions(lesson.lesson_id || lesson.title);
      setRelatedQuestions(related);
    }
  }, [isOpen, lesson]);

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
        const aiAnswer = response.aiTutorResponse;
        
        setAiResponse(aiAnswer);
        
        // Add to conversation history
        const newConversation = {
          question: studentQuestion,
          answer: aiAnswer,
          timestamp: new Date()
        };
        setConversationHistory(prev => [newConversation, ...prev]);
        
        // Store in RAG
        tutorRAG.addDocument({
          id: Date.now().toString(),
          lessonId: lesson.lesson_id || lesson.title,
          question: studentQuestion,
          answer: aiAnswer,
          timestamp: new Date(),
          type: 'question',
          context: `Lesson: ${lesson.title}, Topic: ${lesson.topic}, Level: ${lesson.level}`
        });
        
        // Update related questions
        const updatedRelated = tutorRAG.getRelatedQuestions(lesson.lesson_id || lesson.title);
        setRelatedQuestions(updatedRelated);
        
      } catch (err) {
        console.error("Error fetching AI tutor response:", err);
        setError("عذرًا، لم أتمكن من الحصول على رد من المعلم الذكي في الوقت الحالي. يرجى المحاولة مرة أخرى لاحقًا.");
        setAiResponse(null);
      }
    });
  };

  // TTS Functions
  const speakText = async (text: string, language: 'en' | 'ar' = 'en') => {
    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    try {
      setIsSpeaking(true);
      
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language === 'en' ? 'en-US' : 'ar-SA';
        utterance.rate = 0.8;
        utterance.pitch = 1;
        
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        
        speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.error('TTS error:', error);
      setIsSpeaking(false);
    }
  };

  // STT Functions
  const startListening = async () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser');
      return;
    }

    try {
      setIsListening(true);
      setTranscribedText('');

      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setTranscribedText(transcript);
        setStudentQuestion(transcript);
      };

      recognition.onerror = (event: any) => {
        console.error('STT error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (error) {
      console.error('STT error:', error);
      setIsListening(false);
    }
  };

  // RAG Search
  const searchRAG = () => {
    const results = tutorRAG.search(ragSearchQuery, lesson.lesson_id || lesson.title);
    setRagSearchResults(results);
  };

  const handleClose = () => {
    setStudentQuestion('');
    setAiResponse(null);
    setError(null);
    setTranscribedText('');
    setRagSearchQuery('');
    setRagSearchResults([]);
    setActiveTab('chat');
    onClose();
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'chat':
        return (
          <div className="space-y-4">
            <div className="flex gap-2">
              <Textarea
                placeholder="اكتب سؤالك هنا..."
                value={studentQuestion}
                onChange={(e) => setStudentQuestion(e.target.value)}
                rows={3}
                className="flex-1"
              />
              <div className="flex flex-col gap-2">
                <Button 
                  onClick={startListening}
                  disabled={isListening}
                  size="icon"
                  variant={isListening ? "destructive" : "outline"}
                >
                  <Mic className="h-4 w-4" />
                </Button>
                <Button 
                  onClick={() => speakText(studentQuestion, 'en')}
                  disabled={!studentQuestion.trim() || isSpeaking}
                  size="icon"
                  variant="outline"
                >
                  {isSpeaking ? <Pause className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            {transcribedText && (
              <Alert>
                <Mic className="h-4 w-4" />
                <AlertTitle>تم تحويل الكلام إلى نص:</AlertTitle>
                <AlertDescription>{transcribedText}</AlertDescription>
              </Alert>
            )}
            
            <Button onClick={handleSubmitQuestion} disabled={isLoading || !studentQuestion.trim()} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  جاري الحصول على رد من المعلم الذكي...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  اسأل المعلم الذكي
                </>
              )}
            </Button>
            
            {aiResponse && (
              <Alert variant="default" className="border-accent bg-accent/10 dark:bg-accent/20">
                <MessageSquare className="h-5 w-5 text-primary" />
                <AlertTitle className="text-accent-foreground">رد المعلم الذكي</AlertTitle>
                <AlertDescription className="text-accent-foreground/90 whitespace-pre-line text-right" dir="rtl">
                  {aiResponse}
                </AlertDescription>
                <div className="mt-3 flex gap-2">
                  <Button 
                    onClick={() => speakText(aiResponse, 'ar')}
                    size="sm"
                    variant="outline"
                  >
                    <Volume2 className="mr-2 h-3 w-3" />
                    استمع للإجابة
                  </Button>
                </div>
              </Alert>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertTitle>خطأ</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
        );
        
      case 'rag':
        return (
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="ابحث في المعرفة..."
                value={ragSearchQuery}
                onChange={(e) => setRagSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button onClick={searchRAG}>بحث</Button>
            </div>
            
            {ragSearchResults.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>نتائج البحث ({ragSearchResults.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-64">
                    {ragSearchResults.map((doc) => (
                      <div key={doc.id} className="border-b p-3 last:border-b-0">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-sm font-medium bg-primary/10 px-2 py-1 rounded">
                            {doc.type}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {doc.timestamp.toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm mb-1"><strong>السؤال:</strong> {doc.question}</p>
                        <p className="text-sm text-muted-foreground">{doc.answer}</p>
                      </div>
                    ))}
                  </ScrollArea>
                </CardContent>
              </Card>
            )}
          </div>
        );
        
      case 'history':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">سجل المحادثات</h3>
            {conversationHistory.length > 0 ? (
              <ScrollArea className="h-64">
                {conversationHistory.map((conv, index) => (
                  <Card key={index} className="mb-3">
                    <CardContent className="p-3">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs text-muted-foreground">
                          {conv.timestamp.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm mb-2"><strong>السؤال:</strong> {conv.question}</p>
                      <p className="text-sm text-muted-foreground">{conv.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </ScrollArea>
            ) : (
              <p className="text-muted-foreground text-center py-8">لا توجد محادثات سابقة</p>
            )}
          </div>
        );
        
      case 'practice':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">أسئلة مشابهة</h3>
            {relatedQuestions.length > 0 ? (
              <div className="space-y-3">
                {relatedQuestions.map((doc) => (
                  <Card key={doc.id}>
                    <CardContent className="p-3">
                      <p className="text-sm mb-2"><strong>السؤال:</strong> {doc.question}</p>
                      <p className="text-sm text-muted-foreground">{doc.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">لا توجد أسئلة مشابهة بعد</p>
            )}
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[800px] flex flex-col max-h-[90vh]">
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
        
        {/* Tab Navigation */}
        <div className="flex border-b">
          <Button
            variant={activeTab === 'chat' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('chat')}
            className="flex-1"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            محادثة
          </Button>
          <Button
            variant={activeTab === 'rag' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('rag')}
            className="flex-1"
          >
            <BookOpen className="mr-2 h-4 w-4" />
            قاعدة المعرفة
          </Button>
          <Button
            variant={activeTab === 'history' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('history')}
            className="flex-1"
          >
            <History className="mr-2 h-4 w-4" />
            السجل
          </Button>
          <Button
            variant={activeTab === 'practice' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('practice')}
            className="flex-1"
          >
            <Lightbulb className="mr-2 h-4 w-4" />
            أسئلة مشابهة
          </Button>
        </div>
        
        <div className="flex-grow overflow-y-auto space-y-4 p-1 pr-3">
          {renderTabContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LessonTutorModal;

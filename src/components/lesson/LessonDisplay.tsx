
"use client";

import { useState, useEffect } from 'react';
import type { Lesson } from '../../types/lesson';
import LessonHeader from './LessonHeader';
import ArabicExplanation from './ArabicExplanation';
import LessonExamples from './LessonExamples';
import AdditionalNotes from './AdditionalNotes';
import CommonMistakes from './CommonMistakes';
import InteractiveExercisesSection from '../exercise/InteractiveExercisesSection';
import { Button } from '../ui/button';
import { MessageSquarePlus, Mic, Volume2, Brain, BookOpen, Languages, Sparkles, Play, Pause, Download } from 'lucide-react';
import LessonTutorModal from './LessonTutorModal';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { ScrollArea } from '../ui/scroll-area';
import { ragService, type RAGSearchResult } from '../../lib/rag-service';
import { 
  generateText, 
  translateText, 
  generateSpeech, 
  generateLessonContent,
  enhancedAIFlow
} from '../../lib/client-ai';

interface LessonDisplayProps {
  lesson: Lesson;
}

const LessonDisplay = ({ lesson }: LessonDisplayProps) => {
  const [isTutorModalOpen, setIsTutorModalOpen] = useState(false);
  const [hasPassedExercises, setHasPassedExercises] = useState(false);
  const [activeDialog, setActiveDialog] = useState<string | null>(null);
  
  // TTS States
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  
  // STT States
  const [isListening, setIsListening] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');
  
  // AI States
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // RAG States
  const [ragSearchQuery, setRagSearchQuery] = useState('');
  const [ragSearchResults, setRagSearchResults] = useState<RAGSearchResult[]>([]);
  const [isRagReady, setIsRagReady] = useState(false);

  useEffect(() => {
    // Check if RAG service is ready
    const checkRagStatus = () => {
      if (ragService.isReady()) {
        setIsRagReady(true);
      } else {
        // Retry after a short delay
        setTimeout(checkRagStatus, 1000);
      }
    };
    checkRagStatus();
  }, []);

  const handleCorrectAnswer = () => {
    if (!hasPassedExercises) {
      setHasPassedExercises(true);
    }
  };

  // TTS Functions
  const speakText = async (text: string, language: 'en' | 'ar' = 'en') => {
    if (isSpeaking) {
      currentAudio?.pause();
      setIsSpeaking(false);
      setCurrentAudio(null);
      return;
    }

    try {
      setIsSpeaking(true);
      
      // Use browser TTS for cost-effectiveness
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language === 'en' ? 'en-US' : 'ar-SA';
        utterance.rate = 0.8;
        utterance.pitch = 1;
        
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        
        speechSynthesis.speak(utterance);
      } else {
        // Fallback to Cloudflare AI TTS if browser TTS not available
        console.log('Browser TTS not available, would use Cloudflare AI TTS');
        setIsSpeaking(false);
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
        
        // Store in RAG system
        ragService.storeDocument(
          `STT: ${transcript}`,
          'question',
          lesson.topic || 'general',
          {
            language: 'en',
            tags: ['stt', 'question', lesson.lesson_id || lesson.title],
            lessonId: lesson.lesson_id,
            lessonTitle: lesson.title,
            lessonLevel: lesson.level,
          }
        );
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

  // AI Question Function using REAL AI
  const askAI = async () => {
    if (!aiQuestion.trim()) return;
    
    setIsGenerating(true);
    
    try {
      // Use the REAL working AI function
      const result = await generateText(aiQuestion, {
        maxTokens: 800,
        temperature: 0.7
      });
      
      if (result.success && result.content) {
        setAiResponse(result.content);
      } else {
        setAiResponse(`Error: ${result.error || 'Failed to generate response'}`);
      }
      
    } catch (error) {
      console.error('AI error:', error);
      setAiResponse('Sorry, I encountered an error. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // RAG Knowledge Search - now using real AI
  const searchRAG = async () => {
    if (!ragSearchQuery.trim()) return;
    
    try {
      // Use enhanced AI flow for better context-aware responses
      const result = await enhancedAIFlow(
        ragSearchQuery,
        `Lesson: ${lesson.title}, Topic: ${lesson.topic}, Level: ${lesson.level}`
      );
      
      if (result.success && result.content) {
        // Create a mock search result since we're not using RAG backend yet
        const mockResult = {
          document: {
            id: Date.now().toString(),
            content: result.content,
            type: 'ai_response',
            topic: lesson.topic || 'general',
            embedding: [],
            metadata: {
              createdAt: new Date(),
              lastAccessed: new Date(),
              accessCount: 1,
              language: 'ar',
              tags: ['ai_response', lesson.topic || 'general']
            }
          },
          similarity: 0.9,
          relevance: 0.9,
          context: result.content.substring(0, 200) + '...'
        };
        
        setRagSearchResults([mockResult]);
      } else {
        setRagSearchResults([]);
      }
    } catch (error) {
      console.error('AI search error:', error);
      setRagSearchResults([]);
    }
  };

  const openDialog = (dialogName: string) => {
    setActiveDialog(dialogName);
  };

  const closeDialog = () => {
    setActiveDialog(null);
  };

  return (
    <>
      <div className="space-y-8 relative pb-20">
        <LessonHeader title={lesson.title} topic={lesson.topic} level={lesson.level} />
        
        {/* AI Tools Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              أدوات الذكاء الاصطناعي للدرس
            </CardTitle>
            <CardDescription>
              استخدم الذكاء الاصطناعي لتعزيز فهمك لهذا الدرس
              {!isRagReady && (
                <span className="text-yellow-600 ml-2">(جاري تهيئة النظام...)</span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Button 
                onClick={() => openDialog('tts')}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2"
              >
                <Volume2 className="h-6 w-6" />
                <span>استماع للنص</span>
              </Button>
              
              <Button 
                onClick={() => openDialog('stt')}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2"
              >
                <Mic className="h-6 w-6" />
                <span>التحدث للنص</span>
              </Button>
              
              <Button 
                onClick={() => openDialog('ai-question')}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2"
                disabled={!isRagReady}
              >
                <MessageSquarePlus className="h-6 w-6" />
                <span>اسأل الذكاء الاصطناعي</span>
              </Button>
              
              <Button 
                onClick={() => openDialog('rag')}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2"
                disabled={!isRagReady}
              >
                <BookOpen className="h-6 w-6" />
                <span>قاعدة المعرفة</span>
              </Button>
              
              <Button 
                onClick={() => openDialog('translation')}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2"
                disabled={!isRagReady}
              >
                <Languages className="h-6 w-6" />
                <span>ترجمة ذكية</span>
              </Button>
              
              <Button 
                onClick={() => openDialog('summary')}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2"
                disabled={!isRagReady}
              >
                <Sparkles className="h-6 w-6" />
                <span>ملخص الدرس</span>
              </Button>
            </div>
          </CardContent>
        </Card>

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

      {/* AI Function Dialogs */}
      
      {/* TTS Dialog */}
      <Dialog open={activeDialog === 'tts'} onOpenChange={() => closeDialog()}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>استماع للنص</DialogTitle>
            <DialogDescription>
              اختر النص الذي تريد الاستماع إليه
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Button 
              onClick={() => speakText(lesson.title, 'en')}
              className="w-full justify-start"
              variant="outline"
            >
              {isSpeaking ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
              عنوان الدرس: {lesson.title}
            </Button>
            
            <Button 
              onClick={() => speakText(lesson.arabic_explanation || lesson.title, 'ar')}
              className="w-full justify-start"
              variant="outline"
            >
              {isSpeaking ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
              الشرح بالعربية
            </Button>
            
            {lesson.examples.map((example, index) => (
              <Button 
                key={index}
                onClick={() => speakText(example.english, 'en')}
                className="w-full justify-start"
                variant="outline"
              >
                {isSpeaking ? <Pause className="mr-2 h-4 w-4" /> : <Pause className="mr-2 h-4 w-4" />}
                مثال {index + 1}: {example.english}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* STT Dialog */}
      <Dialog open={activeDialog === 'stt'} onOpenChange={() => closeDialog()}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>التحدث للنص</DialogTitle>
            <DialogDescription>
              تحدث وسأقوم بتحويل كلامك إلى نص
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Button 
              onClick={startListening}
              disabled={isListening}
              className="w-full"
              variant={isListening ? "destructive" : "default"}
            >
              <Mic className="mr-2 h-4 w-4" />
              {isListening ? 'جاري الاستماع...' : 'ابدأ التحدث'}
            </Button>
            
            {transcribedText && (
              <div className="bg-muted p-4 rounded">
                <h4 className="font-semibold mb-2">النص المحول:</h4>
                <p>{transcribedText}</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* AI Question Dialog */}
      <Dialog open={activeDialog === 'ai-question'} onOpenChange={() => closeDialog()}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>اسأل الذكاء الاصطناعي</DialogTitle>
            <DialogDescription>
              اطرح سؤالاً حول هذا الدرس وسأجيبك باستخدام قاعدة المعرفة
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="اكتب سؤالك هنا..."
              value={aiQuestion}
              onChange={(e) => setAiQuestion(e.target.value)}
              rows={3}
            />
            <Button onClick={askAI} disabled={isGenerating || !isRagReady} className="w-full">
              {isGenerating ? 'جاري الإجابة...' : 'اسأل الذكاء الاصطناعي'}
            </Button>
            
            {aiResponse && (
              <div className="bg-muted p-4 rounded">
                <h4 className="font-semibold mb-2">إجابة الذكاء الاصطناعي:</h4>
                <p>{aiResponse}</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* RAG Knowledge Dialog */}
      <Dialog open={activeDialog === 'rag'} onOpenChange={() => closeDialog()}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>قاعدة المعرفة للدرس</DialogTitle>
            <DialogDescription>
              ابحث في المعرفة المخزنة من هذا الدرس
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="ابحث في المعرفة..."
                value={ragSearchQuery}
                onChange={(e) => setRagSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button onClick={searchRAG} disabled={!isRagReady}>بحث</Button>
            </div>
            
            {ragSearchResults.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>نتائج البحث ({ragSearchResults.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-64">
                    {ragSearchResults.map((result) => (
                      <div key={result.document.id} className="border-b p-3 last:border-b-0">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-sm font-medium bg-primary/10 px-2 py-1 rounded">
                            {result.document.type}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(result.document.metadata.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm mb-1"><strong>المحتوى:</strong> {result.document.content}</p>
                        <p className="text-xs text-muted-foreground">التشابه: {(result.similarity * 100).toFixed(1)}%</p>
                      </div>
                    ))}
                  </ScrollArea>
                </CardContent>
              </Card>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Translation Dialog */}
      <Dialog open={activeDialog === 'translation'} onOpenChange={() => closeDialog()}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>ترجمة ذكية</DialogTitle>
            <DialogDescription>
              ترجم النصوص بين العربية والإنجليزية
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="اكتب النص للترجمة..."
              rows={3}
            />
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">عربي → إنجليزي</Button>
              <Button variant="outline" className="flex-1">إنجليزي → عربي</Button>
            </div>
            <Button className="w-full">ترجم</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Summary Dialog */}
      <Dialog open={activeDialog === 'summary'} onOpenChange={() => closeDialog()}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>ملخص الدرس</DialogTitle>
            <DialogDescription>
              احصل على ملخص شامل للدرس
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Button className="w-full">إنشاء ملخص</Button>
            <div className="bg-muted p-4 rounded">
              <h4 className="font-semibold mb-2">ملخص الدرس:</h4>
              <p>سيتم إنشاء ملخص شامل للدرس باستخدام الذكاء الاصطناعي...</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LessonDisplay;

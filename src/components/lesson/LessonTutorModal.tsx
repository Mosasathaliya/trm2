
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
import { ragService, type RAGSearchResult } from '../../lib/rag-service';
import { 
  generateText, 
  translateText, 
  generateSpeech, 
  generateLessonContent,
  enhancedAIFlow
} from '../../lib/client-ai';

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
  
  // Enhanced states
  const [conversationHistory, setConversationHistory] = useState<Array<{question: string, answer: string, timestamp: Date}>>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');
  const [ragSearchQuery, setRagSearchQuery] = useState('');
  const [ragSearchResults, setRagSearchResults] = useState<RAGSearchResult[]>([]);
  const [relatedQuestions, setRelatedQuestions] = useState<RAGSearchResult[]>([]);
  const [activeTab, setActiveTab] = useState<'chat' | 'rag' | 'history' | 'practice'>('chat');
  const [isRagReady, setIsRagReady] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Check if RAG service is ready
      const checkRagStatus = () => {
        if (ragService.isReady()) {
          setIsRagReady(true);
          // Load related questions when modal opens
          loadRelatedQuestions();
        } else {
          // Retry after a short delay
          setTimeout(checkRagStatus, 1000);
        }
      };
      checkRagStatus();
    }
  }, [isOpen, lesson]);

  const loadRelatedQuestions = async () => {
    try {
      // Generate related questions using AI
      const prompt = `Generate 3 related questions about the lesson: "${lesson.title}" (Topic: ${lesson.topic}, Level: ${lesson.level}). 
      Make them educational and helpful for students. Format as a simple list.`;
      
      const result = await generateText(prompt, {
        maxTokens: 400,
        temperature: 0.7
      });
      
      if (result.success && result.content) {
        // Create mock related questions from AI response
        const mockQuestions = result.content.split('\n').filter(line => line.trim()).map((content, index) => ({
          document: {
            id: `related-${index}`,
            content: content.trim(),
            type: 'related_question',
            topic: lesson.topic || 'general',
            embedding: [],
            metadata: {
              createdAt: new Date(),
              lastAccessed: new Date(),
              accessCount: 1,
              language: 'ar',
              tags: ['related_question', lesson.topic || 'general']
            }
          },
          similarity: 0.8,
          relevance: 0.8,
          context: content.trim()
        }));
        
        setRelatedQuestions(mockQuestions);
      }
    } catch (error) {
      console.error('Error loading related questions:', error);
    }
  };

  const handleSubmitQuestion = async () => {
    if (!studentQuestion.trim()) return;

    setError(null);
    setAiResponse(null);
    startTransition(async () => {
      try {
        // Use the REAL working AI function with lesson context
        const enhancedPrompt = `You are an Arabic language tutor. The student is asking about lesson: "${lesson.title}" (Topic: ${lesson.topic}, Level: ${lesson.level}). 
        
Student question: ${studentQuestion}

Please provide a helpful, educational response in Arabic that relates to this lesson. Be encouraging and provide examples if relevant.`;
        
        const response = await generateText(enhancedPrompt, {
          maxTokens: 800,
          temperature: 0.7
        });
        
        if (response.success && response.content) {
          const aiAnswer = response.content;
          setAiResponse(aiAnswer);
          
          // Add to conversation history
          const newConversation = {
            question: studentQuestion,
            answer: aiAnswer,
            timestamp: new Date()
          };
          setConversationHistory(prev => [newConversation, ...prev]);
          
          // Update related questions
          loadRelatedQuestions();
          
        } else {
          setError(response.error || 'Failed to get AI response');
          setAiResponse(null);
        }
        
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

  // RAG Search - now using real AI
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
            
            <Button onClick={handleSubmitQuestion} disabled={isLoading || !studentQuestion.trim() || !isRagReady} className="w-full">
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
            
            {!isRagReady && (
              <Alert>
                <Brain className="h-4 w-4" />
                <AlertTitle>جاري تهيئة النظام</AlertTitle>
                <AlertDescription>يرجى الانتظار حتى يتم تهيئة نظام الذكاء الاصطناعي...</AlertDescription>
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
                {relatedQuestions.map((result) => (
                  <Card key={result.document.id}>
                    <CardContent className="p-3">
                      <p className="text-sm mb-2"><strong>المحتوى:</strong> {result.document.content}</p>
                      <p className="text-xs text-muted-foreground">التشابه: {(result.similarity * 100).toFixed(1)}%</p>
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

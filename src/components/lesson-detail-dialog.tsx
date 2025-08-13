
'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Volume2, MessageSquare, BookText, BrainCircuit, Send, User, Bot, Sparkles, Image as ImageIcon, Mic, Square, FileText, Languages, Check, X, CheckCircle } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import type { LearningItem, Lesson, Story, MCQ } from '@/lib/lessons';
import { textToSpeech } from '@/ai/flows/tts-flow';
import { expertChat, type ExpertChatInput } from '@/ai/flows/expert-chat-flow';
import { generateStoryImage } from '@/ai/flows/story-image-flow';
import { translateText } from '@/ai/flows/translate-flow';
import { useToast } from "@/hooks/use-toast";
// Image import removed - using regular img tags for Astro
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { useProgressStore } from '@/hooks/use-progress-store';

interface LessonDetailDialogProps {
  item: LearningItem;
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  role: 'user' | 'model';
  content: string;
}

function LessonQuiz({ lesson }: { lesson: Lesson }) {
    const [answers, setAnswers] = React.useState<Record<number, string>>({});
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const { completeItem } = useProgressStore();

    const mcqs = lesson.mcqs;

    const handleAnswerChange = (questionIndex: number, selectedOption: string) => {
        if (isSubmitted) return;
        setAnswers(prev => ({ ...prev, [questionIndex]: selectedOption }));
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
        const score = mcqs.reduce((correctCount, mcq, index) => {
            return answers[index] === mcq.answer ? correctCount + 1 : correctCount;
        }, 0);
        
        // Assuming passing score is >= 70%
        if (score / mcqs.length >= 0.7) {
            completeItem(lesson.title);
        }
    };

    const handleRetry = () => {
        setAnswers({});
        setIsSubmitted(false);
    };

    const score = React.useMemo(() => {
        if (!isSubmitted) return 0;
        return mcqs.reduce((correctCount, mcq, index) => {
            if (answers[index] === mcq.answer) {
                return correctCount + 1;
            }
            return correctCount;
        }, 0);
    }, [isSubmitted, answers, mcqs]);

    return (
        <ScrollArea className="h-full">
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">اختبر معلوماتك</h3>
                    {isSubmitted && (
                         <Button onClick={handleRetry} variant="outline">أعد المحاولة</Button>
                    )}
                </div>

                {isSubmitted && (
                     <Alert className="mb-6 bg-primary/10 border-primary/20">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <AlertTitle>نتيجتك</AlertTitle>
                        <AlertDescription>
                            لقد حصلت على {score} من {mcqs.length} إجابات صحيحة.
                        </AlertDescription>
                    </Alert>
                )}

                <div className="space-y-6">
                    {mcqs.map((mcq, index) => (
                        <Card key={index} className={cn(
                            "bg-muted/50 p-4 transition-colors",
                            isSubmitted && (answers[index] === mcq.answer ? 'border-green-500' : 'border-destructive')
                        )}>
                            <p className="font-semibold mb-3">{index + 1}. {mcq.question}</p>
                            <RadioGroup
                                value={answers[index] || ""}
                                onValueChange={(value) => handleAnswerChange(index, value)}
                                disabled={isSubmitted}
                            >
                                {mcq.options.map((option, i) => {
                                    const isCorrect = option === mcq.answer;
                                    const isSelected = answers[index] === option;
                                    return (
                                        <div key={i} className={cn(
                                            "flex items-center space-x-2 rounded-md p-2",
                                             isSubmitted && isCorrect && "bg-green-500/10 text-green-800 dark:text-green-300",
                                             isSubmitted && isSelected && !isCorrect && "bg-destructive/10 text-destructive"
                                        )}>
                                            <RadioGroupItem value={option} id={`q${index}-o${i}`} />
                                            <Label htmlFor={`q${index}-o${i}`} className="flex-1 cursor-pointer">{option}</Label>
                                            {isSubmitted && isCorrect && <Check className="h-5 w-5 text-green-500" />}
                                            {isSubmitted && isSelected && !isCorrect && <X className="h-5 w-5 text-destructive" />}
                                        </div>
                                    );
                                })}
                            </RadioGroup>
                        </Card>
                    ))}
                </div>
                 {!isSubmitted && (
                    <div className="mt-6 flex justify-end">
                        <Button onClick={handleSubmit}>تحقق من الإجابات</Button>
                    </div>
                )}
            </div>
        </ScrollArea>
    );
}

function Chatbot({ lesson }: { lesson: Lesson }) {
    const [history, setHistory] = React.useState<Message[]>([]);
    const [input, setInput] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const { toast } = useToast();
    const scrollAreaRef = React.useRef<HTMLDivElement>(null);
    const [isRecording, setIsRecording] = React.useState(false);
    const recognitionRef = React.useRef<any>(null);

    React.useEffect(() => {
        if (scrollAreaRef.current) {
            const viewport = scrollAreaRef.current.querySelector('div');
            if (viewport) {
                viewport.scrollTo({ top: viewport.scrollHeight, behavior: 'smooth' });
            }
        }
    }, [history]);
    
    React.useEffect(() => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.lang = 'ar-SA';
            recognitionRef.current.interimResults = false;

            recognitionRef.current.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setInput(transcript);
                handleSendMessage(transcript);
            };

            recognitionRef.current.onerror = (event: any) => {
                console.error('Speech recognition error:', event.error);
                toast({
                    variant: "destructive",
                    title: "خطأ في التعرف على الكلام",
                    description: "لم نتمكن من التعرف على صوتك. الرجاء المحاولة مرة أخرى.",
                });
                setIsRecording(false);
            };
            
            recognitionRef.current.onend = () => {
                setIsRecording(false);
            };
        }
    }, [toast]);
    
    const toggleRecording = () => {
        if (!recognitionRef.current) {
            toast({
                variant: "destructive",
                title: "المتصفح غير مدعوم",
                description: "ميزة التعرف على الكلام غير مدعومة في هذا المتصفح.",
            });
            return;
        }

        if (isRecording) {
            recognitionRef.current.stop();
        } else {
            recognitionRef.current.start();
        }
        setIsRecording(!isRecording);
    };

    const playAudio = async (text: string) => {
        try {
            // Simple check for Arabic characters
            const isArabic = /[\u0600-\u06FF]/.test(text);
            const result = await textToSpeech({ prompt: text, lang: isArabic ? 'ar' : 'en' });
            if (result && result.media) {
                const audio = new Audio(result.media);
                audio.play();
            }
        } catch (error) {
            console.error('TTS Error:', error);
            toast({
                variant: "destructive",
                title: "حدث خطأ",
                description: "لم نتمكن من تشغيل الصوت.",
            });
        }
    };
    
    const handleSendMessage = async (messageToSend?: string) => {
        const currentMessage = messageToSend || input;
        if (!currentMessage.trim() || isLoading) return;

        const newUserMessage: Message = { role: 'user', content: currentMessage };
        const newHistory = [...history, newUserMessage];
        setHistory(newHistory);
        setInput('');
        setIsLoading(true);

        try {
            const chatInput: ExpertChatInput = {
                lessonTitle: lesson.title,
                lessonExplanation: lesson.explanation,
                history: newHistory.slice(0, -1),
                question: currentMessage,
            };
            const result = await expertChat(chatInput);
            const aiMessage: Message = { role: 'model', content: result.answer };
            setHistory(prev => [...prev, aiMessage]);
            await playAudio(result.answer);
        } catch (error) {
            console.error('Expert chat error:', error);
            toast({
                variant: "destructive",
                title: "حدث خطأ",
                description: "لم نتمكن من الحصول على رد من الخبير. الرجاء المحاولة مرة أخرى.",
            });
            setHistory(prev => prev.slice(0, -1));
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="flex flex-col h-full">
            <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
                <div className="space-y-4">
                     {history.length === 0 && (
                        <div className="text-center text-muted-foreground pt-10">
                            <Bot className="mx-auto h-12 w-12 mb-4" />
                            <h3 className="text-lg font-semibold">خبير الذكاء الاصطناعي</h3>
                            <p>اطرح أي سؤال حول "{lesson.title}".</p>
                        </div>
                    )}
                    {history.map((msg, index) => (
                        <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                            {msg.role === 'model' && <Bot className="h-6 w-6 text-primary flex-shrink-0" />}
                            <div className={`rounded-lg p-3 max-w-[80%] ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                            </div>
                            {msg.role === 'user' && <User className="h-6 w-6 flex-shrink-0" />}
                        </div>
                    ))}
                    {isLoading && (
                         <div className="flex items-start gap-3">
                            <Bot className="h-6 w-6 text-primary flex-shrink-0" />
                            <div className="rounded-lg p-3 bg-muted">
                                <div className="flex items-center space-x-2" dir="rtl">
                                    <div className="h-2 w-2 bg-primary rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                                    <div className="h-2 w-2 bg-primary rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                                    <div className="h-2 w-2 bg-primary rounded-full animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </ScrollArea>
            <div className="p-4 border-t flex items-center gap-2">
                <Button 
                    size="icon" 
                    variant={isRecording ? "destructive" : "outline"}
                    onClick={toggleRecording}
                    disabled={isLoading}
                >
                    {isRecording ? <Square className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </Button>
                <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="اكتب سؤالك أو استخدم الميكروفون..."
                    rows={1}
                    className="w-full p-2 rounded-md focus:ring-2 focus:ring-primary outline-none transition resize-none"
                    disabled={isLoading}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                        }
                    }}
                />
                <Button size="icon" onClick={() => handleSendMessage()} disabled={isLoading || !input.trim()}>
                    <Send className="h-5 w-5" />
                </Button>
            </div>
        </div>
    );
}

function StoryReader({ story, isLessonStory }: { story: Story | Lesson['story'], isLessonStory?: boolean }) {
    const [imageUrl, setImageUrl] = React.useState<string | null>(null);
    const [isLoadingImage, setIsLoadingImage] = React.useState(false);
    const [isLoadingAudio, setIsLoadingAudio] = React.useState(false);
    const [translation, setTranslation] = React.useState<{ word: string, text: string, isLoading: boolean } | null>(null);
    const { toast } = useToast();
    const { completeItem } = useProgressStore();

    const storyContent = 'summary' in story ? story.summary : story.content;
    const storyTitle = 'title' in story ? story.title : '';

    const handleWordClick = async (word: string) => {
      const cleanedWord = word.replace(/[^a-zA-Z]/g, ''); // Clean punctuation
      if (!cleanedWord) return;

      playAudio(cleanedWord, 'en');
      setTranslation({ word: cleanedWord, text: 'جاري الترجمة...', isLoading: true });

      try {
        const result = await translateText({ text: cleanedWord, targetLanguage: 'ar' });
        setTranslation({ word: cleanedWord, text: result.translation, isLoading: false });
      } catch (error) {
        console.error('Translation error:', error);
        setTranslation({ word: cleanedWord, text: 'فشل الترجمة', isLoading: false });
        toast({
          variant: 'destructive',
          title: 'خطأ في الترجمة',
        });
      }
    };

    const handleGenerateImage = async () => {
        setIsLoadingImage(true);
        try {
            const result = await generateStoryImage({ story: storyContent });
            setImageUrl(result.imageUrl);
        } catch (error) {
            console.error('Image generation error:', error);
            toast({
                variant: 'destructive',
                title: 'فشل إنشاء الصورة',
                description: 'حدث خطأ أثناء إنشاء الصورة. الرجاء المحاولة مرة أخرى.',
            });
        } finally {
            setIsLoadingImage(false);
        }
    };
    
    const playAudio = async (text: string, lang: 'en' | 'ar' = 'en') => {
        setIsLoadingAudio(true);
        try {
          const result = await textToSpeech({ prompt: text, lang: lang });
          if (result && result.media) {
            const audio = new Audio(result.media);
            audio.play();
          } else {
             toast({
                variant: 'destructive',
                title: 'فشل تشغيل الصوت',
                description: 'لم نتمكن من إنشاء الصوت.',
            });
          }
        } catch (error) {
          console.error('TTS Error:', error);
           toast({
                variant: 'destructive',
                title: 'فشل تشغيل الصوت',
                description: 'حدث خطأ أثناء إنشاء الصوت.',
            });
        } finally {
            setIsLoadingAudio(false);
        }
    };

    const handleMarkComplete = () => {
      completeItem(storyTitle);
      toast({
        title: "Story Complete!",
        description: "You've unlocked the next item in your learning path.",
      });
    };

    return (
        <ScrollArea className="h-full">
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">{storyTitle}</h3>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => playAudio(storyContent, 'en')}
                        disabled={isLoadingAudio}
                        aria-label="Listen to story"
                    >
                        <Volume2 className="h-5 w-5" />
                    </Button>
                </div>

                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap mb-6" dir="ltr">
                  {storyContent.split(/(\s+)/).map((segment, index) => {
                    const isWord = segment.trim().length > 0;
                    if (isWord) {
                      const word = segment;
                      const cleanedWord = word.replace(/[^a-zA-Z]/g, '');
                      return (
                        <Popover key={index}>
                          <PopoverTrigger asChild>
                            <span 
                              className="cursor-pointer hover:bg-accent/30 rounded-md transition-colors"
                              onClick={() => handleWordClick(word)}
                            >
                              {word}
                            </span>
                          </PopoverTrigger>
                          {translation?.word === cleanedWord && (
                            <PopoverContent className="w-auto p-2" side="top">
                                {translation.isLoading ? (
                                    <div className="text-sm">...</div>
                                ) : (
                                    <div className="text-sm font-semibold">{translation.text}</div>
                                )}
                            </PopoverContent>
                          )}
                        </Popover>
                      );
                    }
                    return <span key={index}>{segment}</span>;
                  })}
                </p>
                
                {!isLessonStory && !imageUrl && !isLoadingImage && (
                    <Button onClick={handleGenerateImage}>
                        <Sparkles className="mr-2 h-4 w-4" />
                        تخيل القصة
                    </Button>
                )}

                 {isLessonStory && (
                    <div className="mt-6 flex justify-end">
                        <Button onClick={handleMarkComplete}>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Mark as Complete
                        </Button>
                    </div>
                )}

                {isLoadingImage && (
                    <div className="flex items-center justify-center p-4 rounded-md bg-muted">
                        <div className="flex items-center space-x-2" dir="rtl">
                            <div className="h-2 w-2 bg-primary rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                            <div className="h-2 w-2 bg-primary rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                            <div className="h-2 w-2 bg-primary rounded-full animate-pulse"></div>
                            <span className="text-muted-foreground mr-2">...يتم إنشاء الصورة</span>
                        </div>
                    </div>
                )}
                
                {imageUrl && (
                    <div className="mt-4 border rounded-lg overflow-hidden">
                        <img
                            src={imageUrl}
                            alt={`Illustration for ${storyTitle}`}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                )}
            </div>
        </ScrollArea>
    );
}


export function LessonDetailDialog({ item, isOpen, onClose }: LessonDetailDialogProps) {
  const [activeTab, setActiveTab] = React.useState<'explanation' | 'mcq' | 'chatbot' | 'story'>('explanation');
  const [audioStates, setAudioStates] = React.useState<Record<string, { loading: boolean; dataUrl: string | null }>>({});
  const [translatedExplanation, setTranslatedExplanation] = React.useState<string | null>(null);
  const [isTranslating, setIsTranslating] = React.useState(false);
  const { toast } = useToast();

  const handleTranslate = async () => {
    if (!item || item.type !== 'lesson' || translatedExplanation) return;
    setIsTranslating(true);
    try {
      const result = await translateText({ text: item.explanation, targetLanguage: 'ar' });
      setTranslatedExplanation(result.translation);
    } catch (error) {
      console.error("Translation error:", error);
      toast({
        variant: "destructive",
        title: "خطأ في الترجمة",
        description: "لم نتمكن من ترجمة الشرح. الرجاء المحاولة مرة أخرى.",
      });
    } finally {
      setIsTranslating(false);
    }
  };


  const playAudio = async (text: string, id: string, lang: 'en' | 'ar' = 'en') => {
    if (audioStates[id]?.dataUrl) {
      const audio = new Audio(audioStates[id].dataUrl!);
      audio.play();
      return;
    }
    
    setAudioStates(prev => ({ ...prev, [id]: { loading: true, dataUrl: null } }));
    try {
      const result = await textToSpeech({prompt: text, lang: lang});
      if (result && result.media) {
        setAudioStates(prev => ({ ...prev, [id]: { loading: false, dataUrl: result.media } }));
        const audio = new Audio(result.media);
        audio.play();
      }
    } catch (error) {
      console.error('TTS Error:', error);
      setAudioStates(prev => ({ ...prev, [id]: { loading: false, dataUrl: null } }));
    }
  };

  React.useEffect(() => {
    setTranslatedExplanation(null);
    setActiveTab(item.type === 'lesson' ? 'explanation' : 'story');
  }, [item]);


  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-2 border-b">
          <DialogTitle className="text-2xl text-primary">{item.title}</DialogTitle>
          <DialogDescription>Details and interactive sections for the selected learning item.</DialogDescription>
        </DialogHeader>
        
        {item.type === 'lesson' && (
            <>
                <div className="flex border-b px-6">
                    <TabButton icon={<BookText />} label="الشرح والأمثلة" isActive={activeTab === 'explanation'} onClick={() => setActiveTab('explanation')} />
                    <TabButton icon={<BrainCircuit />} label="اختبر نفسك" isActive={activeTab === 'mcq'} onClick={() => setActiveTab('mcq')} />
                    <TabButton icon={<MessageSquare />} label="اسأل الخبير" isActive={activeTab === 'chatbot'} onClick={() => setActiveTab('chatbot')} />
                    {item.story && <TabButton icon={<FileText />} label="قصة" isActive={activeTab === 'story'} onClick={() => setActiveTab('story')} />}
                </div>
                 <div className="flex-grow min-h-0">
                    {activeTab === 'explanation' && (
                        <ScrollArea className="h-full">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="text-xl font-semibold">الشرح</h3>
                                    <div className="flex gap-2">
                                        <Button 
                                            variant="outline" 
                                            size="icon" 
                                            onClick={handleTranslate}
                                            disabled={isTranslating || !!translatedExplanation}
                                            aria-label="Translate to Arabic"
                                        >
                                            <Languages className="h-5 w-5" />
                                        </Button>
                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            onClick={() => playAudio(item.explanation, `${item.title}-explanation`, 'en')}
                                            disabled={audioStates[`${item.title}-explanation`]?.loading}
                                            aria-label="Listen to explanation"
                                        >
                                            <Volume2 className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>
                                <p className="text-muted-foreground mb-6 leading-relaxed whitespace-pre-wrap">{item.explanation}</p>
                                
                                {isTranslating && (
                                    <div className="p-4 rounded-md bg-muted text-center text-muted-foreground">
                                        ...جاري الترجمة
                                    </div>
                                )}
                                {translatedExplanation && (
                                    <div className="p-4 rounded-md bg-accent/20 border border-accent/30">
                                         <div className="flex justify-between items-center mb-2">
                                            <h4 className="font-semibold">الترجمة العربية</h4>
                                             <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                onClick={() => playAudio(translatedExplanation, `${item.title}-translation`, 'ar')}
                                                disabled={audioStates[`${item.title}-translation`]?.loading}
                                                aria-label="Listen to translation"
                                            >
                                                <Volume2 className="h-5 w-5" />
                                            </Button>
                                        </div>
                                        <p className="leading-relaxed whitespace-pre-wrap" dir="rtl">{translatedExplanation}</p>
                                    </div>
                                )}


                                <h3 className="text-xl font-semibold mb-4 mt-6">أمثلة</h3>
                                <div className="space-y-4">
                                    {item.examples.map((example, index) => (
                                        <Card key={index} className="bg-muted/50">
                                            <CardContent className="p-4 flex items-center justify-between">
                                                <div>
                                                    <p className="font-mono text-left text-base" dir="ltr">{example.english}</p>
                                                    <p className="text-sm text-muted-foreground mt-1" dir="rtl">{example.arabic}</p>
                                                </div>
                                                 <div className="flex gap-1">
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon" 
                                                        onClick={() => playAudio(example.english, `${item.title}-example-${index}-en`, 'en')}
                                                        disabled={audioStates[`${item.title}-example-${index}-en`]?.loading}
                                                        aria-label={`Listen to English example ${index + 1}`}
                                                    >
                                                        <Volume2 className="h-5 w-5" />
                                                    </Button>
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon" 
                                                        onClick={() => playAudio(example.arabic, `${item.title}-example-${index}-ar`, 'ar')}
                                                        disabled={audioStates[`${item.title}-example-${index}-ar`]?.loading}
                                                        aria-label={`Listen to Arabic example ${index + 1}`}
                                                    >
                                                        <Volume2 className="h-5 w-5" />
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </ScrollArea>
                    )}
                    {activeTab === 'mcq' && (
                        <LessonQuiz lesson={item} />
                    )}
                    {activeTab === 'chatbot' && (
                        <Chatbot lesson={item} />
                    )}
                    {activeTab === 'story' && item.story && (
                        <StoryReader story={item.story} isLessonStory={true} />
                    )}
                </div>
            </>
        )}
        {item.type === 'story' && <StoryReader story={item} />}
      </DialogContent>
    </Dialog>
  );
}


function TabButton({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                isActive ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
        >
            {icon}
            <span className="text-sm font-medium">{label}</span>
        </button>
    )
}

    
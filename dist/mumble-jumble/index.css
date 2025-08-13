/**
 * @fileoverview Defines the content for each screen/tab of the application.
 */
"use client";

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from "@/components/ui/scroll-area";
import type { LearningItem, Lesson, Story } from '@/lib/lessons';
import { learningItems } from '@/lib/lessons';
import { LessonDetailDialog } from '@/components/lesson-detail-dialog';
import { chatStream } from '@/ai/flows/chat-flow';
import { useToast } from "@/hooks/use-toast"
import { BookText, Book, Bot, ArrowRight, ArrowLeft, Sparkles, Image as ImageIcon, GraduationCap, Mic, X } from 'lucide-react';
import Image from 'next/image';
import type { ActiveTab } from './main-app';
import { generateStoryImage } from '@/ai/flows/story-image-flow';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { LingoleapApp } from './lingoleap-app';


export function HomeScreen({ setActiveTab }: { setActiveTab: (tab: ActiveTab) => void }) {
    const [isLingoleapOpen, setIsLingoleapOpen] = useState(false);

  return (
    <>
    <section className="animate-fadeIn">
        <h2 className="text-4xl font-bold mb-4 text-center">أهلاً بك في رحلتك لتعلم الإنجليزية</h2>
         <p className="text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
            استكشف الدروس التفاعلية، وتحدث مع مدرس الذكاء الاصطناعي، وتتبع تقدمك وأنت تتقن اللغة الإنجليزية.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card 
                className="cursor-pointer transform transition-all hover:scale-[1.03] hover:shadow-lg bg-card/70 backdrop-blur-sm"
                onClick={() => setIsLingoleapOpen(true)}
            >
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <GraduationCap className="h-8 w-8 text-primary" />
                        <span>مُنشئ المفردات بالذكاء الاصطناعي</span>
                    </CardTitle>
                    <CardDescription>
                        قم بتوسيع مفرداتك مع كلمات وتعريفات وأمثلة مولدة بالذكاء الاصطناعي.
                    </CardDescription>
                </CardHeader>
            </Card>

        </div>
        
    </section>

    <Dialog open={isLingoleapOpen} onOpenChange={setIsLingoleapOpen}>
        <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0">
             <DialogHeader className="p-4 border-b">
                <DialogTitle>LinguaLeap Vocabulary Builder</DialogTitle>
                 <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </DialogClose>
            </DialogHeader>
            <div className="flex-grow min-h-0">
                <LingoleapApp />
            </div>
        </DialogContent>
    </Dialog>
    </>
  );
}

export function BookScreen() {
    const [selectedItem, setSelectedItem] = useState<LearningItem | null>(null);

    return (
        <section className="animate-fadeIn">
            <h2 className="text-xl font-semibold mb-4 text-center">المكتبة التعليمية</h2>
            <ScrollArea className="h-[calc(100vh-180px)]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    {learningItems.map((item, i) => (
                        <Card 
                            key={i} 
                            className="transform transition-all hover:scale-[1.03] hover:shadow-lg bg-card/70 backdrop-blur-sm flex flex-col cursor-pointer"
                            onClick={() => setSelectedItem(item)}
                        >
                            <CardHeader className="flex-row items-center justify-center gap-4 space-y-0">
                                {item.type === 'lesson' ? (
                                    <Book className="h-6 w-6 text-primary" />
                                ) : (
                                    <BookText className="h-6 w-6 text-accent" />
                                )}
                                <CardTitle className="text-lg text-primary text-center">{item.title}</CardTitle>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </ScrollArea>
            {selectedItem && (
                <LessonDetailDialog 
                    item={selectedItem}
                    isOpen={!!selectedItem}
                    onClose={() => setSelectedItem(null)}
                />
            )}
        </section>
    );
}


interface AiScreenProps {
  setActiveTab: (tab: ActiveTab) => void;
}

type AiSubScreen = 'chat' | 'story';

function AiChatScreen({ onNavigate }: { onNavigate: () => void }) {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const askAI = async () => {
    if (!input.trim() || loading) return;
    
    setLoading(true);
    setResponse(""); // Clear previous response
    const currentInput = input;
    setInput("");

    try {
      const stream = await chatStream(currentInput);
      if (!stream) {
        throw new Error("Server action did not return a stream.");
      }

      const reader = stream.getReader();
      const decoder = new TextDecoder();
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const decodedChunk = decoder.decode(value, { stream: true });
        setResponse(prev => prev + decodedChunk);
      }
    } catch (err) {
      console.error("AI chat error:", err);
      toast({
        variant: "destructive",
        title: "حدث خطأ",
        description: "لم نتمكن من معالجة طلبك. الرجاء المحاولة مرة أخرى.",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <Card className="bg-card/70 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>اسأل الذكاء الاصطناعي</CardTitle>
            <div className='flex items-center'>
             <Button variant="ghost" size="icon" onClick={onNavigate}>
                <ArrowRight className="h-5 w-5" />
            </Button>
            </div>
        </CardHeader>
        <CardContent>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="اكتب سؤالك هنا عن اللغة الإنجليزية..."
            rows={3}
            className="w-full p-3 rounded-md focus:ring-2 focus:ring-primary outline-none transition bg-background"
            disabled={loading}
             onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    askAI();
                }
            }}
          />
          <Button
            onClick={askAI}
            className="mt-3"
            disabled={loading || !input.trim()}
          >
            {loading ? '...جارٍ التفكير' : 'إرسال السؤال'}
          </Button>
        </CardContent>
      </Card>
      
      {(loading || response) && (
        <Card className="mt-4 bg-card/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot />
              <span>إجابة الذكاء الاصطناعي</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{response}{loading && response.length === 0 ? '...' : ''}</p>
          </CardContent>
        </Card>
      )}
    </>
  );
}

function AiStoryScreen({ onNavigate }: { onNavigate: () => void }) {
    const [prompt, setPrompt] = useState("");
    const [story, setStory] = useState("");
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const generateStory = async () => {
        if (!prompt.trim() || loading) return;

        setLoading(true);
        setStory("");
        setImageUrl(null);

        try {
            // 1. Generate story text in English
            const storyStream = await chatStream(`Write a short, creative story in English about: ${prompt}`);
            if (!storyStream) throw new Error("Could not get story stream.");

            const reader = storyStream.getReader();
            const decoder = new TextDecoder();
            let fullStory = "";
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const decodedChunk = decoder.decode(value, { stream: true });
                setStory(prev => prev + decodedChunk);
                fullStory += decodedChunk;
            }

            // 2. Generate image for the completed story
            const imageResult = await generateStoryImage({ story: fullStory });
            setImageUrl(imageResult.imageUrl);

        } catch (err) {
            console.error("AI story generation error:", err);
            toast({
                variant: "destructive",
                title: "حدث خطأ",
                description: "لم نتمكن من إنشاء القصة. الرجاء المحاولة مرة أخرى.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Card className="bg-card/70 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>مولد قصص الذكاء الاصطناعي</CardTitle>
                    <Button variant="ghost" size="icon" onClick={onNavigate}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </CardHeader>
                <CardContent>
                    <Textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="اكتب فكرة لقصة، مثل 'رائد فضاء يجد حديقة على المريخ'..."
                        rows={2}
                        className="w-full p-3 rounded-md focus:ring-2 focus:ring-primary outline-none transition bg-background"
                        disabled={loading}
                    />
                    <Button onClick={generateStory} className="mt-3" disabled={loading || !prompt.trim()}>
                        {loading ? '...جاري الكتابة' : <><Sparkles className="mr-2 h-4 w-4"/> إنشاء قصة</>}
                    </Button>
                </CardContent>
            </Card>

            {(loading || story) && (
                <Card className="mt-4 bg-card/70 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Bot />
                            <span>قصتك (باللغة الإنجليزية)</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {imageUrl && (
                             <div className="mb-4 border rounded-lg overflow-hidden">
                                <Image
                                    src={imageUrl}
                                    alt={`Illustration for the story`}
                                    width={500}
                                    height={300}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        )}
                        {loading && !imageUrl && (
                            <div className="flex items-center justify-center p-4 rounded-md bg-muted mb-4">
                                <ImageIcon className="h-6 w-6 text-muted-foreground animate-pulse" />
                                <span className="text-muted-foreground mr-2">...يتم إنشاء الصورة</span>
                            </div>
                        )}
                        <p className="whitespace-pre-wrap" dir="ltr">{story}{loading && story.length === 0 ? '...' : ''}</p>
                    </CardContent>
                </Card>
            )}
        </>
    );
}

export function AiScreen({ setActiveTab }: AiScreenProps) {
    const [subScreen, setSubScreen] = useState<AiSubScreen>('chat');

    return (
        <section className="animate-fadeIn">
            {subScreen === 'chat' && <AiChatScreen onNavigate={() => setSubScreen('story')} />}
            {subScreen === 'story' && <AiStoryScreen onNavigate={() => setSubScreen('chat')} />}
        </section>
    );
}

export function ProgressScreen() {
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prevProgress => (prevProgress >= 85 ? 13 : prevProgress + Math.random() * 15));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="animate-fadeIn">
      <h2 className="text-xl font-semibold mb-4">تقدم التعلّم</h2>
      <Card className="bg-card/70 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span>التقدم العام</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <Card className="bg-muted/50">
                <CardHeader>
                    <CardTitle className="uppercase text-xs text-muted-foreground">الدروس المكتملة</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">14/80</p>
                </CardContent>
            </Card>
            <Card className="bg-muted/50">
                <CardHeader>
                    <CardTitle className="uppercase text-xs text-muted-foreground">القصص المقروءة</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">2/26</p>
                </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
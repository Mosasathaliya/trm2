
"use client";

import { useState, useEffect, useRef } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { ahmedVoiceCall, type AhmedVoiceCallInput } from '@/ai/flows/ahmed-voice-call';
import { saraVoiceCall, type SaraVoiceCallInput } from '@/ai/flows/sara-voice-call';
import { textToSpeech } from '@/ai/flows/tts-flow';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, User, MessageCircle, Mic, Volume2, MicOff, Send, Square, VolumeX } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from './ui/scroll-area';

const ahmedSchema = z.object({
  englishGrammarConcept: z.string().min(3, { message: "يرجى إدخال مفهوم قواعدي (3 أحرف على الأقل)." }),
});
type AhmedFormData = z.infer<typeof ahmedSchema>;

const saraSchema = z.object({
  englishGrammarConcept: z.string().min(3, { message: "يرجى إدخال مفهوم قواعدي (3 أحرف على الأقل)." }),
  userLanguageProficiency: z.string().min(2, { message: "يرجى وصف مستوى إتقانك (حرفان على الأقل)." }),
});
type SaraFormData = z.infer<typeof saraSchema>;

type Teacher = "Ahmed" | "Sara";
export interface ConversationEntry {
  id: number;
  speaker: 'User' | 'Ahmed' | 'Sara';
  message: string;
}

const MAX_HISTORY_PAIRS = 15;

const TENSES_LIST = [
    "Present Simple", "Present Continuous", "Present Perfect", "Present Perfect Continuous",
    "Past Simple", "Past Continuous", "Past Perfect", "Past Perfect Continuous",
    "Future Simple", "Future Continuous", "Future Perfect", "Future Perfect Continuous",
    "Zero Conditional", "First Conditional", "Second Conditional", "Third Conditional", "Mixed Conditionals",
    "Passive Voice (Present)", "Passive Voice (Past)", "Passive Voice (Future)"
];

export function TenseTeacherApp() {
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher>("Ahmed");
  const { toast } = useToast();

  const [conversationHistory, setConversationHistory] = useState<ConversationEntry[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [activeAudio, setActiveAudio] = useState<number | null>(null);
  
  const lastMessageRef = useRef<HTMLDivElement>(null);

  const ahmedForm = useForm<AhmedFormData>({
    resolver: zodResolver(ahmedSchema),
    defaultValues: { englishGrammarConcept: "" },
  });

  const saraForm = useForm<SaraFormData>({
    resolver: zodResolver(saraSchema),
    defaultValues: { englishGrammarConcept: "", userLanguageProficiency: "" },
  });

  const currentForm = selectedTeacher === 'Ahmed' ? ahmedForm : saraForm;
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, reset, getValues } = currentForm;

   useEffect(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.abort();
    }
    setConversationHistory([]);
    ahmedForm.reset({ englishGrammarConcept: "" });
    saraForm.reset({ englishGrammarConcept: "", userLanguageProficiency: "" });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTeacher]);


  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationHistory]);


  const handlePlayAudio = async (text: string, entryId: number) => {
      if (!text || isMuted || activeAudio === entryId) return;
      
      // Stop any currently playing audio
      if (audioRef.current) {
          audioRef.current.pause();
      }

      setActiveAudio(entryId);

      try {
        const result = await textToSpeech({ prompt: text, lang: 'ar' });
        if (result && result.media) {
            const audio = new Audio(result.media);
            audioRef.current = audio;

            audio.play().catch(e => {
                console.error("Audio playback error:", e);
                toast({ title: "Audio Playback Error", variant: "destructive" });
                setActiveAudio(null);
            });

            audio.onended = () => setActiveAudio(null);
            audio.onerror = () => {
                toast({ variant: "destructive", title: "Error playing audio." });
                setActiveAudio(null);
            }
        } else {
             toast({ variant: "destructive", title: "Failed to generate audio." });
             setActiveAudio(null);
        }
      } catch (error) {
          console.error("TTS Error:", error);
          toast({ variant: "destructive", title: "Error generating audio." });
          setActiveAudio(null);
      }
  };
  
  useEffect(() => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      console.warn("Speech Recognition API not supported.");
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'ar-SA';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        toast({ variant: "destructive", title: "خطأ في الإدخال الصوتي", description: "تعذر بدء التعرف." });
        setIsListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setValue("englishGrammarConcept", transcript, { shouldValidate: true });
    };

    recognitionRef.current = recognition;
  }, [setValue, toast]);

  // Cleanup effect to stop audio when component unmounts
  useEffect(() => {
    return () => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
    };
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };


  const onSubmit = async (data: AhmedFormData | SaraFormData) => {
    const userMessage = data.englishGrammarConcept;
    if (!userMessage) return;

    const newHistoryEntry: ConversationEntry = { id: Date.now(), speaker: 'User', message: userMessage };
    const currentHistory = [...conversationHistory, newHistoryEntry];
    setConversationHistory(currentHistory);
    reset({ ...getValues(), englishGrammarConcept: '' });

    try {
        let result;
        const historyForAI = currentHistory.map(({speaker, message}) => ({speaker, message}));

        if (selectedTeacher === 'Ahmed') {
            const input: AhmedVoiceCallInput = {
                englishGrammarConcept: userMessage,
                conversationHistory: historyForAI.length > 1 ? historyForAI.slice(0, -1) : [],
            };
            result = await ahmedVoiceCall(input);
        } else {
             const saraData = data as SaraFormData;
             const input: SaraVoiceCallInput = {
                englishGrammarConcept: userMessage,
                userLanguageProficiency: saraData.userLanguageProficiency || 'Intermediate',
                conversationHistory: historyForAI.length > 1 ? historyForAI.slice(0, -1) : [],
            };
            result = await saraVoiceCall(input);
        }

        const aiEntry: ConversationEntry = { id: Date.now() + 1, speaker: selectedTeacher, message: result.explanation };
        setConversationHistory(prev => [...prev, aiEntry].slice(- (MAX_HISTORY_PAIRS * 2)));

        if (!isMuted) {
            handlePlayAudio(result.explanation, aiEntry.id);
        }
    } catch (error) {
        console.error(`Error calling ${selectedTeacher}:`, error);
        toast({
            variant: "destructive",
            title: "فشل الاتصال",
            description: `تعذر الاتصال بـ ${selectedTeacher}. يرجى المحاولة مرة أخرى.`,
        });
        setConversationHistory(prev => prev.slice(0, -1));
    }
  };
  
  const handleTenseSelection = (tense: string) => {
    if(tense) {
        const prompt = `اشرح لي زمن ${tense}`;
        setValue('englishGrammarConcept', prompt);
    }
  };

  const teacherDetails = {
    Ahmed: {
      name: "أحمد",
      avatarSrc: "https://placehold.co/128x128/3498db/ffffff.png",
      avatarHint: "male teacher",
    },
    Sara: {
      name: "سارة",
      avatarSrc: "https://placehold.co/128x128/e91e63/ffffff.png",
      avatarHint: "female teacher",
    },
  };

  const currentTeacherInfo = teacherDetails[selectedTeacher];

  return (
    <div className="flex flex-col h-full bg-background text-foreground">
        
        <Card className="w-full h-full max-w-3xl mx-auto my-4 shadow-xl bg-card rounded-lg flex flex-col min-h-0">
            <CardHeader className="p-4 border-b shrink-0">
                <Tabs value={selectedTeacher} onValueChange={(value) => setSelectedTeacher(value as Teacher)} className="w-full">
                <TabsList className="grid w-full grid-cols-2 h-auto">
                    <TabsTrigger value="Ahmed" className="py-2 sm:py-3 text-sm sm:text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md rounded-md">
                    <User className="ms-2 h-4 w-4 sm:h-5 sm:w-5" /> أحمد
                    </TabsTrigger>
                    <TabsTrigger value="Sara" className="py-2 sm:py-3 text-sm sm:text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md rounded-md">
                    <User className="ms-2 h-4 w-4 sm:h-5 sm:w-5" /> سارة
                    </TabsTrigger>
                </TabsList>
                </Tabs>
                <div className="flex justify-between items-center mt-4">
                <CardTitle className="text-xl">محادثة مع {currentTeacherInfo.name}</CardTitle>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMuted(!isMuted)}
                    aria-label={isMuted ? "إلغاء كتم الصوت" : "كتم الصوت"}
                >
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>
                </div>
            </CardHeader>
            
            <div className="flex-grow min-h-0">
                <ScrollArea className="h-full">
                    <div className="p-4 space-y-4">
                        {conversationHistory.length > 0 ? (
                            conversationHistory.map((entry, index) => (
                                <div key={entry.id} className={`flex items-end gap-2 ${entry.speaker === 'User' ? 'justify-end' : 'justify-start'}`} ref={index === conversationHistory.length - 1 ? lastMessageRef : null}>
                                    {entry.speaker !== 'User' && <Avatar className="h-6 w-6"><AvatarImage src={currentTeacherInfo.avatarSrc} /><AvatarFallback>{entry.speaker.charAt(0)}</AvatarFallback></Avatar>}
                                    <div className={`rounded-lg px-3 py-2 max-w-[85%] flex items-center gap-2 ${entry.speaker === 'User' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                        <p className="text-sm whitespace-pre-wrap">{entry.message}</p>
                                        {entry.speaker !== 'User' && (
                                        <Button variant="ghost" size="icon" className="shrink-0 h-6 w-6 p-1 text-muted-foreground" onClick={() => handlePlayAudio(entry.message, entry.id)} disabled={activeAudio === entry.id}>
                                            {activeAudio === entry.id ? <Loader2 className="h-4 w-4 animate-spin"/> : <Volume2 className="h-4 w-4"/>}
                                        </Button>
                                        )}
                                    </div>
                                    {entry.speaker === 'User' && <Avatar className="h-6 w-6"><AvatarFallback>U</AvatarFallback></Avatar>}
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-center p-8">
                                <MessageCircle className="h-10 w-10 mb-2" />
                                <p>ابدأ المحادثة باختيار موضوع أو طرح سؤال أدناه.</p>
                            </div>
                        )}
                        {isSubmitting && (
                            <div className="flex items-start gap-2 justify-start">
                                <Avatar className="h-6 w-6"><AvatarImage src={currentTeacherInfo.avatarSrc} /><AvatarFallback>{selectedTeacher.charAt(0)}</AvatarFallback></Avatar>
                                <div className="rounded-lg px-3 py-2 bg-muted flex items-center">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </div>

            <div className="p-4 border-t shrink-0 bg-background/50">
                <form onSubmit={handleSubmit(onSubmit as SubmitHandler<any>)} className="space-y-3">
                {selectedTeacher === "Sara" && conversationHistory.length === 0 && (
                    <div>
                    <Label htmlFor="userLanguageProficiency" className="text-sm sm:text-md font-medium">مستوى إتقانك للغة الإنجليزية</Label>
                    <Input id="userLanguageProficiency" placeholder="مثال: مبتدئ، متوسط، متقدم" {...register("userLanguageProficiency")}
                        className={`mt-1 text-base bg-background focus:ring-2 focus:ring-primary ${errors.userLanguageProficiency ? 'border-destructive focus:ring-destructive' : 'border-border'}`}
                        disabled={isSubmitting} />
                    {errors.userLanguageProficiency && <p className="text-xs sm:text-sm text-destructive mt-1">{errors.userLanguageProficiency.message}</p>}
                    </div>
                )}
                <div>
                    <Label htmlFor="tense-select" className="text-sm sm:text-md font-medium">اختر زمناً ليبدأ الشرح</Label>
                    <Select onValueChange={handleTenseSelection} disabled={isSubmitting}>
                    <SelectTrigger id="tense-select" className="mt-1 text-base">
                        <SelectValue placeholder="اختر زمناً من القائمة..." />
                    </SelectTrigger>
                    <SelectContent>
                        {TENSES_LIST.map(tense => ( <SelectItem key={tense} value={tense}>{tense}</SelectItem> ))}
                    </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="englishGrammarConcept" className="text-sm sm:text-md font-medium">أو اطرح سؤالاً للمتابعة</Label>
                    <div className="flex gap-2 mt-1">
                    <Button type="button" size="icon" variant={isListening ? "destructive" : "outline"} onClick={toggleListening} className="h-auto px-3 shrink-0" disabled={isSubmitting}>
                        {isListening ? <Square className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                    </Button>
                    <Textarea id="englishGrammarConcept" placeholder="اكتب سؤال متابعة هنا أو استخدم الميكروفون..." {...register("englishGrammarConcept")}
                        className={`text-base bg-background focus:ring-2 focus:ring-primary ${errors.englishGrammarConcept ? 'border-destructive focus:ring-destructive' : 'border-border'}`}
                        rows={1} disabled={isSubmitting} />
                    <Button type="submit" size="icon" className="h-auto px-3 shrink-0" disabled={isSubmitting || !getValues('englishGrammarConcept')}>
                        {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin"/> : <Send className="h-5 w-5" />}
                    </Button>
                    </div>
                    {errors.englishGrammarConcept && <p className="text-xs sm:text-sm text-destructive mt-1">{errors.englishGrammarConcept.message}</p>}
                </div>
                </form>
            </div>
        </Card>
    </div>
  );
}

    
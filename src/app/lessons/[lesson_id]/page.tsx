
import type { Metadata } from 'next';
import { lessons } from '@/data/lingo-lessons-data';
import type { Lesson } from '@/types/lesson';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import LessonClientComponent from '@/components/lesson/LessonClientComponent';
import { translateText } from '@/ai/flows/translate-flow';
import { generateArabicExplanation } from '@/ai/flows/generate-lesson-content';

interface LessonPageProps {
  params: {
    lesson_id: string;
  };
}

export const dynamicParams = true;

export async function generateStaticParams() {
  return lessons.map((lesson) => ({
    lesson_id: lesson.lesson_id,
  }));
}

async function getLessonData(lessonId: string): Promise<Lesson | null> {
  const baseLessonData = lessons.find((l) => l.lesson_id === lessonId);
  if (!baseLessonData) return null;

  let lesson: Lesson = JSON.parse(JSON.stringify(baseLessonData)); // Deep copy

  // Use the generative model to create a rich Arabic explanation,
  // and the translation model for examples and notes.
  try {
    const [
      explanationResponse, // Generate explanation using the generative model
      translatedExamples,
      translatedNotes,
      translatedMistakes
    ] = await Promise.all([
      generateArabicExplanation({ grammarTopic: lesson.meta?.englishGrammarTopic || lesson.title, level: lesson.level }),
      Promise.all(lesson.examples.map(async (ex) => {
        const [translatedEnglish, translatedArabic] = await Promise.all([
          translateText({ text: ex.english, targetLanguage: 'ar', sourceLanguage: 'en' }),
          translateText({ text: ex.arabic, targetLanguage: 'ar', sourceLanguage: 'en' }) // Original 'arabic' field is also a placeholder
        ]);
        return {
          english: ex.english,
          arabic: translatedArabic.translation, // The primary translation we need
          imagePrompt: ex.imagePrompt
        };
      })),
      lesson.additional_notes ? translateText({ text: lesson.additional_notes, targetLanguage: 'ar', sourceLanguage: 'en' }) : Promise.resolve(null),
      lesson.common_mistakes ? translateText({ text: lesson.common_mistakes, targetLanguage: 'ar', sourceLanguage: 'en' }) : Promise.resolve(null)
    ]);
    
    // Assign the newly generated and translated content to the lesson object
    lesson.arabic_explanation = explanationResponse.arabicExplanation;
    lesson.examples = translatedExamples;
    lesson.additional_notes_arabic = translatedNotes?.translation;
    lesson.common_mistakes_arabic = translatedMistakes?.translation;

  } catch (error) {
    console.error("Failed to generate or translate lesson content:", lessonId, error);
    const topic = lesson.meta?.englishGrammarTopic || lesson.title;
    
    // Check if this is a build-time error (missing credentials)
    if (error instanceof Error && error.message.includes('Cloudflare AI credentials')) {
      // During build, use placeholder content
      lesson.arabic_explanation = `شرح مؤقت لموضوع "${topic}" للمستوى ${lesson.level}. سيتم تحديث هذا المحتوى عند تشغيل التطبيق.`;
      lesson.examples = lesson.examples.map(ex => ({
        ...ex,
        arabic: "مثال مؤقت - سيتم تحديثه عند التشغيل"
      }));
      lesson.additional_notes_arabic = "ملاحظات مؤقتة - ستتم تحديثها عند التشغيل";
      lesson.common_mistakes_arabic = "أخطاء شائعة مؤقتة - ستتم تحديثها عند التشغيل";
    } else {
      // Runtime error, use error message
      lesson.arabic_explanation = `عذرًا، لم نتمكن من تحميل الشرح التفصيلي لهذا الدرس (${topic}) في الوقت الحالي. يرجى المحاولة مرة أخرى لاحقًا.`;
      lesson.examples = [{ english: "Error loading examples.", arabic: "خطأ في تحميل الأمثلة." }];
      lesson.additional_notes_arabic = "عذرًا، لم نتمكن من تحميل الملاحظات الإضافية باللغة العربية حاليًا.";
      lesson.common_mistakes_arabic = "عذرًا، لم نتمكن من تحميل الأخطاء الشائعة باللغة العربية حاليًا.";
    }
  }
  
  return lesson;
}


export default async function LessonPage({ params }: LessonPageProps) {
  const lesson = await getLessonData(params.lesson_id);

  if (!lesson) {
    return (
      <div className="container mx-auto max-w-3xl py-8 px-4 text-center">
        <h1 className="text-3xl font-bold text-destructive">Lesson Not Found</h1>
        <p className="text-muted-foreground mb-6">Sorry, we couldn't find the lesson you were looking for.</p>
        <Button asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Lessons
          </Link>
        </Button>
      </div>
    );
  }

  return <LessonClientComponent lesson={lesson} />;
}

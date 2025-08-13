
"use client";

import type { Lesson } from '@/types/lesson';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import LessonDisplay from '@/components/lesson/LessonDisplay';

interface LessonClientComponentProps {
  lesson: Lesson;
}

export default function LessonClientComponent({ lesson }: LessonClientComponentProps) {
  return (
    <div className="container mx-auto max-w-3xl py-8 px-4">
      <div className="mb-6">
        <Button asChild variant="outline">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            All Lessons
          </Link>
        </Button>
      </div>
      <LessonDisplay lesson={lesson} />
    </div>
  );
}

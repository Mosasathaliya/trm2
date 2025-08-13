
"use client";

import type { Lesson } from '../../types/lesson';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';
import LessonDisplay from './LessonDisplay';

interface LessonClientComponentProps {
  lesson: Lesson;
}

export default function LessonClientComponent({ lesson }: LessonClientComponentProps) {
  return (
    <div className="container mx-auto max-w-3xl py-8 px-4">
      <div className="mb-6">
        <Button asChild variant="outline">
          <a href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            All Lessons
          </a>
        </Button>
      </div>
      <LessonDisplay lesson={lesson} />
    </div>
  );
}

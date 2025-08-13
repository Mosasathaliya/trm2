
"use client";

import type { FC } from 'react';
import type { LessonExample } from '@/types/lesson';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

interface LessonExamplesProps {
  examples: LessonExample[];
}

const LessonExamples: FC<LessonExamplesProps> = ({ examples }) => {
  if (!examples || examples.length === 0) {
    return null;
  }

  return (
    <Card className="mb-6 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Lightbulb className="mr-2 h-6 w-6 text-primary" />
          Examples (أمثلة)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
          {examples.map((example, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-lg hover:no-underline">
                Example {index + 1}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 p-2">
                  <p className="text-md">
                    <span className="font-semibold">English:</span> {example.english.split('*').map((part, i) => i % 2 === 1 ? <strong key={i} className="text-accent">{part}</strong> : part)}
                  </p>
                  <p className="text-md text-right" dir="rtl">
                    <span className="font-semibold ml-1">:عربي</span> {example.arabic.split('*').map((part, i) => i % 2 === 1 ? <strong key={i} className="text-accent">{part}</strong> : part)}
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default LessonExamples;

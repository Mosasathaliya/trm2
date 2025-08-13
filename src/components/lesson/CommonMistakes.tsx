
"use client";

import type { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface CommonMistakesProps {
  mistakes?: string;
  mistakesArabic?: string;
}

const CommonMistakes: FC<CommonMistakesProps> = ({ mistakes, mistakesArabic }) => {
  if (!mistakes && !mistakesArabic) {
    return null;
  }

  return (
    <Card className="mb-6 shadow-lg">
      <CardHeader>
        <CardTitle as="h3" className="flex items-center text-2xl">
          <AlertTriangle className="mr-2 h-6 w-6 text-destructive" />
          Common Mistakes (أخطاء شائعة)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
          <AccordionItem value="item-1">
             <AccordionTrigger className="text-lg hover:no-underline">Toggle Mistakes</AccordionTrigger>
            <AccordionContent>
              {mistakes && (
                <div className="mb-4">
                  <p className="text-md leading-relaxed whitespace-pre-line">{mistakes}</p>
                </div>
              )}
              {mistakesArabic && (
                <div>
                  <p className="text-md font-semibold text-destructive/90 mb-1">(بالعربية)</p>
                  <p className="text-md leading-relaxed whitespace-pre-line text-right" dir="rtl">
                    {mistakesArabic}
                  </p>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default CommonMistakes;

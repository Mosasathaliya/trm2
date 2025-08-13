
"use client";

import type { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StickyNote } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';


interface AdditionalNotesProps {
  notes?: string;
  notesArabic?: string;
}

const AdditionalNotes: FC<AdditionalNotesProps> = ({ notes, notesArabic }) => {
  if (!notes && !notesArabic) {
    return null;
  }

  return (
    <Card className="mb-6 shadow-lg border-primary/50">
      <CardHeader>
        <CardTitle as="h3" className="flex items-center text-2xl text-primary">
          <StickyNote className="mr-2 h-6 w-6" />
          Additional Notes (ملاحظات إضافية)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg hover:no-underline">Toggle Notes</AccordionTrigger>
            <AccordionContent>
              {notes && (
                <div className="mb-4">
                  <p className="text-md leading-relaxed whitespace-pre-line">{notes}</p>
                </div>
              )}
              {notesArabic && (
                <div>
                  <p className="text-md font-semibold text-primary/90 mb-1">(بالعربية)</p>
                  <p className="text-md leading-relaxed whitespace-pre-line text-right" dir="rtl">
                    {notesArabic}
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

export default AdditionalNotes;

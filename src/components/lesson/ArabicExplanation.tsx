
import type { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

interface ArabicExplanationProps {
  explanation: string;
}

const ArabicExplanation: FC<ArabicExplanationProps> = ({ explanation }) => {
  return (
    <Card className="mb-6 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <BookOpen className="mr-2 h-6 w-6 text-primary" />
          Explanation (الشرح)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg leading-relaxed whitespace-pre-line text-right" dir="rtl">
          {explanation}
        </p>
      </CardContent>
    </Card>
  );
};

export default ArabicExplanation;

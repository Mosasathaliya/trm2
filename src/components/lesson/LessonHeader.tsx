
import type { FC } from 'react';
import type { Lesson } from '@/types/lesson';
import { Badge } from '@/components/ui/badge';

interface LessonHeaderProps {
  title: Lesson['title'];
  topic: Lesson['topic'];
  level: Lesson['level'];
}

const LessonHeader: FC<LessonHeaderProps> = ({ title, topic, level }) => {
  return (
    <div className="mb-6">
      <h1 className="text-4xl font-bold text-primary mb-2">{title}</h1>
      <div className="flex items-center space-x-2">
        <Badge variant="secondary">{topic}</Badge>
        <Badge variant={level === 'Beginner' ? 'default' : level === 'Intermediate' ? 'outline' : 'destructive'} 
               className={
                 level === 'Beginner' ? 'bg-accent text-accent-foreground' : 
                 level === 'Intermediate' ? 'border-accent text-accent-foreground' : 
                 'bg-orange-500 text-white' // Custom for Advanced, if destructive theme is not orange
               }>
          {level}
        </Badge>
      </div>
    </div>
  );
};

export default LessonHeader;

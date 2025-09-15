import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MoodEntry } from '@/types/mood';
import { moodCategories } from '@/data/moodData';
import { format } from 'date-fns';
import { Calendar, Sparkles, StickyNote } from 'lucide-react';

interface MoodDisplayProps {
  currentMood: MoodEntry;
  className?: string;
}

const MoodDisplay = ({ currentMood, className = "" }: MoodDisplayProps) => {
  const moodData = moodCategories[currentMood.category];

  return (
    <Card className={`glass-card p-8 text-center relative overflow-hidden ${className}`}>
      {/* Animated background elements */}
      <div 
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20 animate-pulse"
        style={{ backgroundColor: `hsl(var(--${moodData.color}))` }}
      />
      <div 
        className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full opacity-10 animate-bounce"
        style={{ backgroundColor: `hsl(var(--${moodData.color}))` }}
      />

      <div className="relative z-10">
        {/* Main mood display */}
        <div className="mb-6">
          <div className="text-8xl mb-4 animate-bounce">{currentMood.emoji}</div>
          <h1 className="text-4xl font-bold mb-2 capitalize">{currentMood.mood}</h1>
          <Badge 
            className="text-white text-lg px-4 py-2 font-semibold"
            style={{ backgroundColor: `hsl(var(--${moodData.color}))` }}
          >
            {currentMood.category} vibe
          </Badge>
        </div>

        {/* Timestamp */}
        <div className="flex items-center justify-center gap-2 mb-4 text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{format(currentMood.timestamp, 'EEEE, MMMM do, yyyy')}</span>
          <span>at {format(currentMood.timestamp, 'h:mm a')}</span>
        </div>

        {/* Note if exists */}
        {currentMood.note && (
          <div className="mt-6 p-4 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <StickyNote className="w-4 h-4" />
              <span className="text-sm font-medium">Your note</span>
            </div>
            <p className="text-left italic">{currentMood.note}</p>
          </div>
        )}

        {/* Mood keywords preview */}
        <div className="mt-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Today's vibe words</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {moodData.keywords.slice(0, 3).map((keyword, index) => (
              <span
                key={keyword}
                className="px-3 py-1 rounded-full text-sm font-medium bg-white/10 text-white animate-in fade-in duration-300"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MoodDisplay;
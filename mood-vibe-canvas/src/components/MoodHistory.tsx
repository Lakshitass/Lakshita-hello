import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MoodEntry } from '@/types/mood';
import { moodCategories } from '@/data/moodData';
import { Calendar, Clock, Trash2, StickyNote } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';

interface MoodHistoryProps {
  entries: MoodEntry[];
  onDeleteEntry?: (id: string) => void;
  className?: string;
}

const MoodHistory = ({ entries, onDeleteEntry, className = "" }: MoodHistoryProps) => {
  if (entries.length === 0) {
    return (
      <Card className={`glass-card p-8 text-center ${className}`}>
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold mb-2">No vibes recorded yet</h3>
        <p className="text-muted-foreground">
          Start capturing your daily moods to see your journey here!
        </p>
      </Card>
    );
  }

  return (
    <Card className={`glass-card ${className}`}>
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          <h3 className="text-xl font-semibold">Your Vibe Journey</h3>
          <span className="ml-auto text-sm text-muted-foreground">
            {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
          </span>
        </div>
      </div>

      <ScrollArea className="h-80">
        <div className="p-6 space-y-4">
          {entries.map((entry) => {
            const moodData = moodCategories[entry.category];
            return (
              <div
                key={entry.id}
                className="flex items-start gap-4 p-4 rounded-lg glass-card hover:scale-[1.02] transition-all duration-300"
              >
                {/* Mood Emoji & Category */}
                <div className="flex-shrink-0 text-center">
                  <div className="text-2xl mb-1">{entry.emoji}</div>
                  <div
                    className="px-2 py-1 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: `hsl(var(--${moodData.color}))` }}
                  >
                    {entry.category}
                  </div>
                </div>

                {/* Entry Details */}
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold capitalize truncate">{entry.mood}</h4>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                      <Clock className="w-3 h-3" />
                      <span>{formatDistanceToNow(entry.timestamp, { addSuffix: true })}</span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground mb-2">
                    {format(entry.timestamp, 'PPp')}
                  </div>
                  
                  {entry.note && (
                    <div className="flex items-start gap-1 text-sm">
                      <StickyNote className="w-3 h-3 mt-0.5 flex-shrink-0" />
                      <p className="text-muted-foreground italic">{entry.note}</p>
                    </div>
                  )}
                </div>

                {/* Delete Button */}
                {onDeleteEntry && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteEntry(entry.id)}
                    className="opacity-60 hover:opacity-100 hover:text-red-400 transition-all duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default MoodHistory;
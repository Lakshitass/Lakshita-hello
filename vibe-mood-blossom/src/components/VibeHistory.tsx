import { MoodData } from '@/types/mood';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Trash2, Sparkles } from 'lucide-react';

interface VibeHistoryProps {
  vibes: MoodData[];
  onSelectVibe: (vibe: MoodData) => void;
  onDeleteVibe: (id: string) => void;
}

export const VibeHistory = ({ vibes, onSelectVibe, onDeleteVibe }: VibeHistoryProps) => {
  if (vibes.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-12 text-center max-w-2xl mx-auto">
        <div className="text-6xl mb-4 animate-pulse-soft">📚</div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Your Vibe Journey</h3>
        <p className="text-muted-foreground text-lg">
          Start capturing your vibes to build your personal mood journey.
        </p>
      </div>
    );
  }

  const sortedVibes = [...vibes].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const getRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="glass-card rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground flex items-center">
            <Calendar className="w-6 h-6 mr-3" />
            Your Vibe Journey
          </h2>
          <Badge variant="secondary" className="text-sm">
            {vibes.length} entr{vibes.length === 1 ? 'y' : 'ies'}
          </Badge>
        </div>

        <div className="space-y-4">
          {sortedVibes.map((vibe, index) => (
            <Card 
              key={vibe.id} 
              className="glass-card p-6 hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-[1.02] group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => onSelectVibe(vibe)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="text-3xl animate-float">{vibe.emoji}</div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-foreground">
                        {vibe.description || vibe.label}
                      </h3>
                      <Badge 
                        variant="secondary"
                        className={`text-xs px-2 py-1 bg-gradient-to-r ${
                          vibe.type === 'happy' ? 'from-yellow-400/20 to-orange-400/20 border-yellow-400/30' :
                          vibe.type === 'calm' ? 'from-blue-400/20 to-cyan-400/20 border-blue-400/30' :
                          vibe.type === 'energetic' ? 'from-red-400/20 to-pink-400/20 border-red-400/30' :
                          vibe.type === 'melancholy' ? 'from-purple-400/20 to-indigo-400/20 border-purple-400/30' :
                          vibe.type === 'excited' ? 'from-pink-400/20 to-purple-400/20 border-pink-400/30' :
                          'from-green-400/20 to-emerald-400/20 border-green-400/30'
                        }`}
                      >
                        {vibe.label}
                      </Badge>
                    </div>
                    
                    <div className="text-sm text-muted-foreground mb-2">
                      {vibe.timestamp.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                      <span className="mx-2">•</span>
                      {getRelativeTime(vibe.timestamp)}
                    </div>

                    {vibe.note && (
                      <p className="text-muted-foreground text-sm bg-secondary/30 rounded-lg p-3 mt-3">
                        {vibe.note}
                      </p>
                    )}
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteVibe(vibe.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 pt-6 border-t border-border/30">
          <p className="text-muted-foreground italic flex items-center justify-center">
            <Sparkles className="w-4 h-4 mr-2" />
            Every mood is valid • Every vibe is beautiful • Every day is a new journey
            <Sparkles className="w-4 h-4 ml-2" />
          </p>
        </div>
      </div>
    </div>
  );
};
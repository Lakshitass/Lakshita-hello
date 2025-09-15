import { Card } from '@/components/ui/card';
import { Quote, MusicSuggestion, MoodCategory } from '@/types/mood';
import { moodQuotes, musicSuggestions, moodCategories } from '@/data/moodData';
import { Music, Quote as QuoteIcon, Sparkles } from 'lucide-react';

interface QuoteCardProps {
  mood: MoodCategory;
  className?: string;
}

const QuoteCard = ({ mood, className = "" }: QuoteCardProps) => {
  // Get random quote and music for the mood
  const moodQuotesList = moodQuotes.filter(q => q.category === mood);
  const moodMusicList = musicSuggestions.filter(m => m.category === mood);
  
  const randomQuote = moodQuotesList[Math.floor(Math.random() * moodQuotesList.length)];
  const randomMusic = moodMusicList[Math.floor(Math.random() * moodMusicList.length)];
  
  const moodData = moodCategories[mood];

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Quote Card */}
      <Card className="glass-card p-6 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <QuoteIcon className="w-5 h-5" style={{ color: `hsl(var(--${moodData.color}))` }} />
            <h3 className="font-semibold">Your Vibe Quote</h3>
          </div>
          
          <blockquote className="text-lg italic leading-relaxed mb-3">
            "{randomQuote.text}"
          </blockquote>
          
          {randomQuote.author && (
            <cite className="text-sm text-muted-foreground">
              — {randomQuote.author}
            </cite>
          )}
        </div>
        
        {/* Animated background element */}
        <div 
          className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-20 animate-pulse"
          style={{ backgroundColor: `hsl(var(--${moodData.color}))` }}
        />
      </Card>

      {/* Music Suggestion Card */}
      <Card className="glass-card p-6 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Music className="w-5 h-5" style={{ color: `hsl(var(--${moodData.color}))` }} />
            <h3 className="font-semibold">Mood Music</h3>
          </div>
          
          <div className="space-y-2">
            <p className="font-medium">{randomMusic.title}</p>
            <p className="text-sm text-muted-foreground">by {randomMusic.artist}</p>
            <div className="flex items-center gap-2 text-xs">
              <span 
                className="px-2 py-1 rounded-full text-white font-medium"
                style={{ backgroundColor: `hsl(var(--${moodData.color}))` }}
              >
                {randomMusic.genre}
              </span>
              <span className="text-muted-foreground">Perfect for {mood} vibes</span>
            </div>
          </div>
        </div>
        
        {/* Animated background element */}
        <div 
          className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full opacity-20 animate-bounce"
          style={{ backgroundColor: `hsl(var(--${moodData.color}))` }}
        />
      </Card>

      {/* Mood Keywords Card */}
      <Card className="glass-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5" style={{ color: `hsl(var(--${moodData.color}))` }} />
          <h3 className="font-semibold">Vibe Keywords</h3>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {moodData.keywords.map((keyword, index) => (
            <span
              key={keyword}
              className="px-3 py-1 rounded-full text-sm font-medium text-white animate-in fade-in duration-300"
              style={{ 
                backgroundColor: `hsl(var(--${moodData.color}))`,
                animationDelay: `${index * 100}ms`
              }}
            >
              {keyword}
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default QuoteCard;
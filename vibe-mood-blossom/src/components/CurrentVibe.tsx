import { MoodData, MOOD_CONFIGS } from '@/types/mood';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Music, Sparkles, Hash } from 'lucide-react';

interface CurrentVibeProps {
  currentVibe: MoodData | null;
}

export const CurrentVibe = ({ currentVibe }: CurrentVibeProps) => {
  if (!currentVibe) {
    return (
      <div className="glass-card rounded-2xl p-12 text-center max-w-2xl mx-auto">
        <div className="text-6xl mb-4 animate-pulse-soft">📖</div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Your Journey Begins</h3>
        <p className="text-muted-foreground text-lg">
          Start capturing your vibes to see your mood journey unfold here.
        </p>
      </div>
    );
  }

  const config = MOOD_CONFIGS[currentVibe.type];
  const randomQuote = config.quotes[Math.floor(Math.random() * config.quotes.length)];
  const randomMusic = config.music[Math.floor(Math.random() * config.music.length)];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Main Vibe Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Mood Card */}
        <Card className="glass-card p-8 text-center">
          <div className="text-8xl mb-6 animate-float">{currentVibe.emoji}</div>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {currentVibe.description || currentVibe.label}
          </h2>
          <Badge 
            variant="secondary" 
            className={`text-lg px-4 py-2 bg-gradient-to-r ${
              currentVibe.type === 'happy' ? 'from-yellow-500 to-orange-500 text-black' :
              currentVibe.type === 'calm' ? 'from-blue-500 to-cyan-500 text-white' :
              currentVibe.type === 'energetic' ? 'from-red-500 to-pink-500 text-white' :
              currentVibe.type === 'melancholy' ? 'from-purple-500 to-indigo-500 text-white' :
              currentVibe.type === 'excited' ? 'from-pink-500 to-purple-500 text-white' :
              'from-green-500 to-emerald-500 text-white'
            }`}
          >
            {currentVibe.label} vibe
          </Badge>
          
          <div className="flex items-center justify-center text-sm text-muted-foreground mt-6">
            <Calendar className="w-4 h-4 mr-2" />
            {currentVibe.timestamp.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>

          {currentVibe.note && (
            <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
              <h4 className="font-semibold text-foreground mb-2 flex items-center">
                <Sparkles className="w-4 h-4 mr-2" />
                Today's vibe words
              </h4>
              <p className="text-muted-foreground">{currentVibe.note}</p>
            </div>
          )}
        </Card>

        {/* Quote and Music */}
        <div className="space-y-6">
          {/* Quote Card */}
          <Card className="glass-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-purple-400" />
              Your Vibe Quote
            </h3>
            <blockquote className="text-foreground/90 italic text-lg mb-3">
              "{randomQuote.split(' — ')[0]}"
            </blockquote>
            <p className="text-muted-foreground text-sm">
              — {randomQuote.split(' — ')[1]}
            </p>
          </Card>

          {/* Music Card */}
          <Card className="glass-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Music className="w-5 h-5 mr-2 text-blue-400" />
              Mood Music
            </h3>
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">{randomMusic.title}</h4>
              <p className="text-sm text-muted-foreground">by {randomMusic.artist}</p>
              <Badge variant="outline" className="text-xs">
                {randomMusic.genre}
              </Badge>
              <p className="text-sm text-muted-foreground mt-2">{randomMusic.description}</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Keywords */}
      <Card className="glass-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Hash className="w-5 h-5 mr-2 text-green-400" />
          Vibe Keywords
        </h3>
        <div className="flex flex-wrap gap-2">
          {config.keywords.map((keyword, index) => (
            <Badge 
              key={index} 
              variant="secondary"
              className={`animate-fade-in bg-gradient-to-r ${
                currentVibe.type === 'happy' ? 'from-yellow-400/20 to-orange-400/20 border-yellow-400/30' :
                currentVibe.type === 'calm' ? 'from-blue-400/20 to-cyan-400/20 border-blue-400/30' :
                currentVibe.type === 'energetic' ? 'from-red-400/20 to-pink-400/20 border-red-400/30' :
                currentVibe.type === 'melancholy' ? 'from-purple-400/20 to-indigo-400/20 border-purple-400/30' :
                currentVibe.type === 'excited' ? 'from-pink-400/20 to-purple-400/20 border-pink-400/30' :
                'from-green-400/20 to-emerald-400/20 border-green-400/30'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {keyword}
            </Badge>
          ))}
        </div>
      </Card>
    </div>
  );
};
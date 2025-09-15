import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MoodEntry, MoodCategory } from '@/types/mood';
import { useMoodStorage } from '@/hooks/useMoodStorage';
import { useToast } from '@/hooks/use-toast';
import AnimatedBackground from '@/components/AnimatedBackground';
import MoodInput from '@/components/MoodInput';
import MoodDisplay from '@/components/MoodDisplay';
import QuoteCard from '@/components/QuoteCard';
import MoodHistory from '@/components/MoodHistory';
import { Sparkles, Calendar, Plus } from 'lucide-react';

const Index = () => {
  const [currentMood, setCurrentMood] = useState<MoodEntry | null>(null);
  const [activeTab, setActiveTab] = useState('mood');
  const { entries, addEntry, deleteEntry, getTodaysEntry } = useMoodStorage();
  const { toast } = useToast();

  // Check for most recent mood on mount
  useEffect(() => {
    if (entries.length > 0) {
      setCurrentMood(entries[0]); // Most recent entry is first
      if (activeTab === 'mood') {
        setActiveTab('current');
      }
    }
  }, [entries, activeTab]);

  const handleMoodSubmit = (mood: string, category: MoodCategory, emoji: string, note?: string) => {
    const newEntry = addEntry({ mood, category, emoji, note });
    setCurrentMood(newEntry);
    setActiveTab('current');

    toast({
      title: "Vibe captured! ✨",
      description: `Your ${category} mood has been added to your journey. Feel free to update your vibe anytime!`,
    });
  };

  const handleDeleteEntry = (id: string) => {
    deleteEntry(id);
    
    // If deleted entry was current mood, set to next most recent or null
    if (currentMood?.id === id) {
      const remainingEntries = entries.filter(entry => entry.id !== id);
      setCurrentMood(remainingEntries.length > 0 ? remainingEntries[0] : null);
      if (remainingEntries.length === 0) {
        setActiveTab('mood');
      }
    }

    toast({
      title: "Entry deleted",
      description: "Your mood entry has been removed from your journal.",
    });
  };

  const backgroundMood = currentMood?.category || 'peaceful';

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground mood={backgroundMood} />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            My MoodVibe Journal
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Capture your daily vibes, watch them come alive with colors and animations, 
            and discover quotes and music that match your mood.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 glass-card border-white/20 mb-8">
              <TabsTrigger value="mood" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                {currentMood ? 'Update Vibe' : 'Capture Vibe'}
              </TabsTrigger>
              <TabsTrigger value="current" disabled={!currentMood} className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Current Vibe
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Vibe History ({entries.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="mood" className="space-y-8">
              <MoodInput onMoodSubmit={handleMoodSubmit} />
              
              {/* Welcome message if no mood today */}
              {!currentMood && (
                <Card className="glass-card p-8 text-center">
                  <div className="text-6xl mb-4">🌟</div>
                  <h2 className="text-2xl font-bold mb-2">Welcome to your Vibe Journey!</h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Start by capturing how you're feeling right now. Watch as your mood transforms 
                    the entire experience with beautiful colors, animations, and personalized content.
                  </p>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="current" className="space-y-8">
              {currentMood ? (
                <div className="grid lg:grid-cols-2 gap-8">
                  <MoodDisplay currentMood={currentMood} />
                  <QuoteCard mood={currentMood.category} />
                </div>
              ) : (
                <Card className="glass-card p-8 text-center">
                  <div className="text-6xl mb-4">🤔</div>
                  <h3 className="text-xl font-semibold mb-2">No vibe captured today</h3>
                  <p className="text-muted-foreground mb-4">
                    Start your day by capturing your current mood!
                  </p>
                  <Button onClick={() => setActiveTab('mood')}>
                    Capture Your Vibe
                  </Button>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="history">
              <MoodHistory 
                entries={entries} 
                onDeleteEntry={handleDeleteEntry}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 text-white/60">
          <p>✨ Every mood is valid • Every vibe is beautiful • Every day is a new journey ✨</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;

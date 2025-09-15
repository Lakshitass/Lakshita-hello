import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { moodCategories } from '@/data/moodData';
import { MoodCategory } from '@/types/mood';

interface MoodInputProps {
  onMoodSubmit: (mood: string, category: MoodCategory, emoji: string, note?: string) => void;
  isLoading?: boolean;
}

const MoodInput = ({ onMoodSubmit, isLoading = false }: MoodInputProps) => {
  const [selectedCategory, setSelectedCategory] = useState<MoodCategory | null>(null);
  const [customMood, setCustomMood] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = () => {
    if (!selectedCategory) return;
    
    const mood = customMood.trim() || moodCategories[selectedCategory].keywords[0];
    const emoji = moodCategories[selectedCategory].emoji;
    
    onMoodSubmit(mood, selectedCategory, emoji, note.trim() || undefined);
    
    // Reset form
    setSelectedCategory(null);
    setCustomMood('');
    setNote('');
  };

  return (
    <Card className="glass-card p-8 max-w-2xl mx-auto">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">How are you feeling?</h2>
          <p className="text-muted-foreground">Choose your vibe and let the magic begin • Update anytime!</p>
        </div>

        {/* Mood Category Selection */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Object.values(moodCategories).map((mood) => (
            <Button
              key={mood.category}
              variant={selectedCategory === mood.category ? "default" : "outline"}
              className={`h-20 flex-col gap-2 transition-all duration-300 ${
                selectedCategory === mood.category 
                  ? 'pulse-glow' 
                  : 'hover:scale-105'
              }`}
              onClick={() => setSelectedCategory(mood.category)}
              style={{
                backgroundColor: selectedCategory === mood.category 
                  ? `hsl(var(--${mood.color}))` 
                  : undefined
              }}
            >
              <span className="text-2xl">{mood.emoji}</span>
              <span className="text-sm font-medium capitalize">{mood.category}</span>
            </Button>
          ))}
        </div>

        {/* Custom Mood Input */}
        {selectedCategory && (
          <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-300">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Describe your {selectedCategory} mood (optional)
              </label>
              <Input
                placeholder={`e.g., ${moodCategories[selectedCategory].keywords.slice(0, 2).join(', ')}`}
                value={customMood}
                onChange={(e) => setCustomMood(e.target.value)}
                className="glass-card border-white/20"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Add a note (optional)
              </label>
              <Input
                placeholder="What's on your mind?"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="glass-card border-white/20"
              />
            </div>

            <Button 
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full h-12 text-lg font-semibold"
              style={{
                backgroundColor: `hsl(var(--${moodCategories[selectedCategory].color}))`,
                color: 'white'
              }}
            >
              {isLoading ? 'Capturing your vibe...' : '✨ Capture This Vibe'}
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MoodInput;
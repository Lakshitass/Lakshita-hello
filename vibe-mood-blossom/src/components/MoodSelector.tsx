import { useState } from 'react';
import { MoodType, MOOD_CONFIGS, MoodData } from '@/types/mood';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface MoodSelectorProps {
  onCapture: (mood: MoodData) => void;
}

export const MoodSelector = ({ onCapture }: MoodSelectorProps) => {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [customMoodLabel, setCustomMoodLabel] = useState('');
  const [description, setDescription] = useState('');
  const [note, setNote] = useState('');
  const { toast } = useToast();

  const moods: MoodType[] = ['happy', 'calm', 'energetic', 'melancholy', 'excited', 'peaceful', 'sad', 'anxious', 'tired'];

  const playSound = () => {
    // Simple notification sound
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.3);
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
    setCustomMoodLabel('');
    setDescription('');
    setNote('');
    playSound();
  };

  const handleCustomMoodSelect = () => {
    setSelectedMood('custom');
    setDescription('');
    setNote('');
    playSound();
  };

  const handleCapture = () => {
    if (!selectedMood) {
      toast({
        title: 'Select a mood',
        description: 'Please choose how you\'re feeling first.',
        variant: 'destructive'
      });
      return;
    }

    if (selectedMood === 'custom' && !customMoodLabel.trim()) {
      toast({
        title: 'Describe your custom mood',
        description: 'Please enter a word to describe your mood.',
        variant: 'destructive'
      });
      return;
    }

    const config = MOOD_CONFIGS[selectedMood];
    const moodData: MoodData = {
      id: Date.now().toString(),
      type: selectedMood,
      emoji: selectedMood === 'custom' ? '✨' : config.emoji,
      label: selectedMood === 'custom' ? customMoodLabel.trim() : config.label,
      description: description.trim() || undefined,
      note: note.trim() || undefined,
      timestamp: new Date(),
      keywords: selectedMood === 'custom' ? [customMoodLabel.trim().toLowerCase()] : config.keywords
    };

    onCapture(moodData);
    
    // Reset form
    setSelectedMood(null);
    setCustomMoodLabel('');
    setDescription('');
    setNote('');

    playSound();
    toast({
      title: 'Vibe captured! ✨',
      description: `Your ${selectedMood === 'custom' ? customMoodLabel.toLowerCase() : config.label.toLowerCase()} mood has been saved.`,
    });
  };

  const selectedConfig = selectedMood ? MOOD_CONFIGS[selectedMood] : null;

  return (
    <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">How are you feeling?</h2>
        <p className="text-muted-foreground text-lg">
          Choose your vibe and let the magic begin • Update anytime!
        </p>
      </div>

      {/* Mood Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {moods.map((mood) => {
          const config = MOOD_CONFIGS[mood];
          const isSelected = selectedMood === mood;
          
          return (
            <button
              key={mood}
              onClick={() => handleMoodSelect(mood)}
              className={`mood-button mood-button-${mood} ${isSelected ? 'selected' : ''}`}
            >
              <div className="text-3xl mb-2 animate-float">{config.emoji}</div>
              <div className="font-semibold">{config.label}</div>
            </button>
          );
        })}
      </div>

      {/* Custom Mood Option */}
      <div className="mb-8">
        <button
          onClick={handleCustomMoodSelect}
          className={`mood-button mood-button-custom ${selectedMood === 'custom' ? 'selected' : ''} w-full`}
        >
          <div className="text-3xl mb-2 animate-float">✨</div>
          <div className="font-semibold">Custom Mood</div>
          <div className="text-sm opacity-80 mt-1">Describe your unique feeling</div>
        </button>
      </div>

      {/* Custom Mood Input */}
      {selectedMood === 'custom' && (
        <div className="mb-6 animate-fade-in">
          <label className="block text-sm font-medium text-foreground mb-2">
            Describe your mood in one word
          </label>
          <Input
            value={customMoodLabel}
            onChange={(e) => setCustomMoodLabel(e.target.value)}
            placeholder="e.g., inspired, nostalgic, determined..."
            className="input-field"
            maxLength={20}
          />
        </div>
      )}

      {/* Additional Fields */}
      {selectedMood && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Describe your {selectedConfig?.label.toLowerCase()} mood (optional)
            </label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={`e.g., ${selectedMood === 'happy' ? 'joyful, cheerful' : selectedMood === 'calm' ? 'peaceful, serene' : selectedMood === 'energetic' ? 'dynamic, vibrant' : selectedMood === 'melancholy' ? 'contemplative, pensive' : selectedMood === 'excited' ? 'thrilled, enthusiastic' : selectedMood === 'peaceful' ? 'harmonious, balanced' : selectedMood === 'sad' ? 'sorrowful, tearful' : selectedMood === 'anxious' ? 'worried, nervous' : selectedMood === 'tired' ? 'exhausted, weary' : 'unique, personal'}`}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Add a note (optional)
            </label>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What's on your mind?"
              className="input-field min-h-[100px] resize-none"
            />
          </div>

          <Button
            onClick={handleCapture}
            className={`capture-button capture-button-${selectedMood} animate-glow`}
          >
            ✨ Capture This Vibe
          </Button>
        </div>
      )}
    </div>
  );
};
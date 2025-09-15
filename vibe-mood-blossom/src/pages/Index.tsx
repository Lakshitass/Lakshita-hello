import { useState, useEffect } from 'react';
import { MoodData } from '@/types/mood';
import { MoodSelector } from '@/components/MoodSelector';
import { CurrentVibe } from '@/components/CurrentVibe';
import { VibeHistory } from '@/components/VibeHistory';
import { useToast } from '@/hooks/use-toast';

type TabType = 'capture' | 'current' | 'history';

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>('capture');
  const [vibes, setVibes] = useState<MoodData[]>([]);
  const [currentVibe, setCurrentVibe] = useState<MoodData | null>(null);
  const { toast } = useToast();

  // Update body data-mood attribute when current vibe changes
  useEffect(() => {
    if (currentVibe) {
      document.body.setAttribute('data-mood', currentVibe.type);
    } else {
      document.body.removeAttribute('data-mood');
    }
  }, [currentVibe]);

  // Load vibes from localStorage on component mount
  useEffect(() => {
    const savedVibes = localStorage.getItem('moodvibe-journal');
    if (savedVibes) {
      try {
        const parsedVibes = JSON.parse(savedVibes).map((vibe: any) => ({
          ...vibe,
          timestamp: new Date(vibe.timestamp)
        }));
        setVibes(parsedVibes);
        
        // Set the most recent vibe as current
        if (parsedVibes.length > 0) {
          const mostRecent = parsedVibes.sort((a: MoodData, b: MoodData) => 
            b.timestamp.getTime() - a.timestamp.getTime()
          )[0];
          setCurrentVibe(mostRecent);
        }
      } catch (error) {
        console.error('Error loading vibes from localStorage:', error);
      }
    }
  }, []);

  // Save vibes to localStorage whenever vibes change
  useEffect(() => {
    localStorage.setItem('moodvibe-journal', JSON.stringify(vibes));
  }, [vibes]);

  const handleCapture = (mood: MoodData) => {
    setVibes(prev => [mood, ...prev]);
    setCurrentVibe(mood);
    setActiveTab('current');
  };

  const handleSelectVibe = (vibe: MoodData) => {
    setCurrentVibe(vibe);
    setActiveTab('current');
  };

  const handleDeleteVibe = (id: string) => {
    setVibes(prev => prev.filter(vibe => vibe.id !== id));
    
    // If deleted vibe was the current one, set a new current vibe
    if (currentVibe?.id === id) {
      const remainingVibes = vibes.filter(vibe => vibe.id !== id);
      if (remainingVibes.length > 0) {
        const mostRecent = remainingVibes.sort((a, b) => 
          b.timestamp.getTime() - a.timestamp.getTime()
        )[0];
        setCurrentVibe(mostRecent);
      } else {
        setCurrentVibe(null);
      }
    }

    toast({
      title: 'Vibe deleted',
      description: 'The mood entry has been removed from your journal.',
    });
  };

  return (
    <div className="min-h-screen py-8 px-4 relative overflow-auto">
      {/* Floating particles for extra visual appeal */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-3 h-3 bg-white/20 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-40 right-20 w-2 h-2 bg-purple-400/30 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-80 left-1/4 w-4 h-4 bg-blue-400/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-10 w-3 h-3 bg-pink-400/25 rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 animate-glow">
            My MoodVibe Journal
          </h1>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Capture your daily vibes, watch them come alive with colors and animations,
            and discover quotes and music that match your mood.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="tab-nav max-w-2xl mx-auto mb-8">
          <button
            onClick={() => setActiveTab('capture')}
            className={`tab-button ${activeTab === 'capture' ? 'active' : ''}`}
          >
            <span className="mr-2">+</span>
            Capture Vibe
          </button>
          <button
            onClick={() => setActiveTab('current')}
            className={`tab-button ${activeTab === 'current' ? 'active' : ''}`}
          >
            <span className="mr-2">✨</span>
            Current Vibe
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
          >
            <span className="mr-2">📅</span>
            Vibe History ({vibes.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {activeTab === 'capture' && (
            <MoodSelector onCapture={handleCapture} />
          )}
          
          {activeTab === 'current' && (
            <CurrentVibe currentVibe={currentVibe} />
          )}
          
          {activeTab === 'history' && (
            <VibeHistory 
              vibes={vibes}
              onSelectVibe={handleSelectVibe}
              onDeleteVibe={handleDeleteVibe}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
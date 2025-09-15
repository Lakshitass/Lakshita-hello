import { useEffect, useState } from 'react';
import { MoodCategory } from '@/types/mood';
import { moodCategories } from '@/data/moodData';

interface AnimatedBackgroundProps {
  mood: MoodCategory;
  className?: string;
}

const AnimatedBackground = ({ mood, className = "" }: AnimatedBackgroundProps) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    // Generate floating particles
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 6
    }));
    setParticles(newParticles);
  }, [mood]);

  const moodData = moodCategories[mood];

  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden ${className}`}>
      {/* Main gradient background */}
      <div 
        className="absolute inset-0 mood-background"
        style={{
          background: moodData.gradient,
          backgroundSize: '400% 400%'
        }}
      />
      
      {/* Floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full bg-white/20 floating-element"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}
      
      {/* Mood-specific decorative elements */}
      <div className="absolute inset-0 opacity-10">
        {mood === 'happy' && (
          <div className="absolute top-20 left-20 text-6xl animate-bounce">☀️</div>
        )}
        {mood === 'calm' && (
          <div className="absolute top-32 right-32 text-4xl animate-pulse">🌊</div>
        )}
        {mood === 'energetic' && (
          <div className="absolute bottom-20 left-32 text-5xl animate-spin">⚡</div>
        )}
        {mood === 'peaceful' && (
          <div className="absolute top-40 left-1/3 text-4xl animate-pulse">🍃</div>
        )}
        {mood === 'excited' && (
          <div className="absolute top-20 right-20 text-5xl sparkle">✨</div>
        )}
        {mood === 'melancholy' && (
          <div className="absolute bottom-32 right-20 text-4xl animate-pulse">🌙</div>
        )}
      </div>
      
      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/5" />
    </div>
  );
};

export default AnimatedBackground;
import { MoodData, Quote, MusicSuggestion } from '@/types/mood';

export const moodCategories: Record<string, MoodData> = {
  happy: {
    category: 'happy',
    emoji: '😊',
    color: 'happy-primary',
    gradient: 'var(--gradient-happy)',
    keywords: ['joyful', 'cheerful', 'bright', 'optimistic', 'uplifted', 'delighted']
  },
  calm: {
    category: 'calm',
    emoji: '😌',
    color: 'calm-primary',
    gradient: 'var(--gradient-calm)',
    keywords: ['peaceful', 'serene', 'tranquil', 'relaxed', 'centered', 'zen']
  },
  energetic: {
    category: 'energetic',
    emoji: '⚡',
    color: 'energetic-primary',
    gradient: 'var(--gradient-energetic)',
    keywords: ['dynamic', 'vibrant', 'powerful', 'motivated', 'pumped', 'electric']
  },
  melancholy: {
    category: 'melancholy',
    emoji: '💭',
    color: 'melancholy-primary',
    gradient: 'var(--gradient-melancholy)',
    keywords: ['contemplative', 'pensive', 'reflective', 'nostalgic', 'wistful', 'introspective']
  },
  excited: {
    category: 'excited',
    emoji: '🎉',
    color: 'excited-primary',
    gradient: 'var(--gradient-excited)',
    keywords: ['thrilled', 'enthusiastic', 'elated', 'exhilarated', 'animated', 'ecstatic']
  },
  peaceful: {
    category: 'peaceful',
    emoji: '🌿',
    color: 'peaceful-primary',
    gradient: 'var(--gradient-peaceful)',
    keywords: ['harmonious', 'balanced', 'grounded', 'still', 'mindful', 'content']
  }
};

export const moodQuotes: Quote[] = [
  // Happy quotes
  { text: "Happiness is not something readymade. It comes from your own actions.", author: "Dalai Lama", category: "happy" },
  { text: "The sun is a daily reminder that we too can rise again from the darkness.", category: "happy" },
  { text: "Joy is the simplest form of gratitude.", author: "Karl Barth", category: "happy" },
  
  // Calm quotes
  { text: "In the midst of movement and chaos, keep stillness inside of you.", author: "Deepak Chopra", category: "calm" },
  { text: "Peace comes from within. Do not seek it without.", author: "Buddha", category: "calm" },
  { text: "Breathe in peace, breathe out stress.", category: "calm" },
  
  // Energetic quotes
  { text: "Energy and persistence conquer all things.", author: "Benjamin Franklin", category: "energetic" },
  { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde", category: "energetic" },
  { text: "Life is 10% what happens to you and 90% how you react to it.", category: "energetic" },
  
  // Melancholy quotes
  { text: "The cure for anything is salt water: sweat, tears or the sea.", author: "Isak Dinesen", category: "melancholy" },
  { text: "Sometimes you need to sit lonely on the floor in a quiet room in order to hear your own voice.", category: "melancholy" },
  { text: "Rain makes corn, corn makes whiskey.", category: "melancholy" },
  
  // Excited quotes
  { text: "Today is the first day of the rest of your life.", category: "excited" },
  { text: "Dream big and dare to fail.", author: "Norman Vaughan", category: "excited" },
  { text: "Life is either a daring adventure or nothing at all.", author: "Helen Keller", category: "excited" },
  
  // Peaceful quotes
  { text: "Adopt the pace of nature: her secret is patience.", author: "Ralph Waldo Emerson", category: "peaceful" },
  { text: "The present moment is the only time over which we have dominion.", author: "Thich Nhat Hanh", category: "peaceful" },
  { text: "In every walk with nature, one receives far more than they seek.", author: "John Muir", category: "peaceful" }
];

export const musicSuggestions: MusicSuggestion[] = [
  // Happy music
  { title: "Good Vibes", artist: "Various Artists", genre: "Pop", category: "happy" },
  { title: "Sunny Day", artist: "Indie Collective", genre: "Indie Pop", category: "happy" },
  { title: "Feel Good Hits", artist: "Compilation", genre: "Feel Good", category: "happy" },
  
  // Calm music
  { title: "Ambient Meditation", artist: "Nature Sounds", genre: "Ambient", category: "calm" },
  { title: "Ocean Waves", artist: "Relaxation Masters", genre: "Nature", category: "calm" },
  { title: "Gentle Piano", artist: "Classical Mix", genre: "Classical", category: "calm" },
  
  // Energetic music
  { title: "Workout Beats", artist: "Electronic Mix", genre: "Electronic", category: "energetic" },
  { title: "Rock Anthems", artist: "Classic Rock", genre: "Rock", category: "energetic" },
  { title: "Dance Floor", artist: "DJ Mix", genre: "Dance", category: "energetic" },
  
  // Melancholy music
  { title: "Rainy Day Blues", artist: "Jazz Ensemble", genre: "Jazz", category: "melancholy" },
  { title: "Indie Folk Sessions", artist: "Folk Artists", genre: "Folk", category: "melancholy" },
  { title: "Contemplative Piano", artist: "Solo Piano", genre: "Classical", category: "melancholy" },
  
  // Excited music
  { title: "Party Hits", artist: "Dance Mix", genre: "Pop", category: "excited" },
  { title: "Celebration Songs", artist: "Various Artists", genre: "Pop Rock", category: "excited" },
  { title: "High Energy", artist: "Electronic", genre: "EDM", category: "excited" },
  
  // Peaceful music
  { title: "Forest Sounds", artist: "Nature Collection", genre: "Ambient", category: "peaceful" },
  { title: "Meditation Bells", artist: "Spiritual Music", genre: "World", category: "peaceful" },
  { title: "Acoustic Garden", artist: "Guitar Relaxation", genre: "Acoustic", category: "peaceful" }
];
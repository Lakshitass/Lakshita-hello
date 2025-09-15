export interface MoodEntry {
  id: string;
  mood: string;
  emoji: string;
  category: MoodCategory;
  timestamp: Date;
  note?: string;
}

export type MoodCategory = 'happy' | 'calm' | 'energetic' | 'melancholy' | 'excited' | 'peaceful';

export interface MoodData {
  category: MoodCategory;
  emoji: string;
  color: string;
  gradient: string;
  keywords: string[];
}

export interface Quote {
  text: string;
  author?: string;
  category: MoodCategory;
}

export interface MusicSuggestion {
  title: string;
  artist: string;
  genre: string;
  category: MoodCategory;
  url?: string;
}
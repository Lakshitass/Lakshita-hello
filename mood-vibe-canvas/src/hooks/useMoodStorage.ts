import { useState, useEffect } from 'react';
import { MoodEntry } from '@/types/mood';

const STORAGE_KEY = 'mood_vibe_entries';

export const useMoodStorage = () => {
  const [entries, setEntries] = useState<MoodEntry[]>([]);

  // Load entries from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert timestamp strings back to Date objects
        const entriesWithDates = parsed.map((entry: any) => ({
          ...entry,
          timestamp: new Date(entry.timestamp)
        }));
        setEntries(entriesWithDates);
      }
    } catch (error) {
      console.error('Failed to load mood entries:', error);
    }
  }, []);

  // Save entries to localStorage whenever entries change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch (error) {
      console.error('Failed to save mood entries:', error);
    }
  }, [entries]);

  const addEntry = (entry: Omit<MoodEntry, 'id' | 'timestamp'>) => {
    const newEntry: MoodEntry = {
      ...entry,
      id: crypto.randomUUID(),
      timestamp: new Date()
    };
    setEntries(prev => [newEntry, ...prev]);
    return newEntry;
  };

  const deleteEntry = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const getRecentEntries = (days: number = 7): MoodEntry[] => {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    return entries.filter(entry => entry.timestamp >= cutoff);
  };

  const getTodaysEntry = (): MoodEntry | undefined => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return entries.find(entry => {
      const entryDate = new Date(entry.timestamp);
      entryDate.setHours(0, 0, 0, 0);
      return entryDate.getTime() === today.getTime();
    });
  };

  return {
    entries,
    addEntry,
    deleteEntry,
    getRecentEntries,
    getTodaysEntry
  };
};
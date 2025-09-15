export type MoodType = 'happy' | 'calm' | 'energetic' | 'melancholy' | 'excited' | 'peaceful' | 'sad' | 'anxious' | 'tired' | 'custom';

export interface MoodData {
  id: string;
  type: MoodType;
  emoji: string;
  label: string;
  description?: string;
  note?: string;
  timestamp: Date;
  keywords: string[];
}

export interface MoodConfig {
  emoji: string;
  label: string;
  quotes: string[];
  music: Array<{
    title: string;
    artist: string;
    genre: string;
    description: string;
  }>;
  keywords: string[];
}

export const MOOD_CONFIGS: Record<MoodType, MoodConfig> = {
  happy: {
    emoji: '😊',
    label: 'Happy',
    quotes: [
      'Happiness is not something ready made. It comes from your own actions. — Dalai Lama',
      'The most important thing is to enjoy your life—to be happy—it\'s all that matters. — Audrey Hepburn',
      'Happiness is when what you think, what you say, and what you do are in harmony. — Mahatma Gandhi'
    ],
    music: [
      { title: 'Good Vibes', artist: 'Chill Mix', genre: 'Pop', description: 'Perfect for happy moments' },
      { title: 'Sunny Days', artist: 'Feel Good', genre: 'Indie', description: 'Uplifting and bright' }
    ],
    keywords: ['joyful', 'content', 'cheerful', 'bright', 'positive', 'optimistic']
  },
  calm: {
    emoji: '😌',
    label: 'Calm',
    quotes: [
      'Peace comes from within. Do not seek it without. — Buddha',
      'Calm mind brings inner strength and self-confidence. — Dalai Lama',
      'In the midst of movement and chaos, keep stillness inside of you. — Deepak Chopra'
    ],
    music: [
      { title: 'Peaceful Moments', artist: 'Ambient Collective', genre: 'Ambient', description: 'Soothing and tranquil' },
      { title: 'Zen Garden', artist: 'Meditation Music', genre: 'New Age', description: 'Perfect for relaxation' }
    ],
    keywords: ['serene', 'peaceful', 'tranquil', 'balanced', 'centered', 'mindful']
  },
  energetic: {
    emoji: '⚡',
    label: 'Energetic',
    quotes: [
      'Energy and persistence conquer all things. — Benjamin Franklin',
      'The energy of the mind is the essence of life. — Aristotle',
      'Be yourself and you\'ll be unstoppable. — Anonymous'
    ],
    music: [
      { title: 'High Energy', artist: 'Workout Mix', genre: 'Electronic', description: 'Pumps you up' },
      { title: 'Power Boost', artist: 'Energy Artists', genre: 'Rock', description: 'Gets you moving' }
    ],
    keywords: ['dynamic', 'vibrant', 'powerful', 'motivated', 'charged', 'electric']
  },
  melancholy: {
    emoji: '☁️',
    label: 'Melancholy',
    quotes: [
      'The word \'happiness\' would lose its meaning if it were not balanced by sadness. — Carl Jung',
      'Tears shed for another person are not a sign of weakness. — José N. Harris',
      'Sometimes you need to sit alone and think about what\'s really important. — Anonymous'
    ],
    music: [
      { title: 'Rainy Day Blues', artist: 'Contemplative', genre: 'Blues', description: 'For reflective moments' },
      { title: 'Melancholic Dreams', artist: 'Indie Folk', genre: 'Folk', description: 'Beautifully sad' }
    ],
    keywords: ['reflective', 'contemplative', 'pensive', 'introspective', 'thoughtful', 'wistful']
  },
  excited: {
    emoji: '🎉',
    label: 'Excited',
    quotes: [
      'Life is either a daring adventure or nothing at all. — Helen Keller',
      'The biggest adventure you can take is to live the life of your dreams. — Oprah Winfrey',
      'Get excited and enthusiastic about your own dream. — Mike Krzyzewski'
    ],
    music: [
      { title: 'Party Hits', artist: 'Dance Mix', genre: 'Pop', description: 'Perfect for excited vibes' },
      { title: 'Celebration Songs', artist: 'Various Artists', genre: 'Pop Rock', description: 'Pure excitement' }
    ],
    keywords: ['thrilled', 'enthusiastic', 'elated', 'exhilarated', 'animated', 'ecstatic']
  },
  peaceful: {
    emoji: '🌿',
    label: 'Peaceful',
    quotes: [
      'If you want to make peace with your enemy, you have to work with your enemy. — Nelson Mandela',
      'Peace cannot be kept by force; it can only be achieved by understanding. — Albert Einstein',
      'When the power of love overcomes the love of power, the world will know peace. — Jimi Hendrix'
    ],
    music: [
      { title: 'Nature Sounds', artist: 'Earth Vibes', genre: 'Natural', description: 'Harmonious and balanced' },
      { title: 'Forest Meditation', artist: 'Peaceful Mind', genre: 'Ambient', description: 'Connect with nature' }
    ],
    keywords: ['harmonious', 'balanced', 'grounded', 'natural', 'stable', 'unified']
  },
  sad: {
    emoji: '😢',
    label: 'Sad',
    quotes: [
      'The way sadness works is one of the strange riddles of the world. — Lemony Snicket',
      'Tears are words that need to be written. — Paulo Coelho',
      'It\'s okay to not be okay. Just don\'t give up. — Anonymous'
    ],
    music: [
      { title: 'Healing Hearts', artist: 'Emotional Ballads', genre: 'Soul', description: 'For when you need to feel' },
      { title: 'Gentle Rain', artist: 'Comfort Songs', genre: 'Acoustic', description: 'Soothing melancholy' }
    ],
    keywords: ['sorrowful', 'tearful', 'heartbroken', 'emotional', 'vulnerable', 'healing']
  },
  anxious: {
    emoji: '😰',
    label: 'Anxious',
    quotes: [
      'You are braver than you believe, stronger than you seem, and smarter than you think. — A.A. Milne',
      'Anxiety is the dizziness of freedom. — Søren Kierkegaard',
      'Nothing can bring you peace but yourself. — Ralph Waldo Emerson'
    ],
    music: [
      { title: 'Breathe Easy', artist: 'Calming Collective', genre: 'Ambient', description: 'For anxious moments' },
      { title: 'Safe Space', artist: 'Anxiety Relief', genre: 'Instrumental', description: 'Grounding sounds' }
    ],
    keywords: ['worried', 'nervous', 'restless', 'overwhelmed', 'tense', 'uncertain']
  },
  tired: {
    emoji: '😴',
    label: 'Tired',
    quotes: [
      'Rest when you\'re weary. Refresh and renew yourself. — Ralph Marston',
      'Take rest; a field that has rested gives a bountiful crop. — Ovid',
      'Sleep is the best meditation. — Dalai Lama'
    ],
    music: [
      { title: 'Sleepy Sounds', artist: 'Dreamland', genre: 'Lullaby', description: 'Perfect for rest' },
      { title: 'Gentle Waves', artist: 'Sleep Aid', genre: 'Nature', description: 'Drift away peacefully' }
    ],
    keywords: ['exhausted', 'weary', 'drained', 'sleepy', 'lethargic', 'spent']
  },
  custom: {
    emoji: '✨',
    label: 'Custom',
    quotes: [
      'Your feelings are valid and important. — Anonymous',
      'Every emotion has its place and purpose. — Anonymous',
      'You are the author of your own story. — Anonymous'
    ],
    music: [
      { title: 'Your Vibe', artist: 'Personal Mix', genre: 'Custom', description: 'Uniquely yours' },
      { title: 'Individual Sound', artist: 'You', genre: 'Personal', description: 'Matches your energy' }
    ],
    keywords: ['unique', 'personal', 'individual', 'special', 'authentic', 'original']
  }
};
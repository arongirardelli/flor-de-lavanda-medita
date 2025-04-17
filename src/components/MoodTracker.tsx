
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// Mood options with emojis and labels
const moodOptions = [
  { emoji: '😊', label: 'Feliz', color: 'bg-green-100 border-green-300', value: 'happy' },
  { emoji: '😌', label: 'Calma', color: 'bg-blue-100 border-blue-300', value: 'calm' },
  { emoji: '😐', label: 'Neutra', color: 'bg-gray-100 border-gray-300', value: 'neutral' },
  { emoji: '😟', label: 'Ansiosa', color: 'bg-yellow-100 border-yellow-300', value: 'anxious' },
  { emoji: '😔', label: 'Triste', color: 'bg-indigo-100 border-indigo-300', value: 'sad' },
  { emoji: '😡', label: 'Irritada', color: 'bg-red-100 border-red-300', value: 'angry' },
  { emoji: '😴', label: 'Cansada', color: 'bg-purple-100 border-purple-300', value: 'tired' },
  { emoji: '🥰', label: 'Amada', color: 'bg-pink-100 border-pink-300', value: 'loved' },
];

interface MoodTrackerProps {
  onSaveMood?: (mood: string) => void;
}

const MoodTracker = ({ onSaveMood }: MoodTrackerProps) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  
  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    if (onSaveMood) {
      onSaveMood(mood);
    }
  };
  
  return (
    <Card className="p-4 w-full">
      <h3 className="text-lavanda-800 font-medium text-center mb-4">Como você está se sentindo hoje?</h3>
      
      <div className="grid grid-cols-4 gap-3">
        {moodOptions.map((mood) => (
          <button
            key={mood.value}
            onClick={() => handleMoodSelect(mood.value)}
            className={cn(
              "flex flex-col items-center p-2 rounded-lg border-2 transition-all", 
              mood.color,
              selectedMood === mood.value ? "ring-2 ring-lavanda-500 scale-105" : ""
            )}
          >
            <span className="text-2xl mb-1">{mood.emoji}</span>
            <span className="text-xs">{mood.label}</span>
          </button>
        ))}
      </div>
      
      {selectedMood && (
        <div className="mt-4 text-center">
          <p className="text-sm text-lavanda-700">
            Obrigada por compartilhar como está se sentindo. Temos meditações que podem te ajudar neste momento.
          </p>
        </div>
      )}
    </Card>
  );
};

export default MoodTracker;

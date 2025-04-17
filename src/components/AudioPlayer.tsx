
import { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface AudioPlayerProps {
  title: string;
  audioUrl: string;
  imageUrl: string;
}

const AudioPlayer = ({ title, audioUrl, imageUrl }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const setAudioData = () => {
      setDuration(audio.duration);
    };
    
    const setAudioTime = () => {
      setCurrentTime(audio.currentTime);
    };
    
    // Events
    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    
    // Cleanup
    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
    };
  }, [audioRef]);

  // Handle play and pause
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Format time
  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  // Handle volume change
  const handleVolumeChange = (newValue: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const volumeValue = newValue[0];
    setVolume(volumeValue);
    audio.volume = volumeValue / 100;
  };

  // Handle time change
  const handleTimeChange = (newValue: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const timeValue = newValue[0];
    audio.currentTime = timeValue;
    setCurrentTime(timeValue);
  };

  return (
    <div className="w-full px-4 py-6 rounded-2xl bg-gradient-lavanda">
      <div className="flex flex-col items-center">
        <div className="w-40 h-40 rounded-full overflow-hidden mb-6 border-4 border-white/20">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <h3 className="text-white font-medium text-lg mb-1">{title}</h3>
        
        {/* Audio element - hidden */}
        <audio ref={audioRef} src={audioUrl}></audio>
        
        {/* Progress bar */}
        <div className="w-full mt-6 px-2">
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={1}
            onValueChange={handleTimeChange}
            className="my-4"
          />
          
          <div className="flex justify-between text-xs text-white/80">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex items-center justify-center space-x-6 mt-6">
          <button className="text-white/80 hover:text-white transition-colors">
            <SkipBack size={24} />
          </button>
          
          <button 
            className="w-14 h-14 rounded-full bg-white flex items-center justify-center hover:bg-white/90 transition-colors"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <Pause size={24} className="text-lavanda-500" />
            ) : (
              <Play size={24} className="text-lavanda-500 ml-1" />
            )}
          </button>
          
          <button className="text-white/80 hover:text-white transition-colors">
            <SkipForward size={24} />
          </button>
        </div>
        
        {/* Volume */}
        <div className="flex items-center mt-8 w-full max-w-xs">
          <Volume2 size={16} className="text-white/80 mr-2" />
          <Slider
            value={[volume]}
            max={100}
            step={1}
            onValueChange={handleVolumeChange}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;

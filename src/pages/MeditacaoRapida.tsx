
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Pause } from 'lucide-react';
import { toast } from 'sonner';

const MeditacaoRapida = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds
  const [progress, setProgress] = useState(100);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<number | null>(null);
  const navigate = useNavigate();
  
  // Setup audio (in a real app, you'd have actual audio files)
  useEffect(() => {
    // For demo purposes, we'll use a placeholder audio URL
    audioRef.current = new Audio('/assets/emergencia-ansiedade.mp3');
    
    // In a real implementation, you'd have an actual file
    // This is just to simulate audio for the demo
    audioRef.current.volume = 0.7;
    audioRef.current.loop = false;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  // Handle play/pause
  const togglePlay = () => {
    if (isPlaying) {
      // Pause
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    } else {
      // Play
      if (audioRef.current) {
        audioRef.current.play().catch(e => {
          // Handle cases where audio can't play (like on mobile without user interaction)
          toast("Para ouvir o áudio, clique primeiro na tela", {
            description: "Por questões de segurança, a interação é necessária",
          });
        });
      }
      
      // Start countdown
      intervalRef.current = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            // Time's up
            if (intervalRef.current) {
              window.clearInterval(intervalRef.current);
            }
            setIsPlaying(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    setIsPlaying(!isPlaying);
  };
  
  // Update progress circle
  useEffect(() => {
    setProgress((timeLeft / 60) * 100);
  }, [timeLeft]);
  
  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };
  
  return (
    <div className="min-h-screen bg-gradient-lavanda flex flex-col">
      {/* Header */}
      <div className="pt-12 px-4 pb-6">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
        >
          <ArrowLeft size={20} className="text-white" />
        </button>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-white text-2xl font-display mb-3">Respiração de Emergência</h1>
        <p className="text-white/80 mb-10">
          Um minuto para acalmar sua mente e retomar o controle
        </p>
        
        {/* Circle progress */}
        <div className="relative w-64 h-64 mb-8">
          {/* Background circle */}
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="8"
            />
            
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="white"
              strokeWidth="8"
              strokeDasharray="283"
              strokeDashoffset={283 - (283 * progress) / 100}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
          </svg>
          
          {/* Timer display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-white text-4xl font-medium">
              {formatTime(timeLeft)}
            </span>
            <span className="text-white/70 text-sm mt-1">
              {isPlaying ? "Respire profundamente" : "Pressione para iniciar"}
            </span>
          </div>
        </div>
        
        {/* Play/Pause button */}
        <button
          onClick={togglePlay}
          className="w-16 h-16 rounded-full bg-white flex items-center justify-center hover:bg-white/90 transition-colors mb-8"
        >
          {isPlaying ? (
            <Pause size={28} className="text-lavanda-500" />
          ) : (
            <Play size={28} className="text-lavanda-500 ml-1" />
          )}
        </button>
        
        <p className="text-white/80 text-sm max-w-md">
          Inspire por 4 segundos, segure por 4 segundos, expire por 6 segundos. 
          Repita até se sentir mais calma.
        </p>
      </div>
    </div>
  );
};

export default MeditacaoRapida;

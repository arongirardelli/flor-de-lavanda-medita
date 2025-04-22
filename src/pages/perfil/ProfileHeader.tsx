
import { Settings, Flower, Flower2 } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

type ProfileHeaderProps = {
  loading: boolean;
  profile: { name: string; avatar: string } | null;
  userLevel: string;
  onSettingsClick: () => void;
};

const AVATARS = [
  {
    id: "1",
    color: "bg-rose-200",
    icon: <Flower size={40} color="#9b87f5" strokeWidth={2} />,
  },
  {
    id: "2",
    color: "bg-violet-200",
    icon: <Flower2 size={40} color="#9b87f5" strokeWidth={2} />,
  },
  {
    id: "3",
    color: "bg-cyan-200",
    icon: <Flower size={40} color="#5e4694" strokeWidth={2.5} />,
  },
  {
    id: "4",
    color: "bg-emerald-200",
    icon: <Flower2 size={40} color="#7e69ab" strokeWidth={2.5} />,
  },
];

const calculateProgress = (level: string): number => {
  switch (level) {
    case "Guardiã do Equilíbrio":
      return 100;
    case "Meditante Tranquila":
      return 75;
    case "Exploradora":
      return 50;
    case "Iniciante":
    default:
      return 25;
  }
};

export function ProfileHeader({ loading, profile, userLevel, onSettingsClick }: ProfileHeaderProps) {
  const renderAvatar = () => {
    if (loading || !profile) {
      return (
        <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gray-200 animate-pulse" />
      );
    }
    const ava = AVATARS.find(a => a.id === profile.avatar) ?? AVATARS[0];
    return (
      <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${ava.color}`}>
        {ava.icon}
      </div>
    );
  };

  const progress = calculateProgress(userLevel);

  return (
    <div className="bg-gradient-lavanda pt-12 pb-12 px-4 rounded-b-[40px] relative overflow-hidden">
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-white text-2xl font-display">Seu Perfil</h1>
          </div>
          <button 
            onClick={onSettingsClick}
            className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
          >
            <Settings size={22} className="text-white" />
          </button>
        </div>

        <div className="flex flex-col items-center text-center">
          {renderAvatar()}
          <div className="mt-4">
            <h2 className="text-white text-xl font-medium mb-1">
              {profile?.name || "..."}
            </h2>
            <div className="bg-white/20 rounded-full px-4 py-1 inline-block">
              <p className="text-white/90 text-sm font-medium">{userLevel}</p>
            </div>
          </div>

          <div className="w-full mt-6">
            <Progress 
              value={progress} 
              className="h-2 bg-white/20" 
            />
            <p className="text-white/80 text-xs mt-2 italic">
              {progress}% do caminho para o próximo nível
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

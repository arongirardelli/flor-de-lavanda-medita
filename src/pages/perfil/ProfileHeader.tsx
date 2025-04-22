
import { Settings } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { ProfileEditSection } from "@/components/ProfileEditSection";
import { useAuth } from "@/components/AuthProvider";

type ProfileHeaderProps = {
  loading: boolean;
  profile: { 
    id: string;
    name: string | null;
    photo_url: string | null;
  } | null;
  userLevel: string;
  onSettingsClick: () => void;
  onProfileUpdate: () => void;
};

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

export function ProfileHeader({ 
  loading, 
  profile, 
  userLevel, 
  onSettingsClick,
  onProfileUpdate 
}: ProfileHeaderProps) {
  const { user } = useAuth();
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
          {loading ? (
            <div className="w-20 h-20 rounded-full bg-white/20 animate-pulse" />
          ) : (
            profile && user && (
              <ProfileEditSection
                userId={user.id}
                currentName={profile.name}
                currentPhotoUrl={profile.photo_url}
                onUpdate={onProfileUpdate}
              />
            )
          )}

          <div className="mt-4">
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

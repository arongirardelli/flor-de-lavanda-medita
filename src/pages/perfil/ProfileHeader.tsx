
import { Settings, Flower, Flower2 } from 'lucide-react';

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

export function ProfileHeader({ loading, profile, userLevel, onSettingsClick }: ProfileHeaderProps) {
  const renderAvatar = () => {
    if (loading || !profile) {
      return (
        <div className="w-20 h-20 rounded-full flex items-center justify-center mr-4 bg-gray-200 animate-pulse" />
      );
    }
    const ava = AVATARS.find(a => a.id === profile.avatar) ?? AVATARS[0];
    return (
      <div className={`w-20 h-20 rounded-full flex items-center justify-center mr-4 transition-all ${ava.color}`}>
        {ava.icon}
      </div>
    );
  };

  return (
    <div className="bg-gradient-lavanda pt-12 pb-8 px-4 rounded-b-[30px]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-white text-2xl font-display">Seu Perfil</h1>
        </div>
        <button onClick={onSettingsClick}>
          <Settings size={22} className="text-white" />
        </button>
      </div>
      <div className="flex items-center">
        {renderAvatar()}
        <div>
          <h2 className="text-white text-lg font-medium">{profile?.name || "..."}</h2>
          <p className="text-white/80">{userLevel}</p>
        </div>
      </div>
    </div>
  );
}

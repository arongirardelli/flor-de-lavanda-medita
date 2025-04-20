
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Award, Calendar, Heart, Settings, Clock, Moon, Flower, Flower2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import BottomNavigation from '@/components/BottomNavigation';
import MeditationCard from '@/components/MeditationCard';
import { meditacoes } from '@/data/meditacoes';
import { useUserActivity } from '@/hooks/useUserActivity';
import { ProfileSettingsDrawer } from '@/components/ProfileSettingsDrawer';
import { useUserProfile } from '@/hooks/useUserProfile';

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

const Perfil = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('estatisticas');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const userActivity = useUserActivity();
  const { profile, refetch } = useUserProfile();

  // Get favorite meditations
  const favoriteMeditations = meditacoes.filter(med =>
    userActivity.favorites.includes(med.id)
  );

  // Render avatar from DB/profile
  const renderAvatar = () => {
    if (!profile) {
      return (
        <div className="w-20 h-20 rounded-full flex items-center justify-center mr-4 bg-gray-200 animate-pulse" />
      );
    }
    const ava = AVATARS.find(a => a.id === profile.avatar) ?? AVATARS[1];
    return (
      <div className={`w-20 h-20 rounded-full flex items-center justify-center mr-4 transition-all ${ava.color}`}>
        {ava.icon}
      </div>
    );
  };

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="bg-gradient-lavanda pt-12 pb-8 px-4 rounded-b-[30px]">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-white text-2xl font-display">Seu Perfil</h1>
          </div>
          <button onClick={() => setDrawerOpen(true)}>
            <Settings size={22} className="text-white" />
          </button>
        </div>

        <div className="flex items-center">
          {/* Avatar */}
          {renderAvatar()}
          <div>
            <h2 className="text-white text-lg font-medium">{profile?.name || "..."}</h2>
            <p className="text-white/80">
              {userActivity.streak > 3 ? "Guardiã do Equilíbrio" : "Meditante Tranquila"}
            </p>
          </div>
        </div>
      </div>

      {/* Stats cards */}
      <div className="px-4 -mt-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl p-3 shadow-sm flex flex-col items-center">
            <Clock size={20} className="text-lavanda-500 mb-1" />
            <span className="text-lg font-medium text-lavanda-800">{userActivity.totalMinutes}</span>
            <span className="text-xs text-lavanda-600">Minutos</span>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-sm flex flex-col items-center">
            <Moon size={20} className="text-lavanda-500 mb-1" />
            <span className="text-lg font-medium text-lavanda-800">{userActivity.totalSessions}</span>
            <span className="text-xs text-lavanda-600">Sessões</span>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-sm flex flex-col items-center">
            <Award size={20} className="text-lavanda-500 mb-1" />
            <span className="text-lg font-medium text-lavanda-800">{userActivity.streak}</span>
            <span className="text-xs text-lavanda-600">Sequência</span>
          </div>
        </div>
      </div>

      {/* Weekly goal */}
      <div className="px-4 mt-6">
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <h3 className="text-lavanda-800 font-medium mb-1">Meta Semanal</h3>
          <p className="text-sm text-lavanda-600 mb-3">
            {userActivity.totalMinutes} de {userActivity.weeklyGoal} minutos
          </p>
          <Progress value={userActivity.weeklyProgress} className="h-2" />
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="w-full bg-lavanda-50 p-1 rounded-full mb-4">
            <TabsTrigger
              value="estatisticas"
              className="rounded-full data-[state=active]:bg-lavanda-500 data-[state=active]:text-white"
            >
              <Calendar size={16} className="mr-1" />
              Atividade
            </TabsTrigger>
            <TabsTrigger
              value="favoritos"
              className="rounded-full data-[state=active]:bg-lavanda-500 data-[state=active]:text-white"
            >
              <Heart size={16} className="mr-1" />
              Favoritos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="estatisticas" className="mt-0">
            <h3 className="text-lavanda-800 font-medium mb-3">Atividade Recente</h3>
            <div className="space-y-3">
              {userActivity.recentActivity.map((activity, index) => (
                <div key={index} className="bg-white rounded-lg p-3 border border-lavanda-100 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-lavanda-800">{activity.meditation}</p>
                    <p className="text-xs text-lavanda-600">{activity.date}</p>
                  </div>
                  <span className="text-sm text-lavanda-700">{activity.duration}</span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="favoritos" className="mt-0">
            <h3 className="text-lavanda-800 font-medium mb-3">Suas Meditações Favoritas</h3>
            {favoriteMeditations.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {favoriteMeditations.map((meditacao) => (
                  <MeditationCard
                    key={meditacao.id}
                    id={meditacao.id}
                    title={meditacao.titulo}
                    duration={meditacao.duracao}
                    category={meditacao.categoria}
                    imageUrl={meditacao.imagemUrl}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Heart size={40} className="text-lavanda-200 mx-auto mb-3" />
                <p className="text-lavanda-600">Você ainda não tem meditações favoritas</p>
                <p className="text-lavanda-400 text-sm mt-1">
                  Explore as meditações e marque suas favoritas
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <BottomNavigation />

      {/* Drawer de configurações do perfil */}
      <ProfileSettingsDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        progressMinutes={userActivity.totalMinutes}
        onChangePassword={(pwd) => {
          // Chame lógica para mudar senha real aqui, se necessário.
          if (pwd.length >= 6) {
            alert("Senha alterada com sucesso!");
          }
        }}
      />
    </div>
  );
};

export default Perfil;

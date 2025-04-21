
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@/components/BottomNavigation';
import { meditacoes } from '@/data/meditacoes';
import { useUserActivity } from '@/hooks/useUserActivity';
import { ProfileSettingsDrawer } from '@/components/ProfileSettingsDrawer';
import { useUserProfile } from '@/hooks/useUserProfile';
import { toast } from 'sonner';
import { ProfileHeader } from './perfil/ProfileHeader';
import { ProfileStats } from './perfil/ProfileStats';
import { ProfileWeeklyGoal } from './perfil/ProfileWeeklyGoal';
import { ProfileTabs } from './perfil/ProfileTabs';
import { JourneyLevelProgressBar } from '@/components/JourneyLevelProgressBar';

const Perfil = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('estatisticas');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const userActivity = useUserActivity();
  const { profile, loading: profileLoading, error: profileError, refetch: refetchProfile } = useUserProfile();

  useEffect(() => {
    if (profileError) {
      toast.error(`Erro ao carregar perfil: ${profileError}`);
    }
  }, [profileError]);

  const favoriteMeditations = meditacoes.filter(med =>
    userActivity.favorites.includes(med.id)
  );

  // Nível do usuário
  const getUserLevel = () => {
    if (profileLoading || !profile) return "Meditante";
    // Não usaremos mais o totalMinutes, mas weekly_journey_minutes para motivação semanal
    if (profile.weekly_journey_minutes >= 400) return "Guardiã do Equilíbrio";
    if (profile.weekly_journey_minutes >= 120) return "Meditante Tranquila";
    if (profile.weekly_journey_minutes >= 30) return "Exploradora";
    return "Iniciante";
  };

  return (
    <div className="pb-24">
      <ProfileHeader
        loading={profileLoading}
        profile={profile}
        userLevel={getUserLevel()}
        onSettingsClick={() => setDrawerOpen(true)}
      />

      {/* Barra de progresso dos níveis da jornada semanal */}
      {profile && (
        <div className="px-4 -mt-4">
          <JourneyLevelProgressBar
            weeklyMinutes={profile.weekly_journey_minutes}
            lastUpdate={profile.weekly_journey_updated_at || null}
          />
        </div>
      )}

      <div className="px-4">
        <ProfileStats userActivity={userActivity} />
      </div>

      <div className="px-4 mt-6">
        <ProfileWeeklyGoal userActivity={userActivity} />
      </div>

      <div className="px-4">
        <ProfileTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          userActivity={userActivity}
          favoriteMeditations={favoriteMeditations}
        />
      </div>

      <BottomNavigation />

      <ProfileSettingsDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        progressMinutes={userActivity.totalMinutes}
        onChangePassword={(pwd) => {
          if (pwd.length >= 6) {
            toast.success("Senha alterada com sucesso!");
          }
        }}
      />
    </div>
  );
};

export default Perfil;


import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Heart } from 'lucide-react';
import MeditationCard from '@/components/MeditationCard';

type ProfileTabsProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userActivity: {
    recentActivity: Array<{ date: string; meditation: string; duration: string }>;
  };
  favoriteMeditations: Array<{
    id: string;
    titulo: string;
    duracao: string;
    categoria: string;
    imagemUrl: string;
  }>;
};

export function ProfileTabs({ activeTab, setActiveTab, userActivity, favoriteMeditations }: ProfileTabsProps) {
  return (
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
  )
}

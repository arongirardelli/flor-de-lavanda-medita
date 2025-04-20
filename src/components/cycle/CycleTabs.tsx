
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarIcon, LineChart, ListTodo } from 'lucide-react';
import { CycleCalculatorForm } from '@/components/CycleCalculatorForm';
import MeditationCard from '@/components/MeditationCard';
import { meditacoes } from '@/data/meditacoes';
import MenstrualCalendar from '@/components/MenstrualCalendar';
import { CycleStats } from './CycleStats';
import { WellnessTip } from './WellnessTip';
import { SymptomsList } from './SymptomsList';
import type { CycleData } from '@/hooks/useCycleData';

interface CycleTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cycles: CycleData[];
  currentPhase: string;
  daysUntilNextPeriod: number | string;
  averageCycleLength: number;
  lastPeriodDuration: number;
  symptoms: Array<{
    day: string;
    date: string;
    symptoms: string[];
    notes?: string | null;
  }>;
  onCycleCalculated: () => void;
  onAddSymptoms: () => void;
}

export function CycleTabs({
  activeTab,
  setActiveTab,
  cycles,
  currentPhase,
  daysUntilNextPeriod,
  averageCycleLength,
  lastPeriodDuration,
  symptoms,
  onCycleCalculated,
  onAddSymptoms,
}: CycleTabsProps) {
  const cicloMeditacoes = meditacoes.filter(med => 
    med.categoria.toLowerCase() === 'ciclo'
  );

  return (
    <Tabs 
      value={activeTab} 
      onValueChange={setActiveTab}
      className="w-full"
    >
      <TabsList className="w-full bg-white/20 backdrop-blur-sm p-1 rounded-full">
        <TabsTrigger 
          value="calendario" 
          className="rounded-full data-[state=active]:bg-white data-[state=active]:text-lavanda-600"
        >
          <CalendarIcon size={16} className="mr-1" />
          Calendário
        </TabsTrigger>
        <TabsTrigger 
          value="estatisticas" 
          className="rounded-full data-[state=active]:bg-white data-[state=active]:text-lavanda-600"
        >
          <LineChart size={16} className="mr-1" />
          Estatísticas
        </TabsTrigger>
        <TabsTrigger 
          value="sintomas" 
          className="rounded-full data-[state=active]:bg-white data-[state=active]:text-lavanda-600"
        >
          <ListTodo size={16} className="mr-1" />
          Sintomas
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="calendario" className="mt-0">
        <CycleCalculatorForm onCalculate={onCycleCalculated} />
        <div className="mt-4">
          <MenstrualCalendar />
        </div>
        
        <div className="mt-8">
          <h3 className="text-lavanda-800 font-medium mb-4">Meditações para seu ciclo</h3>
          <div className="grid grid-cols-2 gap-4">
            {cicloMeditacoes.map((meditacao) => (
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
        </div>
      </TabsContent>
      
      <TabsContent value="estatisticas" className="mt-0">
        <CycleStats
          cycles={cycles}
          currentPhase={currentPhase}
          daysUntilNextPeriod={daysUntilNextPeriod}
          averageCycleLength={averageCycleLength}
          lastPeriodDuration={lastPeriodDuration}
        />
        <WellnessTip currentPhase={currentPhase} />
      </TabsContent>
      
      <TabsContent value="sintomas" className="mt-0">
        <SymptomsList
          symptoms={symptoms}
          onAddSymptoms={onAddSymptoms}
        />
      </TabsContent>
    </Tabs>
  );
}

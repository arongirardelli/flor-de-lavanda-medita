
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
      <TabsList className="w-full bg-[#FFDFF6]/70 backdrop-blur-sm p-1 rounded-full flex gap-2">
        <TabsTrigger 
          value="calendario" 
          className="rounded-full data-[state=active]:bg-white data-[state=active]:text-lavanda-600 flex items-center gap-1 px-4 py-2"
        >
          <CalendarIcon size={18} className="text-lavanda-400" />
          <span>Calendário</span>
        </TabsTrigger>
        <TabsTrigger 
          value="estatisticas" 
          className="rounded-full data-[state=active]:bg-white data-[state=active]:text-lavanda-600 flex items-center gap-1 px-4 py-2"
        >
          <LineChart size={18} className="text-lavanda-400" />
          <span>Estatísticas</span>
        </TabsTrigger>
        <TabsTrigger 
          value="sintomas" 
          className="rounded-full data-[state=active]:bg-white data-[state=active]:text-lavanda-600 flex items-center gap-1 px-4 py-2"
        >
          <ListTodo size={18} className="text-lavanda-400" />
          <span>Sintomas</span>
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
        <div className="mt-6">
          <WellnessTip currentPhase={currentPhase} />
          <div className="mt-4 bg-lavanda-50 border border-lavanda-100 text-rosa-600 rounded-xl px-4 py-3 text-xs">
            <strong>Aviso importante:</strong><br />
            Essa tabela é apenas uma aproximação para um ciclo de 28 dias
            e <span className="font-semibold underline">não deve, em hipótese alguma, ser usada como método contraceptivo ou para planejamento de gravidez</span>.<br />
            Use-a apenas como ferramenta de autoconhecimento e referência para o seu bem-estar.
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}


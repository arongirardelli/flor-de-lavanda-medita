import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar as CalendarIcon, LineChart, ListTodo } from 'lucide-react';
import BottomNavigation from '@/components/BottomNavigation';
import MenstrualCalendar from '@/components/MenstrualCalendar';
import { CycleCalculatorForm } from '@/components/CycleCalculatorForm';
import MeditationCard from '@/components/MeditationCard';
import { meditacoes } from '@/data/meditacoes';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthProvider';
import { useCycleData } from '@/hooks/useCycleData';
import { CycleHeader } from '@/components/cycle/CycleHeader';
import { CycleStats } from '@/components/cycle/CycleStats';
import { WellnessTip } from '@/components/cycle/WellnessTip';
import { SymptomsList } from '@/components/cycle/SymptomsList';

const Ciclo = () => {
  const [activeTab, setActiveTab] = useState('calendario');
  const { user } = useAuth();
  const { cycles, fetchCycles } = useCycleData();
  const [symptoms, setSymptoms] = useState<Array<{
    day: string;
    date: string;
    symptoms: string[];
    notes?: string | null;
  }>>([]);
  
  const cicloMeditacoes = meditacoes.filter(med => 
    med.categoria.toLowerCase() === 'ciclo'
  );
  
  const calculateStats = () => {
    if (!cycles || cycles.length === 0) {
      return {
        averageCycleLength: 28,
        lastPeriodDuration: 5,
        currentPhase: "Desconhecido",
        daysUntilNextPeriod: "Desconhecido"
      };
    }
    
    const sortedCycles = [...cycles].sort((a, b) => 
      new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
    );
    
    const lastCycle = sortedCycles[0];
    const lastStart = new Date(lastCycle.start_date);
    const lastEnd = lastCycle.end_date ? new Date(lastCycle.end_date) : new Date(lastStart);
    if (!lastCycle.end_date) {
      lastEnd.setDate(lastStart.getDate() + 5);
    }
    
    const lastPeriodDuration = Math.floor((lastEnd.getTime() - lastStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
    let averageCycleLength = 28;
    if (sortedCycles.length >= 2) {
      const cycleLengths = [];
      for (let i = 0; i < sortedCycles.length - 1; i++) {
        const currentStart = new Date(sortedCycles[i].start_date);
        const nextStart = new Date(sortedCycles[i + 1].start_date);
        const daysDiff = Math.floor((currentStart.getTime() - nextStart.getTime()) / (1000 * 60 * 60 * 24));
        cycleLengths.push(daysDiff);
      }
      
      if (cycleLengths.length > 0) {
        averageCycleLength = Math.round(cycleLengths.reduce((a, b) => a + b, 0) / cycleLengths.length);
      }
    }
    
    const today = new Date();
    const daysSinceLastPeriod = Math.floor((today.getTime() - lastStart.getTime()) / (1000 * 60 * 60 * 24));
    
    let currentPhase;
    let daysUntilNextPeriod;
    
    if (daysSinceLastPeriod < lastPeriodDuration) {
      currentPhase = "Menstrual";
      daysUntilNextPeriod = averageCycleLength;
    } else if (daysSinceLastPeriod < 14) {
      currentPhase = "Folicular";
      daysUntilNextPeriod = averageCycleLength - daysSinceLastPeriod;
    } else if (daysSinceLastPeriod === 14) {
      currentPhase = "Ovulatória";
      daysUntilNextPeriod = averageCycleLength - daysSinceLastPeriod;
    } else {
      currentPhase = "Lútea";
      daysUntilNextPeriod = averageCycleLength - daysSinceLastPeriod;
    }
    
    return {
      averageCycleLength,
      lastPeriodDuration,
      currentPhase,
      daysUntilNextPeriod: daysUntilNextPeriod < 0 ? 0 : daysUntilNextPeriod
    };
  };
  
  const { 
    averageCycleLength, 
    lastPeriodDuration, 
    currentPhase, 
    daysUntilNextPeriod 
  } = calculateStats();
  
  const fetchSymptoms = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('cycle_symptoms')
        .select('date, symptoms, notes')
        .eq('user_id', user.id)
        .order('date', { ascending: false })
        .limit(10);
        
      if (error) throw error;
      
      if (data) {
        const formattedSymptoms = data.map(item => {
          const date = new Date(item.date);
          return {
            day: `Dia ${date.getDate()}/${date.getMonth() + 1}`,
            date: item.date,
            symptoms: item.symptoms || [],
            notes: item.notes
          };
        });
        
        setSymptoms(formattedSymptoms);
      }
    } catch (error) {
      console.error('Error fetching symptoms:', error);
    }
  };
  
  useEffect(() => {
    fetchSymptoms();
  }, [user, activeTab]);
  
  const handleCycleCalculated = () => {
    fetchCycles();
    fetchSymptoms();
    setActiveTab('calendario');
  };

  const handleAddSymptoms = () => {
    setActiveTab('calendario');
    setTimeout(() => {
      const symptomsDialog = document.querySelector('.add-symptoms-btn') as HTMLButtonElement;
      if (symptomsDialog) {
        symptomsDialog.click();
      }
    }, 300);
  };

  return (
    <div className="pb-24">
      <div className="bg-gradient-sunset pt-12 pb-6 px-4 rounded-b-[30px]">
        <CycleHeader />
        
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
            <CycleCalculatorForm onCalculate={handleCycleCalculated} />
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
              onAddSymptoms={handleAddSymptoms}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Ciclo;

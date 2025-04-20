
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Calendar as CalendarIcon, LineChart, ListTodo } from 'lucide-react';
import BottomNavigation from '@/components/BottomNavigation';
import MenstrualCalendar from '@/components/MenstrualCalendar';
import { CycleCalculatorForm } from '@/components/CycleCalculatorForm';
import MeditationCard from '@/components/MeditationCard';
import { meditacoes } from '@/data/meditacoes';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthProvider';
import { useCycleData } from '@/hooks/useCycleData';

const Ciclo = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('calendario');
  const { user } = useAuth();
  const { cycles, fetchCycles } = useCycleData();
  const [symptoms, setSymptoms] = useState<Array<{
    day: string;
    date: string;
    symptoms: string[];
    notes?: string | null;
  }>>([]);
  
  // Filter meditations related to menstrual cycle
  const cicloMeditacoes = meditacoes.filter(med => 
    med.categoria.toLowerCase() === 'ciclo'
  );
  
  // Calculate stats based on cycles
  const calculateStats = () => {
    if (!cycles || cycles.length === 0) {
      return {
        averageCycleLength: 28,
        lastPeriodDuration: 5,
        currentPhase: "Desconhecido",
        daysUntilNextPeriod: "Desconhecido"
      };
    }
    
    // Ordenar ciclos por data
    const sortedCycles = [...cycles].sort((a, b) => 
      new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
    );
    
    // Duração do último período
    const lastCycle = sortedCycles[0];
    const lastStart = new Date(lastCycle.start_date);
    const lastEnd = lastCycle.end_date ? new Date(lastCycle.end_date) : new Date(lastStart);
    if (!lastCycle.end_date) {
      lastEnd.setDate(lastStart.getDate() + 5); // Default a 5 dias se não tiver end_date
    }
    
    const lastPeriodDuration = Math.floor((lastEnd.getTime() - lastStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
    // Calcular duração média do ciclo (se houver pelo menos 2 ciclos)
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
    
    // Calcular fase atual e dias até próximo período
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

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="bg-gradient-sunset pt-12 pb-6 px-4 rounded-b-[30px]">
        <div className="flex items-center gap-3 mb-4">
          <ArrowLeft size={20} className="text-white" onClick={() => navigate(-1)} />
          <h1 className="text-white text-xl font-display">Seu Ciclo</h1>
        </div>
        
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
            <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
              <h3 className="text-lavanda-800 font-medium mb-3">Histórico do Ciclo</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-lavanda-100">
                  <span className="text-lavanda-700">Duração média do ciclo</span>
                  <span className="font-medium text-lavanda-800">{averageCycleLength} dias</span>
                </div>
                <div className="flex justify-between py-2 border-b border-lavanda-100">
                  <span className="text-lavanda-700">Duração da última menstruação</span>
                  <span className="font-medium text-lavanda-800">{lastPeriodDuration} dias</span>
                </div>
                <div className="flex justify-between py-2 border-b border-lavanda-100">
                  <span className="text-lavanda-700">Fase atual</span>
                  <span className="font-medium text-lavanda-800">{currentPhase}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-lavanda-700">Próxima menstruação em</span>
                  <span className="font-medium text-lavanda-800">
                    {typeof daysUntilNextPeriod === 'number' ? `${daysUntilNextPeriod} dias` : daysUntilNextPeriod}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="text-lavanda-800 font-medium mb-1">Dica de bem-estar</h3>
              <p className="text-sm text-lavanda-600 mb-4">
                {currentPhase === "Menstrual" && "Durante a fase menstrual, seu corpo precisa de descanso. Pratique atividades leves e cuide da sua alimentação."}
                {currentPhase === "Folicular" && "Na fase folicular, você tende a ter mais energia. Aproveite para praticar exercícios mais intensos."}
                {currentPhase === "Ovulatória" && "Na fase ovulatória, seu corpo está no auge da energia. Ótimo momento para atividades sociais e físicas."}
                {currentPhase === "Lútea" && "Durante a fase lútea, seu corpo precisa de mais descanso e autocuidado. Pratique respiração profunda e evite alimentos inflamatórios."}
                {currentPhase === "Desconhecido" && "Registre seu ciclo regularmente para receber dicas personalizadas para cada fase."}
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="sintomas" className="mt-0">
            <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
              <h3 className="text-lavanda-800 font-medium mb-3">Registro de Sintomas</h3>
              
              {symptoms.length > 0 ? (
                <div className="space-y-4">
                  {symptoms.map((day, index) => (
                    <div key={index} className="pb-3 border-b border-lavanda-100 last:border-0">
                      <p className="font-medium text-lavanda-700 mb-2">{day.day}</p>
                      {day.symptoms.length > 0 ? (
                        <div className="flex flex-wrap gap-2 mb-2">
                          {day.symptoms.map((symptom, i) => (
                            <span key={i} className="bg-lavanda-100 text-lavanda-800 rounded-full px-3 py-1 text-xs">
                              {symptom}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 mb-2">Nenhum sintoma registrado</p>
                      )}
                      {day.notes && (
                        <p className="text-sm text-lavanda-700 italic mt-1">{day.notes}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-4 text-lavanda-600">
                  Nenhum sintoma registrado ainda. Use o botão "Adicionar sintomas hoje" no calendário para começar.
                </p>
              )}
            </div>
            
            <Button 
              className="w-full bg-lavanda-500 hover:bg-lavanda-600 mt-4"
              onClick={() => {
                setActiveTab('calendario');
                setTimeout(() => {
                  const today = new Date();
                  const symptomsDialog = document.querySelector('.add-symptoms-btn') as HTMLButtonElement;
                  if (symptomsDialog) {
                    symptomsDialog.click();
                  }
                }, 300);
              }}
            >
              Adicionar sintomas hoje
            </Button>
          </TabsContent>
        </Tabs>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Ciclo;

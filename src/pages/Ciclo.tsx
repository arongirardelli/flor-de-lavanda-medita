
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Calendar as CalendarIcon, LineChart, ListTodo } from 'lucide-react';
import BottomNavigation from '@/components/BottomNavigation';
import MenstrualCalendar from '@/components/MenstrualCalendar';
import { CycleCalculatorForm } from '@/components/CycleCalculatorForm';
import MeditationCard from '@/components/MeditationCard';
import { meditacoes } from '@/data/meditacoes';

const Ciclo = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('calendario');
  
  // Filter meditations related to menstrual cycle
  const cicloMeditacoes = meditacoes.filter(med => 
    med.categoria.toLowerCase() === 'ciclo'
  );
  
  // Calculate fake stats
  const averageCycleLength = 28;
  const lastPeriodDuration = 5;
  const currentPhase = "Lútea";
  
  const symptoms = [
    { day: "Dia 1", symptoms: ["Cólicas", "Cansaço", "Irritabilidade"] },
    { day: "Dia 2", symptoms: ["Cólicas leves", "Dor nas costas"] },
    { day: "Dia 3", symptoms: ["Humor instável"] },
    { day: "Dia 4", symptoms: ["Sensibilidade nos seios"] },
    { day: "Dia 5", symptoms: ["Retenção de líquidos"] },
  ];
  
  const handleCycleCalculated = () => {
    // Refresh the calendar view or perform any necessary updates
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
                  <span className="font-medium text-lavanda-800">8 dias</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="text-lavanda-800 font-medium mb-1">Dica de bem-estar</h3>
              <p className="text-sm text-lavanda-600 mb-4">
                Durante a fase lútea, seu corpo precisa de mais descanso e autocuidado.
                Pratique respiração profunda e evite alimentos inflamatórios.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="sintomas" className="mt-0">
            <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
              <h3 className="text-lavanda-800 font-medium mb-3">Registro de Sintomas</h3>
              <p className="text-sm text-lavanda-600 mb-4">
                Último ciclo (5-10 Abril)
              </p>
              
              <div className="space-y-4">
                {symptoms.map((day, index) => (
                  <div key={index} className="pb-3 border-b border-lavanda-100 last:border-0">
                    <p className="font-medium text-lavanda-700 mb-2">{day.day}</p>
                    <div className="flex flex-wrap gap-2">
                      {day.symptoms.map((symptom, i) => (
                        <span key={i} className="bg-lavanda-100 text-lavanda-800 rounded-full px-3 py-1 text-xs">
                          {symptom}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button className="w-full btn-primary mt-4">
              Adicionar sintomas hoje
            </button>
          </TabsContent>
        </Tabs>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Ciclo;

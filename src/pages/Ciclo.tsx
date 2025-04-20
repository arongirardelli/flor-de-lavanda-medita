
import { useState } from 'react';
import MenstrualCalendar from '@/components/MenstrualCalendar';
import BottomNavigation from '@/components/BottomNavigation';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { CycleTabs } from '@/components/cycle/CycleTabs';
import { useCycleData } from '@/hooks/useCycleData';
import { useCycleStats } from '@/hooks/useCycleStats';

const Ciclo = () => {
  const [activeTab, setActiveTab] = useState('calendario');
  const { 
    cycles, 
    handlePeriodToggle 
  } = useCycleData();
  
  // Get cycle statistics based on the cycles data
  const { 
    currentPhase,
    daysUntilNextPeriod,
    averageCycleLength,
    lastPeriodDuration 
  } = useCycleStats(cycles);

  // Mock symptoms data for now
  const symptoms = [
    {
      day: "Hoje",
      date: new Date().toISOString(),
      symptoms: ["Cólica", "Dor de cabeça"],
      notes: "Sintomas moderados"
    }
  ];

  const handleAddSymptoms = () => {
    // This will be implemented in the AddSymptomsDialog
    console.log("Add symptoms clicked");
  };

  return (
    <div className="pb-24">
      <Alert className="mx-4 mt-4 bg-lavanda-50 border-lavanda-200">
        <Info className="h-4 w-4 text-lavanda-500" />
        <AlertDescription className="text-lavanda-700">
          Selecione o primeiro dia da sua menstruação no calendário e clique em "Atualizar Início do Período"
        </AlertDescription>
      </Alert>
      
      <div className="bg-gradient-sunset pt-6 pb-6 px-4 rounded-b-[30px]">
        <CycleTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          cycles={cycles}
          currentPhase={currentPhase}
          daysUntilNextPeriod={daysUntilNextPeriod}
          averageCycleLength={averageCycleLength}
          lastPeriodDuration={lastPeriodDuration}
          symptoms={symptoms}
          onCycleCalculated={() => {}}
          onAddSymptoms={handleAddSymptoms}
        />
      </div>
      <BottomNavigation />
    </div>
  );
};

export default Ciclo;

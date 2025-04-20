
import { useState } from 'react';
import BottomNavigation from '@/components/BottomNavigation';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { CycleTabs } from '@/components/cycle/CycleTabs';
import { useCycleData } from '@/hooks/useCycleData';
import { useCycleStats } from '@/hooks/useCycleStats';
import { useSymptoms } from '@/hooks/useSymptoms';
import { AddSymptomsDialog } from '@/components/AddSymptomsDialog';

const Ciclo = () => {
  const [activeTab, setActiveTab] = useState('calendario');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogDate, setDialogDate] = useState<Date>(new Date());

  const { 
    cycles, 
    handlePeriodToggle 
  } = useCycleData();
  const { currentPhase, daysUntilNextPeriod, averageCycleLength, lastPeriodDuration } = useCycleStats(cycles);
  const { symptoms, refetchSymptoms } = useSymptoms();

  // Quando clicar em "Adicionar sintomas hoje"
  const handleAddSymptoms = (date?: Date) => {
    setDialogDate(date || new Date());
    setDialogOpen(true);
  };

  const handleDialogChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      refetchSymptoms();
    }
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
          onAddSymptoms={() => handleAddSymptoms()}
        />
      </div>
      {/* Diálogo de registro de sintomas */}
      <AddSymptomsDialog
        open={dialogOpen}
        onOpenChange={handleDialogChange}
        date={dialogDate}
      />
      <BottomNavigation />
    </div>
  );
};

export default Ciclo;

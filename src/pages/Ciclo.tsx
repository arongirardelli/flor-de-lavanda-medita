import { useState, useEffect } from 'react';
import BottomNavigation from '@/components/BottomNavigation';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthProvider';
import { useCycleData } from '@/hooks/useCycleData';
import { useCycleStats } from '@/hooks/useCycleStats';
import { CycleHeader } from '@/components/cycle/CycleHeader';
import { CycleTabs } from '@/components/cycle/CycleTabs';

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
  
  const { 
    averageCycleLength, 
    lastPeriodDuration, 
    currentPhase, 
    daysUntilNextPeriod 
  } = useCycleStats(cycles);
  
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
        
        <CycleTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          cycles={cycles}
          currentPhase={currentPhase}
          daysUntilNextPeriod={daysUntilNextPeriod}
          averageCycleLength={averageCycleLength}
          lastPeriodDuration={lastPeriodDuration}
          symptoms={symptoms}
          onCycleCalculated={handleCycleCalculated}
          onAddSymptoms={handleAddSymptoms}
        />
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Ciclo;

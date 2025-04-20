
import { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ptBR } from 'date-fns/locale';
import { DayContent, DayContentProps } from 'react-day-picker';
import { supabase } from '@/integrations/supabase/client';
import { AddSymptomsDialog } from './AddSymptomsDialog';
import { toast } from 'sonner';
import { useAuth } from '@/components/AuthProvider';

interface MenstrualCalendarProps {
  onDateSelect?: (date: Date) => void;
}

interface CycleData {
  start_date: string;
  end_date: string | null;
}

const MenstrualCalendar = ({ onDateSelect }: MenstrualCalendarProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [cycles, setCycles] = useState<CycleData[]>([]);
  const [symptomsDialogOpen, setSymptomsDialogOpen] = useState(false);
  const { user } = useAuth();
  
  // Fetch user's menstrual cycles
  useEffect(() => {
    const fetchCycles = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('menstrual_cycles')
        .select('start_date, end_date')
        .eq('user_id', user.id)
        .order('start_date', { ascending: false });
        
      if (error) {
        toast.error('Erro ao carregar dados do ciclo');
        console.error('Error fetching cycles:', error);
        return;
      }
      
      if (data) {
        setCycles(data);
      }
    };
    
    fetchCycles();
  }, [user]);
  
  // Check if a date is in menstruation period
  const isMenstruation = (date: Date) => {
    return cycles.some(cycle => {
      const start = new Date(cycle.start_date);
      const end = cycle.end_date ? new Date(cycle.end_date) : new Date(start);
      end.setDate(end.getDate() + 5); // Default to 5 days if no end date
      
      return date >= start && date <= end;
    });
  };
  
  // Calculate fertile and ovulation days based on the latest cycle
  const getReproductiveDays = (date: Date) => {
    if (cycles.length === 0) return { isOvulation: false, isFertile: false };
    
    const latestCycle = new Date(cycles[0].start_date);
    const ovulationDate = new Date(latestCycle);
    ovulationDate.setDate(latestCycle.getDate() + 14); // Ovulation typically occurs 14 days before next period
    
    const isOvulation = date.getTime() === ovulationDate.getTime();
    
    const threeDaysMs = 3 * 24 * 60 * 60 * 1000;
    const dateTime = date.getTime();
    const ovulationTime = ovulationDate.getTime();
    
    const isFertile = dateTime >= (ovulationTime - threeDaysMs) && 
                     dateTime <= (ovulationTime + threeDaysMs) &&
                     !isOvulation;
                     
    return { isOvulation, isFertile };
  };
  
  // Handle date selection
  const handleSelect = async (newDate: Date | undefined) => {
    setDate(newDate);
    if (newDate && onDateSelect) {
      onDateSelect(newDate);
    }
    
    // If selected date is today, show symptoms dialog
    if (newDate && newDate.toDateString() === new Date().toDateString()) {
      setSymptomsDialogOpen(true);
    }
  };
  
  // Handle start/end period
  const handlePeriodToggle = async () => {
    if (!date || !user) {
      toast.error('Você precisa estar logado para registrar seu período');
      return;
    }
    
    const today = date.toISOString().split('T')[0];
    const existingPeriod = cycles.find(c => 
      new Date(c.start_date).toISOString().split('T')[0] === today
    );
    
    try {
      if (existingPeriod) {
        // End period
        const { error } = await supabase
          .from('menstrual_cycles')
          .update({ end_date: today })
          .eq('start_date', today)
          .eq('user_id', user.id);
          
        if (error) throw error;
      } else {
        // Start period
        const { error } = await supabase
          .from('menstrual_cycles')
          .insert({ 
            start_date: today,
            user_id: user.id 
          });
          
        if (error) throw error;
      }
      
      // Refresh cycles
      const { data, error } = await supabase
        .from('menstrual_cycles')
        .select('start_date, end_date')
        .eq('user_id', user.id)
        .order('start_date', { ascending: false });
        
      if (error) throw error;
      
      if (data) {
        setCycles(data);
        toast.success('Período atualizado com sucesso!');
      }
    } catch (error) {
      console.error('Error updating period:', error);
      toast.error('Erro ao atualizar período. Tente novamente.');
    }
  };
  
  // Custom day renderer
  const CustomDay = (props: DayContentProps) => {
    const { date: dayDate, ...rest } = props;
    
    if (!dayDate) return <DayContent {...props} />;
    
    let className = "";
    const { isOvulation, isFertile } = getReproductiveDays(dayDate);
    
    if (isMenstruation(dayDate)) {
      className = "bg-rosa-200 text-rosa-900 rounded-full";
    } else if (isOvulation) {
      className = "bg-lavanda-400 text-white rounded-full";
    } else if (isFertile) {
      className = "bg-lavanda-200 text-lavanda-800 rounded-full";
    }
    
    return (
      <div className={className}>
        <DayContent {...props} />
      </div>
    );
  };
  
  return (
    <Card className="p-4">
      <h3 className="text-lavanda-800 font-medium mb-4">Seu Ciclo Menstrual</h3>
      
      <Calendar
        mode="single"
        selected={date}
        onSelect={handleSelect}
        locale={ptBR}
        components={{ DayContent: CustomDay }}
        className="rounded-md border"
      />
      
      <div className="mt-4 space-y-4">
        {date && (
          <Button 
            onClick={handlePeriodToggle}
            variant="outline" 
            className="w-full"
          >
            {isMenstruation(date) ? 'Finalizar Período' : 'Iniciar Período'}
          </Button>
        )}
        
        <Button 
          onClick={() => setSymptomsDialogOpen(true)}
          className="w-full bg-lavanda-500 hover:bg-lavanda-600"
        >
          Adicionar sintomas hoje
        </Button>
        
        <div className="flex space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-rosa-300 mr-1"></div>
            <span className="text-xs">Menstruação</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-lavanda-400 mr-1"></div>
            <span className="text-xs">Ovulação</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-lavanda-200 mr-1"></div>
            <span className="text-xs">Fértil</span>
          </div>
        </div>
      </div>
      
      <AddSymptomsDialog
        open={symptomsDialogOpen}
        onOpenChange={setSymptomsDialogOpen}
        date={date || new Date()}
      />
    </Card>
  );
};

export default MenstrualCalendar;


import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ptBR } from 'date-fns/locale';
import { AddSymptomsDialog } from './AddSymptomsDialog';
import { useAuth } from '@/components/AuthProvider';
import { useCycleData } from '@/hooks/useCycleData';
import { CustomDay } from './calendar/CustomDay';
import { CycleLegend } from './calendar/CycleLegend';
import { isMenstruation } from '@/utils/cycleCalculations';

interface MenstrualCalendarProps {
  onDateSelect?: (date: Date) => void;
}

const MenstrualCalendar = ({ onDateSelect }: MenstrualCalendarProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [symptomsDialogOpen, setSymptomsDialogOpen] = useState(false);
  const { user } = useAuth();
  const { cycles, handlePeriodToggle } = useCycleData();

  const handleSelect = async (newDate: Date | undefined) => {
    if (!newDate) return;
    
    setDate(newDate);
    if (onDateSelect) {
      onDateSelect(newDate);
    }
  };

  return (
    <Card className="p-4">
      <h3 className="text-lavanda-800 font-medium mb-4">Seu Ciclo Menstrual</h3>
      
      <Calendar
        mode="single"
        selected={date}
        onSelect={handleSelect}
        locale={ptBR}
        components={{
          DayContent: (props) => {
            const dayDate = props.date;
            if (!dayDate || !(dayDate instanceof Date)) {
              return null;
            }
            
            return (
              <CustomDay
                {...props}
                date={dayDate}
                cycles={cycles}
              />
            );
          }
        }}
        className="rounded-md border"
      />
      
      <div className="mt-4 space-y-4">
        {date && user && (
          <Button 
            onClick={() => handlePeriodToggle(date, user.id)}
            variant="outline" 
            className="w-full"
          >
            {isMenstruation(date, cycles) ? 'Finalizar Período' : 'Iniciar Período'}
          </Button>
        )}
        
        <Button 
          onClick={() => setSymptomsDialogOpen(true)}
          className="w-full bg-lavanda-500 hover:bg-lavanda-600"
        >
          Adicionar sintomas hoje
        </Button>
        
        <CycleLegend />
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


import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ptBR } from 'date-fns/locale';
import { CustomDay } from './calendar/CustomDay';
import { CycleLegend } from './calendar/CycleLegend';

const MenstrualCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [cycleStartDate, setCycleStartDate] = useState<Date | null>(null);
  
  const handleSelect = (newDate: Date | undefined) => {
    if (!newDate) return;
    setSelectedDate(newDate);
  };

  const handleStartPeriod = () => {
    if (selectedDate) {
      setCycleStartDate(selectedDate);
    }
  };

  return (
    <Card className="p-4 max-w-md mx-auto">
      <h3 className="text-lavanda-800 font-medium mb-4">Seu Ciclo Menstrual</h3>
      
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={handleSelect}
        locale={ptBR}
        components={{
          DayContent: (props) => {
            const today = new Date();
            const isToday = props.date && 
              today.getDate() === props.date.getDate() &&
              today.getMonth() === props.date.getMonth() &&
              today.getFullYear() === props.date.getFullYear();
              
            return (
              <CustomDay
                {...props}
                date={props.date}
                cycleStartDate={cycleStartDate}
                isToday={isToday}
              />
            );
          }
        }}
        className="rounded-md border"
      />
      
      <div className="mt-4 space-y-4">
        <Button 
          onClick={handleStartPeriod}
          className="w-full bg-lavanda-500 hover:bg-lavanda-600"
        >
          {cycleStartDate ? 'Atualizar Início do Período' : 'Iniciar Período'}
        </Button>
        
        <CycleLegend />
      </div>
    </Card>
  );
};

export default MenstrualCalendar;


import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { ptBR } from 'date-fns/locale';

interface MenstrualCalendarProps {
  onDateSelect?: (date: Date) => void;
}

const MenstrualCalendar = ({ onDateSelect }: MenstrualCalendarProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Simulated menstrual cycle data (in a real app this would come from user data)
  const cycleStart = new Date(2025, 3, 5);
  const cycleEnd = new Date(2025, 3, 11);
  const ovulationDate = new Date(2025, 3, 19);
  const nextCycleStart = new Date(2025, 4, 3);
  
  // Check if a date is in menstruation period
  const isMenstruation = (date: Date) => {
    return date >= cycleStart && date <= cycleEnd;
  };
  
  // Check if a date is an ovulation day
  const isOvulation = (date: Date) => {
    return date.getDate() === ovulationDate.getDate() && 
           date.getMonth() === ovulationDate.getMonth() && 
           date.getFullYear() === ovulationDate.getFullYear();
  };
  
  // Check if a date is fertile (3 days before and after ovulation)
  const isFertile = (date: Date) => {
    const ovulationTime = ovulationDate.getTime();
    const dateTime = date.getTime();
    const threeDaysMs = 3 * 24 * 60 * 60 * 1000;
    
    return dateTime >= (ovulationTime - threeDaysMs) && 
           dateTime <= (ovulationTime + threeDaysMs) &&
           !isOvulation(date);
  };
  
  // Calculate current cycle phase
  const getCurrentPhase = () => {
    const today = new Date();
    
    if (isMenstruation(today)) {
      return "Menstrual";
    } else if (today > cycleEnd && today < ovulationDate) {
      return "Folicular";
    } else if (isOvulation(today) || isFertile(today)) {
      return "Ovulatória";
    } else {
      return "Lútea";
    }
  };
  
  // Get text based on current phase
  const getPhaseText = () => {
    const phase = getCurrentPhase();
    
    switch (phase) {
      case "Menstrual":
        return "Fase de introspecção e descanso. Cuide-se com carinho.";
      case "Folicular":
        return "Fase de renovação e criatividade. Bom momento para iniciar novos projetos.";
      case "Ovulatória":
        return "Fase de energia máxima e comunicação. Aproveite para atividades sociais.";
      case "Lútea":
        return "Fase pré-menstrual. Foque em auto-cuidado e observe suas emoções.";
      default:
        return "";
    }
  };
  
  // Handle date selection
  const handleSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    if (newDate && onDateSelect) {
      onDateSelect(newDate);
    }
  };
  
  // Custom day renderer
  const dayRender = (day: Date) => {
    let className = "";
    
    if (isMenstruation(day)) {
      className = "bg-rosa-200 text-rosa-900 rounded-full";
    } else if (isOvulation(day)) {
      className = "bg-lavanda-400 text-white rounded-full";
    } else if (isFertile(day)) {
      className = "bg-lavanda-200 text-lavanda-800 rounded-full";
    }
    
    return <div className={className}>{day.getDate()}</div>;
  };
  
  return (
    <Card className="p-4">
      <h3 className="text-lavanda-800 font-medium mb-4">Seu Ciclo Menstrual</h3>
      
      <Calendar
        mode="single"
        selected={date}
        onSelect={handleSelect}
        locale={ptBR}
        // @ts-ignore - We're extending the component with our custom day rendering
        components={{
          Day: dayRender,
        }}
        className="rounded-md border"
      />
      
      <div className="mt-4 space-y-2">
        <h4 className="font-medium text-sm">Fase atual: <span className="text-lavanda-700">{getCurrentPhase()}</span></h4>
        <p className="text-sm text-lavanda-600">{getPhaseText()}</p>
        
        <div className="flex space-x-4 mt-3">
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
    </Card>
  );
};

export default MenstrualCalendar;

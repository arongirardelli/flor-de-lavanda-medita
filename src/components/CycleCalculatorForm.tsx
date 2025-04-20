import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthProvider';
import { toast } from 'sonner';

interface CycleCalculatorFormProps {
  onCalculate: () => void;
}

export function CycleCalculatorForm({ onCalculate }: CycleCalculatorFormProps) {
  const [lastPeriodDate, setLastPeriodDate] = useState<Date | undefined>(undefined);
  const [cycleLength, setCycleLength] = useState("28");
  const [periodDuration, setPeriodDuration] = useState("5");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const { user } = useAuth();

  const cycleLengthOptions = Array.from({ length: 15 }, (_, i) => (21 + i).toString());
  const periodDurationOptions = Array.from({ length: 10 }, (_, i) => (3 + i).toString());

  const handleDateSelect = (date: Date | undefined) => {
    setLastPeriodDate(date);
    setIsCalendarOpen(false);
  };

  const clearPreviousCycles = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('menstrual_cycles')
        .delete()
        .eq('user_id', userId);
        
      if (error) throw error;
    } catch (error) {
      console.error('Error clearing previous cycles:', error);
      toast.error('Erro ao limpar ciclos anteriores.');
      throw error;
    }
  };

  const calculateCycleDates = (startDate: Date, cycleLen: number, periodLen: number) => {
    const dates = [];
    const cycleDuration = parseInt(cycleLen.toString());
    const periodDuration = parseInt(periodLen.toString());
    
    const currentCycle = new Date(startDate);
    dates.push({
      start_date: new Date(currentCycle),
      end_date: new Date(new Date(currentCycle).setDate(currentCycle.getDate() + periodDuration - 1))
    });
    
    for (let i = 1; i <= 2; i++) {
      const nextCycleStart = new Date(new Date(startDate).setDate(startDate.getDate() + (cycleDuration * i)));
      const nextCycleEnd = new Date(new Date(nextCycleStart).setDate(nextCycleStart.getDate() + periodDuration - 1));
      
      dates.push({
        start_date: nextCycleStart,
        end_date: nextCycleEnd
      });
    }
    
    return dates;
  };

  const handleSubmit = async () => {
    if (!lastPeriodDate || !user) {
      toast.error('Por favor, preencha a data do último período');
      return;
    }

    try {
      await clearPreviousCycles(user.id);
      
      const cycleDates = calculateCycleDates(
        lastPeriodDate, 
        parseInt(cycleLength), 
        parseInt(periodDuration)
      );
      
      for (const cycle of cycleDates) {
        const { error } = await supabase
          .from('menstrual_cycles')
          .insert({
            start_date: cycle.start_date.toISOString().split('T')[0],
            end_date: cycle.end_date.toISOString().split('T')[0],
            user_id: user.id
          });

        if (error) throw error;
      }

      toast.success('Ciclo calculado e registrado com sucesso!');
      onCalculate();
    } catch (error) {
      console.error('Error saving cycle:', error);
      toast.error('Erro ao salvar o ciclo. Tente novamente.');
    }
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow-sm">
      <h3 className="text-lg font-medium mb-4">Calcular Próximo Ciclo</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">1º dia da última menstruação</label>
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !lastPeriodDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {lastPeriodDate ? format(lastPeriodDate, "dd/MM/yyyy") : "Selecione uma data"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={lastPeriodDate}
                onSelect={handleDateSelect}
                locale={ptBR}
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Tamanho do ciclo em dias (média)</label>
          <Select value={cycleLength} onValueChange={setCycleLength}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tamanho do ciclo" />
            </SelectTrigger>
            <SelectContent>
              {cycleLengthOptions.map((days) => (
                <SelectItem key={days} value={days}>
                  {days} dias
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Duração da menstruação em dias</label>
          <Select value={periodDuration} onValueChange={setPeriodDuration}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a duração" />
            </SelectTrigger>
            <SelectContent>
              {periodDurationOptions.map((days) => (
                <SelectItem key={days} value={days}>
                  {days} dias
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button 
          className="w-full bg-lavanda-500 hover:bg-lavanda-600" 
          onClick={handleSubmit}
        >
          Calcular Ciclo
        </Button>
      </div>
    </div>
  );
}

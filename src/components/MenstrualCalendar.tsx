
import { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ptBR } from 'date-fns/locale';
import { CustomDay } from './calendar/CustomDay';
import { CycleLegend } from './calendar/CycleLegend';
import { AddSymptomsDialog } from './AddSymptomsDialog';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/components/AuthProvider';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Trash2 } from 'lucide-react';

const MenstrualCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [cycleStartDate, setCycleStartDate] = useState<Date | null>(null);
  const [showSymptomsDialog, setShowSymptomsDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { user } = useAuth();

  const fetchCycleStartDate = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('menstrual_cycles')
      .select('start_date')
      .eq('user_id', user.id)
      .order('start_date', { ascending: false })
      .limit(1);
      
    if (error) {
      console.error('Error fetching cycle start date:', error);
      return;
    }
    
    if (data && data.length > 0) {
      setCycleStartDate(new Date(data[0].start_date));
    }
  };

  useEffect(() => {
    fetchCycleStartDate();
  }, [user]);

  const handleSelect = (newDate: Date | undefined) => {
    if (!newDate) return;
    setSelectedDate(newDate);
  };

  const handleStartPeriod = async () => {
    if (!selectedDate || !user) {
      toast.error('Por favor, selecione uma data e faça login');
      return;
    }

    try {
      const { error } = await supabase
        .from('menstrual_cycles')
        .insert({ 
          start_date: selectedDate.toISOString().split('T')[0],
          user_id: user.id 
        });
        
      if (error) throw error;
      
      setCycleStartDate(selectedDate);
      toast.success('Início do período registrado com sucesso!');
    } catch (error) {
      console.error('Erro ao registrar início do período:', error);
      toast.error('Não foi possível registrar o início do período');
    }
  };

  const handleDeleteCycles = async () => {
    if (!user) {
      toast.error('Você precisa estar logado');
      return;
    }

    try {
      const { error } = await supabase
        .from('menstrual_cycles')
        .delete()
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      setCycleStartDate(null);
      toast.success('Todos os registros de período foram excluídos');
    } catch (error) {
      console.error('Erro ao excluir registros:', error);
      toast.error('Não foi possível excluir os registros');
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
        
        <Button 
          onClick={() => setShowSymptomsDialog(true)}
          variant="outline"
          className="w-full border-lavanda-300 text-lavanda-700 hover:bg-lavanda-50"
        >
          Registrar sintomas hoje
        </Button>

        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogTrigger asChild>
            <Button 
              variant="destructive" 
              className="w-full border-red-300 text-red-700 hover:bg-red-50 flex items-center gap-2"
            >
              <Trash2 size={16} />
              Excluir Período
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
              <AlertDialogDescription>
                Todos os registros de ciclo anteriores serão excluídos. Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Não</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDeleteCycles}
                className="bg-red-500 hover:bg-red-600"
              >
                Sim, excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        
        <CycleLegend />
      </div>

      <AddSymptomsDialog
        open={showSymptomsDialog}
        onOpenChange={setShowSymptomsDialog}
        date={selectedDate || new Date()}
      />
    </Card>
  );
};

export default MenstrualCalendar;

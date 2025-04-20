
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/components/AuthProvider';

export interface CycleData {
  start_date: string;
  end_date: string | null;
}

export function useCycleData() {
  const [cycles, setCycles] = useState<CycleData[]>([]);
  const { user } = useAuth();

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

  const handlePeriodToggle = async (date: Date, userId: string) => {
    if (!userId) {
      toast.error('Você precisa estar logado para registrar seu período');
      return;
    }

    const today = date.toISOString().split('T')[0];
    const existingPeriod = cycles.find(c => 
      new Date(c.start_date).toISOString().split('T')[0] === today
    );

    try {
      if (existingPeriod) {
        const { error } = await supabase
          .from('menstrual_cycles')
          .update({ end_date: today })
          .eq('start_date', today)
          .eq('user_id', userId);
          
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('menstrual_cycles')
          .insert({ 
            start_date: today,
            user_id: userId 
          });
          
        if (error) throw error;
      }
      
      const { data, error } = await supabase
        .from('menstrual_cycles')
        .select('start_date, end_date')
        .eq('user_id', userId)
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

  return { cycles, handlePeriodToggle };
}

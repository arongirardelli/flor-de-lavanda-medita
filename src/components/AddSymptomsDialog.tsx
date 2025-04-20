
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthProvider';

interface AddSymptomsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  date: Date;
}

const commonSymptoms = [
  'Cólicas', 'Dor de cabeça', 'Irritabilidade', 'Cansaço',
  'Sensibilidade nos seios', 'Inchaço', 'Alterações no humor',
  'Dores nas costas', 'Acne', 'Enjoo'
];

export function AddSymptomsDialog({ open, onOpenChange, date }: AddSymptomsDialogProps) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const { user } = useAuth();
  
  // Carrega os sintomas existentes ao abrir o diálogo
  useEffect(() => {
    const loadExistingSymptoms = async () => {
      if (!open || !user || !date) return;
      
      try {
        const dateStr = date.toISOString().split('T')[0];
        
        const { data, error } = await supabase
          .from('cycle_symptoms')
          .select('symptoms, notes')
          .eq('user_id', user.id)
          .eq('date', dateStr)
          .maybeSingle();
          
        if (error) throw error;
        
        if (data) {
          setSelectedSymptoms(data.symptoms || []);
          setNotes(data.notes || '');
        } else {
          // Reset form if no existing data
          setSelectedSymptoms([]);
          setNotes('');
        }
      } catch (error) {
        console.error('Error loading symptoms:', error);
      }
    };
    
    loadExistingSymptoms();
  }, [open, user, date]);

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSubmit = async () => {
    try {
      if (!user) {
        toast.error('Você precisa estar logado para adicionar sintomas.');
        return;
      }
      
      if (!date || !(date instanceof Date)) {
        toast.error('Data inválida.');
        return;
      }
      
      const dateStr = date.toISOString().split('T')[0];
      
      // Verificar se já existe um registro para essa data
      const { data: existingData } = await supabase
        .from('cycle_symptoms')
        .select('id')
        .eq('user_id', user.id)
        .eq('date', dateStr)
        .maybeSingle();
        
      let error;
      
      if (existingData) {
        // Atualizar registro existente
        const { error: updateError } = await supabase
          .from('cycle_symptoms')
          .update({
            symptoms: selectedSymptoms,
            notes: notes.trim() || null
          })
          .eq('id', existingData.id);
          
        error = updateError;
      } else {
        // Inserir novo registro
        const { error: insertError } = await supabase
          .from('cycle_symptoms')
          .insert({
            date: dateStr,
            symptoms: selectedSymptoms,
            notes: notes.trim() || null,
            user_id: user.id
          });
          
        error = insertError;
      }

      if (error) throw error;

      toast.success('Sintomas registrados com sucesso!');
      onOpenChange(false);
    } catch (error) {
      toast.error('Erro ao registrar sintomas. Tente novamente.');
      console.error('Error adding symptoms:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Registrar Sintomas</DialogTitle>
          <DialogDescription>
            Registre os sintomas para o dia {date instanceof Date ? date.toLocaleDateString('pt-BR') : ''}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          <div className="flex flex-wrap gap-2">
            {commonSymptoms.map((symptom) => (
              <Button
                key={symptom}
                variant={selectedSymptoms.includes(symptom) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleSymptom(symptom)}
                className={selectedSymptoms.includes(symptom) ? "bg-lavanda-500" : ""}
              >
                {symptom}
              </Button>
            ))}
          </div>

          <div className="space-y-2">
            <label htmlFor="notes" className="text-sm font-medium">
              Notas adicionais
            </label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Adicione notas sobre como você está se sentindo..."
              className="h-32"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit}>
              Salvar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

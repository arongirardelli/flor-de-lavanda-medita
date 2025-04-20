
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthProvider';

const commonSymptoms = [
  'Cólicas', 'Dor de cabeça', 'Irritabilidade', 'Cansaço',
  'Sensibilidade nos seios', 'Inchaço', 'Alterações no humor',
  'Dores nas costas', 'Acne', 'Enjoo'
];

export function AddSymptomsDialog({ open, onOpenChange, date }: AddSymptomsDialogProps) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const { user } = useAuth();

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error('Você precisa estar logado para registrar sintomas');
      return;
    }

    try {
      const { error } = await supabase.from('cycle_symptoms').insert({
        user_id: user.id,
        date: date.toISOString().split('T')[0],
        symptoms: selectedSymptoms,
        notes: notes || null
      });

      if (error) throw error;

      toast.success('Sintomas registrados com sucesso!');
      onOpenChange(false);
      setSelectedSymptoms([]);
      setNotes('');
    } catch (error) {
      console.error('Erro ao registrar sintomas:', error);
      toast.error('Não foi possível registrar os sintomas');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Registrar Sintomas</DialogTitle>
          <DialogDescription>
            Registre os sintomas para o dia {date.toLocaleDateString('pt-BR')}
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

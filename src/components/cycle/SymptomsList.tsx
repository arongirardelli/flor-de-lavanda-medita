
import { Button } from '@/components/ui/button';

interface Symptom {
  day: string;
  date: string;
  symptoms: string[];
  notes?: string | null;
}

interface SymptomsListProps {
  symptoms: Symptom[];
  onAddSymptoms: () => void;
}

export function SymptomsList({ symptoms, onAddSymptoms }: SymptomsListProps) {
  return (
    <>
      <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
        <h3 className="text-lavanda-800 font-medium mb-3">Registro de Sintomas</h3>
        
        {symptoms.length > 0 ? (
          <div className="space-y-4">
            {symptoms.map((day, index) => (
              <div key={index} className="pb-3 border-b border-lavanda-100 last:border-0">
                <p className="font-medium text-lavanda-700 mb-2">{day.day}</p>
                {day.symptoms.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {day.symptoms.map((symptom, i) => (
                      <span key={i} className="bg-lavanda-100 text-lavanda-800 rounded-full px-3 py-1 text-xs">
                        {symptom}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 mb-2">Nenhum sintoma registrado</p>
                )}
                {day.notes && (
                  <p className="text-sm text-lavanda-700 italic mt-1">{day.notes}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center py-4 text-lavanda-600">
            Nenhum sintoma registrado ainda. Use o botão "Adicionar sintomas hoje" no calendário para começar.
          </p>
        )}
      </div>
      
      <Button 
        className="w-full bg-lavanda-500 hover:bg-lavanda-600 mt-4"
        onClick={onAddSymptoms}
      >
        Adicionar sintomas hoje
      </Button>
    </>
  );
}

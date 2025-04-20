
import { CycleData } from '@/hooks/useCycleData';

interface CycleStatsProps {
  cycles: CycleData[];
  currentPhase: string;
  daysUntilNextPeriod: number | string;
  averageCycleLength: number;
  lastPeriodDuration: number;
}

export function CycleStats({
  currentPhase,
  daysUntilNextPeriod,
  averageCycleLength,
  lastPeriodDuration
}: CycleStatsProps) {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
        <h3 className="text-lavanda-800 font-medium mb-3">Histórico do Ciclo</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between py-2 border-b border-lavanda-100">
            <span className="text-lavanda-700">Duração média do ciclo</span>
            <span className="font-medium text-lavanda-800">{averageCycleLength} dias</span>
          </div>
          <div className="flex justify-between py-2 border-b border-lavanda-100">
            <span className="text-lavanda-700">Duração da última menstruação</span>
            <span className="font-medium text-lavanda-800">{lastPeriodDuration} dias</span>
          </div>
          <div className="flex justify-between py-2 border-b border-lavanda-100">
            <span className="text-lavanda-700">Fase atual</span>
            <span className="font-medium text-lavanda-800">{currentPhase}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-lavanda-700">Próxima menstruação em</span>
            <span className="font-medium text-lavanda-800">
              {typeof daysUntilNextPeriod === 'number' ? `${daysUntilNextPeriod} dias` : daysUntilNextPeriod}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

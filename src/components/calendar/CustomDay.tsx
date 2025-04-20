
import { DayContent, DayContentProps } from 'react-day-picker';
import { isMenstruation, getReproductiveDays } from '@/utils/cycleCalculations';
import type { CycleData } from '@/hooks/useCycleData';

interface CustomDayProps extends DayContentProps {
  cycles: CycleData[];
}

export function CustomDay({ date, cycles, ...props }: CustomDayProps) {
  // Return early if there's no date
  if (!date) return <DayContent {...props} />;

  let className = "";
  const { isOvulation, isFertile } = getReproductiveDays(date, cycles);
  
  if (isMenstruation(date, cycles)) {
    className = "bg-rosa-200 text-rosa-900 rounded-full";
  } else if (isOvulation) {
    className = "bg-lavanda-400 text-white rounded-full";
  } else if (isFertile) {
    className = "bg-lavanda-200 text-lavanda-800 rounded-full";
  }
  
  return (
    <div className={className}>
      <DayContent {...props} />
    </div>
  );
}

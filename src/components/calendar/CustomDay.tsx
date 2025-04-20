
import { DayContent, DayContentProps } from 'react-day-picker';
import { isMenstruation, getReproductiveDays } from '@/utils/cycleCalculations';
import type { CycleData } from '@/hooks/useCycleData';

// Create a proper interface extending DayContentProps
interface CustomDayProps extends Omit<DayContentProps, 'date'> {
  date?: Date;
  cycles: CycleData[];
}

export function CustomDay({ date, cycles, ...props }: CustomDayProps) {
  // If there's no valid date, return the default day content
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return <DayContent {...props} />;
  }

  let className = "";
  
  try {
    const { isOvulation, isFertile } = getReproductiveDays(date, cycles);
    
    if (isMenstruation(date, cycles)) {
      className = "bg-rosa-200 text-rosa-900 rounded-full";
    } else if (isOvulation) {
      className = "bg-lavanda-400 text-white rounded-full";
    } else if (isFertile) {
      className = "bg-lavanda-200 text-lavanda-800 rounded-full";
    }
  } catch (error) {
    console.error("Error calculating day status:", error);
    // If there's an error calculating status, still render the day normally
  }
  
  return (
    <div className={className}>
      <DayContent {...props} />
    </div>
  );
}

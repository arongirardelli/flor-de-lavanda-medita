
import React from 'react';
import { DayContent, type DayContentProps, type ActiveModifiers } from 'react-day-picker';
import { isMenstruation, getReproductiveDays } from '@/utils/cycleCalculations';
import type { CycleData } from '@/hooks/useCycleData';

interface CustomDayProps extends Omit<DayContentProps, 'activeModifiers'> {
  date: Date;
  cycles: CycleData[];
  activeModifiers: ActiveModifiers;
  selectedDays?: Date[];
  isOutside?: boolean;
  isToday?: boolean;
}

export function CustomDay(props: CustomDayProps) {
  const { date, cycles, ...dayContentProps } = props;

  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return <DayContent {...dayContentProps} date={date} />;
  }

  let className = "";
  
  try {
    const { isOvulation, isFertile } = getReproductiveDays(date, cycles);
    
    if (isMenstruation(date, cycles)) {
      className = "bg-rosa-200 hover:bg-rosa-300 text-rosa-900 rounded-full";
    } else if (isOvulation) {
      className = "bg-lavanda-400 hover:bg-lavanda-500 text-white rounded-full";
    } else if (isFertile) {
      className = "bg-lavanda-200 hover:bg-lavanda-300 text-lavanda-800 rounded-full";
    }
  } catch (error) {
    console.error("Error calculating day status:", error);
  }
  
  return (
    <div className={className}>
      <DayContent {...dayContentProps} date={date} />
    </div>
  );
}

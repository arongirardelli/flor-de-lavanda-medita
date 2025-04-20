
import React from 'react';
import { DayContent, type DayContentProps } from 'react-day-picker';
import { cn } from "@/lib/utils";

interface CustomDayProps extends DayContentProps {
  date: Date;
  cycleStartDate: Date | null;
  isToday?: boolean;
}

export function CustomDay({ date, cycleStartDate, isToday, ...props }: CustomDayProps) {
  if (!date || !cycleStartDate) {
    return <DayContent {...props} date={date} />;
  }

  const dayDiff = Math.floor((date.getTime() - cycleStartDate.getTime()) / (1000 * 60 * 60 * 24));
  
  let className = "";
  
  // Menstruation days (1-5)
  if (dayDiff >= 0 && dayDiff < 5) {
    className = "bg-[#F9C5D1] text-rosa-900 rounded-full";
  }
  // Ovulation day (14)
  else if (dayDiff === 13) {
    className = "bg-[#B084CC] text-white rounded-full";
  }
  // Fertile days (12-16)
  else if (dayDiff >= 11 && dayDiff <= 15) {
    className = "bg-[#D8C8F2] text-lavanda-800 rounded-full";
  }
  
  // Add today marker
  if (isToday) {
    className = cn(className, "ring-2 ring-lavanda-500");
  }

  return (
    <div className={className}>
      <DayContent {...props} date={date} />
    </div>
  );
}

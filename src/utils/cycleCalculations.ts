
export const isMenstruation = (date: Date, cycles: { start_date: string; end_date: string | null }[]) => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return false;
  }
  
  return cycles.some(cycle => {
    const start = new Date(cycle.start_date);
    const end = cycle.end_date ? new Date(cycle.end_date) : new Date(start);
    end.setDate(end.getDate() + 5); // Default to 5 days if no end date
    
    return date >= start && date <= end;
  });
};

export const getReproductiveDays = (date: Date, cycles: { start_date: string; end_date: string | null }[]) => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime()) || !cycles || cycles.length === 0) {
    return { isOvulation: false, isFertile: false };
  }
  
  try {
    const latestCycle = new Date(cycles[0].start_date);
    
    // Ensure latestCycle is a valid date
    if (isNaN(latestCycle.getTime())) {
      return { isOvulation: false, isFertile: false };
    }
    
    const ovulationDate = new Date(latestCycle);
    ovulationDate.setDate(latestCycle.getDate() + 14); // Ovulation typically occurs 14 days before next period
    
    // Compare dates by converting to date string to ignore time
    const isOvulation = date.toDateString() === ovulationDate.toDateString();
    
    const threeDaysMs = 3 * 24 * 60 * 60 * 1000;
    const dateTime = date.getTime();
    const ovulationTime = ovulationDate.getTime();
    
    const isFertile = dateTime >= (ovulationTime - threeDaysMs) && 
                     dateTime <= (ovulationTime + threeDaysMs) &&
                     !isOvulation;
                     
    return { isOvulation, isFertile };
  } catch (error) {
    console.error("Error in getReproductiveDays:", error);
    return { isOvulation: false, isFertile: false };
  }
};

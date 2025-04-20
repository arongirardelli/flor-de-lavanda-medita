
export const isMenstruation = (date: Date, cycles: { start_date: string; end_date: string | null }[]) => {
  return cycles.some(cycle => {
    const start = new Date(cycle.start_date);
    const end = cycle.end_date ? new Date(cycle.end_date) : new Date(start);
    end.setDate(end.getDate() + 5); // Default to 5 days if no end date
    
    return date >= start && date <= end;
  });
};

export const getReproductiveDays = (date: Date, cycles: { start_date: string; end_date: string | null }[]) => {
  if (cycles.length === 0) return { isOvulation: false, isFertile: false };
  
  const latestCycle = new Date(cycles[0].start_date);
  const ovulationDate = new Date(latestCycle);
  ovulationDate.setDate(latestCycle.getDate() + 14); // Ovulation typically occurs 14 days before next period
  
  const isOvulation = date.getTime() === ovulationDate.getTime();
  
  const threeDaysMs = 3 * 24 * 60 * 60 * 1000;
  const dateTime = date.getTime();
  const ovulationTime = ovulationDate.getTime();
  
  const isFertile = dateTime >= (ovulationTime - threeDaysMs) && 
                   dateTime <= (ovulationTime + threeDaysMs) &&
                   !isOvulation;
                   
  return { isOvulation, isFertile };
};

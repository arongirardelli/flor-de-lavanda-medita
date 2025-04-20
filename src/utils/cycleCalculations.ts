
export const isMenstruation = (date: Date, cycles: { start_date: string; end_date: string | null }[]) => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return false;
  }
  
  const dateString = date.toISOString().split('T')[0];
  
  return cycles.some(cycle => {
    if (!cycle.start_date) return false;
    
    const start = new Date(cycle.start_date);
    const end = cycle.end_date ? new Date(cycle.end_date) : new Date(start);
    
    if (!cycle.end_date) {
      end.setDate(start.getDate() + 5);
    }
    
    const startString = start.toISOString().split('T')[0];
    const endString = end.toISOString().split('T')[0];
    
    return dateString >= startString && dateString <= endString;
  });
};

export const getReproductiveDays = (date: Date, cycles: { start_date: string; end_date: string | null }[]) => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime()) || !cycles || cycles.length === 0) {
    return { isOvulation: false, isFertile: false };
  }
  
  try {
    const sortedCycles = [...cycles].sort((a, b) => 
      new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
    );
    
    const latestCycle = new Date(sortedCycles[0].start_date);
    
    if (isNaN(latestCycle.getTime())) {
      return { isOvulation: false, isFertile: false };
    }
    
    const ovulationDate = new Date(latestCycle);
    ovulationDate.setDate(latestCycle.getDate() + 14);
    
    const dateStr = date.toISOString().split('T')[0];
    const ovulationStr = ovulationDate.toISOString().split('T')[0];
    
    const isOvulation = dateStr === ovulationStr;
    
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

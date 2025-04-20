
export const isMenstruation = (date: Date, cycles: { start_date: string; end_date: string | null }[]) => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return false;
  }
  
  const formattedDate = date.toISOString().split('T')[0];
  
  return cycles.some(cycle => {
    if (!cycle.start_date) return false;
    
    const start = new Date(cycle.start_date);
    const end = cycle.end_date ? new Date(cycle.end_date) : new Date(start);
    
    if (!cycle.end_date) {
      end.setDate(start.getDate() + 5);
    }
    
    const startString = start.toISOString().split('T')[0];
    const endString = end.toISOString().split('T')[0];
    
    return formattedDate >= startString && formattedDate <= endString;
  });
};

export const getReproductiveDays = (date: Date, cycles: { start_date: string; end_date: string | null }[]) => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime()) || !cycles || cycles.length === 0) {
    return { isOvulation: false, isFertile: false };
  }
  
  try {
    // Sort cycles by most recent first
    const sortedCycles = [...cycles].sort((a, b) => 
      new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
    );
    
    // Get the most recent cycle start date
    const latestCycleStart = new Date(sortedCycles[0].start_date);
    
    if (isNaN(latestCycleStart.getTime())) {
      return { isOvulation: false, isFertile: false };
    }
    
    // Calculate the average cycle length from past cycles
    let cycleLength = 28; // Default
    if (sortedCycles.length >= 2) {
      const cycleLengths = [];
      for (let i = 0; i < sortedCycles.length - 1; i++) {
        const currentStart = new Date(sortedCycles[i].start_date);
        const nextStart = new Date(sortedCycles[i + 1].start_date);
        const daysDiff = Math.floor((currentStart.getTime() - nextStart.getTime()) / (1000 * 60 * 60 * 24));
        if (daysDiff > 0 && daysDiff < 60) { // Realistic cycle length
          cycleLengths.push(daysDiff);
        }
      }
      
      if (cycleLengths.length > 0) {
        cycleLength = Math.round(cycleLengths.reduce((a, b) => a + b, 0) / cycleLengths.length);
      }
    }
    
    // Calculate ovulation date (typically 14 days before the next period)
    const nextPeriodStart = new Date(latestCycleStart);
    nextPeriodStart.setDate(latestCycleStart.getDate() + cycleLength);
    
    const ovulationDate = new Date(nextPeriodStart);
    ovulationDate.setDate(nextPeriodStart.getDate() - 14);
    
    // Check if the current date is the ovulation date
    const formattedDate = date.toISOString().split('T')[0];
    const formattedOvulationDate = ovulationDate.toISOString().split('T')[0];
    
    const isOvulation = formattedDate === formattedOvulationDate;
    
    // Check if the current date is within the fertile window (3 days before and after ovulation)
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

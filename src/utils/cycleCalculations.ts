
export const isMenstruation = (date: Date, cycles: { start_date: string; end_date: string | null }[]) => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return false;
  }
  
  // Convert to date strings for comparison (ignoring time)
  const dateString = date.toISOString().split('T')[0];
  
  return cycles.some(cycle => {
    // Ensure both dates are defined before attempting comparison
    if (!cycle.start_date) return false;
    
    const start = new Date(cycle.start_date);
    // If end_date is null, use start date + 5 days as default
    const end = cycle.end_date ? new Date(cycle.end_date) : new Date(start);
    
    if (!cycle.end_date) {
      end.setDate(start.getDate() + 5); // Default to 5 days if no end date
    }
    
    // Convert to strings for comparison
    const startString = start.toISOString().split('T')[0];
    const endString = end.toISOString().split('T')[0];
    
    // Check if the date falls between start and end (inclusive)
    return dateString >= startString && dateString <= endString;
  });
};

export const getReproductiveDays = (date: Date, cycles: { start_date: string; end_date: string | null }[]) => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime()) || !cycles || cycles.length === 0) {
    return { isOvulation: false, isFertile: false };
  }
  
  try {
    // Sort cycles by start_date (most recent first)
    const sortedCycles = [...cycles].sort((a, b) => 
      new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
    );
    
    const latestCycle = new Date(sortedCycles[0].start_date);
    
    // Ensure latestCycle is a valid date
    if (isNaN(latestCycle.getTime())) {
      return { isOvulation: false, isFertile: false };
    }
    
    // Calculate ovulation (typically 14 days before next period)
    const ovulationDate = new Date(latestCycle);
    ovulationDate.setDate(latestCycle.getDate() + 14);
    
    // Compare dates by converting to date string to ignore time
    const dateStr = date.toISOString().split('T')[0];
    const ovulationStr = ovulationDate.toISOString().split('T')[0];
    
    const isOvulation = dateStr === ovulationStr;
    
    // Fertile window is typically 3 days before and after ovulation
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

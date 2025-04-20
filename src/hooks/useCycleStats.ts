
import { CycleData } from './useCycleData';

interface CycleStats {
  averageCycleLength: number;
  lastPeriodDuration: number;
  currentPhase: string;
  daysUntilNextPeriod: number | string;
}

export function useCycleStats(cycles: CycleData[]): CycleStats {
  if (!cycles || cycles.length === 0) {
    return {
      averageCycleLength: 28,
      lastPeriodDuration: 5,
      currentPhase: "Desconhecido",
      daysUntilNextPeriod: "Desconhecido"
    };
  }
  
  // Sort cycles by most recent first
  const sortedCycles = [...cycles].sort((a, b) => 
    new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
  );
  
  // Calculate last period duration
  const lastCycle = sortedCycles[0];
  const lastStart = new Date(lastCycle.start_date);
  const lastEnd = lastCycle.end_date ? new Date(lastCycle.end_date) : new Date(lastStart);
  if (!lastCycle.end_date) {
    lastEnd.setDate(lastStart.getDate() + 5);
  }
  
  const lastPeriodDuration = Math.floor((lastEnd.getTime() - lastStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  
  // Calculate average cycle length
  let averageCycleLength = 28;
  if (sortedCycles.length >= 2) {
    const cycleLengths = [];
    for (let i = 0; i < sortedCycles.length - 1; i++) {
      const currentStart = new Date(sortedCycles[i].start_date);
      const nextStart = new Date(sortedCycles[i + 1].start_date);
      const daysDiff = Math.floor((currentStart.getTime() - nextStart.getTime()) / (1000 * 60 * 60 * 24));
      if (daysDiff > 0 && daysDiff < 60) { // Only consider realistic cycle lengths
        cycleLengths.push(daysDiff);
      }
    }
    
    if (cycleLengths.length > 0) {
      averageCycleLength = Math.round(cycleLengths.reduce((a, b) => a + b, 0) / cycleLengths.length);
    }
  }
  
  // Calculate current phase and days until next period
  const today = new Date();
  const daysSinceLastPeriod = Math.floor((today.getTime() - lastStart.getTime()) / (1000 * 60 * 60 * 24));
  
  let currentPhase;
  let daysUntilNextPeriod;
  
  if (daysSinceLastPeriod < lastPeriodDuration) {
    currentPhase = "Menstrual";
    daysUntilNextPeriod = averageCycleLength;
  } else if (daysSinceLastPeriod < 14) {
    currentPhase = "Folicular";
    daysUntilNextPeriod = averageCycleLength - daysSinceLastPeriod;
  } else if (daysSinceLastPeriod === 14) {
    currentPhase = "Ovulatória";
    daysUntilNextPeriod = averageCycleLength - daysSinceLastPeriod;
  } else {
    currentPhase = "Lútea";
    daysUntilNextPeriod = averageCycleLength - daysSinceLastPeriod;
  }
  
  // Ensure we don't return negative days
  if (typeof daysUntilNextPeriod === 'number' && daysUntilNextPeriod < 0) {
    // If days are negative, it means the next period is due
    daysUntilNextPeriod = 0;
  }
  
  return {
    averageCycleLength,
    lastPeriodDuration,
    currentPhase,
    daysUntilNextPeriod
  };
}

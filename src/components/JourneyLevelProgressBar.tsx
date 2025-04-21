
import { Progress } from "@/components/ui/progress";
import { Award } from "lucide-react";
import React from "react";

const LEVELS = [
  { label: "Iniciante", min: 0, motivation: "O início de toda jornada começa com um passo. Continue!" },
  { label: "Exploradora", min: 30, motivation: "Você está explorando novos caminhos. Siga firme!" },
  { label: "Meditante Tranquila", min: 120, motivation: "Sua calma inspira! Mantenha sua prática constante." },
  { label: "Guardiã do Equilíbrio", min: 400, motivation: "Parabéns! Você é exemplo de dedicação e equilíbrio." },
];

interface Props {
  weeklyMinutes: number;
  lastUpdate: string | null;
}

export function JourneyLevelProgressBar({ weeklyMinutes, lastUpdate }: Props) {
  // Define início da semana (domingo) e se precisa resetar
  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());
  let needReset = false;
  if (lastUpdate) {
    const last = new Date(lastUpdate);
    // Zera se última atualização não é da semana atual
    needReset = last < weekStart;
  }
  const minutes = needReset ? 0 : weeklyMinutes;

  // Encontra o level correspondente e o próximo
  const currentLevel = LEVELS.slice().reverse().find(lvl => minutes >= lvl.min) || LEVELS[0];
  const nextLevel = LEVELS.find(lvl => lvl.min > minutes);
  const maxForBar = nextLevel ? nextLevel.min : LEVELS[LEVELS.length-1].min + 120;
  const progress = Math.min((minutes / maxForBar) * 100, 100);

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
      <div className="flex items-center gap-2 mb-1">
        <Award size={18} className="text-lavanda-600" />
        <span className="font-medium text-lavanda-800">Níveis da Jornada</span>
      </div>
      <span className="inline-block px-2 py-1 mb-2 bg-lavanda-100 text-lavanda-700 rounded-lg font-semibold text-sm">{currentLevel.label}</span>
      <Progress value={progress} className="h-3 mb-2" />
      <div className="flex justify-between text-xs mb-1">
        <span>{minutes} min</span>
        <span>{nextLevel ? `${nextLevel.min} min` : ''}</span>
      </div>
      <p className="text-center text-xs text-lavanda-600 italic">{currentLevel.motivation}</p>
    </div>
  );
}

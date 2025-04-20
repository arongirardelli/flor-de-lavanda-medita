
import { Award } from "lucide-react";

const JOURNEY_LEVELS = [
  { label: "Iniciante", min: 0 },
  { label: "Exploradora", min: 30 },
  { label: "Meditante Tranquila", min: 120 },
  { label: "Guardiã do Equilíbrio", min: 400 },
];

interface Props {
  progressMinutes: number;
}

export const ProfileLevelSection = ({ progressMinutes }: Props) => {
  const userLevel = JOURNEY_LEVELS
    .slice().reverse()
    .find(lvl => progressMinutes >= lvl.min)?.label || JOURNEY_LEVELS[0].label;

  return (
    <div>
      <p className="font-semibold mb-2 flex items-center gap-1 text-lavanda-700">
        <Award size={14} /> Nível da Jornada
      </p>
      <div className="mb-1">
        <span className="inline-block px-2 py-1 bg-lavanda-100 text-lavanda-700 rounded-lg font-semibold text-sm">{userLevel}</span>
      </div>
      <p className="text-xs text-lavanda-400">Baseado no total de minutos de meditação registrados.</p>
    </div>
  );
};

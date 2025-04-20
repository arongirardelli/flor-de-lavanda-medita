
import { Clock, Moon, Award } from 'lucide-react';

type ProfileStatsProps = {
  userActivity: {
    totalMinutes: number;
    totalSessions: number;
    streak: number;
  };
};

export function ProfileStats({ userActivity }: ProfileStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="bg-white rounded-xl p-3 shadow-sm flex flex-col items-center">
        <Clock size={20} className="text-lavanda-500 mb-1" />
        <span className="text-lg font-medium text-lavanda-800">{userActivity.totalMinutes}</span>
        <span className="text-xs text-lavanda-600">Minutos</span>
      </div>
      <div className="bg-white rounded-xl p-3 shadow-sm flex flex-col items-center">
        <Moon size={20} className="text-lavanda-500 mb-1" />
        <span className="text-lg font-medium text-lavanda-800">{userActivity.totalSessions}</span>
        <span className="text-xs text-lavanda-600">Sessões</span>
      </div>
      <div className="bg-white rounded-xl p-3 shadow-sm flex flex-col items-center">
        <Award size={20} className="text-lavanda-500 mb-1" />
        <span className="text-lg font-medium text-lavanda-800">{userActivity.streak}</span>
        <span className="text-xs text-lavanda-600">Sequência</span>
      </div>
    </div>
  );
}

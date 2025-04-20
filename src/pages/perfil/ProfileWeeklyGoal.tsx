
import { Progress } from "@/components/ui/progress";

type ProfileWeeklyGoalProps = {
  userActivity: {
    totalMinutes: number;
    weeklyGoal: number;
    weeklyProgress: number;
  };
};

export function ProfileWeeklyGoal({ userActivity }: ProfileWeeklyGoalProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
      <h3 className="text-lavanda-800 font-medium mb-1">Meta Semanal</h3>
      <p className="text-sm text-lavanda-600 mb-3">
        {userActivity.totalMinutes} de {userActivity.weeklyGoal} minutos
      </p>
      <Progress value={userActivity.weeklyProgress} className="h-2" />
    </div>
  );
}

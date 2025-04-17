
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

const DailyChallenge = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: 'Beber 2L de água', completed: false },
    { id: 2, name: '5 minutos de meditação', completed: false },
    { id: 3, name: 'Registrar seu humor', completed: false },
    { id: 4, name: 'Praticar respiração profunda', completed: false },
    { id: 5, name: 'Momento de gratidão', completed: false },
  ]);
  
  const toggleTask = (id: number) => {
    setTasks(tasks.map((task) => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };
  
  const completedCount = tasks.filter(task => task.completed).length;
  const progress = (completedCount / tasks.length) * 100;
  
  return (
    <Card className="p-4">
      <h3 className="text-lavanda-800 font-medium mb-1">Desafio do Dia</h3>
      <p className="text-sm text-lavanda-600 mb-4">Autocuidado e Bem-estar</p>
      
      {/* Progress bar */}
      <div className="w-full h-2 bg-lavanda-100 rounded-full mb-4">
        <div 
          className="h-full bg-gradient-lavanda rounded-full" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <p className="text-xs text-lavanda-600 mb-4 text-right">
        {completedCount} de {tasks.length} tarefas completadas
      </p>
      
      {/* Task list */}
      <div className="space-y-2">
        {tasks.map((task) => (
          <div 
            key={task.id}
            className={cn(
              "flex items-center p-3 rounded-lg transition-colors cursor-pointer",
              task.completed ? "bg-lavanda-100" : "hover:bg-lavanda-50"
            )}
            onClick={() => toggleTask(task.id)}
          >
            <div className={cn(
              "flex-shrink-0 w-5 h-5 rounded-full border mr-3 flex items-center justify-center",
              task.completed ? "border-lavanda-500 bg-lavanda-500" : "border-lavanda-300"
            )}>
              {task.completed && <CheckCircle2 size={16} className="text-white" />}
            </div>
            <span className={cn(
              "text-sm",
              task.completed ? "text-lavanda-500 line-through" : "text-lavanda-800"
            )}>
              {task.name}
            </span>
          </div>
        ))}
      </div>
      
      {completedCount === tasks.length ? (
        <div className="mt-4 p-3 bg-lavanda-50 rounded-lg text-center">
          <p className="text-lavanda-700 font-medium">Parabéns! Você completou o desafio do dia! 🎉</p>
        </div>
      ) : null}
    </Card>
  );
};

export default DailyChallenge;

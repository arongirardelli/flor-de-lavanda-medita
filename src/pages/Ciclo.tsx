
import MenstrualCalendar from '@/components/MenstrualCalendar';
import BottomNavigation from '@/components/BottomNavigation';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

const Ciclo = () => {
  return (
    <div className="pb-24">
      <Alert className="mx-4 mt-4 bg-lavanda-50 border-lavanda-200">
        <Info className="h-4 w-4 text-lavanda-500" />
        <AlertDescription className="text-lavanda-700">
          Selecione o primeiro dia da sua menstruação no calendário e clique em "Atualizar Início do Período"
        </AlertDescription>
      </Alert>
      
      <div className="bg-gradient-sunset pt-6 pb-6 px-4 rounded-b-[30px]">
        <MenstrualCalendar />
      </div>
      <BottomNavigation />
    </div>
  );
};

export default Ciclo;

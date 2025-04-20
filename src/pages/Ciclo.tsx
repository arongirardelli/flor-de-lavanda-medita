
import MenstrualCalendar from '@/components/MenstrualCalendar';
import BottomNavigation from '@/components/BottomNavigation';

const Ciclo = () => {
  return (
    <div className="pb-24">
      <div className="bg-gradient-sunset pt-12 pb-6 px-4 rounded-b-[30px]">
        <MenstrualCalendar />
      </div>
      <BottomNavigation />
    </div>
  );
};

export default Ciclo;

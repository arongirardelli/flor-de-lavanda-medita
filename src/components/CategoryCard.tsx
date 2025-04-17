
import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';

interface CategoryCardProps {
  title: string;
  icon: ReactNode;
  gradient: string;
  onClick?: () => void;
}

const CategoryCard = ({ title, icon, gradient, onClick }: CategoryCardProps) => {
  return (
    <Card 
      className={`category-card cursor-pointer ${gradient}`}
      onClick={onClick}
    >
      <div className="text-white p-4">
        {icon}
      </div>
      <p className="text-white font-medium text-sm mt-2">{title}</p>
    </Card>
  );
};

export default CategoryCard;

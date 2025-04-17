
import { Play } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface MeditationCardProps {
  id: string;
  title: string;
  duration: string;
  category: string;
  imageUrl: string;
}

const MeditationCard = ({ id, title, duration, category, imageUrl }: MeditationCardProps) => {
  return (
    <Link to={`/meditacao/${id}`}>
      <Card className="meditation-card">
        <div className="relative w-full h-32 rounded-xl overflow-hidden mb-2">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
              <Play size={20} className="text-white ml-1" />
            </div>
          </div>
          <span className="absolute bottom-2 right-2 bg-black/40 text-white text-xs py-1 px-2 rounded-full backdrop-blur-sm">
            {duration}
          </span>
        </div>
        <h3 className="font-medium text-sm text-lavanda-800 line-clamp-2">{title}</h3>
        <p className="text-xs text-lavanda-600 mt-1">{category}</p>
      </Card>
    </Link>
  );
};

export default MeditationCard;

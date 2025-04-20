
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function CycleHeader() {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center gap-3 mb-4">
      <ArrowLeft size={20} className="text-white" onClick={() => navigate(-1)} />
      <h1 className="text-white text-xl font-display">Seu Ciclo</h1>
    </div>
  );
}


import { useState, useEffect } from 'react';
import { Heart, Moon, Brain, Music, Flower } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import BottomNavigation from '@/components/BottomNavigation';
import MeditationCard from '@/components/MeditationCard';
import CategoryCard from '@/components/CategoryCard';
import MoodTracker from '@/components/MoodTracker';
import DailyChallenge from '@/components/DailyChallenge';

import { meditacoes } from '@/data/meditacoes';

const Index = () => {
  const [greeting, setGreeting] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  
  // Set greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Bom dia');
    } else if (hour < 18) {
      setGreeting('Boa tarde');
    } else {
      setGreeting('Boa noite');
    }
    
    // In a real app, this would come from user data
    setUserName('Flor');
  }, []);
  
  // Handle quick emergency meditation
  const handleEmergencyMeditation = () => {
    navigate('/meditacao-rapida');
  };
  
  // Handle category navigation
  const navigateToCategory = (category: string) => {
    navigate(`/explorar?categoria=${category}`);
  };
  
  // Recommended meditations (display random 4)
  const recommendedMeditations = meditacoes
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);
  
  return (
    <div className="pb-24">
      {/* Header */}
      <div className="bg-gradient-lavanda pt-12 pb-8 px-4 rounded-b-[30px]">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-white text-2xl font-display">{greeting},</h1>
            <p className="text-white/90 font-medium">{userName}</p>
          </div>
          <button 
            onClick={handleEmergencyMeditation}
            className="bg-white/20 backdrop-blur-sm rounded-full p-2"
          >
            <Heart className="text-white" size={20} />
          </button>
        </div>
        
        <MoodTracker />
      </div>
      
      {/* Main content */}
      <div className="px-4 mt-6">
        {/* Categories */}
        <h2 className="text-lavanda-800 font-display text-lg mb-4">Categorias</h2>
        <div className="grid grid-cols-4 gap-3 mb-8">
          <CategoryCard 
            title="Ansiedade"
            icon={<Brain size={24} />}
            gradient="bg-gradient-calm"
            onClick={() => navigateToCategory('ansiedade')}
          />
          <CategoryCard 
            title="Sono"
            icon={<Moon size={24} />}
            gradient="bg-gradient-sunset"
            onClick={() => navigateToCategory('sono')}
          />
          <CategoryCard 
            title="Sons"
            icon={<Music size={24} />}
            gradient="bg-gradient-lavanda"
            onClick={() => navigateToCategory('sons')}
          />
          <CategoryCard 
            title="Ciclo"
            icon={<Flower size={24} />}
            gradient="calm-gradient"
            onClick={() => navigateToCategory('ciclo')}
          />
        </div>
        
        {/* Daily Challenge */}
        <div className="mb-8">
          <DailyChallenge />
        </div>
        
        {/* Recommended meditations */}
        <h2 className="text-lavanda-800 font-display text-lg mb-4">Recomendado para você</h2>
        <div className="grid grid-cols-2 gap-4">
          {recommendedMeditations.map((meditacao) => (
            <MeditationCard
              key={meditacao.id}
              id={meditacao.id}
              title={meditacao.titulo}
              duration={meditacao.duracao}
              category={meditacao.categoria}
              imageUrl={meditacao.imagemUrl}
            />
          ))}
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Index;

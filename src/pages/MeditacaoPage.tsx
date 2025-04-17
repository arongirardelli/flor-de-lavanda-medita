
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import { meditacoes } from '@/data/meditacoes';
import AudioPlayer from '@/components/AudioPlayer';

const MeditacaoPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [meditacao, setMeditacao] = useState<any>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    // Find meditation by ID
    const found = meditacoes.find(m => m.id === id);
    if (found) {
      setMeditacao(found);
      
      // Check if this is a favorite (would be from localStorage or API in a real app)
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setIsFavorite(favorites.includes(id));
    } else {
      // Meditation not found, redirect to explore page
      navigate('/explorar');
    }
  }, [id, navigate]);
  
  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (isFavorite) {
      // Remove from favorites
      const newFavorites = favorites.filter((favId: string) => favId !== id);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    } else {
      // Add to favorites
      favorites.push(id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    
    setIsFavorite(!isFavorite);
  };
  
  if (!meditacao) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse w-16 h-16 rounded-full bg-lavanda-200"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pb-8">
      {/* Header image */}
      <div className="relative h-[40vh] w-full">
        <img 
          src={meditacao.imagemUrl} 
          alt={meditacao.titulo}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent"></div>
        
        {/* Top buttons */}
        <div className="absolute top-12 left-4 right-4 flex justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          
          <button 
            onClick={toggleFavorite}
            className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center"
          >
            <Heart 
              size={20} 
              className={isFavorite ? "text-rosa-400 fill-rosa-400" : "text-white"} 
            />
          </button>
        </div>
        
        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <h1 className="text-white text-2xl font-medium">{meditacao.titulo}</h1>
          <div className="flex items-center mt-1">
            <span className="text-white/80 text-sm mr-4">{meditacao.categoria}</span>
            <span className="text-white/80 text-sm">{meditacao.duracao}</span>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="px-4 py-6">
        <div className="mb-8">
          <h2 className="text-lavanda-800 font-medium mb-2">Sobre esta meditação</h2>
          <p className="text-lavanda-600 text-sm leading-relaxed">
            {meditacao.descricao}
          </p>
        </div>
        
        {/* Benefits */}
        <div className="mb-8">
          <h2 className="text-lavanda-800 font-medium mb-2">Benefícios</h2>
          <ul className="text-lavanda-600 text-sm space-y-2">
            {meditacao.beneficios.map((beneficio: string, index: number) => (
              <li key={index} className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-lavanda-400 mt-1.5 mr-2"></span>
                {beneficio}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Audio player */}
        <AudioPlayer 
          title={meditacao.titulo}
          audioUrl={meditacao.audioUrl}
          imageUrl={meditacao.imagemUrl}
        />
      </div>
    </div>
  );
};

export default MeditacaoPage;

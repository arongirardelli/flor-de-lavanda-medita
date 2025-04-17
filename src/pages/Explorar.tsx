
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import BottomNavigation from '@/components/BottomNavigation';
import MeditationCard from '@/components/MeditationCard';
import { meditacoes } from '@/data/meditacoes';

const Explorar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('todas');
  const [filteredMeditations, setFilteredMeditations] = useState(meditacoes);
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('categoria');
  
  // Set initial tab based on URL param
  useEffect(() => {
    if (categoryParam) {
      setActiveTab(categoryParam);
    }
  }, [categoryParam]);
  
  // Filter meditations based on search and category
  useEffect(() => {
    let filtered = meditacoes;
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(med => 
        med.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.categoria.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category tab
    if (activeTab !== 'todas') {
      filtered = filtered.filter(med => 
        med.categoria.toLowerCase() === activeTab.toLowerCase()
      );
    }
    
    setFilteredMeditations(filtered);
  }, [searchQuery, activeTab]);
  
  // Get unique categories
  const categories = ['todas', ...Array.from(new Set(meditacoes.map(m => m.categoria.toLowerCase())))];
  
  return (
    <div className="pb-24">
      {/* Header */}
      <div className="bg-white pt-12 pb-4 px-4 sticky top-0 z-10 border-b border-lavanda-100">
        <div className="flex items-center gap-3 mb-4">
          <ArrowLeft size={20} className="text-lavanda-800" onClick={() => window.history.back()} />
          <h1 className="text-lavanda-800 text-xl font-display">Explorar</h1>
        </div>
        
        {/* Search */}
        <div className="relative mb-4">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lavanda-400" />
          <Input
            className="pl-10 bg-lavanda-50 border-lavanda-100 rounded-full py-5"
            placeholder="Buscar meditações, sons, guias..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Category tabs */}
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full bg-lavanda-50 p-1 overflow-x-auto flex no-scrollbar rounded-full">
            {categories.map((category) => (
              <TabsTrigger 
                key={category} 
                value={category}
                className="rounded-full data-[state=active]:bg-lavanda-500 data-[state=active]:text-white capitalize"
              >
                {category === 'todas' ? 'Todas' : category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      
      {/* Results */}
      <div className="px-4 py-6">
        {filteredMeditations.length > 0 ? (
          <>
            <p className="text-lavanda-600 mb-4">
              {filteredMeditations.length} {filteredMeditations.length === 1 ? 'resultado' : 'resultados'} encontrados
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              {filteredMeditations.map((meditacao) => (
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
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-lavanda-600">Nenhuma meditação encontrada.</p>
            <p className="text-lavanda-400 text-sm mt-2">Tente mudar sua busca ou categoria.</p>
          </div>
        )}
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Explorar;

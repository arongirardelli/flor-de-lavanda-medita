
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: Página não encontrada:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-lavanda p-4 text-white">
      <h1 className="text-4xl font-display font-bold mb-2">404</h1>
      <p className="text-xl mb-6">Ops! Página não encontrada</p>
      <p className="text-center mb-8 text-white/80 max-w-md">
        Parece que a página que você está procurando não existe ou foi movida.
      </p>
      
      <Button 
        onClick={() => navigate('/')} 
        className="bg-white text-lavanda-700 hover:bg-white/90"
      >
        <Home size={18} className="mr-2" />
        Voltar para o Início
      </Button>
    </div>
  );
};

export default NotFound;

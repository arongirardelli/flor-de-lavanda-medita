
import { Home, Search, User, Calendar, Heart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BottomNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    return currentPath === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-lavanda-100 flex justify-around items-center px-2 z-10">
      <Link to="/" className={`nav-item ${isActive("/") ? "active" : ""}`}>
        <Home size={20} />
        <span className="text-xs">Início</span>
      </Link>
      <Link to="/explorar" className={`nav-item ${isActive("/explorar") ? "active" : ""}`}>
        <Search size={20} />
        <span className="text-xs">Explorar</span>
      </Link>
      <Link to="/meditacao-rapida" className="relative -mt-8">
        <div className="w-14 h-14 rounded-full bg-gradient-lavanda flex items-center justify-center shadow-lg">
          <Heart size={24} className="text-white" />
        </div>
        <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-lavanda-700 whitespace-nowrap">SOS Ansiedade</span>
      </Link>
      <Link to="/ciclo" className={`nav-item ${isActive("/ciclo") ? "active" : ""}`}>
        <Calendar size={20} />
        <span className="text-xs">Ciclo</span>
      </Link>
      <Link to="/perfil" className={`nav-item ${isActive("/perfil") ? "active" : ""}`}>
        <User size={20} />
        <span className="text-xs">Perfil</span>
      </Link>
    </div>
  );
};

export default BottomNavigation;

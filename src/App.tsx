
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/AuthProvider";

// Páginas
import Index from "./pages/Index";
import Explorar from "./pages/Explorar";
import MeditacaoPage from "./pages/MeditacaoPage";
import MeditacaoRapida from "./pages/MeditacaoRapida";
import Ciclo from "./pages/Ciclo";
import Perfil from "./pages/Perfil";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import MediaUpload from "./pages/MediaUpload";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/explorar" element={<Explorar />} />
          <Route path="/meditacao/:id" element={<MeditacaoPage />} />
          <Route path="/meditacao-rapida" element={<MeditacaoRapida />} />
          <Route path="/ciclo" element={<Ciclo />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/upload" element={<MediaUpload />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;

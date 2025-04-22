
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Logo } from "@/components/Logo";

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        toast.success("Cadastro realizado com sucesso! Verifique seu email.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-lavanda flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <Logo className="w-48 mb-8" />
          <h2 className="text-2xl font-display text-white mb-2">
            {isSignUp ? "Criar conta" : "Bem-vinda de volta"}
          </h2>
          <p className="text-white/80">
            {isSignUp
              ? "Comece sua jornada de bem-estar"
              : "Continue sua jornada de bem-estar"}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <Input
            type="email"
            placeholder="Seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/20 text-white placeholder:text-white/50 border-white/20"
            required
          />
          <Input
            type="password"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white/20 text-white placeholder:text-white/50 border-white/20"
            required
          />
          <Button
            type="submit"
            className="w-full bg-white text-lavanda-600 hover:bg-white/90"
            disabled={loading}
          >
            {loading
              ? "Carregando..."
              : isSignUp
              ? "Criar conta"
              : "Entrar"}
          </Button>
        </form>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-white/80 hover:text-white text-sm"
          >
            {isSignUp
              ? "Já tem uma conta? Entre"
              : "Não tem uma conta? Cadastre-se"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;

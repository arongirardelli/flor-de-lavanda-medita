
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { toast } from "sonner";

interface Props {
  onChangePassword: (pwd: string) => void;
}

export const ProfilePasswordSection = ({ onChangePassword }: Props) => {
  const [changingPwd, setChangingPwd] = useState(false);
  const [editingPwd, setEditingPwd] = useState("");

  function handleChangePwd() {
    if (editingPwd.length >= 6) {
      onChangePassword(editingPwd);
      setChangingPwd(false);
      setEditingPwd("");
      toast.success("Senha alterada com sucesso!");
    } else {
      toast.error("A senha deve ter pelo menos 6 caracteres");
    }
  }

  return (
    <div>
      <p className="font-semibold mb-2 flex items-center gap-1 text-lavanda-700"><Lock size={14} /> Privacidade e Segurança</p>
      {changingPwd ? (
        <div>
          <Label htmlFor="pwd" className="text-xs mb-1">Nova senha</Label>
          <Input
            id="pwd"
            type="password"
            value={editingPwd}
            minLength={6}
            onChange={e => setEditingPwd(e.target.value)}
            className="mb-2"
            placeholder="Nova senha"
          />
          <div className="flex gap-2">
            <Button variant="default" onClick={handleChangePwd} disabled={editingPwd.length < 6}>Salvar Senha</Button>
            <Button variant="secondary" onClick={() => setChangingPwd(false)}>Cancelar</Button>
          </div>
          <p className="text-xs text-lavanda-400 mt-1">Sua senha deve ter pelo menos 6 caracteres.</p>
        </div>
      ) : (
        <Button variant="outline" size="sm" onClick={() => setChangingPwd(true)} className="w-full">Alterar senha</Button>
      )}
    </div>
  );
};

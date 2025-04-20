
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { Edit, Bell, Award, Lock, Flower, Flower2, Check } from "lucide-react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { toast } from "sonner";

const AVATARS = [
  {
    id: "1",
    color: "bg-rose-200",
    icon: <Flower size={28} color="#9b87f5" strokeWidth={2} />,
    label: "Lavanda Rose",
  },
  {
    id: "2",
    color: "bg-violet-200",
    icon: <Flower2 size={28} color="#9b87f5" strokeWidth={2} />,
    label: "Lavanda Classic",
  },
  {
    id: "3",
    color: "bg-cyan-200",
    icon: <Flower size={28} color="#5e4694" strokeWidth={2.5} />,
    label: "Lavanda Azul",
  },
  {
    id: "4",
    color: "bg-emerald-200",
    icon: <Flower2 size={28} color="#7e69ab" strokeWidth={2.5} />,
    label: "Lavanda Verde",
  },
];

const JOURNEY_LEVELS = [
  { label: "Iniciante", min: 0 },
  { label: "Exploradora", min: 30 },
  { label: "Meditante Tranquila", min: 120 },
  { label: "Guardiã do Equilíbrio", min: 400 },
];

interface ProfileSettingsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  progressMinutes: number;
  onChangePassword: (newPwd: string) => void;
}

export function ProfileSettingsDrawer({
  open,
  onOpenChange,
  progressMinutes,
  onChangePassword,
}: ProfileSettingsDrawerProps) {
  const { profile, loading, updateProfile, error, refetch } = useUserProfile();
  const [editingName, setEditingName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("1");
  const [enableNotifications, setEnableNotifications] = useState(false);
  const [editingPwd, setEditingPwd] = useState("");
  const [changingPwd, setChangingPwd] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);

  // Synchronize state with profile when it loads or changes
  useEffect(() => {
    if (profile) {
      console.log("Syncing profile data to form:", profile);
      setEditingName(profile.name || "");
      setSelectedAvatar(profile.avatar || "1");
      setEnableNotifications(!!profile.meditation_reminders);
    }
  }, [profile]);

  // Display loading errors
  useEffect(() => {
    if (error) {
      toast.error(`Erro: ${error}`);
    }
  }, [error]);

  // Calculate user journey level
  const userLevel = JOURNEY_LEVELS
    .slice().reverse()
    .find(lvl => progressMinutes >= lvl.min)?.label || JOURNEY_LEVELS[0].label;

  async function handleSaveProfile() {
    if (!profile) return;
    
    setSavingProfile(true);
    try {
      console.log("Saving profile changes:", {
        name: editingName,
        avatar: selectedAvatar,
        meditation_reminders: enableNotifications,
      });
      
      const success = await updateProfile({
        name: editingName,
        avatar: selectedAvatar,
        meditation_reminders: enableNotifications,
      });
      
      if (success) {
        toast.success("Perfil salvo com sucesso!");
        onOpenChange(false); // Close drawer on successful save
        // Refresh profile data
        await refetch();
      } else {
        toast.error("Não foi possível salvar o perfil.");
      }
    } catch (err) {
      console.error("Erro ao salvar perfil:", err);
      toast.error("Erro ao salvar perfil");
    } finally {
      setSavingProfile(false);
    }
  }
  
  async function handleToggleNotifications() {
    const newValue = !enableNotifications;
    setEnableNotifications(newValue);
    
    try {
      const success = await updateProfile({ 
        meditation_reminders: newValue 
      });
      
      if (success) {
        toast.success(newValue 
          ? "Notificações de meditação ativadas" 
          : "Notificações de meditação desativadas");
      }
    } catch (err) {
      console.error("Erro ao atualizar notificações:", err);
      // Revert UI if it fails
      setEnableNotifications(!newValue);
      toast.error("Não foi possível alterar as notificações");
    }
  }
  
  function handleChangePwd() {
    if (editingPwd.length >= 6) {
      onChangePassword(editingPwd);
      setChangingPwd(false);
      setEditingPwd("");
    } else {
      toast.error("A senha deve ter pelo menos 6 caracteres");
    }
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            <span className="flex items-center gap-2"><Edit size={18} />Configurações do Perfil</span>
          </DrawerTitle>
        </DrawerHeader>
        <div className="px-4 py-2 space-y-6">
          {loading && <div className="text-center text-lavanda-600">Carregando...</div>}

          {/* Edit name and avatar */}
          <div>
            <p className="font-semibold mb-2 flex items-center gap-1 text-lavanda-700"><Edit size={14} /> Editar Nome e Avatar</p>
            <div className="mb-2">
              <Label htmlFor="user-name" className="text-xs">Nome</Label>
              <Input 
                id="user-name" 
                type="text" 
                value={editingName} 
                onChange={e => setEditingName(e.target.value)} 
                className="mt-1 mb-2" 
              />
            </div>
            <div>
              <Label className="text-xs mb-1">Avatar</Label>
              <div className="flex gap-2 mt-1">
                {AVATARS.map(ava => (
                  <button
                    key={ava.id}
                    type="button"
                    aria-label={ava.label}
                    className={`rounded-full w-10 h-10 border-2 flex items-center justify-center transition
                      ${selectedAvatar === ava.id ? "border-lavanda-600 ring-2 ring-lavanda-200 scale-110" : "border-transparent opacity-70"} ${ava.color}
                    `}
                    onClick={() => setSelectedAvatar(ava.id)}
                  >
                    {ava.icon}
                  </button>
                ))}
              </div>
            </div>
            <Button 
              className="mt-4 w-full" 
              onClick={handleSaveProfile} 
              disabled={loading || savingProfile}
            >
              {savingProfile ? "Salvando..." : (
                <span className="flex items-center gap-2">
                  <Check size={16} /> Salvar alterações
                </span>
              )}
            </Button>
          </div>

          {/* Meditation Reminders */}
          <div>
            <p className="font-semibold mb-2 flex items-center gap-1 text-lavanda-700"><Bell size={14} /> Lembretes de Meditação</p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-lavanda-700">Ativar notificações diárias</span>
              <input
                type="checkbox"
                checked={enableNotifications}
                onChange={handleToggleNotifications}
                className="accent-lavanda-500 size-5 rounded"
                id="meditation-reminder"
                disabled={loading}
              />
            </div>
            <p className="mt-1 text-xs text-lavanda-400">Você receberá lembretes tipo: "Hora de cuidar de você 💜"</p>
          </div>

          {/* Journey Level */}
          <div>
            <p className="font-semibold mb-2 flex items-center gap-1 text-lavanda-700"><Award size={14} /> Nível da Jornada</p>
            <div className="mb-1">
              <span className="inline-block px-2 py-1 bg-lavanda-100 text-lavanda-700 rounded-lg font-semibold text-sm">{userLevel}</span>
            </div>
            <p className="text-xs text-lavanda-400">Baseado no total de minutos de meditação registrados.</p>
          </div>

          {/* Privacy and Security */}
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
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="secondary">Fechar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

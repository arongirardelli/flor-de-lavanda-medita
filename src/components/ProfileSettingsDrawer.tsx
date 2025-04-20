
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Edit, Bell, Award, Lock } from "lucide-react";

const AVATARS = [
  // Pode-se customizar mais tarde com URLs de SVG, aqui formas e cores suaves:
  { id: '1', color: 'bg-rose-200', img: '', label: 'Rosa' },
  { id: '2', color: 'bg-violet-200', img: '', label: 'Lavanda' },
  { id: '3', color: 'bg-cyan-200', img: '', label: 'Azul Claro' },
  { id: '4', color: 'bg-emerald-200', img: '', label: 'Verde Claro' },
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
  currentName: string;
  currentAvatar: string;
  onUpdateNameAvatar: (name: string, avatar: string) => void;
  notificationsEnabled: boolean;
  onToggleNotifications: (value: boolean) => void;
  progressMinutes: number;
  onChangePassword: (newPwd: string) => void;
}

export function ProfileSettingsDrawer({
  open,
  onOpenChange,
  currentName,
  currentAvatar,
  onUpdateNameAvatar,
  notificationsEnabled,
  onToggleNotifications,
  progressMinutes,
  onChangePassword,
}: ProfileSettingsDrawerProps) {
  // Local states for user input
  const [editingName, setEditingName] = useState(currentName);
  const [selectedAvatar, setSelectedAvatar] = useState(currentAvatar);
  const [enableNotifications, setEnableNotifications] = useState(notificationsEnabled);
  const [editingPwd, setEditingPwd] = useState("");
  const [changingPwd, setChangingPwd] = useState(false);

  // Calculate user journey level
  const userLevel = JOURNEY_LEVELS
    .slice().reverse()
    .find(lvl => progressMinutes >= lvl.min)?.label || JOURNEY_LEVELS[0].label;

  function handleSaveProfile() {
    onUpdateNameAvatar(editingName, selectedAvatar);
    onOpenChange(false);
  }
  function handleToggleNotifications() {
    setEnableNotifications(!enableNotifications);
    onToggleNotifications(!enableNotifications);
  }
  function handleChangePwd() {
    if (editingPwd.length >= 6) {
      onChangePassword(editingPwd);
      setChangingPwd(false);
      setEditingPwd("");
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

          {/* Editar nome e avatar */}
          <div>
            <p className="font-semibold mb-2 flex items-center gap-1 text-lavanda-700"><Edit size={14} /> Editar Nome e Avatar</p>
            <div className="mb-2">
              <Label htmlFor="user-name" className="text-xs">Nome</Label>
              <Input id="user-name" type="text" value={editingName} onChange={e => setEditingName(e.target.value)} className="mt-1 mb-2" />
            </div>
            <div>
              <Label className="text-xs mb-1">Avatar</Label>
              <div className="flex gap-2 mt-1">
                {AVATARS.map(ava => (
                  <button
                    key={ava.id}
                    type="button"
                    aria-label={ava.label}
                    className={`rounded-full w-10 h-10 border-2 flex items-center justify-center ${selectedAvatar === ava.id ? "border-lavanda-600 ring-2 ring-lavanda-200" : "border-transparent"} ${ava.color}`}
                    onClick={() => setSelectedAvatar(ava.id)}
                  >
                    {/* Futuramente pode carregar imagem SVG aqui */}
                  </button>
                ))}
              </div>
            </div>
            <Button className="mt-4 w-full" onClick={handleSaveProfile}>Salvar alterações</Button>
          </div>

          {/* Lembretes de Meditação */}
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
              />
            </div>
            <p className="mt-1 text-xs text-lavanda-400">Você receberá lembretes tipo: “Hora de cuidar de você 💜”</p>
          </div>

          {/* Nível da Jornada */}
          <div>
            <p className="font-semibold mb-2 flex items-center gap-1 text-lavanda-700"><Award size={14} /> Nível da Jornada</p>
            <div className="mb-1">
              <span className="inline-block px-2 py-1 bg-lavanda-100 text-lavanda-700 rounded-lg font-semibold text-sm">{userLevel}</span>
            </div>
            <p className="text-xs text-lavanda-400">Baseado no total de minutos de meditação registrados.</p>
          </div>

          {/* Privacidade e Segurança */}
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
  )
}


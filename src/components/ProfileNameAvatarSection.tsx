
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Flower, Flower2, Check, Edit } from "lucide-react";
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

interface Props {
  profile: { name: string; avatar: string } | null;
  loading: boolean;
  savingProfile: boolean;
  onSave: (fields: { name: string; avatar: string }) => Promise<void>;
}

export const ProfileNameAvatarSection = ({
  profile,
  loading,
  savingProfile,
  onSave,
}: Props) => {
  const [editingName, setEditingName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("1");

  useEffect(() => {
    if (profile) {
      setEditingName(profile.name || "");
      setSelectedAvatar(profile.avatar || "1");
    }
  }, [profile]);

  const handleSave = async () => {
    if (!editingName.trim()) {
      toast.error("O nome não pode estar vazio");
      return;
    }
    await onSave({
      name: editingName,
      avatar: selectedAvatar,
    });
  };

  return (
    <div>
      <p className="font-semibold mb-2 flex items-center gap-1 text-lavanda-700">
        <Edit size={14} /> Editar Nome e Avatar
      </p>
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
        onClick={handleSave}
        disabled={loading || savingProfile}
      >
        {savingProfile ? "Salvando..." : (
          <span className="flex items-center gap-2">
            <Check size={16} /> Salvar alterações
          </span>
        )}
      </Button>
    </div>
  );
};

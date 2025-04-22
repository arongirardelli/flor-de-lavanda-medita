
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Camera, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ProfileEditSectionProps {
  userId: string;
  currentName: string | null;
  currentPhotoUrl: string | null;
  onUpdate: () => void;
}

export function ProfileEditSection({ userId, currentName, currentPhotoUrl, onUpdate }: ProfileEditSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentName || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${userId}/profile.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('profile_photos')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('profile_photos')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ photo_url: publicUrl })
        .eq('id', userId);

      if (updateError) throw updateError;

      toast.success("Foto atualizada com sucesso!");
      onUpdate();
    } catch (error) {
      toast.error("Erro ao atualizar a foto");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNameUpdate = async () => {
    if (!name.trim()) {
      toast.error("O nome não pode estar vazio");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ name: name.trim() })
        .eq('id', userId);

      if (error) throw error;

      toast.success("Nome atualizado com sucesso!");
      setIsEditing(false);
      onUpdate();
    } catch (error) {
      toast.error("Erro ao atualizar o nome");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <Avatar className="w-24 h-24 border-2 border-white/50">
          <AvatarImage src={currentPhotoUrl || undefined} />
          <AvatarFallback>
            <User className="w-8 h-8 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
        <label 
          htmlFor="photo-upload" 
          className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-50 transition-all"
        >
          <Camera size={16} className="text-lavanda-600" />
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
            disabled={isLoading}
          />
        </label>
      </div>

      <div className="mt-4 w-full max-w-xs">
        {isEditing ? (
          <div className="flex gap-2">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              className="bg-white/10 text-white placeholder:text-white/50 border-white/20"
              disabled={isLoading}
            />
            <Button 
              size="sm"
              variant="secondary"
              onClick={handleNameUpdate}
              disabled={isLoading}
              className="bg-white/20 hover:bg-white/30 text-white"
            >
              Salvar
            </Button>
          </div>
        ) : (
          <Button
            variant="ghost"
            className="w-full text-white hover:bg-white/20"
            onClick={() => setIsEditing(true)}
            disabled={isLoading}
          >
            <Edit size={14} className="mr-2" />
            {currentName || "Adicionar nome"}
          </Button>
        )}
      </div>
    </div>
  );
}

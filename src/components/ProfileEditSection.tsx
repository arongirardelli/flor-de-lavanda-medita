
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, User } from "lucide-react";
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
      // Upload the file to Supabase Storage
      const fileExt = file.name.split(".").pop();
      const filePath = `${userId}/profile.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("profile_photos")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from("profile_photos")
        .getPublicUrl(filePath);

      // Update the profile with the new photo URL
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ photo_url: publicUrl })
        .eq("id", userId);

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
        .from("profiles")
        .update({ name: name.trim() })
        .eq("id", userId);

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
        <Avatar className="w-20 h-20">
          <AvatarImage src={currentPhotoUrl || undefined} />
          <AvatarFallback>
            <User className="w-8 h-8 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
        <label 
          htmlFor="photo-upload" 
          className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-lg cursor-pointer hover:bg-gray-50"
        >
          <Edit size={14} className="text-lavanda-600" />
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
              className="flex-1"
              disabled={isLoading}
            />
            <Button 
              size="sm" 
              onClick={handleNameUpdate}
              disabled={isLoading}
            >
              Salvar
            </Button>
          </div>
        ) : (
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => setIsEditing(true)}
            disabled={isLoading}
          >
            <Edit size={14} className="mr-2" />
            Editar nome
          </Button>
        )}
      </div>
    </div>
  );
}

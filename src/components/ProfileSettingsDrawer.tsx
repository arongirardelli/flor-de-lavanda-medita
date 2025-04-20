
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useCallback } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { toast } from "sonner";
import { ProfileNameAvatarSection } from "./ProfileNameAvatarSection";
import { ProfileNotificationsSection } from "./ProfileNotificationsSection";
import { ProfileLevelSection } from "./ProfileLevelSection";
import { ProfilePasswordSection } from "./ProfilePasswordSection";

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
  const [enableNotifications, setEnableNotifications] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);

  // Sync notification toggle state with the profile
  useEffect(() => {
    if (profile) {
      setEnableNotifications(!!profile.meditation_reminders);
    }
  }, [profile]);

  // Display loading errors
  useEffect(() => {
    if (error) {
      toast.error(`Erro: ${error}`);
    }
  }, [error]);

  // Save name & avatar
  const handleSaveProfileNameAvatar = useCallback(async (fields: { name: string; avatar: string }) => {
    if (!profile) return;
    setSavingProfile(true);
    try {
      const success = await updateProfile({
        ...fields,
        meditation_reminders: enableNotifications,
        // Avatar and name will be saved, journey level not stored directly (calculated via progress)
      });
      if (success) {
        toast.success("Perfil salvo com sucesso!");
        onOpenChange(false); // Close drawer on successful save
        await refetch();
      } else {
        toast.error("Não foi possível salvar o perfil.");
      }
    } catch (err) {
      toast.error("Erro ao salvar perfil");
    } finally {
      setSavingProfile(false);
    }
  }, [profile, enableNotifications, updateProfile, refetch, onOpenChange]);

  // Notification toggle
  const handleToggleNotifications = useCallback(async (val: boolean) => {
    setEnableNotifications(val);
    try {
      const success = await updateProfile({ meditation_reminders: val });
      if (success) {
        toast.success(val
          ? "Notificações de meditação ativadas"
          : "Notificações de meditação desativadas");
      }
    } catch (err) {
      setEnableNotifications(!val);
      toast.error("Não foi possível alterar as notificações");
    }
  }, [updateProfile]);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            <span className="flex items-center gap-2">Configurações do Perfil</span>
          </DrawerTitle>
        </DrawerHeader>
        <div className="px-4 py-2 space-y-6">
          {loading && <div className="text-center text-lavanda-600">Carregando...</div>}

          {/* Name + avatar */}
          <ProfileNameAvatarSection
            profile={profile}
            loading={loading}
            savingProfile={savingProfile}
            onSave={handleSaveProfileNameAvatar}
          />

          {/* Meditation Reminders */}
          <ProfileNotificationsSection
            enableNotifications={enableNotifications}
            loading={loading}
            onToggle={handleToggleNotifications}
          />

          {/* Journey Level */}
          <ProfileLevelSection progressMinutes={progressMinutes} />

          {/* Privacy & security */}
          <ProfilePasswordSection onChangePassword={onChangePassword} />
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

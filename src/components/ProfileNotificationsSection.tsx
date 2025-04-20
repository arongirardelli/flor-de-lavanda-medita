
import { Bell } from "lucide-react";
import { toast } from "sonner";

interface Props {
  enableNotifications: boolean;
  loading: boolean;
  onToggle: (val: boolean) => Promise<void>;
}

export const ProfileNotificationsSection = ({
  enableNotifications,
  loading,
  onToggle,
}: Props) => {
  const handleChange = async () => {
    await onToggle(!enableNotifications);
  };

  return (
    <div>
      <p className="font-semibold mb-2 flex items-center gap-1 text-lavanda-700">
        <Bell size={14} /> Lembretes de Meditação
      </p>
      <div className="flex items-center gap-2">
        <span className="text-sm text-lavanda-700">Ativar notificações diárias</span>
        <input
          type="checkbox"
          checked={enableNotifications}
          onChange={handleChange}
          className="accent-lavanda-500 size-5 rounded"
          id="meditation-reminder"
          disabled={loading}
        />
      </div>
      <p className="mt-1 text-xs text-lavanda-400">
        Você receberá lembretes tipo: "Hora de cuidar de você 💜"
      </p>
    </div>
  );
};

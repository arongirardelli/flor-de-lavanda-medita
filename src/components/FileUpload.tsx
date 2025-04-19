
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface FileUploadProps {
  onSuccess?: (url: string) => void;
  acceptedTypes?: string;
}

export const FileUpload = ({ onSuccess, acceptedTypes = 'audio/mpeg,image/*' }: FileUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('meditacao_midia')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('meditacao_midia')
        .getPublicUrl(filePath);

      toast.success('Arquivo enviado com sucesso!');
      onSuccess?.(publicUrl);
    } catch (error) {
      console.error('Erro no upload:', error);
      toast.error('Erro ao fazer upload do arquivo');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <input
        type="file"
        onChange={handleFileUpload}
        accept={acceptedTypes}
        className="hidden"
        id="file-upload"
      />
      <label htmlFor="file-upload">
        <Button
          variant="outline"
          disabled={isUploading}
          className="cursor-pointer"
          asChild
        >
          <span>
            {isUploading ? 'Enviando...' : 'Upload de Arquivo'}
          </span>
        </Button>
      </label>
    </div>
  );
};



import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileUpload } from '@/components/FileUpload';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/components/AuthProvider';

export const MediaUpload = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  const handleUploadSuccess = (url: string) => {
    setUploadedUrls(prev => [...prev, url]);
  };

  if (isLoading || !user) {
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Upload de Arquivos de Meditação</h1>
      
      <div className="space-y-6">
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Upload de Áudio (MP3)</h2>
          <FileUpload 
            acceptedTypes="audio/mpeg" 
            onSuccess={handleUploadSuccess}
          />
        </Card>

        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Upload de Imagens</h2>
          <FileUpload 
            acceptedTypes="image/*" 
            onSuccess={handleUploadSuccess}
          />
        </Card>

        {uploadedUrls.length > 0 && (
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4">URLs dos Arquivos Enviados</h2>
            <ul className="space-y-2">
              {uploadedUrls.map((url, index) => (
                <li key={index} className="break-all">
                  {url}
                </li>
              ))}
            </ul>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MediaUpload;


import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";

export type UserProfile = {
  id: string;
  name: string | null;
  avatar: string | null;
  photo_url: string | null;
  meditation_reminders: boolean | null;
  weekly_journey_minutes: number;
  weekly_journey_updated_at: string | null;
};

export function useUserProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!user) {
      setLoading(false);
      setProfile(null);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, name, avatar, meditation_reminders, weekly_journey_minutes, weekly_journey_updated_at")
        .eq("id", user.id)
        .maybeSingle();

      if (error) {
        setError(error.message);
        setProfile(null);
      } else {
        setProfile(data);
      }
    } catch (err) {
      setError("Falha ao carregar o perfil");
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = async (fields: Partial<UserProfile>) => {
    if (!user) return false;
    
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from("profiles")
        .update(fields)
        .eq("id", user.id);
        
      if (error) {
        setError(error.message);
        return false;
      }
      setProfile(prev => prev ? { ...prev, ...fields } : null);
      await fetchProfile();
      return true;
    } catch (err) {
      setError("Falha ao atualizar o perfil");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { 
    profile, 
    loading, 
    error,
    updateProfile, 
    refetch: fetchProfile 
  };
}

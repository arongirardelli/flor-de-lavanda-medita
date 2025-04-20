
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";

export type UserProfile = {
  id: string;
  name: string;
  avatar: string;
  meditation_reminders: boolean;
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
        .select("id, name, avatar, meditation_reminders")
        .eq("id", user.id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching profile:", error);
        setError(error.message);
        setProfile(null);
      } else {
        console.log("Profile data fetched:", data);
        setProfile(data);
      }
    } catch (err) {
      console.error("Unexpected error fetching profile:", err);
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
      console.log("Updating profile with fields:", fields);
      const { error } = await supabase
        .from("profiles")
        .update(fields)
        .eq("id", user.id);
        
      if (error) {
        console.error("Error updating profile:", error);
        setError(error.message);
        return false;
      }
      
      // Immediately update local profile state to reflect changes
      setProfile(prev => prev ? { ...prev, ...fields } : null);
      
      // Fetch fresh data from the server to ensure we have the latest state
      await fetchProfile();
      return true;
    } catch (err) {
      console.error("Unexpected error updating profile:", err);
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

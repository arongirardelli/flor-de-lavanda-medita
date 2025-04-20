
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

  const fetchProfile = useCallback(async () => {
    if (!user) {
      setLoading(false);
      setProfile(null);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("id, name, avatar, meditation_reminders")
      .eq("id", user.id)
      .maybeSingle();
    if (error) {
      setProfile(null);
    } else {
      setProfile(data);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = async (fields: Partial<UserProfile>) => {
    if (!user) return;
    setLoading(true);
    const { error } = await supabase
      .from("profiles")
      .update(fields)
      .eq("id", user.id);
    if (!error) await fetchProfile();
    setLoading(false);
    return !error;
  };

  return { profile, loading, updateProfile, refetch: fetchProfile };
}

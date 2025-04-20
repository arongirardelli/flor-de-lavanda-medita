
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthProvider';

export interface UserActivity {
  totalMinutes: number;
  totalSessions: number;
  streak: number;
  weeklyGoal: number;
  weeklyProgress: number;
  recentActivity: {
    date: string;
    meditation: string;
    duration: string;
  }[];
  favorites: string[];
}

export function useUserActivity() {
  const [userActivity, setUserActivity] = useState<UserActivity>({
    totalMinutes: 0,
    totalSessions: 0,
    streak: 0,
    weeklyGoal: 60,
    weeklyProgress: 0,
    recentActivity: [],
    favorites: []
  });

  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchUserActivity = async () => {
      // For now using mock data - in a real app this would fetch from Supabase
      setUserActivity({
        totalMinutes: 120,
        totalSessions: 8,
        streak: 3,
        weeklyGoal: 60,
        weeklyProgress: 75,
        recentActivity: [
          { date: "Hoje", meditation: "Respiração para Ansiedade", duration: "5 min" },
          { date: "Ontem", meditation: "Sono Tranquilo", duration: "10 min" },
          { date: "2 dias atrás", meditation: "Equilíbrio Hormonal", duration: "15 min" }
        ],
        favorites: ['med1', 'med3', 'med6']
      });
    };

    fetchUserActivity();
  }, [user]);

  return userActivity;
}

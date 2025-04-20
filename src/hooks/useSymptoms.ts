
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { toast } from "sonner";

export interface Symptom {
  id: string;
  day: string; // Ex: 'Hoje', 'Ontem', ou data formatada
  date: string; // yyyy-mm-dd
  symptoms: string[];
  notes?: string | null;
}

export function useSymptoms() {
  const { user } = useAuth();
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSymptoms = useCallback(async () => {
    if (!user) {
      setSymptoms([]);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from("cycle_symptoms")
      .select("id, date, symptoms, notes")
      .eq("user_id", user.id)
      .order("date", { ascending: false });
    if (error) {
      toast.error("Erro ao buscar sintomas.");
      setSymptoms([]);
      setLoading(false);
      return;
    }
    const todayStr = new Date().toISOString().split("T")[0];
    const yesterdayStr = new Date(Date.now() - 86400000).toISOString().split("T")[0];

    setSymptoms(
      (data || []).map((item) => ({
        id: item.id,
        day:
          item.date === todayStr
            ? "Hoje"
            : item.date === yesterdayStr
            ? "Ontem"
            : new Date(item.date).toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "2-digit" }),
        date: item.date,
        symptoms: item.symptoms,
        notes: item.notes,
      }))
    );
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchSymptoms();
  }, [fetchSymptoms]);

  // Chame após registro de sintoma para atualizar a lista
  const refetchSymptoms = fetchSymptoms;

  return { symptoms, loading, refetchSymptoms };
}

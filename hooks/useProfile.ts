import { fetchMyProfile, UserProfile } from "@/supabase/authService";
import { supabase } from "@/supabase/supabaseClient";
import { useEffect, useState } from "react";

export type { UserProfile };

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const { data } = await supabase.auth.getSession();
        const token = data.session?.access_token;
        if (!token) {
          throw new Error("Not authenticated");
        }
        const me = await fetchMyProfile(token);
        if (!cancelled) setProfile(me);
      } catch (err: any) {
        if (!cancelled) setError(err?.message || "Error fetching profile");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { profile, loading, error };
}

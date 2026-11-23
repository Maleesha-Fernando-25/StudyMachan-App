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
        let token = data.session?.access_token;
        const expiresAt = data.session?.expires_at;

        if (!token) {
          throw new Error("Not authenticated");
        }

        // Refresh token if it expires within 5 minutes
        if (expiresAt && (expiresAt * 1000 - Date.now()) < 5 * 60 * 1000) {
          const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
          if (refreshError || !refreshData.session?.access_token) {
            throw new Error("Failed to refresh session");
          }
          token = refreshData.session.access_token;
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

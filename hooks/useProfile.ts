import { BACKEND_URL } from "@/constants/api/api";
import { supabase } from "@/supabase/supabaseClient";
import { useEffect, useState } from "react";

export interface UserProfile {
  id: string;
  role: "student" | "tutor";
  full_name: string;
  username: string;
  email: string;
  date_of_birth: string | null;
  gender: string | null;
  address: string | null;
  avatar_url: string | null;
}

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);
        const { data: sessionData } = await supabase.auth.getSession();
        const token = sessionData.session?.access_token;

        if (!token) {
          throw new Error("Not authenticated");
        }

        const res = await fetch(`${BACKEND_URL}/profiles/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to load profile (${res.status})`);
        }

        const data: UserProfile = await res.json();
        setProfile(data);
      } catch (err: any) {
        setError(err.message || "Error fetching profile");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  return { profile, loading, error };
}

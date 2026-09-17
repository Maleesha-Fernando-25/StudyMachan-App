import { BACKEND_URL } from "../constants/api/api";
import { clearUserRole } from "../lib/storage/roleStorage";
import { supabase } from "./supabaseClient";

export type UserRole = "student" | "tutor";

export interface UserProfile {
  id: string;
  role: UserRole;
  full_name: string;
  username: string;
  email: string;
  date_of_birth: string | null;
  gender: string | null;
  address: string | null;
  avatar_url: string | null;
}

export interface SignupFields {
  email: string;
  password: string;
  role: UserRole;
  full_name: string;
  username: string;
  date_of_birth: string; // YYYY-MM-DD
  gender: string;
  address: string;
}

export class AuthError extends Error {
  constructor(
    message: string,
    public code?: string,
    public status?: number,
  ) {
    super(message);
  }
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

// Turns a failed backend response into one readable message.
// FastAPI sends `detail` as a string for HTTP errors and as a list for 422s.
async function backendError(response: Response) {
  const body = await response.json().catch(() => null);
  const detail = body?.detail;
  const message = Array.isArray(detail)
    ? detail
        .map((d: { msg?: string }) =>
          String(d.msg ?? "").replace(/^Value error, /, ""),
        )
        .join("\n")
    : typeof detail === "string"
      ? detail
      : `Request failed (${response.status})`;
  return new AuthError(message, undefined, response.status);
}

async function backendFetch(path: string, init?: RequestInit) {
  try {
    return await fetch(`${BACKEND_URL}${path}`, init);
  } catch {
    // A network/CORS failure surfaces as TypeError: Failed to fetch.
    throw new AuthError(
      "Cannot reach the StudyMachan server. Check that the backend is running and EXPO_PUBLIC_BACKEND_URL is correct.",
      "network",
    );
  }
}

// One call creates the Supabase account AND the student/tutor row.
export async function registerUser(fields: SignupFields) {
  const response = await backendFetch("/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...fields, email: normalizeEmail(fields.email) }),
  });
  if (!response.ok) {
    throw await backendError(response);
  }
  return (await response.json()) as {
    message: string;
    user_id: string;
    email: string;
    needs_email_confirmation: boolean;
  };
}

// Who is the logged-in person, and are they a student or a tutor?
export async function fetchMyProfile(accessToken: string) {
  const response = await backendFetch("/profiles/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) {
    throw await backendError(response);
  }
  return (await response.json()) as UserProfile;
}

export async function loginUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: normalizeEmail(email),
    password,
  });

  if (error) {
    if (error.code === "email_not_confirmed") {
      throw new AuthError(
        "Please verify your email before signing in.",
        "email_not_confirmed",
      );
    }
    if (
      error.code === "invalid_credentials" ||
      error.message.toLowerCase().includes("invalid login credentials")
    ) {
      throw new AuthError(
        "Incorrect email or password. Use the email you registered with.",
        "invalid_credentials",
      );
    }
    throw new AuthError(error.message, error.code);
  }

  if (!data.session || !data.user) {
    throw new AuthError("Login succeeded but no session was returned.");
  }

  const profile = await fetchMyProfile(data.session.access_token);
  return { user: data.user, profile };
}

export async function logoutUser() {
  await supabase.auth.signOut();
  await clearUserRole();
}

export async function verifyEmailOtp(email: string, token: string) {
  const { data, error } = await supabase.auth.verifyOtp({
    email: normalizeEmail(email),
    token,
    type: "signup",
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function resendVerificationEmail(email: string) {
  const { data, error } = await supabase.auth.resend({
    type: "signup",
    email: normalizeEmail(email),
  });

  if (error) {
    throw error;
  }

  return data;
}

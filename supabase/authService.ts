import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { BACKEND_URL } from "../constants/api/api";
import { saveUserRole } from "../lib/storage/roleStorage";
import { supabase } from "./supabaseClient";

WebBrowser.maybeCompleteAuthSession();

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function registerUser(
  name: string,
  email: string,
  password: string,
  role: "student" | "tutor",
  username: string,
  dateOfBirth: string,
  gender: string,
) {
  const normalizedEmail = normalizeEmail(email);
  const { data, error } = await supabase.auth.signUp({
    email: normalizedEmail,
    password,
    options: {
      data: {
        name,
        role,
        username,
        date_of_birth: dateOfBirth,
        gender,
      },
    },
  });

  if (error) {
    if (
      error.code === "user_already_exists" ||
      error.code === "email_exists" ||
      error.message.toLowerCase().includes("already registered")
    ) {
      throw new Error(
        "This email is already registered. Use Sign In or choose another email.",
      );
    }
    throw error;
  }

  return data;
}

export async function loginUser(email: string, password: string) {
  const normalizedEmail = normalizeEmail(email);
  const { data, error } = await supabase.auth.signInWithPassword({
    email: normalizedEmail,
    password,
  });

  if (error) {
    if (error.code === "email_not_confirmed") {
      throw new Error(
        "Please verify your email before signing in. Check your inbox for the verification code.",
      );
    }
    if (
      error.code === "invalid_credentials" ||
      error.message.toLowerCase().includes("invalid login credentials")
    ) {
      throw new Error(
        "Incorrect email or password. Use the email you registered with.",
      );
    }
    throw error;
  }

  if (!data.user) {
    throw new Error("Login succeeded but no user was returned.");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", data.user.id)
    .maybeSingle();

  return {
    user: data.user,
    profile,
  };
}

export async function createBackendProfile(
  accessToken: string,
  profile: {
    id: string;
    role: "student" | "tutor";
    fullName: string;
    username: string;
    email: string;
    dateOfBirth: string;
    gender: string;
    address: string;
  },
) {
  const endpoint = profile.role === "student" ? "students" : "tutors";
  const body =
    profile.role === "student"
      ? {
          id: profile.id,
          full_name: profile.fullName,
          username: profile.username,
          email: profile.email,
          date_of_birth: profile.dateOfBirth,
          gender: profile.gender,
          address: profile.address,
        }
      : {
          id: profile.id,
          full_name: profile.fullName,
          username: profile.username,
          email: profile.email,
          date_of_birth: profile.dateOfBirth,
          gender: profile.gender,
          address: profile.address,
          subjects: [],
          teaching_mode: "Online",
        };

  const response = await fetch(`${BACKEND_URL}/${endpoint}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });

  const responseBody = await response.json().catch(() => null);
  if (!response.ok && response.status !== 409) {
    throw new Error(
      responseBody?.detail || "The backend could not save your profile.",
    );
  }

  return responseBody;
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

export async function signInWithGoogle(role?: "student" | "tutor") {
  if (role) {
    await saveUserRole(role);
  }

  const redirectUrl = Linking.createURL("login");
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: redirectUrl,
      skipBrowserRedirect: true,
    },
  });

  if (error) {
    throw error;
  }

  if (!data?.url) {
    return null;
  }

  const result = await WebBrowser.openAuthSessionAsync(data.url, redirectUrl);
  if (result.type !== "success" || !result.url) {
    return null;
  }

  const url = new URL(result.url);
  const params = new URLSearchParams(
    url.hash ? url.hash.substring(1) : url.search,
  );
  const accessToken = params.get("access_token");
  const refreshToken = params.get("refresh_token");

  if (accessToken && refreshToken) {
    const { data: sessionData, error: setSessionError } =
      await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });
    if (setSessionError) {
      throw setSessionError;
    }
    if (sessionData.session && role) {
      const { error: metadataError } = await supabase.auth.updateUser({
        data: { role },
      });
      if (metadataError) {
        throw metadataError;
      }
    }
    return sessionData.session;
  }

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();
  if (sessionError) {
    throw sessionError;
  }
  if (sessionData.session && role) {
    const { error: metadataError } = await supabase.auth.updateUser({
      data: { role },
    });
    if (metadataError) {
      throw metadataError;
    }
  }
  return sessionData.session;
}

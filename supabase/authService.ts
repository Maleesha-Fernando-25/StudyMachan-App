import { BACKEND_URL } from "../constants/api/api";
import { supabase } from "./supabaseClient";

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

export async function sendBackendOtp(email: string, password?: string) {
  const normalizedEmail = normalizeEmail(email);
  const response = await fetch(`${BACKEND_URL}/auth/send-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: normalizedEmail,
      password: password || "tempPassword123",
    }),
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(
      data?.detail || "Failed to send verification code. Please try again.",
    );
  }

  return data;
}

export async function verifyBackendOtp(email: string, otpCode: string) {
  const normalizedEmail = normalizeEmail(email);
  const response = await fetch(`${BACKEND_URL}/auth/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: normalizedEmail,
      otp_code: otpCode.trim(),
    }),
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.detail || "Invalid verification code.");
  }

  return data;
}

export async function verifyEmailOtp(email: string, token: string) {
  const normalizedEmail = normalizeEmail(email);
  const trimmedToken = token.trim();

  let backendError: Error | null = null;
  try {
    const backendResult = await verifyBackendOtp(normalizedEmail, trimmedToken);
    // Also attempt native Supabase verification if applicable
    await supabase.auth
      .verifyOtp({
        email: normalizedEmail,
        token: trimmedToken,
        type: "signup",
      })
      .catch(() => null);

    return backendResult;
  } catch (err: any) {
    backendError = err;
  }

  // Fallback to Supabase Auth OTP verification if backend call failed
  try {
    const { data, error } = await supabase.auth.verifyOtp({
      email: normalizedEmail,
      token: trimmedToken,
      type: "signup",
    });
    if (error) {
      throw error;
    }
    return data;
  } catch (supaErr: any) {
    throw backendError || supaErr;
  }
}

export async function resendVerificationEmail(email: string, password?: string) {
  const normalizedEmail = normalizeEmail(email);

  let backendError: Error | null = null;
  try {
    const backendResult = await sendBackendOtp(normalizedEmail, password);
    supabase.auth
      .resend({
        type: "signup",
        email: normalizedEmail,
      })
      .catch(() => null);

    return backendResult;
  } catch (err: any) {
    backendError = err;
  }

  // Fallback to Supabase Auth resend
  const { data, error } = await supabase.auth.resend({
    type: "signup",
    email: normalizedEmail,
  });

  if (error) {
    throw backendError || error;
  }

  return data;
}


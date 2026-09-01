import { supabase } from "./supabaseClient";

export async function registerUser(
  name: string,
  email: string,
  password: string,
  role: "student" | "tutor",
  username: string,
  dateOfBirth: string,
  gender: string
) {
  const { data, error } = await supabase.auth.signUp({
    email,
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
    throw error;
  }

  return data;
}

export async function loginUser(
  email: string,
  password: string
) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  const user = data.user;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError) {
    throw profileError;
  }

  return {
    user,
    profile,
  };
}
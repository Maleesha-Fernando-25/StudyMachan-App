// app/lib/auth.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

export const USER_ROLE_KEY = "user_role";

export async function saveUserRole(role: "student" | "tutor") {
  await AsyncStorage.setItem(USER_ROLE_KEY, role);
}

export async function getUserRole(): Promise<"student" | "tutor" | null> {
  const role = await AsyncStorage.getItem(USER_ROLE_KEY);
  if (role === "student" || role === "tutor") return role;
  return null;
}

export async function clearUserRole() {
  await AsyncStorage.removeItem(USER_ROLE_KEY);
}

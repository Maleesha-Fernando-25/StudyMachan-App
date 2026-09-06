import AsyncStorage from "@react-native-async-storage/async-storage";

export type UserRole = "student" | "tutor";

const USER_ROLE_KEY = "user_role";

const ROLE_KEY = "@studymachan:user_role";

export async function saveUserRole(role: "student" | "tutor") {
  await AsyncStorage.setItem(ROLE_KEY, role);
}
export async function getUserRole(): Promise<"student" | "tutor" | null> {
  const role = await AsyncStorage.getItem(ROLE_KEY);
  if (role === "student" || role === "tutor") {
    return role;
  }
  return null;
}

export async function clearUserRole() {
  await AsyncStorage.removeItem(ROLE_KEY);
}

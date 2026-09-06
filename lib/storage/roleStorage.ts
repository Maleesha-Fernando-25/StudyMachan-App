import AsyncStorage from "@react-native-async-storage/async-storage";

export type UserRole = "student" | "tutor";

const USER_ROLE_KEY = "user_role";

export async function saveUserRole(role: UserRole): Promise<void> {
  await AsyncStorage.setItem(USER_ROLE_KEY, role);
}

export async function getUserRole(): Promise<UserRole | null> {
  const storedRole = await AsyncStorage.getItem(USER_ROLE_KEY);

  if (storedRole === "student" || storedRole === "tutor") {
    return storedRole;
  }

  return null;
}

export async function clearUserRole(): Promise<void> {
  await AsyncStorage.removeItem(USER_ROLE_KEY);
}

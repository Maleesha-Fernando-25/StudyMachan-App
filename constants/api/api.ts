import { Platform } from "react-native";

const configuredBackendUrl = process.env.EXPO_PUBLIC_BACKEND_URL?.trim();

// In production, require explicit backend URL (no silent fallback to localhost)
if (!configuredBackendUrl && !__DEV__) {
  throw new Error(
    "EXPO_PUBLIC_BACKEND_URL is required in production. Set it in your environment variables."
  );
}

// Android emulators use 10.0.2.2 to reach the host computer. A physical device
// should set EXPO_PUBLIC_BACKEND_URL to the host's LAN address.
export const BACKEND_URL =
  configuredBackendUrl ||
  (Platform.OS === "android" ? "http://10.0.2.2:8000" : "http://127.0.0.1:8000");

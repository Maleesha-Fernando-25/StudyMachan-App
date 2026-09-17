import { Alert, Platform } from "react-native";

// Alert.alert is a no-op on react-native-web, so messages (and anything done in
// their button callbacks) silently vanish in the browser. Use this instead, and
// never put navigation inside an alert callback.
export function showMessage(title: string, message: string) {
  if (Platform.OS === "web") {
    window.alert(`${title}\n\n${message}`);
  } else {
    Alert.alert(title, message);
  }
}

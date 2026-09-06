import { AntDesign, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { getUserRole } from "../../lib/storage/roleStorage";

// Replace with your actual login function
// import { loginUser } from "../../supabase/authService";

export default function LoginScreen() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    if (!username.trim()) {
      Alert.alert("Missing username", "Please enter your username.");
      return;
    }
    if (!password) {
      Alert.alert("Missing password", "Please enter your password.");
      return;
    }

    setIsLoggingIn(true);

    try {
      // Replace with your real auth call
      // const user = await loginUser(username.trim(), password);

      // For demo, simulate a successful login:
      await new Promise((res) => setTimeout(res, 600));

      // Read the role that was saved at signup landing (used only for login path)
      const role = await getUserRole(); // "student" | "tutor" | null

      if (!role) {
        Alert.alert(
          "Role not found",
          "Please go back and choose Student or Tutor again.",
          [
            {
              text: "OK",
              onPress: () => router.replace("/signup" as any),
            },
          ],
        );
        return;
      }

      // Navigate based on role (for existing users)
      if (role === "tutor") {
        router.replace("/tutor-home" as any);
      } else {
        router.replace("/student-home" as any);
      }
    } catch (err: any) {
      Alert.alert("Login failed", err?.message || "Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#E6E8EA" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo and Title */}
          <View style={styles.logoSection}>
            <View style={styles.logoBox}>
              <Image
                source={require("../../assets/images/studymachan-logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.logoText}>StudyMachan</Text>
          </View>

          {/* Login Card */}
          <View style={styles.card}>
            {/* Username */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Username</Text>

              <View style={styles.inputRow}>
                <Feather name="user" size={18} color="#7DA2A9" />

                <TextInput
                  placeholder="Enter your username"
                  placeholderTextColor="#9CA3AF"
                  value={username}
                  onChangeText={setUsername}
                  style={styles.input}
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!isLoggingIn}
                />
              </View>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity
              style={styles.forgot}
              onPress={() =>
                Alert.alert(
                  "Forgot password",
                  "The forgot-password feature will be added later.",
                )
              }
              disabled={isLoggingIn}
            >
              <Text style={styles.forgotText}>Forgot?</Text>
            </TouchableOpacity>

            {/* Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>

              <View style={styles.inputRow}>
                <Feather name="lock" size={18} color="#7DA2A9" />

                <TextInput
                  placeholder="Enter your password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!isPasswordVisible}
                  value={password}
                  onChangeText={setPassword}
                  style={styles.input}
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!isLoggingIn}
                />

                <TouchableOpacity
                  onPress={() => setIsPasswordVisible((visible) => !visible)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  disabled={isLoggingIn}
                >
                  <Feather
                    name={isPasswordVisible ? "eye" : "eye-off"}
                    size={18}
                    color="#7DA2A9"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.loginButton,
                isLoggingIn && styles.loginButtonDisabled,
              ]}
              onPress={handleLogin}
              disabled={isLoggingIn}
            >
              <Text style={styles.loginButtonText}>
                {isLoggingIn ? "Logging in..." : "Login"}
              </Text>

              <Feather name="arrow-right" size={18} color="#FFFFFF" />
            </TouchableOpacity>

            {/* Create Account Navigation */}
            <View style={styles.footerRow}>
              <Text style={styles.footerText}>Don't have an account? </Text>

              <TouchableOpacity
                onPress={() => router.push("/create-account")}
                disabled={isLoggingIn}
              >
                <Text style={styles.signUpText}>Sign Up</Text>
              </TouchableOpacity>
            </View>

            {/* Google Login Placeholder */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.googleButton}
              onPress={() =>
                Alert.alert(
                  "Google login",
                  "Google authentication will be connected later.",
                )
              }
              disabled={isLoggingIn}
            >
              <AntDesign name="google" size={18} color="#EA4335" />
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#E6E8EA",
  },
  keyboardView: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  logoSection: {
    alignItems: "center",
    marginBottom: 28,
  },
  logoBox: {
    backgroundColor: "#FFFFFF",
    padding: 8,
    borderRadius: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 3,
    elevation: 1,
    marginBottom: 8,
  },
  logo: {
    width: 112,
    height: 112,
  },
  logoText: {
    fontSize: 22,
    fontWeight: "800",
    color: "#000000",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    width: "100%",
    maxWidth: 360,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    color: "#7DA2A9",
    fontWeight: "600",
    marginBottom: 6,
    marginLeft: 4,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    backgroundColor: "#FFFFFF",
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: "#1F2937",
  },
  forgot: {
    alignSelf: "flex-end",
    marginBottom: 8,
  },
  forgotText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#B85C38",
  },
  loginButton: {
    backgroundColor: "#FF7A45",
    height: 48,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 20,
    shadowColor: "#FF7A45",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  loginButtonDisabled: {
    backgroundColor: "#D1D5DB",
    shadowOpacity: 0,
    elevation: 0,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginRight: 8,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  footerText: {
    fontSize: 13,
    color: "#7DA2A9",
    fontWeight: "500",
  },
  signUpText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#B85C38",
  },
  googleButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    height: 48,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  googleButtonText: {
    color: "#1F2937",
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 10,
  },
});

import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
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
import { showMessage } from "../../lib/notify";
import {
  AuthError,
  loginUser,
  logoutUser,
  resendVerificationEmail,
} from "../../supabase/authService";

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !email.includes("@")) {
      showMessage("Invalid email", "Please enter the email address you registered with.");
      return;
    }
    if (!password) {
      showMessage("Missing password", "Please enter your password.");
      return;
    }

    setIsLoggingIn(true);
    try {
      // The backend decides the role from the students/tutors tables.
      const { profile } = await loginUser(email, password);
      router.replace(profile.role === "tutor" ? "/tutor-home" : "/student-home");
    } catch (err: any) {
      if (err instanceof AuthError && err.code === "email_not_confirmed") {
        // Supabase rate-limits resends; still move on to the code screen.
        await resendVerificationEmail(email).catch(() => undefined);
        router.replace({ pathname: "/verify_email", params: { email: email.trim() } });
        return;
      }
      if (err instanceof AuthError && err.status === 404) {
        // Auth account exists but no students/tutors row (old signup path). Don't leave a half session behind.
        await logoutUser().catch(() => undefined);
        showMessage(
          "No profile found",
          "This account has no student or tutor profile. Please sign up again.",
        );
        return;
      }
      showMessage("Login failed", err?.message || "Please check your credentials and try again.");
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
            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>

              <View style={styles.inputRow}>
                <Feather name="user" size={18} color="#7DA2A9" />

                <TextInput
                  placeholder="Enter your email"
                  placeholderTextColor="#9CA3AF"
                  value={email}
                  onChangeText={setEmail}
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
                showMessage(
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
              <Text style={styles.footerText}>
                Don&apos;t have an account?{" "}
              </Text>

              <TouchableOpacity
                onPress={() => router.push("/create-account")}
                disabled={isLoggingIn}
              >
                <Text style={styles.signUpText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
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
    boxShadow: "0px 1px 3px rgba(0,0,0,0.07)",
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
    boxShadow: "0px 2px 6px rgba(0,0,0,0.08)",
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
    boxShadow: "0px 2px 4px rgba(255,122,69,0.2)",
  },
  loginButtonDisabled: {
    backgroundColor: "#D1D5DB",
    boxShadow: "none",
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
});

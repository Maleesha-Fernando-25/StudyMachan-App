import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
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
import { loginUser } from "../../supabase/authService";

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    if (!email.trim()) {
      Alert.alert(
        "Missing credentials",
        "Please enter the email address you registered with.",
      );
      return;
    }
    if (!email.includes("@")) {
      Alert.alert("Invalid email", "Please enter a valid email address.");
      return;
    }
    if (!password) {
      Alert.alert("Missing password", "Please enter your password.");
      return;
    }

    setIsLoggingIn(true);

    try {
      const { user, profile } = await loginUser(email, password);

      const role =
        profile?.role ||
        (await getUserRole()) ||
        user?.user_metadata?.role ||
        "student";

      if (role === "tutor") {
        router.replace("/tutor-home" as any);
      } else {
        router.replace("/student-home" as any);
      }
    } catch (err: any) {
      Alert.alert(
        "Login failed",
        err?.message || "Please check your credentials and try again.",
      );
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

import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function VerifyEmailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const email = (params.email as string) || "";
  const role = (params.role as "student" | "tutor") || "student";

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleCodeChange = (text: string, index: number) => {
    const newText = text.replace(/[^0-9]/g, "");
    const newCode = [...code];
    newCode[index] = newText;
    setCode(newCode);

    if (newText && index < 5 && inputs.current[index + 1]) {
      inputs.current[index + 1]!.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      if (inputs.current[index - 1]) {
        inputs.current[index - 1]!.focus();
      }
    }
  };

  const isCodeComplete = code.every((digit) => digit.length === 1);

  const handleVerify = async () => {
    if (!isCodeComplete) {
      Alert.alert("Incomplete code", "Please enter all 6 digits.");
      return;
    }

    const otp = code.join("");

    try {
      // TODO: Replace with real backend call when ready
      // await verifyOtpApi({ email, otp });

      // Simulate backend success for now
      await new Promise((res) => setTimeout(res, 600));

      Alert.alert("Verification successful", "Your email has been verified.", [
        {
          text: "OK",
          onPress: () => {
            // Navigate based on role selected at create-account
            if (role === "tutor") {
              router.replace("/tutor-home" as any);
            } else {
              router.replace("/student-home" as any);
            }
          },
        },
      ]);
    } catch (err: any) {
      Alert.alert("Verification failed", err?.message || "Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />

      {/* Back Button + Title (Top, like Create Account screen) */}
      <TouchableOpacity
        style={styles.backButtonWrapper}
        onPress={() => router.back()}
        activeOpacity={0.7}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Feather name="arrow-left" size={24} color="#B45325" />
        <Text style={styles.backTitle}>Create Account</Text>
      </TouchableOpacity>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.title}>Verify your account</Text>
            <Text style={styles.subtitle}>
              We've sent a 6-digit code to your email.
            </Text>

            <View style={styles.otpRow}>
              {code.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref: TextInput | null) => {
                    inputs.current[index] = ref;
                  }}
                  style={[
                    styles.otpInput,
                    {
                      borderColor:
                        index === 0 && !digit
                          ? "#FF7A45"
                          : digit
                            ? "#FF7A45"
                            : "#E5E7EB",
                    },
                  ]}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={digit}
                  onChangeText={(text) => handleCodeChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  selectionColor="#FF7A45"
                />
              ))}
            </View>

            <TouchableOpacity
              activeOpacity={isCodeComplete ? 0.8 : 0.5}
              style={[
                styles.verifyButton,
                {
                  backgroundColor: isCodeComplete ? "#FF7A45" : "#CCCCCC",
                },
              ]}
              onPress={handleVerify}
              disabled={!isCodeComplete}
            >
              <Text
                style={[
                  styles.verifyButtonText,
                  {
                    color: isCodeComplete ? "#FFFFFF" : "#888888",
                  },
                ]}
              >
                Verify
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionLink}
              onPress={() => Alert.alert("Resend", "Resend code (demo)")}
            >
              <Text style={styles.resendText}>Resend Code</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionLink}
              onPress={() => router.push("/create-account")}
            >
              <Text style={styles.changeEmailText}>Change email address</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  backButtonWrapper: {
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#FAFAFA",
  },
  backTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#B45325",
    marginLeft: 8,
  },
  keyboardView: {
    flex: 1,
    backgroundColor: "#EBE4DC",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111111",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 32,
    textAlign: "center",
  },
  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 32,
    paddingHorizontal: 4,
  },
  otpInput: {
    width: 44,
    height: 48,
    borderWidth: 1,
    borderRadius: 12,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    backgroundColor: "#FFFFFF",
  },
  verifyButton: {
    width: "100%",
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    shadowColor: "#FF7A45",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  verifyButtonText: {
    fontSize: 16,
    fontWeight: "700",
  },
  actionLink: {
    marginTop: 8,
  },
  resendText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#B45325",
  },
  changeEmailText: {
    fontSize: 14,
    color: "#666666",
  },
});

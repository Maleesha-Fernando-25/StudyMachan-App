import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
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
import { showMessage } from "../../lib/notify";
import {
  resendVerificationEmail,
  verifyEmailOtp,
} from "../../supabase/authService";

export default function VerifyEmailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const email = (params.email as string) || "";

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
    setErrorMessage("");
    if (!isCodeComplete) return setErrorMessage("Please enter all 6 digits.");
    if (!email) return setErrorMessage("Email address is required for verification.");

    setIsVerifying(true);
    try {
      await verifyEmailOtp(email, code.join(""));
      // Email confirmed: send them to sign in (no alert callback — that never fires on web).
      router.replace("/login");
    } catch (err: any) {
      setErrorMessage(err?.message || "Verification failed. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      showMessage("Missing email", "Email address is required to resend code.");
      return;
    }

    setIsResending(true);
    try {
      await resendVerificationEmail(email);
      showMessage(
        "Code Sent",
        `A new 6-digit verification code has been sent to ${email}.`,
      );
    } catch (err: any) {
      showMessage(
        "Resend failed",
        err?.message || "Failed to resend code. Please try again.",
      );
    } finally {
      setIsResending(false);
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
              We&apos;ve sent a 6-digit code to your email.
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

            {errorMessage ? (
              <Text style={styles.errorText}>{errorMessage}</Text>
            ) : null}

            <TouchableOpacity
              activeOpacity={isCodeComplete && !isVerifying ? 0.8 : 0.5}
              style={[
                styles.verifyButton,
                {
                  backgroundColor:
                    isCodeComplete && !isVerifying ? "#FF7A45" : "#CCCCCC",
                },
              ]}
              onPress={handleVerify}
              disabled={!isCodeComplete || isVerifying}
            >
              <Text
                style={[
                  styles.verifyButtonText,
                  {
                    color:
                      isCodeComplete && !isVerifying ? "#FFFFFF" : "#888888",
                  },
                ]}
              >
                {isVerifying ? "Verifying..." : "Verify"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionLink}
              onPress={handleResendCode}
              disabled={isResending}
            >
              <Text style={styles.resendText}>
                {isResending ? "Sending..." : "Resend Code"}
              </Text>
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
  errorText: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 12,
    fontWeight: "bold",
  },
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
    boxShadow: "0px 2px 6px rgba(0,0,0,0.06)",
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
    boxShadow: "0px 2px 4px rgba(255,122,69,0.2)",
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

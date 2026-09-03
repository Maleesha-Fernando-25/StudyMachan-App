import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Modal,
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

export default function CreateAccountScreen() {
  const router = useRouter();

  // Form State
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  // Date Picker State
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Gender Picker State
  const [gender, setGender] = useState("");
  const [showGenderModal, setShowGenderModal] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setDateOfBirth(currentDate);
    }
  };

  const selectGender = (selected: string) => {
    setGender(selected);
    setShowGenderModal(false);
  };

  const isFormValid = () => {
    if (!fullName.trim()) return false;
    if (!username.trim()) return false;
    if (!email.trim() || !email.includes("@")) return false;
    if (password.length < 8) return false;
    if (!isTermsAccepted) return false;
    return true;
  };

  const handleCreateAccount = async () => {
    if (!fullName.trim()) {
      Alert.alert("Missing name", "Please enter your full name.");
      return;
    }
    if (!username.trim()) {
      Alert.alert("Missing username", "Please enter a username.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      Alert.alert("Invalid email", "Please enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      Alert.alert("Weak password", "Password must be at least 8 characters.");
      return;
    }
    if (!isTermsAccepted) {
      Alert.alert(
        "Terms not accepted",
        "You must accept the Terms & Conditions.",
      );
      return;
    }

    const payload = {
      fullName,
      username,
      email,
      password,
      dateOfBirth: dateOfBirth ? dateOfBirth.toISOString().split("T")[0] : null,
      gender: gender || null,
    };

    try {
      // TODO: Replace with real backend call when ready
      // await createAccountApi(payload);

      // Simulate backend success for now (remove this when using real API)
      await new Promise((res) => setTimeout(res, 600));

      // On success, navigate to verification page
      router.push({
        pathname: "/verify_email",
        params: { email },
      });
    } catch (err: any) {
      Alert.alert(
        "Account creation failed",
        err?.message || "Please try again.",
      );
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F4F4" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          {/* Main White Card Container */}
          <View style={styles.card}>
            {/* Back Button (Top Left) */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Feather name="arrow-left" size={24} color="#D96B43" />
            </TouchableOpacity>

            {/* Header Section */}
            <View style={styles.header}>
              <View style={styles.logoBox}>
                <Image
                  source={require("../assets/images/studymachan-logo.png")}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>
                Join StudyMachan to start learning today.
              </Text>
            </View>

            {/* Form Fields */}
            <View style={styles.form}>
              {/* Full Name */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name</Text>
                <View style={styles.inputRow}>
                  <Feather name="user" size={18} color="#8A7F78" />
                  <TextInput
                    placeholder="Enter your full name"
                    placeholderTextColor="#A39A94"
                    value={fullName}
                    onChangeText={setFullName}
                    style={styles.input}
                  />
                </View>
              </View>

              {/* Birthday Picker */}
              <View style={styles.inputGroup}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setShowDatePicker(true)}
                  style={styles.inputRow}
                >
                  <Feather name="calendar" size={18} color="#8A7F78" />
                  <Text
                    style={[
                      styles.input,
                      {
                        color: dateOfBirth ? "#1F2937" : "#A39A94",
                      },
                    ]}
                  >
                    {dateOfBirth
                      ? `${String(dateOfBirth.getMonth() + 1).padStart(
                          2,
                          "0",
                        )}/${String(dateOfBirth.getDate()).padStart(
                          2,
                          "0",
                        )}/${dateOfBirth.getFullYear()}`
                      : "mm/dd/yyyy"}
                  </Text>
                </TouchableOpacity>

                {showDatePicker && (
                  <DateTimePicker
                    value={dateOfBirth || new Date()}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                    maximumDate={new Date()}
                  />
                )}
              </View>

              {/* Gender Dropdown */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Gender</Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setShowGenderModal(true)}
                  style={styles.inputRow}
                >
                  <View style={styles.inputRowInner}>
                    <Ionicons name="people-outline" size={20} color="#8A7F78" />
                    <Text
                      style={[
                        styles.input,
                        {
                          color: gender ? "#1F2937" : "#A39A94",
                        },
                      ]}
                    >
                      {gender || "Select Gender"}
                    </Text>
                  </View>
                  <Feather name="chevron-down" size={18} color="#8A7F78" />
                </TouchableOpacity>
              </View>

              {/* Email Address */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email Address</Text>
                <View style={styles.inputRow}>
                  <Feather name="mail" size={18} color="#8A7F78" />
                  <TextInput
                    placeholder="Enter your email"
                    placeholderTextColor="#A39A94"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                  />
                </View>
              </View>

              {/* Username */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Username</Text>
                <View style={styles.inputRow}>
                  <Feather name="at-sign" size={18} color="#8A7F78" />
                  <TextInput
                    placeholder="Choose a username"
                    placeholderTextColor="#A39A94"
                    value={username}
                    onChangeText={setUsername}
                    style={styles.input}
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* Password */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputRow}>
                  <Feather name="lock" size={18} color="#8A7F78" />
                  <TextInput
                    placeholder="Create a password"
                    placeholderTextColor="#A39A94"
                    secureTextEntry={!isPasswordVisible}
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                  />
                  <TouchableOpacity
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    <Feather
                      name={isPasswordVisible ? "eye" : "eye-off"}
                      size={18}
                      color="#8A7F78"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Password Helper Text */}
              <Text style={styles.helperText}>
                Must be at least 8 characters.{"\n"}
                Verification code will be sent to your email or phone.
              </Text>

              {/* Terms & Conditions Checkbox */}
              <View style={styles.termsRow}>
                <TouchableOpacity
                  onPress={() => setIsTermsAccepted(!isTermsAccepted)}
                  style={styles.checkbox}
                >
                  <MaterialCommunityIcons
                    name={
                      isTermsAccepted
                        ? "checkbox-marked"
                        : "checkbox-blank-outline"
                    }
                    size={20}
                    color={isTermsAccepted ? "#FF7A45" : "#D1D5DB"}
                  />
                </TouchableOpacity>
                <Text style={styles.termsText}>
                  I accept the{" "}
                  <TouchableOpacity
                    onPress={() => router.push("/terms_and_conditions")}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.termsLink}>Terms & Conditions</Text>
                  </TouchableOpacity>{" "}
                  <TouchableOpacity
                    onPress={() => router.push("/terms_and_conditions")}
                    activeOpacity={0.7}
                  ></TouchableOpacity>
                </Text>
              </View>

              {/* Submit Button */}
              <TouchableOpacity
                activeOpacity={isFormValid() ? 0.8 : 0.5}
                style={[
                  styles.submitButton,
                  {
                    backgroundColor: isFormValid() ? "#FF7A45" : "#CCCCCC",
                  },
                ]}
                onPress={handleCreateAccount}
                disabled={!isFormValid()}
              >
                <Text
                  style={[
                    styles.submitButtonText,
                    {
                      color: isFormValid() ? "#FFFFFF" : "#888888",
                    },
                  ]}
                >
                  Create Account
                </Text>
                <Feather
                  name="arrow-right"
                  size={18}
                  color={isFormValid() ? "#FFFFFF" : "#888888"}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Gender Selection Modal */}
      <Modal
        visible={showGenderModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowGenderModal(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setShowGenderModal(false)}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Gender</Text>

            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => selectGender("Male")}
            >
              <Text style={styles.modalOptionText}>Male</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => selectGender("Female")}
            >
              <Text style={styles.modalOptionText}>Female</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F4F4F4",
  },
  keyboardView: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    width: "100%",
    paddingTop: 40,
    paddingBottom: 32,
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  backButton: {
    position: "absolute",
    top: 24,
    left: 24,
    zIndex: 10,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
    marginTop: 8,
  },
  logoBox: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#FF7A45",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  logo: {
    width: 56,
    height: 56,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#222222",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    paddingHorizontal: 16,
  },
  form: {
    gap: 12,
  },
  inputGroup: {
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    color: "#5C534D",
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
    backgroundColor: "#FCFCFC",
  },
  inputRowInner: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: "#1F2937",
  },
  helperText: {
    fontSize: 10,
    color: "#6B7280",
    marginTop: 8,
    marginLeft: 4,
    lineHeight: 14,
  },
  termsRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 12,
    marginLeft: 4,
    paddingRight: 8,
  },
  checkbox: {
    marginRight: 8,
    marginTop: 2,
  },
  termsText: {
    fontSize: 12,
    color: "#6B7280",
    lineHeight: 18,
    flex: 1,
  },
  termsLink: {
    fontSize: 12,
    color: "#D96B43",
    fontWeight: "700",
  },
  submitButton: {
    height: 48,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    shadowColor: "#FF7A45",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "700",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 12,
    textAlign: "center",
  },
  modalOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  modalOptionText: {
    fontSize: 16,
    color: "#1F2937",
  },
});

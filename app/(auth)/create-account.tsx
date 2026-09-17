import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
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
import AppButton from "../../components/common/AppButton";
import { getUserRole } from "../../lib/storage/roleStorage";
import { registerUser } from "../../supabase/authService";

const toIsoDate = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const ageInYears = (birthday: Date) => {
  const today = new Date();
  const hadBirthday =
    today.getMonth() > birthday.getMonth() ||
    (today.getMonth() === birthday.getMonth() &&
      today.getDate() >= birthday.getDate());
  return today.getFullYear() - birthday.getFullYear() - (hadBirthday ? 0 : 1);
};

export default function CreateAccountScreen() {
  const router = useRouter();

  // Form State
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Date Picker State
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Gender Picker State
  const [gender, setGender] = useState("");
  const [showGenderModal, setShowGenderModal] = useState(false);

  // Role State (for new accounts, selected here)
  const [selectedRole, setSelectedRole] = useState<"student" | "tutor">(
    "student",
  );

  // Pre-select the chip with the choice made on the landing page (user can still change it).
  useEffect(() => {
    getUserRole().then((role) => role && setSelectedRole(role));
  }, []);

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

  const handleCreateAccount = async () => {
    // Every problem is shown inline: Alert.alert is a no-op on web.
    setErrorMessage("");

    if (!fullName.trim()) return setErrorMessage("Please enter your full name.");
    if (username.trim().length < 3)
      return setErrorMessage("Username must be at least 3 characters.");
    if (!email.trim() || !email.includes("@"))
      return setErrorMessage("Please enter a valid email address.");
    if (password.length < 8)
      return setErrorMessage("Password must be at least 8 characters.");
    if (!dateOfBirth || !gender || !address.trim())
      return setErrorMessage("Please enter the required details.");
    if (address.trim().length < 5)
      return setErrorMessage("Address must be at least 5 characters.");
    if (!isTermsAccepted)
      return setErrorMessage("You must accept the Terms & Conditions.");

    const dateOfBirthString = toIsoDate(dateOfBirth);
    if (selectedRole === "tutor" && ageInYears(dateOfBirth) < 18)
      return setErrorMessage("Tutors must be at least 18 years old.");

    setIsSubmitting(true);
    try {
      const result = await registerUser({
        email: email.trim(),
        password,
        role: selectedRole,
        full_name: fullName.trim(),
        username: username.trim(),
        date_of_birth: dateOfBirthString,
        gender,
        address: address.trim(),
      });

      // Never navigate from inside an alert callback: go straight there.
      if (result.needs_email_confirmation) {
        router.replace({
          pathname: "/verify_email",
          params: { email: email.trim() },
        });
      } else {
        router.replace("/login");
      }
    } catch (error: any) {
      setErrorMessage(error?.message || "Sign up failed. Please try again.");
    } finally {
      setIsSubmitting(false);
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
          {/* Back Button (Top Left) */}
          <TouchableOpacity
            style={styles.backButtonWrapper}
            onPress={() => router.back()}
          >
            <Feather name="arrow-left" size={24} color="#D96B43" />
          </TouchableOpacity>

          {/* Header Section */}
          <View style={styles.header}>
            <View style={styles.logoBox}>
              <Image
                source={require("../../assets/images/studymachan-logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>
              Join StudyMachan & start your journey today.
            </Text>
          </View>

          {/* Form Fields */}
          <View style={styles.form}>
            {/* Role Selector (Student / Tutor) - Moved to Top */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>I am a</Text>
              <View style={styles.roleRow}>
                <TouchableOpacity
                  style={[
                    styles.roleChip,
                    selectedRole === "student" && styles.roleChipSelected,
                  ]}
                  onPress={() => setSelectedRole("student")}
                >
                  <Text
                    style={[
                      styles.roleChipText,
                      selectedRole === "student" && styles.roleChipTextSelected,
                    ]}
                  >
                    Student
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.roleChip,
                    selectedRole === "tutor" && styles.roleChipSelected,
                  ]}
                  onPress={() => setSelectedRole("tutor")}
                >
                  <Text
                    style={[
                      styles.roleChipText,
                      selectedRole === "tutor" && styles.roleChipTextSelected,
                    ]}
                  >
                    Tutor
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

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
              <Text style={styles.label}>Birthday</Text>
              {Platform.OS === "web" ? (
                // The native DateTimePicker has no web implementation; use the browser's own date input.
                <View style={styles.inputRow}>
                  <Feather name="calendar" size={18} color="#8A7F78" />
                  <input
                    type="date"
                    max={toIsoDate(new Date())}
                    value={dateOfBirth ? toIsoDate(dateOfBirth) : ""}
                    onChange={(e) =>
                      setDateOfBirth(
                        e.target.value
                          ? new Date(`${e.target.value}T00:00:00`)
                          : null,
                      )
                    }
                    style={webDateInputStyle}
                  />
                </View>
              ) : (
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
              )}

              {Platform.OS !== "web" && showDatePicker && (
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

            {/* Address */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Address</Text>
              <View style={styles.inputRow}>
                <Feather name="map-pin" size={18} color="#8A7F78" />
                <TextInput
                  placeholder="Enter your address"
                  placeholderTextColor="#A39A94"
                  value={address}
                  onChangeText={setAddress}
                  style={styles.input}
                />
              </View>
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
              {/* Password helper text moved right after password field */}
              <Text style={styles.helperText}>
                Must be at least 8 characters.
              </Text>
            </View>

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
                </TouchableOpacity>
              </Text>
            </View>

            {errorMessage ? (
              <Text style={styles.errorText}>{errorMessage}</Text>
            ) : null}

            {/* Submit Button */}
            <AppButton
              title={isSubmitting ? "Creating account..." : "Create Account"}
              onPress={handleCreateAccount}
              disabled={!isTermsAccepted}
            />
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

// Plain CSS for the web-only <input type="date">, matching styles.input.
const webDateInputStyle = {
  flex: 1,
  marginLeft: 10,
  fontSize: 14,
  color: "#1F2937",
  border: "none",
  outline: "none",
  background: "transparent",
  fontFamily: "inherit",
} as const;

//styles
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
  backButtonWrapper: {
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 1px 3px rgba(0,0,0,0.05)",
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
    marginTop: 56,
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
  errorText: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
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
  roleRow: {
    flexDirection: "row",
    gap: 10,
  },
  roleChip: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  roleChipSelected: {
    backgroundColor: "#FF7A45",
    borderColor: "#FF7A45",
  },
  roleChipText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#5C534D",
  },
  roleChipTextSelected: {
    color: "#FFFFFF",
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
    boxShadow: "0px 2px 8px rgba(0,0,0,0.2)",
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

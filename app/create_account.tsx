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
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function CreateAccountScreen() {
  const router = useRouter();

  // Form State
  const [fullName, setFullName] = useState("");
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

  const handleCreateAccount = () => {
    if (!fullName.trim()) {
      Alert.alert("Missing name", "Please enter your full name.");
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

    // TODO: Replace with real sign-up logic later
    Alert.alert("Account created", "Your account has been created (demo).", [
      {
        text: "OK",
        onPress: () => {
          // After creating account, go to login or main app
          router.replace("/login");
        },
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F4F4F4]">
      <StatusBar barStyle="dark-content" backgroundColor="#F4F4F4" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, padding: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Main White Card Container */}
          <View className="bg-white rounded-[24px] p-6 shadow-sm w-full pt-10 pb-8 mt-4 relative">
            {/* Back Button (Top Left) */}
            <TouchableOpacity
              className="absolute top-6 left-6 z-10"
              onPress={() => router.back()}
            >
              <Feather name="arrow-left" size={24} color="#D96B43" />
            </TouchableOpacity>

            {/* Header Section */}
            <View className="items-center mb-6 mt-2">
              <View className="w-20 h-20 bg-white rounded-full border border-[#FF7A45] items-center justify-center mb-4">
                {/* Replace with your local logo */}
                <Image
                  source={require("../assets/images/studymachan-logo.png")}
                  className="w-14 h-14"
                  resizeMode="contain"
                />
              </View>
              <Text className="text-2xl font-extrabold text-[#222222] mb-2">
                Create Account
              </Text>
              <Text className="text-xs text-gray-500 text-center px-4">
                Join StudyMachan to start learning today.
              </Text>
            </View>

            {/* Form Fields */}
            <View className="space-y-4">
              {/* Full Name */}
              <View>
                <Text className="text-xs font-bold text-[#5C534D] mb-1.5 ml-1">
                  Full Name
                </Text>
                <View className="flex-row items-center border border-gray-200 rounded-xl px-3 h-12 bg-[#FCFCFC]">
                  <Feather name="user" size={18} color="#8A7F78" />
                  <TextInput
                    placeholder="Enter your full name"
                    placeholderTextColor="#A39A94"
                    value={fullName}
                    onChangeText={setFullName}
                    className="flex-1 ml-2.5 text-sm text-gray-800"
                  />
                </View>
              </View>

              {/* Birthday Picker */}
              <View className="mt-4">
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setShowDatePicker(true)}
                  className="flex-row items-center border border-gray-200 rounded-xl px-3 h-12 bg-[#FCFCFC]"
                >
                  <Feather name="calendar" size={18} color="#8A7F78" />
                  <Text
                    className={`flex-1 ml-2.5 text-sm ${
                      dateOfBirth ? "text-gray-800" : "text-[#A39A94]"
                    }`}
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
              <View className="mt-4">
                <Text className="text-xs font-bold text-[#5C534D] mb-1.5 ml-1">
                  Gender
                </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setShowGenderModal(true)}
                  className="flex-row items-center justify-between border border-gray-200 rounded-xl px-3 h-12 bg-[#FCFCFC]"
                >
                  <View className="flex-row items-center">
                    <Ionicons name="people-outline" size={20} color="#8A7F78" />
                    <Text
                      className={`ml-2.5 text-sm ${
                        gender ? "text-gray-800" : "text-[#A39A94]"
                      }`}
                    >
                      {gender || "Select Gender"}
                    </Text>
                  </View>
                  <Feather name="chevron-down" size={18} color="#8A7F78" />
                </TouchableOpacity>
              </View>

              {/* Email Address */}
              <View className="mt-4">
                <Text className="text-xs font-bold text-[#5C534D] mb-1.5 ml-1">
                  Email Address
                </Text>
                <View className="flex-row items-center border border-gray-200 rounded-xl px-3 h-12 bg-[#FCFCFC]">
                  <Feather name="mail" size={18} color="#8A7F78" />
                  <TextInput
                    placeholder="Enter your email"
                    placeholderTextColor="#A39A94"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                    className="flex-1 ml-2.5 text-sm text-gray-800"
                  />
                </View>
              </View>

              {/* Password */}
              <View className="mt-4">
                <Text className="text-xs font-bold text-[#5C534D] mb-1.5 ml-1">
                  Password
                </Text>
                <View className="flex-row items-center border border-gray-200 rounded-xl px-3 h-12 bg-[#FCFCFC]">
                  <Feather name="lock" size={18} color="#8A7F78" />
                  <TextInput
                    placeholder="Create a password"
                    placeholderTextColor="#A39A94"
                    secureTextEntry={!isPasswordVisible}
                    value={password}
                    onChangeText={setPassword}
                    className="flex-1 ml-2.5 text-sm text-gray-800"
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
              <Text className="text-[10px] text-gray-500 mt-2 ml-1 leading-4">
                Must be at least 8 characters.{"\n"}
                Verification code will be sent to your email or phone.
              </Text>

              {/* Terms & Conditions Checkbox */}
              <View className="flex-row items-start mt-5 ml-1 pr-4">
                <TouchableOpacity
                  onPress={() => setIsTermsAccepted(!isTermsAccepted)}
                  className="mr-2 mt-0.5"
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
                <Text className="text-xs text-gray-500 leading-4 flex-1">
                  I accept the{" "}
                  <Text className="text-[#D96B43]">Terms & Conditions</Text> and{" "}
                  <Text className="text-[#D96B43]">Privacy Policy</Text>
                </Text>
              </View>

              {/* Submit Button */}
              <TouchableOpacity
                activeOpacity={0.8}
                className="bg-[#FF7A45] h-12 rounded-xl flex-row items-center justify-center gap-2 mt-6 shadow-sm"
                onPress={handleCreateAccount}
              >
                <Text className="text-white font-bold text-base">
                  Create Account
                </Text>
                <Feather name="arrow-right" size={18} color="#FFFFFF" />
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
          className="flex-1 bg-black/40 justify-center items-center px-8"
        >
          <View className="bg-white w-full rounded-2xl p-4 shadow-lg">
            <Text className="text-base font-bold text-gray-800 mb-4 text-center">
              Select Gender
            </Text>

            <TouchableOpacity
              className="py-3 border-b border-gray-100 flex-row items-center justify-center"
              onPress={() => selectGender("Male")}
            >
              <Text className="text-base text-gray-800">Male</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="py-3 flex-row items-center justify-center"
              onPress={() => selectGender("Female")}
            >
              <Text className="text-base text-gray-800">Female</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

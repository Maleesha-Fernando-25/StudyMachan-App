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
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = () => {
    if (!username.trim()) {
      Alert.alert("Missing username", "Please enter your username.");
      return;
    }
    if (!password) {
      Alert.alert("Missing password", "Please enter your password.");
      return;
    }

    // TODO: Replace with real login logic (API / Firebase / etc.)
    Alert.alert("Login", "Login successful (demo).", [
      {
        text: "OK",
        onPress: () => {
          // After login, go to main app (tabs)
          router.replace("/(tabs)");
        },
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#E6E8EA]">
      <StatusBar barStyle="dark-content" backgroundColor="#E6E8EA" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 60,
            paddingBottom: 40,
          }}
          className="px-6"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo & Title Section */}
          <View className="items-center mb-8">
            <View className="bg-white p-2 rounded-2xl shadow-sm mb-4">
              {/* Replace with your local logo */}
              <Image
                source={require("../assets/images/studymachan-logo.png")}
                className="w-28 h-28"
                resizeMode="contain"
              />
            </View>
            <Text className="text-[22px] font-extrabold text-black">
              StudyMachan
            </Text>
          </View>

          {/* Login Card */}
          <View className="bg-white rounded-[20px] p-6 w-full max-w-sm shadow-md">
            {/* Username Input */}
            <View className="mb-2">
              <Text className="text-xs text-[#7DA2A9] font-medium mb-1.5 ml-1">
                Username
              </Text>
              <View className="flex-row items-center border border-gray-200 rounded-xl px-3 h-12">
                <Feather name="user" size={18} color="#7DA2A9" />
                <TextInput
                  placeholder="Enter your username"
                  placeholderTextColor="#9CA3AF"
                  value={username}
                  onChangeText={setUsername}
                  className="flex-1 ml-2.5 text-sm text-gray-800"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Forgot Password Link */}
            <TouchableOpacity
              className="self-end mb-2"
              onPress={() =>
                Alert.alert("Forgot password", "Implement forgot password flow")
              }
            >
              <Text className="text-xs font-semibold text-[#B85C38]">
                Forgot?
              </Text>
            </TouchableOpacity>

            {/* Password Input */}
            <View className="mb-5">
              <Text className="text-xs text-[#7DA2A9] font-medium mb-1.5 ml-1">
                Password
              </Text>
              <View className="flex-row items-center border border-gray-200 rounded-xl px-3 h-12">
                <Feather name="lock" size={18} color="#7DA2A9" />
                <TextInput
                  placeholder="Enter your password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!isPasswordVisible}
                  value={password}
                  onChangeText={setPassword}
                  className="flex-1 ml-2.5 text-sm text-gray-800"
                />
                <TouchableOpacity
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
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
              className="bg-[#FF7A45] h-12 rounded-xl flex-row items-center justify-center gap-2 mb-8 shadow-sm"
              onPress={handleLogin}
            >
              <Text className="text-white font-bold text-base">Login</Text>
              <Feather name="arrow-right" size={18} color="#FFFFFF" />
            </TouchableOpacity>

            {/* Sign Up Redirect */}
            <View className="flex-row items-center justify-center mb-4">
              <Text className="text-xs text-[#7DA2A9] font-medium">
                Don't have an account?{" "}
              </Text>
              <TouchableOpacity onPress={() => router.push("/signup")}>
                <Text className="text-xs font-bold text-[#B85C38]">
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>

            {/* Continue with Google */}
            <TouchableOpacity
              activeOpacity={0.8}
              className="bg-white border border-gray-200 h-12 rounded-xl flex-row items-center justify-center gap-3"
              onPress={() =>
                Alert.alert("Google login", "Implement Google OAuth later")
              }
            >
              <AntDesign name="google" size={18} color="#EA4335" />
              <Text className="text-gray-800 font-bold text-sm">
                Continue with Google
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

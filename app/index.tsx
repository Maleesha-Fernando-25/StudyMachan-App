import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUpScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View className="flex-1 items-center justify-center px-7">
        <Image
          source={require("../assets/images/studymachan-logo.png")}
          className="w-44 h-44 mb-5"
          resizeMode="contain"
        />

        <Text className="mb-2 text-2xl font-bold text-black">StudyMachan</Text>

        <Text className="mb-10 text-center text-sm text-gray-500">
          Find a guide. Grow with pride.
        </Text>

        <View className="mb-9 w-full gap-3.5">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => console.log("I'm a Tutor pressed")}
            className="h-14 flex-row items-center justify-center rounded-xl bg-[#FF7A45] shadow-sm"
          >
            <MaterialCommunityIcons
              name="account-group-outline"
              size={22}
              color="#FFFFFF"
            />
            <Text className="ml-2.5 text-base font-semibold text-white">
              I'm a Tutor
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => console.log("I'm a Student pressed")}
            className="h-14 flex-row items-center justify-center rounded-xl bg-[#FF7A45] shadow-sm"
          >
            <FontAwesome5 name="user-graduate" size={18} color="#FFFFFF" />
            <Text className="ml-2.5 text-base font-semibold text-white">
              I'm a Student
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center">
          <Text className="text-sm text-gray-600">
            Already have an account?{" "}
          </Text>

          <TouchableOpacity onPress={() => console.log("Navigate to Sign In")}>
            <Text className="text-sm font-semibold text-[#FF7A45]">
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

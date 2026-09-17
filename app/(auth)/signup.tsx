import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { showMessage } from "../../lib/notify";
import { saveUserRole } from "../../lib/storage/roleStorage";

export default function SignUpLandingScreen() {
  const router = useRouter();

  const selectRole = async (role: "student" | "tutor") => {
    try {
      await saveUserRole(role);
      router.replace("/login");
    } catch (error) {
      showMessage(
        "Could not continue",
        error instanceof Error
          ? error.message
          : "Please try selecting your role again.",
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.content}>
        {/* Logo */}
        <Image
          source={require("../../assets/images/studymachan-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Title & Tagline */}
        <Text style={styles.title}>StudyMachan</Text>
        <Text style={styles.tagline}>Find a guide. Grow with pride.</Text>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          {/* I'm a Tutor */}
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.8}
            onPress={() => selectRole("tutor")}
          >
            <MaterialCommunityIcons
              name="account-group-outline"
              size={22}
              color="#FFFFFF"
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>I&apos;m a Tutor</Text>
          </TouchableOpacity>

          {/* I'm a Student */}
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.8}
            onPress={() => selectRole("student")}
          >
            <FontAwesome5
              name="user-graduate"
              size={18}
              color="#FFFFFF"
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>I&apos;m a Student</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 8,
  },
  tagline: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 40,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    gap: 14,
  },
  primaryButton: {
    backgroundColor: "#FF7A45",
    height: 52,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 2px 4px rgba(255,122,69,0.15)",
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

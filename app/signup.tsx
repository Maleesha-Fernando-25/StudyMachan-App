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
import { saveUserRole } from "./lib/auth";

export default function SignUpLandingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.content}>
        {/* Logo */}
        <Image
          source={require("../assets/images/studymachan-logo.png")}
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
            onPress={async () => {
              console.log("Navigating to /login from Tutor button");
              await saveUserRole("tutor");
              router.push("/login");
            }}
          >
            <MaterialCommunityIcons
              name="account-group-outline"
              size={22}
              color="#FFFFFF"
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>I'm a Tutor</Text>
          </TouchableOpacity>

          {/* I'm a Student */}
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.8}
            onPress={async () => {
              console.log("Navigating to /login from Student button");
              await saveUserRole("student");
              router.push("/login");
            }}
          >
            <FontAwesome5
              name="user-graduate"
              size={18}
              color="#FFFFFF"
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>I'm a Student</Text>
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
    shadowColor: "#FF7A45",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
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

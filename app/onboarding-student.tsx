import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function StudentOnboardingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Student onboarding</Text>
        <Text style={styles.subtitle}>
          Tell us about your learning goals to get started.
        </Text>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => router.replace("/signup")}
        >
          <Text style={styles.buttonText}>Back to Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
  },
  title: { color: "#000000", fontSize: 28, fontWeight: "700", marginBottom: 10 },
  subtitle: { color: "#666666", fontSize: 15, marginBottom: 28, textAlign: "center" },
  button: {
    alignItems: "center",
    backgroundColor: "#FF7A45",
    borderRadius: 12,
    height: 52,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  buttonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
});

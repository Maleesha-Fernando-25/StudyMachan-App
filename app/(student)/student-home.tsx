import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function StudentHomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Home</Text>

      <Text style={styles.text}>
        Login successful. You are logged in as a student.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    backgroundColor: "#FFFFFF",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
  },

  text: {
    fontSize: 16,
    textAlign: "center",
  },
});
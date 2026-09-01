import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function TermsAndConditionsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={22} color="#B45325" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms & Conditions</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.updatedText}>Last Updated: October 24, 2023</Text>

          <Text style={styles.sectionTitle}>
            Study Machan - General Terms and Conditions
          </Text>

          {/* Section 1 */}
          <Text style={styles.subTitle}>1. Acceptance of Terms</Text>
          <Text style={styles.text}>
            By downloading, registering, or signing in to the Study Machan
            platform as a Student or Tutor, you agree to comply with and be
            bound by these Terms and Conditions. If you do not agree to these
            terms, you must not use the application.
          </Text>

          {/* Section 2 */}
          <Text style={styles.subTitle}>
            2. Eligibility & Account Registration
          </Text>
          <Text style={styles.text}>
            Accurate Information: You must provide accurate, current, and
            complete information during registration and keep your account
            details updated.{"\n"}
            Account Security: You are responsible for maintaining the
            confidentiality of your account credentials and for all activities
            that occur under your account.
          </Text>

          {/* Section 3 */}
          <Text style={styles.subTitle}>
            3. General Code of Conduct (All Users)
          </Text>
          <Text style={styles.text}>
            Respectful Environment: All users must maintain a safe, respectful,
            and constructive environment. Harassment, hate speech,
            discrimination, or abusive behavior of any kind will result in
            immediate account termination.{"\n"}
            Lawful Use: You agree to use Study Machan solely for lawful
            educational purposes. Any fraudulent activity, misuse of personal
            data, or attempt to bypass platform security is strictly prohibited.
          </Text>

          {/* Section 4 */}
          <Text style={styles.subTitle}>
            4. Bookings, Payments, & Cancellations
          </Text>
          <Text style={styles.text}>
            Transaction Integrity: All sessions, bookings, and pricing must be
            handled through the platform structures.{"\n"}
            Cancellation Policy: Users must adhere to Study Machan’s specified
            cancellation and rescheduling guidelines for missed or canceled
            sessions.
          </Text>

          {/* Section 5 */}
          <Text style={styles.subTitle}>
            5. Limitation of Liability & Independent Status
          </Text>
          <Text style={styles.text}>
            Platform Role: Study Machan acts strictly as a technology
            marketplace connecting independent learners and tutors. We do not
            directly employ tutors, nor do we guarantee specific academic
            outcomes or exam results.{"\n"}
            User Responsibility: Users interact with one another at their own
            discretion and risk. Study Machan is not liable for disputes arising
            outside the scope of platform-governed bookings.
          </Text>

          {/* Section 6 */}
          <Text style={styles.subTitle}>6. Privacy & Data Protection</Text>
          <Text style={styles.text}>
            You agree that Study Machan may collect and process your personal
            information in accordance with our privacy practices. Users must
            protect any contact or educational details shared during sessions
            and use them solely for educational purposes.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#B45325",
    marginLeft: 16,
  },
  scroll: {
    flex: 1,
    backgroundColor: "#F9ECE0",
  },
  scrollContent: {
    padding: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  updatedText: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 20,
    lineHeight: 22,
  },
  subTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 8,
  },
  text: {
    fontSize: 13,
    color: "#1F2937",
    lineHeight: 20,
    marginBottom: 20,
  },
});

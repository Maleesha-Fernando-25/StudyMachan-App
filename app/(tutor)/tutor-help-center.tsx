import {
    Feather,
    FontAwesome,
    Ionicons,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function HelpCenterScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={styles.headerButton}
        >
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help Center</Text>
        <TouchableOpacity
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={styles.headerButton}
        >
          <Feather name="search" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <Text style={styles.heroTitle}>How can we help?</Text>
        <View style={styles.searchBarContainer}>
          <Feather
            name="search"
            size={20}
            color="#666"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for articles, tutorials..."
            placeholderTextColor="#888"
          />
        </View>

        {/* Popular Topics Section */}
        <Text style={styles.sectionTitle}>Popular Topics</Text>
        <View style={styles.topicsGrid}>
          {/* Topic 1 */}
          <TouchableOpacity style={styles.topicCard}>
            <View style={styles.iconCircle}>
              <Ionicons name="person" size={22} color="#A34A28" />
            </View>
            <Text style={styles.topicText}>Account &{"\n"}Profile</Text>
          </TouchableOpacity>

          {/* Topic 2 */}
          <TouchableOpacity style={styles.topicCard}>
            <View style={styles.iconCircle}>
              <Ionicons name="card" size={22} color="#A34A28" />
            </View>
            <Text style={styles.topicText}>Payments &{"\n"}Billing</Text>
          </TouchableOpacity>

          {/* Topic 3 */}
          <TouchableOpacity style={styles.topicCard}>
            <View style={styles.iconCircle}>
              <Ionicons name="build" size={22} color="#A34A28" />
            </View>
            <Text style={styles.topicText}>Session{"\n"}Troubleshooting</Text>
          </TouchableOpacity>

          {/* Topic 4 */}
          <TouchableOpacity style={styles.topicCard}>
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons name="shield" size={24} color="#A34A28" />
            </View>
            <Text style={styles.topicText}>Trust & Safety</Text>
          </TouchableOpacity>
        </View>

        {/* FAQs Section */}
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        <View style={styles.faqContainer}>
          <TouchableOpacity style={styles.faqCard}>
            <Text style={styles.faqText}>How do I book a tutor?</Text>
            <Feather name="chevron-down" size={20} color="#333" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.faqCard}>
            <Text style={styles.faqText}>What is the refund policy?</Text>
            <Feather name="chevron-down" size={20} color="#333" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.faqCard}>
            <Text style={styles.faqText}>How does the Focus Timer work?</Text>
            <Feather name="chevron-down" size={20} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Contact Support Card */}
        <View style={styles.contactCard}>
          <Text style={styles.contactTitle}>Still need help?</Text>
          <Text style={styles.contactSubtitle}>
            Our support team is always ready to assist you.
          </Text>

          <TouchableOpacity style={styles.emailButton}>
            <Feather name="mail" size={18} color="#1A1A1A" />
            <Text style={styles.emailButtonText}>Email Us</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.supportButton}>
            <Feather name="headphones" size={18} color="#FFFFFF" />
            <Text style={styles.supportButtonText}>Contact Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation (same as tutor home, no icon highlighted) */}
      <View style={styles.bottomNav}>
        {/* Home */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/tutor-home" as any)}
        >
          <Ionicons name="home" size={20} color="#9CA3AF" />
          <Text style={styles.navTextInactive}>Home</Text>
        </TouchableOpacity>

        {/* My Schedule */}
        <TouchableOpacity style={styles.navItem}>
          <Feather name="calendar" size={18} color="#9CA3AF" />
          <Text style={styles.navTextInactive}>My Schedule</Text>
        </TouchableOpacity>

        {/* Earnings */}
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons
            name="wallet-outline"
            size={18}
            color="#9CA3AF"
          />
          <Text style={styles.navTextInactive}>Earnings</Text>
        </TouchableOpacity>

        {/* Reviews */}
        <TouchableOpacity style={styles.navItem}>
          <FontAwesome name="star" size={16} color="#9CA3AF" />
          <Text style={styles.navTextInactive}>Reviews</Text>
        </TouchableOpacity>

        {/* Notifications */}
        <TouchableOpacity style={styles.navItem}>
          <Feather name="bell" size={18} color="#9CA3AF" />
          <Text style={styles.navTextInactive}>Notifications</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
  },
  headerButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#A34A28",
  },
  scrollContainer: {
    backgroundColor: "#FDF7ED",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 120, // extra space for bottom nav
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#A34A28",
    textAlign: "center",
    marginBottom: 20,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    paddingHorizontal: 16,
    height: 50,
    marginBottom: 30,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#333",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 16,
  },
  topicsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  topicCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#EAEAEA",
    marginBottom: 16,
    minHeight: 120,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FDF0E1",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  topicText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
    textAlign: "center",
    lineHeight: 20,
  },
  faqContainer: {
    marginBottom: 30,
  },
  faqCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    marginBottom: 12,
  },
  faqText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#1A1A1A",
  },
  contactCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },
  contactTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  contactSubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 20,
  },
  emailButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    backgroundColor: "#FFFFFF",
    marginBottom: 12,
  },
  emailButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1A1A1A",
    marginLeft: 8,
  },
  supportButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: "#FA8055",
  },
  supportButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
    marginLeft: 8,
  },

  // Bottom nav (same as tutor home, no icon highlighted)
  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingVertical: 12,
    paddingHorizontal: 12,
    paddingBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navItem: {
    alignItems: "center",
    flex: 1,
  },
  navTextActive: {
    fontSize: 9,
    fontWeight: "700",
    color: "#FF6B35",
    marginTop: 2,
  },
  navTextInactive: {
    fontSize: 9,
    fontWeight: "600",
    color: "#9CA3AF",
    marginTop: 2,
  },
});

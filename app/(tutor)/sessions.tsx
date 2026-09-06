import {
    Feather,
    FontAwesome,
    Ionicons,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type SessionItem = {
  id: string;
  name: string;
  subject: string;
  date: string;
  avatar: string;
  isLive?: boolean;
  liveText?: string;
  actionText: string;
  isPrimaryAction: boolean;
};

export default function MySessionsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Upcoming");

  const upcomingSessions: SessionItem[] = [
    {
      id: "1",
      name: "Dr. Aris Thorne",
      subject: "Quantum Mechanics",
      date: "Mon, Nov 12 • 10:30 AM (1 hr)",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      isLive: true,
      liveText: "Live in 10m",
      actionText: "Join Session",
      isPrimaryAction: true,
    },
    {
      id: "2",
      name: "Elena Rostova",
      subject: "Advanced Calculus",
      date: "Wed, Nov 14 • 2:00 PM (45 min)",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
      isLive: false,
      actionText: "Reschedule",
      isPrimaryAction: false,
    },
    {
      id: "3",
      name: "Marcus Vance",
      subject: "Modern Literature",
      date: "Fri, Nov 16 • 11:00 AM (1 hr)",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      isLive: false,
      actionText: "Reschedule",
      isPrimaryAction: false,
    },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF8F5" />

      {/* Top Header Bar */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Feather name="arrow-left" size={22} color="#FF6B35" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Sessions</Text>

        {/* Placeholder to keep title centered */}
        <View style={styles.backButtonPlaceholder} />
      </View>

      {/* Main Content Area with Dark Background */}
      <View style={styles.contentBg}>
        {/* Segmented Tab Control */}
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "Upcoming" && styles.tabActive]}
            onPress={() => setActiveTab("Upcoming")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Upcoming" && styles.tabTextActive,
              ]}
            >
              Upcoming
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "Past" && styles.tabActive]}
            onPress={() => setActiveTab("Past")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Past" && styles.tabTextActive,
              ]}
            >
              Past
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sessions Card List */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {upcomingSessions.map((session) => (
            <View key={session.id} style={styles.sessionCard}>
              {/* Header: Avatar, Name & Live Badge */}
              <View style={styles.sessionHeader}>
                <View style={styles.sessionLeft}>
                  <Image
                    source={{ uri: session.avatar }}
                    style={styles.sessionAvatar}
                  />
                  <View>
                    <Text style={styles.sessionName}>{session.name}</Text>
                    <Text style={styles.sessionSubject}>{session.subject}</Text>
                  </View>
                </View>

                {session.isLive && (
                  <View style={styles.liveBadge}>
                    <Feather name="video" size={12} color="#FFFFFF" />
                    <Text style={styles.liveBadgeText}>{session.liveText}</Text>
                  </View>
                )}
              </View>

              {/* Date & Time */}
              <View style={styles.sessionDateRow}>
                <Feather name="calendar" size={14} color="#7A7263" />
                <Text style={styles.sessionDateText}>{session.date}</Text>
              </View>

              {/* Action Button */}
              {session.isPrimaryAction ? (
                <TouchableOpacity
                  activeOpacity={0.85}
                  style={styles.actionButtonPrimary}
                >
                  <Text style={styles.actionButtonPrimaryText}>
                    {session.actionText}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.85}
                  style={styles.actionButtonSecondary}
                >
                  <Text style={styles.actionButtonSecondaryText}>
                    {session.actionText}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Bottom Navigation Bar (same as tutor home, My Schedule highlighted) */}
      <View style={styles.bottomNav}>
        {/* Home */}
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={20} color="#9CA3AF" />
          <Text style={styles.navTextInactive}>Home</Text>
        </TouchableOpacity>

        {/* My Schedule (Active) */}
        <TouchableOpacity style={styles.navItem}>
          <Feather name="calendar" size={18} color="#FF6B35" />
          <Text style={styles.navTextActive}>My Schedule</Text>
          <View style={styles.navIndicator} />
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
  safe: {
    flex: 1,
    backgroundColor: "#FAF8F5",
  },

  // Header
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: "#FAF8F5",
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonPlaceholder: {
    width: 36,
    height: 36,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FF6B35",
  },

  // Content bg (dark area under header)
  contentBg: {
    flex: 1,
    backgroundColor: "#63584E",
    paddingTop: 16,
    paddingHorizontal: 16,
  },

  // Tabs
  tabBar: {
    backgroundColor: "#E1DACD",
    padding: 4,
    borderRadius: 999,
    flexDirection: "row",
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 999,
    alignItems: "center",
  },
  tabActive: {
    backgroundColor: "#FFFFFF",
  },
  tabText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#A33A19",
  },
  tabTextActive: {
    color: "#2A231D",
  },

  // Scroll content
  scrollContent: {
    paddingBottom: 110,
    gap: 14,
  },

  // Session card
  sessionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  sessionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sessionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  sessionAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  sessionName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2A231D",
  },
  sessionSubject: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
    marginTop: 2,
  },
  liveBadge: {
    backgroundColor: "#FF7A45",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  liveBadgeText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  sessionDateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 16,
  },
  sessionDateText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
  },

  // Action buttons
  actionButtonPrimary: {
    backgroundColor: "#FF7A45",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FF7A45",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 1,
  },
  actionButtonPrimaryText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  actionButtonSecondary: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DCD6CC",
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonSecondaryText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#2A231D",
  },

  // Bottom nav (same as tutor home)
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
  navIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#FF6B35",
    marginTop: 2,
  },
});

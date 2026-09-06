import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

type NotificationItem = {
  id: string;
  title: string;
  time: string;
  description: string;
  avatar?: string;
  icon?: "calendar" | "award" | "info";
  hasButton?: boolean;
  buttonText?: string;
  hasAccentBorder?: boolean;
};

export default function NotificationsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const todayNotifications: NotificationItem[] = [
    {
      id: "1",
      title: "Sarah J. sent you a message",
      time: "10:42 AM",
      description:
        '"Hi there! Just checking if you had any questions about chapter 4...',
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
      hasAccentBorder: true,
    },
    {
      id: "2",
      title: "Your session with David M. starts...",
      time: "12:45 PM",
      description: "Calculus 101 · Starts in 15 mins",
      icon: "calendar",
      hasButton: true,
      buttonText: "Join Workspace",
      hasAccentBorder: true,
    },
  ];

  const yesterdayNotifications: NotificationItem[] = [
    {
      id: "3",
      title: "Weekly Goal Achieved! 🏆",
      time: "Yesterday",
      description:
        "You've completed 5 hours of focused study time this week. Keep",
      icon: "award",
      hasAccentBorder: false,
    },
    {
      id: "4",
      title: "New feature: Shared Whiteboard",
      time: "Yesterday",
      description:
        "You can now collaborate in real-time with your tutors using our new...",
      icon: "info",
      hasAccentBorder: false,
    },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF8F5" />

      {/* Top Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Feather name="arrow-left" size={22} color="#A33A19" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>

      {/* Main Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Feather name="search" size={18} color="#9CA3AF" />
          <TextInput
            placeholder="Search messages..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
        </View>

        {/* Today Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today</Text>

          <View style={styles.notificationsList}>
            {todayNotifications.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.notificationRow,
                  item.hasAccentBorder && styles.notificationRowAccent,
                ]}
              >
                {/* Left Active Orange Bar Accent */}
                {item.hasAccentBorder && <View style={styles.accentLine} />}

                {/* Left Icon/Avatar Column */}
                <View style={styles.avatarColumn}>
                  {item.avatar ? (
                    <Image
                      source={{ uri: item.avatar }}
                      style={styles.avatar}
                    />
                  ) : (
                    <View style={styles.iconPlaceholder}>
                      <Feather
                        name={item.icon || "info"}
                        size={20}
                        color="#7A7263"
                      />
                    </View>
                  )}
                </View>

                {/* Message Content Column */}
                <View style={styles.contentColumn}>
                  <View style={styles.titleTimeRow}>
                    <Text style={styles.notificationTitle} numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Text style={styles.notificationTime}>{item.time}</Text>
                  </View>

                  <Text
                    style={styles.notificationDescription}
                    numberOfLines={2}
                  >
                    {item.description}
                  </Text>

                  {/* Action Button */}
                  {item.hasButton && item.buttonText && (
                    <TouchableOpacity
                      activeOpacity={0.85}
                      style={styles.actionButton}
                    >
                      <Text style={styles.actionButtonText}>
                        {item.buttonText}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Yesterday Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Yesterday</Text>

          <View style={styles.notificationsList}>
            {yesterdayNotifications.map((item) => (
              <View key={item.id} style={styles.notificationRow}>
                {/* Left Icon Column */}
                <View style={styles.avatarColumn}>
                  <View style={styles.iconPlaceholder}>
                    <Feather
                      name={item.icon || "info"}
                      size={20}
                      color="#7A7263"
                    />
                  </View>
                </View>

                {/* Message Content Column */}
                <View style={styles.contentColumn}>
                  <View style={styles.titleTimeRow}>
                    <Text style={styles.notificationTitle} numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Text style={styles.notificationTime}>{item.time}</Text>
                  </View>

                  <Text
                    style={styles.notificationDescription}
                    numberOfLines={2}
                  >
                    {item.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        {/* Home */}
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navIconWrapper}>
            <Ionicons name="home" size={20} color="#FF6B35" />
            <View style={styles.navDot} />
          </View>
          <Text style={styles.navTextActive}>Home</Text>
        </TouchableOpacity>

        {/* Focus */}
        <TouchableOpacity style={styles.navItem}>
          <Feather name="clock" size={20} color="#9CA3AF" />
          <Text style={styles.navTextInactive}>Focus</Text>
        </TouchableOpacity>

        {/* Schedule */}
        <TouchableOpacity style={styles.navItem}>
          <Feather name="calendar" size={20} color="#9CA3AF" />
          <Text style={styles.navTextInactive}>Schedule</Text>
        </TouchableOpacity>

        {/* Alerts (Active) */}
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navIconWrapper}>
            <Feather name="bell" size={20} color="#FF6B35" />
            <View style={styles.alertDotActive} />
          </View>
          <Text style={styles.navTextActive}>Alerts</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  // Header
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: "#FAF8F5",
  },
  iconButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#A33A19",
  },

  // Scroll content
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 100, // space for bottom nav
  },

  // Search bar
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 1,
    borderColor: "rgba(229, 231, 235, 0.8)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
    marginBottom: 24,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },

  // Sections
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#374151",
    marginBottom: 12,
  },
  notificationsList: {
    gap: 16,
  },

  // Notification row
  notificationRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingLeft: 14,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    position: "relative",
  },
  notificationRowAccent: {
    // extra style if needed in future
  },
  accentLine: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 16,
    width: 4,
    backgroundColor: "#FF7A45",
    borderRadius: 999,
  },
  avatarColumn: {
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  iconPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#EFECE6",
    alignItems: "center",
    justifyContent: "center",
  },
  contentColumn: {
    flex: 1,
  },
  titleTimeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#111827",
    flex: 1,
    marginRight: 8,
  },
  notificationTime: {
    fontSize: 11,
    fontWeight: "600",
    color: "#9CA3AF",
  },
  notificationDescription: {
    fontSize: 12,
    color: "#6B7280",
    lineHeight: 16,
    marginTop: 4,
  },
  actionButton: {
    backgroundColor: "#FF7A45",
    alignSelf: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 12,
    marginTop: 12,
    shadowColor: "#FF7A45",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 1,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  // Bottom nav
  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EFECE6",
    paddingVertical: 10,
    paddingHorizontal: 24,
    paddingBottom: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navItem: {
    alignItems: "center",
  },
  navIconWrapper: {
    position: "relative",
  },
  navDot: {
    position: "absolute",
    top: -4,
    right: -4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF6B35",
  },
  navTextActive: {
    fontSize: 10,
    fontWeight: "800",
    color: "#FF6B35",
    marginTop: 2,
  },
  navTextInactive: {
    fontSize: 10,
    fontWeight: "600",
    color: "#9CA3AF",
    marginTop: 2,
  },
  alertDotActive: {
    position: "absolute",
    top: -2,
    right: -6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF6B35",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
});

import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
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

type NotificationIcon = "calendar" | "award" | "info";

type NotificationItem = {
  id: string;
  title: string;
  time: string;
  description: string;
  avatar?: string;
  icon?: NotificationIcon;
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
        '"Hi there! Just checking if you had any questions about chapter 4..."',
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
        "You've completed 5 hours of focused study time this week. Keep going!",
      icon: "award",
      hasAccentBorder: false,
    },
    {
      id: "4",
      title: "New feature: Shared Whiteboard",
      time: "Yesterday",
      description:
        "You can now collaborate in real-time with your tutors using our new feature.",
      icon: "info",
      hasAccentBorder: false,
    },
  ];

  const normalizedSearch = searchQuery.trim().toLowerCase();

  const filteredTodayNotifications = todayNotifications.filter((item) => {
    if (!normalizedSearch) return true;

    return (
      item.title.toLowerCase().includes(normalizedSearch) ||
      item.description.toLowerCase().includes(normalizedSearch)
    );
  });

  const filteredYesterdayNotifications = yesterdayNotifications.filter(
    (item) => {
      if (!normalizedSearch) return true;

      return (
        item.title.toLowerCase().includes(normalizedSearch) ||
        item.description.toLowerCase().includes(normalizedSearch)
      );
    },
  );

  const renderNotification = (item: NotificationItem) => (
    <View
      key={item.id}
      style={[
        styles.notificationRow,
        item.hasAccentBorder && styles.notificationRowAccent,
      ]}
    >
      {item.hasAccentBorder && <View style={styles.accentLine} />}

      <View style={styles.avatarColumn}>
        {item.avatar ? (
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.iconPlaceholder}>
            <Feather name={item.icon || "info"} size={20} color="#7A7263" />
          </View>
        )}
      </View>

      <View style={styles.contentColumn}>
        <View style={styles.titleTimeRow}>
          <Text style={styles.notificationTitle} numberOfLines={2}>
            {item.title}
          </Text>

          <Text style={styles.notificationTime}>{item.time}</Text>
        </View>

        <Text style={styles.notificationDescription} numberOfLines={3}>
          {item.description}
        </Text>

        {item.hasButton && item.buttonText && (
          <TouchableOpacity activeOpacity={0.85} style={styles.actionButton}>
            <Text style={styles.actionButtonText}>{item.buttonText}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF8F5" />

      {/* Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Feather name="arrow-left" size={24} color="#A33A19" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Messages</Text>

        <View style={styles.headerPlaceholder} />
      </View>

      {/* Main content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search */}
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

        {/* Today */}
        {filteredTodayNotifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Today</Text>

            <View style={styles.notificationsList}>
              {filteredTodayNotifications.map(renderNotification)}
            </View>
          </View>
        )}

        {/* Yesterday */}
        {filteredYesterdayNotifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Yesterday</Text>

            <View style={styles.notificationsList}>
              {filteredYesterdayNotifications.map(renderNotification)}
            </View>
          </View>
        )}

        {filteredTodayNotifications.length === 0 &&
          filteredYesterdayNotifications.length === 0 && (
            <View style={styles.emptyState}>
              <Feather name="bell-off" size={28} color="#9CA3AF" />
              <Text style={styles.emptyStateText}>No notifications found.</Text>
            </View>
          )}
      </ScrollView>

      {/* Bottom navigation matching student home */}
      <View style={styles.bottomNav}>
        {/* Home - not highlighted */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/student-home" as any)}
          activeOpacity={0.8}
          hitSlop={{ top: 8, bottom: 8, left: 10, right: 10 }}
        >
          <Ionicons name="home" size={20} color="#9CA3AF" />
          <Text style={styles.navTextInactive}>Home</Text>
        </TouchableOpacity>

        {/* Focus */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/stay-focus" as any)}
          activeOpacity={0.8}
          hitSlop={{ top: 8, bottom: 8, left: 10, right: 10 }}
        >
          <Feather name="clock" size={20} color="#9CA3AF" />
          <Text style={styles.navTextInactive}>Focus</Text>
        </TouchableOpacity>

        {/* Schedule */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/my-sessions" as any)}
          activeOpacity={0.8}
          hitSlop={{ top: 8, bottom: 8, left: 10, right: 10 }}
        >
          <Feather name="calendar" size={20} color="#9CA3AF" />
          <Text style={styles.navTextInactive}>Schedule</Text>
        </TouchableOpacity>

        {/* Alerts - highlighted */}
        <TouchableOpacity
          style={styles.navItem}
          activeOpacity={0.8}
          hitSlop={{ top: 8, bottom: 8, left: 10, right: 10 }}
        >
          <View style={styles.alertsIconWrapper}>
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
    backgroundColor: "#FAF8F5",
  },

  // Header lowered and enlarged
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    minHeight: 76,
    backgroundColor: "#FAF8F5",
  },

  headerButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },

  headerPlaceholder: {
    width: 48,
    height: 48,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#A33A19",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 150,
  },

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
    // Accent style is applied through accentLine.
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
    alignItems: "flex-start",
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
    lineHeight: 17,
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

  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
  },

  emptyStateText: {
    fontSize: 14,
    color: "#7A7263",
    marginTop: 10,
    fontWeight: "600",
  },

  // Bottom navigation matching student home
  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 10,
    minHeight: 76,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingBottom: 14,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 5,
  },

  navItem: {
    minWidth: 68,
    minHeight: 58,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingVertical: 5,
  },

  navTextActive: {
    fontSize: 10,
    fontWeight: "800",
    color: "#FF6B35",
    marginTop: 3,
  },

  navTextInactive: {
    fontSize: 10,
    fontWeight: "600",
    color: "#9CA3AF",
    marginTop: 3,
  },

  alertsIconWrapper: {
    position: "relative",
  },

  alertDotActive: {
    position: "absolute",
    top: -3,
    right: -6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF6B35",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
});

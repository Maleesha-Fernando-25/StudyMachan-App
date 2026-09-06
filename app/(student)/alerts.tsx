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

export default function AlertsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const messages = [
    {
      id: "1",
      name: "Sarah Jenkins",
      time: "2m ago",
      timeColor: "#FF6B35",
      message: "That sounds great! I'll see you at 3 PM for our math session.",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
      isUnread: true,
      hasDot: true,
    },
    {
      id: "2",
      name: "David Chen",
      time: "1h ago",
      timeColor: "#FF6B35",
      message: "Can we review chapter 4 before the quiz?",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      isUnread: true,
      hasDot: true,
    },
    {
      id: "3",
      name: "Dr. Emily Rogers",
      time: "Yesterday",
      timeColor: "#9CA3AF",
      message:
        "Thanks for sending over the essay draft. I've left some comments.",
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150",
      isUnread: false,
      hasDot: false,
    },
    {
      id: "4",
      name: "Michael Torres",
      time: "Mon",
      timeColor: "#9CA3AF",
      message: "Got it, thanks! The physics formulas make much more sense now.",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      isUnread: false,
      hasDot: false,
    },
    {
      id: "5",
      name: "Alicia Johnson",
      time: "Oct 12",
      timeColor: "#9CA3AF",
      message: "Could we reschedule our session to Thursday?",
      initials: "AJ",
      isUnread: false,
      hasDot: false,
    },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF8F5" />

      {/* Top Header Bar */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={22} color="#A33A19" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>

      {/* Main Container */}
      <View style={styles.container}>
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

        {/* Message Cards List */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.messagesList}
        >
          {messages.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.9}
              style={styles.messageCard}
            >
              {/* Unread Left Border Line */}
              {item.isUnread && <View style={styles.unreadLine} />}

              {/* Avatar Column */}
              <View style={styles.avatarWrapper}>
                {item.avatar ? (
                  <Image source={{ uri: item.avatar }} style={styles.avatar} />
                ) : (
                  <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarInitials}>{item.initials}</Text>
                  </View>
                )}

                {/* Orange Online/Unread Dot */}
                {item.hasDot && <View style={styles.unreadDot} />}
              </View>

              {/* Content Column */}
              <View style={styles.messageContent}>
                <View style={styles.messageHeader}>
                  <Text style={styles.messageName}>{item.name}</Text>
                  <Text style={[styles.messageTime, { color: item.timeColor }]}>
                    {item.time}
                  </Text>
                </View>
                <Text style={styles.messageText} numberOfLines={2}>
                  {item.message}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

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
    backgroundColor: "#FBF2E9",
  },

  // Header
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: "#FAF8F5",
  },
  iconButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#A33A19",
  },

  // Container
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },

  // Search bar
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 1,
    borderColor: "rgba(229, 231, 235, 0.6)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },

  // Messages list
  messagesList: {
    paddingBottom: 100,
    gap: 12,
  },
  messageCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    position: "relative",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  unreadLine: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 6,
    backgroundColor: "#FF6B35",
  },
  avatarWrapper: {
    marginRight: 14,
    position: "relative",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#EAE3D2",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitials: {
    fontSize: 14,
    fontWeight: "800",
    color: "#7A7263",
  },
  unreadDot: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#FF6B35",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  messageName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2A231D",
  },
  messageTime: {
    fontSize: 12,
    fontWeight: "700",
  },
  messageText: {
    fontSize: 12,
    color: "#5C534B",
    lineHeight: 16,
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

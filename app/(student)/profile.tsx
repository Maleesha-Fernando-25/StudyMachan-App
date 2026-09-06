import { Feather } from "@expo/vector-icons";
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

type MenuIconName =
  | "calendar"
  | "credit-card"
  | "heart"
  | "help-circle"
  | "settings";

export default function StudentProfileScreen() {
  const router = useRouter();

  const stats = [
    { label: "Sessions", value: "24" },
    { label: "Reviews", value: "12" },
    { label: "Studied", value: "40h" },
  ];

  const [activeMenuId, setActiveMenuId] = useState<string>("5"); // default: Settings

  const menuItems: {
    id: string;
    title: string;
    icon: MenuIconName;
  }[] = [
    { id: "1", title: "My Sessions", icon: "calendar" },
    { id: "2", title: "Payments", icon: "credit-card" },
    { id: "3", title: "Saved Tutors", icon: "heart" },
    { id: "4", title: "Help Center", icon: "help-circle" },
    { id: "5", title: "Settings", icon: "settings" },
  ];

  const handleMenuPress = (id: string) => {
    setActiveMenuId(id);

    // Later: navigate to specific pages based on id
    // Example:
    // if (id === "1") router.push("/my-sessions");
    // if (id === "2") router.push("/payments");
    // if (id === "3") router.push("/saved-tutors");
    // if (id === "4") router.push("/help-center");
    // if (id === "5") router.push("/settings");
  };

  const handleLogout = () => {
    // Later: clear Supabase / AsyncStorage session here.
    router.replace("/login" as any);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF8F5" />

      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Feather name="arrow-left" size={22} color="#A33A19" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Student Profile</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Header Info */}
        <View style={styles.profileHeader}>
          <View style={styles.profileImageWrapper}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300",
              }}
              style={styles.profileImage}
            />
            <View style={styles.onlineDot} />
          </View>

          <Text style={styles.name}>Alex Rivers</Text>
          <Text style={styles.roleText}>Student</Text>

          <View style={styles.premiumBadge}>
            <Text style={styles.premiumText}>PREMIUM MEMBER</Text>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          {stats.map((stat) => (
            <View key={stat.label} style={styles.statCard}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Menu Items List */}
        <View style={styles.menuList}>
          {menuItems.map((item) => {
            const isActive = activeMenuId === item.id;

            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.8}
                style={[styles.menuItem, isActive && styles.menuItemActive]}
                onPress={() => handleMenuPress(item.id)}
              >
                <View style={styles.menuItemLeft}>
                  <Feather
                    name={item.icon}
                    size={20}
                    color={isActive ? "#FFFFFF" : "#2A231D"}
                  />
                  <Text
                    style={[
                      styles.menuItemText,
                      isActive && styles.menuItemTextActive,
                    ]}
                  >
                    {item.title}
                  </Text>
                </View>

                <Feather
                  name="chevron-right"
                  size={18}
                  color={isActive ? "#FFFFFF" : "#C4C0B9"}
                />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Log Out Button */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Feather name="log-out" size={18} color="#A33A19" />
            <Text style={styles.logoutText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FAF8F5",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 10,
  },
  backButton: {
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
  scrollContent: {
    paddingBottom: 40,
  },

  // Profile
  profileHeader: {
    alignItems: "center",
    marginTop: 12,
    marginBottom: 24,
  },
  profileImageWrapper: {
    position: "relative",
  },
  profileImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  onlineDot: {
    position: "absolute",
    bottom: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#FF7A45",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  name: {
    fontSize: 20,
    fontWeight: "800",
    color: "#2A231D",
    marginTop: 12,
  },
  roleText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
    marginTop: 2,
  },
  premiumBadge: {
    backgroundColor: "#EAE3D2",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    marginTop: 10,
  },
  premiumText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#7A7263",
    letterSpacing: 0.8,
  },

  // Stats
  statsRow: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "800",
    color: "#A33A19",
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
    marginTop: 4,
  },

  // Menu
  menuList: {
    paddingHorizontal: 20,
    gap: 8,
    marginBottom: 24,
  },
  menuItem: {
    minHeight: 56,
    paddingHorizontal: 16,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  menuItemActive: {
    backgroundColor: "#FF7A45",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#2A231D",
  },
  menuItemTextActive: {
    color: "#FFFFFF",
  },

  // Logout
  divider: {
    height: 1,
    backgroundColor: "rgba(229, 231, 235, 0.75)",
    marginHorizontal: 20,
    marginBottom: 24,
  },
  logoutContainer: {
    alignItems: "center",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "rgba(163, 58, 25, 0.4)",
    borderRadius: 16,
    paddingHorizontal: 48,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
  },
  logoutText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#A33A19",
  },
});

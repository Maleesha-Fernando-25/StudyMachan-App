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

type CustomToggleProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
};

const CustomToggle = ({ value, onValueChange }: CustomToggleProps) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={() => onValueChange(!value)}
    style={[
      styles.toggleTrack,
      value ? styles.toggleTrackActive : styles.toggleTrackInactive,
    ]}
  >
    <View
      style={[
        styles.toggleCircle,
        value ? styles.toggleCircleActive : styles.toggleCircleInactive,
      ]}
    >
      {value ? (
        <Feather name="check" size={12} color="#FFFFFF" />
      ) : (
        <View style={styles.toggleCircleInactiveDot} />
      )}
    </View>
  </TouchableOpacity>
);

export default function TutorProfileScreen() {
  const router = useRouter();

  const [instantBooking, setInstantBooking] = useState(true);
  const [groupSessions, setGroupSessions] = useState(false);
  const [videoOn, setVideoOn] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

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

        <Text style={styles.headerTitle}>Tutor's Profile</Text>

        {/* Placeholder to keep title centered */}
        <View style={styles.backButtonPlaceholder} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Info Card */}
        <View style={styles.profileCard}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300",
            }}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>Aris Thorne</Text>
          <Text style={styles.profileRole}>Mathematics Tutor</Text>

          <TouchableOpacity activeOpacity={0.8} style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Section 1: Teaching Preferences */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Teaching Preferences</Text>

          {/* Instant Booking */}
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View style={styles.settingIconBox}>
                <Feather name="zap" size={18} color="#A33A19" />
              </View>
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Instant Booking</Text>
                <Text style={styles.settingDescription}>
                  Allow students to book without approval
                </Text>
              </View>
            </View>
            <CustomToggle
              value={instantBooking}
              onValueChange={setInstantBooking}
            />
          </View>

          {/* Group Sessions */}
          <View style={[styles.settingRow, styles.settingBorder]}>
            <View style={styles.settingLeft}>
              <View style={styles.settingIconBox}>
                <Feather name="users" size={18} color="#A33A19" />
              </View>
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Group Sessions</Text>
                <Text style={styles.settingDescription}>
                  Enable multi-student bookings
                </Text>
              </View>
            </View>
            <CustomToggle
              value={groupSessions}
              onValueChange={setGroupSessions}
            />
          </View>

          {/* Video On by Default */}
          <View style={[styles.settingRow, styles.settingBorder]}>
            <View style={styles.settingLeft}>
              <View style={styles.settingIconBox}>
                <Feather name="video" size={18} color="#A33A19" />
              </View>
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Video On by Default</Text>
                <Text style={styles.settingDescription}>
                  Start sessions with camera enabled
                </Text>
              </View>
            </View>
            <CustomToggle value={videoOn} onValueChange={setVideoOn} />
          </View>
        </View>

        {/* Section 2: Notifications */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Notifications</Text>

          {/* Email Alerts */}
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View style={styles.settingIconBox}>
                <Feather name="mail" size={18} color="#A33A19" />
              </View>
              <Text style={styles.settingLabel}>Email Alerts</Text>
            </View>
            <CustomToggle value={emailAlerts} onValueChange={setEmailAlerts} />
          </View>

          {/* Push Notifications */}
          <View style={[styles.settingRow, styles.settingBorder]}>
            <View style={styles.settingLeft}>
              <View style={styles.settingIconBox}>
                <Feather name="bell" size={18} color="#A33A19" />
              </View>
              <Text style={styles.settingLabel}>Push Notifications</Text>
            </View>
            <CustomToggle
              value={pushNotifications}
              onValueChange={setPushNotifications}
            />
          </View>
        </View>

        {/* Section 3: Payments & Payouts */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Payments & Payouts</Text>

          {/* Manage Bank Account */}
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.settingRow, styles.settingBorder]}
          >
            <View style={styles.settingLeft}>
              <View style={styles.settingIconBox}>
                <MaterialCommunityIcons
                  name="bank-outline"
                  size={18}
                  color="#A33A19"
                />
              </View>
              <Text style={styles.settingLabel}>Manage Bank Account</Text>
            </View>
            <Feather name="chevron-right" size={18} color="#9CA3AF" />
          </TouchableOpacity>

          {/* Payout History */}
          <TouchableOpacity activeOpacity={0.7} style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View style={styles.settingIconBox}>
                <Feather name="clock" size={18} color="#A33A19" />
              </View>
              <Text style={styles.settingLabel}>Payout History</Text>
            </View>
            <Feather name="chevron-right" size={18} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Section 4: Support & Legal */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Support & Legal</Text>

          {/* Help Center */}
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.settingRow, styles.settingBorder]}
          >
            <View style={styles.settingLeft}>
              <View style={styles.settingIconBox}>
                <Feather name="help-circle" size={18} color="#A33A19" />
              </View>
              <Text style={styles.settingLabel}>Help Center</Text>
            </View>
            <Feather name="chevron-right" size={18} color="#9CA3AF" />
          </TouchableOpacity>

          {/* Terms of Service */}
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.settingRow, styles.settingBorder]}
          >
            <View style={styles.settingLeft}>
              <View style={styles.settingIconBox}>
                <Feather name="file-text" size={18} color="#A33A19" />
              </View>
              <Text style={styles.settingLabel}>Terms of Service</Text>
            </View>
            <Feather name="chevron-right" size={18} color="#9CA3AF" />
          </TouchableOpacity>

          {/* Log Out */}
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.settingRow}
            onPress={() => {
              // Later: clear session and navigate to login
            }}
          >
            <View style={styles.settingLeft}>
              <View style={[styles.settingIconBox, styles.logoutIconBox]}>
                <Feather name="log-out" size={18} color="#D9381E" />
              </View>
              <Text style={styles.logoutText}>Log Out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar (same as tutor home, no icon highlighted) */}
      <View style={styles.bottomNav}>
        {/* Home */}
        <TouchableOpacity style={styles.navItem}>
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

  // Scroll content
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 110,
    gap: 16,
  },

  // Profile card
  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "800",
    color: "#2A231D",
  },
  profileRole: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
    marginTop: 2,
    marginBottom: 16,
  },
  editButton: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
  },
  editButtonText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#2A231D",
  },

  // Section cards
  sectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
    overflow: "hidden",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2A231D",
    padding: 16,
    paddingBottom: 8,
  },

  // Setting rows
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  settingBorder: {
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    flex: 1,
    paddingRight: 8,
  },
  settingIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F4EFE6",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutIconBox: {
    backgroundColor: "#FDE8E8",
  },
  settingText: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: "800",
    color: "#2A231D",
  },
  settingDescription: {
    fontSize: 12,
    fontWeight: "600",
    color: "#9CA3AF",
    marginTop: 2,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#D9381E",
  },

  // Toggle switch
  toggleTrack: {
    width: 48,
    height: 28,
    borderRadius: 999,
    padding: 2,
    justifyContent: "center",
  },
  toggleTrackActive: {
    backgroundColor: "#FF7A45",
  },
  toggleTrackInactive: {
    backgroundColor: "#D1D5DB",
  },
  toggleCircle: {
    width: 24,
    height: 24,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  toggleCircleActive: {
    backgroundColor: "#2563EB",
    alignSelf: "flex-end",
  },
  toggleCircleInactive: {
    backgroundColor: "#78828A",
    alignSelf: "flex-start",
  },
  toggleCircleInactiveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#FFFFFF",
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

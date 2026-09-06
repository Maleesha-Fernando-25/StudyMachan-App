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
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function TutorDashboardScreen() {
  const router = useRouter();
  const [instantSupport, setInstantSupport] = useState(true);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF8F5" />

      {/* Top bar with back arrow */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.replace("/signup" as any)}
        >
          <Feather name="arrow-left" size={22} color="#FF6B35" />
        </TouchableOpacity>
      </View>

      {/* Main Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Top App Header */}
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Image
              source={require("../../assets/images/studymachan-logo.png")}
              style={styles.logoImageSmall}
              resizeMode="contain"
            />
            <View>
              <Text style={styles.appName}>StudyMachan</Text>
              <Text style={styles.welcomeText}>Welcome back, Kavinda 👋</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.avatarButton}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100",
              }}
              style={styles.avatar}
            />
            <View style={styles.onlineDotContainer}>
              <View style={styles.onlineDot} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Tutor Profile Summary Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileRow}>
            <View style={styles.profileLeft}>
              <View style={styles.avatarInitialBox}>
                <Text style={styles.avatarInitialText}>KP</Text>
              </View>
              <View>
                <View style={styles.nameRow}>
                  <Text style={styles.tutorName}>Kavinda Perera</Text>
                  <View style={styles.verifiedBadgeSmall}>
                    <Text style={styles.verifiedBadgeText}>Verified Tutor</Text>
                  </View>
                </View>
                <Text style={styles.tutorSubjectSmall}>
                  A/L Physics & Mechanics
                </Text>
              </View>
            </View>

            <View style={styles.ratingBlock}>
              <View style={styles.ratingBadgeSmall}>
                <FontAwesome name="star" size={11} color="#FFB800" />
                <Text style={styles.ratingValueSmall}>4.95</Text>
              </View>
              <Text style={styles.reviewsText}>142 reviews</Text>
            </View>
          </View>
        </View>

        {/* Quick Metrics Row */}
        <View style={styles.metricsRow}>
          {/* Earnings */}
          <View style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <Text style={styles.metricLabel}>Earnings</Text>
              <View style={styles.metricDotEarn} />
            </View>
            <Text style={styles.metricValue}>LKR 48.5k</Text>
            <Text style={styles.metricSubEarn}>This week</Text>
          </View>

          {/* Sessions */}
          <View style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <Text style={styles.metricLabel}>Sessions</Text>
              <View style={styles.metricDotSessions} />
            </View>
            <Text style={styles.metricValue}>18 Done</Text>
            <Text style={styles.metricSubGray}>3 remaining</Text>
          </View>

          {/* Feedback */}
          <View style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <Text style={styles.metricLabel}>Feedback</Text>
              <FontAwesome name="star" size={10} color="#FFB800" />
            </View>
            <Text style={styles.metricValue}>99%</Text>
            <Text style={styles.metricSubGray}>Satisfaction</Text>
          </View>
        </View>

        {/* Ongoing Session Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionHeaderLeft}>
              <Text style={styles.sectionLabel}>ONGOING SESSION</Text>
              <View style={styles.liveBadge}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>LIVE NOW</Text>
              </View>
            </View>
            <Text style={styles.endsInText}>Ends in 25m</Text>
          </View>

          <View style={styles.ongoingCard}>
            <View style={styles.ongoingTopRow}>
              <View style={styles.ongoingTag}>
                <Text style={styles.ongoingTagText}>2025 A/L Intensive</Text>
              </View>
              <View style={styles.lightningBadgeSmall}>
                <Ionicons name="flash-outline" size={18} color="#FFFFFF" />
              </View>
            </View>

            <Text style={styles.ongoingTitle}>
              Applied Physics: Induction & Force
            </Text>
            <Text style={styles.ongoingSubtitle}>
              Theory & Past Paper Problem Solving
            </Text>

            <View style={styles.ongoingFooter}>
              <View style={styles.studentRow}>
                <View style={styles.studentAvatarWrapper}>
                  <Image
                    source={{
                      uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
                    }}
                    style={styles.studentAvatar}
                  />
                  <View style={styles.studentOnlineDot} />
                </View>
                <View>
                  <Text style={styles.studentName}>Ravindu Senanayake</Text>
                  <Text style={styles.sessionTime}>04:30 PM – 06:00 PM</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.joinClassButton}>
                <Text style={styles.joinClassButtonText}>Join Class</Text>
                <Feather name="arrow-right" size={14} color="#FF6B35" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Today's Schedule Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionHeaderLeft}>
              <Text style={styles.sectionLabel}>TODAY'S SCHEDULE</Text>
              <Text style={styles.sessionsLeftText}>3 sessions left</Text>
            </View>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>Full Calendar</Text>
              <Feather name="chevron-right" size={14} color="#FF6B35" />
            </TouchableOpacity>
          </View>

          {/* Schedule Item 1 */}
          <View style={styles.scheduleCard}>
            <View style={styles.scheduleLeft}>
              <View style={styles.timeBoxOrange}>
                <Text style={styles.timeAmPm}>PM</Text>
                <Text style={styles.timeValue}>06:30</Text>
              </View>
              <View style={styles.scheduleInfo}>
                <Text style={styles.scheduleTitle} numberOfLines={1}>
                  Physics: Electromagnetic Induction
                </Text>
                <Text style={styles.scheduleSubtitle} numberOfLines={1}>
                  Student: Nethmi Silva •{" "}
                  <Text style={styles.startsInText}>Starts in 45m</Text>
                </Text>
              </View>
            </View>

            <TouchableOpacity style={styles.readyButton}>
              <Text style={styles.readyButtonText}>Ready</Text>
            </TouchableOpacity>
          </View>

          {/* Schedule Item 2 */}
          <View style={styles.scheduleCard}>
            <View style={styles.scheduleLeft}>
              <View style={styles.timeBoxGray}>
                <Text style={styles.timeAmPmGray}>PM</Text>
                <Text style={styles.timeValueGray}>08:00</Text>
              </View>
              <View style={styles.scheduleInfo}>
                <View style={styles.groupTitleRow}>
                  <Text style={styles.scheduleTitle} numberOfLines={1}>
                    Mechanics Problem Set
                  </Text>
                  <View style={styles.groupBadge}>
                    <Text style={styles.groupBadgeText}>Group</Text>
                  </View>
                </View>
                <Text style={styles.scheduleSubtitle} numberOfLines={1}>
                  3 Students enrolled • 1.5 hrs
                </Text>
              </View>
            </View>

            <TouchableOpacity style={styles.viewButton}>
              <Text style={styles.viewButtonText}>View</Text>
            </TouchableOpacity>
          </View>

          {/* Instant Doubt Support Toggle */}
          <View style={styles.instantCard}>
            <View style={styles.instantLeft}>
              <View style={styles.instantDot} />
              <View style={styles.instantInfo}>
                <Text style={styles.instantTitle}>Instant Doubt Support</Text>
                <Text style={styles.instantSubtitle}>
                  Accepting direct student bookings now
                </Text>
              </View>
            </View>
            <Switch
              value={instantSupport}
              onValueChange={setInstantSupport}
              trackColor={{ false: "#E5E7EB", true: "#FF6B35" }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* My Students Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionLabel}>MY STUDENTS</Text>
              <Text style={styles.studentsSubText}>
                Regularly mentored pupils
              </Text>
            </View>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>View All (24)</Text>
              <Feather name="chevron-right" size={14} color="#FF6B35" />
            </TouchableOpacity>
          </View>

          <View style={styles.studentsRow}>
            {/* Student 1 */}
            <View style={styles.studentCard}>
              <View style={styles.studentCardTop}>
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
                  }}
                  style={styles.studentAvatarCard}
                />
                <View style={styles.yearBadge}>
                  <Text style={styles.yearBadgeText}>2025 A/L</Text>
                </View>
              </View>

              <Text style={styles.studentNameCard} numberOfLines={1}>
                Dilshan Fernando
              </Text>
              <Text style={styles.studentSessionsText}>
                8 Sessions completed
              </Text>

              <View style={styles.studentCardFooter}>
                <Text style={styles.gradeText}>Grade: A* target</Text>
                <TouchableOpacity>
                  <Ionicons
                    name="chatbubble-outline"
                    size={14}
                    color="#FF6B35"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Student 2 */}
            <View style={styles.studentCard}>
              <View style={styles.studentCardTop}>
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100",
                  }}
                  style={styles.studentAvatarCard}
                />
                <View style={styles.yearBadge}>
                  <Text style={styles.yearBadgeText}>2026 A/L</Text>
                </View>
              </View>

              <Text style={styles.studentNameCard} numberOfLines={1}>
                Amaya Perera
              </Text>
              <Text style={styles.studentSessionsText}>
                12 Sessions completed
              </Text>

              <View style={styles.studentCardFooter}>
                <Text style={styles.gradeText}>Active Mentee</Text>
                <TouchableOpacity>
                  <Ionicons
                    name="chatbubble-outline"
                    size={14}
                    color="#FF6B35"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        {/* Home (Active) */}
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={20} color="#FF6B35" />
          <Text style={styles.navTextActive}>Home</Text>
          <View style={styles.navIndicator} />
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

  // Top bar with back button
  topBar: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },

  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 110,
  },

  // Header
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  appName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1E1E1E",
  },
  welcomeText: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },
  avatarButton: {
    position: "relative",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FFD6CC",
  },
  onlineDotContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  onlineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#10B981",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  logoImageSmall: {
    width: 40,
    height: 40,
  },

  // Profile card
  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 16,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatarInitialBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFEAE0",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitialText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FF6B35",
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  tutorName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
  },
  verifiedBadgeSmall: {
    backgroundColor: "#FFF7ED",
    borderWidth: 1,
    borderColor: "#FFD6CC",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  verifiedBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#FF6B35",
  },
  tutorSubjectSmall: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
    marginTop: 2,
  },
  ratingBlock: {
    alignItems: "flex-end",
  },
  ratingBadgeSmall: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FFFBEA",
    borderWidth: 1,
    borderColor: "#FDE68A",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  ratingValueSmall: {
    fontSize: 12,
    fontWeight: "800",
    color: "#111827",
  },
  reviewsText: {
    fontSize: 10,
    color: "#9CA3AF",
    marginTop: 4,
  },

  // Metrics row
  metricsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },
  metricCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  metricHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 11,
    color: "#9CA3AF",
    fontWeight: "600",
  },
  metricDotEarn: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#10B981",
  },
  metricDotSessions: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF6B35",
  },
  metricValue: {
    fontSize: 14,
    fontWeight: "900",
    color: "#111827",
  },
  metricSubEarn: {
    fontSize: 10,
    color: "#059669",
    fontWeight: "700",
    marginTop: 2,
  },
  metricSubGray: {
    fontSize: 10,
    color: "#9CA3AF",
    fontWeight: "600",
    marginTop: 2,
  },

  // Section generic
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#9CA3AF",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  studentsSubText: {
    fontSize: 10,
    color: "#9CA3AF",
    fontWeight: "600",
    marginTop: 2,
  },

  sessionsLeftText: {
    fontSize: 11,
    color: "#9CA3AF",
    fontWeight: "600",
  },
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  seeAllText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#FF6B35",
  },

  // Ongoing session
  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FEE2E2",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#EF4444",
  },
  liveText: {
    fontSize: 9,
    fontWeight: "900",
    color: "#DC2626",
    textTransform: "uppercase",
  },
  endsInText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FF6B35",
  },
  ongoingCard: {
    backgroundColor: "#FF7A45",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    overflow: "hidden",
  },
  ongoingTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  ongoingTag: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 6,
  },
  ongoingTagText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  lightningBadgeSmall: {
    width: 36,
    height: 36,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  ongoingTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  ongoingSubtitle: {
    fontSize: 12,
    color: "rgba(255,255,255,0.9)",
    marginBottom: 16,
  },
  ongoingFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.2)",
  },
  studentRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  studentAvatarWrapper: {
    position: "relative",
  },
  studentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  studentOnlineDot: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#10B981",
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  studentName: {
    fontSize: 12,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  sessionTime: {
    fontSize: 10,
    color: "rgba(255,255,255,0.8)",
  },
  joinClassButton: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  joinClassButtonText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#FF6B35",
  },

  // Schedule cards
  scheduleCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 12,
  },
  scheduleLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  timeBoxOrange: {
    backgroundColor: "#FFF7ED",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 56,
  },
  timeAmPm: {
    fontSize: 9,
    fontWeight: "900",
    color: "#FF6B35",
    textTransform: "uppercase",
  },
  timeValue: {
    fontSize: 12,
    fontWeight: "900",
    color: "#FF6B35",
  },
  timeBoxGray: {
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 56,
  },
  timeAmPmGray: {
    fontSize: 9,
    fontWeight: "900",
    color: "#6B7280",
    textTransform: "uppercase",
  },
  timeValueGray: {
    fontSize: 12,
    fontWeight: "900",
    color: "#374151",
  },
  scheduleInfo: {
    flex: 1,
  },
  scheduleTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: "#111827",
  },
  scheduleSubtitle: {
    fontSize: 11,
    color: "#9CA3AF",
    marginTop: 2,
  },
  startsInText: {
    color: "#FF6B35",
    fontWeight: "700",
  },
  groupTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  groupBadge: {
    backgroundColor: "#EDE9FE",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  groupBadgeText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#7C3AED",
  },
  readyButton: {
    backgroundColor: "#FFF7ED",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FFD6CC",
    marginLeft: 8,
  },
  readyButtonText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#FF6B35",
  },
  viewButton: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginLeft: 8,
  },
  viewButtonText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#4B5563",
  },

  // Instant support toggle
  instantCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  instantLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  instantDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#10B981",
  },
  instantInfo: {
    flex: 1,
  },
  instantTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: "#111827",
  },
  instantSubtitle: {
    fontSize: 10,
    color: "#9CA3AF",
    marginTop: 2,
  },

  // Students section
  studentsRow: {
    flexDirection: "row",
    gap: 12,
  },
  studentCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  studentCardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  studentAvatarCard: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  yearBadge: {
    backgroundColor: "#FFF7ED",
    borderWidth: 1,
    borderColor: "#FFEAE0",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  yearBadgeText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#FF6B35",
  },
  studentNameCard: {
    fontSize: 12,
    fontWeight: "800",
    color: "#111827",
  },
  studentSessionsText: {
    fontSize: 10,
    color: "#9CA3AF",
    marginTop: 2,
    marginBottom: 12,
  },
  studentCardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  gradeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#059669",
  },

  // Bottom nav (5 items)
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingVertical: 10,
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

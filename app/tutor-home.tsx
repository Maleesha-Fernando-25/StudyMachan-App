import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React from "react";
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

export default function TutorHomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF8F5" />

      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.headerLeftPlaceholder} />
        <Text style={styles.headerTitle}>StudyMachan</Text>
        <TouchableOpacity activeOpacity={0.8}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
            }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      {/* Scrollable Main Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Rating & Weekly Goal Card */}
        <View style={styles.statsCard}>
          <View style={styles.statsRow}>
            <View style={styles.starIconBox}>
              <FontAwesome name="star" size={18} color="#FF7A45" />
            </View>
            <View>
              <Text style={styles.statsLabel}>Current Rating</Text>
              <Text style={styles.statsValue}>
                4.9 <Text style={styles.statsSub}>(128 reviews)</Text>
              </Text>
            </View>
          </View>

          <View style={styles.goalBox}>
            <Text style={styles.statsLabel}>Weekly Goal</Text>
            <Text style={styles.goalText}>8 / 10 Sessions</Text>
            <View style={styles.progressBgSmall}>
              <View style={styles.progressFillSmall} />
            </View>
          </View>
        </View>

        {/* Ongoing Session Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Ongoing Session</Text>
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>Live</Text>
            </View>
          </View>

          <View style={styles.sessionCard}>
            <View style={styles.sessionHeader}>
              <View style={styles.sessionUserRow}>
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120",
                  }}
                  style={styles.sessionAvatar}
                />
                <View style={styles.sessionUserInfo}>
                  <Text style={styles.sessionTitle} numberOfLines={1}>
                    Advanced Calculus Prep
                  </Text>
                  <Text style={styles.sessionSubtitle}>with Sarah Jenkins</Text>
                </View>
              </View>

              <View style={styles.sessionTimeBox}>
                <Text style={styles.sessionTimeLabel}>Time Remaining</Text>
                <Text style={styles.sessionTimeValue}>14:22</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.enterButton}>
              <MaterialCommunityIcons
                name="video-outline"
                size={20}
                color="#FFFFFF"
              />
              <Text style={styles.enterButtonText}>Enter Workspace</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Today's Schedule Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Schedule</Text>
            <TouchableOpacity>
              <Text style={styles.viewFullText}>View Full</Text>
            </TouchableOpacity>
          </View>

          {/* Schedule Card 1 */}
          <View style={styles.scheduleCard}>
            <View style={styles.scheduleRow}>
              <View style={styles.scheduleTimeBox}>
                <Text style={styles.scheduleTime}>2:00</Text>
                <Text style={styles.scheduleAmPm}>PM</Text>
              </View>

              <View style={styles.scheduleInfo}>
                <Text style={styles.scheduleTitle}>Physics 101</Text>
                <Text style={styles.scheduleSubtitle}>with Michael T.</Text>
              </View>

              <TouchableOpacity style={styles.moreButton}>
                <Feather name="more-vertical" size={16} color="#8E8E93" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Schedule Card 2 */}
          <View style={styles.scheduleCard}>
            <View style={styles.scheduleRow}>
              <View style={styles.scheduleTimeBox}>
                <Text style={styles.scheduleTime}>4:30</Text>
                <Text style={styles.scheduleAmPm}>PM</Text>
              </View>

              <View style={styles.scheduleInfo}>
                <Text style={styles.scheduleTitle}>Essay Review</Text>
                <Text style={styles.scheduleSubtitle}>with Emily R.</Text>
              </View>

              <TouchableOpacity style={styles.moreButton}>
                <Feather name="more-vertical" size={16} color="#8E8E93" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Active Students Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Students</Text>

          <View style={styles.studentsRow}>
            {/* Student 1 */}
            <TouchableOpacity style={styles.studentCard}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120",
                }}
                style={styles.studentAvatar}
              />
              <Text style={styles.studentName}>David L.</Text>
              <Text style={styles.studentSubjects}>Math, Science</Text>
            </TouchableOpacity>

            {/* Student 2 */}
            <TouchableOpacity style={styles.studentCard}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120",
                }}
                style={styles.studentAvatar}
              />
              <Text style={styles.studentName}>Jessica M.</Text>
              <Text style={styles.studentSubjects}>Literature</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.bottomNavItemActive}>
          <Ionicons name="home" size={16} color="#FFFFFF" />
          <Text style={styles.bottomNavTextActive}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomNavItem}>
          <Feather name="calendar" size={20} color="#8E8E93" />
          <Text style={styles.bottomNavText}>Schedule</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomNavEarnings}>
          <MaterialCommunityIcons
            name="cash-multiple"
            size={16}
            color="#666666"
          />
          <Text style={styles.bottomNavEarningsText}>Earnings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomNavItem}>
          <Feather name="bell" size={20} color="#8E8E93" />
          <Text style={styles.bottomNavText}>Alerts</Text>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#FAF8F5",
  },
  headerLeftPlaceholder: {
    width: 36,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#B45325",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#FFD7C2",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 90,
  },
  statsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#F3F4F6",
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  starIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFEAE0",
    alignItems: "center",
    justifyContent: "center",
  },
  statsLabel: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },
  statsValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
    marginTop: 2,
  },
  statsSub: {
    fontSize: 12,
    fontWeight: "400",
    color: "#6B7280",
  },
  goalBox: {
    alignItems: "flex-end",
  },
  goalText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FF7A45",
    marginTop: 2,
    marginBottom: 6,
  },
  progressBgSmall: {
    width: 96,
    height: 6,
    backgroundColor: "#F3F4F6",
    borderRadius: 999,
    overflow: "hidden",
  },
  progressFillSmall: {
    width: "80%",
    height: "100%",
    backgroundColor: "#FF7A45",
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2A2A2A",
  },
  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF5722",
  },
  liveText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FF5722",
  },
  sessionCard: {
    backgroundColor: "#FFF5EE",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#FFE8DA",
  },
  sessionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  sessionUserRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  sessionAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  sessionUserInfo: {
    flex: 1,
  },
  sessionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },
  sessionSubtitle: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  sessionTimeBox: {
    alignItems: "flex-end",
    marginLeft: 8,
  },
  sessionTimeLabel: {
    fontSize: 11,
    color: "#9CA3AF",
  },
  sessionTimeValue: {
    fontSize: 14,
    fontWeight: "800",
    color: "#111827",
    marginTop: 2,
  },
  enterButton: {
    backgroundColor: "#FF7A45",
    height: 44,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  enterButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  scheduleCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#F3F4F6",
    marginBottom: 12,
  },
  scheduleRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  scheduleTimeBox: {
    alignItems: "center",
    paddingRight: 14,
    borderRightWidth: 1,
    borderRightColor: "#F3F4F6",
    minWidth: 55,
  },
  scheduleTime: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },
  scheduleAmPm: {
    fontSize: 11,
    color: "#9CA3AF",
    textTransform: "uppercase",
    fontWeight: "600",
    marginTop: 2,
  },
  scheduleInfo: {
    flex: 1,
    marginLeft: 14,
  },
  scheduleTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },
  scheduleSubtitle: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  moreButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  studentsRow: {
    flexDirection: "row",
    gap: 12,
  },
  studentCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  studentAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginBottom: 10,
  },
  studentName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
  },
  studentSubjects: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 2,
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingVertical: 10,
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomNavItem: {
    alignItems: "center",
  },
  bottomNavItemActive: {
    backgroundColor: "#FF7A45",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    gap: 6,
  },
  bottomNavText: {
    fontSize: 10,
    color: "#9CA3AF",
    fontWeight: "600",
    marginTop: 2,
  },
  bottomNavTextActive: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "700",
  },
  bottomNavEarnings: {
    backgroundColor: "rgba(0,0,0,0.06)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    gap: 4,
  },
  bottomNavEarningsText: {
    fontSize: 10,
    color: "#666666",
    fontWeight: "600",
  },
  viewFullText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#B45325",
  },
});

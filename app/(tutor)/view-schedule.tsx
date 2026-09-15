import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
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

type Session = {
  id: string;
  subject: string;
  student: string;
  timeLabel: string; // e.g. "Today, 06:30 PM"
  duration: string;
  type: "1-on-1" | "Group";
  imageUri?: string;
  initials?: string;
  status: "upcoming" | "past";
};

export default function ViewScheduleScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"Upcoming" | "Past">("Upcoming");

  const sessions: Session[] = [
    {
      id: "1",
      subject: "Chemistry: Inorganic Nomenclature & Reactions",
      student: "Nethmi Silva",
      timeLabel: "Today, 06:30 PM",
      duration: "60 mins",
      type: "1-on-1",
      imageUri:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150",
      status: "upcoming",
    },
    {
      id: "2",
      subject: "Chemistry: Industrial Applications of Organic Chemistry",
      student: "3 Students enrolled",
      timeLabel: "Today, 08:00 PM",
      duration: "90 mins",
      type: "Group",
      imageUri:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      status: "upcoming",
    },
    {
      id: "3",
      subject: "Chemistry: Reaction Kinetics",
      student: "Dilshan Pathirana",
      timeLabel: "Yesterday, 05:00 PM",
      duration: "60 mins",
      type: "1-on-1",
      imageUri:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      status: "past",
    },
    {
      id: "4",
      subject: "Chemistry: Thermodynamics",
      student: "Amaya Perera",
      timeLabel: "Oct 10, 04:30 PM",
      duration: "60 mins",
      type: "1-on-1",
      imageUri:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
      status: "past",
    },
  ];

  const filteredSessions = sessions.filter(
    (s) =>
      (activeTab === "Upcoming" && s.status === "upcoming") ||
      (activeTab === "Past" && s.status === "past")
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF9F7" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={styles.headerIcon}
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={24} color="#A34A28" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>View Schedule</Text>

        <View style={styles.headerIcon} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === "Upcoming" && styles.activeTab,
            ]}
            onPress={() => setActiveTab("Upcoming")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Upcoming" && styles.activeTabText,
              ]}
            >
              Upcoming
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === "Past" && styles.activeTab,
            ]}
            onPress={() => setActiveTab("Past")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Past" && styles.activeTabText,
              ]}
            >
              Past
            </Text>
          </TouchableOpacity>
        </View>

        {/* Session Cards */}
        {filteredSessions.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              No {activeTab.toLowerCase()} sessions
            </Text>
          </View>
        ) : (
          filteredSessions.map((session) => (
            <View key={session.id} style={styles.sessionCard}>
              <View style={styles.sessionHeader}>
                <View style={styles.sessionLeft}>
                  {session.imageUri ? (
                    <Image
                      source={{ uri: session.imageUri }}
                      style={styles.avatar}
                    />
                  ) : (
                    <View style={styles.avatarPlaceholder}>
                      <Text style={styles.avatarInitials}>
                        {session.initials}
                      </Text>
                    </View>
                  )}

                  <View style={styles.sessionInfo}>
                    <Text style={styles.subjectText} numberOfLines={2}>
                      {session.subject}
                    </Text>
                    <Text style={styles.studentText}>
                      {session.student} • {session.type}
                    </Text>
                  </View>
                </View>

                <View style={styles.timeBox}>
                  <Text style={styles.timeLabel}>{session.timeLabel}</Text>
                  <Text style={styles.durationText}>{session.duration}</Text>
                </View>
              </View>

              <View style={styles.sessionActions}>
                {session.status === "upcoming" ? (
                  <>
                    <TouchableOpacity style={styles.btnReschedule}>
                      <Text style={styles.btnRescheduleText}>Reschedule</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnStart}>
                      <Text style={styles.btnStartText}>Start</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity style={styles.btnReview}>
                    <Text style={styles.btnReviewText}>View Details</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Bottom Navigation – same as tutor home, no icon highlighted */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/tutor-home")}
        >
          <Ionicons name="home" size={20} color="#9CA3AF" />
          <Text style={styles.navTextInactive}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/sessions")}
        >
          <Feather name="calendar" size={18} color="#9CA3AF" />
          <Text style={styles.navTextInactive}>My Schedule</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/earnings")}
        >
          <MaterialCommunityIcons
            name="wallet-outline"
            size={18}
            color="#9CA3AF"
          />
          <Text style={styles.navTextInactive}>Earnings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/reviews")}
        >
          <FontAwesome name="star" size={16} color="#9CA3AF" />
          <Text style={styles.navTextInactive}>Reviews</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/messages")}
        >
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
    backgroundColor: "#FAF9F7",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 14,
    backgroundColor: "#FAF9F7",
  },
  headerIcon: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#A34A28",
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 120,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: "#FF7A45",
  },
  tabText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#666",
  },
  activeTabText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  emptyState: {
    paddingVertical: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "#888",
  },
  sessionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    marginBottom: 12,
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
    flex: 1,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
    backgroundColor: "#F0F0F0",
  },
  avatarPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F0F0F0",
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitials: {
    fontSize: 14,
    fontWeight: "700",
    color: "#555",
  },
  sessionInfo: {
    flex: 1,
  },
  subjectText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  studentText: {
    fontSize: 12,
    color: "#666",
  },
  timeBox: {
    alignItems: "flex-end",
  },
  timeLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 2,
  },
  durationText: {
    fontSize: 11,
    color: "#888",
  },
  sessionActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
  btnReschedule: {
    backgroundColor: "#FFF0E6",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FFD6CC",
  },
  btnRescheduleText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FF6B35",
  },
  btnStart: {
    backgroundColor: "#FF6B35",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  btnStartText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  btnReview: {
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  btnReviewText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#333",
  },

  // Bottom nav – same as tutor home
  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EAEAEA",
    paddingVertical: 14,
    paddingHorizontal: 12,
    paddingBottom: 22,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navItem: {
    alignItems: "center",
    flex: 1,
  },
  navTextActive: {
    fontSize: 10,
    fontWeight: "700",
    color: "#FF6B35",
    marginTop: 4,
  },
  navTextInactive: {
    fontSize: 10,
    fontWeight: "600",
    color: "#9CA3AF",
    marginTop: 4,
  },
});
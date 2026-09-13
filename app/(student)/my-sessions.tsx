import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Image,
    ImageSourcePropType,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type SessionTab = "Upcoming" | "Past";

type UpcomingSession = {
  id: string;
  name: string;
  subject: string;
  date: string;
  avatar: ImageSourcePropType;
  isLive: boolean;
  liveText?: string;
  actionText: string;
  isPrimaryAction: boolean;
};

type PastSession = {
  id: string;
  name: string;
  subject: string;
  date: string;
  avatar: ImageSourcePropType;
  secondaryAction: string;
  secondaryType: "default" | "orange";
};

const upcomingSessions: UpcomingSession[] = [
  {
    id: "1",
    name: "Dewmina Weerasinghe",
    subject: "Mechanics",
    date: "Mon, Nov 12 • 10:30 AM (1 hr)",
    avatar: require("../../assets/images/tutors/dewmina-weerasinghe.jpg"),
    isLive: true,
    liveText: "Live in 10m",
    actionText: "Join Session",
    isPrimaryAction: true,
  },
  {
    id: "2",
    name: "Sandamali Rupasinghe",
    subject: "Mathematics",
    date: "Wed, Nov 14 • 2:00 PM (45 min)",
    avatar: require("../../assets/images/tutors/sandamali-rupasinghe.jpg"),
    isLive: false,
    actionText: "Reschedule",
    isPrimaryAction: false,
  },
  {
    id: "3",
    name: "Harsha Dissanayake",
    subject: "Sinhala Literature",
    date: "Fri, Nov 16 • 11:00 AM (1 hr)",
    avatar: require("../../assets/images/tutors/harsha-dissanayake.jpg"),
    isLive: false,
    actionText: "Reschedule",
    isPrimaryAction: false,
  },
];

const pastSessions: PastSession[] = [
  {
    id: "p1",
    name: "Shalika Ekanayake",
    subject: "Geography",
    date: "Aug 4, 2026 • 45 min",
    avatar: require("../../assets/images/tutors/shalika-ekanayake.jpg"),
    secondaryAction: "View Feedback",
    secondaryType: "default",
  },
  {
    id: "p2",
    name: "Nadeesha Hettiarachchi",
    subject: "Economics",
    date: "Aug 3, 2026 • 60 min",
    avatar: require("../../assets/images/tutors/nadeesha-hettiarachchi.jpg"),
    secondaryAction: "Give Feedback",
    secondaryType: "orange",
  },
];

export default function MySessionsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<SessionTab>("Upcoming");

  const renderUpcomingSession = (session: UpcomingSession) => (
    <View key={session.id} style={styles.sessionCard}>
      <View style={styles.sessionTopRow}>
        <View style={styles.tutorInfoRow}>
          <Image source={session.avatar} style={styles.avatar} />

          <View style={styles.tutorTextContainer}>
            <Text style={styles.tutorName}>{session.name}</Text>
            <Text style={styles.subjectText}>{session.subject}</Text>
          </View>
        </View>

        {session.isLive && (
          <View style={styles.liveBadge}>
            <Feather name="video" size={12} color="#FFFFFF" />
            <Text style={styles.liveBadgeText}>{session.liveText}</Text>
          </View>
        )}
      </View>

      <View style={styles.dateRow}>
        <Feather name="calendar" size={14} color="#7A7263" />
        <Text style={styles.dateText}>{session.date}</Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.85}
        style={
          session.isPrimaryAction
            ? styles.primaryActionButton
            : styles.secondaryActionButton
        }
      >
        <Text
          style={
            session.isPrimaryAction
              ? styles.primaryActionText
              : styles.secondaryActionText
          }
        >
          {session.actionText}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderPastSession = (session: PastSession) => (
    <View key={session.id} style={styles.sessionCard}>
      <View style={styles.pastTutorRow}>
        <Image source={session.avatar} style={styles.pastAvatar} />

        <View style={styles.pastTutorTextContainer}>
          <Text style={styles.tutorName}>{session.name}</Text>
          <Text style={styles.subjectText}>{session.subject}</Text>

          <View style={styles.pastDateRow}>
            <Feather name="calendar" size={13} color="#7A7263" />
            <Text style={styles.dateText}>{session.date}</Text>
          </View>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.pastActionsRow}>
        <TouchableOpacity activeOpacity={0.85} style={styles.bookAgainButton}>
          <Feather name="rotate-cw" size={14} color="#FFFFFF" />
          <Text style={styles.bookAgainText}>Book Again</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.85}
          style={[
            styles.feedbackButton,
            session.secondaryType === "orange" && styles.feedbackButtonOrange,
          ]}
        >
          <Feather
            name="message-square"
            size={14}
            color={session.secondaryType === "orange" ? "#FF7A45" : "#2A231D"}
          />

          <Text
            style={[
              styles.feedbackText,
              session.secondaryType === "orange" && styles.feedbackTextOrange,
            ]}
          >
            {session.secondaryAction}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF8F5" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Feather name="arrow-left" size={23} color="#A33A19" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Sessions</Text>

        {/* Empty placeholder keeps the title centered */}
        <View style={styles.headerButtonPlaceholder} />
      </View>

      {/* Main content */}
      <View style={styles.mainContainer}>
        {/* Upcoming / Past tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => setActiveTab("Upcoming")}
            style={[
              styles.tabButton,
              activeTab === "Upcoming" && styles.activeTabButton,
            ]}
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
            activeOpacity={0.85}
            onPress={() => setActiveTab("Past")}
            style={[
              styles.tabButton,
              activeTab === "Past" && styles.activeTabButton,
            ]}
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

        {/* Session list */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.sessionsContent}
        >
          {activeTab === "Upcoming"
            ? upcomingSessions.map(renderUpcomingSession)
            : pastSessions.map(renderPastSession)}
        </ScrollView>
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
    paddingTop: 18,
    paddingBottom: 16,
    backgroundColor: "#FAF8F5",
  },

  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },

  headerButtonPlaceholder: {
    width: 44,
    height: 44,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#A33A19",
  },

  mainContainer: {
    flex: 1,
    backgroundColor: "#63584E",
    paddingTop: 16,
    paddingHorizontal: 16,
  },

  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#E1DACD",
    borderRadius: 999,
    padding: 4,
    marginBottom: 18,
  },

  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 11,
    borderRadius: 999,
  },

  activeTabButton: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 1,
  },

  tabText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#A33A19",
  },

  activeTabText: {
    color: "#2A231D",
  },

  sessionsContent: {
    paddingBottom: 40,
    gap: 14,
  },

  sessionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },

  sessionTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  tutorInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 8,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },

  tutorTextContainer: {
    marginLeft: 12,
    flex: 1,
  },

  tutorName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2A231D",
  },

  subjectText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
    marginTop: 3,
  },

  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#FF7A45",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },

  liveBadgeText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },

  dateText: {
    flex: 1,
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
  },

  primaryActionButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF7A45",
    paddingVertical: 13,
    borderRadius: 12,
  },

  primaryActionText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  secondaryActionButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DCD6CC",
    paddingVertical: 12,
    borderRadius: 12,
  },

  secondaryActionText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#2A231D",
  },

  pastTutorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  pastAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },

  pastTutorTextContainer: {
    flex: 1,
    marginLeft: 12,
  },

  pastDateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 5,
  },

  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginVertical: 4,
  },

  pastActionsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },

  bookAgainButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    backgroundColor: "#FF7A45",
    paddingVertical: 12,
    borderRadius: 12,
  },

  bookAgainText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  feedbackButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingVertical: 12,
    borderRadius: 12,
  },

  feedbackButtonOrange: {
    borderColor: "#FF7A45",
  },

  feedbackText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#2A231D",
  },

  feedbackTextOrange: {
    color: "#FF7A45",
  },
});

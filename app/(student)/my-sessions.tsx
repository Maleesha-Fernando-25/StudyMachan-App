import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { bookingService, BookingResponse } from "@/services/bookingService";

type SessionTab = "Upcoming" | "Past";

export default function MySessionsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<SessionTab>("Upcoming");
  const [sessions, setSessions] = useState<BookingResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const fetchSessions = async () => {
      try {
        setLoading(true);
        const data = await bookingService.getSessions();
        if (!cancelled) setSessions(data);
      } catch (err) {
        console.error("Failed to load sessions:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchSessions();
    return () => {
      cancelled = true;
    };
  }, []);

  const upcomingList = sessions.filter(
    (s) => s.status === "confirmed" || s.status === "pending"
  );
  const pastList = sessions.filter(
    (s) => s.status === "completed" || s.status === "cancelled"
  );

  const renderUpcomingSession = (session: BookingResponse) => (
    <View key={session.id} style={styles.sessionCard}>
      <View style={styles.sessionTopRow}>
        <View style={styles.tutorInfoRow}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
            }}
            style={styles.avatar}
          />

          <View style={styles.tutorTextContainer}>
            <Text style={styles.tutorName}>{session.subject}</Text>
            <Text style={styles.subjectText}>
              Status: {session.status.toUpperCase()}
            </Text>
          </View>
        </View>

        {session.status === "confirmed" && (
          <View style={styles.liveBadge}>
            <Feather name="video" size={12} color="#FFFFFF" />
            <Text style={styles.liveBadgeText}>Confirmed</Text>
          </View>
        )}
      </View>

      <View style={styles.dateRow}>
        <Feather name="calendar" size={14} color="#7A7263" />
        <Text style={styles.dateText}>
          {new Date(session.scheduled_at).toLocaleString([], {
            dateStyle: "medium",
            timeStyle: "short",
          })}{" "}
          ({session.duration_minutes} min)
        </Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.85}
        style={
          session.meeting_link
            ? styles.primaryActionButton
            : styles.secondaryActionButton
        }
      >
        <Text
          style={
            session.meeting_link
              ? styles.primaryActionText
              : styles.secondaryActionText
          }
        >
          {session.meeting_link ? "Join Session" : `Fee: LKR ${session.total_amount}`}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderPastSession = (session: BookingResponse) => (
    <View key={session.id} style={styles.sessionCard}>
      <View style={styles.pastTutorRow}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
          }}
          style={styles.pastAvatar}
        />

        <View style={styles.pastTutorTextContainer}>
          <Text style={styles.tutorName}>{session.subject}</Text>
          <Text style={styles.subjectText}>Status: {session.status}</Text>

          <View style={styles.pastDateRow}>
            <Feather name="calendar" size={13} color="#7A7263" />
            <Text style={styles.dateText}>
              {new Date(session.scheduled_at).toLocaleDateString()} •{" "}
              {session.duration_minutes} min
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.pastActionsRow}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.bookAgainButton}
          onPress={() => router.push("/(student)/top-tutors" as any)}
        >
          <Feather name="rotate-cw" size={14} color="#FFFFFF" />
          <Text style={styles.bookAgainText}>Book Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const currentList = activeTab === "Upcoming" ? upcomingList : pastList;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Feather name="arrow-left" size={24} color="#A33A19" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Sessions</Text>
        <View style={styles.headerButtonPlaceholder} />
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
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
              Upcoming ({upcomingList.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
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
              Past ({pastList.length})
            </Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" color="#FF7A45" />
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.sessionsContent}
          >
            {currentList.length === 0 ? (
              <View style={{ padding: 40, alignItems: "center" }}>
                <Text style={{ color: "#E1DACD", fontSize: 14 }}>
                  No {activeTab.toLowerCase()} sessions found.
                </Text>
              </View>
            ) : (
              currentList.map((item) =>
                activeTab === "Upcoming"
                  ? renderUpcomingSession(item)
                  : renderPastSession(item)
              )
            )}
          </ScrollView>
        )}
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
});

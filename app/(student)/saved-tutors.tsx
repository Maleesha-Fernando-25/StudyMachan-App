import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
    Alert,
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

type AvailabilityType = "today" | "tomorrow" | "instant" | "weekend";

type Tutor = {
  id: string;
  name: string;
  university: string;
  rating: string;
  sessions: string;
  availability: string;
  availabilityType: AvailabilityType;
  tags: string[];
  price: string;
  avatar: string;
};

const SAVED_TUTORS: Tutor[] = [
  {
    id: "1",
    name: "Sarah Perera",
    university: "University of Colombo",
    rating: "4.9",
    sessions: "140+ sessions",
    availability: "Available Today • 4:00 PM slot",
    availabilityType: "today",
    tags: ["Combined Maths", "A/L Theory & Revision", "Online & Physical"],
    price: "LKR 900",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
  },
  {
    id: "2",
    name: "Kavinda Perera",
    university: "BSc Eng (Hons) Moratuwa",
    rating: "5.0",
    sessions: "98+ sessions",
    availability: "Next Slot: Tomorrow 10:00 AM",
    availabilityType: "tomorrow",
    tags: ["Physics & Mechanics", "Paper Classes", "Individual / Small Groups"],
    price: "LKR 950",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
  },
  {
    id: "3",
    name: "Dinithi Jayawardena",
    university: "MBBS Undergrad • University of Colombo",
    rating: "4.9",
    sessions: "115+ sessions",
    availability: "Instant Help • Live Session Available",
    availabilityType: "instant",
    tags: ["Chemistry (Organic/Inorganic)", "Speed Revision", "Past Papers"],
    price: "LKR 1,000",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
  },
  {
    id: "4",
    name: "Charitha Bandara",
    university: "Software Engineering, UCSC",
    rating: "4.8",
    sessions: "76+ sessions",
    availability: "Weekend Batches Only • 2 slots left",
    availabilityType: "weekend",
    tags: ["ICT & Computer Science", "Python & SQL", "Practical Coding"],
    price: "LKR 1,000",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
  },
];

export default function SavedTutorsScreen() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [savedTutors, setSavedTutors] = useState(SAVED_TUTORS);

  const filteredTutors = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return savedTutors;
    }

    return savedTutors.filter((tutor) => {
      const searchableText = [
        tutor.name,
        tutor.university,
        tutor.availability,
        ...tutor.tags,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [searchQuery, savedTutors]);

  const removeTutor = (tutor: Tutor) => {
    Alert.alert(
      "Remove saved tutor",
      `Remove ${tutor.name} from your saved tutors?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            setSavedTutors((currentTutors) =>
              currentTutors.filter((item) => item.id !== tutor.id),
            );
          },
        },
      ],
    );
  };

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
          <Feather name="arrow-left" size={22} color="#2A231D" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Saved Tutors</Text>

        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Count and sort */}
        <View style={styles.topRow}>
          <View style={styles.countPill}>
            <Text style={styles.countText}>{savedTutors.length} Saved</Text>
          </View>

          <TouchableOpacity style={styles.sortButton} activeOpacity={0.8}>
            <FontAwesome5
              name="exchange-alt"
              size={12}
              color="#5C534B"
              style={styles.sortIcon}
            />
            <Text style={styles.sortText}>Recent</Text>
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Feather name="search" size={18} color="#9CA3AF" />

          <TextInput
            placeholder="Search saved teachers"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />

          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery("")}
              activeOpacity={0.7}
            >
              <Feather name="x-circle" size={18} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>

        {/* Empty state */}
        {filteredTutors.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="heart-outline" size={42} color="#FF7A45" />

            <Text style={styles.emptyTitle}>
              {savedTutors.length === 0 ? "No saved tutors" : "No tutors found"}
            </Text>

            <Text style={styles.emptyText}>
              {savedTutors.length === 0
                ? "Tutors you save will appear here."
                : "Try searching for another tutor or subject."}
            </Text>
          </View>
        )}

        {/* Tutor cards */}
        {filteredTutors.map((tutor) => (
          <View key={tutor.id} style={styles.tutorCard}>
            {/* Profile row */}
            <View style={styles.profileRow}>
              <View style={styles.profileDetails}>
                <View style={styles.avatarContainer}>
                  <Image
                    source={{ uri: tutor.avatar }}
                    style={styles.tutorAvatar}
                  />

                  <View style={styles.verifiedBadge}>
                    <Ionicons name="checkmark" size={11} color="#FFFFFF" />
                  </View>
                </View>

                <View style={styles.profileTextContainer}>
                  <Text style={styles.tutorName}>{tutor.name}</Text>

                  <Text style={styles.university} numberOfLines={1}>
                    {tutor.university}
                  </Text>

                  <View style={styles.ratingRow}>
                    <FontAwesome5 name="star" size={12} color="#FF7A45" />

                    <Text style={styles.rating}>{tutor.rating}</Text>

                    <Text style={styles.separator}>•</Text>

                    <Text style={styles.sessions}>{tutor.sessions}</Text>
                  </View>
                </View>
              </View>

              {/* Heart icon */}
              <TouchableOpacity
                style={styles.heartButton}
                onPress={() => removeTutor(tutor)}
                activeOpacity={0.8}
              >
                <Ionicons name="heart" size={19} color="#FF7A45" />
              </TouchableOpacity>
            </View>

            {/* Availability */}
            <View style={styles.availabilityBar}>
              {tutor.availabilityType === "today" && (
                <View style={styles.todayDot} />
              )}

              {tutor.availabilityType === "tomorrow" && (
                <Feather name="clock" size={14} color="#7A7263" />
              )}

              {tutor.availabilityType === "instant" && (
                <Ionicons name="radio-outline" size={15} color="#A33A19" />
              )}

              {tutor.availabilityType === "weekend" && (
                <Feather name="calendar" size={14} color="#7A7263" />
              )}

              <Text
                style={[
                  styles.availabilityText,
                  tutor.availabilityType === "instant" &&
                    styles.instantAvailabilityText,
                ]}
              >
                {tutor.availability}
              </Text>
            </View>

            {/* Tags */}
            <View style={styles.tagsContainer}>
              {tutor.tags.map((tag) => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>

            {/* Footer */}
            <View style={styles.cardFooter}>
              <View>
                <Text style={styles.price}>{tutor.price}</Text>
                <Text style={styles.priceSubtitle}>per session</Text>
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.messageButton}
                  activeOpacity={0.8}
                  onPress={() =>
                    router.push({
                      pathname: "/chat" as any,
                      params: {
                        tutorId: tutor.id,
                        tutorName: tutor.name,
                      },
                    })
                  }
                >
                  <Feather name="message-square" size={18} color="#2A231D" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.bookButton}
                  activeOpacity={0.85}
                  onPress={() =>
                    router.push({
                      pathname: "/book2-session" as any,
                      params: {
                        tutorId: tutor.id,
                        tutorName: tutor.name,
                      },
                    })
                  }
                >
                  <Text style={styles.bookButtonText}>Book Session</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
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
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: "#FAF8F5",
  },

  headerButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#A33A19",
  },

  headerPlaceholder: {
    width: 36,
    height: 36,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 40,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  countPill: {
    backgroundColor: "#FFE8E0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },

  countText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#A33A19",
  },

  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#EFE8DC",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
  },

  sortIcon: {
    transform: [{ rotate: "90deg" }],
  },

  sortText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#2A231D",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#EFE8DC",
    marginBottom: 16,
  },

  searchInput: {
    flex: 1,
    padding: 0,
    fontSize: 14,
    color: "#2A231D",
    fontWeight: "500",
  },

  tutorCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: "#EFE8DC",
    marginBottom: 16,
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  profileDetails: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingRight: 8,
  },

  avatarContainer: {
    position: "relative",
    marginRight: 12,
  },

  tutorAvatar: {
    width: 56,
    height: 56,
    borderRadius: 16,
  },

  verifiedBadge: {
    position: "absolute",
    right: -4,
    bottom: -4,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A33A19",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },

  profileTextContainer: {
    flex: 1,
  },

  tutorName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2A231D",
  },

  university: {
    marginTop: 2,
    fontSize: 12,
    color: "#7A7263",
    fontWeight: "600",
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 5,
  },

  rating: {
    fontSize: 12,
    fontWeight: "800",
    color: "#2A231D",
  },

  separator: {
    fontSize: 12,
    color: "#7A7263",
  },

  sessions: {
    fontSize: 12,
    color: "#7A7263",
    fontWeight: "600",
  },

  heartButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFE8E0",
  },

  availabilityBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FAF6F0",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 14,
  },

  todayDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#A33A19",
  },

  availabilityText: {
    flex: 1,
    fontSize: 12,
    fontWeight: "800",
    color: "#5C534B",
  },

  instantAvailabilityText: {
    color: "#A33A19",
  },

  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 16,
  },

  tag: {
    backgroundColor: "#F4EFEA",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },

  tagText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#5C534B",
  },

  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  price: {
    fontSize: 16,
    fontWeight: "900",
    color: "#2A231D",
  },

  priceSubtitle: {
    marginTop: -2,
    fontSize: 11,
    fontWeight: "600",
    color: "#7A7263",
  },

  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  messageButton: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F4EFEA",
    borderWidth: 1,
    borderColor: "#EFE8DC",
  },

  bookButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF7A45",
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderRadius: 16,
  },

  bookButtonText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 80,
  },

  emptyTitle: {
    marginTop: 14,
    fontSize: 18,
    fontWeight: "800",
    color: "#2A231D",
  },

  emptyText: {
    marginTop: 6,
    textAlign: "center",
    fontSize: 13,
    lineHeight: 19,
    color: "#7A7263",
    fontWeight: "600",
  },
});

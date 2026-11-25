import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
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
import { tutorService, TutorSummary } from "@/services/tutorService";

const COLORS = {
  primary: "#FF7145",
  titleOrange: "#A33A19",
  background: "#F9F9F9",
  white: "#FFFFFF",
  textDark: "#1A1A1A",
  textLight: "#7A7A7A",
  textBrown: "#9E4529",
  border: "#EEEEEE",
  tagBg: "#F0EEEA",
  statsBg: "#F5F5F5",
};

export default function TopTutorsScreen() {
  const router = useRouter();
  const [tutors, setTutors] = useState<TutorSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const fetchTutors = async () => {
      try {
        setLoading(true);
        const data = await tutorService.searchTutors({
          limit: 30,
        });
        if (!cancelled) setTutors(data);
      } catch (err) {
        console.error("Failed to load tutors:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchTutors();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredTutors = tutors.filter((t) => {
    if (verifiedOnly && !t.is_verified) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = t.name.toLowerCase().includes(q);
      const matchSub = t.subjects.some((s) => s.toLowerCase().includes(q));
      return matchName || matchSub;
    }
    return true;
  });

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.headerButton}
        onPress={() => router.back()}
        activeOpacity={0.7}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      >
        <Feather name="arrow-left" size={24} color={COLORS.titleOrange} />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>Top Tutors</Text>
      <View style={styles.headerButtonPlaceholder} />
    </View>
  );

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <View style={styles.searchInputWrapper}>
        <Feather
          name="search"
          size={20}
          color={COLORS.primary}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search tutor or subject"
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
        />
      </View>
    </View>
  );

  const renderFilters = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.filtersContainer}
      contentContainerStyle={styles.filtersContent}
    >
      <TouchableOpacity
        style={[
          styles.filterChipStandard,
          verifiedOnly && { backgroundColor: COLORS.primary },
        ]}
        onPress={() => setVerifiedOnly((prev) => !prev)}
      >
        <Ionicons
          name="checkmark-circle-outline"
          size={16}
          color={verifiedOnly ? COLORS.white : COLORS.textBrown}
        />
        <Text
          style={[
            styles.filterChipTextStandard,
            verifiedOnly && { color: COLORS.white, fontWeight: "bold" },
          ]}
        >
          Verified Only
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderTutorCard = ({ item }: { item: TutorSummary }) => (
    <View style={styles.card}>
      <View style={styles.cardTopRow}>
        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri:
                item.avatar_url ||
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
            }}
            style={styles.avatar}
          />
          {item.is_verified && (
            <View style={styles.verifiedBadge}>
              <MaterialIcons name="check" size={12} color={COLORS.white} />
            </View>
          )}
        </View>

        <View style={styles.cardDetails}>
          <View style={styles.badgePriceRow}>
            <View style={styles.tutorBadge}>
              <Text style={styles.tutorBadgeText}>
                {item.is_verified ? "VERIFIED TUTOR" : "TOP TUTOR"}
              </Text>
            </View>

            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>
                LKR {Number(item.hourly_rate).toLocaleString()}
              </Text>
              <Text style={styles.perSessionText}>/ hr</Text>
            </View>
          </View>

          <Text style={styles.tutorName} numberOfLines={1}>
            {item.name}
          </Text>

          <Text style={styles.tutorSpecialty} numberOfLines={1}>
            {item.subjects?.join(", ") || "General"}
          </Text>

          {item.district && (
            <View style={styles.educationRow}>
              <Ionicons name="location-outline" size={12} color={COLORS.textLight} />
              <Text style={styles.educationText} numberOfLines={1}>
                {item.district}
              </Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.statsBox}>
        <View style={styles.statItem}>
          <Ionicons name="star" size={14} color="#FFA000" />
          <Text style={styles.statValue}>
            {Number(item.average_rating || 5.0).toFixed(1)}
          </Text>
          <Text style={styles.statLabel}>({item.total_reviews} reviews)</Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.statItem}>
          <Feather name="book-open" size={14} color={COLORS.textLight} />
          <Text style={styles.statLabel}>{item.completed_sessions} sessions</Text>
        </View>
      </View>

      <View style={styles.actionButtonsRow}>
        <TouchableOpacity
          style={styles.btnSecondary}
          onPress={() => router.push({ pathname: "/tutor-profile" as any, params: { id: item.id } })}
        >
          <Text style={styles.btnSecondaryText}>View Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnPrimary}
          onPress={() =>
            router.push({
              pathname: "/book1-session" as any,
              params: {
                tutor_id: item.id,
                tutor_name: item.name,
                hourly_rate: String(item.hourly_rate),
              },
            })
          }
        >
          <Text style={styles.btnPrimaryText}>Book Session</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {renderHeader()}
      {renderSearchBar()}
      {renderFilters()}

      <View style={styles.statusRow}>
        <Text style={styles.statusText}>
          Available Tutors ({filteredTutors.length})
        </Text>
      </View>

      {loading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <FlatList
          data={filteredTutors}
          keyExtractor={(item) => item.id}
          renderItem={renderTutorCard}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={{ padding: 40, alignItems: "center" }}>
              <Text style={{ color: COLORS.textLight, fontSize: 14 }}>
                No tutors found matching your criteria.
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.titleOrange,
  },
  headerButtonPlaceholder: {
    width: 34,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  searchInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    fontSize: 14,
    color: COLORS.textDark,
  },
  filtersContainer: {
    paddingLeft: 20,
    marginBottom: 10,
    maxHeight: 50,
  },
  filtersContent: {
    paddingRight: 20,
    alignItems: "center",
  },
  filterChipStandard: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 10,
    alignItems: "center",
    backgroundColor: COLORS.tagBg,
  },
  filterChipTextStandard: {
    fontSize: 13,
    color: COLORS.textDark,
    marginLeft: 4,
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 5,
    marginBottom: 5,
    alignItems: "center",
  },
  statusText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.textLight,
  },
  listContent: {
    padding: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  cardTopRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  avatarContainer: {
    marginRight: 12,
    position: "relative",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: "#EAEAEA",
  },
  verifiedBadge: {
    position: "absolute",
    bottom: -4,
    right: -4,
    backgroundColor: "#C63A1D",
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  cardDetails: {
    flex: 1,
  },
  badgePriceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  tutorBadge: {
    backgroundColor: "#EAEAEA",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
  },
  tutorBadgeText: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#555",
    textTransform: "uppercase",
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  priceText: {
    fontSize: 15,
    fontWeight: "bold",
    color: COLORS.textBrown,
  },
  perSessionText: {
    fontSize: 10,
    color: COLORS.textLight,
  },
  tutorName: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.textDark,
    marginBottom: 2,
  },
  tutorSpecialty: {
    fontSize: 13,
    color: COLORS.textBrown,
    fontWeight: "500",
    marginBottom: 4,
  },
  educationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  educationText: {
    flex: 1,
    fontSize: 12,
    color: COLORS.textLight,
    marginLeft: 4,
  },
  statsBox: {
    flexDirection: "row",
    backgroundColor: COLORS.statsBg,
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },
  statValue: {
    fontSize: 13,
    fontWeight: "bold",
    color: COLORS.textDark,
    marginLeft: 4,
    marginRight: 4,
  },
  statLabel: {
    fontSize: 13,
    color: COLORS.textLight,
    marginLeft: 4,
  },
  statDivider: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#CCC",
    marginHorizontal: 10,
  },
  actionButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnSecondary: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 10,
  },
  btnSecondaryText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textDark,
  },
  btnPrimary: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  btnPrimaryText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.white,
  },
});

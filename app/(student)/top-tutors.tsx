import { Feather, FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
    FlatList,
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

// --- DUMMY DATA ---
const CATEGORIES = ["All Tutors", "Combined Maths", "Physics", "Chemistry"];

const TUTORS = [
  {
    id: "1",
    name: "Dr. Sarah Jenkins",
    badge: "FEATURED TOP TUTOR",
    price: "1,500",
    specialty: "Combined Maths & Pure Ma...",
    education: "Univ. of Colombo Alumni",
    rating: "4.9",
    reviews: "128",
    sessions: "140+",
    tags: ["Online & Physical", "A/L Theory & Revision"],
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    verified: true,
  },
  {
    id: "2",
    name: "Kavinda Perera",
    badge: "🔥 HIGH DEMAND",
    badgeColor: "#FDECE8",
    badgeTextColor: "#C63A1D",
    price: "800",
    specialty: "Physics & Mechanics Speciali...",
    education: "BSc Eng (Hons) Univ. of M...",
    rating: "5.0",
    reviews: "84",
    sessions: "98+",
    tags: ["Paper Classes", "Individual & Small Groups"],
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    verified: true,
  },
  {
    id: "3",
    name: "Dinithi Jayawardena",
    badge: "TOP RANKED CHEMISTRY",
    price: "1,200",
    specialty: "Chemistry (Organic & Physi...",
    education: "MBBS Undergrad, Univ. o...",
    rating: "4.9",
    reviews: "92",
    sessions: "115+",
    tags: ["Speed Revision", "Past Paper Discussions"],
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    verified: true,
  },
  {
    id: "4",
    name: "Charitha Bandara",
    badge: "TECH MENTOR",
    price: "1,000",
    specialty: "ICT & Computer Science",
    education: "Software Eng., UCSC",
    rating: "4.8",
    reviews: "65",
    sessions: "76+",
    tags: ["Practical Coding", "Python & SQL"],
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    verified: true,
  },
];

const COLORS = {
  primary: "#FF7145",
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

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()}>
        <Feather name="arrow-left" size={24} color={COLORS.textDark} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Top Tutors</Text>
      <TouchableOpacity>
        <FontAwesome5 name="studiovinari" size={24} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <View style={styles.searchInputWrapper}>
        <Feather name="search" size={20} color={COLORS.primary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search tutor by name, university, or subject..."
          placeholderTextColor="#999"
        />
      </View>
      <TouchableOpacity style={styles.filterButton}>
        <Feather name="sliders" size={20} color={COLORS.textDark} />
      </TouchableOpacity>
    </View>
  );

  const renderCategories = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.categoriesContainer}
    >
      {CATEGORIES.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.categoryPill, index === 0 && styles.categoryPillActive]}
        >
          <Text style={[styles.categoryText, index === 0 && styles.categoryTextActive]}>
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderFilters = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.filtersContainer}
    >
      <TouchableOpacity style={styles.filterChip}>
        <View style={styles.topRatedContent}>
          <Text style={styles.filterChipTextTop}>Top</Text>
          <View style={styles.topRatedRow}>
            <Feather name="star" size={12} color={COLORS.primary} />
            <Text style={styles.filterChipTextTop}> Rated </Text>
            <Feather name="chevron-down" size={12} color={COLORS.textDark} />
          </View>
          <Text style={styles.filterChipTextBottom}>4.8+</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.filterChipStandard}>
        <Ionicons name="checkmark-circle-outline" size={16} color={COLORS.textBrown} />
        <Text style={styles.filterChipTextStandard}> Verified Only</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.filterChipStandard}>
        <Ionicons name="school-outline" size={16} color={COLORS.textDark} />
        <Text style={styles.filterChipTextStandard}> UoM / UoC</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderTutorCard = ({ item }) => (
    <View style={styles.card}>
      {/* Top Row: Avatar & Details */}
      <View style={styles.cardTopRow}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: item.image }} style={styles.avatar} />
          {item.verified && (
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark" size={10} color={COLORS.white} />
            </View>
          )}
        </View>

        <View style={styles.cardDetails}>
          <View style={styles.badgePriceRow}>
            <View
              style={[
                styles.tutorBadge,
                item.badgeColor && { backgroundColor: item.badgeColor },
              ]}
            >
              <Text
                style={[
                  styles.tutorBadgeText,
                  item.badgeTextColor && { color: item.badgeTextColor },
                ]}
              >
                {item.badge}
              </Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>LKR {item.price}</Text>
              <Text style={styles.perHourText}>per hour</Text>
            </View>
          </View>

          <Text style={styles.tutorName} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.tutorSpecialty} numberOfLines={1}>
            {item.specialty}
          </Text>

          <View style={styles.educationRow}>
            <Ionicons name="school-outline" size={14} color={COLORS.textLight} />
            <Text style={styles.educationText} numberOfLines={1}>
              {item.education}
            </Text>
          </View>
        </View>
      </View>

      {/* Stats Row */}
      <View style={styles.statsBox}>
        <View style={styles.statItem}>
          <Ionicons name="star" size={16} color={COLORS.primary} />
          <Text style={styles.statValue}>{item.rating}</Text>
          <Text style={styles.statLabel}>({item.reviews} reviews)</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <MaterialIcons name="ondemand-video" size={16} color={COLORS.textLight} />
          <Text style={styles.statLabel}>{item.sessions} sessions done</Text>
        </View>
      </View>

      {/* Tags Row */}
      <View style={styles.tagsContainer}>
        {item.tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      {/* Buttons Row */}
      <View style={styles.actionButtonsRow}>
        <TouchableOpacity style={styles.btnSecondary}>
          <Text style={styles.btnSecondaryText}>View Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnPrimary}>
          <Text style={styles.btnPrimaryText}>Book Session</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {renderHeader()}
        {renderSearchBar()}

        <View style={styles.scrollHeader}>
          {renderCategories()}
          {renderFilters()}

          <View style={styles.statusRow}>
            <Text style={styles.statusText}>
              Showing <Text style={styles.statusTextBold}>24</Text> top Sri Lankan educators
            </Text>
            <View style={styles.onlineStatus}>
              <View style={styles.onlineDot} />
              <Text style={styles.onlineText}>14 Online Now</Text>
            </View>
          </View>
        </View>

        <FlatList
          data={TUTORS}
          keyExtractor={(item) => item.id}
          renderItem={renderTutorCard}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push("/")}>
          <Ionicons name="home" size={24} color={COLORS.primary} />
          <Text style={[styles.navText, styles.navTextActive]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="center-focus-weak" size={24} color={COLORS.textLight} />
          <Text style={styles.navText}>Focus</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="calendar-outline" size={24} color={COLORS.textLight} />
          <Text style={styles.navText}>Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="notifications-outline" size={24} color={COLORS.textLight} />
          <Text style={styles.navText}>Alerts</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
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
    backgroundColor: COLORS.white,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textDark,
  },
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: COLORS.white,
    alignItems: "center",
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 44,
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textDark,
  },
  filterButton: {
    width: 44,
    height: 44,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollHeader: {
    backgroundColor: COLORS.white,
    paddingBottom: 10,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 10,
    backgroundColor: COLORS.white,
  },
  categoryPillActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryText: {
    fontSize: 14,
    color: COLORS.textDark,
  },
  categoryTextActive: {
    color: COLORS.white,
    fontWeight: "500",
  },
  filtersContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  filterChip: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  topRatedContent: {
    alignItems: "center",
  },
  topRatedRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterChipTextTop: {
    fontSize: 12,
    color: COLORS.textDark,
  },
  filterChipTextBottom: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.textDark,
  },
  filterChipStandard: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
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
    alignItems: "center",
  },
  statusText: {
    fontSize: 13,
    color: COLORS.textLight,
  },
  statusTextBold: {
    fontWeight: "bold",
    color: COLORS.textDark,
  },
  onlineStatus: {
    flexDirection: "row",
    alignItems: "center",
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
    marginRight: 4,
  },
  onlineText: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: "500",
  },
  listContent: {
    padding: 20,
    paddingTop: 10,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
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
  perHourText: {
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
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },
  tag: {
    backgroundColor: COLORS.tagBg,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    color: COLORS.textDark,
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
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    paddingBottom: Platform.OS === "ios" ? 25 : 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 4,
  },
  navTextActive: {
    color: COLORS.primary,
    fontWeight: "500",
  },
});
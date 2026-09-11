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
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const SUBJECTS = [
  "All Subjects",
  "Combined Mathematics",
  "Pure Mathematics",
  "Applied Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Science",
  "English",
  "Sinhala",
  "Tamil",
  "Information & Communication Technology",
  "Accounting",
  "Business Studies",
  "Economics",
  "History",
  "Geography",
  "Civic Education",
  "General English",
  "Logic & Scientific Method",
];

const DISTRICTS = [
  "All Districts",
  "Colombo",
  "Gampaha",
  "Kalutara",
  "Kandy",
  "Matale",
  "Nuwara Eliya",
  "Galle",
  "Matara",
  "Hambantota",
  "Jaffna",
  "Kilinochchi",
  "Mannar",
  "Vavuniya",
  "Mullaitivu",
  "Batticaloa",
  "Ampara",
  "Trincomalee",
  "Kurunegala",
  "Puttalam",
  "Anuradhapura",
  "Polonnaruwa",
  "Badulla",
  "Monaragala",
  "Ratnapura",
  "Kegalle",
];

const LEVELS = [
  "All Levels",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "O/L",
  "Grade 12",
  "Grade 13",
  "A/L",
];

const PRICE_OPTIONS = [500, 600, 700, 800, 900, 1000];

export default function StudentHomeScreen() {
  const router = useRouter();

  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [selectedDistrict, setSelectedDistrict] = useState("All Districts");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [selectedPrice, setSelectedPrice] = useState(1000);

  const [appliedFilters, setAppliedFilters] = useState({
    subject: "All Subjects",
    district: "All Districts",
    level: "All Levels",
    price: 1000,
  });

  const applyFilters = () => {
    setAppliedFilters({
      subject: selectedSubject,
      district: selectedDistrict,
      level: selectedLevel,
      price: selectedPrice,
    });

    setIsFilterVisible(false);
  };

  const clearFilters = () => {
    setSelectedSubject("All Subjects");
    setSelectedDistrict("All Districts");
    setSelectedLevel("All Levels");
    setSelectedPrice(1000);

    setAppliedFilters({
      subject: "All Subjects",
      district: "All Districts",
      level: "All Levels",
      price: 1000,
    });
  };

  const hasActiveFilters =
    appliedFilters.subject !== "All Subjects" ||
    appliedFilters.district !== "All Districts" ||
    appliedFilters.level !== "All Levels" ||
    appliedFilters.price !== 1000;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF8F5" />

      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.replace("/signup" as any)}
          activeOpacity={0.7}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Feather name="arrow-left" size={22} color="#FF6B35" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Image
              source={require("../../assets/images/studymachan-logo.png")}
              style={styles.logoImage}
              resizeMode="contain"
            />

            <View>
              <Text style={styles.appName}>StudyMachan</Text>
              <Text style={styles.welcomeText}>Welcome, Ravindu 👋</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.avatarButton}
            onPress={() => router.push("/profile" as any)}
            activeOpacity={0.8}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
              }}
              style={styles.avatar}
            />

            <View style={styles.onlineDotContainer}>
              <View style={styles.onlineDot} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Search and filter */}
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Feather name="search" size={18} color="#9CA3AF" />

            <TextInput
              placeholder="Find tutor, subject or topic..."
              placeholderTextColor="#9CA3AF"
              style={styles.searchInput}
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.filterButton,
              hasActiveFilters && styles.filterButtonActive,
            ]}
            activeOpacity={0.8}
            onPress={() => setIsFilterVisible((previous) => !previous)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="options-outline" size={20} color="#FFFFFF" />

            {hasActiveFilters && <View style={styles.filterIndicator} />}
          </TouchableOpacity>
        </View>

        {/* Active filter summary */}
        {hasActiveFilters && (
          <View style={styles.activeFilterSummary}>
            <Text style={styles.activeFilterSummaryText} numberOfLines={2}>
              {appliedFilters.subject} • {appliedFilters.district} •{" "}
              {appliedFilters.level} • Up to LKR {appliedFilters.price}
            </Text>

            <TouchableOpacity
              onPress={clearFilters}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={styles.clearSummaryText}>Clear</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Filter panel */}
        {isFilterVisible && (
          <View style={styles.filterPanel}>
            <View style={styles.filterHeader}>
              <Text style={styles.filterTitle}>Filter Tutors</Text>

              <TouchableOpacity
                onPress={() => setIsFilterVisible(false)}
                style={styles.closeFilterButton}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Feather name="x" size={22} color="#1E1E1E" />
              </TouchableOpacity>
            </View>

            {/* Subject */}
            <Text style={styles.filterSectionTitle}>Subject</Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterOptionsContent}
            >
              {SUBJECTS.map((subject) => {
                const isSelected = selectedSubject === subject;

                return (
                  <TouchableOpacity
                    key={subject}
                    style={[
                      styles.filterChip,
                      isSelected && styles.filterChipSelected,
                    ]}
                    onPress={() => setSelectedSubject(subject)}
                  >
                    <Text
                      style={[
                        styles.filterChipText,
                        isSelected && styles.filterChipTextSelected,
                      ]}
                    >
                      {subject}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Location */}
            <Text style={styles.filterSectionTitle}>Location</Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterOptionsContent}
            >
              {DISTRICTS.map((district) => {
                const isSelected = selectedDistrict === district;

                return (
                  <TouchableOpacity
                    key={district}
                    style={[
                      styles.filterChip,
                      isSelected && styles.filterChipSelected,
                    ]}
                    onPress={() => setSelectedDistrict(district)}
                  >
                    <Text
                      style={[
                        styles.filterChipText,
                        isSelected && styles.filterChipTextSelected,
                      ]}
                    >
                      {district}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Level */}
            <Text style={styles.filterSectionTitle}>Level</Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterOptionsContent}
            >
              {LEVELS.map((level) => {
                const isSelected = selectedLevel === level;

                return (
                  <TouchableOpacity
                    key={level}
                    style={[
                      styles.filterChip,
                      isSelected && styles.filterChipSelected,
                    ]}
                    onPress={() => setSelectedLevel(level)}
                  >
                    <Text
                      style={[
                        styles.filterChipText,
                        isSelected && styles.filterChipTextSelected,
                      ]}
                    >
                      {level}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Price */}
            <View style={styles.priceTitleRow}>
              <Text style={styles.filterSectionTitle}>Maximum Price</Text>
              <Text style={styles.selectedPriceText}>LKR {selectedPrice}</Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.priceScrollContent}
            >
              {PRICE_OPTIONS.map((price) => {
                const isSelected = selectedPrice === price;

                return (
                  <TouchableOpacity
                    key={price}
                    style={[
                      styles.priceOption,
                      isSelected && styles.priceOptionSelected,
                    ]}
                    onPress={() => setSelectedPrice(price)}
                  >
                    <Text
                      style={[
                        styles.priceOptionText,
                        isSelected && styles.priceOptionTextSelected,
                      ]}
                    >
                      LKR {price}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <Text style={styles.priceHelperText}>
              Tutor prices will be shown from LKR 500 up to your selected
              maximum price.
            </Text>

            {/* Filter buttons */}
            <View style={styles.filterActions}>
              <TouchableOpacity
                style={styles.clearButton}
                onPress={clearFilters}
                hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
              >
                <Text style={styles.clearButtonText}>Clear All</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.applyButton}
                onPress={applyFilters}
                hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
              >
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Top Tutors Header */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Top Tutors</Text>

          <TouchableOpacity
            style={styles.seeAllButton}
            onPress={() => router.push("/top-tutors" as any)}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.seeAllText}>View All</Text>
            <Feather name="chevron-right" size={16} color="#FF6B35" />
          </TouchableOpacity>
        </View>

        {/* Top Tutors */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tutorsScroll}
          contentContainerStyle={styles.tutorsContent}
        >
          {/* Tutor 1 */}
          <View style={styles.tutorCard}>
            <View style={styles.tutorImageWrapper}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300",
                }}
                style={styles.tutorImage}
                resizeMode="cover"
              />

              <View style={styles.ratingBadge}>
                <FontAwesome name="star" size={10} color="#FFB800" />
                <Text style={styles.ratingText}>4.9</Text>
              </View>
            </View>

            <Text style={styles.tutorName} numberOfLines={1}>
              Sarah Perera
            </Text>
            <Text style={styles.tutorSubject}>Combined Maths</Text>
            <Text style={styles.tutorSessions}>140+ sessions completed</Text>
            <Text style={styles.tutorLocation}>
              <Ionicons name="location-outline" size={12} color="#9CA3AF" />{" "}
              Colombo
            </Text>

            <View style={styles.tutorFooter}>
              <View>
                <Text style={styles.rateLabel}>RATE</Text>
                <Text style={styles.rateValue}>
                  LKR 800
                  <Text style={styles.rateUnit}>/per session</Text>
                </Text>
              </View>

              <TouchableOpacity style={styles.bookButton} activeOpacity={0.8}>
                <Text style={styles.bookButtonText}>Book</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Tutor 2 */}
          <View style={styles.tutorCard}>
            <View style={styles.tutorImageWrapper}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300",
                }}
                style={styles.tutorImage}
                resizeMode="cover"
              />

              <View style={styles.ratingBadge}>
                <FontAwesome name="star" size={10} color="#FFB800" />
                <Text style={styles.ratingText}>5.0</Text>
              </View>
            </View>

            <Text style={styles.tutorName} numberOfLines={1}>
              Kavinda Perera
            </Text>
            <Text style={styles.tutorSubject}>Physics & Mechanics</Text>
            <Text style={styles.tutorSessions}>88+ sessions completed</Text>
            <Text style={styles.tutorLocation}>
              <Ionicons name="location-outline" size={12} color="#9CA3AF" />{" "}
              Kandy
            </Text>

            <View style={styles.tutorFooter}>
              <View>
                <Text style={styles.rateLabel}>RATE</Text>
                <Text style={styles.rateValue}>
                  LKR 900
                  <Text style={styles.rateUnit}>/per session</Text>
                </Text>
              </View>

              <TouchableOpacity style={styles.bookButton} activeOpacity={0.8}>
                <Text style={styles.bookButtonText}>Book</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Special Revision Offer Banner */}
        <View style={styles.offerBanner}>
          <View style={styles.offerBannerInner}>
            <View style={styles.offerContent}>
              <View style={styles.offerTag}>
                <Text style={styles.offerTagText}>SPECIAL REVISION OFFER</Text>
              </View>

              <Text style={styles.offerTitle}>
                Boost Your A/L Exam Prep with 1-on-1 Mentorship
              </Text>

              <Text style={styles.offerSubtitle}>
                Get 20% off your first 3 sessions with top ranked engineering
                tutors.
              </Text>

              <TouchableOpacity style={styles.claimButton} activeOpacity={0.8}>
                <Text style={styles.claimButtonText}>Claim 20% Off</Text>
                <Feather name="arrow-right" size={14} color="#FF6B35" />
              </TouchableOpacity>
            </View>

            <View style={styles.lightningBadge}>
              <Ionicons name="flash-outline" size={24} color="#FFFFFF" />
            </View>
          </View>
        </View>

        {/* Weekly Study Goal Card */}
        <View style={styles.goalCard}>
          <View style={styles.goalHeader}>
            <View style={styles.goalHeaderLeft}>
              <View style={styles.goalIconBox}>
                <MaterialCommunityIcons
                  name="chart-box-outline"
                  size={20}
                  color="#FF6B35"
                />
              </View>

              <View>
                <Text style={styles.goalTitle}>Weekly Study Goal</Text>
                <Text style={styles.goalSubtitle}>
                  8 of 10 study hours completed
                </Text>
              </View>
            </View>

            <View style={styles.goalPercentBadge}>
              <Text style={styles.goalPercentText}>80%</Text>
            </View>
          </View>

          <View style={styles.progressBarBg}>
            <View style={styles.progressBarFill} />
          </View>

          <View style={styles.progressLabels}>
            <Text style={styles.progressLabelLeft}>0 hrs</Text>
            <Text style={styles.progressLabelRight}>Target: 10 hrs / week</Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statBoxCompleted}>
              <View style={styles.statHeaderRow}>
                <View style={styles.statDotCompleted} />
                <Text style={styles.statLabel}>COMPLETED</Text>
              </View>

              <Text style={styles.statValue}>4 Sessions</Text>
            </View>

            <View style={styles.statBoxUpcoming}>
              <View style={styles.statHeaderRow}>
                <View style={styles.statDotUpcoming} />
                <Text style={styles.statLabel}>UPCOMING</Text>
              </View>

              <Text style={styles.statValue}>2 Sessions</Text>
            </View>
          </View>
        </View>

        {/* Upcoming Class */}
        <View style={styles.classBanner}>
          <View style={styles.classBannerLeft}>
            <View style={styles.todayBadge}>
              <Text style={styles.todayBadgeText}>TODAY</Text>
            </View>

            <View style={styles.classInfo}>
              <Text style={styles.classTitle} numberOfLines={1}>
                Physics: Electromagnetic Induction
              </Text>

              <Text style={styles.classSubtitle} numberOfLines={1}>
                with Kavinda Perera • 05:30 PM
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.joinButton} activeOpacity={0.8}>
            <Text style={styles.joinButtonText}>Join</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          hitSlop={{ top: 8, bottom: 8, left: 10, right: 10 }}
        >
          <Ionicons name="home" size={20} color="#FF6B35" />
          <Text style={styles.navTextActive}>Home</Text>
          <View style={styles.navIndicator} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/stay-focus" as any)}
          hitSlop={{ top: 8, bottom: 8, left: 10, right: 10 }}
        >
          <Feather name="clock" size={20} color="#9CA3AF" />
          <Text style={styles.navTextInactive}>Focus</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/schedule" as any)}
          hitSlop={{ top: 8, bottom: 8, left: 10, right: 10 }}
        >
          <Feather name="calendar" size={20} color="#9CA3AF" />
          <Text style={styles.navTextInactive}>Schedule</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/alerts" as any)}
          hitSlop={{ top: 8, bottom: 8, left: 10, right: 10 }}
        >
          <View style={styles.alertsIconWrapper}>
            <Feather name="bell" size={20} color="#9CA3AF" />
            <View style={styles.alertDot} />
          </View>

          <Text style={styles.navTextInactive}>Alerts</Text>
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
  topBar: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 12,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
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
    paddingBottom: 150,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logoImage: {
    width: 40,
    height: 40,
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
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(229, 231, 235, 0.8)",
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 48,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 12,
    color: "#374151",
  },
  filterButton: {
    width: 52,
    height: 52,
    backgroundColor: "#FF6B35",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  filterButtonActive: {
    backgroundColor: "#D9532B",
  },
  filterIndicator: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
  },
  activeFilterSummary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF7ED",
    borderWidth: 1,
    borderColor: "#FFE0D4",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 9,
    marginBottom: 16,
  },
  activeFilterSummaryText: {
    flex: 1,
    fontSize: 11,
    color: "#9E4529",
    fontWeight: "600",
    marginRight: 8,
  },
  clearSummaryText: {
    fontSize: 11,
    color: "#FF6B35",
    fontWeight: "800",
  },
  filterPanel: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },
  filterHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  closeFilterButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1E1E1E",
  },
  filterSectionTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#1E1E1E",
    marginTop: 16,
    marginBottom: 9,
  },
  filterOptionsContent: {
    paddingRight: 8,
  },
  filterChip: {
    backgroundColor: "#F7F7F7",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 999,
    paddingHorizontal: 13,
    paddingVertical: 9,
    marginRight: 8,
  },
  filterChipSelected: {
    backgroundColor: "#FF6B35",
    borderColor: "#FF6B35",
  },
  filterChipText: {
    fontSize: 12,
    color: "#374151",
    fontWeight: "600",
  },
  filterChipTextSelected: {
    color: "#FFFFFF",
    fontWeight: "800",
  },
  priceTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectedPriceText: {
    fontSize: 13,
    color: "#FF6B35",
    fontWeight: "800",
  },
  priceScrollContent: {
    paddingVertical: 2,
    paddingRight: 8,
  },
  priceOption: {
    minWidth: 78,
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 11,
    marginRight: 8,
  },
  priceOptionSelected: {
    backgroundColor: "#FF6B35",
    borderColor: "#FF6B35",
  },
  priceOptionText: {
    fontSize: 12,
    color: "#374151",
    fontWeight: "700",
  },
  priceOptionTextSelected: {
    color: "#FFFFFF",
  },
  priceHelperText: {
    fontSize: 10,
    color: "#9CA3AF",
    marginTop: 8,
    lineHeight: 15,
  },
  filterActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 18,
  },
  clearButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingVertical: 12,
  },
  clearButtonText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#6B7280",
  },
  applyButton: {
    flex: 1.4,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#FF6B35",
    paddingVertical: 12,
  },
  applyButtonText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1E1E1E",
  },
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  seeAllText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#FF6B35",
  },
  tutorsScroll: {
    marginBottom: 20,
  },
  tutorsContent: {
    flexDirection: "row",
    gap: 12,
  },
  tutorCard: {
    width: 224,
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
  tutorImageWrapper: {
    position: "relative",
    marginBottom: 10,
  },
  tutorImage: {
    width: "100%",
    height: 128,
    borderRadius: 12,
  },
  ratingBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  tutorName: {
    fontSize: 14,
    fontWeight: "800",
    color: "#111827",
  },
  tutorSubject: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FF6B35",
    marginTop: 2,
  },
  tutorSessions: {
    fontSize: 10,
    color: "#9CA3AF",
    marginTop: 2,
  },
  tutorLocation: {
    fontSize: 10,
    color: "#9CA3AF",
    marginTop: 3,
    marginBottom: 12,
  },
  tutorFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  rateLabel: {
    fontSize: 9,
    fontWeight: "800",
    color: "#9CA3AF",
  },
  rateValue: {
    fontSize: 12,
    fontWeight: "900",
    color: "#111827",
  },
  rateUnit: {
    fontSize: 10,
    fontWeight: "500",
    color: "#6B7280",
  },
  bookButton: {
    backgroundColor: "#FF6B35",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  bookButtonText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  offerBanner: {
    backgroundColor: "#FF7A45",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    overflow: "hidden",
  },
  offerBannerInner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  offerContent: {
    flex: 1,
    paddingRight: 12,
  },
  offerTag: {
    backgroundColor: "rgba(255,255,255,0.2)",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 8,
  },
  offerTagText: {
    fontSize: 9,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  offerTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 6,
    lineHeight: 20,
  },
  offerSubtitle: {
    fontSize: 11,
    color: "rgba(255,255,255,0.9)",
    lineHeight: 16,
    marginBottom: 12,
  },
  claimButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    alignSelf: "flex-start",
  },
  claimButtonText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#FF6B35",
  },
  lightningBadge: {
    width: 48,
    height: 48,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  goalCard: {
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
    marginBottom: 20,
  },
  goalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  goalHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  goalIconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#FFF7ED",
    alignItems: "center",
    justifyContent: "center",
  },
  goalTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#111827",
  },
  goalSubtitle: {
    fontSize: 12,
    color: "#6B7280",
  },
  goalPercentBadge: {
    backgroundColor: "#FFF7ED",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#FFEAE0",
  },
  goalPercentText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#FF6B35",
  },
  progressBarBg: {
    width: "100%",
    height: 10,
    backgroundColor: "#F3F4F6",
    borderRadius: 999,
    overflow: "hidden",
    marginBottom: 6,
  },
  progressBarFill: {
    width: "80%",
    height: "100%",
    backgroundColor: "#FF6B35",
  },
  progressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  progressLabelLeft: {
    fontSize: 10,
    color: "#9CA3AF",
  },
  progressLabelRight: {
    fontSize: 10,
    color: "#9CA3AF",
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
  },
  statBoxCompleted: {
    flex: 1,
    backgroundColor: "rgba(16,185,129,0.06)",
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D1FAE5",
  },
  statBoxUpcoming: {
    flex: 1,
    backgroundColor: "rgba(255,107,53,0.06)",
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FFEAE0",
  },
  statHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 2,
  },
  statDotCompleted: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#10B981",
  },
  statDotUpcoming: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF6B35",
  },
  statLabel: {
    fontSize: 9,
    fontWeight: "800",
    color: "#6B7280",
  },
  statValue: {
    fontSize: 12,
    fontWeight: "800",
    color: "#111827",
    marginLeft: 14,
  },
  classBanner: {
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
  classBannerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  todayBadge: {
    backgroundColor: "#FFEAE0",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  todayBadgeText: {
    fontSize: 10,
    fontWeight: "900",
    color: "#FF6B35",
  },
  classInfo: {
    flex: 1,
  },
  classTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: "#111827",
  },
  classSubtitle: {
    fontSize: 11,
    color: "#6B7280",
    marginTop: 2,
  },
  joinButton: {
    backgroundColor: "#FFF7ED",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FFD6CC",
    marginLeft: 8,
  },
  joinButtonText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#FF6B35",
  },
  bottomNav: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingVertical: 12,
    paddingHorizontal: 24,
    paddingBottom: 16,
    minHeight: 72,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 4,
  },
  navItem: {
    minWidth: 60,
    minHeight: 54,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  navTextActive: {
    fontSize: 10,
    fontWeight: "800",
    color: "#FF6B35",
    marginTop: 2,
  },
  navTextInactive: {
    fontSize: 10,
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
  alertsIconWrapper: {
    position: "relative",
  },
  alertDot: {
    position: "absolute",
    top: -2,
    right: -6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF6B35",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
});

import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React, { useState } from "react";
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

export default function StudentHomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Combined Maths", "Physics", "Chemistry"];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF8F5" />

      {/* Main Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Top Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.logoBox}>
              <Text style={styles.logoText}>S</Text>
            </View>
            <View>
              <Text style={styles.appName}>StudyMachan</Text>
              <Text style={styles.welcomeText}>Welcome back, Ravindu 👋</Text>
            </View>
          </View>

          {/* User Profile Avatar with Online Status */}
          <TouchableOpacity style={styles.avatarBox}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
              }}
              style={styles.avatar}
            />
            <View style={styles.onlineDot} />
          </TouchableOpacity>
        </View>

        {/* Search Bar & Filter Button */}
        <View style={styles.searchRow}>
          <View style={styles.searchInputRow}>
            <Feather name="search" size={18} color="#9CA3AF" />
            <TextInput
              placeholder="Find tutor, subject or topic..."
              placeholderTextColor="#9CA3AF"
              style={styles.searchInput}
            />
          </View>

          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options-outline" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Category Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((item) => {
            const isSelected = selectedCategory === item;
            return (
              <TouchableOpacity
                key={item}
                onPress={() => setSelectedCategory(item)}
                style={[
                  styles.categoryPill,
                  {
                    backgroundColor: isSelected ? "#FF6B35" : "#FFFFFF",
                    borderColor: isSelected ? "#FF6B35" : "#E5E7EB",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    { color: isSelected ? "#FFFFFF" : "#374151" },
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Top Tutors Header */}
        <View style={styles.topTutorsHeader}>
          <View style={styles.topTutorsTitleRow}>
            <Text style={styles.sectionTitle}>Top Tutors</Text>
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={styles.seeAllText}>See All</Text>
            <Feather name="chevron-right" size={14} color="#FF6B35" />
          </TouchableOpacity>
        </View>

        {/* Top Tutors Horizontal Carousel */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tutorsScroll}
          contentContainerStyle={styles.tutorsContent}
        >
          {/* Tutor 1 */}
          <View style={styles.tutorCard}>
            <View style={styles.tutorImageBox}>
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
              Dr. Sarah Jenkins
            </Text>
            <Text style={styles.tutorSubject}>Combined Maths</Text>
            <Text style={styles.tutorSessions}>140+ sessions completed</Text>

            <View style={styles.tutorFooter}>
              <View>
                <Text style={styles.rateLabel}>RATE</Text>
                <Text style={styles.rateValue}>
                  LKR 2,500<Text style={styles.rateUnit}>/hr</Text>
                </Text>
              </View>
              <TouchableOpacity style={styles.bookButton}>
                <Text style={styles.bookButtonText}>Book</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Tutor 2 */}
          <View style={styles.tutorCard}>
            <View style={styles.tutorImageBox}>
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

            <View style={styles.tutorFooter}>
              <View>
                <Text style={styles.rateLabel}>RATE</Text>
                <Text style={styles.rateValue}>
                  LKR 2,800<Text style={styles.rateUnit}>/hr</Text>
                </Text>
              </View>
              <TouchableOpacity style={styles.bookButton}>
                <Text style={styles.bookButtonText}>Book</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Special Revision Offer Banner */}
        <View style={styles.offerBanner}>
          <View style={styles.offerContent}>
            <View style={styles.offerBadge}>
              <Text style={styles.offerBadgeText}>SPECIAL REVISION OFFER</Text>
            </View>
            <Text style={styles.offerTitle}>
              Boost Your A/L Exam Prep with 1-on-1 Mentorship
            </Text>
            <Text style={styles.offerSubtitle}>
              Get 20% off your first 3 sessions with top ranked engineering
              tutors.
            </Text>
            <TouchableOpacity style={styles.claimButton}>
              <Text style={styles.claimButtonText}>Claim 20% Off</Text>
              <Feather name="arrow-right" size={14} color="#FF6B35" />
            </TouchableOpacity>
          </View>

          {/* Lightning Icon Badge */}
          <View style={styles.lightningBadge}>
            <Ionicons name="flash-outline" size={24} color="#FFFFFF" />
          </View>
        </View>

        {/* Weekly Study Goal Card */}
        <View style={styles.goalCard}>
          <View style={styles.goalHeader}>
            <View style={styles.goalTitleRow}>
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
            <View style={styles.goalPercentBox}>
              <Text style={styles.goalPercent}>80%</Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressBg}>
            <View style={styles.progressFill} />
          </View>

          <View style={styles.progressLabels}>
            <Text style={styles.progressLabelLeft}>0 hrs</Text>
            <Text style={styles.progressLabelRight}>Target: 10 hrs / week</Text>
          </View>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statBoxCompleted}>
              <View style={styles.statDotRow}>
                <View style={styles.statDotCompleted} />
                <Text style={styles.statLabel}>COMPLETED</Text>
              </View>
              <Text style={styles.statValue}>4 Sessions</Text>
            </View>

            <View style={styles.statBoxUpcoming}>
              <View style={styles.statDotRow}>
                <View style={styles.statDotUpcoming} />
                <Text style={styles.statLabel}>UPCOMING</Text>
              </View>
              <Text style={styles.statValue}>2 Sessions</Text>
            </View>
          </View>
        </View>

        {/* Today's Upcoming Class Banner */}
        <View style={styles.upcomingClassCard}>
          <View style={styles.upcomingLeft}>
            <View style={styles.todayBadge}>
              <Text style={styles.todayText}>TODAY</Text>
            </View>
            <View style={styles.upcomingInfo}>
              <Text style={styles.upcomingTitle} numberOfLines={1}>
                Physics: Electromagnetic Induction
              </Text>
              <Text style={styles.upcomingSubtitle} numberOfLines={1}>
                with Kavinda Perera • 05:30 PM
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.joinButton}>
            <Text style={styles.joinButtonText}>Join</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.bottomNavItem}>
          <Ionicons name="home" size={20} color="#FF6B35" />
          <Text style={styles.bottomNavTextActive}>Home</Text>
          <View style={styles.bottomNavDot} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomNavItem}>
          <Feather name="clock" size={20} color="#9CA3AF" />
          <Text style={styles.bottomNavText}>Focus</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomNavItem}>
          <Feather name="calendar" size={20} color="#9CA3AF" />
          <Text style={styles.bottomNavText}>Schedule</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomNavItem}>
          <Feather name="bell" size={20} color="#9CA3AF" />
          <View style={styles.alertDot} />
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
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 90,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logoBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#FFE5D6",
    borderWidth: 1,
    borderColor: "#FFD1C2",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FF6B35",
  },
  appName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E1E1E",
  },
  welcomeText: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },
  avatarBox: {
    position: "relative",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FFD1C2",
  },
  onlineDot: {
    position: "absolute",
    bottom: 0,
    right: 0,
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
    marginBottom: 16,
  },
  searchInputRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 48,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 12,
    color: "#1F2937",
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: "#FF6B35",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  categoriesScroll: {
    marginBottom: 20,
  },
  categoriesContent: {
    gap: 8,
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "700",
  },
  topTutorsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  topTutorsTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E1E1E",
  },
  verifiedBadge: {
    backgroundColor: "#FFF1E6",
    borderWidth: 1,
    borderColor: "#FFD1C2",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  verifiedText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#FF6B35",
  },
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  seeAllText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FF6B35",
  },
  tutorsScroll: {
    marginBottom: 20,
  },
  tutorsContent: {
    gap: 12,
  },
  tutorCard: {
    width: 224,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  tutorImageBox: {
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
    fontWeight: "700",
    color: "#FFFFFF",
  },
  tutorName: {
    fontSize: 14,
    fontWeight: "700",
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
    fontWeight: "700",
    color: "#9CA3AF",
    textTransform: "uppercase",
  },
  rateValue: {
    fontSize: 12,
    fontWeight: "800",
    color: "#111827",
  },
  rateUnit: {
    fontSize: 10,
    fontWeight: "400",
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
    fontWeight: "700",
    color: "#FFFFFF",
  },
  offerBanner: {
    backgroundColor: "#FF7A45",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    position: "relative",
    overflow: "hidden",
  },
  offerContent: {
    flex: 1,
    paddingRight: 12,
  },
  offerBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 8,
  },
  offerBadgeText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#FFFFFF",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  offerTitle: {
    fontSize: 16,
    fontWeight: "700",
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
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  claimButtonText: {
    fontSize: 12,
    fontWeight: "700",
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
    marginBottom: 20,
  },
  goalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  goalTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  goalIconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#FFF1E6",
    alignItems: "center",
    justifyContent: "center",
  },
  goalTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },
  goalSubtitle: {
    fontSize: 12,
    color: "#6B7280",
  },
  goalPercentBox: {
    backgroundColor: "#FFF1E6",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FFE5D6",
  },
  goalPercent: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FF6B35",
  },
  progressBg: {
    width: "100%",
    height: 10,
    backgroundColor: "#E5E7EB",
    borderRadius: 999,
    overflow: "hidden",
    marginBottom: 6,
  },
  progressFill: {
    width: "80%",
    height: "100%",
    backgroundColor: "#FF6B35",
    borderRadius: 999,
  },
  progressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    backgroundColor: "#ECFDF5",
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D1FAE5",
  },
  statBoxUpcoming: {
    flex: 1,
    backgroundColor: "#FFF7ED",
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FFE5D6",
  },
  statDotRow: {
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
    fontWeight: "700",
    color: "#6B7280",
    textTransform: "uppercase",
  },
  statValue: {
    fontSize: 12,
    fontWeight: "700",
    color: "#111827",
    marginLeft: 14,
  },
  upcomingClassCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  upcomingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  todayBadge: {
    backgroundColor: "#FFE5D6",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  todayText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#FF6B35",
    textTransform: "uppercase",
  },
  upcomingInfo: {
    flex: 1,
  },
  upcomingTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#111827",
  },
  upcomingSubtitle: {
    fontSize: 11,
    color: "#6B7280",
    marginTop: 2,
  },
  joinButton: {
    backgroundColor: "#FFF1E6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FFD1C2",
    marginLeft: 8,
  },
  joinButtonText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FF6B35",
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
  bottomNavText: {
    fontSize: 10,
    color: "#9CA3AF",
    fontWeight: "500",
    marginTop: 2,
  },
  bottomNavTextActive: {
    fontSize: 10,
    color: "#FF6B35",
    fontWeight: "700",
    marginTop: 2,
  },
  bottomNavDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#FF6B35",
    marginTop: 2,
  },
  alertDot: {
    position: "absolute",
    top: 0,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF6B35",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
});

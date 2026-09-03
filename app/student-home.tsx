import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  ImageBackground,
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
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFBF8" />

      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Feather name="menu" size={22} color="#B45325" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>StudyMachan</Text>

        <TouchableOpacity>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
            }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search Row */}
        <View style={styles.searchRow}>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options-outline" size={22} color="#B45325" />
          </TouchableOpacity>

          <View style={styles.searchInputRow}>
            <Feather name="search" size={18} color="#9CA3AF" />
            <TextInput
              placeholder="Find a tutor or subject..."
              placeholderTextColor="#9CA3AF"
              style={styles.searchInput}
            />
          </View>
        </View>

        {/* Top Tutors Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Tutors</Text>

          <View style={styles.tutorsRow}>
            {/* Tutor 1 */}
            <TouchableOpacity style={styles.tutorCard}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120",
                }}
                style={styles.tutorImage}
              />
              <Text style={styles.tutorName}>Sarah L.</Text>
              <Text style={styles.tutorSubject}>Mathematics</Text>
            </TouchableOpacity>

            {/* Tutor 2 */}
            <TouchableOpacity style={styles.tutorCard}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120",
                }}
                style={styles.tutorImage}
              />
              <Text style={styles.tutorName}>David K.</Text>
              <Text style={styles.tutorSubject}>Physics</Text>
            </TouchableOpacity>

            {/* Tutor 3 */}
            <TouchableOpacity style={styles.tutorCard}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1580894732413-847feb27eb6f?w=120",
                }}
                style={styles.tutorImage}
              />
              <Text style={styles.tutorName}>Dr. Emily</Text>
              <Text style={styles.tutorSubject}>Chemistry</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Promo Banner Card */}
        <View style={styles.promoCard}>
          <ImageBackground
            source={{
              uri: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600",
            }}
            style={styles.promoImage}
            resizeMode="cover"
          >
            <View style={styles.promoOverlay}>
              <View style={styles.promoTextRow}>
                <Text style={styles.promoTitle}>Boost Your Grades!</Text>
                <MaterialCommunityIcons
                  name="target"
                  size={20}
                  color="#0088FF"
                />
              </View>

              <Text style={styles.promoSubtitle}>
                Join our weekend crash courses.
              </Text>

              <TouchableOpacity style={styles.promoButton}>
                <Text style={styles.promoButtonText}>Explore Now</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

        {/* Weekly Goal Card */}
        <View style={styles.goalCard}>
          <View style={styles.goalHeader}>
            <Text style={styles.goalTitle}>Weekly Goal</Text>
            <Text style={styles.goalPercent}>65%</Text>
          </View>

          <Text style={styles.goalSubtitle}>
            You've completed 13 of 20 study hours.
          </Text>

          <View style={styles.progressBg}>
            <View style={styles.progressFill} />
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
          <Feather name="clock" size={20} color="#8E8E93" />
          <Text style={styles.bottomNavText}>Focus</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomNavItem}>
          <Feather name="calendar" size={20} color="#8E8E93" />
          <Text style={styles.bottomNavText}>Schedule</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomNavItem}>
          <Feather name="bell" size={20} color="#8E8E93" />
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
    backgroundColor: "#FFFBF8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.04)",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#B45325",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FFD7C2",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 100,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 24,
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: "#FCEFE7",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  searchInputRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 999,
    paddingHorizontal: 16,
    height: 48,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: "#1F2937",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2A2A2A",
    marginBottom: 12,
  },
  tutorsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  tutorCard: {
    flex: 1,
    backgroundColor: "#FAF0E6",
    borderRadius: 16,
    padding: 12,
    alignItems: "center",
  },
  tutorImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 10,
  },
  tutorName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#222222",
    textAlign: "center",
  },
  tutorSubject: {
    fontSize: 11,
    fontWeight: "600",
    color: "#B45325",
    textAlign: "center",
    marginTop: 2,
  },
  promoCard: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 24,
  },
  promoImage: {
    width: "100%",
    height: 176,
    justifyContent: "center",
  },
  promoOverlay: {
    padding: 16,
    width: "60%",
  },
  promoTextRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  promoTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#B45325",
  },
  promoSubtitle: {
    fontSize: 12,
    color: "#374151",
    fontWeight: "600",
    marginBottom: 12,
    lineHeight: 16,
  },
  promoButton: {
    backgroundColor: "#FF7A45",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  promoButtonText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  goalCard: {
    backgroundColor: "#FAF0E6",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#F3E1D8",
  },
  goalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222222",
  },
  goalPercent: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FF7A45",
  },
  goalSubtitle: {
    fontSize: 12,
    color: "#4B5563",
    marginBottom: 12,
  },
  progressBg: {
    width: "100%",
    height: 10,
    backgroundColor: "#EBD8CB",
    borderRadius: 999,
    overflow: "hidden",
  },
  progressFill: {
    width: "65%",
    height: "100%",
    backgroundColor: "#FF7A45",
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFBF8",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingVertical: 12,
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
  alertDot: {
    position: "absolute",
    top: 0,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF7A45",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
});

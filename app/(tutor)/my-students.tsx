import {
    Feather,
    Ionicons,
    MaterialCommunityIcons
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
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

export default function MyStudentsScreen() {
  const router = useRouter();

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

        <Text style={styles.headerTitle}>My Students</Text>

        <View style={styles.headerIcon} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Feather
            name="search"
            size={20}
            color="#888"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by student"
            placeholderTextColor="#888"
          />
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          {/* Stat 1 */}
          <View style={styles.statCard}>
            <Feather
              name="users"
              size={18}
              color="#C84C1C"
              style={styles.statIcon}
            />
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>Active Students</Text>
            <Text style={styles.statSubTextRed}>18 Reg • 6 Doubt</Text>
          </View>

          {/* Stat 2 */}
          <View style={styles.statCard}>
            <MaterialCommunityIcons
              name="timer-sand"
              size={20}
              color="#C84C1C"
              style={styles.statIcon}
            />
            <Text style={styles.statValue}>142h</Text>
            <Text style={styles.statLabel}>Total Taught</Text>
            <Text style={styles.statSubTextGrey}>+14h this week</Text>
          </View>

          {/* Stat 3 */}
          <View style={styles.statCard}>
            <MaterialCommunityIcons
              name="bullseye-arrow"
              size={20}
              color="#C84C1C"
              style={styles.statIcon}
            />
            <Text style={styles.statValue}>78%</Text>
            <Text style={styles.statLabel}>Avg Mastery</Text>
            <Text style={styles.statSubTextOrange}>Syllabus pacing</Text>
          </View>
        </View>

        {/* Filters Row */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersScroll}
          contentContainerStyle={styles.filtersContainer}
        >
          <TouchableOpacity
            style={[styles.filterPill, styles.filterPillActive]}
          >
            <Text style={styles.filterPillTextActive}>All</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterPill}>
            <Text style={styles.filterPillText}>2026 A/L</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterPill}>
            <Text style={styles.filterPillText}>2027 A/L</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* --- STUDENT CARDS --- */}

        {/* Student 1: Sanduni */}
        <View style={styles.studentCard}>
          <View style={styles.studentHeader}>
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=43" }}
              style={styles.avatar}
            />
            <View style={styles.studentInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.studentName}>Sanduni Senaratne</Text>
              </View>
              <Text style={styles.studentTopic} numberOfLines={2}>
                Organic Reaction Mechanisms & Synthetic Pathways
              </Text>
            </View>
          </View>

          <View style={styles.progressHeader}>
            <Text style={styles.sessionsText}>14 Sessions Completed</Text>
            <Text style={styles.progressPercentText}>82% Syllabus</Text>
          </View>

          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: "82%" }]} />
          </View>

          <View style={styles.infoBox}>
            <View style={styles.infoRow}>
              <MaterialCommunityIcons
                name="history"
                size={14}
                color="#666"
                style={{ marginTop: 2 }}
              />
              <Text style={styles.infoTextGrey}>
                <Text style={styles.infoTextBold}>Last:</Text> Yesterday •
                Electrophilic Addition to Alkenes
              </Text>
            </View>

            <View
              style={[styles.infoRow, { marginTop: 6 }]}
            >
              <MaterialCommunityIcons
                name="calendar-sync"
                size={14}
                color="#C84C1C"
                style={{ marginTop: 2 }}
              />
              <Text style={styles.infoTextOrange}>
                <Text style={styles.infoTextBoldOrange}>Next:</Text> Tomorrow,
                04:30 PM (1-on-1)
              </Text>
            </View>
          </View>

          <View style={styles.cardActions}>
            <TouchableOpacity style={styles.btnPrimary}>
              <Feather name="message-square" size={14} color="#FFF" />
              <Text style={styles.btnPrimaryText}>Message</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnSecondary}>
              <MaterialCommunityIcons
                name="file-document-outline"
                size={16}
                color="#333"
              />
              <Text style={styles.btnSecondaryText}>View Log</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnIconOnly}>
              <Feather name="calendar" size={16} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Student 2: Alex Rivers */}
        <View style={styles.studentCard}>
          <View style={styles.studentHeader}>
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=11" }}
              style={styles.avatar}
            />
            <View style={styles.studentInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.studentName}>Alex Rivers</Text>
                <View style={styles.tagGrey}>
                  <Text style={styles.tagGreyText}>
                    2025 A/L • Target: A
                  </Text>
                </View>
              </View>
              <Text style={styles.studentTopic} numberOfLines={2}>
                Physical Chemistry • Thermodynamics & Kinetics
              </Text>
            </View>
          </View>

          <View style={styles.progressHeader}>
            <Text style={styles.sessionsText}>10 Sessions Completed</Text>
            <Text style={styles.progressPercentText}>74% Syllabus</Text>
          </View>

          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: "74%" }]} />
          </View>

          <View style={styles.infoBox}>
            <View style={styles.infoRow}>
              <MaterialCommunityIcons
                name="history"
                size={14}
                color="#666"
                style={{ marginTop: 2 }}
              />
              <Text style={styles.infoTextGrey} numberOfLines={1}>
                <Text style={styles.infoTextBold}>Last:</Text> 3 days ago •
                Hess's Law & Born-Haber Cycl
              </Text>
            </View>

            <View
              style={[styles.infoRow, { marginTop: 6 }]}
            >
              <Feather
                name="users"
                size={14}
                color="#C84C1C"
                style={{ marginTop: 2 }}
              />
              <Text style={styles.infoTextOrange}>
                <Text style={styles.infoTextBoldOrange}>Next:</Text> Friday,
                06:00 PM (Group Revision)
              </Text>
            </View>
          </View>

          <View style={styles.cardActions}>
            <TouchableOpacity style={styles.btnPrimary}>
              <Feather name="message-square" size={14} color="#FFF" />
              <Text style={styles.btnPrimaryText}>Message</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnSecondary}>
              <MaterialCommunityIcons
                name="file-document-outline"
                size={16}
                color="#333"
              />
              <Text style={styles.btnSecondaryText}>View Log</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnIconOnly}>
              <Feather name="calendar" size={16} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Student 3: Dilshan Pathirana */}
        <View style={styles.studentCard}>
          <View style={styles.studentHeader}>
            <Image
  source={{
    uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
  }}
  style={styles.avatar}
/>
            <View style={styles.studentInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.studentName}>Dilshan Pathirana</Text>
              </View>
              <Text style={styles.studentTopic}>
                General Chemistry & Chemical Bonding
              </Text>
            </View>
          </View>

          <View style={styles.progressHeader}>
            <Text style={styles.sessionsText}>8 Sessions Completed</Text>
            <Text style={styles.progressPercentText}>65% Syllabus</Text>
          </View>

          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: "65%" }]} />
          </View>

          <View style={styles.infoBox}>
            <View style={styles.infoRow}>
              <MaterialCommunityIcons
                name="history"
                size={14}
                color="#666"
                style={{ marginTop: 2 }}
              />
              <Text style={styles.infoTextGrey}>
                <Text style={styles.infoTextBold}>Last:</Text> Oct 20 • VSEPR &
                Hybridization
              </Text>
            </View>

            <View style={styles.innerAlertBox}>
              <MaterialCommunityIcons
                name="alert-box-outline"
                size={16}
                color="#C84C1C"
              />
              <Text style={styles.innerAlertText}>
                Upcoming Paper II Mock Drill Assigned
              </Text>
            </View>
          </View>

          <View style={styles.cardActions}>
            <TouchableOpacity style={styles.btnPrimary}>
              <Feather name="message-square" size={14} color="#FFF" />
              <Text style={styles.btnPrimaryText}>Message</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnSecondary}>
              <MaterialCommunityIcons
                name="file-document-outline"
                size={16}
                color="#333"
              />
              <Text style={styles.btnSecondaryText}>View Log</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Student 4: Amaya Perera */}
        <View style={styles.studentCard}>
          <View style={styles.studentHeader}>
           <Image
  source={{
    uri: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100",
  }}
  style={styles.avatar}
/>
            <View style={styles.studentInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.studentName}>Amaya Perera</Text>
                <View style={styles.tagGrey}>
                  <Text style={styles.tagGreyText}>
                    2026 A/L • Active Mentee
                  </Text>
                </View>
              </View>
              <Text style={styles.studentTopic} numberOfLines={2}>
                Inorganic Chemistry • s-Block & Periodic Trends
              </Text>
            </View>
          </View>

          <View style={styles.progressHeader}>
            <Text style={styles.sessionsText}>12 Sessions Completed</Text>
            <Text style={styles.progressPercentText}>90% Syllabus</Text>
          </View>

          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: "90%" }]} />
          </View>

          <View style={styles.infoBox}>
            <View style={styles.infoRow}>
              <Feather
                name="calendar"
                size={14}
                color="#C84C1C"
                style={{ marginTop: 2 }}
              />
              <Text style={styles.infoTextOrange}>
                <Text style={styles.infoTextBoldOrange}>Next Scheduled:</Text>{" "}
                Saturday, 10:00 AM (1-on-1)
              </Text>
            </View>
          </View>

          <View style={styles.cardActions}>
            <TouchableOpacity style={styles.btnPrimary}>
              <Feather name="message-square" size={14} color="#FFF" />
              <Text style={styles.btnPrimaryText}>Message</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnSecondary}>
              <MaterialCommunityIcons
                name="file-document-outline"
                size={16}
                color="#333"
              />
              <Text style={styles.btnSecondaryText}>View Log</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Student 5: Kasun Rajapaksha */}
        <View style={styles.studentCard}>
          <View style={styles.studentHeader}>
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=60" }}
              style={styles.avatar}
            />
            <View style={styles.studentInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.studentName}>Kasun Rajapaksha</Text>
                <View style={styles.tagRed}>
                  <Ionicons
                    name="warning-outline"
                    size={12}
                    color="#DC2626"
                    style={{ marginRight: 4 }}
                  />
                  <Text style={styles.tagRedText}>Attention Needed</Text>
                </View>
              </View>
              <Text style={styles.studentTopic} numberOfLines={2}>
                d-Block Elements & Complex Ion Equilibria
              </Text>
            </View>
          </View>

          <View style={styles.progressHeader}>
            <Text style={styles.sessionsText}>6 Sessions Completed</Text>
            <Text
              style={[
                styles.progressPercentText,
                { color: "#C84C1C" },
              ]}
            >
              48% Syllabus
            </Text>
          </View>

          <View style={styles.progressBarBg}>
            <View
              style={[
                styles.progressBarFill,
                { width: "48%", backgroundColor: "#FF7A45" },
              ]}
            />
          </View>

          <View style={styles.alertBoxWarning}>
            <Ionicons
              name="information-circle-outline"
              size={16}
              color="#C84C1C"
              style={{ marginTop: 2 }}
            />
            <Text style={styles.alertBoxWarningText}>
              Struggling with Transition Metal Color Mnemonics & Coordination
              Numbers
            </Text>
          </View>

          <View style={styles.cardActions}>
            <TouchableOpacity style={styles.btnPrimary}>
              <Feather name="message-square" size={14} color="#FFF" />
              <Text style={styles.btnPrimaryText}>Message</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnSecondaryOrange}>
              <Ionicons
                name="flash-outline"
                size={14}
                color="#1A1A1A"
              />
              <Text style={styles.btnSecondaryOrangeText}>
                Assign Activity
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnIconOnly}>
              <MaterialCommunityIcons
                name="file-document-outline"
                size={18}
                color="#333"
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    paddingBottom: 40,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#EFEFEF",
  },
  statIcon: {
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1A1A1A",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: "#666",
    fontWeight: "500",
    marginBottom: 6,
  },
  statSubTextRed: {
    fontSize: 10,
    color: "#C84C1C",
    fontWeight: "600",
  },
  statSubTextGrey: {
    fontSize: 10,
    color: "#888",
    fontWeight: "500",
  },
  statSubTextOrange: {
    fontSize: 10,
    color: "#FF7A45",
    fontWeight: "600",
  },
  filtersScroll: {
    marginBottom: 20,
  },
  filtersContainer: {
    paddingVertical: 2,
  },
  filterPill: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    marginRight: 8,
    height: 36,
    justifyContent: "center",
  },
  filterPillActive: {
    backgroundColor: "#FF7A45",
    borderColor: "#FF7A45",
  },
  filterPillText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
  },
  filterPillTextActive: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  studentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#EFEFEF",
    marginBottom: 16,
  },
  studentHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
    backgroundColor: "#F0F0F0",
  },
  studentInfo: {
    flex: 1,
    justifyContent: "center",
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 4,
  },
  studentName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1A1A",
    marginRight: 8,
  },
  tagGrey: {
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginTop: 2,
  },
  tagGreyText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#555",
  },
  tagRed: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEE2E2",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginTop: 2,
  },
  tagRedText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#DC2626",
  },
  studentTopic: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  sessionsText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  progressPercentText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#C84C1C",
  },
  progressBarBg: {
    height: 6,
    backgroundColor: "#F0F0F0",
    borderRadius: 3,
    marginBottom: 16,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#FF7A45",
    borderRadius: 3,
  },
  infoBox: {
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  infoTextGrey: {
    fontSize: 12,
    color: "#555",
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },
  infoTextBold: {
    fontWeight: "600",
    color: "#444",
  },
  infoTextOrange: {
    fontSize: 12,
    color: "#A34A28",
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },
  infoTextBoldOrange: {
    fontWeight: "700",
  },
  innerAlertBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF5F2",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 6,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#FDE8E0",
  },
  innerAlertText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#A34A28",
    marginLeft: 8,
  },
  alertBoxWarning: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFF5F2",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#FDE8E0",
  },
  alertBoxWarningText: {
    flex: 1,
    fontSize: 12,
    fontWeight: "600",
    color: "#A34A28",
    marginLeft: 8,
    lineHeight: 18,
  },
  cardActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btnPrimary: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF7A45",
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  btnPrimaryText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 6,
  },
  btnSecondary: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  btnSecondaryText: {
    color: "#333",
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 6,
  },
  btnSecondaryOrange: {
    flex: 1.2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FDE8E0",
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  btnSecondaryOrangeText: {
    color: "#1A1A1A",
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 6,
  },
  btnIconOnly: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
  },
});
import { Feather, FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
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

// --- TYPES ---
type FrequentMachan = {
  id: string;
  name: string;
  status: string;
  statusDot: string;
  actionText: string;
  actionStyle: "primary" | "disabled";
  image: string;
};

type Friend = {
  id: string;
  name: string;
  subtitleType: "icon-text" | "tag";
  subtitleIcon?: string;
  subtitleText: string;
  subtitleIconColor?: string;
  statusDot: string;
  isAdded: boolean;
  image: string;
};

// --- DUMMY DATA ---
const FREQUENT_MACHANS: FrequentMachan[] = [
  {
    id: "1",
    name: "Amaya P.",
    status: "Maths • Online",
    statusDot: "#00C853", // Green
    actionText: "+ Invite",
    actionStyle: "primary",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "2",
    name: "Nuwan D.",
    status: "In Room #82",
    statusDot: "#F5A623", // Orange/Yellow
    actionText: "Busy",
    actionStyle: "disabled",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "3",
    name: "Tharushi K.",
    status: "Active 2h ago",
    statusDot: "#BDBDBD", // Grey
    actionText: "+ Invite",
    actionStyle: "primary",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const ALL_FRIENDS: Friend[] = [
  {
    id: "1",
    name: "Kavindu Mendis",
    subtitleType: "icon-text",
    subtitleIcon: "time-outline",
    subtitleText: "42 hrs studied toge",
    statusDot: "#00C853",
    isAdded: false,
    image: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    id: "2",
    name: "Dinithi Jayawarder",
    subtitleType: "tag",
    subtitleText: "Physics Unit 04",
    statusDot: "#00C853",
    isAdded: true,
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: "3",
    name: "Charitha Bandara",
    subtitleType: "icon-text",
    subtitleIcon: "flame-outline",
    subtitleIconColor: "#D32F2F",
    subtitleText: "7-day streak",
    statusDot: "#90CAF9", // Light blue/offline
    isAdded: false,
    image: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    id: "4",
    name: "Oshadi Gunasekara",
    subtitleType: "tag",
    subtitleText: "Applied Maths",
    statusDot: "#00C853",
    isAdded: false,
    image: "https://randomuser.me/api/portraits/men/85.jpg",
  },
  {
    id: "5",
    name: "Malith Rathnayake",
    subtitleType: "icon-text",
    subtitleIcon: "people-outline",
    subtitleIconColor: "#D32F2F",
    subtitleText: "Moratuwa Prep Circle",
    statusDot: "#00C853",
    isAdded: true,
    image: "https://randomuser.me/api/portraits/men/44.jpg",
  },
];

const COLORS = {
  primary: "#FF7145", // Brand Orange
  background: "#F9F9F9",
  white: "#FFFFFF",
  textDark: "#1A1A1A",
  textLight: "#7A7A7A",
  textBrown: "#5C4033",
  border: "#EEEEEE",
  beige: "#F4EFE6", // Passcode bg
  btnBeige: "#E8E1D5", // Invite button bg
  btnDisabled: "#EEEEEE",
  tagBg: "#EAE1D5",
};

export default function ConnectFriendsScreen() {
  const router = useRouter();

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()}>
        <Feather name="arrow-left" size={24} color={COLORS.textDark} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Add Study Friends</Text>
      <TouchableOpacity>
        <FontAwesome5 name="studiovinari" size={24} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );

  const renderSessionCard = () => (
    <View style={styles.sessionCard}>
      <Text style={styles.hashtag}>#AL-MATHS-88</Text>
      <Text style={styles.sessionTitle}>2025 A/L Combined Maths & Physics Sprint</Text>
      <Text style={styles.sessionInterval}>Focus Interval: 50m work • 10m tea break</Text>

      <View style={styles.sessionButtonsRow}>
        <TouchableOpacity style={styles.copyLinkBtn}>
          <Feather name="link" size={16} color={COLORS.textDark} style={styles.btnIcon} />
          <Text style={styles.copyLinkText}>Copy Link</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.whatsappBtn}>
          <Feather name="send" size={16} color={COLORS.white} style={styles.btnIcon} />
          <Text style={styles.whatsappText}>WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPasscodeCard = () => (
    <View style={styles.passcodeCard}>
      <View style={styles.passcodeLeft}>
        <MaterialCommunityIcons name="view-grid-outline" size={32} color={COLORS.textDark} />
        <View style={styles.passcodeTextWrapper}>
          <Text style={styles.passcodeLabel}>Instant Passcode</Text>
          <Text style={styles.passcodeValue}>882 - 901</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.passcodeCopyBtn}>
        <Feather name="copy" size={14} color={COLORS.textBrown} style={styles.btnIconSmall} />
        <Text style={styles.passcodeCopyText}>Copy</Text>
      </TouchableOpacity>
    </View>
  );

  const renderFrequentMachans = () => (
    <View style={styles.frequentSection}>
      <View style={styles.sectionTitleRow}>
        <Ionicons name="flash" size={18} color="#C63A1D" />
        <Text style={styles.sectionTitle}>Frequent Machans</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.frequentScroll}
      >
        {FREQUENT_MACHANS.map((friend) => (
          <View key={friend.id} style={styles.frequentCard}>
            <View style={styles.avatarWrapper}>
              <Image source={{ uri: friend.image }} style={styles.frequentAvatar} />
              <View style={[styles.statusDot, { backgroundColor: friend.statusDot }]} />
            </View>
            <Text style={styles.frequentName} numberOfLines={1}>
              {friend.name}
            </Text>
            <Text style={styles.frequentStatus} numberOfLines={1}>
              {friend.status}
            </Text>

            <TouchableOpacity
              style={[
                styles.inviteBtn,
                friend.actionStyle === "disabled"
                  ? styles.inviteBtnDisabled
                  : styles.inviteBtnPrimary,
              ]}
            >
              <Text
                style={[
                  styles.inviteBtnText,
                  friend.actionStyle === "disabled"
                    ? styles.inviteBtnTextDisabled
                    : styles.inviteBtnTextPrimary,
                ]}
              >
                {friend.actionText}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  const renderFilters = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.filtersContainer}
      contentContainerStyle={styles.filtersContent}
    >
      <TouchableOpacity style={[styles.filterChip, styles.filterChipActive]}>
        <Text style={styles.filterChipTextActive}>All Friends (28)</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.filterChip}>
        <Text style={styles.filterChipText}>A/L Maths Batch</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.filterChip}>
        <Text style={styles.filterChipText}>Moratuwa Prep</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderListHeader = () => (
    <View style={styles.listHeaderContainer}>
      {renderHeader()}
      <View style={styles.contentPadding}>
        {renderSessionCard()}
        {renderPasscodeCard()}

        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color={COLORS.textLight} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search friends by name or student ID..."
            placeholderTextColor="#999"
          />
        </View>
      </View>

      {renderFrequentMachans()}
      {renderFilters()}
    </View>
  );

  const renderFriendItem = ({ item }: { item: Friend }) => (
    <View style={styles.friendRow}>
      <View style={styles.friendInfoLeft}>
        <View style={styles.avatarWrapperSmall}>
          <Image source={{ uri: item.image }} style={styles.friendAvatar} />
          <View style={[styles.statusDotSmall, { backgroundColor: item.statusDot }]} />
        </View>

        <View style={styles.friendDetails}>
          <Text style={styles.friendName}>{item.name}</Text>

          {item.subtitleType === "icon-text" ? (
            <View style={styles.subtitleRow}>
              <Ionicons
                name={item.subtitleIcon as any}
                size={12}
                color={item.subtitleIconColor || COLORS.textLight}
              />
              <Text style={styles.subtitleText}>{item.subtitleText}</Text>
            </View>
          ) : (
            <View style={styles.tagBadge}>
              <Text style={styles.tagBadgeText}>{item.subtitleText}</Text>
            </View>
          )}
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.actionBtn,
          item.isAdded ? styles.actionBtnAdded : styles.actionBtnAdd,
        ]}
      >
        {item.isAdded && (
          <Feather name="check" size={14} color={COLORS.textBrown} style={{ marginRight: 4 }} />
        )}
        <Text
          style={
            item.isAdded ? styles.actionBtnTextAdded : styles.actionBtnTextAdd
          }
        >
          {item.isAdded ? "Invited" : "+ Add"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={ALL_FRIENDS}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderListHeader}
        renderItem={renderFriendItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  listContent: {
    paddingBottom: 30,
  },
  listHeaderContainer: {
    backgroundColor: COLORS.background,
  },
  contentPadding: {
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textDark,
  },
  sessionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  hashtag: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: "600",
    marginBottom: 6,
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.textDark,
    lineHeight: 22,
    marginBottom: 6,
  },
  sessionInterval: {
    fontSize: 13,
    color: COLORS.textLight,
    marginBottom: 16,
  },
  sessionButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  copyLinkBtn: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#EEEEEE",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  copyLinkText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textDark,
  },
  whatsappBtn: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  whatsappText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.white,
  },
  btnIcon: {
    marginRight: 8,
  },
  passcodeCard: {
    backgroundColor: COLORS.beige,
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  passcodeLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  passcodeTextWrapper: {
    marginLeft: 12,
  },
  passcodeLabel: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 2,
  },
  passcodeValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.textDark,
    letterSpacing: 1,
  },
  passcodeCopyBtn: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D8CBB6",
  },
  btnIconSmall: {
    marginRight: 6,
  },
  passcodeCopyText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textBrown,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textDark,
  },
  frequentSection: {
    marginBottom: 20,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.textDark,
    marginLeft: 6,
  },
  frequentScroll: {
    paddingHorizontal: 20,
  },
  frequentCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginRight: 12,
    width: 120,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  avatarWrapper: {
    position: "relative",
    marginBottom: 8,
  },
  frequentAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#EAEAEA",
  },
  statusDot: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  frequentName: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.textDark,
    marginBottom: 4,
  },
  frequentStatus: {
    fontSize: 11,
    color: COLORS.textLight,
    marginBottom: 12,
  },
  inviteBtn: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 6,
    width: "100%",
    alignItems: "center",
  },
  inviteBtnPrimary: {
    backgroundColor: COLORS.btnBeige,
  },
  inviteBtnDisabled: {
    backgroundColor: COLORS.btnDisabled,
  },
  inviteBtnText: {
    fontSize: 13,
    fontWeight: "600",
  },
  inviteBtnTextPrimary: {
    color: COLORS.textBrown,
  },
  inviteBtnTextDisabled: {
    color: COLORS.textLight,
  },
  filtersContainer: {
    marginBottom: 15,
  },
  filtersContent: {
    paddingHorizontal: 20,
  },
  filterChip: {
    backgroundColor: "#EAEAEA",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  filterChipActive: {
    backgroundColor: COLORS.textDark,
  },
  filterChipText: {
    fontSize: 13,
    color: COLORS.textDark,
    fontWeight: "500",
  },
  filterChipTextActive: {
    fontSize: 13,
    color: COLORS.white,
    fontWeight: "500",
  },
  friendRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  friendInfoLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatarWrapperSmall: {
    position: "relative",
    marginRight: 12,
  },
  friendAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#EAEAEA",
  },
  statusDotSmall: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  friendDetails: {
    flex: 1,
  },
  friendName: {
    fontSize: 15,
    fontWeight: "bold",
    color: COLORS.textDark,
    marginBottom: 4,
  },
  subtitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  subtitleText: {
    fontSize: 12,
    color: COLORS.textLight,
    marginLeft: 4,
  },
  tagBadge: {
    backgroundColor: COLORS.tagBg,
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  tagBadgeText: {
    fontSize: 10,
    color: COLORS.textBrown,
    fontWeight: "500",
  },
  actionBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  actionBtnAdd: {
    backgroundColor: COLORS.primary,
  },
  actionBtnAdded: {
    backgroundColor: "#EEEEEE",
  },
  actionBtnTextAdd: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "600",
  },
  actionBtnTextAdded: {
    color: COLORS.textDark,
    fontSize: 13,
    fontWeight: "600",
  },
});
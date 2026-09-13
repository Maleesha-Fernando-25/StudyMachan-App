import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
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

type FrequentMachan = {
  id: string;
  name: string;
  status: string;
  statusDot: string;
  actionText: string;
  actionStyle: "primary" | "disabled";
  image: string;
};

type FriendGroup =
  | "All Friends"
  | "A/L Maths Batch"
  | "A/L Physics Batch"
  | "A/L Chemistry Batch";

type Friend = {
  id: string;
  name: string;
  group: Exclude<FriendGroup, "All Friends">;
  subtitleType: "icon-text" | "tag";
  subtitleIcon?: "time-outline" | "flame-outline" | "people-outline";
  subtitleText: string;
  subtitleIconColor?: string;
  statusDot: string;
  isAdded: boolean;
  image: string;
};

const FREQUENT_MACHANS: FrequentMachan[] = [
  {
    id: "1",
    name: "Amaya P.",
    status: "Maths • Online",
    statusDot: "#00C853",
    actionText: "+ Invite",
    actionStyle: "primary",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "2",
    name: "Nuwan D.",
    status: "In Room #82",
    statusDot: "#F5A623",
    actionText: "Busy",
    actionStyle: "disabled",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "3",
    name: "Tharushi K.",
    status: "Active 2h ago",
    statusDot: "#BDBDBD",
    actionText: "+ Invite",
    actionStyle: "primary",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const ALL_FRIENDS: Friend[] = [
  {
    id: "1",
    name: "Kavindu Mendis",
    group: "A/L Maths Batch",
    subtitleType: "icon-text",
    subtitleIcon: "time-outline",
    subtitleText: "42 hrs studied together",
    statusDot: "#00C853",
    isAdded: false,
    image: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    id: "2",
    name: "Dinithi Jayawardena",
    group: "A/L Chemistry Batch",
    subtitleType: "tag",
    subtitleText: "Organic Chemistry",
    statusDot: "#00C853",
    isAdded: true,
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: "3",
    name: "Charitha Bandara",
    group: "A/L Physics Batch",
    subtitleType: "icon-text",
    subtitleIcon: "flame-outline",
    subtitleIconColor: "#D32F2F",
    subtitleText: "7-day streak",
    statusDot: "#90CAF9",
    isAdded: false,
    image: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    id: "4",
    name: "Oshada Gunasekara",
    group: "A/L Maths Batch",
    subtitleType: "tag",
    subtitleText: "Applied Maths",
    statusDot: "#00C853",
    isAdded: false,
    image: "https://randomuser.me/api/portraits/men/85.jpg",
  },
  {
    id: "5",
    name: "Malith Rathnayake",
    group: "A/L Physics Batch",
    subtitleType: "icon-text",
    subtitleIcon: "people-outline",
    subtitleIconColor: "#D32F2F",
    subtitleText: "Physics Study Group",
    statusDot: "#00C853",
    isAdded: true,
    image: "https://randomuser.me/api/portraits/men/44.jpg",
  },
];

const COLORS = {
  primary: "#FF7145",
  titleOrange: "#A33A19",
  background: "#F9F9F9",
  white: "#FFFFFF",
  textDark: "#1A1A1A",
  textLight: "#7A7A7A",
  textBrown: "#5C4033",
  border: "#EEEEEE",
  beige: "#F4EFE6",
  btnBeige: "#E8E1D5",
  btnDisabled: "#EEEEEE",
  tagBg: "#EAE1D5",
};

const FRIEND_GROUPS: FriendGroup[] = [
  "All Friends",
  "A/L Maths Batch",
  "A/L Physics Batch",
  "A/L Chemistry Batch",
];

export default function ConnectFriendsScreen() {
  const router = useRouter();

  const [selectedGroup, setSelectedGroup] =
    useState<FriendGroup>("All Friends");

  const [searchText, setSearchText] = useState("");

  const filteredFriends = useMemo(() => {
    const normalizedSearch = searchText.trim().toLowerCase();

    return ALL_FRIENDS.filter((friend) => {
      const matchesGroup =
        selectedGroup === "All Friends" || friend.group === selectedGroup;

      const matchesSearch =
        normalizedSearch.length === 0 ||
        friend.name.toLowerCase().includes(normalizedSearch);

      return matchesGroup && matchesSearch;
    });
  }, [searchText, selectedGroup]);

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

      <Text style={styles.headerTitle}>Add Study Friends</Text>

      {/* Top-right icon removed */}
      <View style={styles.headerPlaceholder} />
    </View>
  );

  const renderSessionCard = () => (
    <View style={styles.sessionCard}>
      <Text style={styles.hashtag}>#AL-MATHS-88</Text>

      <Text style={styles.sessionTitle}>
        2027 A/L Combined Maths & Physics Sprint
      </Text>

      <Text style={styles.sessionInterval}>
        Focus Interval: 50m work • 10m tea break
      </Text>

      <View style={styles.sessionButtonsRow}>
        <TouchableOpacity style={styles.copyLinkBtn} activeOpacity={0.8}>
          <Feather
            name="link"
            size={16}
            color={COLORS.textDark}
            style={styles.btnIcon}
          />
          <Text style={styles.copyLinkText}>Copy Link</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.whatsappBtn} activeOpacity={0.8}>
          <Feather
            name="send"
            size={16}
            color={COLORS.white}
            style={styles.btnIcon}
          />
          <Text style={styles.whatsappText}>WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPasscodeCard = () => (
    <View style={styles.passcodeCard}>
      <View style={styles.passcodeLeft}>
        <MaterialCommunityIcons
          name="view-grid-outline"
          size={32}
          color={COLORS.textDark}
        />

        <View style={styles.passcodeTextWrapper}>
          <Text style={styles.passcodeLabel}>Instant Passcode</Text>
          <Text style={styles.passcodeValue}>882 - 901</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.passcodeCopyBtn} activeOpacity={0.8}>
        <Feather
          name="copy"
          size={14}
          color={COLORS.textBrown}
          style={styles.btnIconSmall}
        />
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
              <Image
                source={{ uri: friend.image }}
                style={styles.frequentAvatar}
              />

              <View
                style={[
                  styles.statusDot,
                  { backgroundColor: friend.statusDot },
                ]}
              />
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
              activeOpacity={0.8}
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
      {FRIEND_GROUPS.map((group) => {
        const isSelected = selectedGroup === group;

        return (
          <TouchableOpacity
            key={group}
            style={[styles.filterChip, isSelected && styles.filterChipActive]}
            onPress={() => setSelectedGroup(group)}
            activeOpacity={0.8}
          >
            <Text
              style={
                isSelected ? styles.filterChipTextActive : styles.filterChipText
              }
            >
              {group}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );

  const renderListHeader = () => (
    <View style={styles.listHeaderContainer}>
      {renderHeader()}

      <View style={styles.contentPadding}>
        {renderSessionCard()}
        {renderPasscodeCard()}

        <View style={styles.searchContainer}>
          <Feather
            name="search"
            size={20}
            color={COLORS.textLight}
            style={styles.searchIcon}
          />

          <TextInput
            style={styles.searchInput}
            placeholder="Search friends by name"
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
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

          <View
            style={[styles.statusDotSmall, { backgroundColor: item.statusDot }]}
          />
        </View>

        <View style={styles.friendDetails}>
          <Text style={styles.friendName}>{item.name}</Text>

          {item.subtitleType === "icon-text" ? (
            <View style={styles.subtitleRow}>
              <Ionicons
                name={item.subtitleIcon}
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
        activeOpacity={0.8}
      >
        {item.isAdded && (
          <Feather
            name="check"
            size={14}
            color={COLORS.textBrown}
            style={styles.actionCheckIcon}
          />
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
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <FlatList
        data={filteredFriends}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderListHeader}
        renderItem={renderFriendItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Feather name="users" size={28} color={COLORS.textLight} />
            <Text style={styles.emptyStateText}>
              No friends found in this batch.
            </Text>
          </View>
        }
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
    paddingTop: 18,
    paddingBottom: 16,
  },

  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },

  headerPlaceholder: {
    width: 44,
    height: 44,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.titleOrange,
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
    paddingRight: 10,
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
    paddingRight: 8,
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

  actionCheckIcon: {
    marginRight: 4,
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

  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
    marginHorizontal: 20,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  emptyStateText: {
    fontSize: 13,
    color: COLORS.textLight,
    marginTop: 10,
  },
});

import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useProfile } from "@/hooks/useProfile";
import {
    Image,
    Modal,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type CustomToggleProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
};

type DetailPanel = "personal" | "security" | "payment" | null;

const PROFILE_IMAGE =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300";

const CustomToggle = ({ value, onValueChange }: CustomToggleProps) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={() => onValueChange(!value)}
    style={[
      styles.toggleTrack,
      value ? styles.toggleTrackActive : styles.toggleTrackInactive,
    ]}
    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
  >
    <View
      style={[
        styles.toggleThumb,
        value ? styles.toggleThumbActive : styles.toggleThumbInactive,
      ]}
    >
      {value && <Feather name="check" size={12} color="#FFFFFF" />}
    </View>
  </TouchableOpacity>
);

type SettingsRowProps = {
  icon: "user" | "shield" | "credit-card";
  title: string;
  onPress: () => void;
};

function SettingsRow({ icon, title, onPress }: SettingsRowProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.settingsRow}
      onPress={onPress}
    >
      <View style={styles.settingsRowLeft}>
        <View style={styles.settingsIconBox}>
          <Feather name={icon} size={18} color="#D96B43" />
        </View>

        <Text style={styles.settingsRowTitle}>{title}</Text>
      </View>

      <Feather name="chevron-right" size={18} color="#2A231D" />
    </TouchableOpacity>
  );
}

export default function SettingsScreen() {
  const router = useRouter();
  const { profile } = useProfile();

  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailPreferences, setEmailPreferences] = useState(false);
  const [detailPanel, setDetailPanel] = useState<DetailPanel>(null);

  const closeDetailPanel = () => {
    setDetailPanel(null);
  };

  const getPanelTitle = () => {
    switch (detailPanel) {
      case "personal":
        return "Personal Information";
      case "security":
        return "Login & Security";
      case "payment":
        return "Payment Methods";
      default:
        return "";
    }
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
          <Feather name="arrow-left" size={23} color="#A33A19" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Settings</Text>

        <View style={styles.headerButtonPlaceholder} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* User Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileCardLeft}>
            <Image
              source={{ uri: profile?.avatar_url ?? PROFILE_IMAGE }}
              style={styles.profileImage}
            />

            <View style={styles.profileTextContainer}>
              <Text style={styles.profileName}>{profile?.full_name ?? ""}</Text>
              <Text style={styles.profileEmail}>{profile?.email ?? ""}</Text>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.viewProfileButton}
            onPress={() => router.push("/profile" as any)}
          >
            <Text style={styles.viewProfileText}>View{"\n"}Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Account section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ACCOUNT</Text>

          <View style={styles.settingsCard}>
            <SettingsRow
              icon="user"
              title="Personal Information"
              onPress={() => setDetailPanel("personal")}
            />

            <View style={styles.rowDivider} />

            <SettingsRow
              icon="shield"
              title="Login & Security"
              onPress={() => setDetailPanel("security")}
            />

            <View style={styles.rowDivider} />

            <SettingsRow
              icon="credit-card"
              title="Payment Methods"
              onPress={() => setDetailPanel("payment")}
            />
          </View>
        </View>

        {/* Preferences section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>PREFERENCES</Text>

          <View style={styles.settingsCard}>
            {/* Appearance: no arrow */}
            <View style={styles.settingsRow}>
              <View style={styles.settingsRowLeft}>
                <View style={styles.settingsIconBox}>
                  <Feather name="disc" size={18} color="#D96B43" />
                </View>

                <View style={styles.settingsTextContainer}>
                  <Text style={styles.settingsRowTitle}>Appearance</Text>
                  <Text style={styles.settingsRowSubtitle}>Light mode</Text>
                </View>
              </View>
            </View>

            <View style={styles.rowDivider} />

            {/* Language: no arrow */}
            <View style={styles.settingsRow}>
              <View style={styles.settingsRowLeft}>
                <View style={styles.settingsIconBox}>
                  <Feather name="globe" size={18} color="#D96B43" />
                </View>

                <View style={styles.settingsTextContainer}>
                  <Text style={styles.settingsRowTitle}>Language</Text>
                  <Text style={styles.settingsRowSubtitle}>English (US)</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Notifications section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>NOTIFICATIONS</Text>

          <View style={styles.settingsCard}>
            <View style={styles.toggleRow}>
              <View style={styles.settingsRowLeft}>
                <View style={styles.settingsIconBox}>
                  <Feather name="bell" size={18} color="#D96B43" />
                </View>

                <Text style={styles.settingsRowTitle}>Notifications</Text>
              </View>

              <CustomToggle
                value={pushNotifications}
                onValueChange={setPushNotifications}
              />
            </View>

            <View style={styles.rowDivider} />

            <View style={styles.toggleRow}>
              <View style={styles.settingsRowLeft}>
                <View style={styles.settingsIconBox}>
                  <Feather name="mail" size={18} color="#D96B43" />
                </View>

                <Text style={styles.settingsRowTitle}>Email Preferences</Text>
              </View>

              <CustomToggle
                value={emailPreferences}
                onValueChange={setEmailPreferences}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Detail modal */}
      <Modal
        visible={detailPanel !== null}
        transparent
        animationType="slide"
        onRequestClose={closeDetailPanel}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.detailModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{getPanelTitle()}</Text>

              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={closeDetailPanel}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Feather name="x" size={22} color="#2A231D" />
              </TouchableOpacity>
            </View>

            {detailPanel === "personal" && (
              <View style={styles.panelContent}>
                <Text style={styles.panelLabel}>Full Name</Text>
                <Text style={styles.panelValue}>{profile?.full_name ?? ""}</Text>

                <Text style={styles.panelLabel}>Email</Text>
                <Text style={styles.panelValue}>{profile?.email ?? ""}</Text>

                <Text style={styles.panelLabel}>Student Status</Text>
                <Text style={styles.panelValue}>Active Student</Text>
              </View>
            )}

            {detailPanel === "security" && (
              <View style={styles.panelContent}>
                <View style={styles.securityRow}>
                  <View style={styles.securityIconBox}>
                    <Feather name="lock" size={18} color="#D96B43" />
                  </View>

                  <View style={styles.securityTextContainer}>
                    <Text style={styles.panelValue}>Password</Text>
                    <Text style={styles.panelDescription}>
                      Last updated recently
                    </Text>
                  </View>
                </View>

                <View style={styles.securityRow}>
                  <View style={styles.securityIconBox}>
                    <Feather name="smartphone" size={18} color="#D96B43" />
                  </View>

                  <View style={styles.securityTextContainer}>
                    <Text style={styles.panelValue}>Two-step verification</Text>
                    <Text style={styles.panelDescription}>
                      Enabled for your account
                    </Text>
                  </View>
                </View>
              </View>
            )}

            {detailPanel === "payment" && (
              <View style={styles.panelContent}>
                <View style={styles.paymentMethodCard}>
                  <Feather name="credit-card" size={22} color="#D96B43" />

                  <View style={styles.paymentMethodText}>
                    <Text style={styles.panelValue}>Visa ending in 4242</Text>
                    <Text style={styles.panelDescription}>
                      Default payment method
                    </Text>
                  </View>

                  <View style={styles.defaultBadge}>
                    <Text style={styles.defaultBadgeText}>Default</Text>
                  </View>
                </View>

                <Text style={styles.panelDescription}>
                  You can update your payment method before booking your next
                  session.
                </Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
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
    boxShadow: "0px 1px 3px rgba(0,0,0,0.05)",
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

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 40,
  },

  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#EFE8DC",
    boxShadow: "0px 1px 3px rgba(0,0,0,0.04)",
    marginBottom: 22,
  },

  profileCardLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingRight: 10,
  },

  profileImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },

  profileTextContainer: {
    flex: 1,
    marginLeft: 14,
  },

  profileName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2A231D",
  },

  profileEmail: {
    fontSize: 12,
    color: "#7A7263",
    marginTop: 3,
    fontWeight: "500",
  },

  viewProfileButton: {
    paddingHorizontal: 4,
    paddingVertical: 6,
  },

  viewProfileText: {
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "800",
    color: "#FF7A45",
    textAlign: "right",
  },

  section: {
    marginBottom: 22,
  },

  sectionLabel: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.2,
    color: "#7A7263",
    marginBottom: 10,
    paddingHorizontal: 4,
  },

  settingsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EFE8DC",
    overflow: "hidden",
    boxShadow: "0px 1px 3px rgba(0,0,0,0.04)",
  },

  settingsRow: {
    minHeight: 72,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  toggleRow: {
    minHeight: 72,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  settingsRowLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingRight: 10,
  },

  settingsIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FDF0E6",
    alignItems: "center",
    justifyContent: "center",
  },

  settingsTextContainer: {
    flex: 1,
    marginLeft: 14,
  },

  settingsRowTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#2A231D",
  },

  settingsRowSubtitle: {
    fontSize: 12,
    fontWeight: "500",
    color: "#7A7263",
    marginTop: 3,
  },

  rowDivider: {
    height: 1,
    backgroundColor: "#F4EFEA",
    marginLeft: 70,
  },

  toggleTrack: {
    width: 48,
    height: 28,
    borderRadius: 999,
    padding: 2,
    justifyContent: "center",
  },

  toggleTrackActive: {
    backgroundColor: "#FF7A45",
  },

  toggleTrackInactive: {
    backgroundColor: "#E2DDD5",
  },

  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  toggleThumbActive: {
    backgroundColor: "#2563EB",
    alignSelf: "flex-end",
  },

  toggleThumbInactive: {
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
    boxShadow: "0px 1px 2px rgba(0,0,0,0.12)",
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },

  detailModal: {
    backgroundColor: "#FAF8F5",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
    minHeight: 260,
  },

  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  modalTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#A33A19",
  },

  modalCloseButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  panelContent: {
    gap: 16,
  },

  panelLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#7A7263",
    marginBottom: -10,
  },

  panelValue: {
    fontSize: 15,
    fontWeight: "800",
    color: "#2A231D",
  },

  panelDescription: {
    fontSize: 12,
    lineHeight: 18,
    color: "#7A7263",
    fontWeight: "500",
  },

  securityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
  },

  securityIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FDF0E6",
    alignItems: "center",
    justifyContent: "center",
  },

  securityTextContainer: {
    flex: 1,
    gap: 4,
  },

  paymentMethodCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
  },

  paymentMethodText: {
    flex: 1,
    gap: 4,
  },

  defaultBadge: {
    backgroundColor: "#FFF0E8",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 999,
  },

  defaultBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#FF7A45",
  },
});

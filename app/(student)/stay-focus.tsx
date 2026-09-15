import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Circle } from "react-native-svg";

export default function StayFocusScreen() {
  const router = useRouter();

  // Timer state
  const [isPaused, setIsPaused] = useState(true);
  const [secondsRemaining, setSecondsRemaining] = useState(25 * 60);

  // Duration settings
  const [durationMinutes, setDurationMinutes] = useState(25);
  const initialSeconds = durationMinutes * 60;

  // Modal state
  const [isDurationModalVisible, setDurationModalVisible] = useState(false);
  const [customMinutes, setCustomMinutes] = useState("");

  // Timer effect
  useEffect(() => {
    if (isPaused || secondsRemaining <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setSecondsRemaining((previousSeconds) => {
        if (previousSeconds <= 1) {
          return 0;
        }

        return previousSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, secondsRemaining]);

  // Time formatting
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds,
  ).padStart(2, "0")}`;

  // SVG timer dimensions
  const size = 270;
  const strokeWidth = 16;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const progress = initialSeconds > 0 ? secondsRemaining / initialSeconds : 0;

  const strokeDashoffset = circumference - progress * circumference;

  const handleReset = () => {
    setSecondsRemaining(durationMinutes * 60);
    setIsPaused(true);
  };

  const handlePlayPause = () => {
    if (secondsRemaining <= 0) {
      setSecondsRemaining(durationMinutes * 60);
      setIsPaused(false);
      return;
    }

    setIsPaused((previousValue) => !previousValue);
  };

  const openDurationModal = () => {
    setCustomMinutes("");
    setDurationModalVisible(true);
  };

  const applyCustomDuration = () => {
    const parsedMinutes = Number.parseInt(customMinutes, 10);

    if (!Number.isFinite(parsedMinutes) || parsedMinutes <= 0) {
      return;
    }

    setDurationMinutes(parsedMinutes);
    setSecondsRemaining(parsedMinutes * 60);
    setIsPaused(true);
    setDurationModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF8F5" />

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Feather name="arrow-left" size={23} color="#C85A32" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Stay Focus</Text>

          {/* Placeholder keeps the title centered */}
          <View style={styles.iconButtonPlaceholder} />
        </View>

        {/* Scrollable content */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Session title and friends button */}
          <View style={styles.titleRow}>
            <Text style={styles.sectionTitle}>Focus Session</Text>

            <View style={styles.actionButtonsRow}>
              {/* Friends button */}
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => router.push("/connect-friends" as any)}
                activeOpacity={0.8}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Feather name="users" size={19} color="#201E1D" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Current task card */}
          <View style={styles.taskCard}>
            <View style={styles.taskHeader}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100",
                }}
                style={styles.tutorAvatar}
              />

              <View style={styles.taskInfo}>
                <Text style={styles.taskTitle}>Calculus with Sarah J.</Text>

                <View style={styles.timeRow}>
                  <Feather name="clock" size={12} color="#8D8680" />
                  <Text style={styles.timeText}>
                    Time Elapsed:{" "}
                    {formatElapsed(initialSeconds - secondsRemaining)}
                  </Text>
                </View>
              </View>
            </View>

            {/* Mini progress */}
            <View style={styles.miniProgressBg}>
              <View
                style={[
                  styles.miniProgressFill,
                  {
                    width: `${
                      initialSeconds > 0
                        ? ((initialSeconds - secondsRemaining) /
                            initialSeconds) *
                          100
                        : 0
                    }%`,
                  },
                ]}
              />
            </View>
          </View>

          {/* Timer circle */}
          <View style={styles.timerContainer}>
            <Svg width={size} height={size}>
              <Circle
                stroke="#EFECE6"
                fill="none"
                cx={center}
                cy={center}
                r={radius}
                strokeWidth={strokeWidth}
              />

              <Circle
                stroke="#FF6B35"
                fill="none"
                cx={center}
                cy={center}
                r={radius}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform={`rotate(-125 ${center} ${center})`}
              />
            </Svg>

            <View style={styles.timerInner}>
              <Text style={styles.timerText}>{formattedTime}</Text>

              <Text style={styles.timerStatusText}>
                {isPaused ? "PAUSED" : "RUNNING"}
              </Text>
            </View>
          </View>

          {/* Timer controls */}
          <View style={styles.controlsRow}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={handleReset}
              activeOpacity={0.8}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Feather name="x" size={22} color="#201E1D" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handlePlayPause}
              style={[styles.playButton, styles.shadowOrange]}
              activeOpacity={0.85}
            >
              <Ionicons
                name={isPaused ? "play" : "pause"}
                size={32}
                color="#FFFFFF"
                style={isPaused ? styles.playIcon : undefined}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.controlButton}
              onPress={openDurationModal}
              activeOpacity={0.8}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <MaterialCommunityIcons
                name="timer-outline"
                size={22}
                color="#201E1D"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.extraBottomSpace} />
        </ScrollView>
      </View>

      {/* Raised bottom navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/student-home" as any)}
          activeOpacity={0.8}
          hitSlop={{ top: 8, bottom: 8, left: 10, right: 10 }}
        >
          <Ionicons name="home" size={20} color="#9CA3AF" />
          <Text style={styles.navTextInactive}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          activeOpacity={0.8}
          hitSlop={{ top: 8, bottom: 8, left: 10, right: 10 }}
        >
          <View style={styles.navIconWrapper}>
            <Feather name="clock" size={20} color="#FF6B35" />
            <View style={styles.navDot} />
          </View>

          <Text style={styles.navTextActive}>Focus</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/my-sessions" as any)}
          activeOpacity={0.8}
          hitSlop={{ top: 8, bottom: 8, left: 10, right: 10 }}
        >
          <Feather name="calendar" size={20} color="#9CA3AF" />
          <Text style={styles.navTextInactive}>Schedule</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/alerts" as any)}
          activeOpacity={0.8}
          hitSlop={{ top: 8, bottom: 8, left: 10, right: 10 }}
        >
          <View style={styles.alertsIconWrapper}>
            <Feather name="bell" size={20} color="#9CA3AF" />
            <View style={styles.alertDot} />
          </View>

          <Text style={styles.navTextInactive}>Alerts</Text>
        </TouchableOpacity>
      </View>

      {/* Duration modal */}
      <Modal
        visible={isDurationModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDurationModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Set Focus Duration</Text>

            <Text style={styles.modalSubtitle}>Enter duration in minutes.</Text>

            <View style={styles.customRow}>
              <TextInput
                style={styles.customInput}
                placeholder="Custom minutes"
                placeholderTextColor="#9CA3AF"
                keyboardType="number-pad"
                value={customMinutes}
                onChangeText={setCustomMinutes}
              />

              <TouchableOpacity
                style={styles.applyButton}
                onPress={applyCustomDuration}
                activeOpacity={0.85}
              >
                <Text style={styles.applyButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setDurationModalVisible(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.closeModalText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function formatElapsed(elapsedSeconds: number) {
  const safeSeconds = Math.max(0, elapsedSeconds);
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0",
  )}`;
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FAF8F5",
  },

  container: {
    flex: 1,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 16,
    minHeight: 76,
  },

  iconButton: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 1px 3px rgba(0,0,0,0.06)",
  },

  iconButtonPlaceholder: {
    width: 48,
    height: 48,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#C85A32",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 150,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#201E1D",
  },

  actionButtonsRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F2ECE6",
    alignItems: "center",
    justifyContent: "center",
  },

  taskCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#EFECE6",
    boxShadow: "0px 1px 3px rgba(0,0,0,0.04)",
    marginBottom: 30,
  },

  taskHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  tutorAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },

  taskInfo: {
    flex: 1,
    marginLeft: 12,
  },

  taskTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#201E1D",
  },

  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },

  timeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#8D8680",
    marginLeft: 4,
  },

  miniProgressBg: {
    width: "100%",
    height: 6,
    backgroundColor: "#EFECE6",
    borderRadius: 999,
    overflow: "hidden",
  },

  miniProgressFill: {
    height: "100%",
    backgroundColor: "#FF6B35",
    borderRadius: 999,
  },

  timerContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },

  timerInner: {
    position: "absolute",
    width: 208,
    height: 208,
    borderRadius: 104,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EFECE6",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 1px 3px rgba(0,0,0,0.04)",
  },

  timerText: {
    fontSize: 36,
    fontWeight: "900",
    color: "#201E1D",
    letterSpacing: -1,
  },

  timerStatusText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#8D8680",
    letterSpacing: 2,
    marginTop: 4,
  },

  controlsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
    marginTop: 20,
    marginBottom: 10,
  },

  controlButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EFECE6",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 1px 3px rgba(0,0,0,0.04)",
  },

  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FF6B35",
    alignItems: "center",
    justifyContent: "center",
  },

  playIcon: {
    marginLeft: 4,
  },

  shadowOrange: {
    boxShadow: "0px 2px 6px rgba(255,107,53,0.25)",
  },

  extraBottomSpace: {
    height: 40,
  },

  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 10,
    minHeight: 76,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EFECE6",
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingBottom: 14,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    boxShadow: "0px -2px 5px rgba(0,0,0,0.08)",
  },

  navItem: {
    minWidth: 68,
    minHeight: 58,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingVertical: 5,
  },

  navIconWrapper: {
    position: "relative",
  },

  navDot: {
    position: "absolute",
    top: -4,
    right: -4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF6B35",
  },

  navTextActive: {
    fontSize: 10,
    fontWeight: "800",
    color: "#FF6B35",
    marginTop: 3,
  },

  navTextInactive: {
    fontSize: 10,
    fontWeight: "600",
    color: "#9CA3AF",
    marginTop: 3,
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

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  modalContent: {
    width: "100%",
    maxWidth: 320,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    boxShadow: "0px 2px 8px rgba(0,0,0,0.2)",
  },

  modalTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#201E1D",
    marginBottom: 8,
    textAlign: "center",
  },

  modalSubtitle: {
    fontSize: 12,
    fontWeight: "500",
    color: "#8D8680",
    marginBottom: 16,
    textAlign: "center",
    lineHeight: 16,
  },

  customRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },

  customInput: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EFECE6",
    paddingHorizontal: 12,
    fontSize: 14,
    color: "#201E1D",
  },

  applyButton: {
    backgroundColor: "#FF6B35",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  applyButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  closeModalButton: {
    marginTop: 4,
    paddingVertical: 10,
    alignItems: "center",
  },

  closeModalText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#8D8680",
  },
});

import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
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
  const [secondsRemaining, setSecondsRemaining] = useState(25 * 60); // 25 minutes

  // Duration settings
  const [durationMinutes, setDurationMinutes] = useState(25);
  const INITIAL_SECONDS = durationMinutes * 60;

  // Modal state for setting time
  const [isDurationModalVisible, setDurationModalVisible] = useState(false);
  const [customMinutes, setCustomMinutes] = useState("");

  // Timer effect
  useEffect(() => {
    if (isPaused || secondsRemaining <= 0) return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, secondsRemaining]);

  // Format MM:SS
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds,
  ).padStart(2, "0")}`;

  // SVG Circular Timer Dimensions
  const size = 270;
  const strokeWidth = 16;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Progress ratio based on elapsed time
  const progress = INITIAL_SECONDS > 0 ? secondsRemaining / INITIAL_SECONDS : 0;
  const strokeDashoffset = circumference - progress * circumference;

  // Handlers
  const handleReset = () => {
    setSecondsRemaining(durationMinutes * 60);
    setIsPaused(true);
  };

  const handlePlayPause = () => {
    setIsPaused((prev) => !prev);
  };

  const openDurationModal = () => {
    setCustomMinutes("");
    setDurationModalVisible(true);
  };

  const applyCustomDuration = () => {
    const mins = parseInt(customMinutes, 10);
    if (!mins || mins <= 0) return;

    setDurationMinutes(mins);
    setSecondsRemaining(mins * 60);
    setIsPaused(true);
    setDurationModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF8F5" />

      {/* Main Container */}
      <View style={styles.container}>
        {/* Top Header Bar */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.back()}
          >
            <Feather name="arrow-left" size={22} color="#C85A32" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Stay Focus</Text>

          {/* Settings icon removed */}
          <View style={styles.iconButtonPlaceholder} />
        </View>

        {/* Scrollable Content */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Title Row with Action Buttons */}
          <View style={styles.titleRow}>
            <Text style={styles.sectionTitle}>Focus Session</Text>

            <View style={styles.actionButtonsRow}>
              <TouchableOpacity style={styles.actionButton}>
                <Feather name="users" size={18} color="#201E1D" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={openDurationModal}
              >
                <MaterialCommunityIcons
                  name="timer-outline"
                  size={18}
                  color="#201E1D"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Current Task Progress Card */}
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
                    {formatElapsed(durationMinutes * 60 - secondsRemaining)}
                  </Text>
                </View>
              </View>
            </View>

            {/* Session Mini Progress Line */}
            <View style={styles.miniProgressBg}>
              <View
                style={[
                  styles.miniProgressFill,
                  {
                    width: `${
                      durationMinutes * 60 > 0
                        ? ((durationMinutes * 60 - secondsRemaining) /
                            (durationMinutes * 60)) *
                          100
                        : 0
                    }%`,
                  },
                ]}
              />
            </View>
          </View>

          {/* Center Timer Circle */}
          <View style={styles.timerContainer}>
            <Svg width={size} height={size}>
              {/* Background Circular Track */}
              <Circle
                stroke="#EFECE6"
                fill="none"
                cx={center}
                cy={center}
                r={radius}
                strokeWidth={strokeWidth}
              />
              {/* Active Orange Progress Arc */}
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

            {/* Inner Timer View */}
            <View style={styles.timerInner}>
              <Text style={styles.timerText}>{formattedTime}</Text>
              <Text style={styles.timerStatusText}>
                {isPaused ? "PAUSED" : "RUNNING"}
              </Text>
            </View>
          </View>

          {/* Action Control Buttons */}
          <View style={styles.controlsRow}>
            {/* Reset Button (Cross) */}
            <TouchableOpacity
              style={styles.controlButton}
              onPress={handleReset}
            >
              <Feather name="x" size={22} color="#201E1D" />
            </TouchableOpacity>

            {/* Play / Pause Primary Button */}
            <TouchableOpacity
              onPress={handlePlayPause}
              style={[styles.playButton, styles.shadowOrange]}
            >
              <Ionicons
                name={isPaused ? "play" : "pause"}
                size={32}
                color="#FFFFFF"
                style={isPaused ? { marginLeft: 4 } : undefined}
              />
            </TouchableOpacity>

            {/* Set Duration Button */}
            <TouchableOpacity
              style={styles.controlButton}
              onPress={openDurationModal}
            >
              <MaterialCommunityIcons
                name="timer-outline"
                size={22}
                color="#201E1D"
              />
            </TouchableOpacity>
          </View>

          {/* Extra spacing at bottom so controls don’t overlap nav */}
          <View style={{ height: 40 }} />
        </ScrollView>
      </View>

      {/* Bottom Navigation Bar (always at bottom of screen) */}
      <View style={styles.bottomNav}>
        {/* Home */}
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={20} color="#9CA3AF" />
          <Text style={styles.navTextInactive}>Home</Text>
        </TouchableOpacity>

        {/* Focus (Active) */}
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navIconWrapper}>
            <Feather name="clock" size={20} color="#FF6B35" />
            <View style={styles.navDot} />
          </View>
          <Text style={styles.navTextActive}>Focus</Text>
        </TouchableOpacity>

        {/* Schedule */}
        <TouchableOpacity style={styles.navItem}>
          <Feather name="calendar" size={20} color="#9CA3AF" />
          <Text style={styles.navTextInactive}>Schedule</Text>
        </TouchableOpacity>

        {/* Alerts */}
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.alertsIconWrapper}>
            <Feather name="bell" size={20} color="#9CA3AF" />
            <View style={styles.alertDot} />
          </View>
          <Text style={styles.navTextInactive}>Alerts</Text>
        </TouchableOpacity>
      </View>

      {/* Duration Selection Modal */}
      <Modal
        visible={isDurationModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDurationModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Set Focus Duration</Text>

            <Text style={styles.modalSubtitle}>
              Enter duration in minutes (e.g., 25 for 25 mins 0 secs).
            </Text>

            <View style={styles.customRow}>
              <TextInput
                style={styles.customInput}
                placeholder="Custom (min)"
                placeholderTextColor="#9CA3AF"
                keyboardType="number-pad"
                value={customMinutes}
                onChangeText={setCustomMinutes}
              />
              <TouchableOpacity
                style={styles.applyButton}
                onPress={applyCustomDuration}
              >
                <Text style={styles.applyButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setDurationModalVisible(false)}
            >
              <Text style={styles.closeModalText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// Helper: format elapsed seconds as MM:SS
function formatElapsed(elapsedSeconds: number) {
  const m = Math.floor(elapsedSeconds / 60);
  const s = elapsedSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
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
    paddingTop: 8,
    paddingBottom: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  iconButtonPlaceholder: {
    width: 40,
    height: 40,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#C85A32",
  },

  // Scrollable content
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  // Title row
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
    gap: 10,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F2ECE6",
    alignItems: "center",
    justifyContent: "center",
  },

  // Task card
  taskCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#EFECE6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
    marginBottom: 30,
  },
  taskHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  tutorAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#201E1D",
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },
  timeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#8D8680",
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

  // Timer circle
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
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
    textTransform: "uppercase",
  },

  // Controls
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FF6B35",
    alignItems: "center",
    justifyContent: "center",
  },
  shadowOrange: {
    shadowColor: "#FF6B35",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },

  // Bottom nav (fixed at bottom of screen)
  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EFECE6",
    paddingVertical: 12,
    paddingHorizontal: 24,
    paddingBottom: 22,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navItem: {
    alignItems: "center",
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
    marginTop: 2,
  },
  navTextInactive: {
    fontSize: 10,
    fontWeight: "600",
    color: "#9CA3AF",
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

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    maxWidth: 320,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
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

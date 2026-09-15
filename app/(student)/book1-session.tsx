import { Feather } from "@expo/vector-icons";
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

type DateOption = {
  day: string;
  date: string;
  disabled?: boolean;
  hasDot?: boolean;
};

type SessionMode = "Physical" | "Online" | "Hybrid";

const DATE_OPTIONS: DateOption[] = [
  { day: "Sun", date: "11", disabled: true },
  { day: "Mon", date: "12", hasDot: true },
  { day: "Tue", date: "13" },
  { day: "Wed", date: "14" },
  { day: "Thu", date: "15" },
];

const TIME_SLOTS = [
  "09:00 AM",
  "10:30 AM",
  "11:00 AM",
  "01:00 PM",
  "02:00 PM",
  "03:30 PM",
];

const SESSION_MODES: SessionMode[] = ["Physical", "Online", "Hybrid"];

const TOPICS = [
  "Geometry",
  "Polynomials",
  "Statistics",
  "Linear Algebra",
  "Circles",
];

export default function BookSessionScreen() {
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState("12");
  const [selectedTime, setSelectedTime] = useState("10:30 AM");
  const [selectedMode, setSelectedMode] = useState<SessionMode>("Online");
  const [selectedFocus, setSelectedFocus] = useState<string[]>(["Geometry"]);
  const [notes, setNotes] = useState("");

  const toggleTopic = (topic: string) => {
    setSelectedFocus((currentTopics) =>
      currentTopics.includes(topic)
        ? currentTopics.filter((item) => item !== topic)
        : [...currentTopics, topic],
    );
  };

  const handleConfirmBooking = () => {
    router.push({
      pathname: "/payment-confirmed" as any,
      params: {
        date: selectedDate,
        time: selectedTime,
        mode: selectedMode,
        topics: selectedFocus.join(", "),
        notes,
      },
    });
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

        <Text style={styles.headerTitle}>Book a Session</Text>

        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Tutor profile */}
        <View style={styles.tutorCard}>
          <Image
            source={require("../../assets/images/tutors/sarah-perera.jpg")}
            style={styles.tutorAvatar}
          />

          <View style={styles.tutorTextContainer}>
            <Text style={styles.tutorName}>Sarah Perera</Text>
            <Text style={styles.tutorSubject}>Combined Mathematics</Text>
          </View>
        </View>

        {/* Select date */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Select Date</Text>
            <Text style={styles.monthText}>November 2026</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dateList}
          >
            {DATE_OPTIONS.map((item) => {
              const isSelected = selectedDate === item.date;

              return (
                <TouchableOpacity
                  key={item.date}
                  activeOpacity={0.8}
                  onPress={() => {
                    if (!item.disabled) {
                      setSelectedDate(item.date);
                    }
                  }}
                  disabled={item.disabled}
                  style={[
                    styles.dateCard,
                    isSelected && styles.dateCardSelected,
                    item.disabled && styles.dateCardDisabled,
                  ]}
                >
                  <Text
                    style={[
                      styles.dateDay,
                      isSelected && styles.dateTextSelected,
                      item.disabled && styles.dateTextDisabled,
                    ]}
                  >
                    {item.day}
                  </Text>

                  <Text
                    style={[
                      styles.dateNumber,
                      isSelected && styles.dateTextSelected,
                      item.disabled && styles.dateTextDisabled,
                    ]}
                  >
                    {item.date}
                  </Text>

                  {item.hasDot && isSelected && <View style={styles.dateDot} />}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Available times */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Times</Text>

          <View style={styles.timeGrid}>
            {TIME_SLOTS.map((time) => {
              const isSelected = selectedTime === time;

              return (
                <TouchableOpacity
                  key={time}
                  activeOpacity={0.8}
                  onPress={() => setSelectedTime(time)}
                  style={[
                    styles.timeButton,
                    isSelected && styles.timeButtonSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.timeText,
                      isSelected && styles.timeTextSelected,
                    ]}
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Session mode */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Session Mode</Text>

          <View style={styles.modeGrid}>
            {SESSION_MODES.map((mode) => {
              const isSelected = selectedMode === mode;

              return (
                <TouchableOpacity
                  key={mode}
                  activeOpacity={0.8}
                  onPress={() => setSelectedMode(mode)}
                  style={[
                    styles.modeButton,
                    isSelected && styles.modeButtonSelected,
                  ]}
                >
                  <Feather
                    name={
                      mode === "Physical"
                        ? "map-pin"
                        : mode === "Online"
                          ? "video"
                          : "shuffle"
                    }
                    size={16}
                    color={isSelected ? "#FFFFFF" : "#5C534B"}
                  />

                  <Text
                    style={[
                      styles.modeText,
                      isSelected && styles.modeTextSelected,
                    ]}
                  >
                    {mode}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Subject and focus */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Subject & Focus</Text>

          <View style={styles.topicList}>
            {TOPICS.map((topic) => {
              const isSelected = selectedFocus.includes(topic);

              return (
                <TouchableOpacity
                  key={topic}
                  activeOpacity={0.8}
                  onPress={() => toggleTopic(topic)}
                  style={[
                    styles.topicChip,
                    isSelected && styles.topicChipSelected,
                  ]}
                >
                  {isSelected && (
                    <Feather name="check" size={14} color="#5C534B" />
                  )}

                  <Text style={styles.topicText}>{topic}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Notes */}
          <View style={styles.notesBox}>
            <TextInput
              multiline
              placeholder="What specific topics or problems would you like to cover? (Optional)"
              placeholderTextColor="#9CA3AF"
              value={notes}
              onChangeText={setNotes}
              textAlignVertical="top"
              style={styles.notesInput}
            />

            <View style={styles.notesIconContainer}>
              <Feather name="edit-3" size={16} color="#9CA3AF" />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Booking action */}
      <View style={styles.bookingPanel}>
        <View style={styles.totalRow}>
          <View>
            <Text style={styles.totalLabel}>TOTAL COST</Text>
            <Text style={styles.totalSubtitle}>Per Session</Text>
          </View>

          <Text style={styles.totalAmount}>Rs 900.00</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.confirmButton}
          onPress={handleConfirmBooking}
        >
          <Text style={styles.confirmButtonText}>Confirm Booking</Text>

          <Feather name="arrow-right" size={18} color="#FFFFFF" />
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
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 1px 3px rgba(0,0,0,0.05)",
  },

  headerPlaceholder: {
    width: 44,
    height: 44,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#A33A19",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 190,
  },

  tutorCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EFE8DC",
    boxShadow: "0px 1px 3px rgba(0,0,0,0.04)",
    marginBottom: 24,
  },

  tutorAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },

  tutorTextContainer: {
    flex: 1,
    marginLeft: 14,
  },

  tutorName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2A231D",
  },

  tutorSubject: {
    fontSize: 12,
    color: "#7A7263",
    fontWeight: "600",
    marginTop: 3,
  },

  section: {
    marginBottom: 24,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2A231D",
    marginBottom: 12,
  },

  monthText: {
    fontSize: 12,
    color: "#7A7263",
    fontWeight: "600",
  },

  dateList: {
    paddingRight: 8,
    gap: 10,
  },

  dateCard: {
    width: 60,
    height: 80,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EFE8DC",
  },

  dateCardSelected: {
    backgroundColor: "#FF7A45",
    borderColor: "#FF7A45",
  },

  dateCardDisabled: {
    backgroundColor: "#F5F2EC",
    borderColor: "transparent",
    opacity: 0.6,
  },

  dateDay: {
    fontSize: 12,
    fontWeight: "600",
    color: "#8C8377",
    marginBottom: 4,
  },

  dateNumber: {
    fontSize: 20,
    fontWeight: "800",
    color: "#2A231D",
  },

  dateTextSelected: {
    color: "#FFFFFF",
  },

  dateTextDisabled: {
    color: "#A0988C",
  },

  dateDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#FFFFFF",
    marginTop: 4,
  },

  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },

  timeButton: {
    width: "31%",
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EFE8DC",
  },

  timeButtonSelected: {
    backgroundColor: "#FF7A45",
    borderColor: "#FF7A45",
  },

  timeText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#2A231D",
  },

  timeTextSelected: {
    color: "#FFFFFF",
  },

  modeGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },

  modeButton: {
    flex: 1,
    minHeight: 52,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EFE8DC",
    paddingHorizontal: 6,
  },

  modeButtonSelected: {
    backgroundColor: "#FF7A45",
    borderColor: "#FF7A45",
  },

  modeText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#5C534B",
  },

  modeTextSelected: {
    color: "#FFFFFF",
  },

  topicList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },

  topicChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EFE8DC",
  },

  topicChipSelected: {
    backgroundColor: "#EFE8DC",
    borderColor: "#E5DDD0",
  },

  topicText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#4A423B",
  },

  notesBox: {
    height: 128,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EFE8DC",
    padding: 16,
  },

  notesInput: {
    flex: 1,
    fontSize: 12,
    lineHeight: 20,
    color: "#2A231D",
    fontWeight: "500",
  },

  notesIconContainer: {
    alignItems: "flex-end",
  },

  bookingPanel: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EFE8DC",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    boxShadow: "0px -3px 6px rgba(0,0,0,0.08)",
  },

  totalRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  totalLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: "#7A7263",
    letterSpacing: 1,
  },

  totalSubtitle: {
    fontSize: 12,
    color: "#7A7263",
    fontWeight: "600",
    marginTop: 3,
  },

  totalAmount: {
    fontSize: 24,
    fontWeight: "900",
    color: "#2A231D",
  },

  confirmButton: {
    backgroundColor: "#FF7A45",
    paddingVertical: 14,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    boxShadow: "0px 2px 4px rgba(255,122,69,0.2)",
  },

  confirmButtonText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
  },
});

import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
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

export default function BookSessionScreen() {
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState("12");
  const [selectedTime, setSelectedTime] = useState("10:30 AM");
  const [selectedSubject, setSelectedSubject] = useState("Quantum Mechanics");
  const [note, setNote] = useState("");

  // Date picker
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const dates = [
    { day: "Sun", date: "11", disabled: true },
    { day: "Mon", date: "12", disabled: false },
    { day: "Tue", date: "13", disabled: false },
    { day: "Wed", date: "14", disabled: false },
    { day: "Thu", date: "15", disabled: false },
  ];

  const timeSlots = [
    "09:00 AM",
    "10:30 AM",
    "11:00 AM",
    "01:00 PM",
    "02:00 PM",
    "03:30 PM",
  ];

  const subjects = ["Quantum Mechanics", "Linear Algebra", "General Physics"];

  const onDateChange = (event: any, date?: Date) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }
    if (event.type === "set" && date) {
      setCurrentDate(date);
      // Optionally update selectedDate based on picked date
      const dayStr = String(date.getDate());
      setSelectedDate(dayStr);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF8F5" />

      {/* Top Header Bar */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={22} color="#A33A19" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book a session</Text>
      </View>

      {/* Main Scrollable View */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Tutor Info Card */}
        <View style={styles.tutorCard}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
            }}
            style={styles.tutorImage}
          />
          <View style={styles.tutorInfo}>
            <Text style={styles.tutorName}>Dr. Aris Thorne</Text>
            <Text style={styles.tutorRole}>Senior Math & Physics Tutor</Text>
          </View>
        </View>

        {/* Select Date Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Select Date</Text>
            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Feather name="calendar" size={16} color="#6B7280" />
              <Text style={styles.datePickerText}>
                {currentDate.toLocaleDateString(undefined, {
                  month: "short",
                  year: "numeric",
                })}
              </Text>
              <Feather name="chevron-down" size={16} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.datesScroll}
          >
            {dates.map((item) => {
              const isSelected = selectedDate === item.date;
              return (
                <TouchableOpacity
                  key={item.date}
                  onPress={() => !item.disabled && setSelectedDate(item.date)}
                  activeOpacity={0.8}
                  style={[
                    styles.dateBox,
                    isSelected && styles.dateBoxSelected,
                    item.disabled && styles.dateBoxDisabled,
                  ]}
                >
                  <Text
                    style={[
                      styles.dateDayText,
                      isSelected && styles.dateDayTextSelected,
                      item.disabled && styles.dateDayTextDisabled,
                    ]}
                  >
                    {item.day}
                  </Text>
                  <Text
                    style={[
                      styles.dateNumText,
                      isSelected && styles.dateNumTextSelected,
                      item.disabled && styles.dateNumTextDisabled,
                    ]}
                  >
                    {item.date}
                  </Text>
                  {isSelected && <View style={styles.dateDot} />}
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {showDatePicker && (
            <DateTimePicker
              value={currentDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onDateChange}
            />
          )}
        </View>

        {/* Available Times Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Times</Text>
          <View style={styles.timesGrid}>
            {timeSlots.map((time) => {
              const isSelected = selectedTime === time;
              return (
                <TouchableOpacity
                  key={time}
                  onPress={() => setSelectedTime(time)}
                  activeOpacity={0.8}
                  style={[
                    styles.timeSlot,
                    isSelected && styles.timeSlotSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.timeSlotText,
                      isSelected && styles.timeSlotTextSelected,
                    ]}
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Subject & Focus Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Subject & Focus</Text>

          {/* Subject Pills */}
          <View style={styles.subjectsRow}>
            {subjects.map((sub) => {
              const isSelected = selectedSubject === sub;
              return (
                <TouchableOpacity
                  key={sub}
                  onPress={() => setSelectedSubject(sub)}
                  style={[
                    styles.subjectPill,
                    isSelected && styles.subjectPillSelected,
                  ]}
                >
                  {isSelected && (
                    <Feather name="check" size={14} color="#4A453A" />
                  )}
                  <Text
                    style={[
                      styles.subjectPillText,
                      isSelected && styles.subjectPillTextSelected,
                    ]}
                  >
                    {sub}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Optional Notes Input Box */}
          <View style={styles.noteBox}>
            <TextInput
              placeholder="What specific topics or problems would you like to cover? (Optional)"
              placeholderTextColor="#9CA3AF"
              multiline
              textAlignVertical="top"
              value={note}
              onChangeText={setNote}
              style={styles.noteInput}
            />
            <View style={styles.noteIconWrapper}>
              <MaterialCommunityIcons
                name="square-edit-outline"
                size={16}
                color="#9CA3AF"
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Bottom Booking Confirmation Card */}
      <View style={styles.bottomCard}>
        <View style={styles.costRow}>
          <View>
            <Text style={styles.costLabel}>TOTAL COST</Text>
            <Text style={styles.costSub}>1 Hour Session</Text>
          </View>
          <Text style={styles.costValue}>Rs 800.00</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.confirmButton}
          onPress={() => {
            // TODO: implement booking confirmation
          }}
        >
          <Text style={styles.confirmButtonText}>Confirm Booking</Text>
          <Feather name="arrow-right" size={16} color="#FFFFFF" />
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

  // Header
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 8,
  },
  iconButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#A33A19",
  },

  // Scroll content
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 160, // space for bottom card
  },

  // Tutor card
  tutorCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 24,
  },
  tutorImage: {
    width: 56,
    height: 56,
    borderRadius: 16,
  },
  tutorInfo: {
    flex: 1,
  },
  tutorName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
  },
  tutorRole: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
    marginTop: 2,
  },

  // Generic section
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
  },

  // Date picker button
  datePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#F9FAFB",
  },
  datePickerText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
  },

  // Dates scroll
  datesScroll: {
    gap: 10,
  },
  dateBox: {
    width: 64,
    height: 80,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    borderColor: "rgba(229, 231, 235, 0.8)",
  },
  dateBoxSelected: {
    backgroundColor: "#FF7A45",
    borderColor: "#FF7A45",
  },
  dateBoxDisabled: {
    backgroundColor: "#F4F1EA",
    borderColor: "transparent",
  },
  dateDayText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
  },
  dateDayTextSelected: {
    color: "#FFFFFF",
  },
  dateDayTextDisabled: {
    color: "#9CA3AF",
  },
  dateNumText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
    marginTop: 4,
  },
  dateNumTextSelected: {
    color: "#FFFFFF",
  },
  dateNumTextDisabled: {
    color: "#9CA3AF",
  },
  dateDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FFFFFF",
    marginTop: 4,
  },

  // Time slots
  timesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  timeSlot: {
    width: "31%",
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    borderColor: "rgba(229, 231, 235, 0.8)",
  },
  timeSlotSelected: {
    backgroundColor: "#FF7A45",
    borderColor: "#FF7A45",
  },
  timeSlotText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1F2937",
  },
  timeSlotTextSelected: {
    color: "#FFFFFF",
  },

  // Subjects
  subjectsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  subjectPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    borderColor: "rgba(229, 231, 235, 0.8)",
  },
  subjectPillSelected: {
    backgroundColor: "#EAE3D2",
    borderColor: "#EAE3D2",
  },
  subjectPillText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#374151",
  },
  subjectPillTextSelected: {
    color: "#4A453A",
  },

  // Note box
  noteBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(229, 231, 235, 0.8)",
    minHeight: 110,
    position: "relative",
  },
  noteInput: {
    fontSize: 12,
    color: "#1F2937",
    lineHeight: 20,
    paddingRight: 24,
  },
  noteIconWrapper: {
    position: "absolute",
    bottom: 12,
    right: 12,
  },

  // Bottom booking card
  bottomCard: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
  },
  costRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  costLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: "#9CA3AF",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  costSub: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1F2937",
    marginTop: 2,
  },
  costValue: {
    fontSize: 22,
    fontWeight: "900",
    color: "#111827",
  },
  confirmButton: {
    backgroundColor: "#FF7A45",
    paddingVertical: 14,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: "#FF7A45",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  confirmButtonText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
  },
});

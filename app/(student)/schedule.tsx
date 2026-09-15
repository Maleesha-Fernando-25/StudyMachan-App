import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type ViewMode = "Month" | "Week" | "Agenda";

type CalendarDay = {
  day: number;
  isCurrentMonth: boolean;
  isSunday?: boolean;
  dots?: string[];
};

const CALENDAR_DAYS: CalendarDay[] = [
  { day: 29, isCurrentMonth: false },
  { day: 30, isCurrentMonth: false },
  { day: 1, isCurrentMonth: true },
  { day: 2, isCurrentMonth: true },
  { day: 3, isCurrentMonth: true, dots: ["#00B8A9"] },
  { day: 4, isCurrentMonth: true },
  { day: 5, isCurrentMonth: true, isSunday: true },
  { day: 6, isCurrentMonth: true },
  { day: 7, isCurrentMonth: true, dots: ["#FF7A45"] },
  { day: 8, isCurrentMonth: true },
  { day: 9, isCurrentMonth: true, dots: ["#F7B731"] },
  { day: 10, isCurrentMonth: true },
  { day: 11, isCurrentMonth: true, dots: ["#00B8A9"] },
  { day: 12, isCurrentMonth: true, isSunday: true },
  { day: 13, isCurrentMonth: true },
  { day: 14, isCurrentMonth: true },
  { day: 15, isCurrentMonth: true, dots: ["#FF7A45"] },
  { day: 16, isCurrentMonth: true },
  { day: 17, isCurrentMonth: true },
  { day: 18, isCurrentMonth: true },
  { day: 19, isCurrentMonth: true, isSunday: true },
  { day: 20, isCurrentMonth: true, dots: ["#F7B731"] },
  { day: 21, isCurrentMonth: true },
  { day: 22, isCurrentMonth: true },
  { day: 23, isCurrentMonth: true },
  {
    day: 24,
    isCurrentMonth: true,
    dots: ["#FF7A45", "#00B8A9", "#F7B731"],
  },
  { day: 25, isCurrentMonth: true },
  { day: 26, isCurrentMonth: true, isSunday: true },
  { day: 27, isCurrentMonth: true },
  { day: 28, isCurrentMonth: true, dots: ["#FF7A45"] },
  { day: 29, isCurrentMonth: true },
  { day: 30, isCurrentMonth: true },
  { day: 31, isCurrentMonth: true },
  { day: 1, isCurrentMonth: false },
  { day: 2, isCurrentMonth: false },
];

const WEEK_DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

export default function StudyScheduleScreen() {
  const router = useRouter();

  const [viewMode, setViewMode] = useState<ViewMode>("Month");
  const [selectedDay, setSelectedDay] = useState(24);

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

        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Study Schedule</Text>
          <Text style={styles.headerSubtitle}>Manage your classes & focus</Text>
        </View>

        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Date selector and view switcher */}
        <View style={styles.dateViewRow}>
          <View style={styles.monthSelector}>
            <TouchableOpacity
              style={styles.monthArrowButton}
              activeOpacity={0.7}
            >
              <Feather name="chevron-left" size={16} color="#5C534B" />
            </TouchableOpacity>

            <Text style={styles.monthText}>October 2026</Text>

            <TouchableOpacity
              style={styles.monthArrowButton}
              activeOpacity={0.7}
            >
              <Feather name="chevron-right" size={16} color="#5C534B" />
            </TouchableOpacity>
          </View>

          <View style={styles.viewModeContainer}>
            {(["Month", "Week", "Agenda"] as ViewMode[]).map((mode) => {
              const isSelected = viewMode === mode;

              return (
                <TouchableOpacity
                  key={mode}
                  onPress={() => setViewMode(mode)}
                  activeOpacity={0.8}
                  style={[
                    styles.viewModeButton,
                    isSelected && styles.viewModeButtonSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.viewModeText,
                      isSelected && styles.viewModeTextSelected,
                    ]}
                  >
                    {mode}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Calendar */}
        <View style={styles.calendarCard}>
          <View style={styles.weekHeader}>
            {WEEK_DAYS.map((day, index) => (
              <Text
                key={day}
                style={[styles.weekDayText, index === 6 && styles.sundayText]}
              >
                {day}
              </Text>
            ))}
          </View>

          <View style={styles.calendarGrid}>
            {CALENDAR_DAYS.map((item, index) => {
              const isSelected =
                selectedDay === item.day && item.isCurrentMonth;

              return (
                <TouchableOpacity
                  key={`${item.day}-${index}`}
                  activeOpacity={0.8}
                  onPress={() => {
                    if (item.isCurrentMonth) {
                      setSelectedDay(item.day);
                    }
                  }}
                  style={styles.calendarDayButton}
                  disabled={!item.isCurrentMonth}
                >
                  <View
                    style={[
                      styles.calendarDayCircle,
                      isSelected && styles.calendarDayCircleSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.calendarDayText,
                        !item.isCurrentMonth && styles.calendarDayTextOutside,
                        item.isSunday &&
                          item.isCurrentMonth &&
                          styles.calendarDayTextSunday,
                        isSelected && styles.calendarDayTextSelected,
                      ]}
                    >
                      {item.day}
                    </Text>
                  </View>

                  {item.dots && (
                    <View style={styles.dotsRow}>
                      {item.dots.map((color, dotIndex) => (
                        <View
                          key={`${color}-${dotIndex}`}
                          style={[
                            styles.calendarDot,
                            {
                              backgroundColor: isSelected ? "#FFFFFF" : color,
                            },
                          ]}
                        />
                      ))}
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Calendar legend */}
          <View style={styles.legend}>
            <LegendItem color="#FF7A45" label="1-on-1 Tutors" />
            <LegendItem color="#00B8A9" label="Collab Room" />
            <LegendItem color="#F7B731" label="Prep / Quiz" />
          </View>
        </View>

        {/* Day header */}
        <View style={styles.dayHeaderRow}>
          <View style={styles.dayHeaderLeft}>
            <Text style={styles.dayTitle}>Wednesday, Oct 24</Text>

            <View style={styles.todayBadge}>
              <Text style={styles.todayBadgeText}>Today</Text>
            </View>
          </View>

          <View style={styles.sessionsBadge}>
            <Text style={styles.sessionsBadgeText}>3 Sessions</Text>
          </View>
        </View>

        <Text style={styles.daySubtitle}>
          Upcoming commitments for this day
        </Text>

        {/* Session 1 */}
        <View style={[styles.sessionCard, styles.sessionCardOrange]}>
          <View style={styles.sessionTopRow}>
            <Text style={styles.sessionTime}>04:00 PM – 05:00 PM</Text>

            <View style={styles.sessionBadges}>
              <View style={styles.inMinutesBadge}>
                <View style={styles.redStatusDot} />
                <Text style={styles.inMinutesText}>In 45 Mins</Text>
              </View>

              <View style={styles.subjectBadgeOrange}>
                <Text style={styles.subjectBadgeOrangeText}>
                  A/L Maths Theory
                </Text>
              </View>
            </View>
          </View>

          <Text style={styles.sessionTitle}>
            Integration & Calculus Masterclass: Past Paper Discussion
          </Text>

          <View style={styles.tutorInfoCard}>
            <View style={styles.tutorInfoLeft}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
                }}
                style={styles.smallTutorAvatar}
              />

              <View>
                <View style={styles.verifiedTutorRow}>
                  <Text style={styles.tutorInfoName}>Dr. Sarah Jenkins</Text>
                  <Ionicons name="checkmark-circle" size={14} color="#2563EB" />
                </View>

                <Text style={styles.tutorInfoSubtitle}>
                  University of Colombo Alum
                </Text>
              </View>
            </View>

            <View style={styles.platformContainer}>
              <Text style={styles.platformLabel}>Platform</Text>

              <View style={styles.platformRow}>
                <Ionicons name="videocam" size={12} color="#00B8A9" />
                <Text style={styles.platformText}>Google Meet</Text>
              </View>
            </View>
          </View>

          <View style={styles.sessionActions}>
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.joinLiveButton}
            >
              <Feather name="video" size={14} color="#FFFFFF" />
              <Text style={styles.joinLiveText}>Join Live Class</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.85} style={styles.notesButton}>
              <Text style={styles.notesButtonText}>Notes & Link</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Session 2 */}
        <View style={styles.sessionCard}>
          <View style={styles.sessionTopRow}>
            <Text style={styles.sessionTime}>06:30 PM – 07:30 PM</Text>

            <View style={styles.sessionBadges}>
              <View style={styles.confirmedBadge}>
                <Text style={styles.confirmedText}>Confirmed</Text>
              </View>

              <View style={styles.subjectBadgeNeutral}>
                <Text style={styles.subjectBadgeNeutralText}>
                  Physics Past Papers
                </Text>
              </View>
            </View>
          </View>

          <Text style={styles.sessionTitle}>
            Circular Motion & Gravitation Speed Revision
          </Text>

          <View style={styles.simpleTutorRow}>
            <View style={styles.tutorInfoLeft}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
                }}
                style={styles.smallTutorAvatar}
              />

              <View>
                <Text style={styles.tutorInfoName}>Kavinda Perera</Text>
                <Text style={styles.tutorInfoSubtitle}>
                  BSc Eng (Hons) Moratuwa
                </Text>
              </View>
            </View>

            <View style={styles.zoomBadge}>
              <Text style={styles.zoomBadgeText}>Zoom Room Ready</Text>
            </View>
          </View>

          <View style={styles.sessionFooter}>
            <TouchableOpacity
              style={styles.rescheduleButton}
              activeOpacity={0.8}
            >
              <Text style={styles.rescheduleText}>Reschedule</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.viewSyllabusButton}
              activeOpacity={0.8}
            >
              <Text style={styles.viewSyllabusText}>View Syllabus</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Session 3 */}
        <View style={[styles.sessionCard, styles.sessionCardTeal]}>
          <View style={styles.sessionTopRow}>
            <Text style={styles.sessionTime}>08:30 PM – 09:30 PM</Text>

            <View style={styles.sessionBadges}>
              <View style={styles.focusBadge}>
                <Text style={styles.focusBadgeText}>Focus Collab</Text>
              </View>

              <View style={styles.focusBadge}>
                <Text style={styles.focusBadgeText}>#AL-MATHS-88</Text>
              </View>
            </View>
          </View>

          <Text style={styles.sessionTitle}>
            Silent Group Focus Sprint: Calculus Drills
          </Text>

          <Text style={styles.groupDescription}>
            5 study buddies already accepted attendance
          </Text>

          <View style={styles.groupFooter}>
            <View style={styles.avatarStack}>
              <View style={[styles.stackAvatar, styles.stackAvatarOrange]}>
                <Text style={styles.stackAvatarText}>AS</Text>
              </View>

              <View style={[styles.stackAvatar, styles.stackAvatarBlue]}>
                <Text style={styles.stackAvatarText}>KR</Text>
              </View>

              <View style={[styles.stackAvatar, styles.stackAvatarGreen]}>
                <Text style={styles.stackAvatarText}>DJ</Text>
              </View>

              <View style={[styles.stackAvatar, styles.stackAvatarGray]}>
                <Text style={styles.stackAvatarText}>+2</Text>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.joinRoomButton}
            >
              <Feather name="user" size={14} color="#FFFFFF" />
              <Text style={styles.joinRoomText}>Join Room</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {/* Home - inactive */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/student-home" as any)}
          activeOpacity={0.8}
          hitSlop={{ top: 8, bottom: 8, left: 10, right: 10 }}
        >
          <Ionicons name="home" size={20} color="#9CA3AF" />
          <Text style={styles.navTextInactive}>Home</Text>
        </TouchableOpacity>

        {/* Focus - inactive */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/stay-focus" as any)}
          activeOpacity={0.8}
          hitSlop={{ top: 8, bottom: 8, left: 10, right: 10 }}
        >
          <Feather name="clock" size={20} color="#9CA3AF" />
          <Text style={styles.navTextInactive}>Focus</Text>
        </TouchableOpacity>

        {/* Schedule - active */}
        <TouchableOpacity
          style={styles.navItem}
          activeOpacity={0.8}
          hitSlop={{ top: 8, bottom: 8, left: 10, right: 10 }}
        >
          <View style={styles.scheduleIconWrapper}>
            <Feather name="calendar" size={20} color="#FF6B35" />
            <View style={styles.navIndicator} />
          </View>

          <Text style={styles.navTextActive}>Schedule</Text>
        </TouchableOpacity>

        {/* Alerts - inactive */}
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
    </SafeAreaView>
  );
}

type LegendItemProps = {
  color: string;
  label: string;
};

function LegendItem({ color, label }: LegendItemProps) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendDot, { backgroundColor: color }]} />
      <Text style={styles.legendText}>{label}</Text>
    </View>
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
  },

  headerPlaceholder: {
    width: 44,
    height: 44,
  },

  headerTextContainer: {
    flex: 1,
    marginLeft: 12,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#A33A19",
  },

  headerSubtitle: {
    fontSize: 12,
    color: "#7A7263",
    fontWeight: "600",
    marginTop: 3,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 150,
  },

  dateViewRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  monthSelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#EFE8DC",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  monthArrowButton: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },

  monthText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#2A231D",
    marginHorizontal: 4,
  },

  viewModeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFE8DC",
    padding: 4,
    borderRadius: 16,
  },

  viewModeButton: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 12,
  },

  viewModeButtonSelected: {
    backgroundColor: "#FFFFFF",
  },

  viewModeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#7A7263",
  },

  viewModeTextSelected: {
    color: "#2A231D",
  },

  calendarCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: "#EFE8DC",
    boxShadow: "0px 1px 3px rgba(0,0,0,0.04)",
    marginBottom: 18,
  },

  weekHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingHorizontal: 2,
  },

  weekDayText: {
    width: 36,
    textAlign: "center",
    fontSize: 11,
    fontWeight: "800",
    color: "#8C8377",
  },

  sundayText: {
    color: "#E53E3E",
  },

  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 8,
  },

  calendarDayButton: {
    width: "13%",
    minHeight: 46,
    alignItems: "center",
    justifyContent: "flex-start",
    position: "relative",
  },

  calendarDayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  calendarDayCircleSelected: {
    backgroundColor: "#FF7A45",
  },

  calendarDayText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#2A231D",
  },

  calendarDayTextOutside: {
    color: "#C5BEB3",
  },

  calendarDayTextSunday: {
    color: "#E53E3E",
  },

  calendarDayTextSelected: {
    color: "#FFFFFF",
  },

  dotsRow: {
    flexDirection: "row",
    gap: 2,
    marginTop: 2,
  },

  calendarDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },

  legend: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 18,
    paddingTop: 12,
    paddingHorizontal: 2,
    borderTopWidth: 1,
    borderTopColor: "#F5F0E6",
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  legendText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#7A7263",
  },

  dayHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 2,
    marginBottom: 6,
  },

  dayHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },

  dayTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2A231D",
  },

  todayBadge: {
    backgroundColor: "#FFE8E0",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },

  todayBadgeText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#FF7A45",
  },

  sessionsBadge: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#EFE8DC",
  },

  sessionsBadgeText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#7A7263",
  },

  daySubtitle: {
    fontSize: 12,
    color: "#8C8377",
    fontWeight: "600",
    marginBottom: 16,
  },

  sessionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: "#EFE8DC",
    boxShadow: "0px 1px 3px rgba(0,0,0,0.04)",
    marginBottom: 16,
  },

  sessionCardOrange: {
    borderColor: "#FFD3C4",
  },

  sessionCardTeal: {
    borderColor: "#B2EBF2",
  },

  sessionTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 10,
  },

  sessionTime: {
    fontSize: 14,
    fontWeight: "800",
    color: "#2A231D",
    flexShrink: 1,
  },

  sessionBadges: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    flexShrink: 1,
  },

  inMinutesBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FFEBE5",
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 999,
  },

  redStatusDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#E53E3E",
  },

  inMinutesText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#E53E3E",
  },

  subjectBadgeOrange: {
    backgroundColor: "#FFF2EB",
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 999,
  },

  subjectBadgeOrangeText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#D96B43",
  },

  confirmedBadge: {
    backgroundColor: "#E6F4EA",
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 999,
  },

  confirmedText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#137333",
  },

  subjectBadgeNeutral: {
    backgroundColor: "#F4EFEA",
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 999,
  },

  subjectBadgeNeutralText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#5C534B",
  },

  focusBadge: {
    backgroundColor: "#E0F7FA",
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 999,
  },

  focusBadgeText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#00838F",
  },

  sessionTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "800",
    color: "#2A231D",
    marginBottom: 12,
  },

  tutorInfoCard: {
    backgroundColor: "#FAF6F0",
    borderRadius: 16,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  tutorInfoLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 10,
  },

  smallTutorAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },

  verifiedTutorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  tutorInfoName: {
    fontSize: 12,
    fontWeight: "800",
    color: "#2A231D",
  },

  tutorInfoSubtitle: {
    fontSize: 10,
    color: "#8C8377",
    fontWeight: "600",
    marginTop: 2,
  },

  platformContainer: {
    alignItems: "flex-end",
  },

  platformLabel: {
    fontSize: 10,
    color: "#8C8377",
    fontWeight: "600",
  },

  platformRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 3,
  },

  platformText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#2A231D",
  },

  sessionActions: {
    flexDirection: "row",
    gap: 8,
  },

  joinLiveButton: {
    flex: 1,
    backgroundColor: "#FF7A45",
    paddingVertical: 10,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },

  joinLiveText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  notesButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DCD6CC",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  notesButtonText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#2A231D",
  },

  simpleTutorRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  zoomBadge: {
    backgroundColor: "#FAF6F0",
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EFE8DC",
  },

  zoomBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#5C534B",
  },

  sessionFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 4,
  },

  rescheduleButton: {
    paddingHorizontal: 4,
    paddingVertical: 6,
  },

  rescheduleText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#5C534B",
  },

  viewSyllabusButton: {
    backgroundColor: "#FFF0EB",
    borderWidth: 1,
    borderColor: "#FFD3C4",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },

  viewSyllabusText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#D96B43",
  },

  groupDescription: {
    fontSize: 11,
    color: "#8C8377",
    fontWeight: "600",
    marginTop: -6,
    marginBottom: 8,
  },

  groupFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  avatarStack: {
    flexDirection: "row",
    alignItems: "center",
  },

  stackAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    marginLeft: -6,
  },

  stackAvatarOrange: {
    backgroundColor: "#FF9F43",
    marginLeft: 0,
  },

  stackAvatarBlue: {
    backgroundColor: "#54A0FF",
  },

  stackAvatarGreen: {
    backgroundColor: "#10AC84",
  },

  stackAvatarGray: {
    backgroundColor: "#8395A7",
  },

  stackAvatarText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  joinRoomButton: {
    backgroundColor: "#00838F",
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  joinRoomText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  bottomNav: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingVertical: 12,
    paddingHorizontal: 24,
    paddingBottom: 16,
    minHeight: 72,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0px -2px 4px rgba(0,0,0,0.06)",
  },

  navItem: {
    minWidth: 60,
    minHeight: 54,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingVertical: 5,
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

  navIndicator: {
    position: "absolute",
    top: -4,
    right: -4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF6B35",
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

  scheduleIconWrapper: {
    position: "relative",
  },
});

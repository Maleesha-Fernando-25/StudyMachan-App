import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons
} from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function TeachingScheduleScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />

      {/* Header – moved lower for better visibility */}
      <View style={styles.topBar}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Feather name="arrow-left" size={22} color="#FF6B35" />
          </TouchableOpacity>

          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Teaching Schedule</Text>
            <Text style={styles.headerSubtitle}>
              Manage bookings & student classes
            </Text>
          </View>

          <View style={styles.headerRightPlaceholder} />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Calendar Controls */}
        <View style={styles.calendarControls}>
          <View style={styles.monthSelector}>
            <Feather name="chevron-left" size={16} color="#333" />
            <Text style={styles.monthText}>October 2026</Text>
            <Feather name="chevron-right" size={16} color="#333" />
          </View>

          <View style={styles.viewToggle}>
            <View style={styles.activeToggle}>
              <Text style={styles.activeToggleText}>Month</Text>
            </View>
            <Text style={styles.inactiveToggleText}>Week</Text>
            <Text style={styles.inactiveToggleText}>Agenda</Text>
          </View>
        </View>

        {/* Calendar Grid */}
        <View style={styles.calendarCard}>
          <View style={styles.daysHeader}>
            {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day, i) => (
              <Text
                key={day}
                style={[styles.dayHeaderText, i === 6 && { color: '#FF5A5F' }]}
              >
                {day}
              </Text>
            ))}
          </View>

          {/* Week 1 */}
          <View style={styles.weekRow}>
            <View style={styles.dayCell}>
              <Text style={styles.fadedDay}>29</Text>
            </View>
            <View style={styles.dayCell}>
              <Text style={styles.fadedDay}>30</Text>
            </View>
            <View style={styles.dayCell}>
              <Text style={styles.dayText}>1</Text>
            </View>
            <View style={styles.dayCell}>
              <Text style={styles.dayText}>2</Text>
            </View>
            <View style={styles.dayCell}>
              <Text style={styles.dayText}>3</Text>
              <View style={styles.dotContainer}>
                <View style={[styles.dot, { backgroundColor: '#4A90E2' }]} />
              </View>
            </View>
            <View style={styles.dayCell}>
              <Text style={styles.dayText}>4</Text>
            </View>
            <View style={styles.dayCell}>
              <Text style={[styles.dayText, { color: '#FF5A5F' }]}>5</Text>
            </View>
          </View>

          {/* Week 2 */}
          <View style={styles.weekRow}>
            <View style={styles.dayCell}>
              <Text style={styles.dayText}>6</Text>
            </View>
            <View style={styles.dayCell}>
              <Text style={styles.dayText}>7</Text>
              <View style={styles.dotContainer}>
                <View style={[styles.dot, { backgroundColor: '#F58252' }]} />
              </View>
            </View>
            <View style={styles.dayCell}>
              <Text style={styles.dayText}>8</Text>
            </View>
            <View style={styles.dayCell}>
              <Text style={styles.dayText}>9</Text>
              <View style={styles.dotContainer}>
                <View style={[styles.dot, { backgroundColor: '#9B51E0' }]} />
              </View>
            </View>
            <View style={styles.dayCell}>
              <Text style={styles.dayText}>10</Text>
            </View>
            <View style={styles.dayCell}>
              <Text style={styles.dayText}>11</Text>
              <View style={styles.dotContainer}>
                <View style={[styles.dot, { backgroundColor: '#4A90E2' }]} />
              </View>
            </View>
            <View style={styles.dayCell}>
              <Text style={[styles.dayText, { color: '#FF5A5F' }]}>12</Text>
            </View>
          </View>

          {/* Week 3 */}
          <View style={styles.weekRow}>
            <View style={styles.dayCell}>
              <Text style={styles.dayText}>13</Text>
            </View>
            <View style={styles.dayCell}>
              <Text style={styles.dayText}>14</Text>
            </View>
            <View style={styles.dayCell}>
              <Text style={styles.dayText}>15</Text>
              <View style={styles.dotContainer}>
                <View style={[styles.dot, { backgroundColor: '#F58252' }]} />
              </View>
            </View>
            <View style={styles.dayCell}>
              <Text style={styles.dayText}>16</Text>
            </View>
            <View style={styles.dayCell}>
              <Text style={styles.dayText}>17</Text>
            </View>
            <View style={styles.dayCell}>
              <Text style={styles.dayText}>18</Text>
            </View>
            <View style={styles.dayCell}>
              <Text style={[styles.dayText, { color: '#FF5A5F' }]}>19</Text>
            </View>
          </View>

          {/* Week 4 */}
          <View style={styles.weekRow}>
            <View style={styles.dayCell}>
              <Text style={styles.dayText}>20</Text>
              <View style={styles.dotContainer}>
                <View style={[styles.dot, { backgroundColor: '#9B51E0' }]} />
              </View>
            </View>
            <View style={styles.dayCell}>
              <Text style={styles.dayText}>21</Text>
            </View>
            <View style={styles.dayCell}>
              <Text style={styles.dayText}>22</Text>
            </View>
            <View style={styles.dayCell}>
              <Text style={styles.dayText}>23</Text>
            </View>
            <View style={styles.dayCell}>
              <View style={styles.selectedDayBg}>
                <Text style={styles.selectedDayText}>24</Text>
              </View>
              <View style={styles.dotContainerRow}>
                <View style={[styles.dot, { backgroundColor: '#F58252' }]} />
                <View
                  style={[
                    styles.dot,
                    { backgroundColor: '#4A90E2', marginHorizontal: 2 },
                  ]}
                />
                <View style={[styles.dot, { backgroundColor: '#9B51E0' }]} />
              </View>
            </View>
            <View style={styles.dayCell}>
              <Text style={styles.dayText}>25</Text>
            </View>
            <View style={styles.dayCell}>
              <Text style={[styles.dayText, { color: '#FF5A5F' }]}>26</Text>
            </View>
          </View>

          {/* Week 5 */}
          <View style={styles.weekRow}>
            <View style={styles.dayCell}>
              <Text style={styles.dayText}>27</Text>
            </View>
            <View style={styles.dayCell}>
              <Text style={styles.dayText}>28</Text>
              <View style={styles.dotContainer}>
                <View style={[styles.dot, { backgroundColor: '#F58252' }]} />
              </View>
            </View>
            <View style={styles.dayCell}>
              <Text style={styles.dayText}>29</Text>
            </View>
            <View style={styles.dayCell}>
              <Text style={styles.dayText}>30</Text>
            </View>
            <View style={styles.dayCell}>
              <Text style={styles.dayText}>31</Text>
            </View>
            <View style={styles.dayCell}>
              <Text style={styles.fadedDay}>1</Text>
            </View>
            <View style={styles.dayCell}>
              <Text style={styles.fadedDay}>2</Text>
            </View>
          </View>

          {/* Legend */}
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendDot, { backgroundColor: '#F58252' }]}
              />
              <Text style={styles.legendText}>1-on-1 Lesson</Text>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendDot, { backgroundColor: '#4A90E2' }]}
              />
              <Text style={styles.legendText}>Group Class</Text>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendDot, { backgroundColor: '#9B51E0' }]}
              />
              <Text style={styles.legendText}>Mock Review</Text>
            </View>
          </View>
        </View>

        {/* Schedule Header */}
        <View style={styles.scheduleHeader}>
          <View style={styles.scheduleHeaderRow}>
            <Text style={styles.dateTitle}>Wednesday, Aug 24</Text>
            <View style={styles.todayBadge}>
              <Text style={styles.todayText}>TODAY</Text>
            </View>
            <View style={{ flex: 1 }} />
            <View style={styles.sessionsBadge}>
              <Text style={styles.sessionsText}>3 Sessions</Text>
            </View>
          </View>
          <Text style={styles.earningsText}>
            Estimated Earnings:{' '}
            <Text style={styles.earningsAmount}>LKR 6,500</Text>{' '}
            <Text style={styles.confirmedText}>(All Confirmed)</Text>
          </Text>
        </View>

        {/* Card 1 - Organic Chemistry */}
        <View style={[styles.sessionCard, { borderColor: '#FAD8C7' }]}>
          <View style={styles.cardHeader}>
            <Text style={styles.timeText}>03:30 PM – 04:30 PM</Text>
            <View
              style={[styles.tagBadge, { backgroundColor: '#FFF0E6' }]}
            >
              <Text style={[styles.tagText, { color: '#E86E3A' }]}>
                A/L Chemistry Theory
              </Text>
            </View>
          </View>
          <Text style={styles.subjectTitle}>Organic Chemistry</Text>

          <View style={styles.studentPlatformRow}>
            <View style={styles.studentInfo}>
              <View
                style={[styles.avatar, { backgroundColor: '#F58252' }]}
              >
                <Text style={styles.avatarText}>AR</Text>
              </View>
              <View style={styles.studentDetails}>
                <View
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                >
                  <Text style={styles.studentName}>
                    Randika Jayasinghe
                  </Text>
                  <MaterialCommunityIcons
                    name="check-decagram"
                    size={14}
                    color="#4A90E2"
                    style={{ marginLeft: 4 }}
                  />
                </View>
                <Text style={styles.studentSub}>
                  G.C.E. A/L 2026 • 1-on-1
                </Text>
              </View>
            </View>
            <View style={styles.platformInfo}>
              <Text style={styles.platformLabel}>PLATFORM</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.greenDot} />
                <Text style={styles.platformName}>Google Meet</Text>
              </View>
            </View>
          </View>

          <View style={styles.feeStatusRow}>
            <Text style={styles.feeText}>Fee: LKR 6,500</Text>
            <Text style={styles.statusText}>✓ Paid to Wallet</Text>
          </View>

          <View style={styles.actionButtonsRow}>
            <TouchableOpacity style={styles.primaryButton}>
              <Feather
                name="video"
                size={16}
                color="#FFF"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.primaryButtonText}>
                Start Live Class
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>
                Notes & Whiteboard
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Card 2 - Inorganic Chemistry */}
        <View style={styles.sessionCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.timeText}>05:30 PM – 07:00 PM</Text>
            <View
              style={[styles.tagBadge, { backgroundColor: '#F0F4FF' }]}
            >
              <Text style={[styles.tagText, { color: '#4A90E2' }]}>
                Chemistry
              </Text>
            </View>
          </View>
          <Text style={styles.subjectTitle}>Inorganic Chemistry</Text>

          <View style={styles.groupInfoRow}>
            <View style={styles.stackedAvatarsContainer}>
              <View
                style={[
                  styles.smallAvatar,
                  { backgroundColor: '#4A90E2', zIndex: 3 },
                ]}
              >
                <Text style={styles.smallAvatarText}>NE</Text>
              </View>
              <View
                style={[
                  styles.smallAvatar,
                  {
                    backgroundColor: '#9B51E0',
                    zIndex: 2,
                    marginLeft: -10,
                  },
                ]}
              >
                <Text style={styles.smallAvatarText}>TU</Text>
              </View>
              <View
                style={[
                  styles.smallAvatar,
                  {
                    backgroundColor: '#E0E0E0',
                    zIndex: 1,
                    marginLeft: -10,
                  },
                ]}
              >
                <Text
                  style={[styles.smallAvatarText, { color: '#555' }]}
                >
                  +2
                </Text>
              </View>
              <View style={styles.groupDetails}>
                <Text style={styles.studentName}>Naveen & 3 Students</Text>
                <Text style={styles.studentSub}>
                  Group Batch (4 Enrolled)
                </Text>
              </View>
            </View>
            <View style={styles.zoomReadyBadge}>
              <Text style={styles.zoomReadyText}>Zoom Ready</Text>
            </View>
          </View>

          <View style={styles.earningsActionRow}>
            <Text style={styles.feeText}>
              Earnings:{' '}
              <Text style={{ fontWeight: '700' }}>LKR 3,200</Text>
            </Text>
            <View
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <TouchableOpacity>
                <Text style={styles.viewHomeworkText}>
                  View Homework
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.launchZoomButton}>
                <Text style={styles.launchZoomText}>
                  Launch Zoom
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Card 3 - Atomic Structure */}
        <View style={styles.sessionCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.timeText}>08:00 PM – 09:00 PM</Text>
            <View
              style={[styles.tagBadge, { backgroundColor: '#F9F0FF' }]}
            >
              <Text style={[styles.tagText, { color: '#9B51E0' }]}>
                A/L Chemistry Theory
              </Text>
            </View>
          </View>
          <Text style={styles.subjectTitle}>Atomic Structure</Text>

          <View style={styles.bottomCardRow}>
            <View style={styles.studentInfoSimple}>
              <View
                style={[
                  styles.smallAvatar,
                  {
                    backgroundColor: '#E0E0E0',
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                  },
                ]}
              >
                <Text
                  style={[styles.smallAvatarText, { color: '#555' }]}
                >
                  SS
                </Text>
              </View>
              <View style={styles.studentDetails}>
                <Text style={styles.studentName}>Sanduni Senaratne</Text>
                <Text style={styles.studentSub}>
                  1-on-1 • LKR 1,800
                </Text>
              </View>
            </View>
            <View style={styles.actionButtonsRight}>
              <TouchableOpacity>
                <Text style={styles.rescheduleText}>Reschedule</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.detailsButton}>
                <Text style={styles.detailsButtonText}>Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryIconBox}>
            <Feather name="clock" size={20} color="#FFF" />
          </View>
          <View style={styles.summaryDetails}>
            <Text style={styles.summaryTitle}>Today's Teaching Hours</Text>
            <Text style={styles.summarySub}>
              02:00 PM – 09:30 PM • 3 Slots Booked
            </Text>
          </View>
          <TouchableOpacity style={styles.editSlotsButton}>
            <Text style={styles.editSlotsText}>Edit Slots</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation – same as tutor home, Schedule highlighted */}
      <View style={styles.bottomNav}>
        {/* Home */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/tutor-home')}
        >
          <Ionicons name="home" size={20} color="#9CA3AF" />
          <Text style={styles.navTextInactive}>Home</Text>
        </TouchableOpacity>

        {/* My Schedule (Active) */}
        <TouchableOpacity style={styles.navItem}>
          <Feather name="calendar" size={18} color="#FF6B35" />
          <Text style={styles.navTextActive}>My Schedule</Text>
          <View style={styles.navIndicator} />
        </TouchableOpacity>

        {/* Earnings */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/earnings')}
        >
          <MaterialCommunityIcons
            name="wallet-outline"
            size={18}
            color="#9CA3AF"
          />
          <Text style={styles.navTextInactive}>Earnings</Text>
        </TouchableOpacity>

        {/* Reviews */}
        <TouchableOpacity style={styles.navItem}>
          <FontAwesome name="star" size={16} color="#9CA3AF" />
          <Text style={styles.navTextInactive}>Reviews</Text>
        </TouchableOpacity>

        {/* Notifications */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/messages')}
        >
          <Feather name="bell" size={18} color="#9CA3AF" />
          <Text style={styles.navTextInactive}>Notifications</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF7F2',
  },

  // Top bar with back arrow – lowered for visibility
  topBar: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 14,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  headerTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#6D3F2E',
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#E86E3A',
    marginTop: 2,
  },
  headerRightPlaceholder: {
    width: 40,
  },

  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 120,
  },

  calendarControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  monthText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginHorizontal: 10,
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 2,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  activeToggle: {
    backgroundColor: '#F9F9F9',
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  activeToggleText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  inactiveToggleText: {
    fontSize: 13,
    color: '#888',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  calendarCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  daysHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  dayHeaderText: {
    fontSize: 12,
    color: '#A0A0A0',
    fontWeight: '500',
    width: 30,
    textAlign: 'center',
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  dayCell: {
    width: 32,
    height: 36,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  dayText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  fadedDay: {
    fontSize: 13,
    fontWeight: '500',
    color: '#D0D0D0',
  },
  selectedDayBg: {
    backgroundColor: '#F58252',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  selectedDayText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFF',
  },
  dotContainer: {
    height: 4,
    justifyContent: 'center',
    marginTop: 2,
  },
  dotContainerRow: {
    flexDirection: 'row',
    height: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
    paddingTop: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  legendDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  legendText: {
    fontSize: 11,
    color: '#666',
  },
  scheduleHeader: {
    marginBottom: 16,
  },
  scheduleHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  dateTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  todayBadge: {
    backgroundColor: '#FFF0E6',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginLeft: 10,
  },
  todayText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#F58252',
  },
  sessionsBadge: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  sessionsText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  earningsText: {
    fontSize: 13,
    color: '#666',
  },
  earningsAmount: {
    fontWeight: '700',
    color: '#333',
  },
  confirmedText: {
    color: '#888',
  },
  sessionCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  tagBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
  },
  subjectTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  studentPlatformRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  studentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  studentDetails: {
    justifyContent: 'center',
  },
  studentName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  studentSub: {
    fontSize: 11,
    color: '#888',
    marginTop: 2,
  },
  platformInfo: {
    alignItems: 'flex-end',
  },
  platformLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#A0A0A0',
    marginBottom: 2,
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#27AE60',
    marginRight: 4,
  },
  platformName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  feeStatusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  feeText: {
    fontSize: 13,
    color: '#333',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#27AE60',
  },
  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F58252',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#333',
    fontSize: 13,
    fontWeight: '600',
  },
  groupInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#F9F9F9',
    padding: 10,
    borderRadius: 8,
  },
  stackedAvatarsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  smallAvatarText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFF',
  },
  groupDetails: {
    marginLeft: 8,
  },
  zoomReadyBadge: {
    borderWidth: 1,
    borderColor: '#4A90E2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#FFF',
  },
  zoomReadyText: {
    fontSize: 11,
    color: '#4A90E2',
    fontWeight: '600',
  },
  earningsActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewHomeworkText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '600',
    marginRight: 12,
  },
  launchZoomButton: {
    backgroundColor: '#F0F4FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#D6E4FF',
  },
  launchZoomText: {
    fontSize: 12,
    color: '#4A90E2',
    fontWeight: '700',
  },
  bottomCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  studentInfoSimple: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButtonsRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rescheduleText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
    marginRight: 12,
  },
  detailsButton: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  detailsButtonText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '600',
  },
  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9F2',
    borderWidth: 1,
    borderColor: '#FDE6D8',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  summaryIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F58252',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  summaryDetails: {
    flex: 1,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  summarySub: {
    fontSize: 11,
    color: '#666',
  },
  editSlotsButton: {
    borderWidth: 1,
    borderColor: '#FDE6D8',
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  editSlotsText: {
    fontSize: 12,
    color: '#F58252',
    fontWeight: '600',
  },

  // Bottom nav – same as tutor home
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingVertical: 14,
    paddingHorizontal: 12,
    paddingBottom: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navTextActive: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FF6B35',
    marginTop: 4,
  },
  navTextInactive: {
    fontSize: 10,
    fontWeight: '600',
    color: '#9CA3AF',
    marginTop: 4,
  },
  navIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FF6B35',
    marginTop: 4,
  },
});
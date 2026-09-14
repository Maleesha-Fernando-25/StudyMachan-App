import {
    Feather,
    FontAwesome,
    Ionicons,
    MaterialCommunityIcons,
} from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function StudentReviewsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9F9F9" />

      {/* Header with back arrow */}
      <View style={styles.topBar}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Feather name="arrow-left" size={22} color="#FF6B35" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Student Reviews</Text>

          <View style={styles.backButtonPlaceholder} />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageSubtitle}>
          Feedback & ratings from your learners
        </Text>

        {/* Overall Rating Card */}
        <View style={styles.card}>
          <View style={styles.ratingTopRow}>
            {/* Left: Score */}
            <View style={styles.ratingScoreContainer}>
              <View style={styles.scoreRow}>
                <Text style={styles.bigScore}>4.9</Text>
                <Text style={styles.outOfScore}> / 5.0</Text>
              </View>
              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <FontAwesome
                    key={index}
                    name="star"
                    size={16}
                    color="#C84C1C"
                    style={styles.starIcon}
                  />
                ))}
              </View>
              <Text style={styles.reviewsCountText}>
                128 Verified Reviews •{' '}
                <Text style={styles.positiveText}>98% Positive</Text>
              </Text>
            </View>

            {/* Right: Bars */}
            <View style={styles.ratingBarsContainer}>
              {[
                { star: 5, pct: '88%', width: '88%', color: '#FA8055' },
                { star: 4, pct: '9%', width: '20%', color: '#FA8055' },
                { star: 3, pct: '2%', width: '8%', color: '#D1D5DB' },
                { star: 2, pct: '1%', width: '4%', color: '#D1D5DB' },
                { star: 1, pct: '0%', width: '0%', color: '#D1D5DB' },
              ].map((item) => (
                <View key={item.star} style={styles.barRow}>
                  <Text style={styles.barStarText}>{item.star}</Text>
                  <FontAwesome
                    name="star"
                    size={10}
                    color="#888"
                    style={styles.smallStarIcon}
                  />
                  <View style={styles.barTrack}>
                    <View
                      style={[
                        styles.barFill,
                        { width: item.width, backgroundColor: item.color } as any,
                      ]}
                    />
                  </View>
                  <Text style={styles.barPctText}>{item.pct}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Badges Row */}
          <View style={styles.badgesRow}>
            <View style={styles.badgePill}>
              <MaterialCommunityIcons
                name="shield-check-outline"
                size={14}
                color="#C84C1C"
              />
              <Text style={styles.badgeText}>Top Rated Mentor</Text>
            </View>
            <View style={styles.badgePill}>
              <Feather name="clock" size={13} color="#C84C1C" />
              <Text style={styles.badgeText}>Prompt Explanations</Text>
            </View>
            <View style={[styles.badgePill, { marginTop: 8 }]}>
              <Feather name="target" size={14} color="#C84C1C" />
              <Text style={styles.badgeText}>Patient & Clear</Text>
            </View>
          </View>
        </View>

        {/* Learner Keywords Card */}
        <View style={styles.card}>
          <View style={styles.keywordsHeader}>
            <View style={styles.keywordsTitleRow}>
              <MaterialCommunityIcons
                name="medal-outline"
                size={20}
                color="#C84C1C"
              />
              <Text style={styles.cardTitle}>Learner Keywords</Text>
            </View>
            <Text style={styles.autoExtractedText}>Auto-extracted</Text>
          </View>
          <View style={styles.keywordsWrap}>
            {[
              { text: '"Clear explanations"', count: '84' },
              { text: '"Reaction mechanisms"', count: '52' },
              { text: '"Punctual"', count: '41' },
              { text: '"Friendly demeanour"', count: '38' },
              { text: '"Detailed notes"', count: '29' },
            ].map((kw, index) => (
              <View key={index} style={styles.keywordPill}>
                <Text style={styles.keywordText}>{kw.text}</Text>
                <Text style={styles.keywordCount}> ({kw.count})</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Filters Section */}
        <View style={styles.filtersSection}>
          <View style={styles.filtersHeader}>
            <Text style={styles.sectionTitle}>All Feedback</Text>
            <TouchableOpacity style={styles.sortDropdown}>
              <Feather
                name="align-left"
                size={14}
                color="#333"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.sortText}>Most Recent</Text>
              <Feather
                name="chevron-down"
                size={16}
                color="#333"
                style={{ marginLeft: 2 }}
              />
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filtersScroll}
          >
            <TouchableOpacity
              style={[styles.filterChip, styles.filterChipActive]}
            >
              <Text style={styles.filterChipTextActive}>All (128)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterChip}>
              <Text style={styles.filterChipText}>5 Stars (112)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterChip}>
              <Text style={styles.filterChipText}>4 Stars (12)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterChip}>
              <Text style={styles.filterChipText}>With Comm...</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* REVIEWS LIST */}

        {/* Review 1 */}
        <View style={styles.reviewCard}>
          <View style={styles.reviewHeader}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
              }}
              style={styles.avatarImage}
            />
            <View style={styles.reviewerInfo}>
              <Text style={styles.reviewerName}>Sanduni Senaratne</Text>
              <Text style={styles.reviewerSubject}>G.C.E. A/L Chemistry</Text>
            </View>
            <View style={styles.ratingTopRight}>
              <FontAwesome name="star" size={14} color="#C84C1C" />
              <Text style={styles.ratingTopRightText}>5.0</Text>
            </View>
          </View>
          <View style={styles.reviewMetaRow}>
            <MaterialCommunityIcons name="check-circle" size={14} color="#C84C1C" />
            <Text style={styles.reviewMetaText}> Yesterday • 1-on-1</Text>
          </View>

          <View style={styles.topicBox}>
            <Text style={styles.topicText}>
              Topic: Organic Chemistry Mechanisms & Synthesis
            </Text>
          </View>

          <Text style={styles.reviewBodyText}>
            “Sir explained the benzene reaction mechanisms and synthetic
            pathways so clearly! I was struggling with 2023 past paper Question
            4, but in just one hour he broke down every electrophilic
            substitution step. Highly recommend him for A/L Chemistry!”
          </Text>

          <View style={styles.reviewFooter}>
            <TouchableOpacity style={styles.actionButton}>
              <Feather name="thumbs-up" size={14} color="#666" />
              <Text style={styles.actionButtonText}>14 found helpful</Text>
            </TouchableOpacity>
            <View style={styles.thankedPill}>
              <Text style={styles.thankedText}>Thanked 🎁❤️</Text>
            </View>
          </View>
        </View>

        {/* Review 2 */}
        <View style={styles.reviewCard}>
          <View style={styles.reviewHeader}>
            <View
              style={[styles.avatarInitials, { backgroundColor: '#F0E2D3' }]}
            >
              <Text style={styles.avatarInitialsText}>AR</Text>
            </View>
            <View style={styles.reviewerInfo}>
              <Text style={styles.reviewerName}>Alex Alwis</Text>
              <Text style={styles.reviewerSubjectDark}>
                Physical Chemistry & Thermodynamics
              </Text>
            </View>
            <View style={styles.ratingTopRight}>
              <FontAwesome name="star" size={14} color="#C84C1C" />
              <Text style={styles.ratingTopRightText}>5.0</Text>
            </View>
          </View>
          <View style={styles.reviewMetaRowNoIcon}>
            <Text style={styles.reviewMetaText}>3 days ago • Group Revision</Text>
          </View>

          <View style={styles.topicBox}>
            <Text style={styles.topicText}>
              Topic: Chemical Energetics & Reaction Kinetics
            </Text>
          </View>

          <Text style={styles.reviewBodyText}>
            “Super energetic session. The reaction rate notes and enthalpy cycle
            summaries provided after class were really neat and easy to revise
            with. Looking forward to the next mock drill.”
          </Text>

          <View style={styles.replyBox}>
            <View style={styles.replyHeader}>
              <MaterialCommunityIcons
                name="chat-outline"
                size={16}
                color="#C84C1C"
              />
              <Text style={styles.replyTitle}>Your Reply:</Text>
            </View>
            <Text style={styles.replyText}>
              “Thank you Alex! Keep practicing those Hess's Law and Gibbs free
              energy equations. You're making rapid progress.”
            </Text>
          </View>
        </View>

        {/* Review 3 */}
        <View style={styles.reviewCard}>
          <View style={styles.reviewHeader}>
            <View
              style={[styles.avatarInitials, { backgroundColor: '#EAE1D5' }]}
            >
              <Text style={styles.avatarInitialsText}>KR</Text>
            </View>
            <View style={styles.reviewerInfo}>
              <Text style={styles.reviewerName}>Kasun Rajapaksha</Text>
              <Text style={styles.reviewerSubjectDark}>
                Inorganic Chemistry (d-block Elements)
              </Text>
            </View>
            <View style={styles.ratingTopRightAlt}>
              <FontAwesome name="star" size={14} color="#C84C1C" />
              <Text style={styles.ratingTopRightText}>4.8</Text>
              <Text style={styles.ratingDateRight}>
                Oct 18,{'\n'}2025
              </Text>
            </View>
          </View>

          <View style={styles.topicBox}>
            <Text style={styles.topicText}>
              Topic: Transition Metals & Complex Ions
            </Text>
          </View>

          <Text style={styles.reviewBodyText}>
            “Great tutor with deep subject knowledge in transition metal
            chemistry. Punctual and friendly demeanor. His color mnemonic charts
            helped boost my confidence ahead of term tests.”
          </Text>

          <View style={styles.reviewFooter}>
            <TouchableOpacity style={styles.actionButton}>
              <Feather name="thumbs-up" size={14} color="#666" />
              <Text style={styles.actionButtonText}>8 found helpful</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Review 4 */}
        <View style={styles.reviewCard}>
          <View style={styles.reviewHeader}>
            <View
              style={[styles.avatarInitials, { backgroundColor: '#FAD4CB' }]}
            >
              <Text style={styles.avatarInitialsText}>TH</Text>
            </View>
            <View style={styles.reviewerInfo}>
              <Text style={styles.reviewerName}>Thisara Fernando</Text>
              <Text style={styles.reviewerSubjectDark}>
                Chemistry Revision
              </Text>
            </View>
            <View style={styles.ratingTopRightAlt}>
              <FontAwesome name="star" size={14} color="#C84C1C" />
              <Text style={styles.ratingTopRightText}>5.0</Text>
              <Text style={styles.ratingDateRight}>Oct 12, 2025</Text>
            </View>
          </View>

          <View style={styles.topicBox}>
            <Text style={styles.topicText}>
              Topic: Organic Reaction Mechanisms & IUPAC
            </Text>
          </View>

          <Text style={styles.reviewBodyText}>
            “Amazing explanation of organic reaction mechanisms! Clear analogies
            and tips for memorizing reagents and functional group conversions.”
          </Text>

          <View style={styles.reviewFooter}>
            <TouchableOpacity style={styles.actionButton}>
              <Feather name="thumbs-up" size={14} color="#666" />
              <Text style={styles.actionButtonText}>5 found helpful</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation – same as tutor home, Reviews highlighted */}
      <View style={styles.bottomNav}>
        {/* Home */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/tutor-home')}
        >
          <Ionicons name="home" size={20} color="#9CA3AF" />
          <Text style={styles.navTextInactive}>Home</Text>
        </TouchableOpacity>

        {/* My Schedule */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/sessions')}
        >
          <Feather name="calendar" size={18} color="#9CA3AF" />
          <Text style={styles.navTextInactive}>My Schedule</Text>
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

        {/* Reviews (Active) */}
        <TouchableOpacity style={styles.navItem}>
          <FontAwesome name="star" size={16} color="#FF6B35" />
          <Text style={styles.navTextActive}>Reviews</Text>
          <View style={styles.navIndicator} />
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
    backgroundColor: '#F9F9F9',
  },

  // Top bar with back arrow – lowered for visibility
  topBar: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 14,
  },
  headerRow: {
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
  backButtonPlaceholder: {
    width: 40,
    height: 40,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1A1A1A',
  },

  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  pageSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    marginBottom: 16,
  },
  ratingTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  ratingScoreContainer: {
    flex: 1,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  bigScore: {
    fontSize: 36,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  outOfScore: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    marginLeft: 4,
  },
  starsRow: {
    flexDirection: 'row',
    marginTop: 4,
    marginBottom: 8,
  },
  starIcon: {
    marginRight: 4,
  },
  reviewsCountText: {
    fontSize: 12,
    color: '#666',
  },
  positiveText: {
    color: '#C84C1C',
    fontWeight: '600',
  },
  ratingBarsContainer: {
    flex: 0.8,
    justifyContent: 'center',
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  barStarText: {
    fontSize: 12,
    color: '#333',
    width: 10,
    textAlign: 'right',
  },
  smallStarIcon: {
    marginLeft: 2,
    marginRight: 6,
  },
  barTrack: {
    flex: 1,
    height: 6,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
    marginRight: 8,
  },
  barFill: {
    height: '100%',
    borderRadius: 3,
  },
  barPctText: {
    fontSize: 11,
    color: '#666',
    width: 28,
    textAlign: 'right',
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 12,
  },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDF4F1',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  badgeText: {
    fontSize: 12,
    color: '#8D5644',
    marginLeft: 6,
    fontWeight: '500',
  },
  keywordsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  keywordsTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginLeft: 6,
  },
  autoExtractedText: {
    fontSize: 12,
    color: '#C84C1C',
    fontWeight: '500',
  },
  keywordsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  keywordPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  keywordText: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
  },
  keywordCount: {
    fontSize: 13,
    color: '#C84C1C',
    fontWeight: '500',
  },
  filtersSection: {
    marginBottom: 16,
  },
  filtersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  sortDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  sortText: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
  },
  filtersScroll: {
    flexDirection: 'row',
  },
  filterChip: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: '#FA8055',
    borderColor: '#FA8055',
  },
  filterChipText: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
  },
  filterChipTextActive: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  avatarInitials: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarInitialsText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  reviewerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  reviewerName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  reviewerSubject: {
    fontSize: 12,
    color: '#C84C1C',
    fontWeight: '500',
  },
  reviewerSubjectDark: {
    fontSize: 12,
    color: '#666',
    paddingRight: 20,
  },
  ratingTopRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingTopRightAlt: {
    alignItems: 'flex-end',
  },
  ratingTopRightText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
    marginLeft: 4,
  },
  ratingDateRight: {
    fontSize: 11,
    color: '#888',
    textAlign: 'right',
    marginTop: 4,
  },
  reviewMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 52,
    marginBottom: 12,
  },
  reviewMetaRowNoIcon: {
    marginLeft: 52,
    marginBottom: 12,
  },
  reviewMetaText: {
    fontSize: 12,
    color: '#666',
  },
  topicBox: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 12,
  },
  topicText: {
    fontSize: 12,
    color: '#444',
    fontWeight: '500',
  },
  reviewBodyText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
    marginBottom: 16,
  },
  reviewFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  actionButtonText: {
    fontSize: 12,
    color: '#555',
    marginLeft: 6,
    fontWeight: '500',
  },
  thankedPill: {
    backgroundColor: '#F9F0F0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  thankedText: {
    fontSize: 12,
    color: '#A04040',
    fontWeight: '600',
  },
  replyBox: {
    backgroundColor: '#FDF9F3',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F5EBE1',
  },
  replyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  replyTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1A1A1A',
    marginLeft: 6,
  },
  replyText: {
    fontSize: 13,
    color: '#555',
    lineHeight: 20,
  },

  // Bottom nav – same as tutor home
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EAEAEA',
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
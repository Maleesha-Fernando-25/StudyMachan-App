import {
    Feather,
    FontAwesome,
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

export default function ManageBankAccountsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={styles.headerIcon}
          onPress={() => router.back()}
        >
          <Feather name="chevron-left" size={28} color="#A34A28" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manage Bank Accounts</Text>
        <View style={styles.headerIcon} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Info Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerIconBox}>
            <MaterialCommunityIcons
              name="shield-check-outline"
              size={22}
              color="#E86E3A"
            />
          </View>
          <View style={styles.bannerTextContainer}>
            <Text style={styles.bannerTitle}>
              Direct Payouts to Sri Lankan Banks
            </Text>
            <Text style={styles.bannerDesc}>
              Withdrawals are credited within{' '}
              <Text style={styles.boldText}>24-48 business hours</Text>. Account
              holder name must match your verified National Identity Card (NIC).
            </Text>
          </View>
        </View>

        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>LINKED ACCOUNTS (3)</Text>
          <View style={styles.nicVerifiedContainer}>
            <View style={styles.greenDot} />
            <Text style={styles.nicText}>
              Verified NIC:{' '}
              <Text style={styles.nicBold}>96****341V</Text>
            </Text>
          </View>
        </View>

        {/* Primary Account Card */}
        <View style={[styles.card, styles.primaryCard]}>
          <View style={styles.cardHeaderBadges}>
            <View style={styles.primaryBadge}>
              <FontAwesome
                name="star"
                size={12}
                color="#FFFFFF"
                style={{ marginRight: 4, marginTop: -1 }}
              />
              <Text style={styles.primaryBadgeText}>Primary Payout</Text>
            </View>
            <View style={styles.verifiedActiveBadge}>
              <Feather
                name="check"
                size={12}
                color="#27AE60"
                style={{ marginRight: 4 }}
              />
              <Text style={styles.verifiedActiveText}>Verified & Active</Text>
            </View>
          </View>

          <View style={styles.bankInfoRow}>
            <View style={styles.comBankIconBox}>
              <MaterialCommunityIcons
                name="bank-outline"
                size={22}
                color="#4A90E2"
              />
            </View>
            <View style={styles.bankNameCol}>
              <Text style={styles.bankName}>Commercial Bank of Ceylon</Text>
              <Text style={styles.bankSub}>Savings Account • LKR</Text>
            </View>
            <TouchableOpacity>
              <Feather name="more-vertical" size={20} color="#888" />
            </TouchableOpacity>
          </View>

          <View style={styles.dashedDivider} />

          <View style={styles.detailsGrid}>
            <View style={styles.detailCol}>
              <Text style={styles.detailLabel}>ACCOUNT NUMBER</Text>
              <Text style={styles.detailValue}>••••  8492</Text>
            </View>
            <View style={styles.detailColRight}>
              <Text style={styles.detailLabel}>BENEFICIARY NAME</Text>
              <Text style={styles.detailValue}>Matheesha Fernando</Text>
            </View>
          </View>
          <View style={[styles.detailCol, { marginTop: 12 }]}>
            <Text style={styles.detailLabel}>BRANCH & CODE</Text>
            <Text style={styles.detailValue}>
              Kollupitiya Branch (Code: 042)
            </Text>
          </View>

          <View style={styles.cardActions}>
            <TouchableOpacity style={styles.actionBtn}>
              <Feather
                name="edit-2"
                size={14}
                color="#666"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.actionBtnText}>Edit Details</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Text style={styles.actionBtnTextOrange}>Transfer History</Text>
              <Feather
                name="chevron-right"
                size={16}
                color="#FF7A45"
                style={{ marginLeft: 2 }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Secondary Account Card */}
        <View style={styles.card}>
          <View style={styles.bankInfoRowAlt}>
            <View style={styles.bocIconBox}>
              <MaterialCommunityIcons
                name="office-building"
                size={24}
                color="#B87B2E"
              />
            </View>
            <View style={styles.bankNameCol}>
              <Text style={styles.bankName}>Bank of Ceylon (BOC)</Text>
              <Text style={styles.bankSub}>Savings Account • LKR</Text>
            </View>
            <View style={styles.verifiedBadgeSimple}>
              <Text style={styles.verifiedBadgeSimpleText}>Verified</Text>
            </View>
          </View>

          <View style={styles.detailsGridAlt}>
            <View style={styles.detailCol}>
              <Text style={styles.detailLabel}>ACCOUNT NUMBER</Text>
              <Text style={styles.detailValue}>••••  3105</Text>
            </View>
            <View style={styles.detailColRightAlt}>
              <Text style={styles.detailLabel}>BRANCH</Text>
              <Text style={styles.detailValue}>Kandy Main</Text>
            </View>
          </View>

          <View style={styles.cardActionsAlt}>
            <TouchableOpacity>
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.setPrimaryBtn}>
              <Text style={styles.setPrimaryBtnText}>
                Set as Primary Payout
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Pending Account Card */}
        <View style={[styles.card, styles.pendingCard]}>
          <View style={styles.bankInfoRowPending}>
            <View style={styles.sampathIconBox}>
              <MaterialCommunityIcons
                name="history"
                size={22}
                color="#E86E3A"
              />
            </View>
            <View style={styles.bankNameCol}>
              <Text style={styles.bankName}>Sampath Bank PLC</Text>
              <Text style={styles.bankSub}>
                •••• 6219  •  Moratuwa Branch
              </Text>
              <View style={styles.verifyingBadge}>
                <Feather
                  name="clock"
                  size={12}
                  color="#B87B2E"
                  style={{ marginRight: 6 }}
                />
                <Text style={styles.verifyingText}>
                  Verifying with PayHere (Est. 12 hrs)
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Add New Bank Account Button */}
        <TouchableOpacity style={styles.addBankButton}>
          <Feather
            name="plus"
            size={20}
            color="#FFFFFF"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.addBankButtonText}>Add New Bank Account</Text>
        </TouchableOpacity>
        <Text style={styles.helperText}>
          Supports all CEFT & SLIPS connected banks in Sri Lanka
        </Text>

        {/* Settings Card */}
        <View style={styles.settingsCard}>
          <View style={styles.settingsRow}>
            <View style={styles.settingsIconBox}>
              <Feather name="calendar" size={18} color="#555" />
            </View>
            <View style={styles.settingsTextCol}>
              <Text style={styles.settingsTitle}>Payout Frequency</Text>
              <Text style={styles.settingsSub}>
                Weekly (Every Tuesday morning)
              </Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.solidDivider} />

          <View style={styles.settingsRowCompact}>
            <Text style={styles.settingsLabel}>
              Minimum Withdrawal Threshold
            </Text>
            <Text style={styles.settingsValue}>LKR  2,000.00</Text>
          </View>

          <View style={styles.solidDivider} />

          <View style={styles.settingsRowCompact}>
            <Text style={styles.settingsLabel}>
              Need help linking your bank?
            </Text>
            <TouchableOpacity style={styles.contactRow}>
              <Feather
                name="message-circle"
                size={14}
                color="#FF7A45"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.contactText}>Contact Tutor Desk</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom navigation removed */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FAFAFA',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  headerIcon: {
    width: 40,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#9A4321',
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
  banner: {
    flexDirection: 'row',
    backgroundColor: '#FFF7ED',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  bannerIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFEDD5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  bannerTextContainer: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  bannerDesc: {
    fontSize: 13,
    color: '#444',
    lineHeight: 20,
  },
  boldText: {
    fontWeight: '700',
    color: '#1A1A1A',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#666',
    letterSpacing: 0.5,
  },
  nicVerifiedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#27AE60',
    marginRight: 6,
  },
  nicText: {
    fontSize: 12,
    color: '#555',
  },
  nicBold: {
    fontWeight: '700',
    color: '#1A1A1A',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    marginBottom: 16,
  },
  primaryCard: {
    borderColor: '#FF7A45',
    borderWidth: 1.5,
  },
  cardHeaderBadges: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  primaryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF7A45',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  primaryBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  verifiedActiveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F8F5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  verifiedActiveText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#27AE60',
  },
  bankInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  bankInfoRowAlt: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  bankInfoRowPending: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  comBankIconBox: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#F0F4FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  bocIconBox: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#FFF7E6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  sampathIconBox: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#FFF5EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  bankNameCol: {
    flex: 1,
    justifyContent: 'center',
  },
  bankName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  bankSub: {
    fontSize: 13,
    color: '#666',
  },
  dashedDivider: {
    height: 1,
    width: '100%',
    borderRadius: 1,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderStyle: 'dashed',
    marginBottom: 16,
  },
  detailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailsGridAlt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailCol: {
    flex: 1,
  },
  detailColRight: {
    flex: 1.2,
  },
  detailColRightAlt: {
    flex: 0.8,
  },
  detailLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#A0A0A0',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  cardActionsAlt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
  },
  actionBtnTextOrange: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FF7A45',
  },
  verifiedBadgeSimple: {
    backgroundColor: '#E8F8F5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  verifiedBadgeSimpleText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#27AE60',
  },
  removeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#888',
  },
  setPrimaryBtn: {
    backgroundColor: '#FFF0E6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  setPrimaryBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  pendingCard: {
    borderStyle: 'dashed',
    borderColor: '#FDE047',
    borderWidth: 1.5,
  },
  verifyingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 8,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#FDE047',
  },
  verifyingText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#B87B2E',
  },
  addBankButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF7A45',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  addBankButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  helperText: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginBottom: 24,
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  settingsRowCompact: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  settingsIconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingsTextCol: {
    flex: 1,
  },
  settingsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  settingsSub: {
    fontSize: 12,
    color: '#666',
  },
  changeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FF7A45',
  },
  solidDivider: {
    height: 1,
    backgroundColor: '#F0F0F0',
  },
  settingsLabel: {
    fontSize: 13,
    color: '#555',
  },
  settingsValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FF7A45',
  },
});
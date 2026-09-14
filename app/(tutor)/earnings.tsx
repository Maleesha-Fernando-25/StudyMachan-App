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

export default function EarningsScreen() {
  const router = useRouter();

  const transactions = [
    {
      id: 1,
      name: 'Lihini Gamage',
      initial: 'S',
      date: 'Aug 24',
      subject: 'Math Tutoring',
      amount: '+Rs 1000.00',
      status: 'Completed',
    },
    {
      id: 2,
      name: 'Michael Joseph',
      initial: 'M',
      date: 'Aug 22',
      subject: 'Physics',
      amount: '+Rs 800.00',
      status: 'Completed',
    },
    {
      id: 3,
      name: 'Amanda Gunaratne',
      initial: 'A',
      date: 'Aug 20',
      subject: 'English Lit',
      amount: '+Rs 1250.00',
      status: 'Completed',
    },
  ];

  const chartBars = [
    { height: '35%', color: '#FAD8C7' },
    { height: '50%', color: '#F5BFA7' },
    { height: '80%', color: '#F7A783' },
    { height: '60%', color: '#FAD8C7' },
    { height: '100%', color: '#FA8055' },
    { height: '65%', color: '#F5BFA7' },
    { height: '75%', color: '#F7A783' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />

      {/* Header with back arrow */}
      <View style={styles.header}>
        <TouchableOpacity
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Earnings</Text>

        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Total Balance Card */}
        <View style={styles.card}>
          <Text style={styles.balanceLabel}>TOTAL BALANCE</Text>
          <Text style={styles.balanceAmount}>Rs 10,000.00</Text>

          <TouchableOpacity style={styles.withdrawButton}>
            <Text style={styles.withdrawButtonText}>Withdraw</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={[styles.card, styles.statCard]}>
            <View style={styles.statIconBox}>
              <Feather name="trending-up" size={18} color="#A34A28" />
            </View>
            <Text style={styles.statLabel}>This Month</Text>
            <Text style={styles.statAmount}>Rs 10,000.00</Text>
          </View>

          <View style={[styles.card, styles.statCard]}>
            <View style={styles.statIconBox}>
              <Ionicons name="wallet-outline" size={18} color="#A34A28" />
            </View>
            <Text style={styles.statLabel}>Total Earned</Text>
            <Text style={styles.statAmount}>Rs 15,000.00</Text>
          </View>
        </View>

        {/* Chart Section */}
        <View style={styles.card}>
          <Text style={styles.chartTitle}>Earnings (Last 7 Days)</Text>

         <View style={styles.barsWrapper}>
  {chartBars.map((bar, index) => {
    const barStyle = {
      height: bar.height,
      backgroundColor: bar.color,
    };
    return (
      <View
        key={index}
        style={[styles.bar, barStyle as any]} // <- fix here
      />
    );
  })}
</View>
            </View>

            {/* Floating Placeholder Pill */}
            <View style={styles.chartPlaceholderPill}>
              <Text style={styles.chartPlaceholderText}>Chart Placeholder</Text>
            </View>
          

          <View style={styles.chartXAxis}>
            <Text style={styles.axisText}>Mon</Text>
            <Text style={styles.axisText}>Sun</Text>
          </View>
        

        {/* Recent Transactions */}
        <Text style={styles.sectionTitle}>Recent Transactions</Text>

        <View style={styles.listCard}>
          {transactions.map((tx, index) => (
            <View
              key={tx.id}
              style={[
                styles.transactionItem,
                index === transactions.length - 1 && styles.noBorder,
              ]}
            >
              <View style={styles.transactionLeft}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{tx.initial}</Text>
                </View>

                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionName}>{tx.name}</Text>
                  <Text style={styles.transactionSub}>
                    {tx.date} • {tx.subject}
                  </Text>
                </View>
              </View>

              <View style={styles.transactionRight}>
                <Text style={styles.transactionAmount}>{tx.amount}</Text>
                <Text style={styles.transactionStatus}>{tx.status}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation – same as tutor home, Earnings highlighted */}
      <View style={styles.bottomNav}>
        {/* Home */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/tutor-home' as any)}
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

        {/* Earnings (Active) */}
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons
            name="wallet-outline"
            size={18}
            color="#FF6B35"
          />
          <Text style={styles.navTextActive}>Earnings</Text>
          <View style={styles.navIndicator} />
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
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FAFAFA',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#A34A28',
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 130, // more space for higher nav
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    marginBottom: 16,
  },
  balanceLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#888',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  withdrawButton: {
    backgroundColor: '#FA8055',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  withdrawButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    marginBottom: 0,
    marginRight: 8,
  },
  statIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FCEBE3',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  statAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  chartContainer: {
    height: 140,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    position: 'relative',
    justifyContent: 'flex-end',
    overflow: 'hidden',
    paddingTop: 20,
  },
  barsWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: '100%',
    width: '100%',
  },
  bar: {
    flex: 1,
  },
  chartPlaceholderPill: {
    position: 'absolute',
    top: '40%',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    zIndex: 10,
  },
  chartPlaceholderText: {
    fontSize: 12,
    color: '#555',
    fontWeight: '500',
  },
  chartXAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  axisText: {
    fontSize: 13,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
    marginTop: 8,
  },
  listCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EBE2DA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#A34A28',
  },
  transactionDetails: {
    justifyContent: 'center',
  },
  transactionName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  transactionSub: {
    fontSize: 13,
    color: '#666',
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  transactionStatus: {
    fontSize: 13,
    color: '#A34A28',
    fontWeight: '500',
  },

  // Bottom nav – higher and more clickable
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EAEAEA',
    paddingVertical: 18,      // increased from 14
    paddingHorizontal: 12,
    paddingBottom: 26,        // increased from 22
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navTextActive: {
    fontSize: 11,             // slightly larger
    fontWeight: '700',
    color: '#FF6B35',
    marginTop: 6,             // more space
  },
  navTextInactive: {
    fontSize: 11,
    fontWeight: '600',
    color: '#9CA3AF',
    marginTop: 6,
  },
  navIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FF6B35',
    marginTop: 6,
  },
});
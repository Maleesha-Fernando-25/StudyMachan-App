import {
    Feather,
    FontAwesome,
    Ionicons,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

export default function EarningsScreen() {
  const router = useRouter();

  const transactions = [
    {
      id: "1",
      initial: "S",
      name: "Sarah Jenkins",
      sub: "Oct 24 • Math Tutoring",
      amount: "+Rs 1000.00",
      status: "Completed",
    },
    {
      id: "2",
      initial: "M",
      name: "Michael Chen",
      sub: "Oct 22 • Physics",
      amount: "+Rs 800.00",
      status: "Completed",
    },
    {
      id: "3",
      initial: "A",
      name: "Amanda Ross",
      sub: "Oct 20 • English Lit",
      amount: "+Rs 1250.00",
      status: "Completed",
    },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF8F5" />

      {/* Top Header Bar */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Feather name="arrow-left" size={22} color="#FF6B35" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Earnings</Text>

        {/* Placeholder to keep title centered */}
        <View style={styles.backButtonPlaceholder} />
      </View>

      {/* Main Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Total Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>TOTAL BALANCE</Text>
          <Text style={styles.balanceValue}>Rs 1,2450.00</Text>

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.withdrawButton}
            onPress={() => {
              // Later: implement withdraw flow
            }}
          >
            <Text style={styles.withdrawButtonText}>Withdraw</Text>
          </TouchableOpacity>
        </View>

        {/* Two Stats Row */}
        <View style={styles.statsRow}>
          {/* This Month */}
          <View style={styles.statCard}>
            <View style={styles.statIconBox}>
              <Feather name="trending-up" size={16} color="#A33A19" />
            </View>
            <Text style={styles.statLabel}>This Month</Text>
            <Text style={styles.statValue}>Rs 4500.00</Text>
          </View>

          {/* Total Earned */}
          <View style={styles.statCard}>
            <View style={styles.statIconBox}>
              <MaterialCommunityIcons
                name="wallet-outline"
                size={16}
                color="#A33A19"
              />
            </View>
            <Text style={styles.statLabel}>Total Earned</Text>
            <Text style={styles.statValue}>Rs 3,8900.00</Text>
          </View>
        </View>

        {/* Earnings (Last 7 Days) Card */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Earnings (Last 7 Days)</Text>

          {/* Chart Mock Box */}
          <View style={styles.chartBox}>
            {/* Styled Chart Bars Mockup */}
            <View style={styles.chartBars}>
              <View style={[styles.bar, { height: "25%" }]} />
              <View style={[styles.bar, { height: "48%" }]} />
              <View style={[styles.bar, { height: "72%" }]} />
              <View style={[styles.bar, { height: "52%" }]} />
              <View style={[styles.bar, { height: "92%" }]} />
              <View style={[styles.bar, { height: "60%" }]} />
              <View style={[styles.bar, { height: "78%" }]} />
            </View>

            {/* Central Chart Placeholder Badge */}
            <View style={styles.chartBadge}>
              <Text style={styles.chartBadgeText}>Chart Placeholder</Text>
            </View>
          </View>

          {/* Days Footer Labels */}
          <View style={styles.chartFooter}>
            <Text style={styles.chartFooterText}>Mon</Text>
            <Text style={styles.chartFooterText}>Sun</Text>
          </View>
        </View>

        {/* Recent Transactions Section */}
        <View style={styles.transactionsSection}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>

          <View style={styles.transactionsCard}>
            {transactions.map((item, index) => (
              <View
                key={item.id}
                style={[
                  styles.transactionRow,
                  index !== transactions.length - 1 && styles.transactionBorder,
                ]}
              >
                <View style={styles.transactionLeft}>
                  <View style={styles.transactionAvatar}>
                    <Text style={styles.transactionInitial}>
                      {item.initial}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.transactionName}>{item.name}</Text>
                    <Text style={styles.transactionSub}>{item.sub}</Text>
                  </View>
                </View>

                <View style={styles.transactionRight}>
                  <Text style={styles.transactionAmount}>{item.amount}</Text>
                  <Text style={styles.transactionStatus}>{item.status}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar (same as tutor home, Earnings highlighted) */}
      <View style={styles.bottomNav}>
        {/* Home */}
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={20} color="#9CA3AF" />
          <Text style={styles.navTextInactive}>Home</Text>
        </TouchableOpacity>

        {/* My Schedule */}
        <TouchableOpacity style={styles.navItem}>
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
        <TouchableOpacity style={styles.navItem}>
          <Feather name="bell" size={18} color="#9CA3AF" />
          <Text style={styles.navTextInactive}>Notifications</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FBF2E9",
  },

  // Header
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: "#FAF8F5",
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonPlaceholder: {
    width: 36,
    height: 36,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FF6B35",
  },

  // Scroll content
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 110,
  },

  // Balance card
  balanceCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(243, 244, 246, 0.8)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
    marginBottom: 12,
  },
  balanceLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#9CA3AF",
    letterSpacing: 0.6,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  balanceValue: {
    fontSize: 28,
    fontWeight: "900",
    color: "#2A231D",
    marginBottom: 16,
  },
  withdrawButton: {
    backgroundColor: "#FF7A45",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FF7A45",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 1,
  },
  withdrawButtonText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  // Stats row
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(243, 244, 246, 0.8)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  statIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F2ECE6",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6B7280",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "900",
    color: "#2A231D",
  },

  // Chart card
  chartCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(243, 244, 246, 0.8)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2A231D",
    marginBottom: 12,
  },
  chartBox: {
    backgroundColor: "rgba(246, 239, 240, 0.8)",
    height: 176,
    borderRadius: 12,
    padding: 12,
    justifyContent: "flex-end",
    position: "relative",
    overflow: "hidden",
  },
  chartBars: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: "100%",
    paddingHorizontal: 8,
    paddingTop: 16,
  },
  bar: {
    width: 32,
    backgroundColor: "#EEA282",
    borderRadius: 4,
  },
  chartBadge: {
    position: "absolute",
    inset: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  chartBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
    backgroundColor: "rgba(255,255,255,0.95)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(229, 231, 235, 0.8)",
  },
  chartFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    paddingHorizontal: 4,
  },
  chartFooterText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6B7280",
  },

  // Transactions
  transactionsSection: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2A231D",
    marginBottom: 12,
  },
  transactionsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "rgba(243, 244, 246, 0.8)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  transactionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
  },
  transactionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(243, 244, 246, 0.8)",
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  transactionAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#EAE3D2",
    alignItems: "center",
    justifyContent: "center",
  },
  transactionInitial: {
    fontSize: 16,
    fontWeight: "800",
    color: "#7A7263",
  },
  transactionName: {
    fontSize: 14,
    fontWeight: "800",
    color: "#2A231D",
  },
  transactionSub: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
    marginTop: 2,
  },
  transactionRight: {
    alignItems: "flex-end",
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: "800",
    color: "#2A231D",
  },
  transactionStatus: {
    fontSize: 12,
    fontWeight: "700",
    color: "#A33A19",
    marginTop: 2,
  },

  // Bottom nav (same as tutor home)
  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingVertical: 12,
    paddingHorizontal: 12,
    paddingBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navItem: {
    alignItems: "center",
    flex: 1,
  },
  navTextActive: {
    fontSize: 9,
    fontWeight: "700",
    color: "#FF6B35",
    marginTop: 2,
  },
  navTextInactive: {
    fontSize: 9,
    fontWeight: "600",
    color: "#9CA3AF",
    marginTop: 2,
  },
  navIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#FF6B35",
    marginTop: 2,
  },
});

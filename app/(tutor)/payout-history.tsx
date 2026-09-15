import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import {
  Feather,
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome5,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function PayoutHistoryScreen() {
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
          <Feather name="arrow-left" size={24} color="#A34A28" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Payout History</Text>

        <View style={styles.headerIcon} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <MaterialCommunityIcons
              name="wallet-outline"
              size={18}
              color="#FF7A45"
            />
            <Text style={styles.summaryHeaderText}>
              Total Withdrawn to Date
            </Text>
          </View>

          <Text style={styles.totalAmount}>LKR 15,000</Text>

          {/* Inner Scheduled Card */}
          <View style={styles.scheduledCard}>
            <View style={styles.scheduledHeader}>
              <View style={styles.orangeDot} />
              <Text style={styles.scheduledTitle}>Next Scheduled Payout</Text>
            </View>

            <View style={styles.scheduledAmountRow}>
              <Text style={styles.scheduledAmount}>LKR 10,000.00</Text>
              <Text style={styles.scheduledDate}>Tue, Oct 31</Text>
            </View>

            <View style={styles.scheduledBankRow}>
              <MaterialCommunityIcons
                name="bank-outline"
                size={16}
                color="#666"
              />
              <Text style={styles.scheduledBankText}>
                Commercial Bank of Ceylon •••• 8492
              </Text>
            </View>
          </View>
        </View>

        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.monthTitle}>October 2026</Text>
          <Text style={styles.monthSummary}>3 Transfers • LKR 29,500</Text>
        </View>

        {/* Transaction 1: Processing */}
        <View style={styles.transactionCard}>
          <View style={styles.transactionHeaderRow}>
            <View style={styles.iconBoxOrange}>
              <MaterialCommunityIcons name="sync" size={20} color="#C84C1C" />
            </View>

            <View style={styles.transactionDetails}>
              <Text style={styles.transactionTitle} numberOfLines={1}>
                Weekly Automatic Payout
              </Text>
              <Text style={styles.transactionBank} numberOfLines={1}>
                Commercial Bank •••• 8492
              </Text>
            </View>

            <View style={styles.transactionAmounts}>
              <Text style={styles.transactionAmountBold}>LKR 10,000.00</Text>
              <Text style={styles.transactionTime}>Today, 09:30 AM</Text>
            </View>
          </View>

          <View style={styles.statusBox}>
            <View style={styles.statusBoxLeft}>
              <View style={styles.orangeDot} />
              <Text style={styles.statusTextProcessing}>
                Processing (PayHere)
              </Text>
            </View>

            <Text style={styles.refText}>REF-LKP-948210</Text>
          </View>

          <View style={styles.estClearanceRow}>
            <Feather
              name="clock"
              size={14}
              color="#666"
              style={styles.clockIcon}
            />
            <Text style={styles.estClearanceText}>
              Est. clearance in approximately 2 hours
            </Text>
          </View>
        </View>

        {/* Transaction 2: Completed */}
        <View style={styles.transactionCard}>
          <View style={styles.transactionHeaderRow}>
            <View style={styles.iconBoxLight}>
              <Ionicons name="checkmark-circle" size={26} color="#FF7A45" />
            </View>

            <View style={styles.transactionDetails}>
              <Text style={styles.transactionTitle} numberOfLines={1}>
                Weekly Automatic Payout
              </Text>
              <Text style={styles.transactionBank} numberOfLines={1}>
                Commercial Bank •••• 8492
              </Text>
            </View>

            <View style={styles.transactionAmounts}>
              <Text style={styles.transactionAmountBold}>LKR 7,500.00</Text>
              <Text style={styles.transactionTime}>Oct 17 • 08:15 AM</Text>
            </View>
          </View>

          <View style={styles.footerRow}>
            <View style={styles.footerLeft}>
              <View style={styles.completedBadge}>
                <Text style={styles.completedBadgeText}>Completed</Text>
              </View>
              <Text style={styles.refTextAlt}>REF-LKP-893144</Text>
            </View>

            <TouchableOpacity style={styles.receiptButton}>
              <Feather
                name="download"
                size={14}
                color="#C84C1C"
                style={styles.downloadIcon}
              />
              <Text style={styles.receiptText}>Receipt</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Transaction 3: Instant Advance */}
        <View style={styles.transactionCard}>
          <View style={styles.transactionHeaderRow}>
            <View style={styles.iconBoxGrey}>
              <FontAwesome5 name="bolt" size={16} color="#444" />
            </View>

            <View style={styles.transactionDetails}>
              <Text style={styles.transactionTitle} numberOfLines={1}>
                Instant Advance Withdrawal
              </Text>
              <Text style={styles.transactionBank} numberOfLines={1}>
                Bank of Ceylon •••• 2246
              </Text>
            </View>

            <View style={styles.transactionAmounts}>
              <Text style={styles.transactionAmountBold}>LKR 12,000.00</Text>
              <Text style={styles.transactionTime}>Oct 10 • 02:45 PM</Text>
            </View>
          </View>

          <View style={styles.footerRow}>
            <View style={styles.footerLeft}>
              <View style={styles.completedBadge}>
                <Text style={styles.completedBadgeText}>Completed</Text>
              </View>
              <Text style={styles.refTextAlt}>REF-SLIP-771802</Text>
            </View>

            <TouchableOpacity style={styles.receiptButton}>
              <Feather
                name="download"
                size={14}
                color="#C84C1C"
                style={styles.downloadIcon}
              />
              <Text style={styles.receiptText}>Receipt</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Compliance Footer */}
        <View style={styles.complianceCard}>
          <View style={styles.complianceHeaderRow}>
            <MaterialCommunityIcons
              name="shield-check-outline"
              size={18}
              color="#333"
              style={styles.complianceShieldIcon}
            />
            <Text style={styles.complianceTitle}>
              Central Bank of Sri Lanka (CBSL) Compliance
            </Text>
          </View>

          <Text style={styles.complianceText}>
            All StudyMachan direct tutor payouts are governed by LankaPay CEFT
            regulations. Bank transaction clearance reference numbers are stored
            for 365 days.
          </Text>

          <View style={styles.complianceContactRow}>
            <Text style={styles.delayedTransferText}>
              Have a delayed transfer?
            </Text>

            <TouchableOpacity style={styles.contactRow}>
              <Text style={styles.contactDeskText}>Contact Tutor Desk</Text>
              <Feather
                name="arrow-right"
                size={14}
                color="#C84C1C"
                style={styles.contactArrow}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 14,
    backgroundColor: "#FAFAFA",
  },
  headerIcon: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#A34A28",
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 40,
  },
  summaryCard: {
    backgroundColor: "#FFF9F5",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#FBE8DF",
  },
  summaryHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  summaryHeaderText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#666",
    marginLeft: 6,
  },
  totalAmount: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1A1A1A",
    marginBottom: 20,
  },
  scheduledCard: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 16,
  },
  scheduledHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  orangeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FF7A45",
    marginRight: 6,
  },
  scheduledTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#333",
  },
  scheduledAmountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  scheduledAmount: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1A1A1A",
  },
  scheduledDate: {
    fontSize: 13,
    color: "#666",
  },
  scheduledBankRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  scheduledBankText: {
    flex: 1,
    fontSize: 12,
    color: "#555",
    marginLeft: 6,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 16,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  monthSummary: {
    fontSize: 12,
    color: "#666",
    paddingBottom: 2,
  },
  transactionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    marginBottom: 16,
  },
  transactionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBoxOrange: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FDE8E0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  iconBoxLight: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFF4ED",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  iconBoxGrey: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
    justifyContent: "center",
    paddingRight: 8,
  },
  transactionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  transactionBank: {
    fontSize: 12,
    color: "#666",
  },
  transactionAmounts: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  transactionAmountBold: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  transactionTime: {
    fontSize: 11,
    color: "#888",
  },
  statusBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 16,
  },
  statusBoxLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusTextProcessing: {
    fontSize: 12,
    fontWeight: "600",
    color: "#444",
  },
  refText: {
    fontSize: 11,
    color: "#888",
    fontFamily: "monospace",
  },
  estClearanceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  clockIcon: {
    marginRight: 6,
  },
  estClearanceText: {
    fontSize: 13,
    color: "#666",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  footerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  completedBadge: {
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 10,
  },
  completedBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#333",
  },
  refTextAlt: {
    fontSize: 11,
    color: "#888",
    fontFamily: "monospace",
  },
  receiptButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  downloadIcon: {
    marginRight: 4,
  },
  receiptText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#C84C1C",
  },
  complianceCard: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    marginBottom: 20,
  },
  complianceHeaderRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  complianceShieldIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  complianceTitle: {
    flex: 1,
    fontSize: 13,
    fontWeight: "700",
    color: "#1A1A1A",
    lineHeight: 18,
  },
  complianceText: {
    fontSize: 12,
    color: "#666",
    lineHeight: 20,
    marginBottom: 16,
  },
  complianceContactRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  delayedTransferText: {
    fontSize: 12,
    color: "#555",
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  contactDeskText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#C84C1C",
  },
  contactArrow: {
    marginLeft: 4,
    marginTop: 1,
  },
});
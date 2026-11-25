import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { bookingService, PaymentHistoryItem } from "@/services/bookingService";

export default function PaymentHistoryScreen() {
  const router = useRouter();
  const [history, setHistory] = useState<PaymentHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const data = await bookingService.getPaymentHistory();
        if (!cancelled) setHistory(data);
      } catch (err) {
        console.error("Failed to load payment history:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchHistory();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

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

        <Text style={styles.headerTitle}>Payment History</Text>
        <View style={styles.headerButtonPlaceholder} />
      </View>

      {loading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#FF6B35" />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {history.length === 0 ? (
            <View style={{ padding: 40, alignItems: "center" }}>
              <Text style={{ color: "#7A7263", fontSize: 14 }}>
                No completed payments found.
              </Text>
            </View>
          ) : (
            history.map((item) => (
              <View key={item.id} style={styles.paymentRecord}>
                {/* Success icon */}
                <View style={styles.successOuterCircle}>
                  <View style={styles.successInnerCircle}>
                    <Feather
                      name="check"
                      size={26}
                      color="#FFFFFF"
                      strokeWidth={3}
                    />
                  </View>
                </View>

                {/* Payment heading */}
                <Text style={styles.successTitle}>Payment Successful!</Text>
                <Text style={styles.successSubtitle}>
                  {item.tutor_name
                    ? `Your session with ${item.tutor_name} is confirmed.`
                    : "Your session payment is verified."}
                </Text>

                {/* Session details */}
                <View style={styles.detailsCard}>
                  <Text style={styles.detailsTitle}>Session Details</Text>
                  <View style={styles.detailsDivider} />

                  <View style={styles.detailRows}>
                    {item.tutor_name && (
                      <View style={styles.detailRow}>
                        <Feather name="user" size={16} color="#5C534B" />
                        <View style={styles.detailTextContainer}>
                          <Text style={styles.detailLabel}>Tutor</Text>
                          <Text style={styles.detailValue}>{item.tutor_name}</Text>
                        </View>
                      </View>
                    )}

                    <View style={styles.detailRow}>
                      <Feather name="calendar" size={16} color="#5C534B" />
                      <View style={styles.detailTextContainer}>
                        <Text style={styles.detailLabel}>Date</Text>
                        <Text style={styles.detailValue}>
                          {new Date(item.created_at).toLocaleDateString([], {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </Text>
                      </View>
                    </View>

                    {item.subject && (
                      <View style={styles.detailRow}>
                        <Feather name="book-open" size={16} color="#5C534B" />
                        <View style={styles.detailTextContainer}>
                          <Text style={styles.detailLabel}>Subject</Text>
                          <Text style={styles.detailValue}>{item.subject}</Text>
                        </View>
                      </View>
                    )}
                  </View>
                </View>

                {/* Transaction details */}
                <View style={styles.transactionCard}>
                  <View style={styles.transactionColumn}>
                    <Text style={styles.transactionLabel}>Transaction ID</Text>
                    <Text style={styles.transactionValue}>
                      #{item.id.slice(0, 8).toUpperCase()}
                    </Text>
                  </View>

                  <View style={styles.amountColumn}>
                    <Text style={styles.transactionLabel}>Amount Paid</Text>
                    <Text style={styles.amountValue}>
                      LKR {Number(item.amount).toLocaleString()}
                    </Text>
                  </View>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      )}
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  headerButtonPlaceholder: {
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
    paddingTop: 16,
    paddingBottom: 40,
  },
  paymentRecord: {
    alignItems: "center",
    marginBottom: 36,
  },
  successOuterCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FCEBE4",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  successInnerCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#FF6B35",
    alignItems: "center",
    justifyContent: "center",
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#2A231D",
    textAlign: "center",
    marginBottom: 6,
  },
  successSubtitle: {
    fontSize: 12,
    color: "#7A7263",
    textAlign: "center",
    fontWeight: "500",
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  detailsCard: {
    width: "100%",
    backgroundColor: "#FAF4EB",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#EFE5D5",
    marginBottom: 12,
  },
  detailsTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#2A231D",
  },
  detailsDivider: {
    height: 1,
    backgroundColor: "#EBE1D0",
    marginVertical: 12,
  },
  detailRows: {
    gap: 16,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  detailTextContainer: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 11,
    color: "#8C8377",
    fontWeight: "500",
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2A231D",
    marginTop: 2,
  },
  transactionCard: {
    width: "100%",
    backgroundColor: "#F4EFEA",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E8E2D8",
  },
  transactionColumn: {
    flex: 1,
  },
  amountColumn: {
    flex: 1,
    alignItems: "flex-end",
  },
  transactionLabel: {
    fontSize: 11,
    color: "#8C8377",
    fontWeight: "500",
  },
  transactionValue: {
    fontSize: 12,
    fontWeight: "700",
    color: "#2A231D",
    marginTop: 3,
  },
  amountValue: {
    fontSize: 16,
    fontWeight: "800",
    color: "#C84C1C",
    marginTop: 3,
  },
});

import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type PopularTopic = {
  id: string;
  title: string;
  icon: "user" | "credit-card" | "tool" | "shield";
};

type FAQ = {
  id: string;
  question: string;
  answer: string;
};

const POPULAR_TOPICS: PopularTopic[] = [
  {
    id: "1",
    title: "Account &\nProfile",
    icon: "user",
  },
  {
    id: "2",
    title: "Payments &\nBilling",
    icon: "credit-card",
  },
  {
    id: "3",
    title: "Session\nTroubleshooting",
    icon: "tool",
  },
  {
    id: "4",
    title: "Trust & Safety",
    icon: "shield",
  },
];

const FAQS: FAQ[] = [
  {
    id: "1",
    question: "How do I book a tutor?",
    answer:
      'Go to the Home screen, select a tutor, choose an available time, and tap "Book Session".',
  },
  {
    id: "2",
    question: "What is the refund policy?",
    answer:
      "You can receive a full refund when you cancel more than 24 hours before the session begins.",
  },
  {
    id: "3",
    question: "How does the Focus Timer work?",
    answer:
      "Open Stay Focus, set your study duration, and tap the play button to begin your focus session.",
  },
];

export default function HelpCenterScreen() {
  const router = useRouter();
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setExpandedFaq((currentId) => (currentId === id ? null : id));
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

        <Text style={styles.headerTitle}>Help Center</Text>

        {/* Placeholder keeps the title centered */}
        <View style={styles.headerButtonPlaceholder} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Title */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>How can we help?</Text>
        </View>

        {/* Popular Topics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Topics</Text>

          <View style={styles.topicsGrid}>
            {POPULAR_TOPICS.map((topic) => (
              <TouchableOpacity
                key={topic.id}
                activeOpacity={0.85}
                style={styles.topicCard}
              >
                <View style={styles.topicIconCircle}>
                  <Feather name={topic.icon} size={20} color="#A33A19" />
                </View>

                <Text style={styles.topicText}>{topic.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Frequently Asked Questions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

          <View style={styles.faqList}>
            {FAQS.map((faq) => {
              const isOpen = expandedFaq === faq.id;

              return (
                <View key={faq.id} style={styles.faqCard}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => toggleFaq(faq.id)}
                    style={styles.faqQuestionButton}
                  >
                    <Text style={styles.faqQuestion}>{faq.question}</Text>

                    <Feather
                      name={isOpen ? "chevron-up" : "chevron-down"}
                      size={20}
                      color="#2A231D"
                    />
                  </TouchableOpacity>

                  {isOpen && (
                    <View style={styles.faqAnswerContainer}>
                      <Text style={styles.faqAnswer}>{faq.answer}</Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>

        {/* Contact Support */}
        <View style={styles.contactCard}>
          <Text style={styles.contactTitle}>Still need help?</Text>

          <Text style={styles.contactSubtitle}>
            Our support team is always ready to assist you.
          </Text>

          <View style={styles.contactButtons}>
            <TouchableOpacity activeOpacity={0.85} style={styles.emailButton}>
              <Feather name="mail" size={16} color="#2A231D" />
              <Text style={styles.emailButtonText}>Email Us</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.85} style={styles.supportButton}>
              <Feather name="headphones" size={16} color="#FFFFFF" />
              <Text style={styles.supportButtonText}>Contact Support</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FDF7EE",
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
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
    paddingTop: 20,
    paddingBottom: 40,
  },

  heroSection: {
    alignItems: "center",
    marginBottom: 26,
  },

  heroTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#A33A19",
    textAlign: "center",
  },

  section: {
    marginBottom: 26,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#2A231D",
    marginBottom: 14,
  },

  topicsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },

  topicCard: {
    width: "48%",
    minHeight: 142,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#EFE8DC",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },

  topicIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FDF0E6",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  topicText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
    color: "#2A231D",
    textAlign: "center",
  },

  faqList: {
    gap: 12,
  },

  faqCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EFE8DC",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },

  faqQuestionButton: {
    minHeight: 58,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  faqQuestion: {
    flex: 1,
    paddingRight: 10,
    fontSize: 14,
    fontWeight: "800",
    color: "#2A231D",
  },

  faqAnswerContainer: {
    paddingHorizontal: 16,
    paddingTop: 2,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },

  faqAnswer: {
    fontSize: 13,
    lineHeight: 20,
    color: "#5C534B",
  },

  contactCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EFE8DC",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },

  contactTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#2A231D",
    marginBottom: 6,
    textAlign: "center",
  },

  contactSubtitle: {
    fontSize: 13,
    lineHeight: 20,
    color: "#7A7263",
    textAlign: "center",
    fontWeight: "500",
    marginBottom: 20,
    paddingHorizontal: 8,
  },

  contactButtons: {
    width: "100%",
    gap: 12,
  },

  emailButton: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DCD6CC",
    paddingVertical: 13,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  emailButtonText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#2A231D",
  },

  supportButton: {
    width: "100%",
    backgroundColor: "#FF7A45",
    paddingVertical: 13,
    borderRadius: 12,
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

  supportButtonText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#FFFFFF",
  },
});

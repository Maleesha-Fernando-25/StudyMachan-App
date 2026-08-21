import { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const tutors = [
  {
    id: "1",
    name: "Nimal Perera",
    subject: "Combined Mathematics",
    rating: "4.9",
    price: "LKR 1,500 / hour",
  },
  {
    id: "2",
    name: "Sahan Fernando",
    subject: "Chemistry",
    rating: "4.8",
    price: "LKR 1,200 / hour",
  },
  {
    id: "3",
    name: "Kavindi Silva",
    subject: "Physics",
    rating: "4.7",
    price: "LKR 1,300 / hour",
  },
];

export default function HomeScreen() {
  const [searchText, setSearchText] = useState("");

  const filteredTutors = tutors.filter((tutor) =>
    `${tutor.name} ${tutor.subject}`
      .toLowerCase()
      .includes(searchText.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Find your tutor</Text>
        <Text style={styles.subheading}>
          Search peer tutors by subject or expertise.
        </Text>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search Mathematics, Chemistry..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <Text style={styles.sectionTitle}>Available tutors</Text>

      <FlatList
        data={filteredTutors}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.tutorCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
            </View>

            <View style={styles.tutorInfo}>
              <Text style={styles.tutorName}>{item.name}</Text>
              <Text style={styles.subject}>{item.subject}</Text>
              <Text style={styles.details}>
                Rating: {item.rating} | {item.price}
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No tutors found.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0F172A",
  },
  subheading: {
    marginTop: 6,
    fontSize: 15,
    color: "#64748B",
  },
  searchInput: {
    marginHorizontal: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    fontSize: 16,
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 12,
  },
  tutorCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  avatar: {
    width: 52,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2563EB",
    borderRadius: 26,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  tutorInfo: {
    flex: 1,
    marginLeft: 14,
  },
  tutorName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
  },
  subject: {
    marginTop: 3,
    fontSize: 14,
    color: "#2563EB",
  },
  details: {
    marginTop: 6,
    fontSize: 13,
    color: "#64748B",
  },
  emptyText: {
    marginTop: 40,
    textAlign: "center",
    color: "#64748B",
  },
});

import {
    Feather,
    Ionicons,
    MaterialCommunityIcons,
} from '@expo/vector-icons';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function VerificationScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Feather name="arrow-left" size={24} color="#8D4321" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Verification</Text>
          <View style={{ width: 24 }} /> {/* Spacer to balance header */}
        </View>

        <Text style={styles.pageTitle}>Complete Verification</Text>

        {/* Progress Tracker Card */}
        <View style={[styles.card, styles.progressCard]}>
          <View style={styles.progressRow}>
            {/* Connecting Line Behind */}
            <View style={styles.progressLine} />

            <View style={styles.progressStep}>
              <View style={styles.stepCircle}>
                <Text style={styles.stepNumber}>1</Text>
              </View>
              <Text style={styles.stepText}>Identity</Text>
            </View>

            <View style={styles.progressStep}>
              <View style={styles.stepCircle}>
                <Text style={styles.stepNumber}>2</Text>
              </View>
              <Text style={styles.stepText}>Academic</Text>
            </View>

            <View style={styles.progressStep}>
              <View style={styles.stepCircle}>
                <Text style={styles.stepNumber}>3</Text>
              </View>
              <Text style={styles.stepText}>Professional</Text>
            </View>
          </View>
          {/* Thick Bottom Bar */}
          <View style={styles.progressBottomBar} />
        </View>

        {/* Identity & Legal Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Identity & Legal</Text>
          <Text style={styles.sectionSubtitle}>
            We need to verify your identity to ensure a safe community.
          </Text>

          <View style={styles.card}>
            <View style={styles.identityHeader}>
              <View style={styles.iconBox}>
                <MaterialCommunityIcons
                  name="card-account-details-outline"
                  size={24}
                  color="#555"
                />
              </View>
              <View style={styles.identityTextContainer}>
                <Text style={styles.cardTitle}>NIC or Passport</Text>
                <Text style={styles.cardDescription}>
                  Front and back images required. Clear, unedited photos only.
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.uploadButton}>
              <Feather name="upload" size={16} color="#111" />
              <Text style={styles.uploadButtonText}>Upload Document</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Academic Credentials Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Academic Credentials</Text>
          <Text style={styles.sectionSubtitle}>
            Upload your relevant academic certificates and IDs.
          </Text>

          {/* Card 1 */}
          <View style={styles.card}>
            <View style={styles.cardTopRow}>
              <View style={styles.iconAndTitle}>
                <Ionicons name="school-outline" size={20} color="#333" />
                <Text style={styles.cardTitleInline}>
                  G.C.E. A/L Result Sheet
                </Text>
              </View>
              <View style={styles.tagRequired}>
                <Text style={styles.tagTextRequired}>Required</Text>
              </View>
            </View>
            <View style={styles.cardBottomRow}>
              <View style={styles.statusContainer}>
                <View
                  style={[styles.statusDot, { backgroundColor: '#FF6B4A' }]}
                />
                <Text
                  style={[styles.statusText, { color: '#FF6B4A' }]}
                >
                  Needs Upload
                </Text>
              </View>
              <TouchableOpacity>
                <Feather name="plus-circle" size={24} color="#111" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Card 2 */}
          <View style={styles.card}>
            <View style={styles.cardTopRow}>
              <View style={styles.iconAndTitle}>
                <MaterialCommunityIcons
                  name="badge-account-horizontal-outline"
                  size={20}
                  color="#333"
                />
                <Text style={styles.cardTitleInline}>University Student ID</Text>
              </View>
              <View style={styles.tagOptional}>
                <Text style={styles.tagTextOptional}>Optional</Text>
              </View>
            </View>
            <View style={styles.cardBottomRow}>
              <View style={styles.statusContainer}>
                <View
                  style={[styles.statusDot, { backgroundColor: '#A0A0A0' }]}
                />
                <Text
                  style={[styles.statusText, { color: '#A0A0A0' }]}
                >
                  Pending Review
                </Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="hourglass-outline" size={22} color="#A0A0A0" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Card 3 */}
          <View style={styles.card}>
            <View style={styles.cardTopRow}>
              <View style={styles.iconAndTitle}>
                <MaterialCommunityIcons
                  name="medal-outline"
                  size={20}
                  color="#333"
                />
                <Text style={styles.cardTitleInline}>Degrees/Diplomas</Text>
              </View>
              <View style={styles.tagOptional}>
                <Text style={styles.tagTextOptional}>Optional</Text>
              </View>
            </View>
            <View style={styles.cardBottomRow}>
              <Text style={styles.notUploadedText}>Not uploaded</Text>
              <TouchableOpacity style={styles.smallOutlineButton}>
                <Text style={styles.smallOutlineButtonText}>Add Degree</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Professional Background Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Background</Text>
          <Text style={styles.sectionSubtitle}>
            Tell students a bit about your experience.
          </Text>

          <View style={styles.formCard}>
            {/* Text Area */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Short Bio & Teaching Experience
              </Text>
              <TextInput
                style={styles.textArea}
                placeholder="Briefly describe your teaching style and past experience..."
                placeholderTextColor="#888"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            {/* Phone Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <View style={styles.inputWithIcon}>
                <Feather
                  name="phone"
                  size={18}
                  color="#555"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="+94 7X XXX XXXX"
                  placeholderTextColor="#888"
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Contact Email</Text>
              <View style={styles.inputWithIcon}>
                <Feather
                  name="mail"
                  size={18}
                  color="#555"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="tutor@example.com"
                  placeholderTextColor="#888"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>
          </View>
        </View>

        {/* Submit Section */}
        <View style={styles.submitSection}>
          <TouchableOpacity style={styles.submitButton} disabled>
            <Feather name="lock" size={16} color="#888" />
            <Text style={styles.submitButtonText}>Submit for Review</Text>
          </TouchableOpacity>
          <Text style={styles.submitHelper}>
            Complete all mandatory fields to submit.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#A04010',
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    marginBottom: 12,
  },
  progressCard: {
    paddingBottom: 12,
    marginBottom: 32,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 16,
    position: 'relative',
  },
  progressLine: {
    position: 'absolute',
    top: 14,
    left: '20%',
    right: '20%',
    height: 2,
    backgroundColor: '#EAEAEA',
    zIndex: 1,
  },
  progressStep: {
    alignItems: 'center',
    zIndex: 2,
  },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#EAEAEA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepNumber: {
    fontSize: 12,
    fontWeight: '700',
    color: '#333',
  },
  stepText: {
    fontSize: 12,
    color: '#555',
  },
  progressBottomBar: {
    height: 6,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    marginTop: 4,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 6,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  identityHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  identityTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  uploadButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
    marginLeft: 8,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconAndTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitleInline: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginLeft: 8,
  },
  tagRequired: {
    backgroundColor: '#F5EBE6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagTextRequired: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7A5B53',
  },
  tagOptional: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagTextOptional: {
    fontSize: 12,
    fontWeight: '600',
    color: '#555',
  },
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  notUploadedText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
  },
  smallOutlineButton: {
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  smallOutlineButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  textArea: {
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#333',
    minHeight: 100,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: '#333',
  },
  submitSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EBEBEB',
    paddingVertical: 14,
    borderRadius: 8,
    width: '100%',
    marginBottom: 12,
  },
  submitButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#888',
    marginLeft: 8,
  },
  submitHelper: {
    fontSize: 12,
    color: '#666',
  },
});
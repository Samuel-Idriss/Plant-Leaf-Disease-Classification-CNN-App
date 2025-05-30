// UserFeedbackScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface UserFeedbackScreenProps {
  onBack: () => void; // This is the only prop it should now receive
}

const UserFeedbackScreen: React.FC<UserFeedbackScreenProps> = ({ onBack }) => {
  const [feedbackText, setFeedbackText] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [showSubmissionSuccess, setShowSubmissionSuccess] = React.useState(false);

  const handleSubmitFeedback = () => {
    if (feedbackText.trim() === '') {
      Alert.alert('Empty Feedback', 'Please enter your feedback before submitting.');
      return;
    }

    console.log('Simulating feedback submission...');
    console.log('Feedback:', feedbackText);
    console.log('Email:', email);

    setShowSubmissionSuccess(true);

    setFeedbackText('');
    setEmail('');
  };

  const handleDone = () => {
    setShowSubmissionSuccess(false);
    onBack(); // Go back to the previous screen (HomeScreen in this case)
  };

  if (showSubmissionSuccess) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.successContainer}>
          <Text style={styles.successEmoji}>🎉</Text>
          <Text style={styles.successTitle}>Thank You!</Text>
          <Text style={styles.successMessage}>Your feedback has been submitted (simulated).</Text>
          <TouchableOpacity
            style={styles.doneButton}
            onPress={handleDone}
          >
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.formContainer}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'< Back'}</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Send Us Your Feedback</Text>

        <Text style={styles.label}>Your Feedback:</Text>
        <TextInput
          style={styles.textArea}
          multiline
          numberOfLines={6}
          placeholder="Tell us what you think..."
          value={feedbackText}
          onChangeText={setFeedbackText}
          textAlignVertical="top"
        />

        <Text style={styles.label}>Your Email (Optional):</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., your@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmitFeedback}
        >
          <Text style={styles.submitButtonText}>Submit Feedback</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.noteText}>
        Your feedback helps us improve!
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  backButton: {
    position: 'absolute',
    top: 15,
    left: 10,
    padding: 10,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 18,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
    fontWeight: '600',
  },
  textArea: {
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
    minHeight: 120,
  },
  input: {
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#56AB2F', 
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  noteText: {
    fontSize: 14,
    color: '#888',
    marginTop: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  successContainer: {
    width: '80%',
    backgroundColor: '#E6FFEE',
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  successEmoji: {
    fontSize: 60,
    marginBottom: 15,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#28A745',
    marginBottom: 10,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    color: '#333',
    marginBottom: 25,
    textAlign: 'center',
    lineHeight: 24,
  },
  doneButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UserFeedbackScreen;
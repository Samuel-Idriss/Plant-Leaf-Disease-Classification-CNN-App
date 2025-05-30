// FeedbackSuccessScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface FeedbackSuccessScreenProps {
  onDone: () => void; // Callback to go back to previous screen or home
}

const FeedbackSuccessScreen: React.FC<FeedbackSuccessScreenProps> = ({ onDone }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.successContainer}>
        <Text style={styles.successEmoji}>✅</Text>
        <Text style={styles.successTitle}>Feedback Sent!</Text>
        <Text style={styles.successMessage}>
          Thank you for sharing your thoughts. Your feedback helps us improve!
          (Simulated submission)
        </Text>
        <TouchableOpacity
          style={styles.doneButton}
          onPress={onDone}
        >
          <Text style={styles.doneButtonText}>Got It!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successContainer: {
    width: '85%',
    backgroundColor: '#E6FFEE', // Light green background
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
    fontSize: 26,
    fontWeight: 'bold',
    color: '#28A745', // Green color
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
    backgroundColor: '#007AFF', // Blue button
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

export default FeedbackSuccessScreen;
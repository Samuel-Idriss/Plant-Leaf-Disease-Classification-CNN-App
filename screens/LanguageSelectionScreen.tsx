// screens/LanguageSelectionScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface LanguageSelectionScreenProps {
  onBack: () => void; // Callback to go back to HomeScreen
}

const LanguageSelectionScreen: React.FC<LanguageSelectionScreenProps> = ({
  onBack,
}) => {

  // Define the list of languages to display
  // These are just display names, no actual language switching logic here.
  const languagesToDisplay = [
    'English',
    'Español',
    'Français',
    '简体中文 (Simplified Chinese)',
    'Deutsch',
    '日本語 (Japanese)',
    // Add more languages if you wish, this is just for display
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Back Button */}
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'< Back'}</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Select Language</Text>

        <View style={styles.languageOptionsContainer}>
          {languagesToDisplay.map((lang, index) => (
            <View key={index} style={styles.languageItem}>
              <Text style={styles.languageText}>{lang}</Text>
            </View>
          ))}
          <Text style={styles.noteText}>
            
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
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
  languageOptionsContainer: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  languageItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },
  languageText: {
    fontSize: 17,
    color: '#333',
    fontWeight: '600',
  },
  noteText: {
    fontSize: 14,
    color: '#888',
    marginTop: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default LanguageSelectionScreen;
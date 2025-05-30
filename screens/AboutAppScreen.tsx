// screens/AboutAppScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking } from 'react-native'; // Added Linking for email
import { SafeAreaView } from 'react-native-safe-area-context';

// Assume you have an app logo or icon
const appLogo = require('../assets/images/app_icon.png'); // <--- IMPORTANT: Update path if different, or create this image

interface AboutAppScreenProps {
  onBack: () => void; // Callback to go back to the HomeScreen
}

const AboutAppScreen: React.FC<AboutAppScreenProps> = ({ onBack }) => {

  const handleEmailPress = () => {
    Linking.openURL('mailto:info.sammysl@gmail.com');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Back Button */}
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'< Back'}</Text>
        </TouchableOpacity>

        <Image source={appLogo} style={styles.logo} />

        <Text style={styles.title}>About Plant Doctor</Text>

        <Text style={styles.version}>Version 1.0.0</Text>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Our Mission</Text>
          <Text style={styles.sectionText}>
            The Plant Doctor app is designed to help farmers, gardeners, and plant enthusiasts identify common plant leaf diseases using cutting-edge Convolutional Neural Network (CNN) technology. Our goal is to provide quick, accurate, and accessible information to promote healthier plants and better yields.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>How It Works</Text>
          <Text style={styles.sectionText}>
            Simply take a photo of a diseased plant leaf or upload an existing image. Our AI model will analyze the image and provide a prediction of the disease, along with details on its causes, symptoms, and recommended treatments.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Developed By</Text>
          <Text style={styles.sectionText}>
            This application was developed by International students of the Masters in Software Engineering program at Nankai University, Software College.
            <Text style={styles.subText}>{'\n'}As a project for the Open-Source Software Course.</Text>
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Contact Us</Text>
          <Text style={styles.sectionText}>
            For feedback, support, or inquiries, please reach out to us at:
            <Text style={styles.email} onPress={handleEmailPress}> info.sammysl@gmail.com</Text> {/* Updated email and made clickable */}
          </Text>
        </View>

        <Text style={styles.footerText}>
          © 2025 Plant Doctor. All rights reserved.
        </Text>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Light background for the screen
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 60, // Space for the back button
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
  logo: {
    width: 100, // Adjust size as needed
    height: 100, // Adjust size as needed
    resizeMode: 'contain',
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  version: {
    fontSize: 16,
    color: '#666',
    marginBottom: 25,
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#56AB2F', // Green accent
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  subText: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  email: {
    color: '#007AFF', // Blue for clickable links
    textDecorationLine: 'underline', // Underline to indicate clickability
  },
  footerText: {
    fontSize: 12,
    color: '#888',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default AboutAppScreen;
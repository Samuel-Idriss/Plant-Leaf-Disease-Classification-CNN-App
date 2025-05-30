
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'; // Import ImageBackground
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker'; // ADDED expo-image-picker import
// Removed LinearGradient import if it's no longer used, or keep if needed elsewhere
// import { LinearGradient } from 'expo-linear-gradient';

// Import your background image
const backgroundImage = require('../assets/images/home-bg.jpeg'); // Corrected path to your image

interface HomeScreenProps {
  onTakePhoto: () => void;
  onUploadPhoto: () => void;
  onAboutApp: () => void;
  onChangeLanguage: () => void;
  onUserFeedback: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  onTakePhoto,
  onUploadPhoto,
  onAboutApp,
  onChangeLanguage,
  onUserFeedback,
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Use ImageBackground for the background image */}
      <ImageBackground
        source={backgroundImage} // Your imported image
        style={styles.backgroundImage}
        resizeMode="cover" // 'cover' scales the image to cover the entire area
      >
        {/* The overlay is crucial for text readability over the image */}
        <View style={styles.overlay}>
          {/* Header Section */}
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Plant Doctor</Text>
            <Text style={styles.subHeader}>Plant Leaf Disease Classifier Using CNN</Text>
          </View>

          {/* Button Container */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onTakePhoto}>
              <Text style={styles.buttonText}>Take Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={onUploadPhoto}>
              <Text style={styles.buttonText}>Upload Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={onAboutApp}>
              <Text style={styles.buttonText}>About the App</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={onChangeLanguage}>
              <Text style={styles.buttonText}>Change Language</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={onUserFeedback}>
              <Text style={styles.buttonText}>User Feedback</Text>
            </TouchableOpacity>
          </View>

          {/* Footer/Trademark Section (Optional) */}
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>© 2025 Plant Leaf Doctor. All rights reserved.</Text>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', // Fallback background
  },
  // New style for ImageBackground
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    // The following properties help ensure content is centered over the image if needed
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    // Adjust this color and opacity to make text and buttons readable over your image
    // For a darker tint, try 'rgba(0,0,0,0.4)'
    // For a lighter, more frosted look, you can increase 'rgba(255,255,255,0.5)'
    backgroundColor: 'rgba(255,255,255,0.2)', // Current subtle white overlay
    width: '100%', // Ensure overlay covers the whole image area
    height: '100%', // Ensure overlay covers the whole image area
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  subHeader: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    maxWidth: '80%',
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
  },
  buttonContainer: {
    width: '90%',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginBottom: 18,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    color: '#56AB2F',
    fontSize: 19,
    fontWeight: 'bold',
  },
  footerContainer: {
    marginBottom: 10,
  },
  footerText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
});

export default HomeScreen;
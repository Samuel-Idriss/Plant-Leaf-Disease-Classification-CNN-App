
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Image, Easing } from 'react-native';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

// IMPORTANT: Update this path to your actual app icon image!
const appIcon = require('../assets/images/app_icon.png'); // Example: '../assets/your_app_icon.png'

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  // Animated.Value to control the width of the progress bar
  const progressAnimation = useRef(new Animated.Value(0)).current;
  // State to display the numerical percentage
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    let loadProgress = 0; // Tracks the loading percentage
    const interval = setInterval(() => {
      if (loadProgress < 100) {
        loadProgress += 5; // Increment progress by 5%
        // Ensure progress doesn't exceed 100
        if (loadProgress > 100) loadProgress = 100;

        setPercentage(loadProgress); // Update the displayed percentage

        // Animate the progress bar width
        Animated.timing(progressAnimation, {
          toValue: loadProgress, // Animate to the current loadProgress
          duration: 500, // Duration for each step of the animation
          easing: Easing.linear, // Linear animation
          useNativeDriver: false, // Required for animating 'width' property
        }).start();
      } else {
        clearInterval(interval); // Stop the interval when 100% is reached
        // Add a slight delay before transitioning to ensure 100% is briefly visible
        setTimeout(() => {
          onLoadingComplete(); // Call the callback to transition to the next screen
        }, 300); // 300ms delay after 100%
      }
    }, 500); // Update loop runs every 100ms

    // Cleanup function: clear the interval if the component unmounts
    return () => clearInterval(interval);
  }, []); // Empty dependency array means this effect runs once on mount

  // Interpolate the Animated.Value (0-100) to a width string ('0%' to '100%')
  const progressBarWidth = progressAnimation.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp', // Prevents values from going outside 0-100 range
  });

  return (
    <View style={styles.container}>
      <Image source={appIcon} style={styles.appIcon} />

      <View style={styles.progressBarContainer}>
        <Animated.View style={[styles.progressBarFill, { width: progressBarWidth }]} />
      </View>

      <Text style={styles.percentageText}>{percentage}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // White background as requested
    justifyContent: 'center',
    alignItems: 'center',
  },
  appIcon: {
    width: 150, // App icon size
    height: 150,
    resizeMode: 'contain', // Ensures the icon fits within the dimensions
    marginBottom: 40, // Space below the icon
  },
  progressBarContainer: {
    width: '70%', // Width of the empty progress bar rectangle
    height: 10, // Height of the bar
    backgroundColor: '#E0E0E0', // Light grey color for the empty part of the bar
    borderRadius: 5,
    overflow: 'hidden', // Ensures the filling bar stays within the rounded bounds
    marginBottom: 10, // Space below the bar
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#56AB2F', // Green color for the filling part of the bar
    borderRadius: 5,
  },
  percentageText: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default LoadingScreen;
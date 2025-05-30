

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StatusBarMock: React.FC = () => {
  // Get current time (e.g., 09:41)
  const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  // Get current date (e.g., May 28)
  const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <View style={styles.statusBar}>
      {/* Left Section: Signal, Network Type, Date */}
      <View style={styles.statusBarSection}>
        <Text style={styles.statusBarText}>📶</Text> {/* Wi-Fi / Signal */}
        <Text style={styles.statusBarText}> 4G</Text> {/* 4G Symbol */}
        <Text style={styles.statusBarText}> {currentDate}</Text> {/* Date */}
      </View>

      {/* Center Section: Time */}
      <View style={styles.statusBarSection}>
        <Text style={[styles.statusBarText, styles.timeText]}>{currentTime}</Text>
      </View>

      {/* Right Section: App Notifications, Battery */}
      <View style={styles.statusBarSection}>
        {/* WhatsApp Notification */}
        <View style={styles.notificationGroup}>
          <Text style={styles.statusBarText}>💬</Text> {/* Chat bubble emoji */}
          <Text style={styles.notificationCount}>2</Text> {/* Notification count */}
        </View>
        {/* Facebook Notification */}
        <View style={styles.notificationGroup}>
          <Text style={styles.statusBarText}>📘</Text> {/* Book emoji */}
          <Text style={styles.notificationCount}>1</Text> {/* Notification count */}
        </View>
        <Text style={styles.statusBarText}>90% 🔋</Text> {/* Battery percentage and icon */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    width: '100%',
    height: 30, // Standard status bar height for visual mock
    backgroundColor: 'rgba(0,0,0,0.1)', // Slightly transparent background
    flexDirection: 'row',
    justifyContent: 'space-between', // Distribute sections evenly
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: StyleSheet.hairlineWidth, // Thin line at the bottom
    borderBottomColor: '#ddd', // Light grey line
  },
  statusBarSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBarText: {
    color: '#333', // Dark text for a light status bar background
    fontSize: 12,
    fontWeight: '500',
    marginHorizontal: 3, // Small spacing between items
  },
  timeText: {
    fontWeight: '700', // Make time stand out
  },
  notificationGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative', // For positioning the count bubble
    marginHorizontal: 5,
  },
  notificationCount: {
    backgroundColor: 'red',
    color: 'white',
    fontSize: 9,
    fontWeight: 'bold',
    borderRadius: 8, // Makes it circular
    minWidth: 14, // Ensures it's a circle even with single digit
    height: 14,
    textAlign: 'center',
    lineHeight: 14, // Centers text vertically
    paddingHorizontal: 2,
    position: 'absolute',
    top: -5, // Adjust position relative to the icon
    right: -5,
  },
});

export default StatusBarMock;
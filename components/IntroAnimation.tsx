
const PHONE_WIDTH = 375;
const PHONE_HEIGHT = 812;

import React, { useRef, useState, useEffect } from 'react';
// Import Animated from react-native, then use Animated.FlatList and Animated.View
// Add PanResponder for swipe gestures
import { View, Text, StyleSheet, Animated, TouchableOpacity, ImageBackground, FlatList, PanResponder } from 'react-native';

// --- AppIcon Component ---
interface AppIconProps {
    name: string;
    icon: string; // Using string for emojis or text
    backgroundColor?: string; // Optional for dock icons which might not have bg
    isMainApp?: boolean;
    animationValue?: Animated.Value;
    // --- MODIFIED: Renamed onPress to onIconPress for clarity ---
    onIconPress?: () => void;
}

const AppIcon: React.FC<AppIconProps> = ({ name, icon, backgroundColor, isMainApp, animationValue, onIconPress }) => {
    const scaleAnim = animationValue || useRef(new Animated.Value(1)).current;

    const handlePress = () => {
        if (onIconPress) {
            Animated.sequence([
                Animated.timing(scaleAnim, { toValue: 0.8, duration: 100, useNativeDriver: true }),
                Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
            ]).start(() => onIconPress()); // Call the new onIconPress prop
        }
    };

    return (
        <TouchableOpacity
            activeOpacity={isMainApp ? 1 : 0.7}
            onPress={handlePress}
            style={styles.appIconWrapper}
        >
            <Animated.View style={[styles.appIcon, backgroundColor ? { backgroundColor } : null, { transform: [{ scale: scaleAnim }] }]}>
                <Text style={styles.appIconText}>{icon}</Text>
            </Animated.View>
            <Text style={styles.appIconName}>{name}</Text>
        </TouchableOpacity>
    );
};

// --- IntroAnimation Component ---
interface IntroAnimationProps {
    // --- NEW: Callback specifically for launching the Plant Doctor app ---
    onLaunchPlantDoctor: () => void;
    // --- REMOVED: onAnimationComplete is no longer directly used here ---
    // onAnimationComplete: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onLaunchPlantDoctor }) => { // Update props destructuring
    // Correctly type flatListRef for Animated.FlatList
    const flatListRef = useRef<Animated.FlatList<AppIconProps[]>>(null); // Corrected type for Animated.FlatList
    const mainAppScaleAnim = useRef(new Animated.Value(1)).current; // For Plant Doctor app tap
    const lockScreenFadeAnim = useRef(new Animated.Value(1)).current; // For lock screen fade out
    const swipeTextAnim = useRef(new Animated.Value(0)).current; // For "Swipe up" text animation

    const [showLockScreen, setShowLockScreen] = useState(true);
    const [showHomeScreen, setShowHomeScreen] = useState(false);
    const [isFlatListScrollEnabled, setIsFlatListScrollEnabled] = useState(false); // NEW STATE for manual scrolling

    // Get current date and time for lock screen and home screen
    const now = new Date();
    const lockScreenTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    const lockScreenDate = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    // --- PanResponder for Swipe Up to Unlock ---
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true, // Allows gestures to start on this view
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                // Only respond to vertical movement
                return Math.abs(gestureState.dy) > Math.abs(gestureState.dx) && Math.abs(gestureState.dy) > 10;
            },
            onPanResponderRelease: (evt, gestureState) => {
                // Detects a significant swipe up
                if (gestureState.dy < -70) { // -70 is a threshold: swipe up more than 70 pixels
                    // Stop the looping swipe text animation
                    swipeTextAnim.stopAnimation();

                    // Start lock screen fade animation
                    Animated.timing(lockScreenFadeAnim, {
                        toValue: 0,
                        duration: 800, // Faster fade
                        useNativeDriver: true,
                    }).start(() => {
                        setShowLockScreen(false); // Hide lock screen after fade out
                        setShowHomeScreen(true); // Show home screen
                        setIsFlatListScrollEnabled(true); // Enable manual FlatList scrolling
                    });
                }
            },
        })
    ).current;

    // --- Initial Animation Sequence (only "Swipe up" text loop) ---
    useEffect(() => {
        // Start "Swipe up" text animation loop indefinitely until unlocked
        Animated.loop(
            Animated.sequence([
                Animated.timing(swipeTextAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
                Animated.timing(swipeTextAnim, { toValue: 0, duration: 1000, useNativeDriver: true }),
            ])
        ).start();
    }, []); // Empty dependency array means this runs once on mount

    // --- Mock App Data (4x4 grid per page) ---
    const appPages: AppIconProps[][] = [
        // Page 1 (first page user sees after unlock)
        [
            { name: 'Mail', icon: '✉️', backgroundColor: '#007AFF' },
            { name: 'Calendar', icon: '📅', backgroundColor: '#FF2D55' },
            { name: 'Photos', icon: '🏞️', backgroundColor: '#9292F0' },
            { name: 'Camera', icon: '📸', backgroundColor: '#FD5C43' },
            { name: 'Clock', icon: '⏰', backgroundColor: '#000000' },
            { name: 'Maps', icon: '🗺️', backgroundColor: '#48A8D5' },
            { name: 'Weather', icon: '☀️', backgroundColor: '#0A84FF' },
            { name: 'Reminders', icon: '🔔', backgroundColor: '#FD9B1D' },
            { name: 'Notes', icon: '🗒️', backgroundColor: '#FFCC00' },
            { name: 'Stocks', icon: '📈', backgroundColor: '#34C759' },
            { name: 'Books', icon: '📚', backgroundColor: '#FF3366' },
            { name: 'App Store', icon: '🛍️', backgroundColor: '#0A84FF' },
            { name: 'Health', icon: '❤️', backgroundColor: '#FD3A5B' },
            { name: 'Wallet', icon: '💳', backgroundColor: '#000000' },
            { name: 'Settings', icon: '⚙️', backgroundColor: '#8E8E93' },
            { name: 'Files', icon: '📁', backgroundColor: '#8E8E93' },
        ],
        // Page 2
        [
            { name: 'Calculator', icon: '🔢', backgroundColor: '#8E8E93' },
            { name: 'Podcasts', icon: '🎙️', backgroundColor: '#FF2D55' },
            { name: 'Voice Memos', icon: '🎤', backgroundColor: '#8E8E93' },
            { name: 'Translate', icon: '🗣️', backgroundColor: '#007AFF' },
            { name: 'News', icon: '📰', backgroundColor: '#FF2D55' },
            { name: 'Home', icon: '🏠', backgroundColor: '#48A8D5' },
            { name: 'Compass', icon: '🧭', backgroundColor: '#FD9B1D' },
            { name: 'Tips', icon: '💡', backgroundColor: '#34C759' },
            { name: 'Shortcuts', icon: '➡️', backgroundColor: '#FD5C43' },
            { name: 'Find My', icon: '📍', backgroundColor: '#34C759' },
            { name: 'Watch', icon: '⌚', backgroundColor: '#FD9B1D' },
            { name: 'TV', icon: '📺', backgroundColor: '#007AFF' },
            { name: 'Fitness', icon: '🏃‍♀️', backgroundColor: '#FF2D55' },
            { name: 'FaceTime', icon: '📞', backgroundColor: '#43CC47' },
            { name: 'Contacts', icon: '👥', backgroundColor: '#007AFF' },
            { name: 'Stocks', icon: '📈', backgroundColor: '#34C759' },
        ],
        // Page 3
        [
            { name: 'Pages', icon: '📄', backgroundColor: '#007AFF' },
            { name: 'Numbers', icon: '📊', backgroundColor: '#34C759' },
            { name: 'Keynote', icon: '📈', backgroundColor: '#FD5C43' },
            { name: 'GarageBand', icon: '🎹', backgroundColor: '#8E8E93' },
            { name: 'iMovie', icon: '🎬', backgroundColor: '#007AFF' },
            { name: 'Clips', icon: '🎥', backgroundColor: '#FD9B1D' },
            { name: 'Measure', icon: '📏', backgroundColor: '#43CC47' },
            { name: 'Magnifier', icon: '🔎', backgroundColor: '#000000' },
            { name: 'Books', icon: '📚', backgroundColor: '#FF3366' },
            { name: 'Shortcuts', icon: '➡️', backgroundColor: '#FD5C43' },
            { name: 'Find My', icon: '📍', backgroundColor: '#34C759' },
            { name: 'Watch', icon: '⌚', backgroundColor: '#FD9B1D' },
            { name: 'TV', icon: '📺', backgroundColor: '#007AFF' },
            { name: 'Fitness', icon: '🏃‍♀️', backgroundColor: '#FF2D55' },
            { name: 'FaceTime', icon: '📞', backgroundColor: '#43CC47' },
            { name: 'Contacts', icon: '👥', backgroundColor: '#007AFF' },
        ],
        // Page 4 (Your app page)
        [
            { name: 'Telegram', icon: '✈️', backgroundColor: '#0088CC' },
            { name: 'Discord', icon: '🎮', backgroundColor: '#7289DA' },
            { name: 'Snapchat', icon: '👻', backgroundColor: '#FFFC00' },
            { name: 'TikTok', icon: '🎶', backgroundColor: '#000000' },
            { name: 'Reddit', icon: '👽', backgroundColor: '#FF4500' },
            { name: 'Pinterest', icon: '📍', backgroundColor: '#BD081C' },
            { name: 'LinkedIn', icon: '👔', backgroundColor: '#0A66C2' },
            { name: 'Gmail', icon: '📧', backgroundColor: '#EA4335' },
            { name: 'Google Maps', icon: '🗺️', backgroundColor: '#4285F4' },
            { name: 'YouTube', icon: '▶️', backgroundColor: '#FF0000' },
            { name: 'Spotify', icon: '🟢', backgroundColor: '#1DB954' },
            { name: 'Netflix', icon: '⚫', backgroundColor: '#E50914' },
            { name: 'Uber', icon: '🚗', backgroundColor: '#000000' },
            { name: 'Airbnb', icon: '🏠', backgroundColor: '#FD5C43' },
            { name: 'Starbucks', icon: '☕', backgroundColor: '#00704A' },
            // Your actual app icon placed strategically (e.g., last in the grid for visibility)
            { name: 'Plant Doctor', icon: '🌿', backgroundColor: '#4CAF50', isMainApp: true, animationValue: mainAppScaleAnim },
        ],
    ];

    // Default iPhone Dock apps
    const dockApps: AppIconProps[] = [
        { name: 'Phone', icon: '📞', backgroundColor: '#34C759' },
        { name: 'Safari', icon: '🌐', backgroundColor: '#FD9B1D' },
        { name: 'Messages', icon: '💬', backgroundColor: '#43CC47' },
        { name: 'Music', icon: '🎵', backgroundColor: '#FF2D55' },
    ];

    // Render function for FlatList items (pages)
    const renderPage = ({ item: page }: { item: AppIconProps[] }) => (
        <View style={styles.pageContainer}>
            <View style={styles.appGrid}>
                {page.map((app, appIndex) => (
                    <AppIcon
                        key={`${app.name}-${appIndex}`} // Ensure unique key
                        name={app.name}
                        icon={app.icon}
                        backgroundColor={app.backgroundColor}
                        isMainApp={app.isMainApp}
                        animationValue={app.animationValue}
                        // --- MODIFIED: Call onLaunchPlantDoctor if it's the main app icon ---
                        onIconPress={app.isMainApp ? onLaunchPlantDoctor : undefined} // Only main app triggers the launch
                    />
                ))}
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Background Image (always visible, behind everything) */}
            <ImageBackground
                source={require('../assets/images/background_img.jpg')} // <-- IMPORTANT: Ensure this path is correct!
                style={styles.backgroundImage}
            />

            {/* Mock iOS Status Bar (Top, always visible) */}
            <View style={styles.mockStatusBar}>
                <View style={styles.notch} />
                <Text style={styles.mockStatusBarTime}>{now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</Text> {/* Use live time */}
                {/* Add battery/signal mock if desired here */}
            </View>

            {/* Lock Screen UI */}
            {showLockScreen && (
                <Animated.View
                    style={[styles.lockScreen, { opacity: lockScreenFadeAnim }]}
                    {...panResponder.panHandlers} // Attach pan handlers here
                >
                    <View style={styles.lockScreenContent}>
                        <Text style={styles.lockScreenTime}>{lockScreenTime}</Text>
                        <Text style={styles.lockScreenDate}>{lockScreenDate}</Text>
                    </View>
                    <Animated.Text style={[styles.swipeText, { opacity: swipeTextAnim }]}>
                        Swipe up to open
                    </Animated.Text>
                </Animated.View>
            )}

            {/* Home Screen UI (rendered but potentially hidden by lock screen initially) */}
            {showHomeScreen && (
                <>
                    {/* Home Screen Top Section (Date, Day) */}
                    <View style={styles.homeScreenTopBar}>
                        {/* Ensure this background is not transparent if "9:40" was showing through */}
                        <Text style={styles.homeScreenDay}>{now.toLocaleDateString('en-US', { weekday: 'long' })}</Text>
                        <Text style={styles.homeScreenDateNumber}>{now.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</Text>
                    </View>

                    {/* Scrollable App Grid */}
                    <Animated.FlatList
                        ref={flatListRef}
                        data={appPages}
                        renderItem={renderPage}
                        keyExtractor={(_, index) => `page-${index}`}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        scrollEnabled={isFlatListScrollEnabled} // Use the new state for manual scrolling
                        style={styles.flatList}
                    />

                    {/* Spotlight Search Indicator */}
                    <View style={styles.spotlightIndicatorContainer}>
                        <View style={styles.spotlightIndicator} />
                    </View>

                    {/* Home Screen Dock */}
                    <View style={styles.mockDock}>
                        {dockApps.map((app, index) => (
                            <AppIcon
                                key={`dock-${index}`}
                                name={app.name}
                                icon={app.icon}
                                backgroundColor={app.backgroundColor}
                                // --- MODIFIED: Dock apps don't trigger main launch ---
                                onIconPress={() => { /* Handle dock app tap if needed */ }}
                            />
                        ))}
                    </View>
                </>
            )}

            {/* Mock iOS Home Indicator (Bottom, always visible) */}
            <View style={styles.mockHomeIndicator}>
                <View style={styles.homeIndicatorLine} />
            </View>
        </View>
    );
};

// --- Styles for the IntroAnimation Component ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: PHONE_WIDTH, // Fixed width
        height: PHONE_HEIGHT, // Fixed height
        backgroundColor: '#000', // Overall iPhone background, visible if image fails
        overflow: 'hidden', // Crucial for containing elements like background image
    },
    backgroundImage: {
        position: 'absolute', // Position absolutely to fill the container and allow layering
        top: 0,
        left: 0,
        width: PHONE_WIDTH, // Use PHONE_WIDTH
        height: PHONE_HEIGHT, // Use PHONE_HEIGHT
        resizeMode: 'cover',
        zIndex: 1, // Lowest zIndex so other elements appear on top
    },

    // General Status Bar (top of phone)
    mockStatusBar: {
        height: 44,
        width: '100%',
        backgroundColor: 'transparent', // Allow background image to show
        position: 'absolute',
        top: 0,
        left: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 5,
        zIndex: 100, // Ensure it's on top of everything
    },
    notch: {
        position: 'absolute',
        top: 0,
        width: 150,
        height: 30,
        backgroundColor: 'black',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        zIndex: 101, // Above status bar content
    },
    mockStatusBarTime: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },

    // --- Lock Screen Styles ---
    lockScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.2)', // Slight dark overlay
        zIndex: 90, // Above background, below status bar
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
    },
    lockScreenContent: {
        flex: 1, // Allow content to take available space
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 80, // Leave space for swipe indicator
    },
    lockScreenTime: {
        color: 'white',
        fontSize: 70,
        fontWeight: '200',
        marginBottom: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    lockScreenDate: {
        color: 'white',
        fontSize: 24,
        fontWeight: '600',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    swipeText: {
        position: 'absolute',
        bottom: 50,
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },

    // --- Home Screen Styles ---
    homeScreenTopBar: {
        height: 100, // Space for date and day
        width: '100%',
        // IMPORTANT: Change this to a non-transparent color if the "9:40" text was being covered by the grid.
        // I've put the previously suggested fix here.
        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent black to prevent grid showing through
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        paddingLeft: 20,
        paddingBottom: 10,
        position: 'absolute', // Position above the FlatList
        top: 44, // Below the status bar
        zIndex: 70, // Above FlatList
    },
    homeScreenDay: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
    },
    homeScreenDateNumber: {
        color: 'white',
        fontSize: 30,
        fontWeight: '700',
    },
    flatList: {
        position: 'absolute', // Position to fill space
        top: 44 + 100, // Below status bar (44px) and top bar (100px)
        // Calculate height: Total PHONE_HEIGHT - StatusBarHeight - TopBarHeight - DockHeight - HomeIndicatorHeight - SpotlightIndicatorHeight
        height: PHONE_HEIGHT - 44 - 100 - 90 - 34 - 20,
        width: '100%', // Each page within FlatList will take PHONE_WIDTH
        zIndex: 60, // Below top bar, above background
    },
    pageContainer: {
        width: PHONE_WIDTH, // Each page takes full fixed phone width
        paddingHorizontal: 15,
        paddingTop: 25, // Increased this based on our previous discussion
        flex: 1, // Take full height available within FlatList
    },
    appGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        height: '100%', // Ensure grid fills its container
        gap: 15, // This is a modern CSS property, ensure your React Native version supports it.
                 // Otherwise, you might need to use margin between items.
    },
    appIconWrapper: {
        width: (PHONE_WIDTH - (15 * 2) - (3 * 15)) / 4, // 15*2 for horizontal padding, 3*15 for 3 gaps between 4 icons
        aspectRatio: 1, // Make it square
        alignItems: 'center',
        marginBottom: 15,
    },
    appIcon: {
        width: 60,
        height: 60,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    appIconText: {
        fontSize: 30,
    },
    appIconName: {
        color: 'white',
        fontSize: 10,
        textAlign: 'center',
    },

    // Spotlight Search Indicator
    spotlightIndicatorContainer: {
        width: '100%',
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 90 + 34, // Above dock (90px) and home indicator (34px)
        zIndex: 75,
    },
    spotlightIndicator: {
        width: 30,
        height: 4,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 2,
    },

    // Home Screen Dock
    mockDock: {
        height: 90,
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        position: 'absolute',
        bottom: 34, // Above the home indicator
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 15,
        zIndex: 80, // Above FlatList
    },

    // General Home Indicator (bottom of phone)
    mockHomeIndicator: {
        height: 34,
        width: '100%',
        backgroundColor: 'black', // Blends with phone frame border
        position: 'absolute',
        bottom: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 8,
        zIndex: 100, // On top of everything
    },
    homeIndicatorLine: {
        width: 134,
        height: 5,
        backgroundColor: 'white',
        borderRadius: 10,
    },
});

export default IntroAnimation;
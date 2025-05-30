import React, { useState } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator, Text } from 'react-native'; 
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

import StatusBarMock from './components/StatusBarMock';
import IntroAnimation from './components/IntroAnimation';
import HomeScreen from './screens/HomeScreen';
import LoadingScreen from './components/LoadingScreen';
import PreviewAndClassifyScreen from './screens/PreviewAndClassifyScreen';
import DiseaseDetailScreen from './screens/DiseaseDetailScreen';
import AboutAppScreen from './screens/AboutAppScreen';
import LanguageSelectionScreen from './screens/LanguageSelectionScreen';
import UserFeedbackScreen from './screens/UserFeedbackScreen'; // Import UserFeedbackScreen

// Updated AppScreenState to include 'userFeedback'
type AppScreenState = 'introScreen' | 'loading' | 'mainApp' | 'previewAndClassify' | 'diseaseDetail' | 'aboutApp' | 'changeLanguage' | 'userFeedback';

interface PredictionResultType {
  predicted_class: string;
  confidence: number;
  description: {
    short_description: string;
    causes: string;
    symptoms: string;
    treatment: string;
  };
}

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppScreenState>('introScreen');
  const [isPlantDoctorLaunching, setIsPlantDoctorLaunching] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);
  const [predictionResult, setPredictionResult] = useState<PredictionResultType | null>(null);

  const handleLaunchPlantDoctor = () => {
    setIsPlantDoctorLaunching(true);
  };

  const handleLoadingComplete = () => {
    setIsPlantDoctorLaunching(false);
    setAppState('mainApp');
  };

  const handleProcessImageSelection = async () => {
    setSelectedImageUri(null);
    setPredictionResult(null);

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Please grant media library permission to pick photos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: false,
      aspect: [4, 3],
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      console.log('Image URI (from App.jsx):', imageUri);
      setSelectedImageUri(imageUri);
      setAppState('previewAndClassify');
    } else if (result.canceled) {
      console.log('User cancelled image picker (Expo from App.jsx)');
    } else {
      console.log('No image selected or unknown error (Expo from App.jsx)');
    }
  };

  const handleUploadPhoto = () => {
    handleProcessImageSelection();
  };

  const handleTakePhoto = () => {
    console.log('Take Photo clicked (web behavior: opening file picker)');
    handleProcessImageSelection();
  };

  const handleBackToHomeFromPreview = () => {
    setSelectedImageUri(null);
    setPredictionResult(null);
    setAppState('mainApp');
  };

  const handlePredictionComplete = (result: PredictionResultType) => {
    setPredictionResult(result);
  };

  const handleNavigateToDiseaseDetail = () => {
    setAppState('diseaseDetail');
  };

  const handleBackToPreviewFromDiseaseDetail = () => {
    setAppState('previewAndClassify');
  };

  const handleAboutApp = () => {
    setAppState('aboutApp');
  };

  const handleBackToHomeFromAboutApp = () => {
    setAppState('mainApp');
  };

  // --- NEW CALLBACK FUNCTION: Handles navigating to LanguageSelectionScreen ---
  const handleNavigateToChangeLanguage = () => {
    setAppState('changeLanguage');
  };

  // --- NEW CALLBACK FUNCTION: Handles going back from LanguageSelectionScreen to HomeScreen ---
  const handleBackToHomeFromLanguageSelection = () => {
    setAppState('mainApp');
  };

  // --- NEW CALLBACK FUNCTION: Handles navigating to UserFeedbackScreen ---
  const handleNavigateToUserFeedback = () => {
    setAppState('userFeedback');
  };

  // --- NEW CALLBACK FUNCTION: Handles going back from UserFeedbackScreen ---
  // This will be called when the user clicks 'Done' on the feedback success message
  const handleBackToHomeFromUserFeedback = () => {
    setAppState('mainApp');
  };

  return (
    <SafeAreaProvider style={styles.safeAreaProvider}>
      <View style={styles.appContentContainer}>

        {appState === 'introScreen' && (
          <IntroAnimation onLaunchPlantDoctor={handleLaunchPlantDoctor} />
        )}

        {appState === 'mainApp' && (
          <>
            <StatusBarMock />
            <HomeScreen
              onTakePhoto={handleTakePhoto}
              onUploadPhoto={handleUploadPhoto}
              onAboutApp={handleAboutApp}
              onChangeLanguage={handleNavigateToChangeLanguage}
              onUserFeedback={handleNavigateToUserFeedback} // Add this to navigate to the feedback screen
            />
          </>
        )}

        {appState === 'previewAndClassify' && selectedImageUri && (
          <>
            <StatusBarMock />
            <PreviewAndClassifyScreen
              imageUri={selectedImageUri}
              onBack={handleBackToHomeFromPreview}
              onPredictionComplete={handlePredictionComplete}
              predictionResult={predictionResult}
              onViewMoreDescription={handleNavigateToDiseaseDetail}
            />
          </>
        )}

        {appState === 'diseaseDetail' && predictionResult && (
          <>
            <StatusBarMock />
            <DiseaseDetailScreen
              diseaseData={predictionResult.description}
              predictedClass={predictionResult.predicted_class}
              onBack={handleBackToPreviewFromDiseaseDetail}
            />
          </>
        )}

        {appState === 'aboutApp' && (
          <>
            <StatusBarMock />
            <AboutAppScreen
              onBack={handleBackToHomeFromAboutApp}
            />
          </>
        )}

        {/* --- Conditionally render LanguageSelectionScreen --- */}
        {appState === 'changeLanguage' && (
          <>
            <StatusBarMock />
            <LanguageSelectionScreen
              onBack={handleBackToHomeFromLanguageSelection} 
            />
          </>
        )}

        {/* --- Conditionally render UserFeedbackScreen --- */}
        {appState === 'userFeedback' && (
          <>
            <StatusBarMock />
            <UserFeedbackScreen
              onBack={handleBackToHomeFromUserFeedback} // This callback handles navigation away from the feedback screen
            />
          </>
        )}

      </View>

      {isPlantDoctorLaunching && (
        <View style={styles.loadingOverlayWrapper}>
          <LoadingScreen onLoadingComplete={handleLoadingComplete} />
        </View>
      )}
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeAreaProvider: {
    flex: 1,
  },
  appContentContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingOverlayWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },
});

export default App;
// C:\Users\ADMIN\Desktop\Plant-Leaf-Disease-Classification-Using-CNN\screens\PreviewAndClassifyScreen.tsx
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Define the type for the prediction result (matches App.jsx)
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

interface PreviewAndClassifyScreenProps {
  imageUri: string;
  onBack: () => void;
  onViewMoreDescription: () => void; // This now just triggers the state change in App.jsx
  onPredictionComplete: (result: PredictionResultType) => void; // <--- NEW PROP: Callback for when prediction is done
  predictionResult: PredictionResultType | null; // <--- NEW PROP: Receive prediction result from App.jsx
}

const PreviewAndClassifyScreen: React.FC<PreviewAndClassifyScreenProps> = ({
  imageUri,
  onBack,
  onViewMoreDescription,
  onPredictionComplete, // New prop
  predictionResult // New prop
}) => {
  const [isLoading, setIsLoading] = useState(false);
  // --- REMOVED: local predictionResult state ---
  // const [predictionResult, setPredictionResult] = useState<PredictionResultType | null>(null);

  const classifyImage = async () => {
    if (!imageUri) {
      Alert.alert('Error', 'No image selected for classification.');
      return;
    }

    setIsLoading(true);
    // --- REMOVED: setPredictionResult(null); here ---
    // App.jsx will handle clearing the result when a new image is selected.

    const formData = new FormData();
    formData.append('image_data', imageUri);

    try {
      const FLASK_SERVER_URL = 'http://127.0.0.1:5000/predict';

      const response = await fetch(FLASK_SERVER_URL, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorText}`);
      }

      const data = await response.json();
      console.log('Prediction data:', data);
      onPredictionComplete(data); // <--- IMPORTANT: Call the prop to update App.jsx's state
      // --- REMOVED: setPredictionResult(data); ---
    } catch (error: any) {
      console.error('Error during classification:', error);
      Alert.alert('Classification Error', error.message || 'Failed to classify image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewMoreDescription = () => {
    if (predictionResult) {
      // This now just triggers the state change in App.jsx
      onViewMoreDescription(); // No data needs to be passed here, App.jsx already has predictionResult
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'< Back'}</Text>
        </TouchableOpacity>

        <Text style={styles.header}>Image Preview</Text>

        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
        ) : (
          <View style={styles.noImageContainer}>
            <Text style={styles.noImageText}>No image selected</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.classifyButton}
          onPress={classifyImage}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Classify Image</Text>
          )}
        </TouchableOpacity>

        {/* Render predictionResult from props now */}
        {predictionResult && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultHeader}>Prediction Result:</Text>
            <Text style={styles.resultText}>
              Disease: <Text style={styles.resultValue}>{predictionResult.predicted_class}</Text>
            </Text>
            <Text style={styles.resultText}>
              Confidence: <Text style={styles.resultValue}>{(predictionResult.confidence * 100).toFixed(2)}%</Text>
            </Text>
            <Text style={styles.shortDescription}>
              {predictionResult.description?.short_description || 'No short description available.'}
            </Text>

            <TouchableOpacity
              style={styles.viewMoreButton}
              onPress={handleViewMoreDescription}
            >
              <Text style={styles.buttonText}>View More Description</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
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
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    marginTop: 40,
  },
  imagePreview: {
    width: '90%',
    height: 300,
    resizeMode: 'contain',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    marginBottom: 20,
    backgroundColor: '#E8E8E8',
  },
  noImageContainer: {
    width: '90%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    marginBottom: 20,
  },
  noImageText: {
    fontSize: 18,
    color: '#666',
  },
  classifyButton: {
    backgroundColor: '#56AB2F',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
  },
  resultHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    textAlign: 'center',
    paddingBottom: 5,
  },
  resultText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  resultValue: {
    fontWeight: 'bold',
    color: '#333',
  },
  shortDescription: {
    fontSize: 15,
    color: '#666',
    marginTop: 10,
    lineHeight: 22,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  viewMoreButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PreviewAndClassifyScreen;
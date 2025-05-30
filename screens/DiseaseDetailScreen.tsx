// C:\Users\ADMIN\Desktop\Plant-Leaf-Disease-Classification-Using-CNN\screens\DiseaseDetailScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface DiseaseDetailScreenProps {
  diseaseData: { // This structure matches `predictionResult.description`
    short_description: string;
    causes: string;
    symptoms: string;
    treatment: string;
  };
  predictedClass: string; // <--- NEW PROP: To display the disease name in the title
  onBack: () => void;
}

const DiseaseDetailScreen: React.FC<DiseaseDetailScreenProps> = ({ diseaseData, predictedClass, onBack }) => {

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'< Back'}</Text>
        </TouchableOpacity>

        {/* Use the new predictedClass prop for the title */}
        <Text style={styles.title}>{predictedClass}</Text>

        <View style={styles.detailSection}>
          <Text style={styles.label}>Short Description:</Text>
          <Text style={styles.text}>{diseaseData.short_description || 'No short description available.'}</Text>
        </View>

        <View style={styles.detailSection}>
          <Text style={styles.label}>Causes:</Text>
          <Text style={styles.text}>{diseaseData.causes || 'No causes information available.'}</Text>
        </View>

        <View style={styles.detailSection}>
          <Text style={styles.label}>Symptoms:</Text>
          <Text style={styles.text}>{diseaseData.symptoms || 'No symptoms information available.'}</Text>
        </View>

        <View style={styles.detailSection}>
          <Text style={styles.label}>Treatment:</Text>
          <Text style={styles.text}>{diseaseData.treatment || 'No treatment information available.'}</Text>
        </View>

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
    padding: 20,
    paddingTop: 60,
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
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  detailSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
    color: '#56AB2F',
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
    lineHeight: 24,
  },
});

export default DiseaseDetailScreen;
# Plant Leaf Disease Classification Mobile App Using CNN with React Native & Python

---

## Table of Contents

* [About the Project](#about-the-project)
* [Features](#features)
* [Technologies Used](#technologies-used)
* [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Installation](#installation)
* [Usage](#usage)
* [Project Structure](#project-structure)
* [Model Training](#model-training-optional)
* [API Endpoints](#api-endpoints)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Acknowledgments](#acknowledgments)

---

## About the Project

This project aims to help farmers and agricultural enthusiasts identify plant leaf diseases early using the power of **Convolutional Neural Networks (CNNs)**. By simply taking a picture of a plant leaf, users can get an instant diagnosis, enabling timely intervention and preventing crop loss. The application features a user-friendly mobile interface built with **React Native** and a robust backend powered by **Python Flask** that handles the image processing and disease classification using a pre-trained CNN model.

---

## Features

* **Real-time Disease Prediction:** Capture or upload an image of a plant leaf and receive immediate classification results from the CNN model.
* **User-Friendly Mobile Interface:** An intuitive and easy-to-navigate application for on-the-go diagnosis.
* **Seamless Image Handling:** Utilizes `expo-image-picker` for effortless photo selection from the gallery or direct camera use (where supported).
* **Detailed Disease Information:** Beyond just prediction, the app provides a short description, causes, symptoms, and treatment options for the identified disease, sourced from a dedicated knowledge base.
* **Interactive Workflow:** Guides users from an introductory animation, through image selection and preview, to detailed disease analysis.
* **Robust Backend API:** Flask API efficiently handles image preprocessing (resizing, normalization), model inference, and delivers comprehensive disease information.
* **CNN Powered Classification:** Leverages deep learning with a trained **TensorFlow/Keras** model for accurate disease detection.
* **Configurable Settings:** Includes options for language selection and user feedback.

---

## Technologies Used

This project is built using a combination of powerful technologies:

### Frontend (Mobile Application)

* **React Native:** The primary framework for building the cross-platform mobile application.
* **Expo:** Provides tools and services for developing, building, and deploying React Native apps, including `expo-image-picker`.
* **`react-native-safe-area-context`:** For handling safe areas across different devices.

### Backend (API)

* **Python:** The core language for the backend logic.
* **Flask:** A lightweight web framework for building the RESTful API.
* **TensorFlow/Keras:** For defining, training, and running the CNN model.
* **Pillow (PIL):** Used for efficient image processing (opening, resizing, converting image modes).
* **NumPy:** Essential for numerical operations on image arrays.
* **Flask-CORS:** Enables Cross-Origin Resource Sharing, allowing the React Native app to communicate with the Flask API.
* **`base64` module:** For decoding base64-encoded image data sent from the frontend.

---

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

Make sure you have the following installed:

* **Node.js & npm (or Yarn):** For React Native development.
    * [Download Node.js](https://nodejs.js.org/en/download/)
* **Python 3.x:** For the Flask backend.
    * [Download Python](https://www.python.org/downloads/)
* **Expo CLI (Recommended for React Native):**
    ```bash
    npm install -g expo-cli
    ```
* **Android Studio / Xcode:** For running the mobile app on emulators or physical devices (if not using Expo Go).

### Installation

#### 1. Backend Setup

```bash
# Clone the repository
git clone <your-repository-url>
cd plant-leaf-disease-classification

# Navigate to the backend directory
cd backend # Adjust this path if your backend is in a different folder

# Create a virtual environment
python -m venv venv
source venv/bin/activate # On Windows: .\venv\Scripts\activate

# Install backend dependencies
pip install -r requirements.txt

. Frontend Setup
Bash

# Navigate to the frontend directory
cd ../frontend # Adjust this path if your frontend is in a different folder

# Install frontend dependencies
npm install # or yarn install

Usage
1. Start the Backend Server
Ensure you're in the backend directory and your virtual environment is activated.

Bash

flask run
# The backend server will typically run on [http://127.0.0.1:5000](http://127.0.0.1:5000)
This command starts the Flask development server, which will load the pre-trained CNN model and disease data. Look for [INFO] messages in your terminal confirming that model.h5, class_indices.json, and diseases.json are loaded successfully.

2. Run the Web-Viewable Mobile Application
Ensure you're in the root directory of your project ( the one containing App.tsx and package.json).

Bash

expo start --web
This will open your default web browser and load the React Native mobile application, running in a web environment.

Application Flow:

The app starts with an Intro Animation.
After the intro, you'll land on the Home Screen, where you can choose to "Take Photo" (which will open a file selection dialog on web) or "Upload Photo" to select a plant leaf image from your computer.
Once an image is selected, it moves to the Preview and Classify Screen. Here, the image is prepared and sent to the Flask backend for prediction.
After prediction, if a result is available, you can view the predicted disease name and confidence.
Clicking "View More Description" takes you to the Disease Detail Screen, showing comprehensive information about the identified disease.
From the Home Screen, you can also navigate to "About App," "Change Language," or provide "User Feedback."


Project Structure

.
├── App.tsx                      # Main React Native component, handles app state and navigation
├── components/                  # Reusable UI components (e.g., StatusBarMock, LoadingScreen, IntroAnimation)
│   ├── StatusBarMock.tsx
│   ├── IntroAnimation.tsx
│   ├── LoadingScreen.tsx
│   └── ...
├── screens/                     # Different screens of the app (e.g., HomeScreen, PreviewAndClassifyScreen, DiseaseDetailScreen)
│   ├── HomeScreen.tsx
│   ├── PreviewAndClassifyScreen.tsx
│   ├── DiseaseDetailScreen.tsx
│   ├── AboutAppScreen.tsx
│   ├── LanguageSelectionScreen.tsx
│   ├── UserFeedbackScreen.tsx
│   └── ...
├── assets/                      # Images, fonts, etc., used by the frontend
├── backend/
│   ├── app.py                   # Flask application entry point and API logic
│   ├── model.h5                 # The pre-trained TensorFlow/Keras CNN model
│   ├── class_indices.json       # JSON file mapping class indices to disease names
│   ├── diseases.json            # JSON file containing detailed descriptions of diseases
│   ├── requirements.txt         # Python dependencies for the backend
│   └── ...
├── package.json                 # Frontend dependencies and scripts
├── app.json                     # Expo configuration file
├── README.md                    # This file
├── LICENSE                      # Project license details
└── .gitignore                   # Specifies intentionally untracked files

Model Training (Optional)
The CNN model utilized in this project was trained using TensorFlow/Keras.

Dataset: The model was trained on a comprehensive dataset of plant leaf images, categorized into 38 distinct classes (various diseases and healthy states), likely derived from a publicly available dataset like the PlantVillage Dataset.
Image Preprocessing: During training, input images were resized to a standard 224x224 pixels and normalized by scaling pixel values to the range [0, 1]. A 20% validation split was applied to the dataset.
Architecture: The model employs a sequential CNN architecture, designed for image classification. It typically includes:
Multiple Conv2D layers (e.g., 32 filters, 64 filters) with relu activation for extracting hierarchical features from images.
MaxPooling2D layers to reduce spatial dimensions and extract dominant features.
A Flatten layer to convert the 2D feature maps into a 1D vector suitable for dense layers.
Dense layers for final classification, culminating in a softmax activation function for the 38 output classes, yielding probability distributions over the possible diseases.
Training Details: The model was compiled using the Adam optimizer and categorical_crossentropy as the loss function, with accuracy as the primary metric. It was trained for 5 epochs, achieving a validation accuracy of approximately 88.28%, indicating good generalization performance on unseen data.
API Endpoints
The Flask backend exposes the following endpoint for disease prediction:

POST /predict
This endpoint processes uploaded plant leaf images and returns a disease classification.

Request Body (Form Data):

image_data: A base64 encoded string of the image. The frontend sends the full data URL (e.g., data:image/jpeg;base64,...), and the backend parses out the base64

Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

Fork the Project
Create your Feature Branch (git checkout -b feature/AmazingFeature)
Commit your Changes (git commit -m 'Add some AmazingFeature')
Push to the Branch (git push origin feature/AmazingFeature)
Open a Pull Request
License
Distributed under the MIT License. See LICENSE for more information.

Contact
Samuel Idriss Kargbo - info.sammysl@gmail.com@

Project Link: https://github.com/Samuel-Idriss/Plant-Leaf-Disease-Classification-CNN-App.git

Acknowledgments
Dataset sourced from Kaggle's PlantVillage Dataset.
Thanks to Expo for simplifying cross-platform development.


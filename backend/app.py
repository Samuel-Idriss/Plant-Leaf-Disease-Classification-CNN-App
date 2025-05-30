import os
from flask import Flask, request, jsonify
from flask_cors import CORS  # Ensure this is imported
import tensorflow as tf
from tensorflow.keras.preprocessing import image
import numpy as np
import json
from PIL import Image
import io
import base64  # Import base64 to decode the base64 image

app = Flask(__name__)
CORS(app)

# --- Configuration Paths ---
MODEL_PATH = 'model.h5'
CLASS_INDICES_PATH = 'class_indices.json'
DISEASES_DATA_PATH = 'diseases.json'

model = None
class_indices = {}
diseases_data = {}

# --- Helper Function to Load Resources ---
def load_resources():
    """Loads the TensorFlow model, class indices, and disease descriptions."""
    global model, class_indices, diseases_data

    if os.path.exists(MODEL_PATH):
        try:
            model = tf.keras.models.load_model(MODEL_PATH, compile=False)
            print(f"[INFO] Model loaded successfully from {MODEL_PATH}")
        except Exception as e:
            print(f"[ERROR] Error loading model from {MODEL_PATH}: {e}")
            model = None
    else:
        print(f"[ERROR] Model file not found at {MODEL_PATH}")
        model = None

    if os.path.exists(CLASS_INDICES_PATH):
        try:
            with open(CLASS_INDICES_PATH, 'r') as f:
                class_indices = {int(k): v for k, v in json.load(f).items()}
            print(f"[INFO] Class indices loaded successfully from {CLASS_INDICES_PATH}")
        except Exception as e:
            print(f"[ERROR] Error loading class indices from {CLASS_INDICES_PATH}: {e}")
            class_indices = {}
    else:
        print(f"[ERROR] Class indices file not found at {CLASS_INDICES_PATH}")
        class_indices = {}

    if os.path.exists(DISEASES_DATA_PATH):
        try:
            with open(DISEASES_DATA_PATH, 'r') as f:
                diseases_data = json.load(f)
            print(f"[INFO] Diseases data loaded successfully from {DISEASES_DATA_PATH}")
        except Exception as e:
            print(f"[ERROR] Error loading diseases data from {DISEASES_DATA_PATH}: {e}")
            diseases_data = {}
    else:
        print(f"[ERROR] Diseases data file not found at {DISEASES_DATA_PATH}")
        diseases_data = {}

# Load resources when the app starts.
with app.app_context():
    load_resources()

# --- Prediction Endpoint ---
@app.route('/predict', methods=['POST'])
def predict():
    if model is None or not class_indices or not diseases_data:
        return jsonify({"error": "Server resources not loaded. Please check server startup logs."}), 500

    if 'image_data' not in request.form:
        return jsonify({"error": "No 'image_data' part in the request."}), 400

    image_data = request.form['image_data']

    try:
        img_data = base64.b64decode(image_data.split(',')[1])  # Decode base64 image
        img = Image.open(io.BytesIO(img_data))
        img = img.resize((224, 224))  # Resize to match model input size

        if img.mode != 'RGB':
            img = img.convert('RGB')

        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array /= 255.0

        predictions = model.predict(img_array)
        predicted_class_index = np.argmax(predictions[0])
        confidence = float(np.max(predictions[0]))

        predicted_disease_name = class_indices.get(predicted_class_index, "Unknown")

        disease_details = diseases_data.get(predicted_disease_name, {
            "short_description": "No detailed description available.",
            "causes": "N/A",
            "symptoms": "N/A",
            "treatment": "N/A"
        })

        response_data = {
            "predicted_class": predicted_disease_name,
            "confidence": confidence,
            "description": disease_details
        }
        return jsonify(response_data)

    except Exception as e:
        return jsonify({"error": f"Error processing base64 image: {str(e)}"}), 400

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)


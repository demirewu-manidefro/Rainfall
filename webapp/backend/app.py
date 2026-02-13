
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pickle
import tensorflow as tf
import os

app = Flask(__name__)
# Enable CORS so the React frontend can talk to us
CORS(app)

# --- Load Model and Scalers ---
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'model')
try:
    print("Loading model...")
    model = tf.keras.models.load_model(os.path.join(MODEL_PATH, 'rainfall_model.keras'))
    print("Model loaded.")

    print("Loading scalers...")
    with open(os.path.join(MODEL_PATH, 'scaler_X.pkl'), 'rb') as f:
        scaler_X = pickle.load(f)
    with open(os.path.join(MODEL_PATH, 'scaler_y.pkl'), 'rb') as f:
        scaler_y = pickle.load(f)
    print("Scalers loaded.")
except Exception as e:
    print(f"Error loading model or scalers: {e}")
    model = None
    scaler_X = None
    scaler_y = None

@app.route('/predict', methods=['POST'])
def predict():
    if not model or not scaler_X or not scaler_y:
        return jsonify({'error': 'Model or scalers not loaded correctly.'}), 500

    try:
        data = request.json
        print(f"Received data: {data}")

        # Features expected: ['rfh_avg', 'r1h_avg', 'r3h_avg', 'month', 'dekad', 'rfh_lag1', 'rfh_lag3']
        rfh_avg = float(data.get('rfh_avg', 0))
        r1h_avg = float(data.get('r1h_avg', 0))
        r3h_avg = float(data.get('r3h_avg', 0))
        month = float(data.get('month', 1))
        dekad = float(data.get('dekad', 1))
        rfh_lag1 = float(data.get('rfh_lag1', 0))
        rfh_lag3 = float(data.get('rfh_lag3', 0))

        # Create input array (1 sample, 7 features)
        features = np.array([[rfh_avg, r1h_avg, r3h_avg, month, dekad, rfh_lag1, rfh_lag3]])
        
        # Scale features
        features_scaled = scaler_X.transform(features)
        
        # Reshape for LSTM: (1, 1, 7) - (samples, time_steps, features)
        features_reshaped = features_scaled.reshape((1, 1, 7))
        
        # Predict
        prediction_scaled = model.predict(features_reshaped)
        
        # Inverse scale
        prediction_final = scaler_y.inverse_transform(prediction_scaled)
        
        result_value = float(prediction_final[0][0])
        print(f"Prediction: {result_value}")

        return jsonify({
            'success': True,
            'prediction': result_value
        })

    except Exception as e:
        print(f"Prediction error: {e}")
        return jsonify({'error': str(e)}), 400

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'model_loaded': model is not None})

if __name__ == '__main__':
    app.run(debug=False, port=5000)

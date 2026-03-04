# Ethiopia Rainfall Prediction Project

A full-stack operational rainfall forecasting system leveraging Stacked LSTM Neural Networks and ENACTS climate data.

## 🚀 Quick Start

### 1. Prerequisites
- Python 3.9+
- Node.js 18+

### 2. Backend Setup
```bash
cd webapp/backend
pip install -r requirements.txt
python app.py
```

### 3. Frontend Setup
```bash
cd webapp/frontend
npm install
npm run dev
```

## 📊 project Structure
- `/webapp/backend`: Flask API & Model Inference
- `/webapp/frontend`: React Dashboard & Visualizations
- `rainfall_prediction.ipynb`: Original ML training and experimentation notebook
- `WEBSITE_ML_DOCUMENTATION.md`: Detailed technical system documentation
- `TECHNICAL_REPORT.md`: Experimental journey and ML performance analysis

## 🧠 Machine Learning Overview
- **Architecture**: Stacked LSTM (64 -> Dropout -> 32 -> Dense)
- **Dataset**: Ethiopia NMA ENACTS_v7
- **Accuracy**: R² ~0.78 | MAE ~7.97mm
- **Features**: Historical Lags (1, 3), Monthly Seasonality, Dekadal Periodicity.

## 📄 Documentation
For more detailed information, please refer to:
- [Technical Documentation](./WEBSITE_ML_DOCUMENTATION.md)
- [ML Experimental Report](./TECHNICAL_REPORT.md)

---
*Developed for Rainfall Climate Analysis in Ethiopia.*

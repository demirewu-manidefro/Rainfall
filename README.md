# 🌧️ RainfallAI: Advanced Dekadal Forecasting & Operational Dashboard

![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![TensorFlow](https://img.shields.io/badge/TensorFlow-2.x-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Flask](https://img.shields.io/badge/Flask-3.0-000000?style=for-the-badge&logo=flask&logoColor=white)

An end-to-end AI system for **Dekadal (10-day) rainfall forecasting in Ethiopia**.  
RainfallAI combines a high-precision LSTM deep learning model (**R² = 0.98**) with a modern full-stack dashboard for real-time climate intelligence and recursive forecasting.

---

## 📺 Dashboard Preview

![Dashboard Preview](https://your-image-link-here.com)

> Replace the link above with your deployed app or screenshot.

---

# 🧠 Core Intelligence (Machine Learning Pipeline)

The forecasting engine is optimized for the complex hydro-climatic patterns of Ethiopia’s highlands.

---

## 1️⃣ Advanced Feature Engineering

To achieve high predictive precision, raw subnational rainfall data was transformed using:

### 🔁 Cyclical Time Encoding
Months and Dekads were mapped into sine and cosine space:
- Captures circular seasonality
- Preserves transition between Dekad 36 → Dekad 1

### 📉 Logarithmic Squashing
Applied `np.log1p()` to:
- Stabilize extreme rainfall values
- Reduce skewness
- Improve neural network convergence

### ⏳ Temporal Memory Features
Engineered historical context using:
- Lag Features (`rfh_lag1`, `rfh_lag3`)
- Rolling Means
- Seasonal Indexes

These allow the LSTM to learn rainfall persistence and delayed atmospheric effects.

---

## 2️⃣ LSTM Architecture

A stacked Long Short-Term Memory (LSTM) network was used to model temporal dependencies.

### 🧩 Architecture Highlights
- Multi-layer LSTM stack
- Dropout regularization
- Dense regression output layer

### ⚖️ Extreme Value Weighting
To prevent underestimation of heavy rainfall:
- Sample weights (up to 10x) applied to extreme events

### 📉 Loss Function: Huber Loss
Combines:
- Robustness of MAE
- Convergence efficiency of MSE

This ensures stable learning even during extreme rainfall spikes.

---

## 📊 Model Performance

| Metric | Score |
|--------|--------|
| Training R² | 0.9845 |
| Testing R² | 0.9870 |
| MAE | 1.34 mm |
| PBIAS | -4.32% |

✔ Extremely low systematic bias  
✔ High stability during heavy rainfall peaks (>140mm)

---

# 💻 Operational Web Application (Full-Stack)

RainfallAI includes a production-ready web dashboard for real-time forecasting and decision support.

---

## 🌟 Key Features

### 🎛 Interactive Forecasting
- Adjust RFH_AVG
- Modify rainfall index
- Instant AI-based prediction

### 📆 Ethiopian Calendar Integration
Automatically converts Gregorian dates into:
- Ethiopian calendar format (e.g., Yekatit 19, 2018)

### 🔄 Recursive Multi-Step Forecasting
Custom recursive logic:
- AI predictions fed back as lag inputs
- Enables forward multi-dekad forecasting

### 📈 High-Fidelity Visuals
- Recharts-based dynamic graphs
- Framer Motion animations
- Real-time inference latency display

---

# 🛠 Tech Stack

### 🖥 Frontend
- React 19
- Vite
- Tailwind CSS
- Recharts
- Lucide Icons
- Framer Motion

### ⚙ Backend
- Flask
- Flask-CORS
- REST API architecture

### 💾 Persistence
- Model: `.keras`
- Scalers: `joblib`
- JSON API responses

---

# 📂 Project Structure

```
Rainfall4/
├── research_notebook.ipynb     # Data Analysis, Feature Engineering & Training
├── webapp/
│   ├── backend/
│   │   ├── model/              # Saved LSTM (.keras)
│   │   ├── app.py              # Flask API (Prediction Logic)
│   │   ├── scaler_X_new.pkl    # Feature Scaler
│   │   └── requirements.txt
│   └── frontend/
│       ├── src/
│       │   ├── pages/
│       │   ├── components/
│       │   └── App.jsx
│       └── package.json
```

---

# 🚀 Getting Started

## 1️⃣ Prerequisites

- Python 3.9+
- Node.js 18+

---

## 2️⃣ Backend Setup

```bash
cd webapp/backend
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Backend runs at:
```
http://127.0.0.1:5000
```

---

## 3️⃣ Frontend Setup

```bash
cd webapp/frontend
npm install
npm run dev
```

Frontend runs at:
```
http://localhost:5173
```

---

# 📈 Residual & Identity Analysis

The model demonstrates:

- Near-perfect identity alignment
- Strong peak rainfall tracking
- Stable bias performance
- Minimal underestimation during heavy storms

Even during extreme rainfall > 140mm, forecast fidelity remains high.

---

# 🎯 Project Objective

To support:
- Climate-informed agriculture
- Food security planning
- Operational hydro-meteorological forecasting
- AI-driven environmental monitoring

---

# 👤 Author

**Manidefro Tmariam**  
Computer Science | Data Science  
Cloud & AI Systems  

📌 Focus: AI for Climate Intelligence  
📌 Domain: Deep Learning + Full-Stack Systems  

---

# ⭐ If You Found This Useful

Give this repository a ⭐ and support climate AI innovation.

# 🌧️ Ethiopia Dekadal Rainfall Prediction System

![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)
![TensorFlow](https://img.shields.io/badge/TensorFlow-2.x-orange.svg)
![React](https://img.shields.io/badge/React-19-blue.svg)
![Flask](https://img.shields.io/badge/Flask-Backend-black.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)

A **Deep Learning + Web Application system** designed to forecast **Dekadal Rainfall (10-day interval)** at the **Woreda level (Admin Level 2) in Ethiopia**.

The system combines:

- **LSTM Deep Learning model**
- **Feature Engineering for seasonal climate patterns**
- **Flask API backend**
- **React interactive dashboard**

This enables **accurate rainfall forecasting and visualization for agriculture and climate monitoring**.

---

# 🚀 Project Highlights

✅ **High Prediction Accuracy**

- **R² Score:** 0.98  
- **MAE:** 1.69 mm  

✅ **Peak Rainfall Learning**

- Extreme rainfall events weighted **10× higher importance**

✅ **Seasonality Modeling**

- Cyclical **Sin / Cos encoding** for months and dekads

✅ **Robust Training**

- **Huber Loss** used for stability with extreme climate data

✅ **Interactive Web Dashboard**

- Real-time prediction  
- Historical rainfall visualization  
- Clean responsive UI  

---

# 🧠 Machine Learning Pipeline

## 1️⃣ Feature Engineering

To improve temporal learning capability, several engineered features were introduced.

| Feature | Purpose |
|------|------|
| `log1p rainfall` | Reduce variance of extreme rainfall |
| `lag1` | Previous dekad rainfall |
| `lag3` | Rainfall 3 dekads ago |
| `sin/cos month` | Capture yearly seasonal cycles |
| `rolling mean` | Short-term rainfall trend |

---

# 🤖 LSTM Model Architecture

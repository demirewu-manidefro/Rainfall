# 🌧️ RainfallAI: Advanced Dekadal Forecasting & Operational Dashboard

![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![TensorFlow](https://img.shields.io/badge/TensorFlow-2.x-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Flask](https://img.shields.io/badge/Flask-3.0-000000?style=for-the-badge&logo=flask&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

An end-to-end AI solution for predicting **Dekadal (10-day) rainfall** in Ethiopia. This project combines a high-accuracy **LSTM Neural Network** with a modern **React-based dashboard** for real-time climate monitoring and recursive forecasting.

---

## 📺 Dashboard Overview
![Dashboard UI](https://github.com/user-attachments/assets/your-screenshot-link-here) 
*The RainfallAI Dashboard featuring real-time input sliders, Ethiopian calendar integration, and historical vs. predicted trend analysis.*

---

## 🧠 Core Intelligence (Machine Learning)

The forecasting engine is built on a custom Deep Learning architecture optimized for the unique climatic patterns of the Ethiopian Highlands.

### 1. Advanced Feature Engineering
To achieve an **R² of 0.98**, the raw subnational data underwent rigorous transformation:
*   **Cyclical Time Encoding:** Months and Dekads were mapped to `sin` and `cos` coordinates, allowing the model to understand that December (Month 12) is chronologically adjacent to January (Month 1).
*   **Logarithmic Squashing:** Applied `np.log1p` to handle extreme rainfall outliers while maintaining a normal distribution for training stability.
*   **Temporal Memory:** Engineered **Lag Features** (`rfh_lag1`, `rfh_lag3`) and **Rolling Means** to provide the model with a historical context of recent precipitation.

### 2. The LSTM Architecture
A stacked **Long Short-Term Memory (LSTM)** network was utilized to capture long-range temporal dependencies:
*   **Weighted Training:** To ensure the model doesn't ignore extreme weather, **sample weights (up to 10x)** were applied to heavy rainfall events during the learning phase.
*   **Loss Function:** Utilized **Huber Loss**, which is robust to outliers while maintaining high precision for standard rainfall levels.

### 3. Performance Metrics
| Metric | Value |
| :--- | :--- |
| **Training R² Score** | `0.9845` |
| **Testing R² Score** | `0.9870` |
| **Mean Absolute Error (MAE)** | `1.34 mm` |
| **PBIAS (Bias)** | `-4.32%` |

---

## 💻 Operational Web App (Full-Stack)

The "RainfallAI" web application provides a professional-grade interface for agronomists and researchers.

### Key Features
*   **Interactive Forecasting:** Adjust metrics like `RFH_AVG` and `Rainfall Index` via dynamic sliders to generate instant AI predictions.
*   **Ethiopian Calendar Utility:** Standard Gregorian dates are automatically converted to the local Ethiopian calendar (e.g., *Yekatit 19, 2018*).
*   **Recursive AI Sequences:** A custom logic that feeds AI predictions back into the model as "Lag" inputs, allowing users to build multi-step forward forecasts.
*   **Glassmorphism UI:** A sleek dark-themed dashboard built with **Tailwind CSS** and animated with **Framer Motion**.

---

## 📂 Project Structure
## 🚀 Getting Started

### 1. Prerequisites
* **Python 3.9+**
* **Node.js 18+**

### 2. Backend Setup
```bash
cd webapp/backend
python -m venv venv
# Activate on Windows: venv\Scripts\activate
# Activate on Mac/Linux: source venv/bin/activate
source venv/bin/activate  
pip install -r requirements.txt
python app.py

🤝 Contributing
Contributions are welcome! If you'd like to improve the feature engineering or UI components, please fork the repo and submit a pull request.
Developed by: [Your Name]
Focus: Climate AI & Full-Stack Development

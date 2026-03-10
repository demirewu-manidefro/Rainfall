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

Model: LSTM_Rain_Expert

Layer (type) Output Shape Param #

LSTM (128 units) (None, 1, 128) 70,656
BatchNormalization (None, 1, 128) 512
Dropout (0.2) (None, 1, 128) 0
LSTM (64 units) (None, 64) 49,408
Dense (32 ReLU) (None, 32) 2,080
Dense (16 ReLU) (None, 16) 528
Dense (1 Linear) (None, 1) 17

Total Parameters: 123,201


---

# 📊 Model Performance

| Metric | Score |
|------|------|
| Training R² | 0.9847 |
| Testing R² | 0.9848 |
| MAE | 1.69 mm |
| PBIAS | -4.01% |

The model accurately captures:

- Rainy season onset  
- Rainfall peaks  
- Seasonal transitions  

---

# 🌐 Web Application Architecture

The system includes a **Flask API backend** and a **React dashboard frontend**.

---

## Backend

Location


/webapp/backend


Technology

- Python
- Flask
- TensorFlow
- Joblib

Model Loaded


final_rainfall_model.keras


### API Endpoints

**Predict Rainfall**


POST /predict


Input


weather features


Output


predicted rainfall value


---

**Historical Data**


GET /historical-data


Returns

- Actual rainfall
- Predicted rainfall
- Data used for charts

---

# 💻 Frontend

Location


/webapp/frontend


Technology Stack

- React 19
- Vite
- Tailwind CSS
- Recharts
- Framer Motion
- Axios

---

### Main Pages

**Home Dashboard**

Features

- Rainfall prediction
- Interactive charts
- Climate trends

---

**About Page**

Contains

- Project overview
- Model explanation
- Technology stack

---

# 📷 Dashboard Preview

Add your dashboard screenshot here.


/screenshots/dashboard.png


Example

![Dashboard Screenshot](screenshots/dashboard.png)

---

# 📂 Project Structure


Ethiopia-Rainfall-Prediction
│
├── data
│ └── eth-rainfall-subnat-full.csv
│
├── models
│ └── rainfall_model.keras
│
├── scalers
│ ├── scaler_X.pkl
│ └── scaler_y.pkl
│
├── notebooks
│ └── training_pipeline.ipynb
│
├── webapp
│ ├── backend
│ │ └── app.py
│ │
│ └── frontend
│ └── react dashboard
│
├── screenshots
│ └── dashboard.png
│
└── README.md


---

# ⚙️ Installation

Clone the repository


git clone https://github.com/yourusername/rainfall-prediction-system.git

cd rainfall-prediction-system


---

# 🔧 Run Backend


cd webapp/backend


Install dependencies


pip install -r requirements.txt


Run Flask API


python app.py


Server runs on


http://localhost:5000


---

# 🎨 Run Frontend


cd webapp/frontend


Install packages


npm install


Run development server


npm run dev


Open


http://localhost:5173


---

# 🔮 Future Improvements

- Satellite rainfall integration
- Real-time weather API
- Mobile app dashboard
- Regional drought prediction

---

# 📚 Applications

This system can support

- Agricultural planning
- Climate risk assessment
- Flood early warning systems
- Government climate monitoring

---

# 👨‍💻 Author

**Demirewu Manidefro**

Data Science Student  
Debre Berhan University  

GitHub


https://github.com/demirewu-manidefro


---

# ⭐ Support

If you like this project

⭐ Star the repository  
🍴 Fork the project  
📢 Share with the community

---

# 🤖 LSTM Model Architecture

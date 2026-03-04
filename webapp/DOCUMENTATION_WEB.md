# Rainfall AI: Web Application Documentation

This document provides a technical overview of the **Rainfall AI** web application, focusing on the frontend, backend integration, and UI features.

## 🚀 Overview

Rainfall AI is a modern, high-performance dashboard designed for climate forecasting. It provides an intuitive interface for users to input climate metrics and receive dekadal (10-day) rainfall predictions powered by a deep learning backend.

## 🛠 Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS (Modern dark-theme aesthetic)
- **Animations**: Framer Motion
- **Visualization**: Recharts (Customized for Actual vs. Predicted trends)
- **Icons**: Lucide React
- **HTTP Client**: Axios

### Backend
- **Framework**: Flask
- **Communication**: RESTful API with Flask-CORS
- **Server**: Runs on port 5000

---

## 📂 Project Structure (Web)

```text
webapp/
├── backend/
│   ├── app.py              # Main Flask server & API routes
│   └── requirements.txt    # Python dependencies (Flask, CORS, etc.)
└── frontend/
    ├── src/
    │   ├── components/     # Reusable UI parts (Navbar, Footer)
    │   ├── pages/          # Main views (Home.jsx Dashboard)
    │   └── App.jsx         # Routing & Global Layout
    ├── package.json        # Frontend dependencies
    └── vite.config.js      # Vite environment setup
```

---

## 🔌 API Endpoints

The frontend communicates with the backend via the following routes:

### 1. `POST /predict`
Used to send climate metrics and receive a rainfall prediction.
- **Payload**:
  ```json
  {
    "rfh_avg": 25.5,
    "rfq": 15.2,
    "month": 2,
    "dekad": 3,
    "rfh_lag1": 20.1,
    "rfh_lag3": 18.5
  }
  ```
- **Response**: Returns the predicted rainfall in millimeters (mm) and a success status.

### 2. `GET /historical-data`
Fetched on initial load to populate the performance chart with actual historical sequences.
- **Returns**: An array of objects containing `Actual` and `Predicted` values for comparison.

---

## ✨ Key Web Features

### 📅 Ethiopian Calendar Integration
The application includes a custom utility to convert Gregorian dates (standard calendar) into **Ethiopian Calendar** dates in real-time. This is useful for local context in climate monitoring.

### 📉 Recursive Forecasting (Forward Sequences)
The frontend implements a "Sequential Prediction" logic. When a user creates a prediction, they can click "Next 10 Days" or "AI Forecast to Target."
- The web app automatically takes the result of the previous prediction.
- It shifts it into the "Lag" input fields.
- It calculates the next date in the sequence and triggers a new API call.
- This allows the user to build a 30-day or 90-day forecast one block at a time.

### 🎨 Responsive Dashboard Design
- **Glassmorphism**: Cards use `backdrop-blur` and semi-transparent backgrounds.
- **Micro-interactions**: Subtle hover states on sliders and buttons.
- **Dynamic Charting**: The chart updates live as new AI predictions are generated, distinguishing between historical data (blue/red) and user-generated forecasts (green).

---

## 🏃 Setup & Installation

### Backend
1. Navigate to `webapp/backend`.
2. Install dependencies: `pip install -r requirements.txt`.
3. Start the server: `python app.py`.

### Frontend
1. Navigate to `webapp/frontend`.
2. Install dependencies: `npm install`.
3. Start development server: `npm run dev`.
4. Open the application at `http://localhost:5173`.

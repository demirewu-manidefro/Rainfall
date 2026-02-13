import { useState } from 'react'
import axios from 'axios'

function App() {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    rfh_avg: '',
    r1h_avg: '',
    r3h_avg: '',
    rfh_lag1: '',
    rfh_lag3: ''
  })
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const calculateDekad = (day) => {
    if (day <= 10) return 1;
    if (day <= 20) return 2;
    return 3;
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setPrediction(null)

    const dateObj = new Date(formData.date)
    const month = dateObj.getMonth() + 1
    const day = dateObj.getDate()
    const dekad = calculateDekad(day)

    const payload = {
      rfh_avg: parseFloat(formData.rfh_avg),
      r1h_avg: parseFloat(formData.r1h_avg),
      r3h_avg: parseFloat(formData.r3h_avg),
      month: month,
      dekad: dekad,
      rfh_lag1: parseFloat(formData.rfh_lag1),
      rfh_lag3: parseFloat(formData.rfh_lag3)
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', payload)
      if (response.data.success) {
        setPrediction(response.data.prediction)
      } else {
        setError('Prediction failed')
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred connecting to the server')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-text p-8 flex flex-col items-center font-sans">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
          Rainfall Predictor
        </h1>
        <p className="text-gray-400">Advanced AI-powered Forecasting</p>
      </header>

      <main className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Input Form Card */}
        <div className="bg-surface p-8 rounded-2xl shadow-xl border border-gray-700/50 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <span className="w-2 h-8 bg-primary rounded-full"></span>
            Input Parameters
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Prediction Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full bg-background border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Average Rainfall (rfh_avg)</label>
                <input
                  type="number" step="0.01"
                  name="rfh_avg"
                  value={formData.rfh_avg}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 5.2"
                  className="w-full bg-background border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Avg Rainfall 1h (r1h_avg)</label>
                <input
                  type="number" step="0.01"
                  name="r1h_avg"
                  value={formData.r1h_avg}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 12.5"
                  className="w-full bg-background border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Avg Rainfall 3h (r3h_avg)</label>
              <input
                type="number" step="0.01"
                name="r3h_avg"
                value={formData.r3h_avg}
                onChange={handleChange}
                required
                placeholder="e.g. 30.1"
                className="w-full bg-background border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Previous Rainfall (lag1)</label>
                <input
                  type="number" step="0.01"
                  name="rfh_lag1"
                  value={formData.rfh_lag1}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 2.0"
                  className="w-full bg-background border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Rainfall 3-Steps Ago (lag3)</label>
                <input
                  type="number" step="0.01"
                  name="rfh_lag3"
                  value={formData.rfh_lag3}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 4.5"
                  className="w-full bg-background border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-bold text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] ${loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-primary hover:bg-blue-600 shadow-lg shadow-blue-500/30'
                }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Predicting...
                </span>
              ) : 'Generate Prediction'}
            </button>
          </form>
        </div>

        {/* Results Card */}
        <div className="flex flex-col gap-6">
          <div className="bg-surface p-8 rounded-2xl shadow-xl border border-gray-700/50 backdrop-blur-sm flex-1 flex flex-col justify-center items-center text-center relative overflow-hidden">
            <h2 className="text-2xl font-semibold mb-2 text-gray-300">Predicted Rainfall</h2>

            {prediction !== null ? (
              <div className="animation-fade-in">
                <div className="text-6xl font-black text-white mb-2 tracking-tight">
                  {prediction.toFixed(2)}
                  <span className="text-2xl font-normal text-gray-400 ml-2">mm</span>
                </div>
                <div className="h-1 w-24 bg-gradient-to-r from-primary to-transparent mx-auto rounded-full mt-4"></div>
                <p className="mt-4 text-accent bg-accent/10 px-4 py-2 rounded-full inline-block text-sm">
                  Confidence High
                </p>
              </div>
            ) : (
              <div className="text-gray-500 flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-gray-700 border-t-gray-500 rounded-full mb-4 opacity-20"></div>
                <p>Enter data to see forecast</p>
              </div>
            )}

            {error && (
              <div className="mt-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                ⚠️ {error}
              </div>
            )}

            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>
          </div>

          <div className="bg-gradient-to-br from-primary/20 to-surface p-6 rounded-2xl border border-primary/20">
            <h3 className="font-semibold text-lg mb-2 text-white">Model Info</h3>
            <p className="text-sm text-gray-400">
              Using LSTM Neural Network trained on historical ENACTS rainfall data.
              <br />Architecture: LSTM(64) → Dropout → LSTM(32) → Dense
            </p>
          </div>
        </div>

      </main>
    </div>
  )
}

export default App

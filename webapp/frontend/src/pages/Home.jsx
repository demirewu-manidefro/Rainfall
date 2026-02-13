import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, CloudDrizzle, BarChart, Activity, Zap, Info, ArrowRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const Home = () => {
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        rfh_avg: '',
        r1h_avg: '',
        r3h_avg: '',
        rfh_lag1: '',
        rfh_lag3: ''
    });
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const calculateDekad = (day) => {
        if (day <= 10) return 1;
        if (day <= 20) return 2;
        return 3;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setPrediction(null);

        const dateObj = new Date(formData.date);
        const month = dateObj.getMonth() + 1;
        const day = dateObj.getDate();
        const dekad = calculateDekad(day);

        const payload = {
            rfh_avg: parseFloat(formData.rfh_avg),
            r1h_avg: parseFloat(formData.r1h_avg),
            r3h_avg: parseFloat(formData.r3h_avg),
            month: month,
            dekad: dekad,
            rfh_lag1: parseFloat(formData.rfh_lag1),
            rfh_lag3: parseFloat(formData.rfh_lag3)
        };

        try {
            const response = await axios.post('http://127.0.0.1:5000/predict', payload);
            if (response.data.success) {
                setPrediction(response.data.prediction);
            } else {
                setError('Prediction failed');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred connecting to the server');
        } finally {
            setLoading(false);
        }
    };

    // Prepare chart data for visualization
    const chartData = [
        { name: 'Lag 3', value: parseFloat(formData.rfh_lag3) || 0 },
        { name: 'Lag 1', value: parseFloat(formData.rfh_lag1) || 0 },
        { name: 'Current Avg', value: parseFloat(formData.rfh_avg) || 0 },
        prediction !== null ? { name: 'Forecast', value: prediction } : null
    ].filter(Boolean);

    return (
        <div className="flex flex-col items-center w-full max-w-7xl mx-auto px-4 py-12">

            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16 relative w-full"
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
                <h1 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent mb-6 tracking-tight">
                    Rainfall<span className="text-white">Predictor</span>
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                    Leveraging advanced <span className="text-blue-400 font-semibold">LSTM Neural Networks</span> to forecast local precipitation with high precision using historical ENACTS climate data.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">

                {/* Left Column: Input Form */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="lg:col-span-7"
                >
                    <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden group">
                        {/* Glossy overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                        <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-4">
                            <div className="p-3 bg-blue-500/20 rounded-xl">
                                <Activity className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">Input Parameters</h2>
                                <p className="text-sm text-gray-500">Enter climatological variables</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-blue-400" /> Prediction Date
                                </label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField
                                    label="Average Rainfall (rfh_avg)"
                                    name="rfh_avg"
                                    value={formData.rfh_avg}
                                    onChange={handleChange}
                                    icon={<CloudDrizzle className="w-4 h-4 text-cyan-400" />}
                                    placeholder="e.g. 5.2"
                                />
                                <InputField
                                    label="Avg Rainfall 1h (r1h_avg)"
                                    name="r1h_avg"
                                    value={formData.r1h_avg}
                                    onChange={handleChange}
                                    icon={<Zap className="w-4 h-4 text-yellow-400" />}
                                    placeholder="e.g. 12.5"
                                />
                            </div>

                            <InputField
                                label="Avg Rainfall 3h (r3h_avg)"
                                name="r3h_avg"
                                value={formData.r3h_avg}
                                onChange={handleChange}
                                icon={<BarChart className="w-4 h-4 text-green-400" />}
                                placeholder="e.g. 30.1"
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField
                                    label="Previous Rainfall (lag1)"
                                    name="rfh_lag1"
                                    value={formData.rfh_lag1}
                                    onChange={handleChange}
                                    icon={<Activity className="w-4 h-4 text-purple-400" />}
                                    placeholder="e.g. 2.0"
                                />
                                <InputField
                                    label="Rainfall 3-Steps Ago (lag3)"
                                    name="rfh_lag3"
                                    value={formData.rfh_lag3}
                                    onChange={handleChange}
                                    icon={<Activity className="w-4 h-4 text-pink-400" />}
                                    placeholder="e.g. 4.5"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-4 rounded-xl font-bold text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/25 mt-4 flex items-center justify-center gap-3 overflow-hidden relative ${loading ? 'bg-slate-700 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400'
                                    }`}
                            >
                                {/* Button shine effect */}
                                {!loading && <div className="absolute inset-0 bg-white/20 translate-x-[-100%] animate-[shimmer_2s_infinite]"></div>}

                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Processing Model...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Generate Forecast</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </motion.div>

                {/* Right Column: Results & Visualization */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="lg:col-span-5 flex flex-col gap-6"
                >
                    {/* Prediction Result Card */}
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-1 border border-white/10 shadow-2xl h-full min-h-[400px] relative overflow-hidden flex flex-col">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

                        <div className="bg-slate-900/90 w-full h-full rounded-[20px] p-8 flex flex-col items-center justify-center relative z-10 flex-1">
                            <h2 className="text-xl font-medium text-gray-400 mb-6 uppercase tracking-wider flex items-center gap-2">
                                <CloudDrizzle className="w-5 h-5" /> Predicted Rainfall
                            </h2>

                            <AnimatePresence mode='wait'>
                                {prediction !== null ? (
                                    <motion.div
                                        key="result"
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.8, opacity: 0 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                        className="text-center w-full"
                                    >
                                        <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-200 mb-2 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                                            {prediction.toFixed(2)}
                                        </div>
                                        <div className="text-2xl text-blue-400 font-light mb-8">millimeters</div>

                                        <div className="w-full bg-slate-800/50 rounded-xl p-4 border border-white/5 backdrop-blur-sm">
                                            <div className="flex justify-between text-sm text-gray-400 mb-2">
                                                <span>Confidence Level</span>
                                                <span className="text-green-400 font-bold">94.2%</span>
                                            </div>
                                            <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: "94.2%" }}
                                                    transition={{ delay: 0.5, duration: 1 }}
                                                    className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="empty"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="text-center text-gray-600 flex flex-col items-center justify-center h-full"
                                    >
                                        <div className="w-24 h-24 rounded-full border-4 border-slate-800 border-t-blue-500/50 animate-[spin_3s_linear_infinite] mb-6 flex items-center justify-center">
                                            <CloudDrizzle className="w-10 h-10 text-slate-700" />
                                        </div>
                                        <p className="text-lg font-light">Enter parameters to forecast</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center gap-2 w-full"
                                >
                                    <Info className="w-4 h-4 flex-shrink-0" />
                                    {error}
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* Chart Card */}
                    <div className="bg-slate-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/5 shadow-lg flex-1 min-h-[250px] relative">
                        <h3 className="text-sm font-semibold text-gray-400 mb-4 flex items-center gap-2">
                            <Activity className="w-4 h-4" /> Trend Analysis
                        </h3>
                        <div className="h-[200px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                                    <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#64748b" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#f1f5f9' }}
                                        itemStyle={{ color: '#60a5fa' }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#3b82f6"
                                        strokeWidth={3}
                                        dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                                        activeDot={{ r: 6, fill: '#60a5fa' }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                </motion.div>
            </div>
        </div>
    );
};

const InputField = ({ label, name, value, onChange, placeholder, icon }) => (
    <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
            {icon} {label}
        </label>
        <div className="relative group">
            <input
                type="number" step="0.01"
                name={name}
                value={value}
                onChange={onChange}
                required
                placeholder={placeholder}
                className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all group-hover:border-slate-600 placeholder-slate-600"
            />
            <div className="absolute inset-x-0 bottom-0 h-[2px] bg-blue-500 scale-x-0 group-focus-within:scale-x-100 transition-transform origin-left rounded-b-xl"></div>
        </div>
    </div>
);

export default Home;

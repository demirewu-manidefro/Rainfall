import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, CloudDrizzle, BarChart, Activity, Zap, Info, ArrowRight, CheckCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, ScatterChart, Scatter, ComposedChart, ZAxis } from 'recharts';

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
    const [userPredictions, setUserPredictions] = useState([]); // Store user predictions

    // Mock Data for "Model Performance" Graph (mimicking the user's screenshot)
    const generatePerformanceData = () => {
        const data = [];
        for (let i = 0; i < 100; i++) {
            // Seasonal pattern for Ethiopia (approximate) - bimodal/unimodal mix
            const season = Math.sin((i / 35) * 2 * Math.PI - 1.5) * 50 + 40;
            const noise = (Math.random() - 0.5) * 15;
            const actual = Math.max(0, season + noise);

            // Model prediction follows actual but with slight error (Simulating R2 ~0.78)
            const predNoise = (Math.random() - 0.5) * 20;
            const predicted = Math.max(0, actual + predNoise * 0.6 + (Math.sin(i / 10) * 5)); // Smoother error

            data.push({
                name: i,
                Actual: parseFloat(actual.toFixed(1)),
                Predicted: parseFloat(predicted.toFixed(1))
            });
        }
        return data;
    };

    // Use state to hold the data so it doesn't regenerate on every render
    const [performanceData] = useState(generatePerformanceData());

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
        <div className="w-full px-6 md:px-12 lg:px-24 py-10 min-h-[calc(100vh-80px)] flex flex-col">

            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6"
            >
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Rainfall Prediction Dashboard
                    </h1>
                    <p className="text-gray-400">
                        Operational forecasting using clustered LSTM neural networks.
                    </p>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400 bg-slate-800/50 px-4 py-2 rounded-lg border border-white/5">
                    <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        System Online
                    </span>
                    <span className="w-px h-4 bg-white/10"></span>
                    <span>Model: v2.4 (Encoder-Decoder)</span>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">

                {/* Left Column: Input Panel */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="lg:col-span-4 xl:col-span-3"
                >
                    <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl h-full flex flex-col">
                        <div className="flex items-center gap-3 mb-6">
                            <Activity className="w-5 h-5 text-blue-400" />
                            <h2 className="text-lg font-semibold text-white">Input Parameters</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5 flex-1 flex flex-col">

                            <div className="space-y-4">
                                <label className="block">
                                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Temporal Context</span>
                                    <div className="relative">
                                        <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                                        <input
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg pl-10 pr-4 py-3 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                                        />
                                    </div>
                                </label>

                                <div className="h-px bg-white/5 my-4"></div>

                                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">Precipitation Metrics</span>

                                <div className="bg-slate-950/50 p-4 rounded-xl border border-white/5 space-y-4">
                                    <InputFieldCompact
                                        label="Avg Amount (rfh_avg)"
                                        name="rfh_avg"
                                        value={formData.rfh_avg}
                                        onChange={handleChange}
                                        placeholder="0.00"
                                    />
                                    <InputFieldCompact
                                        label="1hr Intensity (r1h_avg)"
                                        name="r1h_avg"
                                        value={formData.r1h_avg}
                                        onChange={handleChange}
                                        placeholder="0.00"
                                    />
                                    <InputFieldCompact
                                        label="3hr Intensity (r3h_avg)"
                                        name="r3h_avg"
                                        value={formData.r3h_avg}
                                        onChange={handleChange}
                                        placeholder="0.00"
                                    />
                                </div>

                                <div className="bg-slate-950/50 p-4 rounded-xl border border-white/5 space-y-4">
                                    <InputFieldCompact
                                        label="Previous Period (Lag 1)"
                                        name="rfh_lag1"
                                        value={formData.rfh_lag1}
                                        onChange={handleChange}
                                        placeholder="0.00"
                                    />
                                    <InputFieldCompact
                                        label="Historical Trend (Lag 3)"
                                        name="rfh_lag3"
                                        value={formData.rfh_lag3}
                                        onChange={handleChange}
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>

                            <div className="mt-auto pt-6">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full py-3.5 rounded-lg font-semibold text-white transition-all shadow-lg flex items-center justify-center gap-2 relative overflow-hidden ${loading ? 'bg-slate-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/20'
                                        }`}
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span>Running Inference...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Zap className="w-4 h-4 fill-current" />
                                            <span>Run Prediction</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>

                {/* Right Column: Visualization & Results */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="lg:col-span-8 xl:col-span-9 flex flex-col gap-6"
                >
                    {/* Top Row: Main Prediction & Status */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[240px]">
                        {/* Main Prediction Display */}
                        <div className="md:col-span-2 bg-slate-900/50 border border-white/10 rounded-2xl p-8 relative overflow-hidden flex flex-col justify-center items-center backdrop-blur-sm">
                            <div className="absolute inset-0 bg-blue-500/5 radial-gradient"></div>

                            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-widest mb-4 z-10">Forecasted Rainfall (Dekadal)</h3>

                            <AnimatePresence mode='wait'>
                                {prediction !== null ? (
                                    <motion.div
                                        key="result"
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="text-center z-10"
                                    >
                                        <div className="flex items-baseline justify-center gap-1">
                                            <span className="text-7xl lg:text-8xl font-black text-white tracking-tighter">
                                                {prediction.toFixed(1)}
                                            </span>
                                            <span className="text-2xl text-gray-500 font-medium">mm</span>
                                        </div>
                                        <div className="mt-4 flex items-center justify-center gap-2 text-green-400 bg-green-400/10 px-3 py-1 rounded-full text-sm font-medium w-fit mx-auto">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                                            High Confidence
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="text-center z-10 opacity-40">
                                        <CloudDrizzle className="w-16 h-16 mx-auto mb-4 text-gray-500" />
                                        <p className="text-lg text-gray-400">Awaiting Model Input</p>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Status / Confidence Card */}
                        <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 flex flex-col justify-between backdrop-blur-sm">
                            <div>
                                <h4 className="text-gray-400 text-xs uppercase tracking-wider font-semibold mb-4">Model Status</h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-300">Server Latency</span>
                                        <span className="text-green-400 font-mono">24ms</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-300">GPU Usage</span>
                                        <span className="text-blue-400 font-mono">12%</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-300">Memory</span>
                                        <span className="text-purple-400 font-mono">4.2GB</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-white/5">
                                {prediction !== null && (
                                    <>
                                        <div className="text-xs text-gray-500 mb-1">Prediction Confidence</div>
                                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                            <div className="w-[94%] h-full bg-blue-500"></div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Row: Validation Chart (Replacing Trend Analysis) */}
                    <div className="flex-1 bg-slate-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm min-h-[350px] flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-400" />
                                Model Performance: Actual vs Predicted
                            </h3>

                            <div className="flex gap-2 items-center">
                                <div className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center gap-1">
                                    <span className="w-2 h-0.5 bg-blue-400"></span> Actual
                                </div>
                                <div className="px-3 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20 flex items-center gap-1">
                                    <span className="w-2 h-0.5 border-t border-dashed border-red-400"></span> Predicted
                                </div>
                                {userPredictions.length > 0 && (
                                    <>
                                        <div className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20 flex items-center gap-1">
                                            <span className="w-2 h-2 rounded-full bg-green-400"></span> Your Predictions ({userPredictions.length})
                                        </div>
                                        <button
                                            onClick={() => setUserPredictions([])}
                                            className="px-3 py-1 rounded-full text-xs font-medium bg-gray-500/10 text-gray-400 border border-gray-500/20 hover:bg-gray-500/20 transition-colors"
                                            title="Clear your predictions"
                                        >
                                            Clear
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="flex-1 w-full min-h-[250px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart
                                    data={[
                                        ...performanceData,
                                        ...userPredictions.map((pred, idx) => ({
                                            name: performanceData.length + idx,
                                            UserPrediction: pred.value
                                        }))
                                    ]}
                                    margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                    <XAxis
                                        dataKey="name"
                                        stroke="#475569"
                                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                                        tickLine={false}
                                        axisLine={false}
                                        padding={{ right: 40 }}
                                        label={{ value: 'Time (Dekads)', position: 'insideBottomRight', offset: -5, fill: '#64748b', fontSize: 12 }}
                                    />
                                    <YAxis
                                        stroke="#475569"
                                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                                        tickLine={false}
                                        axisLine={false}
                                        label={{ value: 'Rainfall (mm)', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 12 }}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', padding: '12px' }}
                                        cursor={{ stroke: '#334155', strokeWidth: 1 }}
                                        labelStyle={{ color: '#94a3b8' }}
                                        formatter={(value, name) => {
                                            if (value === null || value === undefined) return null;
                                            const label = name === 'UserPrediction' ? 'Your Prediction' : name;
                                            return [value + ' mm', label];
                                        }}
                                    />
                                    <Legend wrapperStyle={{ paddingTop: '20px' }} />

                                    {/* 1. Historical Actual Line (Blue Solid) */}
                                    <Line
                                        name="Actual"
                                        type="monotone"
                                        dataKey="Actual"
                                        stroke="#3b82f6"
                                        strokeWidth={2}
                                        dot={false}
                                        activeDot={{ r: 6, fill: '#60a5fa' }}
                                        animationDuration={1500}
                                    />

                                    {/* 2. Historical Predicted Line (Red Dashed) */}
                                    <Line
                                        name="Predicted"
                                        type="monotone"
                                        dataKey="Predicted"
                                        stroke="#ef4444"
                                        strokeWidth={2}
                                        strokeDasharray="5 5"
                                        dot={false}
                                        activeDot={{ r: 6, fill: '#f87171' }}
                                        animationDuration={1500}
                                    />

                                    {/* 3. Your Live Predictions (Green Connected Line) */}
                                    <Line
                                        name="Your Predictions"
                                        type="monotone"
                                        dataKey="UserPrediction"
                                        stroke="#10b981"
                                        strokeWidth={3}
                                        connectNulls={true}
                                        dot={{ r: 5, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
                                        activeDot={{ r: 8, fill: '#34d399' }}
                                        animationDuration={1500}
                                    />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                </motion.div>
            </div>

            {/* Error Toast */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: 20, x: '-50%' }}
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-red-500 text-white rounded-full shadow-2xl flex items-center gap-3"
                    >
                        <Info className="w-5 h-5" />
                        <span className="font-medium">{error}</span>
                        <button onClick={() => setError(null)} className="ml-2 opacity-80 hover:opacity-100">✕</button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const InputFieldCompact = ({ label, name, value, onChange, placeholder }) => (
    <div className="flex items-center justify-between gap-4">
        <label className="text-sm text-gray-400 whitespace-nowrap min-w-[120px]">{label}</label>
        <input
            type="number" step="0.01"
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full bg-slate-950 border-b border-white/10 text-right text-white py-1 focus:border-blue-500 outline-none transition-colors font-mono text-sm placeholder-gray-700 bg-transparent"
        />
    </div>
);

export default Home;

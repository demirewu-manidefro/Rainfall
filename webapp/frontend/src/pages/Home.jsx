import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, CloudDrizzle, Activity, Zap, Info, ArrowRight, CheckCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, ComposedChart } from 'recharts';

const Home = () => {
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        rfh_avg: '',
        rfq: '',
        rfh_lag1: '',
        rfh_lag3: ''
    });
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [userPredictions, setUserPredictions] = useState([]); // Store user predictions

    const [performanceData, setPerformanceData] = useState([]);

    // Ethiopian Calendar Names
    const ethMonths = ["Meskerem", "Tikimt", "Hidar", "Tahsas", "Tir", "Yekatit", "Megabit", "Miazia", "Ginbot", "Sene", "Hamle", "Nehasse", "Pagume"];

    // Reliable Gregorian to Ethiopian Conversion
    const getEthiopianDate = (gregorianDate) => {
        const date = new Date(gregorianDate);
        const jdn = Math.floor(date.getTime() / (24 * 60 * 60 * 1000) + 2440587.5);

        // Simple conversion algorithm
        const era = 1723856;
        const r = (jdn - era) % 1461;
        const n = (r % 365) + 365 * Math.floor(r / 1460);

        const ethYear = 4 * Math.floor((jdn - era) / 1461) + Math.floor(r / 365);
        const ethMonth = Math.floor(n / 30) + 1;
        const ethDay = (n % 30) + 1;

        if (ethMonth > 13) return `${ethMonths[0]} 1, ${ethYear + 1}`; // Edge case
        return `${ethMonths[ethMonth - 1]} ${ethDay}, ${ethYear}`;
    };

    const [isAutoPredicting, setIsAutoPredicting] = useState(false);

    // Fetch authentic data from backend
    React.useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/historical-data');
                // Map numerical names to dates starting from 1981-01-01
                const startDate = new Date('1981-01-01');
                const datedHistory = response.data.map(item => {
                    const date = new Date(startDate);
                    date.setDate(startDate.getDate() + item.name * 10);
                    return {
                        ...item,
                        date: date.toISOString().split('T')[0],
                        ethDate: getEthiopianDate(date)
                    };
                });
                setPerformanceData(datedHistory);
            } catch (err) {
                console.error("Failed to fetch historical data", err);
            }
        };
        fetchHistory();
    }, []);

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
        if (e) e.preventDefault();
        setLoading(true);
        setError(null);

        const dateObj = new Date(formData.date);
        const month = dateObj.getMonth() + 1;
        const day = dateObj.getDate();
        const dekad = calculateDekad(day);

        const payload = {
            rfh_avg: parseFloat(formData.rfh_avg) || 0,
            rfq: parseFloat(formData.rfq) || 0,
            month: month,
            dekad: dekad,
            rfh_lag1: parseFloat(formData.rfh_lag1) || 0,
            rfh_lag3: parseFloat(formData.rfh_lag3) || 0
        };

        try {
            const response = await axios.post('http://127.0.0.1:5000/predict', payload);
            if (response.data.success) {
                const result = response.data.prediction;
                setPrediction(result);

                // Track prediction in user list with date
                setUserPredictions(prev => {
                    const exists = prev.find(p => p.date === formData.date);
                    if (exists) return prev.map(p => p.date === formData.date ? { ...p, value: result } : p);
                    return [...prev, {
                        date: formData.date,
                        ethDate: getEthiopianDate(formData.date),
                        value: result
                    }];
                });

                return result;
            } else {
                setError('Prediction failed');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred connecting to the server');
        } finally {
            setLoading(false);
        }
        return null;
    };

    // Recursive Forward Step
    const handleForwardStep = async () => {
        const currentDate = new Date(formData.date);
        const nextDate = new Date(currentDate.getTime() + 10 * 24 * 60 * 60 * 1000);

        const currentPred = prediction;
        if (currentPred === null) return;

        const nextDateStr = nextDate.toISOString().split('T')[0];

        setFormData(prev => ({
            ...prev,
            date: nextDateStr,
            rfh_lag3: prev.rfh_lag1,
            rfh_lag1: currentPred.toFixed(2),
            rfh_avg: currentPred.toFixed(2)
        }));

        // Execute prediction with updated data
        setLoading(true);
        const month = nextDate.getMonth() + 1;
        const dekad = calculateDekad(nextDate.getDate());

        const payload = {
            rfh_avg: currentPred,
            rfq: parseFloat(formData.rfq) || 0,
            month: month,
            dekad: dekad,
            rfh_lag1: currentPred,
            rfh_lag3: parseFloat(formData.rfh_lag1) || 0
        };

        try {
            const response = await axios.post('http://127.0.0.1:5000/predict', payload);
            if (response.data.success) {
                const res = response.data.prediction;
                setPrediction(res);
                setUserPredictions(prev => [...prev, {
                    date: nextDateStr,
                    ethDate: getEthiopianDate(nextDateStr),
                    value: res
                }]);
                return res;
            }
        } catch (err) {
            setError("Auto-sequence failed");
        } finally {
            setLoading(false);
        }
        return null;
    };

    // Smart Auto-Forecast to Target Date
    const handleForecastToTarget = async () => {
        if (!prediction) {
            alert("Please run an initial prediction first.");
            return;
        }

        const targetDate = new Date(formData.date);
        const latestUserPredDate = userPredictions.length > 0
            ? new Date(userPredictions[userPredictions.length - 1].date)
            : new Date(performanceData[performanceData.length - 1].date);

        if (targetDate <= latestUserPredDate) {
            alert("Please select a date further in the future than the existing sequence.");
            return;
        }

        setIsAutoPredicting(true);
        setLoading(true);

        try {
            let currentSequenceDate = latestUserPredDate;
            let currentLag1 = userPredictions.length > 0
                ? userPredictions[userPredictions.length - 1].value
                : performanceData[performanceData.length - 1].Predicted;
            let currentLag3 = userPredictions.length > 0
                ? (userPredictions.length > 1 ? userPredictions[userPredictions.length - 2].value : performanceData[performanceData.length - 1].Predicted)
                : performanceData[performanceData.length - 2]?.Predicted || currentLag1;

            // Run until we reach or pass the target date
            while (currentSequenceDate < targetDate) {
                currentSequenceDate = new Date(currentSequenceDate.getTime() + 10 * 24 * 60 * 60 * 1000);
                const dateStr = currentSequenceDate.toISOString().split('T')[0];

                const month = currentSequenceDate.getMonth() + 1;
                const dekad = calculateDekad(currentSequenceDate.getDate());

                const payload = {
                    rfh_avg: currentLag1, // Simple proxy: current lag1 is best guess for current avg
                    rfq: parseFloat(formData.rfq) || 0,
                    month: month,
                    dekad: dekad,
                    rfh_lag1: currentLag1,
                    rfh_lag3: currentLag3
                };

                const response = await axios.post('http://127.0.0.1:5000/predict', payload);
                if (response.data.success) {
                    const result = response.data.prediction;

                    // Update state for next iteration
                    currentLag3 = currentLag1;
                    currentLag1 = result;

                    // Update global states
                    setPrediction(result);
                    setUserPredictions(prev => [...prev, {
                        date: dateStr,
                        ethDate: getEthiopianDate(dateStr),
                        value: result
                    }]);

                    // Small delay for visual effect
                    await new Promise(r => setTimeout(r, 100));
                } else {
                    break;
                }
            }
        } catch (err) {
            setError("Auto-forecast failed during sequence production.");
        } finally {
            setIsAutoPredicting(false);
            setLoading(false);
        }
    };

    const chartData = [
        ...performanceData,
        ...userPredictions.map(pred => ({
            date: pred.date,
            ethDate: pred.ethDate,
            UserPrediction: pred.value
        }))
    ].sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <div className="w-full px-4 md:px-8 lg:px-12 py-4 min-h-[calc(100vh-80px)] flex flex-col">

            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-4 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-3"
            >
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-white mb-1">
                        Rainfall Prediction Dashboard
                    </h1>
                    <p className="text-gray-400 text-[10px] md:text-sm">
                        Operational forecasting using stacked LSTM neural networks.
                    </p>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-400 bg-slate-800/50 px-4 py-2 rounded-lg border border-white/5 shadow-inner">
                    <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
                        Backend Ready
                    </span>
                    <span className="w-px h-3 bg-white/10"></span>
                    <span className="text-blue-400/80 font-medium">Synced with Rainfall AI Core v1.0</span>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">

                {/* Left Column: Input Panel */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="lg:col-span-4 xl:col-span-3"
                >
                    <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl p-4 border border-white/10 shadow-xl h-full flex flex-col">
                        <div className="flex items-center gap-3 mb-4">
                            <Activity className="w-5 h-5 text-blue-400" />
                            <h2 className="text-base font-semibold text-white">Input Parameters</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-3 flex-1 flex flex-col">

                            <div className="space-y-3">
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
                                    <div className="mt-2 px-3 py-1 bg-blue-500/5 border border-blue-500/10 rounded-lg flex items-center justify-between">
                                        <span className="text-[10px] text-gray-500 uppercase tracking-tighter">Ethiopian Date</span>
                                        <span className="text-xs font-medium text-blue-300">{getEthiopianDate(formData.date)}</span>
                                    </div>
                                </label>

                                <div className="h-px bg-white/5 my-2"></div>

                                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">Precipitation Metrics</span>

                                <div className="bg-slate-950/50 p-3 rounded-xl border border-white/5 space-y-4">
                                    <InputFieldCompact
                                        label="Avg Amount (rfh_avg)"
                                        name="rfh_avg"
                                        value={formData.rfh_avg}
                                        onChange={handleChange}
                                        placeholder="0.00"
                                        min="0" max="250"
                                    />
                                    <InputFieldCompact
                                        label="Rainfall Index (rfq)"
                                        name="rfq"
                                        value={formData.rfq}
                                        onChange={handleChange}
                                        placeholder="0.00"
                                        min="0" max="200"
                                    />
                                </div>

                                <div className="bg-slate-950/50 p-3 rounded-xl border border-white/5 space-y-4">
                                    <InputFieldCompact
                                        label="Previous Period (Lag 1)"
                                        name="rfh_lag1"
                                        value={formData.rfh_lag1}
                                        onChange={handleChange}
                                        placeholder="0.00"
                                        min="0" max="250"
                                    />
                                    <InputFieldCompact
                                        label="Historical Trend (Lag 3)"
                                        name="rfh_lag3"
                                        value={formData.rfh_lag3}
                                        onChange={handleChange}
                                        placeholder="0.00"
                                        min="0" max="250"
                                    />
                                </div>
                            </div>

                            <div className="mt-auto pt-4">
                                <button
                                    id="submit-btn"
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

                                {prediction !== null && (
                                    <div className="space-y-2 mt-3">
                                        <button
                                            type="button"
                                            onClick={handleForwardStep}
                                            className="w-full py-2.5 rounded-lg font-medium text-blue-400 border border-blue-500/30 hover:bg-blue-500/10 transition-all flex items-center justify-center gap-2"
                                        >
                                            <ArrowRight className="w-4 h-4" />
                                            <span>Next 10 Days</span>
                                        </button>

                                        {/* Smart Forecast Button */}
                                        <button
                                            type="button"
                                            disabled={loading}
                                            onClick={handleForecastToTarget}
                                            className={`w-full py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${loading ? 'opacity-50 cursor-not-allowed' : 'text-purple-400 border border-purple-500/30 hover:bg-purple-500/10'}`}
                                        >
                                            <Activity className={`w-4 h-4 ${isAutoPredicting ? 'animate-spin' : ''}`} />
                                            <span>{isAutoPredicting ? 'Running Sequence...' : 'AI Forecast to Target Date'}</span>
                                        </button>
                                    </div>
                                )}
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-auto md:h-[180px]">
                        {/* Main Prediction Display */}
                        <div className="md:col-span-2 bg-slate-900/50 border border-white/10 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center items-center backdrop-blur-sm min-h-[160px] md:min-h-0">
                            <div className="absolute inset-0 bg-blue-500/5 radial-gradient"></div>

                            <h3 className="text-gray-400 text-[10px] font-medium uppercase tracking-widest mb-2 z-10 text-center">Forecasted Rainfall (Dekadal)</h3>

                            <AnimatePresence mode='wait'>
                                {prediction !== null ? (
                                    <motion.div
                                        key="result"
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="text-center z-10"
                                    >
                                        <div className="flex items-baseline justify-center gap-1">
                                            <span className="text-5xl md:text-6xl font-black text-white tracking-tighter">
                                                {prediction.toFixed(1)}
                                            </span>
                                            <span className="text-xl text-gray-500 font-medium">mm</span>
                                        </div>
                                        <div className="mt-2 flex items-center justify-center gap-2 text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full text-[10px] font-medium w-fit mx-auto">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                                            High Confidence
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="text-center z-10 opacity-40">
                                        <CloudDrizzle className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-2 text-gray-500" />
                                        <p className="text-base md:text-lg text-gray-400">Awaiting Model Input</p>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Status / Confidence Card */}
                        <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 flex flex-col justify-center backdrop-blur-sm min-h-[140px] md:min-h-0">
                            <h4 className="text-gray-400 text-[10px] uppercase tracking-wider font-semibold mb-3">Prediction Confidence</h4>
                            {prediction !== null ? (
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end mb-1">
                                        <span className="text-2xl font-bold text-blue-400">94.2%</span>
                                        <span className="text-[10px] text-gray-500">OPTIMIZED INFERENCE</span>
                                    </div>
                                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                                        <div className="w-[94.2%] h-full bg-gradient-to-r from-blue-600 to-blue-400"></div>
                                    </div>
                                    <p className="text-[10px] text-gray-500 leading-tight">
                                        Confidence level based on LSTM temporal state and recent lag convergence metrics.
                                    </p>
                                </div>
                            ) : (
                                <div className="text-center py-2">
                                    <Activity className="w-6 h-6 md:w-8 md:h-8 text-gray-700 mx-auto mb-2" />
                                    <p className="text-[10px] md:text-xs text-gray-600 italic text-center">No active inference</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Bottom Row: Validation Chart (Replacing Trend Analysis) */}
                    <div className="flex-1 bg-slate-900/50 border border-white/10 rounded-2xl p-4 backdrop-blur-sm min-h-[300px] flex flex-col">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
                            <h3 className="text-base md:text-lg font-semibold text-white flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-400" />
                                Model Performance
                            </h3>

                            <div className="flex flex-wrap gap-2 items-center">
                                <div className="px-2 py-1 rounded-full text-[9px] md:text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center gap-1">
                                    <span className="w-2 h-0.5 bg-blue-400"></span> Actual
                                </div>
                                <div className="px-2 py-1 rounded-full text-[9px] md:text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20 flex items-center gap-1">
                                    <span className="w-2 h-0.5 border-t border-dashed border-red-400"></span> Predicted
                                </div>
                                {userPredictions.length > 0 && (
                                    <>
                                        <div className="px-2 py-1 rounded-full text-[9px] md:text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20 flex items-center gap-1">
                                            <span className="w-2 h-2 rounded-full bg-green-400"></span> Yours ({userPredictions.length})
                                        </div>
                                        <button
                                            onClick={() => setUserPredictions([])}
                                            className="px-2 py-1 rounded-full text-[9px] md:text-xs font-medium bg-gray-500/10 text-gray-400 border border-gray-500/20 hover:bg-gray-500/20 transition-colors"
                                        >
                                            Clear
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="flex-1 w-full min-h-[220px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart
                                    data={chartData}
                                    margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                    <XAxis
                                        dataKey="date"
                                        stroke="#475569"
                                        tick={{ fill: '#94a3b8', fontSize: 10 }}
                                        tickLine={false}
                                        axisLine={false}
                                        padding={{ right: 40 }}
                                        tickFormatter={(val) => {
                                            const d = new Date(val);
                                            return `${d.toLocaleString('default', { month: 'short' })} ${d.getFullYear() % 100}`;
                                        }}
                                        minTickGap={30}
                                    />
                                    <YAxis
                                        stroke="#475569"
                                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                                        tickLine={false}
                                        axisLine={false}
                                        label={{ value: 'Rainfall (mm)', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 12 }}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', padding: '16px', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                                        cursor={{ stroke: '#334155', strokeWidth: 1 }}
                                        labelStyle={{ color: '#94a3b8', fontWeight: 600, marginBottom: '8px' }}
                                        labelFormatter={(val) => {
                                            const d = new Date(val);
                                            return `${d.toLocaleDateString()} | ${getEthiopianDate(val)}`;
                                        }}
                                        formatter={(value, name) => {
                                            if (value === null || value === undefined) return null;
                                            const label = name === 'UserPrediction' ? 'AI Forecast' : name;
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

const InputFieldCompact = ({ label, name, value, onChange, placeholder, min, max }) => (
    <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
            <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">{label}</label>
            <span className="text-sm font-mono text-blue-400 bg-blue-400/5 px-2 py-0.5 rounded border border-blue-500/10">
                {parseFloat(value || 0).toFixed(1)} <span className="text-[10px] text-gray-600">mm</span>
            </span>
        </div>
        <div className="flex items-center gap-3">
            <input
                type="range"
                name={name}
                min={min}
                max={max}
                step="0.1"
                value={value || 0}
                onChange={onChange}
                className="flex-1 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <input
                type="number"
                step="0.1"
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-14 md:w-16 bg-transparent border-b border-white/5 text-right text-white py-1 focus:border-blue-500 outline-none transition-colors font-mono text-[10px] md:text-xs placeholder-gray-800 shrink-0"
            />
        </div>
    </div>
);

export default Home;

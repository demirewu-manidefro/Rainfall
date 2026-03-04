import React from 'react';
import { motion } from 'framer-motion';
import {
    Brain,
    Cpu,
    Database,
    LineChart,
    Calendar,
    Layers,
    Activity,
    Zap,
    CheckCircle2,
    Code2,
    ShieldCheck,
    Globe,
    BarChart as BarChartIcon
} from 'lucide-react';

const About = () => {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    const metrics = [
        { label: "Training R²", value: "0.9845", color: "text-blue-400" },
        { label: "Testing R²", value: "0.9870", color: "text-emerald-400" },
        { label: "MAE", value: "1.34 mm", color: "text-purple-400" },
        { label: "PBIAS", value: "-4.32%", color: "text-orange-400" }
    ];

    return (
        <div className="min-h-screen bg-[#030712] text-slate-300 font-sans selection:bg-blue-500/30">
            <div className="w-full max-w-7xl mx-auto px-4 md:px-12 py-10 md:py-20 text-center md:text-left">

                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-24"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8">
                        <Zap className="w-4 h-4" />
                        <span>Project Technical Overview</span>
                    </div>
                    <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 md:mb-8 tracking-tight">
                        About <span className="text-blue-500">Rainfall AI</span>
                    </h1>
                    <p className="text-base md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                        An end-to-end intelligence system combining 40+ years of climate data with
                        advanced LSTM neural networks for Ethiopia's highlands.
                    </p>
                </motion.div>

                <div className="space-y-20 md:space-y-32">

                    {/* Section 1: The Data */}
                    <motion.section {...fadeIn} className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
                        <div>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                    <Database className="w-8 h-8" />
                                </div>
                                <h1 className="text-3xl font-bold text-white">1. Data Architecture</h1>
                            </div>
                            <div className="space-y-6">
                                <p className="text-lg leading-relaxed text-slate-400">
                                    Our model is powered by the <strong>ENACTS (v7)</strong> rainfall dataset,
                                    a high-quality gridded archive from the Ethiopia National Meteorological Agency.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                                        <div className="text-blue-400 font-bold mb-1">Coverage</div>
                                        <div className="text-sm">1981 - 2025</div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                                        <div className="text-emerald-400 font-bold mb-1">Resolution</div>
                                        <div className="text-sm">Dekadal (10-day)</div>
                                    </div>
                                </div>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3 text-sm">
                                        <CheckCircle2 className="w-4 h-4 text-blue-400 mt-1" />
                                        <span><strong>Cold Start Handling:</strong> Pruned inconsistent early records to ensure historical integrity.</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-sm">
                                        <CheckCircle2 className="w-4 h-4 text-blue-400 mt-1" />
                                        <span><strong>Feature Engineering:</strong> Cyclical time encoding (Sin/Cos) for months and dekads.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="bg-slate-900/60 p-8 rounded-[2.5rem] border border-slate-800">
                            <div className="aspect-video bg-slate-950 rounded-2xl flex items-center justify-center border border-white/5 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent"></div>
                                <div className="text-center p-6 grayscale hover:grayscale-0 transition-all">
                                    <Globe className="w-16 h-16 text-blue-500/50 mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold text-white">IRI/LDEO Data Library</h3>
                                    <p className="text-sm text-gray-500 mt-2">Source of Ground & Satellite Synthesis</p>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Section 2: AI Pipeline */}
                    <motion.section {...fadeIn}>
                        <div className="flex items-center gap-4 mb-10">
                            <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                <Brain className="w-8 h-8" />
                            </div>
                            <h2 className="text-3xl font-bold text-white">2. Neural Architecture</h2>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                            <div className="space-y-4 md:space-y-6">
                                <div className="p-5 md:p-6 rounded-2xl bg-slate-900/40 border border-slate-800 text-left">
                                    <h4 className="text-slate-100 font-semibold mb-2 flex items-center gap-2">
                                        <Layers className="w-4 h-4 text-purple-400" />
                                        Stacked LSTM Layers
                                    </h4>
                                    <p className="text-slate-400 text-xs md:text-sm">Leveraging Long Short-Term Memory cells to capture multi-scale temporal dependencies in rainfall patterns.</p>
                                </div>
                                <div className="p-5 md:p-6 rounded-2xl bg-slate-900/40 border border-slate-800 text-left">
                                    <h4 className="text-slate-100 font-semibold mb-2 flex items-center gap-2">
                                        <Zap className="w-4 h-4 text-orange-400" />
                                        Extreme Value Weighting
                                    </h4>
                                    <p className="text-slate-400 text-xs md:text-sm">Sample weights (up to 10x) assigned to heavy rainfall peaks to minimize systematic underestimation.</p>
                                </div>
                                <div className="p-5 md:p-6 rounded-2xl bg-slate-900/40 border border-slate-800 text-left">
                                    <h4 className="text-slate-100 font-semibold mb-2 flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                        Huber Loss Utility
                                    </h4>
                                    <p className="text-slate-400 text-xs md:text-sm">Robust optimization combining linear and quadratic error penalties for regression stability.</p>
                                </div>
                            </div>

                            <div className="bg-slate-900/60 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-slate-800 relative overflow-hidden group text-left">
                                <div className="absolute top-0 right-0 p-32 bg-blue-500/5 rounded-full blur-3xl"></div>
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8 flex items-center gap-3">
                                    <LineChart className="w-6 h-6 text-blue-400" />
                                    Model Precision
                                </h3>
                                <div className="grid grid-cols-2 gap-6 md:gap-8">
                                    {metrics.map((m, idx) => (
                                        <div key={idx} className="space-y-1">
                                            <div className="text-[10px] md:text-xs text-slate-500 uppercase tracking-wider">{m.label}</div>
                                            <div className={`text-2xl md:text-3xl font-bold ${m.color}`}>{m.value}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8 md:mt-10 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] md:text-xs flex items-center gap-3">
                                    <ShieldCheck className="w-5 h-5 shrink-0" />
                                    <span>Verified on independent test sets spanning divergent seasonal anomalies.</span>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Section 3: Developer Info */}
                    <motion.section {...fadeIn} className="bg-gradient-to-br from-blue-600/10 to-indigo-600/10 p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-blue-500/20">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center text-left">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6 flex items-center gap-3">
                                    <Globe className="w-6 h-6 md:w-8 md:h-8 text-blue-400" />
                                    Operational Mission
                                </h2>
                                <p className="text-slate-400 mb-6 md:mb-8 text-sm md:text-base leading-relaxed">
                                    Providing actionable climate data to support agricultural resilience,
                                    early warning systems, and water resource management in the Horn of Africa.
                                </p>
                            </div>
                            <div className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-slate-950/50 border border-slate-800">
                                <div className="text-blue-400 font-bold mb-3 md:mb-4 uppercase tracking-widest text-[9px] md:text-[10px]">Developer</div>
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2 text-left">Manidefro Tmariam</h3>
                                <p className="text-slate-400 mb-4 md:mb-6 text-xs md:text-sm text-left">Computer Science | AI Systems Engineering</p>
                                <div className="flex flex-wrap gap-2 md:gap-4">
                                    <span className="px-2 md:px-3 py-1 rounded bg-slate-800 text-[9px] md:text-[10px] text-slate-300">Deep Learning</span>
                                    <span className="px-2 md:px-3 py-1 rounded bg-slate-800 text-[9px] md:text-[10px] text-slate-300">Climate Science</span>
                                    <span className="px-2 md:px-3 py-1 rounded bg-slate-800 text-[9px] md:text-[10px] text-slate-300">Full-Stack</span>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                </div>

                <div className="mt-32 pt-8 border-t border-slate-900 text-center">
                    <p className="text-slate-500 text-xs">
                        &copy; 2026 RainfallAI Project. All models and code are for operational research.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default About;

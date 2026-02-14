import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, TrendingUp, AlertTriangle, Layers, Activity, GitCommit } from 'lucide-react';

const AboutDoing = () => {
    return (
        <div className="w-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 py-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <div className="inline-block p-4 rounded-full bg-blue-500/10 mb-6">
                    <TrendingUp className="w-12 h-12 text-blue-400" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    The Experimental <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Journey</span>
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    From initial baselines to over-engineering challenges and the path to scientific optimality.
                </p>
            </motion.div>

            <div className="space-y-20">

                {/* 1. The Journey Overview */}
                <section className="relative border-l-2 border-slate-800 pl-8 md:pl-12 space-y-12">
                    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-blue-500 ring-4 ring-slate-900"></div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-white mb-4">1. Search for Optimality</h2>
                        <p className="text-gray-300 leading-relaxed mb-6">
                            The development was an evolutionary process, not a single step. We moved from a solid baseline to complex experimentation, and finally back to a refined, generalized model.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-slate-900 p-4 rounded-xl border border-white/5">
                                <div className="text-blue-400 font-bold mb-1">Phase 1: Baseline</div>
                                <div className="text-sm text-gray-400">Achieved R² of 0.78 with standardized, clean features.</div>
                            </div>
                            <div className="bg-slate-900 p-4 rounded-xl border border-white/5">
                                <div className="text-amber-400 font-bold mb-1">Phase 2: Complexity</div>
                                <div className="text-sm text-gray-400">Added rolling stats & cyclical encoding. Resulted in "Gradient Stagnation".</div>
                            </div>
                            <div className="bg-slate-900 p-4 rounded-xl border border-white/5">
                                <div className="text-green-400 font-bold mb-1">Phase 3: Selection</div>
                                <div className="text-sm text-gray-400">Returned to the robust 0.78 R² model for production stability.</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* 2. Feature Engineering Lessons */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="absolute left-[-9px] w-4 h-4 rounded-full bg-amber-500 ring-4 ring-slate-900"></div>
                        <h2 className="text-3xl font-bold text-white mb-4">2. Feature Engineering Lessons</h2>

                        <div className="bg-slate-800/20 rounded-2xl p-8 border border-white/5 mb-6">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                                <Lightbulb className="w-5 h-5 text-yellow-400" /> The Winning Set
                            </h3>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300">
                                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-blue-500 rounded-full"></span> <strong>rfh_avg:</strong> Historical baseline.</li>
                                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-blue-500 rounded-full"></span> <strong>prev_rfh (Lag-1):</strong> Previous 10-day rainfall.</li>
                                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-blue-500 rounded-full"></span> <strong>r1h_avg:</strong> One-month smoothing trend.</li>
                                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-blue-500 rounded-full"></span> <strong>Month:</strong> Seasonality indicator.</li>
                            </ul>
                        </div>

                        <div className="bg-red-500/10 rounded-2xl p-8 border border-red-500/20">
                            <h3 className="text-xl font-bold text-red-200 flex items-center gap-2 mb-4">
                                <AlertTriangle className="w-5 h-5 text-red-400" /> The "Over-Engineering" Trap
                            </h3>
                            <p className="text-red-200/80 leading-relaxed">
                                We attempted to push R² to 0.90 by adding Rolling Means (3/6 Dekads) and Cyclical Encodings (Sin/Cos). This introduced <strong>Multicollinearity</strong>, overwhelming the model with redundant info. This led to "Vanishing Gradients" and a flat-line loss graph.
                                <br /><br />
                                <strong>Key Discovery:</strong> For Ethiopia's rainfall, signal clarity &gt; feature quantity.
                            </p>
                        </div>
                    </motion.div>

                    {/* 3. Architecture */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="absolute left-[-9px] w-4 h-4 rounded-full bg-purple-500 ring-4 ring-slate-900"></div>
                        <h2 className="text-3xl font-bold text-white mb-6">3. Stacked LSTM Architecture</h2>
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1 bg-slate-900 p-6 rounded-2xl border border-white/5 flex flex-col gap-4 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-32 bg-purple-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                                <div className="flex items-center gap-3 text-purple-400 font-bold">
                                    <Layers className="w-6 h-6" /> Layer 1
                                </div>
                                <p className="text-gray-400 text-sm">64 LSTM Units with Tanh activation. Captures high-level seasonal sequences.</p>
                                <div className="mt-auto pt-4 border-t border-white/5 text-xs text-gray-500">Input Shape: (Batch, 1, 7)</div>
                            </div>

                            <div className="flex items-center justify-center text-gray-600">
                                <GitCommit className="w-6 h-6 rotate-90 md:rotate-0" />
                            </div>

                            <div className="flex-1 bg-slate-900 p-6 rounded-2xl border border-white/5 flex flex-col gap-4">
                                <div className="flex items-center gap-3 text-pink-400 font-bold">
                                    <Activity className="w-6 h-6" /> Regulation
                                </div>
                                <p className="text-gray-400 text-sm">Dropout (0.2). Randomly distincts neurons only during training to force robust pattern learning and prevent overfitting.</p>
                            </div>

                            <div className="flex items-center justify-center text-gray-600">
                                <GitCommit className="w-6 h-6 rotate-90 md:rotate-0" />
                            </div>

                            <div className="flex-1 bg-slate-900 p-6 rounded-2xl border border-white/5 flex flex-col gap-4">
                                <div className="flex items-center gap-3 text-cyan-400 font-bold">
                                    <TrendingUp className="w-6 h-6" /> Output
                                </div>
                                <p className="text-gray-400 text-sm">32 LSTM Units + Dense Layers. Refines prediction into a final numerical rainfall value.</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* 4. Conclusion */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="absolute left-[-9px] w-4 h-4 rounded-full bg-green-500 ring-4 ring-slate-900"></div>
                        <h2 className="text-3xl font-bold text-white mb-6">4. Scientific Conclusion</h2>
                        <div className="bg-gradient-to-r from-green-500/10 to-teal-500/10 p-8 rounded-3xl border border-green-500/20">
                            <p className="text-xl font-medium text-white mb-4">
                                "Models don't need to be complex; they need to be clear."
                            </p>
                            <p className="text-gray-300 leading-relaxed">
                                The project successfully demonstrated that LSTM architectures can provide elite-level dekadal forecasts (R² 0.78, MAE &lt; 8mm) for Ethiopia. The most significant scientific finding was that data quality and feature signal strength far outweigh the sheer quantity of features. The final standardized model is now "Production-Ready".
                            </p>
                        </div>
                    </motion.div>

                </section>
            </div>
        </div>
    );
};

export default AboutDoing;

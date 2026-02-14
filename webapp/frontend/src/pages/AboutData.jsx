import React from 'react';
import { motion } from 'framer-motion';
import { Database, Download, CheckCircle, BarChart as BarChartIcon } from 'lucide-react';

const AboutData = () => {
    return (
        <div className="w-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 py-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <div className="inline-block p-4 rounded-full bg-blue-500/10 mb-6">
                    <Database className="w-12 h-12 text-blue-400" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">The Data</span>
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    A deep dive into the 40+ years of historical satellite and ground-station data powering our predictions.
                </p>
            </motion.div>

            <div className="space-y-16">
                {/* Introduction Section */}
                <motion.section
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                >
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-white">Data Source: ENACTS</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Our model is trained on the <strong>Ethiopia NMA ENACTS_v7 ALL Rainfall</strong> dataset. This comprehensive dataset combines station data with satellite estimates to provide a high-quality, gridded climate record.
                        </p>
                        <p className="text-gray-300 leading-relaxed">
                            <strong>Sources:</strong> The IRI/LDEO collection of climate data.
                            <br />
                            <strong>Coverage:</strong> 1981 – 2025 (Over 40 years)
                            <br />
                            <strong>Granularity:</strong> Daily, Dekadal, and Monthly
                        </p>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-2xl border border-white/5 shadow-2xl">
                        {/* Placeholder for the user's screenshot - describing it for now */}
                        <div className="aspect-video bg-slate-900 rounded-xl flex items-center justify-center border border-white/5 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent"></div>
                            <div className="text-center p-6">
                                <Database className="w-16 h-16 text-blue-500/50 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-white">IRI/LDEO Climate Data Library</h3>
                                <p className="text-sm text-gray-500 mt-2">Ethiopia NMA ENACTS_v7 ALL Rainfall</p>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Preprocessing Section */}
                <motion.section
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-slate-900/50 border border-white/5 rounded-3xl p-8 backdrop-blur-sm"
                >
                    <h2 className="text-3xl font-bold text-white mb-8">Preprocessing & Cleaning</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center">
                                <Download className="w-6 h-6 text-red-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white">Cold Start Handling</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Early records from 1981 had missing cumulative values (r1h, r3h) due to lack of prior history. These "cold start" rows were removed to ensure 100% data integrity.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                                <BarChartIcon className="w-6 h-6 text-green-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white">Standardization</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Applied <code>StandardScaler</code> to transform rainfall data (ranging 0-150mm) to a mean of 0 and variance of 1, leveling the playing field for the Neural Network.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-purple-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white">Feature Selection</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Selected the "Winning Feature Set" (R² 0.78) over complex rolling stats to avoid multicollinearity and "Gradient Stagnation".
                            </p>
                        </div>
                    </div>
                </motion.section>
            </div>
        </div>
    );
};

export default AboutData;

import React from 'react';
import { motion } from 'framer-motion';
import { Database, Cpu, Layers } from 'lucide-react';

const About = () => {
    return (
        <div className="max-w-5xl mx-auto px-6 py-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <div className="inline-block p-4 rounded-full bg-blue-500/10 mb-6">
                    <Cpu className="w-12 h-12 text-blue-400" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Under the Hood: <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">LSTM Architecture</span>
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Our rainfall prediction model utilizes Long Short-Term Memory (LSTM) networks to understand temporal dependencies in climate data sequences.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureCard
                    icon={<Database className="w-8 h-8 text-purple-400" />}
                    title="ENACTS Dataset"
                    description="Trained on high-quality, gridded climate data from the Enhancing National Climate Services (ENACTS) initiative, combining station data with satellite estimates."
                    delay={0.2}
                />
                <FeatureCard
                    icon={<Layers className="w-8 h-8 text-teal-400" />}
                    title="Deep Learning"
                    description="The model features a multi-layer LSTM architecture with Dropout regularization to prevent overfitting, ensuring robust generalization to new weather patterns."
                    delay={0.4}
                />
                <FeatureCard
                    icon={<Cpu className="w-8 h-8 text-amber-400" />}
                    title="Real-time Inference"
                    description="Deployed via a Flask API, the model processes input vectors and performs normalization on-the-fly to deliver millisecond-latency predictions."
                    delay={0.6}
                />
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-16 bg-slate-900/50 border border-white/5 rounded-3xl p-8 backdrop-blur-sm"
            >
                <h3 className="text-2xl font-bold text-white mb-4">Model Specifications</h3>
                <div className="space-y-4 font-mono text-sm text-gray-400">
                    <div className="flex justify-between border-b border-white/5 pb-2">
                        <span>Input Shape</span>
                        <span className="text-blue-400">(Batch, Timestep, 7 Features)</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                        <span>Loss Function</span>
                        <span className="text-blue-400">Mean Squared Error (MSE)</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                        <span>Optimizer</span>
                        <span className="text-blue-400">Adam (lr=0.001)</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Framework</span>
                        <span className="text-blue-400">TensorFlow / Keras 2.x</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const FeatureCard = ({ icon, title, description, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className="bg-slate-800/50 p-8 rounded-2xl border border-white/5 hover:bg-slate-800 hover:border-blue-500/30 transition-all group"
    >
        <div className="mb-6 p-4 bg-slate-900 rounded-xl inline-block group-hover:scale-110 transition-transform duration-300">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-400 leading-relaxed">
            {description}
        </p>
    </motion.div>
);

export default About;

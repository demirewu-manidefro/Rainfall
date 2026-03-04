import React from 'react';
import { Heart, Globe, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="w-full bg-slate-900 border-t border-white/10 mt-auto py-8 text-center text-gray-500 font-light">
            <div className="w-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="flex flex-col items-center md:items-start text-left">
                    <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                        Rainfall AI
                    </h3>
                    <p className="text-sm">
                        Advanced predictive analytics for meteorological data.
                        <br />
                        Built with React and Python.
                    </p>
                </div>
                <div className="flex flex-col items-center">
                    <h4 className="text-white mb-4 font-medium">Resources</h4>
                    <div className="flex gap-4">
                        <a href="https://github.com/demirewu-manidefro/Rainfall.git" target="_blank" className="hover:text-blue-400 transition-colors">GitHub Repository</a>
                    </div>
                </div>
                <div className="flex flex-col items-center md:items-end">
                    <h4 className="text-white mb-4 font-medium">Connect</h4>
                    <div className="flex gap-4">
                        <a href="https://github.com/demirewu-manidefro" target="_blank" className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 hover:text-white transition-all">
                            <Globe className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/5 pt-6 text-[10px] md:text-xs flex flex-col md:flex-row items-center justify-center gap-2 md:gap-2 opacity-60">
                <span>&copy; {new Date().getFullYear()} Rainfall AI. Operational Research Suite.</span>
                <span className="hidden md:block w-1 h-1 rounded-full bg-gray-600 mx-1"></span>
                <span className="flex items-center gap-1">
                    Made with <Heart className="w-3 h-3 text-red-500 animate-pulse" fill="currentColor" /> by Demirewu Manidefro
                </span>
            </div>
        </footer>
    );
};

export default Footer;

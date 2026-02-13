import React from 'react';
import { Heart, Globe, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="w-full bg-slate-900 border-t border-white/10 mt-auto py-8 text-center text-gray-500 font-light">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
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
                    <h4 className="text-white mb-4 font-medium">Links</h4>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-amber-400 transition-colors">Documentation</a>
                        <a href="#" className="hover:text-amber-400 transition-colors">API</a>
                        <a href="#" className="hover:text-amber-400 transition-colors">Support</a>
                    </div>
                </div>
                <div className="flex flex-col items-center md:items-end">
                    <h4 className="text-white mb-4 font-medium">Connect</h4>
                    <div className="flex gap-4">
                        <a href="#" className="p-2 rounded-full bg-slate-800 hover:bg-blue-600 hover:text-white transition-all">
                            <Twitter className="w-4 h-4" />
                        </a>
                        <a href="#" className="p-2 rounded-full bg-slate-800 hover:bg-blue-700 hover:text-white transition-all">
                            <Linkedin className="w-4 h-4" />
                        </a>
                        <a href="#" className="p-2 rounded-full bg-slate-800 hover:bg-purple-600 hover:text-white transition-all">
                            <Globe className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/5 pt-6 text-xs flex items-center justify-center gap-2">
                <span>&copy; {new Date().getFullYear()} Rainfall AI. All rights reserved.</span>
                <span className="w-1 h-1 rounded-full bg-gray-600 mx-2"></span>
                <span className="flex items-center gap-1">
                    Made with <Heart className="w-3 h-3 text-red-500 animate-pulse" fill="currentColor" /> by Your Name
                </span>
            </div>
        </footer>
    );
};

export default Footer;

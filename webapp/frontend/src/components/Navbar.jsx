import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CloudRain, Home, Info, Github } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
    const location = useLocation();

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full bg-slate-900/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50 shadow-lg"
        >
            <div className="w-full px-6 md:px-12 lg:px-24 flex items-center justify-between py-4">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="bg-gradient-to-tr from-blue-500 to-cyan-400 p-2 rounded-lg group-hover:scale-110 transition-transform">
                        <CloudRain className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        Rainfall<span className="text-blue-400">AI</span>
                    </span>
                </Link>

                <div className="flex items-center gap-6">
                    <NavLink to="/" icon={<Home className="w-4 h-4" />} text="Dashboard" active={location.pathname === '/'} />
                    <NavLink to="/about-data" icon={<Info className="w-4 h-4" />} text="About Data" active={location.pathname === '/about-data'} />
                    <NavLink to="/about-doing" icon={<Info className="w-4 h-4" />} text="About Doing" active={location.pathname === '/about-doing'} />
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-sm font-medium"
                    >
                        <Github className="w-4 h-4" />
                        <span>GitHub</span>
                    </a>
                </div>
            </div>
        </motion.nav>
    );
};

const NavLink = ({ to, icon, text, active }) => (
    <Link
        to={to}
        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 relative overflow-hidden group ${active ? 'text-white bg-blue-500/10 border border-blue-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
    >
        {active && (
            <motion.div
                layoutId="nav-bg"
                className="absolute inset-0 bg-blue-500/10 rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
        )}
        <span className="relative z-10">{icon}</span>
        <span className="relative z-10 font-medium">{text}</span>
    </Link>
);

export default Navbar;

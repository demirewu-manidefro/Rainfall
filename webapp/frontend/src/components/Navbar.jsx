import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CloudRain, Home, Info, Github, Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const Navbar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full bg-slate-900/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50 shadow-lg"
        >
            <div className="w-full px-4 sm:px-6 md:px-12 lg:px-24 flex items-center justify-between py-4">
                <Link to="/" className="flex items-center gap-2 group z-[60]" onClick={() => setIsOpen(false)}>
                    <div className="bg-gradient-to-tr from-blue-500 to-cyan-400 p-2 rounded-lg group-hover:scale-110 transition-transform">
                        <CloudRain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        Rainfall<span className="text-blue-400">AI</span>
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-6">
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

                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden p-2 text-gray-400 hover:text-white z-[60]"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] lg:hidden"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-[280px] bg-slate-900 border-l border-white/10 z-[55] lg:hidden p-6 pt-24 shadow-2xl"
                        >
                            <div className="flex flex-col gap-4">
                                <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2 px-4">Navigation</span>
                                <NavLink
                                    to="/"
                                    icon={<Home className="w-5 h-5" />}
                                    text="Dashboard"
                                    active={location.pathname === '/'}
                                    onClick={() => setIsOpen(false)}
                                    mobile
                                />
                                <NavLink
                                    to="/about-data"
                                    icon={<Info className="w-5 h-5" />}
                                    text="About Data"
                                    active={location.pathname === '/about-data'}
                                    onClick={() => setIsOpen(false)}
                                    mobile
                                />
                                <NavLink
                                    to="/about-doing"
                                    icon={<Info className="w-5 h-5" />}
                                    text="About Doing"
                                    active={location.pathname === '/about-doing'}
                                    onClick={() => setIsOpen(false)}
                                    mobile
                                />
                                <div className="h-px bg-white/5 my-4"></div>
                                <a
                                    href="https://github.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-sm font-medium"
                                >
                                    <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                                        <Github className="w-5 h-5" />
                                        <span>Source Code</span>
                                    </div>
                                    <ArrowUpRight className="w-4 h-4 text-gray-600" />
                                </a>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

const NavLink = ({ to, icon, text, active, onClick, mobile }) => (
    <Link
        to={to}
        onClick={onClick}
        className={`flex items-center gap-3 transition-all duration-300 relative overflow-hidden group ${mobile
            ? `px-4 py-3 rounded-xl ${active ? 'text-white bg-blue-500/10 border border-blue-500/20 shadow-lg shadow-blue-500/5' : 'text-gray-400 hover:text-white hover:bg-white/5'}`
            : `px-4 py-2 rounded-full ${active ? 'text-white bg-blue-500/10 border border-blue-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`
            }`}
    >
        {active && !mobile && (
            <motion.div
                layoutId="nav-bg"
                className="absolute inset-0 bg-blue-500/10 rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
        )}
        <span className={`relative z-10 ${active ? 'text-blue-400' : 'text-gray-500 group-hover:text-gray-300'}`}>{icon}</span>
        <span className="relative z-10 font-medium">{text}</span>
    </Link>
);

export default Navbar;

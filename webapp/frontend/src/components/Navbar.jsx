import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CloudRain, Home, Info, Github, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full bg-slate-900/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50 shadow-lg"
        >
            <div className="w-full px-4 md:px-12 lg:px-24 flex items-center justify-between py-4">
                <Link to="/" className="flex items-center gap-2 group shrink-0">
                    <div className="bg-gradient-to-tr from-blue-500 to-cyan-400 p-1.5 md:p-2 rounded-lg group-hover:scale-110 transition-transform">
                        <CloudRain className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        Rainfall<span className="text-blue-400">AI</span>
                    </span>
                </Link>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6">
                    <NavLink to="/" icon={<Home className="w-4 h-4" />} text="Dashboard" active={location.pathname === '/'} />
                    <NavLink to="/about" icon={<Info className="w-4 h-4" />} text="About System" active={location.pathname === '/about'} />
                    <a
                        href="https://github.com/demirewu-manidefro/Rainfall.git"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-sm font-medium"
                    >
                        <Github className="w-4 h-4" />
                        <span>GitHub</span>
                    </a>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-slate-900 border-b border-white/10 overflow-hidden"
                    >
                        <div className="flex flex-col p-4 gap-2">
                            <Link
                                to="/"
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${location.pathname === '/' ? 'bg-blue-500/10 text-blue-400' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                            >
                                <Home className="w-5 h-5" />
                                <span className="font-medium">Dashboard</span>
                            </Link>
                            <Link
                                to="/about"
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${location.pathname === '/about' ? 'bg-blue-500/10 text-blue-400' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                            >
                                <Info className="w-5 h-5" />
                                <span className="font-medium">About System</span>
                            </Link>
                            <a
                                href="https://github.com/demirewu-manidefro/Rainfall.git"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                            >
                                <Github className="w-5 h-5" />
                                <span className="font-medium">GitHub</span>
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
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

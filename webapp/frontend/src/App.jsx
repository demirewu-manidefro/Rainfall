import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import AboutData from './pages/AboutData';
import AboutDoing from './pages/AboutDoing';
import { AnimatePresence } from 'framer-motion';

function AppContent() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-[#020617] text-white selection:bg-blue-500/30 selection:text-blue-100 overflow-x-hidden font-inter">
      <Navbar />

      <main className="flex-1 relative z-10 w-full">
        {/* Global Background Elements */}
        <div className="fixed inset-0 pointer-events-none z-[-1]">
          <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-900/10 to-transparent"></div>
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px]"></div>
        </div>

        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/about-data" element={<AboutData />} />
            <Route path="/about-doing" element={<AboutDoing />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

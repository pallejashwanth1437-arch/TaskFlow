import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Radar, ArrowRight, CheckCircle2, Zap, Layout } from 'lucide-react';
import Background3D from '../components/Background3D';

const Welcome = () => {
  const navigate = useNavigate();

  const features = [
    { icon: <Layout size={24} />, title: "Premium Interface", desc: "A sleek, distraction-free environment designed for maximum focus." },
    { icon: <Zap size={24} />, title: "Lightning Fast", desc: "Built on the MERN stack for real-time updates and seamless interactions." },
    { icon: <CheckCircle2 size={24} />, title: "Smart Organization", desc: "Filter, sort, and pin your most important tasks instantly." },
  ];

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-bg">
      <Background3D />
      {/* Background glowing orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-amber/10 blur-[120px] pointer-events-none" />

      {/* Navigation Bar */}
      <nav className="w-full max-w-[1180px] mx-auto px-6 py-8 flex items-center justify-between relative z-10">
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand to-brandDim flex items-center justify-center shadow-lg shadow-brand/30">
            <Radar className="text-white" size={24} />
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-text">TaskFlow</span>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 relative z-10 mt-10 md:mt-0">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand/30 bg-brand/10 text-brandLight text-xs font-semibold mb-6 uppercase tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brandLight opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brandLight"></span>
            </span>
            TaskFlow v2.0 is live
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl font-bold text-text leading-[1.1] tracking-tight">
            Organize. Prioritize. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandLight to-amber">Accomplish.</span>
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
            Take control of your day with a smart command deck. Experience a premium, distraction-free environment built to supercharge your productivity.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 rounded-xl bg-brand text-white px-8 py-4 font-semibold text-base hover:bg-brandLight transition-all shadow-[0_8px_30px_-8px_rgba(91,95,239,0.5)] hover:-translate-y-1 w-full sm:w-auto justify-center"
            >
              Enter Dashboard <ArrowRight size={18} />
            </button>
            <button 
              onClick={() => window.open('https://github.com', '_blank')}
              className="flex items-center gap-2 rounded-xl border border-borderLight bg-surface2/50 backdrop-blur-md text-text px-8 py-4 font-medium text-base hover:border-border hover:bg-surface2 transition-all w-full sm:w-auto justify-center"
            >
              View Documentation
            </button>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 mb-16 max-w-[1000px] w-full"
        >
          {features.map((feature, idx) => (
            <div key={idx} className="glass-panel rounded-[22px] p-6 hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(91,95,239,0.3)] transition-all duration-300 cursor-default">
              <div className="w-12 h-12 rounded-2xl bg-surface border border-borderLight flex items-center justify-center text-brandLight mb-5 shadow-inner">
                {feature.icon}
              </div>
              <h3 className="text-lg font-display font-semibold text-text mb-2">{feature.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default Welcome;

"use client";

import { motion } from "framer-motion";
import { ArrowRight, Activity } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background Glow Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-aurum-blue rounded-full mix-blend-screen blur-[150px] opacity-30 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-aurum-gold rounded-full mix-blend-screen blur-[150px] opacity-20"></div>

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start space-y-8"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-aurum-panel border border-aurum-gold/20 text-aurum-gold text-sm font-medium">
            <Activity className="w-4 h-4" />
            <span>Premium Prop Trading Firm</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
            TRADE WITH EDGE. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-aurum-goldLight via-aurum-gold to-yellow-600">
              AMPLIFY CAPITAL.
            </span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl font-light max-w-lg">
            Buktikan kemampuan *trading* Anda, lewati evaluasi kami, dan kelola modal hingga <strong className="text-white">$1,000,000</strong> dengan pembagian profit hingga 90%.
          </p>
          
          <div className="flex flex-col sm:flex-row w-full sm:w-auto space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="flex items-center justify-center space-x-2 px-8 py-4 bg-aurum-gold text-black font-bold rounded-lg shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:bg-aurum-goldLight transition-all duration-300">
              <span>Mulai Challenge</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-transparent border border-gray-600 hover:border-white text-white font-semibold rounded-lg hover:bg-white/5 transition-all duration-300">
              Lihat Dashboard
            </button>
          </div>
        </motion.div>

        {/* Animated Chart/Mockup Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative w-full h-[400px] md:h-[500px]"
        >
          {/* Glassmorphism Card */}
          <div className="absolute inset-0 bg-aurum-panel/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-xs text-gray-500 font-mono">XAUUSD - LIVE</div>
            </div>
            
            {/* Chart Placeholder (Kita akan ganti dengan Recharts nanti) */}
            <div className="flex-1 border border-white/5 bg-black/50 rounded-xl flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-aurum-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="text-gray-600 font-mono text-sm tracking-widest">[ ANIMATED CHART AREA ]</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
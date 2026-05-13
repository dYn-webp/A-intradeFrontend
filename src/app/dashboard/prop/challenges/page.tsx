"use client";

import { Target, AlertCircle } from "lucide-react";

export default function PropChallenges() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Active Challenges</h1>
      
      <div className="bg-aurum-panel border border-aintrade-gold/30 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
            <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-aintrade-gold" strokeDasharray="364.4" strokeDashoffset="91.1" />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-xl font-bold">75%</span>
            <span className="text-[8px] text-gray-500">PROFIT GOAL</span>
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-aintrade-gold" />
            <h2 className="text-xl font-bold">$100,000 Elite Challenge</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Metric label="Current Profit" value="+$7,500.00" color="text-green-500" />
            <Metric label="Daily Loss" value="-$420.00" color="text-white" />
            <Metric label="Max Drawdown" value="2.1% / 10%" color="text-yellow-500" />
            <Metric label="Days Left" value="14 Days" color="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value, color }: any) {
  return (
    <div className="p-3 bg-black/30 rounded-xl border border-white/5">
      <div className="text-[10px] text-gray-500 uppercase mb-1">{label}</div>
      <div className={`text-sm font-bold ${color}`}>{value}</div>
    </div>
  );
}
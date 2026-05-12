"use client";

import { TrendingUp, Users } from "lucide-react";

export default function CopyTrading() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Master Traders</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-aurum-panel border border-white/5 rounded-2xl p-6 hover:border-aurum-blue/50 transition">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gray-800 border border-white/10" />
              <div>
                <div className="font-bold">Alpha Strategy #{i}</div>
                <div className="text-xs text-aurum-gold flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" /> High Yield
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-2 bg-black/20 rounded-lg">
                <div className="text-xs text-gray-500">ROI (All Time)</div>
                <div className="text-lg font-bold text-green-500">+142%</div>
              </div>
              <div className="text-center p-2 bg-black/20 rounded-lg">
                <div className="text-xs text-gray-500">Copiers</div>
                <div className="text-lg font-bold">1,240</div>
              </div>
            </div>
            
            <button className="w-full py-3 bg-aurum-blue text-white font-bold rounded-xl hover:bg-blue-600 transition">
              Copy Strategy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
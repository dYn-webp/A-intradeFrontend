"use client";
import { ShieldAlert, Info } from "lucide-react";

export default function RiskPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Risk Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl">
          <div className="flex items-center space-x-2 text-red-500 mb-4">
            <ShieldAlert className="w-5 h-5" />
            <h3 className="font-bold">Hard Breach Levels</h3>
          </div>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex justify-between"><span>Daily Drawdown (5%)</span> <span className="text-white font-bold">$5,000.00</span></li>
            <li className="flex justify-between"><span>Max Drawdown (10%)</span> <span className="text-white font-bold">$10,000.00</span></li>
          </ul>
        </div>
        <div className="bg-aurum-panel border border-white/5 p-6 rounded-2xl">
           <div className="flex items-center space-x-2 text-aintrade-gold mb-4">
            <Info className="w-5 h-5" />
            <h3 className="font-bold">Trading Rules</h3>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">Pastikan Anda tidak menahan posisi selama akhir pekan tanpa izin akun khusus. Melanggar batas kerugian harian akan mengakibatkan penutupan akun secara otomatis.</p>
        </div>
      </div>
    </div>
  );
}
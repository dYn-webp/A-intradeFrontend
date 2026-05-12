"use client";
import { Lock, Zap } from "lucide-react";

export default function VaultsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Staking Vaults</h1>
      <div className="bg-aurum-blue/10 border border-aurum-blue/20 p-8 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-xl font-bold mb-2 flex items-center"><Zap className="w-5 h-5 mr-2 text-aurum-blue" /> High Yield Vault</h2>
          <p className="text-sm text-gray-400">Lock your profit share for 30 days and earn 12% APY extra.</p>
        </div>
        <div className="text-center">
          <div className="text-3xl font-black text-white">12.5%</div>
          <div className="text-[10px] text-aurum-blue font-bold tracking-widest">ESTIMATED APY</div>
        </div>
        <button className="px-8 py-3 bg-aurum-blue text-white font-bold rounded-xl shadow-lg shadow-aurum-blue/20">Stake Now</button>
      </div>
    </div>
  );
}
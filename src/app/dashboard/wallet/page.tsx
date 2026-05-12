"use client";
import { Wallet, ArrowUpRight, ArrowDownLeft, History } from "lucide-react";

export default function WalletPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Wallet</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gradient-to-br from-aurum-gold/20 to-aurum-blue/20 border border-aurum-gold/30 rounded-3xl p-8 h-56 flex flex-col justify-between relative overflow-hidden">
             <div className="relative z-10">
               <p className="text-aurum-gold text-sm font-medium">Total Balance</p>
               <h2 className="text-5xl font-black mt-2">$124,500.00</h2>
             </div>
             <div className="flex justify-between items-end relative z-10">
               <p className="font-mono text-gray-400">**** **** **** 8829</p>
               <div className="text-xl font-bold italic tracking-tighter">AURUM<span className="text-aurum-gold">CARD</span></div>
             </div>
             <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-aurum-gold/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="bg-aurum-panel border border-white/5 rounded-2xl p-6">
            <div className="flex items-center space-x-2 mb-6">
              <History className="w-5 h-5 text-aurum-gold" />
              <h3 className="font-bold">Recent Transactions</h3>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-white/5">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold">Profit Share Payout</div>
                      <div className="text-xs text-gray-500">May 12, 2026</div>
                    </div>
                  </div>
                  <div className="text-green-500 font-bold">+$4,200.00</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-aurum-panel border border-white/5 rounded-2xl p-6">
            <h3 className="font-bold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-aurum-gold/10 border border-aurum-gold/20 rounded-xl hover:bg-aurum-gold/20 transition flex flex-col items-center text-aurum-gold">
                <ArrowUpRight className="mb-2" /> <span className="text-xs font-bold">Send</span>
              </button>
              <button className="p-4 bg-aurum-blue/10 border border-aurum-blue/20 rounded-xl hover:bg-aurum-blue/20 transition flex flex-col items-center text-aurum-blue">
                <ArrowDownLeft className="mb-2" /> <span className="text-xs font-bold">Receive</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
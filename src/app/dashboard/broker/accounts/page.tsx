"use client";

import { Terminal, Plus, ShieldCheck } from "lucide-react";

export default function BrokerAccounts() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Brokerage Accounts</h1>
        <button className="bg-aurum-gold text-black px-4 py-2 rounded-lg font-bold text-sm flex items-center">
          <Plus className="w-4 h-4 mr-2" /> Open Live Account
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Akun MT5 Example */}
        <div className="bg-aurum-panel border border-white/5 rounded-2xl p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-aurum-blue/20 rounded-lg flex items-center justify-center">
                <Terminal className="text-aurum-blue w-6 h-6" />
              </div>
              <div>
                <div className="font-bold">Aurum-MT5-Live</div>
                <div className="text-xs text-gray-500">Account ID: 8829102</div>
              </div>
            </div>
            <span className="text-[10px] bg-green-500/10 text-green-500 px-2 py-1 rounded border border-green-500/20">VERIFIED</span>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Equity</span>
              <span className="font-bold text-white">$5,240.50</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Leverage</span>
              <span className="text-white">1:500</span>
            </div>
          </div>
          
          <button className="w-full mt-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm transition">
            Launch WebTrader
          </button>
        </div>
      </div>
    </div>
  );
}
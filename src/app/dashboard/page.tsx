"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  Activity, Wallet, Trophy, Bot, ShieldCheck, Zap, MoreHorizontal
} from 'lucide-react';
import { useCurrency } from "@/components/CurrencyProvider";

export default function DashboardPage() {
  const { formatMoney } = useCurrency();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);

  const performanceData = [
    { name: 'Sen', balance: 500000 }, 
    { name: 'Sel', balance: 512000 },
    { name: 'Rab', balance: 508000 }, 
    { name: 'Kam', balance: 525000 },
    { name: 'Jum', balance: 540000 },
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/user/profile");
        setUserData(response.data);
      } catch (error) {
        // Fallback Data untuk Test UI
        setUserData({
          fullName: "Adinda Ardiansyah",
          walletBalance: 150000,
          tradingAccount: {
            currentBalance: 540000,
            initialBalance: 500000,
            profitTarget: 40000,
            maxLoss: 50000,
            status: "ACTIVE"
          }
        });
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10 px-4 mt-6">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tighter">
            A&apos;INTRADE<span className="text-[#D4AF37]">.</span> DASHBOARD
          </h1>
          <p className="text-gray-400 text-sm">
            Terminal Mandor AI: Memantau ekosistem finansial <span className="text-white font-bold">{userData?.fullName}</span>
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-gray-300 hover:text-white transition flex items-center">
            <Bot className="w-4 h-4 mr-2 text-cyan-400" /> AI Insights
          </button>
          <button className="px-4 py-2 bg-[#D4AF37] text-black font-bold rounded-lg text-xs hover:opacity-90 transition shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            Deposit Saldo
          </button>
        </div>
      </div>

      {/* ROW 1: AKUN MIKRO & CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-[#151922] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">Akun Mikro A&apos;INTRADE</h3>
            <span className="text-[10px] bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 rounded font-bold border border-[#D4AF37]/30">LEVEL 1</span>
          </div>
          
          <div className="mb-6">
            <div className="text-[10px] text-gray-500 mb-1 uppercase">Saldo Saat Ini</div>
            <div className="text-3xl font-black text-white tracking-tight">
              {formatMoney(userData?.tradingAccount.currentBalance || 0)}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-2 rounded-lg bg-black/20 border border-white/5">
              <div className="text-[9px] text-gray-500 uppercase tracking-widest">Modal Awal</div>
              <div className="text-xs font-bold text-white">{formatMoney(userData?.tradingAccount.initialBalance || 0)}</div>
            </div>
            <div className="p-2 rounded-lg bg-black/20 border border-white/5">
              <div className="text-[9px] text-gray-500 uppercase tracking-widest">Floating P/L</div>
              <div className="text-xs font-bold text-green-400">+{formatMoney((userData?.tradingAccount.currentBalance || 0) - (userData?.tradingAccount.initialBalance || 0))}</div>
            </div>
          </div>
        </div>

        <div className="bg-[#151922] border border-white/5 rounded-2xl p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold text-xs uppercase tracking-widest flex items-center">
                <Activity className="w-3 h-3 mr-2 text-[#D4AF37]" /> Performa Trading
            </h3>
          </div>
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorGold" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                <XAxis dataKey="name" stroke="#ffffff30" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  formatter={(value: any) => [formatMoney(Number(value)), 'Balance']}
                  contentStyle={{ backgroundColor: '#0a0c10', borderColor: '#ffffff10', borderRadius: '12px', fontSize: '10px', color: '#fff' }} 
                />
                <Area type="monotone" dataKey="balance" stroke="#D4AF37" strokeWidth={2} fillOpacity={1} fill="url(#colorGold)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ROW 2: TARGET, AI RISK GUARD, WALLET */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-[#151922] border border-white/5 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-bold text-[10px] uppercase tracking-widest">Target Profit (8%)</h3>
            <span className="text-xs text-green-500 font-bold">{formatMoney(userData?.tradingAccount.profitTarget || 0)}</span>
          </div>
          <div className="w-full bg-black rounded-full h-2 mb-2">
            <div className="bg-gradient-to-r from-[#D4AF37] to-yellow-600 h-2 rounded-full shadow-[0_0_10px_rgba(212,175,55,0.4)]" style={{ width: '85%' }}></div>
          </div>
          <div className="text-[10px] text-gray-500 flex justify-between mt-3">
            <span>Tercapai: {formatMoney(34000)}</span>
            <span className="text-[#D4AF37] animate-pulse italic">Hampir Lolos!</span>
          </div>
        </div>

        <div className="bg-[#151922] border border-cyan-500/20 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-5 text-cyan-400 rotate-12"><Bot size={100} /></div>
          <div className="flex items-center space-x-2 mb-4">
            <Bot className="w-4 h-4 text-cyan-400" />
            <h3 className="text-white font-bold text-[10px] uppercase tracking-widest">AI Risk Guard</h3>
          </div>
          <div className="space-y-4">
             <div>
               <div className="flex justify-between text-[10px] mb-1">
                 <span className="text-gray-400">Daily Drawdown (5%)</span>
                 <span className="text-white font-mono">{formatMoney(25000)}</span>
               </div>
               <div className="w-full bg-black rounded-full h-1.5"><div className="bg-cyan-500 h-1.5 rounded-full" style={{ width: '12%' }}></div></div>
             </div>
             <div>
               <div className="flex justify-between text-[10px] mb-1">
                 <span className="text-gray-400">Max Loss Limit (10%)</span>
                 <span className="text-white font-mono">{formatMoney(50000)}</span>
               </div>
               <div className="w-full bg-black rounded-full h-1.5"><div className="bg-red-500/30 h-1.5 rounded-full" style={{ width: '0%' }}></div></div>
             </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#151922] to-black border border-[#D4AF37]/20 rounded-2xl p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-[9px] text-gray-500 uppercase tracking-widest mb-1 font-bold">Dompet Utama</div>
              <div className="text-2xl font-black text-white tracking-tight">{formatMoney(userData?.walletBalance || 0)}</div>
            </div>
            <div className="p-2 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37]">
                <Wallet size={18} />
            </div>
          </div>
          <button className="w-full py-2.5 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-gray-200 transition-all flex justify-center items-center mt-6">
            Pencairan Payout <Zap className="w-3 h-3 ml-2 fill-current" />
          </button>
        </div>
      </div>

      {/* ROW 3: TRADES & LEADERBOARD (YANG SEMPAT HILANG) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Active Trades */}
        <div className="bg-[#151922] border border-white/5 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-white font-bold text-[10px] uppercase tracking-widest">Posisi Terbuka (Live)</h3>
            <span className="text-[9px] text-gray-500">Auto-refresh via AI</span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-black/40 rounded-xl border border-white/5 hover:border-[#D4AF37]/30 transition">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] font-bold text-[10px]">AU</div>
                <div>
                  <div className="text-xs text-white font-bold">XAUUSD <span className="text-[9px] text-green-500 font-mono ml-2">BUY @ 2345.50</span></div>
                  <div className="text-[9px] text-gray-500">Lot: 0.01 | Micro-Trade</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-black text-green-400">+{formatMoney(12500)}</div>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-black/40 rounded-xl border border-white/5 hover:border-red-500/30 transition">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 font-bold text-[10px]">BC</div>
                <div>
                  <div className="text-xs text-white font-bold">BBCA.JK <span className="text-[9px] text-red-500 font-mono ml-2">SELL @ 9850</span></div>
                  <div className="text-[9px] text-gray-500">Lot: 1.00 (100 Lbr) | Local Asset</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-black text-red-400">-{formatMoney(2500)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Retail Leaderboard */}
        <div className="bg-[#151922] border border-white/5 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-white font-bold text-[10px] uppercase tracking-widest flex items-center">
              <Trophy className="w-3 h-3 text-[#D4AF37] mr-2" /> Top Retailers
            </h3>
            <MoreHorizontal className="text-gray-500 w-4 h-4 cursor-pointer" />
          </div>
          <div className="space-y-4">
            {[
              { name: "Dimas", gain: "+12%", profit: 60000 },
              { name: "Adinda (Bot)", gain: "+8%", profit: 40000 },
              { name: "Rina", gain: "+5%", profit: 25000 },
            ].map((trader, i) => (
              <div key={i} className="flex items-center justify-between text-[11px] border-b border-white/5 pb-2">
                <div className="flex items-center space-x-3">
                  <span className={`font-black w-4 ${i === 0 ? 'text-[#D4AF37]' : 'text-gray-600'}`}>{i+1}</span>
                  <span className="text-gray-300 font-bold">{trader.name}</span>
                </div>
                <div className="text-right flex items-center space-x-4">
                  <span className="text-green-500 font-mono">{trader.gain}</span>
                  <span className="font-bold text-white">{formatMoney(trader.profit)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
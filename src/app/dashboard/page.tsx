"use client";

import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  Activity, Wallet, Trophy, AlertTriangle, ArrowUpRight, ArrowDownRight, 
  ChevronRight, MoreHorizontal, Bot, ShieldCheck
} from 'lucide-react';

// Data Dummy Skala Mikro (Rupiah)
const performanceData = [
  { name: 'Sen', balance: 500000 }, 
  { name: 'Sel', balance: 512000 },
  { name: 'Rab', balance: 508000 }, 
  { name: 'Kam', balance: 525000 },
  { name: 'Jum', balance: 540000 },
];

export default function DashboardPage() {
  const formatIDR = (value: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      
      {/* Header Dashboard */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white uppercase tracking-wider">Micro-Fund Dashboard</h1>
          <p className="text-gray-400 text-sm">Selamat datang. Evaluasi mikro Anda sedang diawasi oleh AI.</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-aurum-panel border border-white/10 rounded-lg text-sm text-white hover:bg-white/5 transition flex items-center">
            <Bot className="w-4 h-4 mr-2 text-aurum-blue" /> AI Insights
          </button>
          <button className="px-4 py-2 bg-aurum-gold text-black font-bold rounded-lg text-sm hover:bg-aurum-goldLight transition shadow-[0_0_15px_rgba(212,175,55,0.3)]">
            Deposit Wallet
          </button>
        </div>
      </div>

      {/* Baris 1: Overview & Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Micro Account Overview */}
        <div className="bg-aurum-panel border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-aurum-gold/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-gray-400 font-medium text-sm">Simulasi Akun Mikro</h3>
            <span className="text-[10px] bg-green-500/20 text-green-500 px-2 py-1 rounded font-bold">PHASE 1</span>
          </div>
          
          <div className="mb-6">
            <div className="text-xs text-gray-500 mb-1">Current Balance</div>
            <div className="text-3xl font-black text-white tracking-tight">{formatIDR(540000)}</div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest">Initial Balance</div>
              <div className="text-sm font-bold text-white">{formatIDR(500000)}</div>
            </div>
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest">Floating P/L</div>
              <div className="text-sm font-bold text-green-400">+{formatIDR(15000)}</div>
            </div>
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest">Leverage</div>
              <div className="text-sm font-bold text-white">1:100</div>
            </div>
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest">Status</div>
              <div className="text-xs font-bold text-aurum-gold flex items-center mt-0.5">
                <ShieldCheck className="w-3 h-3 mr-1" /> AMAN
              </div>
            </div>
          </div>
        </div>

        {/* Profit Analytics Chart (Lebar 2 Kolom) */}
        <div className="bg-aurum-panel border border-white/5 rounded-2xl p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium text-sm">Grafik Performa (IDR)</h3>
            <div className="flex space-x-2 text-xs">
              {['1D', '1W', '1M'].map(time => (
                <button key={time} className={`px-2 py-1 rounded ${time === '1W' ? 'bg-aurum-blue/30 text-aurum-blue border border-aurum-blue/50' : 'text-gray-500 hover:text-white'}`}>
                  {time}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorGv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                <XAxis dataKey="name" stroke="#ffffff50" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                formatter={(value: any) => formatIDR(Number(value))}
                contentStyle={{ backgroundColor: '#151922', borderColor: '#ffffff20', borderRadius: '8px', fontSize: '12px' }} 
                />                                                                              
                <Area type="monotone" dataKey="balance" stroke="#D4AF37" strokeWidth={2} fillOpacity={1} fill="url(#colorGv)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Baris 2: Metrics, Leaderboard, Payout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Kolom Kiri: AI Risk & Progress */}
        <div className="space-y-6">
          {/* Challenge Progress */}
          <div className="bg-aurum-panel border border-white/5 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-medium text-sm">Target Profit (8%)</h3>
              <span className="text-xs text-green-500 font-bold">{formatIDR(40000)}</span>
            </div>
            <div className="w-full bg-black rounded-full h-2.5 mb-2 border border-white/5">
              <div className="bg-gradient-to-r from-aurum-gold to-yellow-400 h-2.5 rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]" style={{ width: '85%' }}></div>
            </div>
            <div className="text-xs text-gray-400 flex justify-between mt-3">
              <span>Tercapai: {formatIDR(34000)}</span>
              <span className="text-aurum-gold">Hampir Lolos!</span>
            </div>
          </div>

          {/* AI Risk Monitor */}
          <div className="bg-aurum-panel border border-aurum-blue/20 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5"><Bot size={80} /></div>
            <div className="flex items-center space-x-2 mb-4">
              <Bot className="w-5 h-5 text-aurum-blue" />
              <h3 className="text-white font-medium text-sm">AI Risk Monitor</h3>
            </div>
            <div className="space-y-3 relative z-10">
               <div>
                 <div className="flex justify-between text-xs mb-1">
                   <span className="text-gray-400">Daily Loss Limit (5%)</span>
                   <span className="text-white">{formatIDR(25000)}</span>
                 </div>
                 <div className="w-full bg-black rounded-full h-1.5"><div className="bg-green-500 h-1.5 rounded-full" style={{ width: '10%' }}></div></div>
               </div>
               <div>
                 <div className="flex justify-between text-xs mb-1">
                   <span className="text-gray-400">Max Loss Limit (10%)</span>
                   <span className="text-white">{formatIDR(50000)}</span>
                 </div>
                 <div className="w-full bg-black rounded-full h-1.5"><div className="bg-green-500 h-1.5 rounded-full" style={{ width: '0%' }}></div></div>
               </div>
            </div>
          </div>
        </div>

        {/* Kolom Tengah: Active Trades & Wallet */}
        <div className="space-y-6">
          {/* Wallet Balance (Uang Jajan) */}
          <div className="bg-aurum-panel border border-white/5 rounded-2xl p-6 flex items-center justify-between hover:border-white/10 transition">
            <div>
              <div className="text-xs text-gray-500 mb-1 uppercase tracking-widest">Wallet Saldo Utama</div>
              <div className="text-2xl font-bold text-white">{formatIDR(150000)}</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
              <Wallet className="text-gray-400 w-5 h-5" />
            </div>
          </div>

          {/* Posisi Trading Terbuka */}
          <div className="bg-aurum-panel border border-white/5 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-white font-medium text-sm">Active Micro-Trades</h3>
              <MoreHorizontal className="text-gray-500 w-4 h-4 cursor-pointer" />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-black/30 rounded-xl border border-white/5">
                <div>
                  <div className="text-sm text-white font-bold">XAUUSD <span className="text-[10px] text-green-500 bg-green-500/10 px-1 rounded ml-1">BUY</span></div>
                  <div className="text-[10px] text-gray-500">0.01 Lots</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-green-400">+{formatIDR(12500)}</div>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-black/30 rounded-xl border border-white/5">
                <div>
                  <div className="text-sm text-white font-bold">BBCA.JK <span className="text-[10px] text-red-500 bg-red-500/10 px-1 rounded ml-1">SELL</span></div>
                  <div className="text-[10px] text-gray-500">1 Lot (100 Lembar)</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-red-400">-{formatIDR(2500)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Leaderboard & Payout Lokal */}
        <div className="space-y-6">
          {/* Leaderboard Komunitas */}
          <div className="bg-aurum-panel border border-white/5 rounded-2xl p-6">
             <div className="flex justify-between items-center mb-5">
              <h3 className="text-white font-medium text-sm flex items-center">
                <Trophy className="w-4 h-4 text-aurum-gold mr-2" /> Top Retail Traders
              </h3>
            </div>
            <div className="space-y-3">
              {[
                { name: "Dimas", gain: "+12%", profit: 60000 },
                { name: "Adinda (Bot)", gain: "+8%", profit: 40000 },
                { name: "Rina", gain: "+5%", profit: 25000 },
              ].map((trader, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-3">
                    <span className={`font-bold w-4 ${i === 0 ? 'text-aurum-gold' : 'text-gray-500'}`}>{i+1}</span>
                    <span className="text-gray-300">{trader.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-green-400 text-xs mr-3">{trader.gain}</span>
                    <span className="font-mono text-white">{formatIDR(trader.profit)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payout Section */}
          <div className="bg-gradient-to-br from-aurum-panel to-black border border-aurum-gold/30 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-aurum-gold/10 blur-xl"></div>
            <h3 className="text-gray-400 text-xs mb-1 uppercase tracking-widest font-bold">Siap Dicairkan</h3>
            <div className="text-2xl font-black text-white mb-4">{formatIDR(40000)}</div>
            <button className="w-full py-2.5 bg-aurum-gold text-black text-sm font-bold rounded-lg hover:bg-aurum-goldLight transition flex justify-center items-center">
              Tarik ke GoPay / BCA
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
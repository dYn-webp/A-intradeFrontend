"use client";

import { useState } from "react";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { 
  ArrowUpRight, ArrowDownRight, Wallet, PieChart, 
  TrendingUp, Download, Upload, Info
} from "lucide-react";
import { useCurrency } from "@/components/CurrencyProvider";

export default function InvestmentDashboard() {
  const { formatMoney } = useCurrency();
  const [activeTab, setActiveTab] = useState<'instrumen' | 'portofolio'>('instrumen');

  // Data Simulasi Pergerakan Aset Investasi
  const chartData = [
    { time: '10:00', price: 150000 }, { time: '11:00', price: 155000 },
    { time: '12:00', price: 152000 }, { time: '13:00', price: 168000 },
    { time: '14:00', price: 165000 }, { time: '15:00', price: 172000 },
  ];

  // Instrumen Lokal & Global
  const instruments = [
    { symbol: "XAUUSD.m", name: "Gold Micro", price: 2345.50, change: "+0.8%", isUp: true, type: "Komoditas" },
    { symbol: "BBCA.JK", name: "Bank BCA", price: 9850, change: "-0.2%", isUp: false, type: "Saham Lokal" },
    { symbol: "BTCUSD.m", name: "Bitcoin Micro", price: 58200, change: "+2.1%", isUp: true, type: "Kripto" },
    { symbol: "SPX.m", name: "S&P 500 Micro", price: 5200, change: "+0.5%", isUp: true, type: "Indeks Global" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      
      {/* Header Investasi & Tombol Depo/WD */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 bg-gradient-to-br from-[#151922] to-black border border-white/5 p-6 rounded-3xl">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tighter mb-1">
            Vault & <span className="text-[#D4AF37]">Investasi</span>
          </h1>
          <p className="text-gray-400 text-xs mb-6">Pertumbuhan aset pasif dan fasilitas Dip-Funding.</p>
          
          <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Total Nilai Portofolio</div>
          <div className="text-4xl md:text-5xl font-black text-white tracking-tight mt-1">
            {formatMoney(172000)}
          </div>
          <div className="flex items-center text-green-500 text-xs font-bold mt-2">
            <ArrowUpRight className="w-4 h-4 mr-1" /> +{formatMoney(22000)} (All-Time)
          </div>
        </div>

        <div className="flex flex-row gap-3 w-full lg:w-auto">
          <button className="flex-1 lg:flex-none flex items-center justify-center space-x-2 px-6 py-3 bg-[#D4AF37] text-black font-bold rounded-xl text-xs hover:opacity-90 transition">
            <Upload className="w-4 h-4" /> <span>Deposit</span>
          </button>
          <button className="flex-1 lg:flex-none flex items-center justify-center space-x-2 px-6 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl text-xs hover:bg-white/10 transition">
            <Download className="w-4 h-4" /> <span>Tarik Dana (WD)</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigasi Investasi */}
      <div className="flex space-x-4 border-b border-white/5 pb-px">
        <button 
          onClick={() => setActiveTab('instrumen')}
          className={`pb-3 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'instrumen' ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-gray-500 hover:text-gray-300'}`}
        >
          Instrumen Pasar
        </button>
        <button 
          onClick={() => setActiveTab('portofolio')}
          className={`pb-3 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'portofolio' ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-gray-500 hover:text-gray-300'}`}
        >
          Aset Aktif Saya
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Kolom Kiri: Chart Performa (Makan 2 Kolom di Desktop) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#151922] border border-white/5 rounded-2xl p-6">
             <div className="flex justify-between items-center mb-6">
               <h3 className="font-bold text-xs uppercase tracking-widest flex items-center">
                 <TrendingUp className="w-4 h-4 mr-2 text-[#D4AF37]" /> Grafik Pertumbuhan
               </h3>
               <select className="bg-black border border-white/10 text-xs rounded-lg px-3 py-1 outline-none focus:border-[#D4AF37]">
                 <option>Hari Ini</option>
                 <option>1 Minggu</option>
                 <option>1 Bulan</option>
               </select>
             </div>
             
             <div className="h-[250px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={chartData}>
                   <defs>
                     <linearGradient id="colorInvest" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.4}/>
                       <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                     </linearGradient>
                   </defs>
                   <XAxis dataKey="time" stroke="#ffffff30" fontSize={10} tickLine={false} axisLine={false} />
                   <Tooltip 
                     formatter={(value: any) => [formatMoney(Number(value)), 'Nilai']}
                     contentStyle={{ backgroundColor: '#0a0c10', borderColor: '#ffffff10', borderRadius: '12px', fontSize: '10px' }} 
                   />
                   <Area type="monotone" dataKey="price" stroke="#D4AF37" strokeWidth={3} fillOpacity={1} fill="url(#colorInvest)" />
                 </AreaChart>
               </ResponsiveContainer>
             </div>
          </div>
        </div>

        {/* Kolom Kanan: Daftar Instrumen */}
        <div className="bg-[#151922] border border-white/5 rounded-2xl p-6">
          <h3 className="font-bold text-xs uppercase tracking-widest flex items-center mb-6 border-b border-white/5 pb-4">
            <PieChart className="w-4 h-4 mr-2 text-[#D4AF37]" /> Pasar Tersedia
          </h3>
          
          <div className="space-y-4">
            {instruments.map((inst, i) => (
              <div key={i} className="group p-3 bg-black/40 border border-white/5 rounded-xl hover:border-[#D4AF37]/40 transition cursor-pointer flex justify-between items-center">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-xs text-white group-hover:text-[#D4AF37] transition">{inst.symbol}</span>
                    <span className="text-[8px] bg-white/10 px-1.5 py-0.5 rounded text-gray-300">{inst.type}</span>
                  </div>
                  <div className="text-[10px] text-gray-500 mt-1">{inst.name}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-xs text-white">
                    {inst.symbol.includes("JK") ? formatMoney(inst.price) : `$${inst.price.toFixed(2)}`}
                  </div>
                  <div className={`text-[10px] font-bold flex items-center justify-end ${inst.isUp ? 'text-green-500' : 'text-red-500'}`}>
                    {inst.isUp ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                    {inst.change}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 py-2 border border-dashed border-white/20 text-gray-400 text-[10px] font-bold uppercase rounded-lg hover:text-white hover:border-[#D4AF37] transition">
            Lihat Semua Instrumen
          </button>
        </div>

      </div>
    </div>
  );
}
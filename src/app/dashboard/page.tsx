"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { createChart, ColorType } from "lightweight-charts";
import { 
  Wallet, Activity, Zap, PieChart, ArrowLeftRight, CreditCard, 
  User, Globe, Settings, ArrowUpRight, ArrowDownLeft, RefreshCw, 
  X, PlusCircle, TrendingUp, BarChart3, ShieldAlert, ChevronRight 
} from "lucide-react"; // Pastikan lucide-react jika Anda menggunakan itu

// Note: Jika 'lucide-center' error, ganti ke 'lucide-react'
import * as Lucide from "lucide-react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"trading" | "invest">("trading");
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTrades, setActiveTrades] = useState<any[]>([]);
  const [currentPrice, setCurrentPrice] = useState(1450.25);
  const [isTradeProcessing, setIsTradeProcessing] = useState(false);
  
  const chartContainerRef = useRef<HTMLDivElement>(null);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transferFrom, setTransferFrom] = useState<any>("MAIN");
  const [transferTo, setTransferTo] = useState<any>("TRADING");
  const [transferAmount, setTransferAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [sellDestination, setSellDestination] = useState<any>("INVEST");

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3001/user/profile");
      setUserData(res.data);
      const trades = await axios.post("http://localhost:3001/trade/active", { userId: res.data.id });
      setActiveTrades(trades.data);
      setIsLoading(false);
    } catch (e) { console.error(e); setIsLoading(false); }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      setCurrentPrice(prev => prev + (Math.random() - 0.5) * 0.4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // ==========================================
  // FIX: TYPE ASSERTION UNTUK MENGHILANGKAN ERROR TS
  // ==========================================
  useEffect(() => {
    if (activeTab === "trading" && chartContainerRef.current) {
      // Casting ke 'any' untuk memaksa TS menerima metode addCandlestickSeries
      const chart = createChart(chartContainerRef.current, {
        layout: { background: { type: ColorType.Solid, color: "transparent" }, textColor: "#d1d4dc" },
        grid: { vertLines: { color: "rgba(42, 46, 57, 0.05)" }, horzLines: { color: "rgba(42, 46, 57, 0.05)" } },
        width: chartContainerRef.current.clientWidth,
        height: 400,
        timeScale: { borderVisible: false },
      }) as any;

      const candleSeries = chart.addCandlestickSeries({
        upColor: "#26a69a", 
        downColor: "#ef5350", 
        borderVisible: false,
        wickUpColor: "#26a69a", 
        wickDownColor: "#ef5350"
      });

      candleSeries.setData([
        { time: "2024-05-10", open: 1445.00, high: 1455.00, low: 1440.00, close: 1450.00 },
        { time: "2024-05-11", open: 1450.00, high: 1462.00, low: 1448.00, close: 1458.00 },
        { time: "2024-05-12", open: 1458.00, high: 1465.00, low: 1452.00, close: 1455.00 },
        { time: "2024-05-13", open: 1455.00, high: 1458.00, low: 1445.00, close: 1448.00 },
        { time: "2024-05-14", open: 1448.00, high: 1455.00, low: 1447.00, close: 1450.25 },
      ]);

      const handleResize = () => chart.applyOptions({ width: chartContainerRef.current?.clientWidth });
      window.addEventListener("resize", handleResize);
      return () => { window.removeEventListener("resize", handleResize); chart.remove(); };
    }
  }, [activeTab]);

  const executeTrade = async (type: 'BUY' | 'SELL') => {
    setIsTradeProcessing(true);
    try {
      await axios.post("http://localhost:3001/trade/order", {
        userId: userData.id, symbol: "XAUUSD", orderType: type, lotSize: 0.1, openPrice: currentPrice
      });
      fetchData();
    } catch (e: any) { alert(e.response?.data?.message); }
    finally { setIsTradeProcessing(false); }
  };

  const handleTransfer = async (e: any) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      await axios.post("http://localhost:3001/user/transfer", {
        userId: userData.id, from: transferFrom, to: transferTo, amount: Number(transferAmount)
      });
      setIsModalOpen(false);
      fetchData();
    } catch (e) { alert("Saldo Tidak Cukup"); }
    finally { setIsProcessing(false); }
  };

  if (isLoading) return <div className="h-screen flex items-center justify-center text-[#D4AF37] font-black animate-pulse uppercase tracking-[0.3em]">A'INTRADE SYNCING...</div>;
  if (!userData) return <div className="h-screen flex items-center justify-center text-red-500 font-bold uppercase italic tracking-widest">Backend Connection Refused</div>;

  const formatIDR = (n: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
  const trading = userData.tradingAccount;
  const invest = userData.investAccount;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20 p-4 md:p-8">
      
      {/* HEADER: STYNXVEIL STYLE */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#151922]/80 p-5 rounded-3xl border border-white/5 backdrop-blur-xl relative z-10 shadow-2xl">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center border border-[#D4AF37]/30 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            <User className="text-[#D4AF37] w-6 h-6" />
          </div>
          <div>
            <h2 className="text-white font-black text-sm uppercase tracking-wider italic">{userData.fullName}</h2>
            <p className="text-[9px] bg-white/5 px-2 py-0.5 rounded text-gray-500 font-mono mt-1 border border-white/5 tracking-tighter">
                {activeTab === 'trading' ? `TERMINAL: ${trading.tradingId}` : `VAULT: ${invest.investId}`}
            </p>
          </div>
        </div>

        <div className="flex bg-black/60 p-1.5 rounded-2xl border border-white/10">
          <button onClick={() => setActiveTab("trading")} className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-[10px] font-black transition-all ${activeTab === 'trading' ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20' : 'text-gray-500 hover:text-white'}`}>
            <Activity className="w-4 h-4"/><span>TRADING</span>
          </button>
          <button onClick={() => setActiveTab("invest")} className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-[10px] font-black transition-all ${activeTab === 'invest' ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20' : 'text-gray-500 hover:text-white'}`}>
            <PieChart className="w-4 h-4"/><span>INVESTASI</span>
          </button>
        </div>

        <div className="flex items-center space-x-3 bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-5 py-2.5 rounded-2xl">
          <Wallet className="w-5 h-5 text-[#D4AF37]" />
          <div>
            <p className="text-[9px] text-[#D4AF37] font-black uppercase tracking-widest">Main Wallet (IDR)</p>
            <p className="text-white font-black text-sm tracking-tight">{formatIDR(userData.walletBalance)}</p>
          </div>
        </div>
      </div>

      {activeTab === "trading" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
          
          {/* CHART & TERMINAL */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#151922] border border-white/5 rounded-[2.5rem] p-6 shadow-2xl relative overflow-hidden min-h-[550px]">
               <div className="flex justify-between items-center mb-6 px-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-500 font-black border border-yellow-500/20 shadow-inner">AU</div>
                    <div>
                        <h3 className="text-white font-black text-sm uppercase tracking-tighter italic">XAUUSD <span className="text-gray-500 font-normal">/ GOLD</span></h3>
                        <p className="text-[9px] text-gray-500 uppercase font-bold tracking-widest">A'INTRADE PRO-TERMINAL</p>
                    </div>
                  </div>
                  <div className="text-right">
                     <p className="text-green-400 font-mono font-black text-2xl tracking-tighter">{currentPrice.toFixed(2)}</p>
                     <div className="flex items-center justify-end text-[9px] text-green-500 font-bold"><Zap size={10} className="mr-1 animate-pulse"/> LIVE TICK</div>
                  </div>
               </div>

               {/* TRADINGVIEW CONTAINER DENGAN TOMBOL DI DALAMNYA */}
               <div className="relative w-full bg-black/20 rounded-3xl border border-white/5 mb-6 overflow-hidden shadow-inner h-[400px]">
                  <div ref={chartContainerRef} className="w-full h-full"></div>
                  
                  {/* TOMBOL BUY/SELL FLOATING (SESUAI REQUEST) */}
                  <div className="absolute top-4 left-4 z-20 flex space-x-2">
                    <button onClick={() => executeTrade('SELL')} disabled={isTradeProcessing} className="bg-red-500/80 hover:bg-red-600 backdrop-blur-md text-white px-6 py-3 rounded-xl flex flex-col items-center border border-white/10 shadow-xl transition-all active:scale-95 min-w-[120px]">
                        <span className="text-[10px] font-black uppercase tracking-widest mb-1">Sell Market</span>
                        <span className="font-mono font-black text-lg">{currentPrice.toFixed(2)}</span>
                    </button>
                    <button onClick={() => executeTrade('BUY')} disabled={isTradeProcessing} className="bg-teal-500/80 hover:bg-teal-600 backdrop-blur-md text-white px-6 py-3 rounded-xl flex flex-col items-center border border-white/10 shadow-xl transition-all active:scale-95 min-w-[120px]">
                        <span className="text-[10px] font-black uppercase tracking-widest mb-1">Buy Market</span>
                        <span className="font-mono font-black text-lg">{(currentPrice + 0.15).toFixed(2)}</span>
                    </button>
                  </div>
               </div>
            </div>

            {/* OPEN TRADES LIST */}
            <div className="bg-[#151922] border border-white/5 rounded-[2.5rem] p-8 shadow-xl">
                <h4 className="text-white font-black text-[10px] uppercase tracking-[0.2em] mb-6 opacity-60">Active Trade Positions</h4>
                <div className="space-y-3">
                    {activeTrades.length === 0 ? (
                        <div className="text-center p-12 border border-dashed border-white/10 rounded-3xl text-gray-600 font-bold text-[10px] uppercase tracking-widest">No Active Market Exposure</div>
                    ) : (
                        activeTrades.map((t: any) => (
                            <div key={t.id} className="bg-black/40 p-5 rounded-2xl border border-white/5 flex justify-between items-center group hover:border-white/10 transition-all shadow-sm">
                                <div className="flex items-center space-x-4">
                                    <div className={`p-3 rounded-xl ${t.orderType === 'BUY' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                        <ArrowUpRight size={18}/>
                                    </div>
                                    <div><p className="text-white font-black text-xs uppercase italic">{t.symbol}</p><p className="text-[9px] text-gray-500 font-black uppercase tracking-tighter">{t.orderType} • {t.lotSize} LOT • ENTRY: {t.openPrice}</p></div>
                                </div>
                                <div className="text-right">
                                    <p className={`font-mono font-black text-sm ${t.floatingProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>Rp {t.floatingProfit.toLocaleString()}</p>
                                    <button className="text-[8px] text-gray-600 hover:text-red-500 font-black uppercase mt-1 tracking-widest transition-colors bg-white/5 px-2 py-0.5 rounded">Close</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
          </div>

          {/* SIDEBAR STATS */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#1c222d] to-black border border-blue-500/20 rounded-[2.5rem] p-8 shadow-2xl">
               <p className="text-gray-500 text-[9px] font-black uppercase tracking-[0.2em]">Trading Balance</p>
               <h2 className="text-4xl font-black text-white mt-1 tracking-tighter italic">{formatIDR(trading.currentBalance)}</h2>
               <div className="grid grid-cols-2 gap-3 mt-8">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5"><p className="text-[8px] text-gray-600 font-black uppercase mb-1">Leverage</p><p className="text-white font-black text-xs">1:500</p></div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5"><p className="text-[8px] text-gray-600 font-black uppercase mb-1">Margin</p><p className="text-green-400 font-black text-xs">FREE</p></div>
               </div>
               <div className="space-y-3 mt-8">
                  <button onClick={() => { setTransferFrom("MAIN"); setTransferTo("TRADING"); setIsModalOpen(true); }} className="w-full bg-blue-500 text-white h-14 rounded-2xl font-black text-[10px] uppercase shadow-lg shadow-blue-500/20 flex items-center justify-center space-x-2">
                    <PlusCircle size={14}/> <span>Deposit from Wallet</span>
                  </button>
                  <button onClick={() => { setTransferFrom("TRADING"); setTransferTo("MAIN"); setIsModalOpen(true); }} className="w-full bg-white/5 border border-white/10 text-white h-14 rounded-2xl font-black text-[10px] uppercase flex items-center justify-center space-x-2 hover:bg-white/10 transition-all">
                    <ArrowLeftRight size={14}/> <span>Swap to Main</span>
                  </button>
               </div>
            </div>
            <div className="bg-[#151922] border border-white/5 p-6 rounded-3xl flex items-center justify-between group cursor-pointer hover:border-blue-500/50 transition-all shadow-xl">
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-400"><ShieldAlert size={24} className="w-6 h-6" /></div>
                <div><h4 className="text-white font-bold text-sm">New Live Account</h4><p className="text-gray-500 text-xs tracking-tighter">Mulai Prop-Firm Challenge.</p></div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-blue-400" />
            </div>
          </div>
        </div>

      ) : (
        /* INVESTASI TAB: TETAP UTUH */
        <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#151922] border border-[#D4AF37]/30 rounded-[2.5rem] p-10 relative overflow-hidden group shadow-2xl">
                    <div className="absolute top-0 right-0 p-8 opacity-5"><PieChart className="w-24 h-24 text-[#D4AF37]"/></div>
                    <p className="text-[#D4AF37] text-[9px] font-black uppercase tracking-[0.2em]">Liquid Vault Balance</p>
                    <h2 className="text-5xl font-black text-white mt-2 tracking-tighter italic">{formatIDR(invest.currentBalance)}</h2>
                    <div className="flex gap-3 mt-10">
                        <button onClick={() => { setTransferFrom("MAIN"); setTransferTo("INVEST"); setIsModalOpen(true); }} className="flex-1 h-14 bg-[#D4AF37] rounded-2xl text-black font-black text-[10px] uppercase tracking-widest shadow-lg shadow-[#D4AF37]/20">ADD CAPITAL</button>
                        <button onClick={() => { setTransferFrom("INVEST"); setTransferTo("MAIN"); setIsModalOpen(true); }} className="px-6 h-14 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-white/10 transition-all"><ArrowLeftRight size={18}/></button>
                    </div>
                </div>
                <div className="bg-black/40 border border-white/5 rounded-[2.5rem] p-10 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 p-8 opacity-5"><BarChart3 className="w-24 h-24 text-[#D4AF37]"/></div>
                    <p className="text-gray-600 text-[9px] font-black uppercase tracking-[0.2em]">Total Portfolio AUM</p>
                    <h2 className="text-5xl font-black text-white mt-2 tracking-tighter">{formatIDR(invest.currentBalance + 5250000)}</h2>
                    <p className="text-green-500 text-[10px] font-black mt-3 uppercase tracking-widest flex items-center"><TrendingUp size={12} className="mr-2"/> Unrealized Profit: +Rp 845K</p>
                </div>
            </div>
            <div className="bg-[#151922] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-white/5 bg-white/[0.02] flex justify-between items-center px-10">
                    <h4 className="text-white font-black text-[10px] uppercase tracking-[0.3em]">Institutional Grade Assets</h4>
                    <button className="text-[#D4AF37] text-[10px] font-black uppercase hover:underline tracking-widest">Market Watch</button>
                </div>
                <table className="w-full text-left">
                    <tbody className="text-sm">
                        {[
                            { id: "btc", name: "Bitcoin (BTC)", price: "Rp 1.050.000.000", icon: "₿", owned: "0.005 BTC" },
                            { id: "xau", name: "Gold (XAU)", price: "Rp 1.450.000", icon: "🏆", owned: "10 Gram" }
                        ].map((asset) => (
                            <tr key={asset.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-all group">
                                <td className="px-10 py-7 flex items-center space-x-6">
                                    <span className="text-3xl grayscale group-hover:grayscale-0 transition-all duration-500">{asset.icon}</span>
                                    <div><p className="text-white font-black text-xs uppercase italic tracking-tighter">{asset.name}</p><p className="text-gray-600 text-[9px] font-black uppercase tracking-tighter">Inventory: {asset.owned}</p></div>
                                </td>
                                <td className="px-10 py-7 text-white font-mono font-black text-xs italic">{asset.price}</td>
                                <td className="px-10 py-7 text-right space-x-3">
                                    <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-black text-[9px] uppercase hover:bg-blue-600 transition-all">Buy</button>
                                    <button onClick={() => { setSelectedAsset(asset); setIsSellModalOpen(true); }} className="px-6 py-3 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl text-[#D4AF37] font-black text-[9px] uppercase hover:bg-[#D4AF37] hover:text-black transition-all">Sell Out</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      )}

      {/* MODALS TETAP SAMA */}
      {isSellModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 backdrop-blur-md p-6">
            <div className="bg-[#1c222d] border border-[#D4AF37]/40 rounded-[2.5rem] w-full max-w-sm p-10 shadow-2xl animate-in zoom-in-95">
                <div className="text-center mb-10"><div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-5 border border-[#D4AF37]/20 shadow-lg"><ArrowDownLeft className="text-[#D4AF37] w-8 h-8"/></div><h3 className="text-white font-black uppercase text-xl italic tracking-tighter">Exit Position</h3><p className="text-gray-600 text-[10px] font-black uppercase mt-1">Liquidating <span className="text-white">{selectedAsset?.name}</span></p></div>
                <div className="space-y-3">
                    <button onClick={() => setSellDestination("INVEST")} className={`w-full p-5 rounded-2xl border transition-all text-left flex items-center justify-between ${sellDestination === 'INVEST' ? 'bg-[#D4AF37] border-[#D4AF37] text-black shadow-lg' : 'bg-black/40 border-white/10 text-white'}`}><div className="flex items-center space-x-3"><PieChart size={16}/><span className="text-[10px] font-black uppercase">Vault Balance</span></div></button>
                    <button onClick={() => setSellDestination("TRADING")} className={`w-full p-5 rounded-2xl border transition-all text-left flex items-center justify-between ${sellDestination === 'TRADING' ? 'bg-blue-500 border-blue-500 text-white' : 'bg-black/40 border-white/10 text-white'}`}><div className="flex items-center space-x-3"><Activity size={16}/><span className="text-[10px] font-black uppercase">Trading Margin</span></div></button>
                </div>
                <div className="flex gap-3 mt-10"><button onClick={() => setIsSellModalOpen(false)} className="flex-1 h-14 bg-white/5 rounded-2xl text-gray-500 font-black text-[10px] uppercase">Cancel</button><button onClick={() => { alert(`Success! Liquidity injected to ${sellDestination}`); setIsSellModalOpen(false); }} className="flex-[2] h-14 bg-[#D4AF37] rounded-2xl text-black font-black text-[10px] uppercase shadow-xl shadow-[#D4AF37]/30 transition-all active:scale-95">Confirm Exit</button></div>
            </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 backdrop-blur-md p-6">
            <div className="bg-[#151922] border border-white/10 rounded-[2.5rem] w-full max-w-sm p-10 shadow-2xl animate-in zoom-in-95">
                <div className="flex justify-between items-center mb-8"><h3 className="text-white font-black uppercase text-[10px] tracking-[0.3em] flex items-center"><RefreshCw size={16} className="text-[#D4AF37] mr-3 animate-spin-slow"/> Internal Swap</h3><button onClick={() => setIsModalOpen(false)} className="bg-white/5 p-2 rounded-full text-gray-500 hover:text-white transition-all"><X size={16}/></button></div>
                <form onSubmit={handleTransfer} className="space-y-6"><div className="bg-black/40 p-6 rounded-3xl border border-white/5"><p className="text-[8px] text-gray-600 font-black uppercase tracking-widest">{transferFrom} → {transferTo}</p><input autoFocus type="number" value={transferAmount} onChange={(e) => setTransferAmount(e.target.value)} placeholder="0.00" className="w-full bg-transparent text-white font-black text-4xl outline-none mt-4 italic" required /></div><div className="flex gap-2"><button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 h-14 bg-white/5 rounded-2xl text-gray-500 font-black text-[10px] uppercase">Cancel</button><button type="submit" disabled={isProcessing} className="flex-[2] h-14 bg-[#D4AF37] rounded-2xl text-black font-black text-[10px] uppercase shadow-lg shadow-[#D4AF37]/20 transition-all active:scale-95">{isProcessing ? 'PROCESSING...' : 'CONFIRM SWAP'}</button></div></form>
            </div>
        </div>
      )}
    </div>
  );
}
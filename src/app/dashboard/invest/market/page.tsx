"use client";
import { useState } from "react";
import { Search, TrendingUp, TrendingDown, Info, Wallet, HandCoins } from "lucide-react";

// Data Aset Tersedia
const marketAssets = [
  { id: "XAUUSD", name: "Gold", type: "Commodity", price: 2340.50, change: -1.2, isDiscount: true },
  { id: "BBCA", name: "Bank Central Asia", type: "ID Stock", price: 9850, change: 0.5, isDiscount: false },
  { id: "BTCUSD", name: "Bitcoin", type: "Crypto", price: 58400.00, change: -5.4, isDiscount: true },
  { id: "AAPL", name: "Apple Inc.", type: "US Stock", price: 175.20, change: 1.1, isDiscount: false },
  { id: "TLKM", name: "Telkom Indonesia", type: "ID Stock", price: 3200, change: -2.1, isDiscount: true },
];

export default function InvestMarketPage() {
  const [selectedAsset, setSelectedAsset] = useState(marketAssets[0]);
  const [investAmount, setInvestAmount] = useState(5000);
  const [useLoan, setUseLoan] = useState(true); // Toggle Pinjaman

  // Simulasi Saldo User
  const userBalance = 1275.00;
  
  // Kalkulasi Order
  const loanRequired = investAmount > userBalance ? investAmount - userBalance : 0;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold uppercase tracking-wider">Invest Market</h1>
        <div className="flex items-center w-64 bg-aurum-panel rounded-full px-4 py-2 border border-white/5 focus-within:border-aintrade-gold/50">
          <Search className="w-4 h-4 text-gray-500" />
          <input type="text" placeholder="Search BBCA, Gold..." className="bg-transparent border-none outline-none text-sm text-white px-3 w-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Kolom Kiri: Daftar Aset */}
        <div className="lg:col-span-2 bg-aurum-panel border border-white/5 rounded-2xl overflow-hidden">
          <div className="flex space-x-6 px-6 py-4 border-b border-white/5 text-sm font-medium text-gray-400">
            <button className="text-aintrade-gold border-b-2 border-aintrade-gold pb-4 -mb-4">All Assets</button>
            <button className="hover:text-white transition">Stocks</button>
            <button className="hover:text-white transition">Commodities</button>
            <button className="hover:text-white transition">Crypto</button>
          </div>
          
          <table className="w-full text-left">
            <thead>
              <tr className="bg-black/20 text-xs text-gray-500 uppercase tracking-widest border-b border-white/5">
                <th className="p-4 pl-6">Instrument</th>
                <th className="p-4">Price</th>
                <th className="p-4">24h Change</th>
                <th className="p-4 text-right pr-6">Action</th>
              </tr>
            </thead>
            <tbody>
              {marketAssets.map((asset) => (
                <tr 
                  key={asset.id} 
                  onClick={() => setSelectedAsset(asset)}
                  className={`border-b border-white/5 cursor-pointer transition ${selectedAsset.id === asset.id ? 'bg-aurum-blue/10 border-l-2 border-l-aurum-blue' : 'hover:bg-white/5 border-l-2 border-l-transparent'}`}
                >
                  <td className="p-4 pl-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center font-bold text-xs border border-white/10">
                        {asset.id.slice(0, 2)}
                      </div>
                      <div>
                        <div className="font-bold flex items-center">
                          {asset.id} 
                          {asset.isDiscount && <span className="ml-2 px-1.5 py-0.5 rounded text-[8px] bg-red-500/20 text-red-500 uppercase font-black">DIP</span>}
                        </div>
                        <div className="text-xs text-gray-500">{asset.name} • {asset.type}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-mono font-medium">
                    ${asset.price.toLocaleString(undefined, {minimumFractionDigits: 2})}
                  </td>
                  <td className="p-4">
                    <div className={`flex items-center text-sm font-bold ${asset.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {asset.change > 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                      {asset.change > 0 ? '+' : ''}{asset.change}%
                    </div>
                  </td>
                  <td className="p-4 text-right pr-6">
                    <button className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded">Select</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Kolom Kanan: Order Panel & Loan Setup */}
        <div className="bg-aurum-panel border border-white/5 rounded-2xl p-6 h-fit sticky top-24">
          <h2 className="text-lg font-bold mb-6 pb-4 border-b border-white/5 flex justify-between items-center">
            <span>Invest in {selectedAsset.id}</span>
            <span className="text-aintrade-gold font-mono">${selectedAsset.price}</span>
          </h2>

          <div className="space-y-4 mb-8">
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-2 block">Investment Amount (USD)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
                <input 
                  type="number" 
                  value={investAmount}
                  onChange={(e) => setInvestAmount(Number(e.target.value))}
                  className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-8 pr-4 text-white font-bold outline-none focus:border-aintrade-gold transition"
                />
              </div>
            </div>

            {/* Informasi Saldo */}
            <div className="flex justify-between items-center text-sm p-3 bg-black/30 rounded-lg border border-white/5">
              <span className="text-gray-500 flex items-center"><Wallet className="w-4 h-4 mr-2" /> Your Wallet Balance</span>
              <span className="font-bold">${userBalance.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
            </div>

            {/* Deteksi Saldo Kurang -> Tawarkan Pinjaman */}
            {investAmount > userBalance && (
              <div className={`p-4 rounded-xl border transition-all duration-300 ${useLoan ? 'bg-aintrade-gold/10 border-aintrade-gold/50' : 'bg-red-500/10 border-red-500/30'}`}>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center">
                    <HandCoins className={`w-5 h-5 mr-2 ${useLoan ? 'text-aintrade-gold' : 'text-red-400'}`} />
                    <h3 className={`font-bold text-sm ${useLoan ? 'text-aintrade-gold' : 'text-red-400'}`}>
                      {useLoan ? 'Aurum Credit Applied' : 'Insufficient Balance'}
                    </h3>
                  </div>
                  {/* Toggle Switch */}
                  <div 
                    onClick={() => setUseLoan(!useLoan)}
                    className={`w-10 h-5 rounded-full cursor-pointer relative transition-colors ${useLoan ? 'bg-aintrade-gold' : 'bg-gray-700'}`}
                  >
                    <div className={`w-3 h-3 bg-black rounded-full absolute top-1 transition-all ${useLoan ? 'left-6' : 'left-1'}`}></div>
                  </div>
                </div>
                
                {useLoan ? (
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between text-gray-300">
                      <span>Loan Amount (Margin)</span>
                      <span className="font-bold text-white">${loanRequired.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Interest Rate</span>
                      <span className="font-bold text-red-400">0.02% / day</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-red-400/80">Aktifkan Aurum Credit untuk menutupi kekurangan dana sebesar ${loanRequired.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                )}
              </div>
            )}
          </div>

          <button 
            disabled={!useLoan && investAmount > userBalance}
            className={`w-full py-4 font-bold rounded-xl shadow-lg transition-all ${
              (!useLoan && investAmount > userBalance) 
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                : 'bg-aintrade-gold text-black hover:bg-aintrade-goldLight hover:shadow-aintrade-gold/30'
            }`}
          >
            Confirm Invest
          </button>
          
          <p className="text-[10px] text-gray-500 text-center mt-4 flex items-center justify-center">
            <Info className="w-3 h-3 mr-1" /> Modal dasar dapat ditarik kapan saja.
          </p>
        </div>
      </div>
    </div>
  );
}
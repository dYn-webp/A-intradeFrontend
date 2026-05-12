"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Briefcase, ArrowUpRight, ArrowDownRight, Wallet, Receipt } from "lucide-react";

const portfolioData = [
  { name: 'XAUUSD (Gold)', value: 45000, color: '#D4AF37' },
  { name: 'BTC/USD', value: 30000, color: '#F7931A' },
  { name: 'S&P 500', value: 25000, color: '#1E3A8A' },
];

export default function InvestmentPortfolio() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Wealth Portfolio</h1>
        <button className="bg-aurum-panel border border-white/10 px-4 py-2 rounded-lg text-sm hover:bg-white/5 transition">
          Generate Statement
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Net Worth Card */}
        <div className="bg-gradient-to-br from-aurum-panel to-black border border-white/5 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-aurum-gold/10 rounded-full blur-2xl"></div>
          <div className="text-sm text-gray-400 mb-1">Total Net Worth</div>
          <div className="text-4xl font-bold text-white mb-4">$100,000.00</div>
          <div className="flex items-center text-sm text-green-500 bg-green-500/10 w-fit px-2 py-1 rounded">
            <ArrowUpRight className="w-4 h-4 mr-1" /> +12.5% All Time
          </div>
        </div>

        {/* Total Assets */}
        <div className="bg-aurum-panel border border-white/5 rounded-2xl p-6 flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-400 mb-1">Gross Assets</div>
            <div className="text-2xl font-bold text-white">$125,000.00</div>
          </div>
          <div className="w-12 h-12 rounded-full bg-aurum-blue/10 flex items-center justify-center">
            <Briefcase className="w-6 h-6 text-aurum-blue" />
          </div>
        </div>

        {/* Total Debt / Loan */}
        <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 flex items-center justify-between">
          <div>
            <div className="text-sm text-red-400 mb-1">Active Loans & Interest</div>
            <div className="text-2xl font-bold text-white">-$25,000.00</div>
          </div>
          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
            <Receipt className="w-6 h-6 text-red-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Asset Allocation Chart */}
        <div className="bg-aurum-panel border border-white/5 rounded-2xl p-6">
          <h3 className="font-bold mb-6">Asset Allocation</h3>
          <div className="h-64 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={portfolioData} innerRadius={80} outerRadius={100} paddingAngle={5} dataKey="value">
                  {portfolioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#151922', borderColor: '#ffffff20', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs text-gray-500">3 Assets</span>
            </div>
          </div>
        </div>

        {/* Investment History */}
        <div className="bg-aurum-panel border border-white/5 rounded-2xl p-6">
           <h3 className="font-bold mb-6">Recent Activities</h3>
           <div className="space-y-4">
             <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div>
                  <div className="font-bold text-sm">Bought XAUUSD (Dip Margin)</div>
                  <div className="text-xs text-gray-500">May 10, 2026 • Loan ID: #L-992</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-aurum-gold">15.5 Oz</div>
                  <div className="text-xs text-red-400">Debt: -$35,000</div>
                </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
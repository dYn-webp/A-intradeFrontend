"use client";
import { Users, TrendingUp, BarChart } from "lucide-react";

export default function PammPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">PAMM Investment</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="bg-aurum-panel border border-white/5 rounded-2xl p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-aurum-gold/10 rounded-full flex items-center justify-center">
                <BarChart className="text-aurum-gold w-6 h-6" />
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500">Fund Size</div>
                <div className="font-bold">$2.4M</div>
              </div>
            </div>
            <h3 className="font-bold text-lg mb-1">Aurum Alpha Fund</h3>
            <p className="text-xs text-gray-500 mb-6">Low risk, consistent 5-10% monthly growth.</p>
            <div className="flex justify-between items-end">
               <div>
                 <div className="text-[10px] text-gray-500 uppercase">Min. Invest</div>
                 <div className="font-bold text-white">$1,000</div>
               </div>
               <button className="px-4 py-2 bg-aurum-gold text-black text-xs font-bold rounded-lg">Invest Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
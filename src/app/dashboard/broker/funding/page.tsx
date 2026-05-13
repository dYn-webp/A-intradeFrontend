"use client";
import { CreditCard, Landmark, Bitcoin, ArrowRight } from "lucide-react";

export default function FundingPage() {
  const methods = [
    { name: "Bank Transfer", icon: Landmark, desc: "Instant for local banks" },
    { name: "Crypto", icon: Bitcoin, desc: "USDT, BTC, ETH" },
    { name: "Debit Card", icon: CreditCard, desc: "Visa / Mastercard" },
  ];

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Deposit & Withdrawal</h1>
        <p className="text-gray-500 text-sm">Transfer funds between your wallet and brokerage accounts.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {methods.map((m) => (
          <div key={m.name} className="bg-aurum-panel border border-white/5 p-6 rounded-2xl hover:border-aintrade-gold/50 cursor-pointer transition group">
            <m.icon className="w-8 h-8 text-aintrade-gold mb-4" />
            <div className="font-bold mb-1">{m.name}</div>
            <div className="text-xs text-gray-500 mb-4">{m.desc}</div>
            <div className="flex items-center text-xs text-aintrade-gold font-bold opacity-0 group-hover:opacity-100 transition">
              Select Method <ArrowRight className="w-3 h-3 ml-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
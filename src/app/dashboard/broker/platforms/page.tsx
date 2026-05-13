"use client";
import { Monitor, Smartphone, Globe } from "lucide-react";

export default function PlatformsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Trading Platforms</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name: "Desktop Terminal", icon: Monitor, plat: "Windows / MacOS" },
          { name: "Mobile App", icon: Smartphone, plat: "iOS / Android" },
          { name: "WebTrader", icon: Globe, plat: "Browser Based" },
        ].map((p) => (
          <div key={p.name} className="bg-aurum-panel border border-white/5 p-8 rounded-2xl text-center">
            <p.icon className="w-12 h-12 text-aintrade-gold mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-1">{p.name}</h3>
            <p className="text-gray-500 text-xs mb-6">{p.plat}</p>
            <button className="w-full py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition">Download</button>
          </div>
        ))}
      </div>
    </div>
  );
}
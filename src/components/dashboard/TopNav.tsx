"use client";

import { Bell, Search } from "lucide-react";

export default function TopNav() {
  return (
    <header className="h-20 bg-aurum-dark/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-30 ml-64">
      {/* Page Title / Search */}
      <div className="flex items-center w-full max-w-md bg-aurum-panel rounded-full px-4 py-2 border border-white/5 focus-within:border-aintrade-gold/50 transition-colors">
        <Search className="w-4 h-4 text-gray-500" />
        <input 
          type="text" 
          placeholder="Search metrics, pairs, or traders..." 
          className="bg-transparent border-none outline-none text-sm text-white px-3 w-full placeholder:text-gray-600"
        />
      </div>

      {/* User Actions */}
      <div className="flex items-center space-x-6">
        <button className="relative text-gray-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-aurum-dark"></span>
        </button>
        
        <div className="flex items-center space-x-3 border-l border-white/10 pl-6 cursor-pointer">
          <div className="text-right hidden md:block">
            <div className="text-sm font-bold text-white">Adinda Ardiansyah</div>
            <div className="text-xs text-aintrade-gold">Elite Funded Trader</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-aintrade-gold to-aurum-blue p-[2px]">
            <div className="w-full h-full rounded-full bg-aurum-panel border border-white/10 flex items-center justify-center">
              <span className="text-xs font-bold text-white">AA</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
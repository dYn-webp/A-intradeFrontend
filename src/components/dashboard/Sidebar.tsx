"use client";

import { 
  LayoutDashboard, 
  // Broker Icons
  LineChart, ArrowRightLeft, TerminalSquare,
  // Prop Firm Icons
  Target, Trophy, ShieldAlert,
  // Investment Icons
  Briefcase, Users, TrendingUp,
  // General Icons
  Wallet, User, LogOut, ChevronDown,
  Shield
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { HandCoins } from "lucide-react";

const menuGroups = [
  {
    title: "MAIN",
    items: [
      { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
      { icon: Wallet, label: "My Wallet", href: "/dashboard/wallet" },
    ]
  },
  {
    title: "BROKERAGE",
    items: [
      { icon: LineChart, label: "Live Accounts", href: "/dashboard/broker/accounts" },
      { icon: ArrowRightLeft, label: "Deposit & Withdraw", href: "/dashboard/broker/funding" },
      { icon: TerminalSquare, label: "Trading Platforms", href: "/dashboard/broker/platforms" },
    ]
  },
  {
    title: "PROP TRADING",
    items: [
      { icon: Target, label: "Challenges", href: "/dashboard/prop/challenges" },
      { icon: Trophy, label: "Leaderboard", href: "/dashboard/prop/leaderboard" },
      { icon: ShieldAlert, label: "Risk Monitor", href: "/dashboard/prop/risk" },
    ]
  },
  {
    title: "INVESTMENT & WEALTH",
    items: [
      { icon: LayoutDashboard, label: "Portfolio", href: "/dashboard/invest/portfolio" },
      { icon: LineChart, label: "Market & Invest", href: "/dashboard/invest/market" }, // <-- Menu Baru
      { icon: Briefcase, label: "PAMM / MAM", href: "/dashboard/invest/pamm" },
      { icon: TrendingUp, label: "Staking Vaults", href: "/dashboard/invest/vaults" },
    ]
  },
  {
    title: "SETTINGS",
    items: [
      { icon: User, label: "Profile & KYC", href: "/dashboard/profile" },
      { icon: Shield, label: "Settings", href: "/dashboard/settings" }, 
    ]
  }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-aurum-panel border-r border-white/5 flex flex-col fixed left-0 top-0 z-40 overflow-hidden">
      {/* Logo Area */}
      <div className="h-20 flex-shrink-0 flex items-center px-8 border-b border-white/5 bg-aurum-dark/50">
        <div className="text-2xl font-bold tracking-tighter text-white">
          AURUM<span className="text-aintrade-gold">.</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-6 custom-scrollbar">
        {menuGroups.map((group, idx) => (
          <div key={idx}>
            <h4 className="px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
              {group.title}
            </h4>
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                
                return (
                  <Link 
                    key={item.label} 
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-all duration-200 group ${
                      isActive 
                        ? "bg-gradient-to-r from-aintrade-gold/10 to-transparent text-aintrade-gold border-l-2 border-aintrade-gold" 
                        : "text-gray-400 hover:text-white hover:bg-white/5 border-l-2 border-transparent"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-aintrade-gold" : "text-gray-500 group-hover:text-gray-300"}`} />
                    <span className="font-medium text-sm">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-white/5 flex-shrink-0 bg-aurum-dark/30">
        <button className="flex items-center space-x-3 px-4 py-3 w-full text-left text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-colors">
          <LogOut className="w-4 h-4" />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
}
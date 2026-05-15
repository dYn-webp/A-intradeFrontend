"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Wallet, Shield, Trophy, 
  BarChart3, Users, Settings, User, LogOut, X, ArrowDownUp
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();

  // Pemisahan Kategori Menu yang Tegas
  const propFirmMenu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Micro Challenges", icon: Trophy, path: "/dashboard/prop/challenges" },
    { name: "Risk Manager", icon: Shield, path: "/dashboard/prop/risk" },
  ];

  const investMenu = [
    { name: "Pasar & Instrumen", icon: BarChart3, path: "/dashboard/invest/market" },
    { name: "Portofolio Aktif", icon: Wallet, path: "/dashboard/invest/portfolio" },
    { name: "Copy-Trade", icon: Users, path: "/dashboard/invest/copy-trade" },
  ];

  const financeMenu = [
    { name: "Depo / WD", icon: ArrowDownUp, path: "/dashboard/wallet" },
  ];

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0a0c10] border-r border-white/5 flex flex-col justify-between transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:fixed`}>
      
      {/* Header Sidebar */}
      <div className="px-6 py-6 md:py-8 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-[#D4AF37] rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)]">
            <span className="text-black font-black text-xl italic">A</span>
          </div>
          <div>
            <span className="text-xl font-black tracking-tighter text-white">
              A&apos;INTRADE<span className="text-[#D4AF37]">.</span>
            </span>
            <p className="text-[8px] text-gray-500 font-bold mt-0.5 tracking-[0.2em] uppercase">Mandor AI Collective</p>
          </div>
        </div>
        {/* Tombol Tutup di HP */}
        <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setIsOpen(false)}>
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Area Menu Berjalan */}
      <div className="flex-1 overflow-y-auto px-4 scrollbar-hide space-y-6 pb-6">
        
        {/* Bagian 1: Micro Prop-Firm */}
        <div>
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-4 mb-2">Micro Prop-Firm</div>
          <div className="space-y-1">
            {propFirmMenu.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link key={item.name} href={item.path} onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-all text-xs font-bold tracking-wider
                    ${isActive ? 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 shadow-[inset_0_0_10px_rgba(212,175,55,0.1)]' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent'}`}>
                  <item.icon className="w-4 h-4" /><span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bagian 2: Vault & Investasi */}
        <div>
          <div className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest px-4 mb-2">Dip-Funding / Invest</div>
          <div className="space-y-1">
            {investMenu.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link key={item.name} href={item.path} onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-all text-xs font-bold tracking-wider
                    ${isActive ? 'bg-white/10 text-white border border-white/20' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent'}`}>
                  <item.icon className="w-4 h-4" /><span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bagian 3: Keuangan */}
        <div>
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-4 mb-2">Keuangan</div>
          <div className="space-y-1">
            {financeMenu.map((item) => (
               <Link key={item.name} href={item.path} onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-all text-xs font-bold tracking-wider text-gray-400 hover:text-gray-200 hover:bg-white/5`}>
                  <item.icon className="w-4 h-4" /><span>{item.name}</span>
               </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Area Bawah */}
      <div className="px-4 py-4 border-t border-white/5 bg-[#151922]/50 space-y-1">
        <Link href="/dashboard/profile" className="flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-all text-xs font-bold tracking-wider text-gray-400 hover:text-gray-200 hover:bg-white/5">
          <User className="w-4 h-4" /><span>Profile</span>
        </Link>
        <button className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-all text-xs font-bold tracking-wider text-red-500/80 hover:text-red-400 hover:bg-red-500/10 mt-2">
          <LogOut className="w-4 h-4" /><span>Keluar</span>
        </button>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { Menu, X, Bell } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white flex">
      {/* Sidebar - Di-handle responsivitasnya di dalam komponen Sidebar */}
      <Sidebar isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col md:ml-64 min-w-0 transition-all duration-300">
        
        {/* Mobile Top Navbar (Hanya Muncul di HP) */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-white/5 bg-[#0a0c10] sticky top-0 z-40">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 bg-[#D4AF37] rounded-md flex items-center justify-center">
              <span className="text-black font-black text-sm italic">A</span>
            </div>
            <span className="text-lg font-black tracking-tighter">
              A&apos;INTRADE<span className="text-[#D4AF37]">.</span>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-white">
              <Bell className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-gray-400 hover:text-white focus:outline-none"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Konten Halaman */}
        <main className="flex-1 overflow-x-hidden p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* Overlay Hitam saat menu HP terbuka */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
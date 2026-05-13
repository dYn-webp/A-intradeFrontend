"use client";

import { useState } from "react";
import { 
  User, Globe, Wallet, Shield, Bell, 
  ChevronRight, Check, Languages, Coins 
} from "lucide-react";
import { useCurrency } from "@/components/CurrencyProvider";

export default function SettingsPage() {
  const { currency, toggleCurrency } = useCurrency();
  const [language, setLanguage] = useState("Bahasa Indonesia");

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-white uppercase tracking-wider">Settings</h1>
        <p className="text-gray-400 text-sm">Kelola preferensi akun dan personalisasi ekosistem Anda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar Nav Settings (Internal) */}
        <div className="space-y-1">
          <SettingNav icon={User} label="Profile" active />
          <SettingNav icon={Globe} label="Preferences" />
          <SettingNav icon={Shield} label="Security" />
          <SettingNav icon={Bell} label="Notifications" />
        </div>

        {/* Content Area */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Preferences Section */}
          <div className="bg-aurum-panel border border-white/5 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/5 bg-white/5">
              <h3 className="font-bold text-white flex items-center">
                <Globe className="w-4 h-4 mr-2 text-aintrade-gold" /> Personalization
              </h3>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Mata Uang Setting */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-aintrade-gold/10 flex items-center justify-center border border-aintrade-gold/20">
                    <Coins className="text-aintrade-gold w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Mata Uang Utama</div>
                    <div className="text-xs text-gray-500">Pilih format tampilan uang di dashboard</div>
                  </div>
                </div>
                <button 
                  onClick={toggleCurrency}
                  className="px-4 py-2 bg-black/50 border border-white/10 rounded-lg text-sm font-bold text-aintrade-gold hover:border-aintrade-gold/50 transition-all flex items-center space-x-2"
                >
                  <span>{currency}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Bahasa Setting */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-aurum-blue/10 flex items-center justify-center border border-aurum-blue/20">
                    <Languages className="text-aurum-blue w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Bahasa Aplikasi</div>
                    <div className="text-xs text-gray-500">Pilih bahasa antarmuka pengguna</div>
                  </div>
                </div>
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-xs font-bold text-gray-300 outline-none focus:border-aurum-blue transition cursor-pointer"
                >
                  <option value="Bahasa Indonesia">Indonesian</option>
                  <option value="English">English</option>
                </select>
              </div>
            </div>
          </div>

          {/* Account Identity Section */}
          <div className="bg-aurum-panel border border-white/5 rounded-2xl p-6">
            <h3 className="font-bold text-white mb-6 flex items-center">
              <User className="w-4 h-4 mr-2 text-gray-400" /> Account Identity
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-500 font-bold ml-1 uppercase">Full Name</label>
                  <input type="text" defaultValue="Adinda Ardiansyah" className="w-full bg-black/30 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:border-aintrade-gold outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-500 font-bold ml-1 uppercase">Email</label>
                  <input type="email" defaultValue="adinda@aurum.cap" className="w-full bg-black/30 border border-white/5 rounded-xl px-4 py-3 text-sm text-gray-500 focus:border-aintrade-gold outline-none" disabled />
                </div>
              </div>
              <button className="px-6 py-2.5 bg-white text-black font-bold text-xs rounded-lg hover:bg-gray-200 transition">
                Save Changes
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Komponen Pembantu Navigasi Settings
function SettingNav({ icon: Icon, label, active = false }: any) {
  return (
    <button className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-all ${active ? 'bg-white/5 text-white border border-white/10 shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}>
      <Icon className={`w-4 h-4 ${active ? 'text-aintrade-gold' : ''}`} />
      <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
      {active && <Check className="w-3 h-3 ml-auto text-aintrade-gold" />}
    </button>
  );
}
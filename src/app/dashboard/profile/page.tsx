"use client";
import { User, ShieldCheck, Mail, MapPin } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="max-w-2xl space-y-8">
      <div className="flex items-center space-x-6 bg-aurum-panel border border-white/5 p-8 rounded-3xl">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-aurum-gold to-aurum-blue p-1">
          <div className="w-full h-full rounded-full bg-aurum-dark flex items-center justify-center text-3xl font-bold">AA</div>
        </div>
        <div>
          <h1 className="text-2xl font-bold">Adinda Ardiansyah</h1>
          <p className="text-gray-500 text-sm flex items-center mt-1"><ShieldCheck className="w-4 h-4 mr-1 text-green-500" /> Verified Account</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <label className="text-xs text-gray-500 font-bold ml-1">Email Address</label>
          <div className="bg-aurum-panel border border-white/5 p-3 rounded-xl flex items-center text-sm">
            <Mail className="w-4 h-4 mr-3 text-gray-500" /> adinda@aurum.cap
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-xs text-gray-500 font-bold ml-1">Location</label>
          <div className="bg-aurum-panel border border-white/5 p-3 rounded-xl flex items-center text-sm">
            <MapPin className="w-4 h-4 mr-3 text-gray-500" /> BSD, Tangerang Selatan
          </div>
        </div>
      </div>

      <div className="bg-aurum-gold/10 border border-aurum-gold/20 p-6 rounded-2xl flex justify-between items-center">
        <div>
          <h4 className="font-bold text-aurum-gold text-sm">KYC Tier 2</h4>
          <p className="text-xs text-gray-500">Maximum withdrawal limit: $500,000 / month</p>
        </div>
        <button className="text-xs font-bold text-white bg-white/10 px-4 py-2 rounded-lg">Upgrade</button>
      </div>
    </div>
  );
}
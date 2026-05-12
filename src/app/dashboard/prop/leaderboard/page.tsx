"use client";
import { Trophy, Medal } from "lucide-react";

export default function LeaderboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Trophy className="text-aurum-gold w-6 h-6" />
        <h1 className="text-2xl font-bold">Global Leaderboard</h1>
      </div>
      <div className="bg-aurum-panel border border-white/5 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5 bg-white/5 text-xs text-gray-400 uppercase tracking-widest">
              <th className="p-4">Rank</th>
              <th className="p-4">Trader</th>
              <th className="p-4">Gain</th>
              <th className="p-4">Profit</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition">
                <td className="p-4 font-bold">{i === 1 ? "🥇" : i === 2 ? "🥈" : i === 3 ? "🥉" : i}</td>
                <td className="p-4">Trader_{8800 + i}</td>
                <td className="p-4 text-green-500">+{200 - i * 15}%</td>
                <td className="p-4 font-mono font-bold">${(50000 / i).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
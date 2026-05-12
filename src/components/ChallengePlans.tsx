"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "STARTER",
    capital: "$10,000",
    fee: "$100",
    features: [
      "Target Profit: 8%",
      "Max Daily Loss: 5%",
      "Max Drawdown: 10%",
      "Leverage up to 1:100",
      "Profit Split: 80/20",
    ],
    recommended: false,
  },
  {
    name: "PRO",
    capital: "$50,000",
    fee: "$300",
    features: [
      "Target Profit: 8%",
      "Max Daily Loss: 5%",
      "Max Drawdown: 10%",
      "Leverage up to 1:100",
      "Profit Split: 85/15",
    ],
    recommended: true, // Kita beri highlight emas di paket ini
  },
  {
    name: "ELITE",
    capital: "$100,000",
    fee: "$500",
    features: [
      "Target Profit: 8%",
      "Max Daily Loss: 5%",
      "Max Drawdown: 10%",
      "Leverage up to 1:100",
      "Profit Split: 90/10",
    ],
    recommended: false,
  },
];

export default function ChallengePlans() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-aurum-blue/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Pilih <span className="text-aurum-gold">Funding Tiers</span> Anda
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Selesaikan evaluasi 1 tahap kami dan mulailah mengelola modal besar dengan ketentuan trading terbaik di industri.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`relative bg-aurum-panel/60 backdrop-blur-md rounded-2xl p-8 border ${
                plan.recommended ? "border-aurum-gold" : "border-white/10"
              } hover:border-aurum-gold/50 transition-colors duration-300 flex flex-col`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-aurum-gold text-black text-xs font-bold px-4 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-gray-300 mb-2">{plan.name}</h3>
                <div className="text-4xl font-extrabold text-white mb-2">{plan.capital}</div>
                <div className="text-sm text-gray-500">Refundable Fee: <span className="text-white font-semibold">{plan.fee}</span></div>
              </div>

              <div className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-aurum-gold/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-aurum-gold" />
                    </div>
                    <span className="text-sm text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 rounded-lg font-bold transition-all duration-300 ${
                plan.recommended 
                  ? "bg-aurum-gold text-black hover:bg-aurum-goldLight shadow-[0_0_15px_rgba(212,175,55,0.4)]" 
                  : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
              }`}>
                Pilih {plan.name}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
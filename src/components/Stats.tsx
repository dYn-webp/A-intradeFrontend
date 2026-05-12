"use client";

import { motion } from "framer-motion";

const statData = [
  { id: 1, label: "Total Funded Traders", value: "15,420+", suffix: "" },
  { id: 2, label: "Total Payout", value: "$42.5", suffix: "M+" },
  { id: 3, label: "Average Win Rate", value: "68", suffix: "%" },
];

export default function Stats() {
  return (
    <section className="py-12 border-y border-white/5 bg-aurum-panel/30">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          {statData.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="py-6 md:py-0 flex flex-col items-center justify-center"
            >
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                {stat.value}<span className="text-aurum-gold">{stat.suffix}</span>
              </h3>
              <p className="text-gray-400 uppercase tracking-widest text-xs font-semibold">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
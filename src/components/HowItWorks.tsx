"use client";

import { motion } from "framer-motion";
import { UserPlus, Target, Award, DollarSign } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "1. Register",
    desc: "Daftar akun dan pilih paket challenge yang sesuai dengan gaya trading Anda."
  },
  {
    icon: Target,
    title: "2. Pass Challenge",
    desc: "Capai target profit 8% tanpa melanggar batas kerugian harian dan maksimal."
  },
  {
    icon: Award,
    title: "3. Get Funded",
    desc: "Lolos evaluasi, lakukan KYC, dan dapatkan akun live dengan modal penuh."
  },
  {
    icon: DollarSign,
    title: "4. Split Profit",
    desc: "Mulai trading dan tarik profit Anda hingga 90% pada akhir siklus trading."
  }
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-black relative border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Bagaimana <span className="text-aurum-blue">Cara Kerjanya?</span>
          </h2>
          <p className="text-gray-400">4 langkah sederhana menuju kebebasan finansial.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="flex flex-col items-center text-center p-6"
              >
                <div className="w-20 h-20 rounded-2xl bg-aurum-panel border border-white/10 flex items-center justify-center mb-6 shadow-lg shadow-aurum-blue/10">
                  <Icon className="w-10 h-10 text-aintrade-gold" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
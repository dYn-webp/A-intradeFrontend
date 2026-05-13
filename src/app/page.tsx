"use client";

import { useState, useEffect } from "react"; // Tambahkan useEffect
import { motion, AnimatePresence } from "framer-motion";
import { 
  Terminal, ShieldCheck, Zap, ArrowRight, 
  HandCoins, BarChart3, Wallet, Cpu, CheckCircle2, 
  Coffee, Bot, Users, Quote, Target, Heart, Globe
} from "lucide-react";
import Link from "next/link";
import { useCurrency } from "@/components/CurrencyProvider";

// --- Komponen LiveTickerItem untuk Efek Berkedip ---
interface TickerItemProps {
  id: string;
  initialPrice: number;
  initialChange: number;
  isIDR?: boolean;
}

const LiveTickerItem = ({ id, initialPrice, initialChange, isIDR }: TickerItemProps) => {
  const [price, setPrice] = useState(initialPrice);
  const [changePercent, setChangePercent] = useState(initialChange);
  const [flashStatus, setFlashStatus] = useState<'up' | 'down' | 'neutral'>('neutral');

  // Simulasi Pergerakan Harga Live
  useEffect(() => {
    const interval = setInterval(() => {
      // Acak apakah harga naik atau turun sedikit
      const isUp = Math.random() > 0.45; // Sedikit bias naik
      const movement = (price * (Math.random() * 0.002)); // Perubahan maks 0.2%
      
      let newPrice: number;
      if (isUp) {
        newPrice = price + movement;
        setFlashStatus('up');
      } else {
        newPrice = price - movement;
        setFlashStatus('down');
      }

      setPrice(newPrice);
      
      // Update simulasi persen (sedikit acak)
      const newChange = initialChange + (Math.random() * 0.1 - 0.05);
      setChangePercent(newChange);

      // Kembalikan status warna ke neutral setelah 300ms
      setTimeout(() => setFlashStatus('neutral'), 300);

    }, Math.random() * 2000 + 1000); // Berubah acak antara 1-3 detik

    return () => clearInterval(interval);
  }, [price, initialChange]);

  const formatTickerMoney = (value: number) => {
    if (isIDR) {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);
    }
    // Standar Forex/Crypto USD
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: id.includes('USD') ? 2 : 5 }).format(value);
  };

  const getFlashClass = () => {
    if (flashStatus === 'up') return 'bg-green-500/20 text-green-300 transition-colors duration-100 rounded-sm px-1';
    if (flashStatus === 'down') return 'bg-red-500/20 text-red-300 transition-colors duration-100 rounded-sm px-1';
    return 'text-white transition-colors duration-300 px-1';
  };

  return (
    <span className="flex items-center space-x-2 mr-12 h-full font-mono text-[10px]">
      <span className="text-gray-500 font-bold tracking-wider">{id}</span>
      <span className={getFlashClass()}>
        {formatTickerMoney(price)}
      </span>
      <span className={`${changePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        ({changePercent >= 0 ? '+' : ''}{changePercent.toFixed(2)}%)
      </span>
    </span>
  );
};

// --- Komponen MarketTicker dengan Scrolling Sempurna ---
const tickerData = [
  { id: "XAUUSD", initialPrice: 2345.50, initialChange: 0.4 },
  { id: "BTCUSD", initialPrice: 58200.00, initialChange: -2.1 },
  { id: "US30", initialPrice: 38950.00, initialChange: 0.8 },
  { id: "EURUSD", initialPrice: 1.0855, initialChange: 0.12 },
  { id: "BBCA.JK", initialPrice: 9850, initialChange: 0.0, isIDR: true },
  { id: "ETHUSD", initialPrice: 2610.75, initialChange: -1.5 },
];

const MarketTicker = () => {
  // Gandakan data untuk loop tak terbatas yang mulus
  const doubledData = [...tickerData, ...tickerData];

  return (
    <div className="w-full bg-black border-b border-white/5 overflow-hidden flex items-center h-8 relative">
      <motion.div 
        animate={{ x: ["0%", "-50%"] }} // Geser setengah total lebar (karena data digandakan)
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }} // Kecepatan scrolling
        className="flex whitespace-nowrap px-4 absolute h-full items-center"
      >
        {doubledData.map((item, index) => (
          <LiveTickerItem 
            key={`${item.id}-${index}`}
            id={item.id}
            initialPrice={item.initialPrice}
            initialChange={item.initialChange}
            isIDR={item.isIDR}
          />
        ))}
      </motion.div>
    </div>
  );
};

// --- Komponen Utama Landing Page ---
export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<'trading' | 'invest'>('trading');
  const [walletBalance, setWalletBalance] = useState(150000);
  const buyingPower = walletBalance * 5; 

  const { currency, toggleCurrency, formatMoney } = useCurrency();

  return (
    <div className="bg-aurum-dark min-h-screen text-white font-sans selection:bg-aintrade-gold selection:text-black overflow-x-hidden">
      
      {/* 1. Navbar */}
      <div className="fixed top-0 w-full z-50">
        <MarketTicker />
        <nav className="border-b border-white/5 bg-aurum-dark/80 backdrop-blur-xl">
          <div className="container mx-auto px-6 h-16 flex items-center justify-between">
            <div className="text-xl font-black tracking-tighter flex items-center">
              A'INTRADE<span className="text-aintrade-gold text-2xl leading-[0]">.</span>
            </div>
            <div className="hidden md:flex items-center space-x-8 text-xs font-bold text-gray-400 uppercase tracking-widest">
               <a href="#vision" className="hover:text-white transition">Vision</a>
               <a href="#founder" className="hover:text-white transition">The Story</a>
               <a href="#community" className="hover:text-white transition">Community</a>
            </div>
            
            <div className="flex items-center space-x-4">
              <button onClick={toggleCurrency} className="flex items-center space-x-1 px-3 py-1.5 bg-black/50 border border-white/10 rounded-md text-xs font-bold text-gray-300 hover:text-white transition">
                <Globe className="w-3 h-3" /><span>{currency}</span>
              </button>
              <Link href="/dashboard" className="px-4 py-2 bg-aintrade-gold text-black text-xs font-bold rounded-md hover:bg-aintrade-goldLight transition shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                Launch App
              </Link>
            </div>
          </div>
        </nav>
      </div>

      {/* 2. Hero Section */}
      <section className="relative pt-32 pb-20 min-h-[85vh] flex items-center">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-10 bg-aintrade-gold pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-aintrade-gold/30 bg-aintrade-gold/10 text-aintrade-gold text-xs font-bold">
              <Heart className="w-3 h-3" /> <span>Dibangun untuk Trader Retail</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight mb-4">
              TRADING & INVESTASI.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-aintrade-gold to-yellow-600">
                MULAI DARI {formatMoney(15000)}.
              </span>
            </h1>
            <p className="text-gray-400 text-base max-w-md leading-relaxed">
              Takut rugi besar? Tidak punya modal jutaan? A'intrade menghapus batasan itu. Mulai karir prop-trading dan dapatkan fasilitas pinjaman margin dengan modal setara harga secangkir kopi.
            </p>
            <Link href="/dashboard" className="w-fit px-6 py-3 bg-white text-black font-bold rounded-lg flex items-center hover:bg-gray-200 transition text-sm">
              Mulai Perjalanan Anda <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          {/* Interactive Micro-Panel */}
          <div className="bg-aurum-panel/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 relative shadow-2xl">
            <div className="flex bg-black/50 rounded-full p-1 border border-white/5 w-fit mb-6">
              <button onClick={() => setActiveTab('trading')} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activeTab === 'trading' ? 'bg-aintrade-gold text-black' : 'text-gray-400 hover:text-white'}`}>Micro Prop-Firm</button>
              <button onClick={() => setActiveTab('invest')} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activeTab === 'invest' ? 'bg-aurum-blue text-white' : 'text-gray-400 hover:text-white'}`}>Dip-Funding Loan</button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'trading' ? (
                <motion.div key="trading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <div className="flex items-center space-x-2"><BarChart3 className="text-aintrade-gold w-5 h-5" /><h3 className="font-bold text-sm">Simulasi (Biaya: {formatMoney(15000)})</h3></div>
                    <span className="text-xs bg-white/5 px-2 py-1 rounded text-white font-mono">Saldo: {formatMoney(500000)}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-black/40 rounded-xl border border-white/5"><div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Target Profit</div><div className="text-base font-bold text-green-500">+{formatMoney(40000)}</div></div>
                    <div className="p-3 bg-black/40 rounded-xl border border-white/5"><div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Max Loss</div><div className="text-base font-bold text-red-500">-{formatMoney(50000)}</div></div>
                  </div>
                  <div className="p-3 bg-aintrade-gold/10 rounded-xl border border-aintrade-gold/20 text-xs font-bold flex justify-between"><span className="text-aintrade-gold">Bagi Hasil</span><span className="text-white">Hingga 80% ke rekening Anda</span></div>
                </motion.div>
              ) : (
                <motion.div key="invest" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <div className="flex items-center space-x-2"><HandCoins className="text-aurum-blue w-5 h-5" /><h3 className="font-bold text-sm">Margin Calculator</h3></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-3"><span className="text-gray-400">Uang Saku Anda</span><span className="font-bold">{formatMoney(walletBalance)}</span></div>
                    <input type="range" min="15000" max="5000000" step="5000" value={walletBalance} onChange={(e) => setWalletBalance(Number(e.target.value))} className="w-full h-1.5 bg-black rounded-lg appearance-none cursor-pointer accent-aurum-blue" />
                  </div>
                  <div className="p-4 bg-aurum-blue/10 rounded-xl border border-aurum-blue/30 flex justify-between items-center">
                    <div><div className="text-xs font-bold text-gray-400">Total Daya Beli (Leverage 5x)</div><div className="text-[10px] text-aurum-blue">Disubsidi Aurum: +{formatMoney(buyingPower - walletBalance)}</div></div>
                    <span className="text-xl font-black text-white">{formatMoney(buyingPower)}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 3. Visi Misi */}
      <section id="vision" className="py-20 border-y border-white/5 bg-black/50">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <Target className="w-12 h-12 text-aintrade-gold mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6">Misi Kami: Menghapus Rasa Takut.</h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            Dunia finansial global terlalu kejam bagi yang pas-pasan. Uang jutaan bisa hilang dalam sekejap. A'intrade lahir dengan satu misi: <strong>Memberikan ruang aman bagi Anda untuk belajar, gagal, dan bangkit berinvestasi hanya dengan uang sisa jajan.</strong>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-aurum-panel border border-white/5 p-6 rounded-2xl">
              <ShieldCheck className="w-6 h-6 text-green-500 mb-3" />
              <h4 className="font-bold mb-2">Risiko Sangat Rendah</h4>
              <p className="text-xs text-gray-500">Maksimal kerugian Anda hanyalah biaya pendaftaran seharga semangkuk mie instan.</p>
            </div>
            <div className="bg-aurum-panel border border-white/5 p-6 rounded-2xl">
              <Zap className="w-6 h-6 text-aintrade-gold mb-3" />
              <h4 className="font-bold mb-2">Payout Nyata (IDR / Kripto)</h4>
              <p className="text-xs text-gray-500">Lolos evaluasi mikro, profit Anda kami transfer langsung ke e-Wallet / rekening lokal.</p>
            </div>
            <div className="bg-aurum-panel border border-white/5 p-6 rounded-2xl">
              <HandCoins className="w-6 h-6 text-aurum-blue mb-3" />
              <h4 className="font-bold mb-2">Akses Modal Cepat</h4>
              <p className="text-xs text-gray-500">Market sedang diskon? Kami pinjamkan margin ekstra agar Anda tidak ketinggalan momen.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. The Founder Story (Core Narrative) */}
      <section id="founder" className="py-24 container mx-auto px-6">
        <div className="bg-gradient-to-br from-aurum-panel to-black border border-aintrade-gold/20 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-aintrade-gold/10 blur-[80px]"></div>
          
          <div className="flex flex-col md:flex-row gap-12 relative z-10 items-center">
            <div className="w-full md:w-1/3">
               <div className="aspect-[4/5] rounded-3xl bg-black border border-white/10 p-6 flex flex-col justify-end relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl font-black text-white/5 z-0">AA</div>
                  
                  <div className="relative z-20">
                    <h4 className="font-bold text-2xl text-white">Adinda Ardiansyah</h4>
                    <p className="text-sm text-aintrade-gold mb-4">Founder & System Architect</p>
                    <div className="flex space-x-2">
                      <span className="px-2 py-1 bg-white/10 rounded text-[10px] text-gray-300 flex items-center"><Coffee className="w-3 h-3 mr-1" /> Ex-Pramusaji</span>
                      <span className="px-2 py-1 bg-aintrade-gold/10 text-aintrade-gold rounded text-[10px] flex items-center"><Cpu className="w-3 h-3 mr-1" /> Mandor AI</span>
                    </div>
                  </div>
               </div>
            </div>

            <div className="flex-1 space-y-6">
              <Quote className="w-10 h-10 text-aintrade-gold/30" />
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">"Dari Nampan Pramusaji,<br/>Menuju Arsitektur Finansial."</h2>
              <div className="space-y-4 text-gray-400 text-sm md:text-base leading-relaxed">
                <p>
                  Beberapa waktu lalu, profesi saya adalah seorang <strong>pramusaji (waiter)</strong>. Saya merasakan langsung bagaimana rasanya bekerja keras seharian, namun uang di dompet hanya cukup untuk bertahan hidup. Boro-boro untuk *trading* atau investasi jutaan rupiah.
                </p>
                <p>
                  Rasa frustrasi itu mendorong saya belajar. Karena saya tidak punya tim *programmer* mahal, saya beralih menggunakan teknologi kecerdasan buatan. Saya bertindak sebagai <strong>Mandor AI</strong>—memerintahkan *AI agents* untuk menulis kode, merancang arsitektur, dan membangun ekosistem <em>A'intrade</em> dari nol.
                </p>
                <p>
                  Platform ini didanai murni dari kantong pribadi saya. Saya membuat batasan minimum {formatMoney(15000)} karena platform ini dirancang untuk orang-orang seperti saya dulu: <strong>Mereka yang punya ambisi besar, tapi hanya punya uang sisa jajan.</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. The Team (Human + AI) */}
      <section className="py-20 bg-black border-y border-white/5">
        <div className="container mx-auto px-6 text-center max-w-5xl">
          <h2 className="text-3xl font-bold mb-4">Tim Penggerak Kami</h2>
          <p className="text-gray-400 text-sm mb-12">Tidak ada direktur berjas mahal. Hanya dedikasi dan efisiensi teknologi mutakhir.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 border border-aintrade-gold/30 bg-aintrade-gold/5 rounded-2xl flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-aintrade-gold/20 flex items-center justify-center mb-4 border-2 border-aintrade-gold">
                <Users className="w-8 h-8 text-aintrade-gold" />
              </div>
              <h3 className="font-bold text-xl mb-2">The Human Visionary</h3>
              <p className="text-sm text-gray-400 leading-relaxed text-center">
                <strong>Adinda Ardiansyah.</strong> Menentukan arah bisnis, menetapkan batasan risiko, menyiapkan likuiditas mikro, dan memastikan setiap payout dibayarkan kepada komunitas tepat waktu.
              </p>
            </div>
            
            <div className="p-8 border border-aurum-blue/30 bg-aurum-blue/5 rounded-2xl flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-4 border-2 border-aurum-blue">
                <Bot className="w-8 h-8 text-aurum-blue" />
              </div>
              <h3 className="font-bold text-xl mb-2">The AI Orchestrator Core</h3>
              <p className="text-sm text-gray-400 leading-relaxed text-center">
                <strong>AI Agents.</strong> Pasukan kode tak kenal lelah yang mengawasi margin secara *real-time*, mendeteksi pelanggaran batas kerugian harian, dan menjaga stabilitas server 24/7.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Real Community (Testimonial Micro-Trader) */}
      <section id="community" className="py-24 container mx-auto px-6">
         <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Mereka yang Sudah <span className="text-aintrade-gold">Membuktikan</span></h2>
          <p className="text-gray-400">Komunitas *early adopter* yang berani melangkah dengan modal receh.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Dimas", role: "Mahasiswa", quote: "Gila sih. Modal jajan boba 20 ribu, tapi bisa ngerasain pressure trading di akun 500 ribu. Payout pertama 40 ribu langsung cair ke GoPay buat beli makan." },
            { name: "Rina", role: "Karyawan Shift", quote: "Dulu sering MC (Margin Call) karena maksain depo gede. Di A'intrade, mental saya dilatih pelan-pelan. Fitur pinjaman margin-nya juga ngebantu banget pas XAUUSD lagi crash." },
            { name: "Fajar", role: "Freelancer", quote: "Transparansi foundernya bikin respect. Gak ada iming-iming cepet kaya. Pure ngajarin money management dengan risiko yang super duper rendah." }
          ].map((t, i) => (
            <div key={i} className="bg-aurum-panel border border-white/5 p-6 rounded-2xl relative">
              <Quote className="absolute top-4 right-4 w-8 h-8 text-white/5" />
              <p className="text-sm text-gray-300 italic mb-6">"{t.quote}"</p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-700 to-black border border-white/10 flex items-center justify-center font-bold text-xs">{t.name.charAt(0)}</div>
                <div>
                  <div className="font-bold text-sm">{t.name}</div>
                  <div className="text-[10px] text-aintrade-gold">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="py-8 border-t border-white/5 bg-black text-center">
        <div className="container mx-auto px-6">
          <div className="text-lg font-black mb-2">A'INTRADE<span className="text-aintrade-gold">.</span> </div>
          <p className="text-gray-500 text-xs mb-4">Membangun Kekuatan Finansial Pemuda Indonesia.</p>
          <div className="max-w-3xl mx-auto text-[10px] text-gray-600 leading-relaxed text-justify">
            <strong>Catatan Pendiri:</strong> Platform ini adalah bukti bahwa keterbatasan modal bukanlah akhir dari segalanya. Sistem ini beroperasi menggunakan *micro-liquidity pool* pribadi. Semua aturan dibuat seadil mungkin. Jika Anda mencari skema cepat kaya, platform ini BUKAN untuk Anda. Namun jika Anda ingin berlatih dan berkembang dengan risiko seminimal mungkin, selamat datang di rumah.
          </div>
        </div>
      </footer>
    </div>
  );
}
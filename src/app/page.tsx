import Link from "next/link";
import { ArrowRight, PieChart, ShieldCheck } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 text-white flex flex-col">
      {/* Navbar */}
      <header className="p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="text-2xl font-bold text-blue-400">FinansAI</div>
        <Link href="/dashboard" className="text-sm font-medium hover:text-blue-300 transition">
          Giriş Yap
        </Link>
      </header>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <div className="bg-blue-500/10 text-blue-300 px-4 py-1 rounded-full text-sm font-medium mb-6 border border-blue-500/20">
          🚀 Yapay Zeka Destekli Finans Yönetimi
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          Paranızı <span className="text-blue-400">Akıllıca</span> Yönetin
        </h1>
        
        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed">
          Harcamalarınızı takip edin, bütçe hedefleri belirleyin ve yapay zeka asistanınızdan tasarruf tavsiyeleri alın.
        </p>

        <Link 
          href="/dashboard" 
          className="group bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center gap-2 shadow-lg shadow-blue-900/50"
        >
          Hemen Başla
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Link>

        {/* Features Preview */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl text-left">
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
            <PieChart className="text-blue-400 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Detaylı Analiz</h3>
            <p className="text-slate-400">Harcamalarınızı kategorilere göre görselleştirin.</p>
          </div>
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
            <div className="text-purple-400 mb-4 text-2xl">🤖</div>
            <h3 className="text-xl font-bold mb-2">AI Asistan</h3>
            <p className="text-slate-400">Size özel tasarruf tavsiyeleri alın.</p>
          </div>
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
            <ShieldCheck className="text-emerald-400 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">%100 Güvenli</h3>
            <p className="text-slate-400">Verileriniz şifrelenir ve güvenle saklanır.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
import Link from "next/link";
import { LayoutDashboard, Wallet, PiggyBank, Settings } from "lucide-react";

export function Sidebar() {
  return (
    <div className="h-screen w-64 bg-slate-900 text-white flex flex-col p-4 fixed left-0 top-0">
      {/* Logo Alanı */}
      <div className="mb-8 px-2">
        <h1 className="text-2xl font-bold text-blue-400">FinansAI</h1>
      </div>

      {/* Menü Linkleri */}
      <nav className="flex-1 space-y-2">
        <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition">
          <LayoutDashboard size={20} />
          <span>Genel Bakış</span>
        </Link>
        <Link href="/dashboard/transactions" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg transition text-slate-300">
          <Wallet size={20} />
          <span>Harcamalar</span>
        </Link>
        <Link href="/dashboard/budget" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg transition text-slate-300">
          <PiggyBank size={20} />
          <span>Bütçe & Hedef</span>
        </Link>
      </nav>

      {/* Alt Kısım */}
      <div className="mt-auto pt-4 border-t border-slate-700">
        <Link href="/settings" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg transition text-slate-300">
          <Settings size={20} />
          <span>Ayarlar</span>
        </Link>
      </div>
    </div>
  );
}
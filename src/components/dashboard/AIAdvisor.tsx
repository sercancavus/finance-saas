'use client';

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { getFinancialAdvice } from "@/app/actions";

export function AIAdvisor({ totalAmount, transactionCount }: { totalAmount: number, transactionCount: number }) {
  const [advice, setAdvice] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    // Basit bir özet gönderiyoruz (Gerçek projede kategorileri gruplayıp göndeririz)
    const summary = `Toplam ${transactionCount} adet işlem yapıldı.`;
    
    const result = await getFinancialAdvice(totalAmount, summary);
    if (result) setAdvice(result);
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-xl text-white shadow-lg mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Sparkles className="text-yellow-300" />
          Yapay Zeka Asistanı
        </h2>
        
        {!advice && (
          <button 
            onClick={handleAnalyze}
            disabled={loading}
            className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-100 transition disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={16} /> : "Harcamalarımı Yorumla"}
          </button>
        )}
      </div>

      {loading && <p className="opacity-80 animate-pulse">Verilerin inceleniyor, tasarruf önerileri hazırlanıyor...</p>}
      
      {advice && (
        <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm mt-4 border border-white/20">
          <p className="whitespace-pre-line leading-relaxed">{advice}</p>
        </div>
      )}
    </div>
  );
}
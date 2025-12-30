import { addTransaction } from "@/app/actions";
import { prisma } from "@/lib/db";
import { ExpenseChart } from "@/components/dashboard/ExpenseChart";
import { AIAdvisor } from "@/components/dashboard/AIAdvisor";

export default async function DashboardPage() {
  // 1. Veritabanından ham veriyi çek
  const transactionsRaw = await prisma.transaction.findMany({
    orderBy: { createdAt: 'desc' }
  });

  // 2. Decimal (Para) tipini Number'a çevir (Serileştirme hatasını önler)
  const transactions = transactionsRaw.map((t) => ({
    ...t,
    amount: Number(t.amount)
  }));

  // 3. Toplam harcamayı hesapla (AI Asistanı için)
  const totalAmount = transactions.reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Genel Bakış</h1>

      {/* --- ÜST KISIM: GRAFİK --- */}
      <div className="mb-8">
        <ExpenseChart transactions={transactions} />
      </div>

      {/* --- ORTA KISIM: AI ASİSTAN --- */}
      <AIAdvisor totalAmount={totalAmount} transactionCount={transactions.length} />

      {/* --- ALT KISIM: FORM VE LİSTE (GRID) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Sol Kolon: Ekleme Formu */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Hızlı İşlem Ekle</h2>
            <form action={addTransaction} className="flex flex-col gap-4">
                <input 
                  type="text" 
                  name="description" 
                  placeholder="Neye harcadın? (Örn: Kahve)" 
                  className="border p-3 rounded-lg text-black bg-gray-50 focus:bg-white transition"
                  required 
                />
                <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">₺</span>
                    <input 
                      type="number" 
                      name="amount" 
                      placeholder="0.00" 
                      step="0.01" 
                      className="border p-3 pl-8 rounded-lg text-black w-full bg-gray-50 focus:bg-white transition"
                      required 
                    />
                </div>
                <button 
                  type="submit" 
                  className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Ekle
                </button>
            </form>
        </div>

        {/* Sağ Kolon: Liste */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Son İşlemler</h2>
            {transactions.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Henüz harcama yok.</p>
            ) : (
                <ul className="space-y-0 divide-y divide-gray-100">
                {transactions.map((t) => (
                    <li key={t.id} className="flex justify-between py-3 text-gray-700">
                      <span className="font-medium">{t.description}</span>
                      <span className="font-bold text-red-500">- {t.amount} ₺</span>
                    </li>
                ))}
                </ul>
            )}
        </div>

      </div>
    </div>
  );
}
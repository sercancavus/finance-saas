import { addTransaction } from "@/app/actions";
import { prisma } from "@/lib/db";
import { ExpenseChart } from "@/components/dashboard/ExpenseChart";
import { AIAdvisor } from "@/components/dashboard/AIAdvisor";
// 1. Clerk auth importu
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  // 2. Giriş yapan kullanıcının ID'sini al
  const { userId } = await auth();

  // 3. Giriş yoksa ana sayfaya at
  if (!userId) {
    redirect("/");
  }

  // 4. Bu Clerk ID'sine sahip veritabanı kullanıcısını bul
  const dbUser = await prisma.user.findUnique({
    where: { email: userId } // Clerk ID'yi email alanında tutuyorduk
  });

  // Eğer veritabanında henüz kaydı yoksa (ilk kez giriyorsa) işlem listesi boştur
  if (!dbUser) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold">Hoşgeldiniz! 👋</h1>
        <p>Hesabınız oluşturuluyor, lütfen bir işlem ekleyerek başlayın.</p>
        
        {/* Boş olsa bile işlem ekleyebilmesi için formu gösterelim */}
        <div className="mt-8 max-w-md mx-auto bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-lg font-semibold mb-4">İlk İşlemini Ekle</h2>
            <form action={addTransaction} className="flex flex-col gap-4">
                <input type="text" name="description" placeholder="Örn: Market" className="border p-3 rounded" required />
                <input type="number" name="amount" placeholder="0.00" className="border p-3 rounded" required />
                <button type="submit" className="bg-blue-600 text-white p-3 rounded">Ekle</button>
            </form>
        </div>
      </div>
    );
  }

  // 5. SADECE bu kullanıcıya ait işlemleri çek (where: { userId: dbUser.id })
  const transactionsRaw = await prisma.transaction.findMany({
    where: {
      userId: dbUser.id // <--- İŞTE GÜVENLİK BURADA SAĞLANIYOR
    },
    orderBy: { createdAt: 'desc' }
  });

  // Decimal -> Number dönüşümü
  const transactions = transactionsRaw.map((t) => ({
    ...t,
    amount: Number(t.amount)
  }));

  const totalAmount = transactions.reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Genel Bakış</h1>

      <div className="mb-8">
        <ExpenseChart transactions={transactions} />
      </div>

      <AIAdvisor totalAmount={totalAmount} transactionCount={transactions.length} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form */}
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

        {/* Liste */}
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
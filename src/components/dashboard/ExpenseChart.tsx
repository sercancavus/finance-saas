'use client'; // Grafikler tarayıcıda çizildiği için bu satır şart!

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function ExpenseChart({ transactions }: { transactions: any[] }) {
  
  // 1. Veriyi Hazırla: (Burada basit bir gruplama mantığı yapıyoruz)
  // Gerçek projede bunu backend'de veya veritabanında (SQL Group By) yapmak daha performanslıdır.
  // Şimdilik son işlemleri grafik formatına çevirelim:
  
  const data = transactions.slice(0, 5).map(t => ({
    name: t.description.substring(0, 10), // Uzun isimleri kırp
    tutar: Number(t.amount)
  })).reverse(); // Eskiden yeniye sırala ki grafik mantıklı dursun

  return (
    <div className="h-[300px] w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Harcama Analizi (Son 5 İşlem)</h3>
      
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="#888888" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
          />
          <YAxis 
            stroke="#888888" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            tickFormatter={(value) => `₺${value}`} 
          />
          <Tooltip 
            cursor={{ fill: 'transparent' }}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
          <Bar 
            dataKey="tutar" 
            fill="#2563eb" // Tailwind blue-600 rengi
            radius={[4, 4, 0, 0]} 
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
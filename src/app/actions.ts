'use server'

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"

// 1. İşlem Ekleme
export async function addTransaction(formData: FormData) {
  const amount = parseFloat(formData.get("amount") as string)
  const description = formData.get("description") as string
  
  let user = await prisma.user.findFirst();
  if (!user) {
    user = await prisma.user.create({
      data: { email: "test@demo.com", name: "Test User" }
    })
  }

  await prisma.transaction.create({
    data: {
      amount: amount,
      description: description,
      type: "EXPENSE", 
      category: "Genel",
      userId: user.id,
      date: new Date() 
    }
  })

  revalidatePath("/")
}

// 2. GEMINI AI (Güvenli ve Akıllı Versiyon)
export async function getFinancialAdvice(totalAmount: number, categorySummary: string) {
  // GÜVENLİK DÜZELTMESİ: Anahtarı koddan sildik, .env dosyasından okuyoruz
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error("API Key Eksik: .env dosyasını kontrol edin.");
    return "Sistem hatası: API anahtarı sunucuda bulunamadı.";
  }

  try {
    // 1. Modelleri Listele
    const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    const listResponse = await fetch(listUrl);
    
    if (!listResponse.ok) return "Yapay zeka servisine bağlanılamadı (Liste Hatası).";
    
    const listData = await listResponse.json();
    
    // 2. Uygun Modeli Bul
    const validModel = listData.models?.find((m: any) => 
      m.supportedGenerationMethods?.includes("generateContent") &&
      m.name.includes("gemini")
    );

    if (!validModel) return "Uygun model bulunamadı.";

    // 3. İsteği Gönder
    const generateUrl = `https://generativelanguage.googleapis.com/v1beta/${validModel.name}:generateContent?key=${apiKey}`;

    const prompt = `
      Sen finansal danışmansın. Toplam harcama: ${totalAmount} TL.
      Kullanıcıya 3 kısa tasarruf tavsiyesi ver. Türkçe olsun.
    `;

    const response = await fetch(generateUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });

    if (!response.ok) return "Yapay zeka servisine bağlanılamadı (Üretim Hatası).";

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Tavsiye üretilemedi.";

  } catch (error) {
    console.error("Gemini Hatası:", error);
    return "Beklenmedik bir hata oluştu.";
  }
}
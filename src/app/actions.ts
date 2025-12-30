'use server'

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs/server"; // Clerk importu

// 1. İşlem Ekleme
export async function addTransaction(formData: FormData) {
  // DÜZELTME BURADA: auth() önüne 'await' ekledik
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Kullanıcı girişi yapılmamış!");
  }

  const amount = parseFloat(formData.get("amount") as string)
  const description = formData.get("description") as string
  
  // Veritabanında bu kullanıcıyı bul (Clerk ID'si ile)
  // Not: Clerk ID'yi geçici olarak email alanında tutuyoruz.
  let user = await prisma.user.findUnique({
    where: { email: userId } 
  });
  
  // Kullanıcı yoksa oluştur
  if (!user) {
    user = await prisma.user.create({
      data: { 
        email: userId, // Clerk ID'yi buraya kaydediyoruz
        name: "Clerk User" 
      }
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

// 2. GEMINI AI (Güvenli Versiyon - Aynı Kalıyor)
export async function getFinancialAdvice(totalAmount: number, categorySummary: string) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return "HATA: API Anahtarı bulunamadı.";
  }

  try {
    const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    const listResponse = await fetch(listUrl);
    
    if (!listResponse.ok) return "Yapay zeka servisine bağlanılamadı.";
    
    const listData = await listResponse.json();
    
    const validModel = listData.models?.find((m: any) => 
      m.supportedGenerationMethods?.includes("generateContent") &&
      m.name.includes("gemini")
    );

    if (!validModel) return "Uygun model bulunamadı.";

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

    if (!response.ok) return "Tavsiye üretilemedi.";

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Tavsiye üretilemedi.";

  } catch (error) {
    console.error("Gemini Hatası:", error);
    return "Beklenmedik bir hata oluştu.";
  }
}
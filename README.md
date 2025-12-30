# 💰 FinansAI - Yapay Zeka Destekli Finans Asistanı

FinansAI, kişisel harcamalarınızı takip etmenizi sağlayan, harcama verilerini görselleştiren ve **Google Gemini AI** entegrasyonu ile size özel tasarruf tavsiyeleri veren modern bir SaaS projesidir.

![Project Status](https://img.shields.io/badge/Status-Development-orange)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🚀 Özellikler

- **📊 Harcama Takibi:** Gelir ve gider kalemlerini ekleme, listeleme.
- **🤖 AI Danışman:** Google Gemini (Yapay Zeka) ile harcamalarınızı analiz edip tasarruf önerileri alma.
- **📈 Görselleştirme:** Recharts ile harcamaların grafiksel analizi.
- **🗄️ Veritabanı:** PostgreSQL ve Prisma ORM ile güvenli veri saklama.
- **🎨 Modern Arayüz:** Tailwind CSS ile responsive ve şık tasarım.

## 🛠️ Kullanılan Teknolojiler

- **Frontend & Backend:** [Next.js 14](https://nextjs.org/) (App Router, Server Actions)
- **Dil:** TypeScript
- **Veritabanı:** PostgreSQL (Neon Tech)
- **ORM:** Prisma
- **Yapay Zeka:** Google Gemini AI API
- **UI Kit:** Tailwind CSS, Lucide Icons
- **Grafikler:** Recharts

## ⚙️ Kurulum

Projeyi yerel ortamınızda çalıştırmak için adımları izleyin:

1. **Repoyu Klonlayın:**
   ```bash
   git clone [https://github.com/sercancavus/finance-saas.git](https://github.com/sercancavus/finance-saas.git)
   cd finance-saas
2. **Bağımlılıkları Yükleyin:**
   ```bash
   npm install
   ```

3. **Çevre Değişkenlerini Ayarlayın:**
   Ana dizinde `.env` dosyası oluşturun ve aşağıdaki değerleri girin:
   ```env
   DATABASE_URL="postgresql://..."
   GEMINI_API_KEY="AIza..."
   ```

4. **Veritabanını Hazırlayın:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Uygulamayı Başlatın:**
   ```bash
   npm run dev
   ```
   Tarayıcıda `http://localhost:3000` adresine gidin.

## 🗺️ Yol Haritası (Roadmap)

- [x] Temel Dashboard ve Veritabanı Kurulumu
- [x] Google Gemini AI Entegrasyonu
- [x] Grafiksel Raporlar
- [ ] Authentication (Clerk ile Giriş Sistemi) 🔜 *Sıradaki Adım*
- [ ] Mobil Uygulama (React Native)

---
*Geliştirici: Sercan Çavuş*
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// 1. Clerk Provider'ı import et
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FinansAI",
  description: "Yapay zeka destekli finans yönetimi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 2. HTML etiketini ClerkProvider ile sarmala
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
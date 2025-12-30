import { Sidebar } from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sol Menü */}
      <Sidebar />

      {/* Ana İçerik Alanı (Sağ Taraf) */}
      <div className="ml-64 p-8">
        {children}
      </div>
    </div>
  );
}
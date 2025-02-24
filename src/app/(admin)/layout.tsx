import { AdminSidebar } from "@/components/admin/AdminSidebar";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../../styles/globals.css";

const geistSans = Roboto({
  variable: "--font-geist-sans",
  subsets: ["cyrillic"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Админ панель | ЦЕНТР IT-РЕШЕНИЙ",
  description: "Административная панель управления сайтом",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable}`}>
        <div className="min-h-screen bg-gray-50 flex">
          <AdminSidebar />
          <main className="ml-64 flex-1 p-8">
            <div className="max-w-5xl mx-auto">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}

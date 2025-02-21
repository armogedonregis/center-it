import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../styles/globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ModalProvider } from "@/components/providers/ModalProvider";
import { FormModal } from "@/components/FormModal";

const geistSans = Roboto({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Центр IT-РЕШЕНИЙ",
  description: "Центр IT-РЕШЕНИЙ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable}`}>
        <ModalProvider>
          <div className="min-h-screen flex flex-col bg-white text-black overflow-hidden">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <FormModal />
          </div>
        </ModalProvider>
      </body>
    </html>
  );
}

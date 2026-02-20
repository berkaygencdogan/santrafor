"use client";

import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const isAdmin = pathname.startsWith("/admin");

  return (
    <html lang="tr">
      <body className="bg-white text-gray-900">
        {!isAdmin && <Header />}

        {children}

        {!isAdmin && <Footer />}
      </body>
    </html>
  );
}

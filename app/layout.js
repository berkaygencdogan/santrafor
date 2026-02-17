import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Santrafor",
  description: "Futbol Haberleri",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className="bg-white text-gray-900">
        <Header />

        <main className="min-h-screen">{children}</main>

        <Footer />
      </body>
    </html>
  );
}

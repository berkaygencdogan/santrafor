import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Santrafor",
  description: "Spor haberleri, canlı skor, gündem ve daha fazlası.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className="bg-white text-gray-900">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

"use client";

import { useState, useRef } from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaSearch } from "react-icons/fa";
export default function Header() {
  const [activeMenu, setActiveMenu] = useState(null);
  const timeoutRef = useRef(null);

  // Menüye girince kapanmayı iptal et
  const handleEnter = (menu) => {
    clearTimeout(timeoutRef.current);
    setActiveMenu(menu);
  };

  // Menüden çıkınca gecikmeli kapat
  const handleLeave = () => {
    s;
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 200); // 200ms sweet spot
  };

  return (
    <header className="w-full bg-[#1f1f2e] text-white relative z-50">
      {/* NAV WRAPPER */}
      <div
        className="relative"
        onMouseLeave={handleLeave}
        onMouseEnter={() => clearTimeout(timeoutRef.current)}
      >
        <div className="border-b border-white/10 text-sm h-15">
          <div className="max-w-7xl mx-auto h-full px-4 py-2 flex justify-between items-center">
            <div className="flex gap-4 text-gray-300">
              <FaFacebookF className="cursor-pointer hover:text-yellow-400" />
              <FaTwitter className="cursor-pointer hover:text-yellow-400" />
              <FaLinkedinIn className="cursor-pointer hover:text-yellow-400" />
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-20">
          <nav className="hidden md:flex gap-6 text-sm font-semibold tracking-wide">
            <a href="#" className="hover:text-yellow-400">
              Beşiktaş
            </a>
            <a href="#" className="hover:text-yellow-400">
              Fenerbahçe
            </a>
            <a href="#" className="hover:text-yellow-400">
              Galatasaray
            </a>
            <a href="#" className="hover:text-yellow-400">
              Trabzonspor
            </a>
          </nav>
          <div className="absolute left-1/2 -translate-x-1/2 -top-4">
            <img
              src="https://i.hizliresim.com/8qjtfmq.png"
              className="w-[180px]"
            />
          </div>
          <nav className="flex gap-6 text-sm font-semibold">
            <div onMouseEnter={() => handleEnter("menu")}>Menü</div>

            <div onMouseEnter={() => handleEnter("futbol")}>Futbol</div>

            <div onMouseEnter={() => handleEnter("basketbol")}>Basketbol</div>
            <a>Yazarlar</a>
          </nav>
        </div>

        {/* ================= DROPDOWN ================= */}
        <div
          className={`
            absolute left-0 w-full bg-[#16213a] border-t border-red-500
            transition-all duration-300 ease-out
            ${activeMenu ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-3 invisible"}
          `}
        >
          <div className="max-w-7xl mx-auto px-6 py-8">
            {/* MENU */}
            {activeMenu === "menu" && (
              <div className="grid grid-cols-3 gap-10">
                <div>
                  <h3 className="text-green-400 mb-3">DİĞER SPORLAR</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>Espor</li>
                    <li>Golf</li>
                    <li>Tenis</li>
                    <li>Yüzme</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-green-400 mb-3">ÜYELİK</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>Üye Ol</li>
                    <li>Giriş</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-green-400 mb-3">SOSYAL</h3>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded"></div>
                    <div className="w-8 h-8 bg-red-500 rounded"></div>
                  </div>
                </div>
              </div>
            )}

            {/* FUTBOL */}
            {activeMenu === "futbol" && (
              <div className="grid grid-cols-3 gap-10">
                <div>
                  <h3 className="text-green-400 mb-3">LİGLER</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>Süper Lig</li>
                    <li>Premier Lig</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-green-400 mb-3">TAKIMLAR</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>Galatasaray</li>
                    <li>Fenerbahçe</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-green-400 mb-3">KUPALAR</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>Şampiyonlar Ligi</li>
                  </ul>
                </div>
              </div>
            )}

            {/* BASKET */}
            {activeMenu === "basketbol" && (
              <div className="grid grid-cols-2 gap-10">
                <div>
                  <h3 className="text-green-400 mb-3">LİGLER</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>NBA</li>
                    <li>EuroLeague</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-green-400 mb-3">MİLLİ TAKIM</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>Erkek</li>
                    <li>Kadın</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import MegaMenu from "./MegaMenu";
import { FaFacebookF, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import LiveTicker from "./LiveTicker";
import Link from "next/link";
import dynamic from "next/dynamic";

export default function Header() {
  const [open, setOpen] = useState(null); // "menu" | "futbol" | "basketbol"
  const closeTimer = useRef(null);

  const safeOpen = (key) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(key);
  };

  const safeClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 180);
  };
  const LiveTicker = dynamic(() => import("./LiveTicker"), {
    ssr: false,
  });

  useEffect(() => {
    return () => closeTimer.current && clearTimeout(closeTimer.current);
  }, []);

  return (
    <header className="w-full bg-[#1f1f2e] text-white relative z-50">
      {/* TOP BAR */}
      <div className="border-b border-white/10 text-sm">
        <div className="max-w-[1400px] h-20 mx-auto px-4 flex items-center gap-6">
          {/* SOL ICON */}
          <div className="flex items-center gap-4 text-white/70">
            <div className="flex items-center gap-3">
              <FaFacebookF className="text-lg cursor-pointer hover:text-white transition" />
              <FaXTwitter className="text-lg cursor-pointer hover:text-white transition" />
              <FaLinkedinIn className="text-lg cursor-pointer hover:text-white transition" />
            </div>

            <div className="h-10 w-[1px] bg-white/20 ml-2" />
          </div>

          {/* TICKER */}
          <LiveTicker />
        </div>
      </div>
      {/* MAIN NAV */}
      <div className="relative">
        <div className="max-w-[1400px] mx-auto px-4 h-[88px] flex items-center justify-between">
          {/* LEFT NAV */}
          <nav className="hidden md:flex gap-6 text-sm font-semibold tracking-wide">
            <Link href="/besiktas/futbol" className="hover:text-yellow-400">
              Beşiktaş
            </Link>

            <Link href="/fenerbahce/futbol" className="hover:text-yellow-400">
              Fenerbahçe
            </Link>

            <Link href="/galatasaray/futbol" className="hover:text-yellow-400">
              Galatasaray
            </Link>

            <Link href="/trabzonspor/futbol" className="hover:text-yellow-400">
              Trabzonspor
            </Link>
          </nav>

          {/* LOGO (X ortalı, Y en üstte) */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-11">
            <img
              src="https://i.hizliresim.com/8qjtfmq.png"
              alt="Santrafor"
              className="object-contain"
              width={150}
            />
          </div>

          {/* RIGHT NAV */}
          <nav className="hidden md:flex gap-6 text-sm font-semibold tracking-wide items-center">
            {/* MENÜ */}
            <div
              className="relative"
              onMouseEnter={() => safeOpen("menu")}
              onMouseLeave={safeClose}
            >
              <button
                className={`hover:text-yellow-400 ${open === "menu" ? "text-yellow-400" : ""}`}
              >
                Menü
              </button>
            </div>

            {/* FUTBOL */}
            <div
              className="relative"
              onMouseEnter={() => safeOpen("futbol")}
              onMouseLeave={safeClose}
            >
              <button
                className={`hover:text-yellow-400 ${open === "futbol" ? "text-yellow-400" : ""}`}
              >
                <Link href="/futbol">Futbol</Link>
              </button>
            </div>

            {/* BASKETBOL */}
            <div
              className="relative"
              onMouseEnter={() => safeOpen("basketbol")}
              onMouseLeave={safeClose}
            >
              <button
                className={`hover:text-yellow-400 ${open === "basketbol" ? "text-yellow-400" : ""}`}
              >
                <Link href="/basketbol">Basketbol</Link>
              </button>
            </div>

            <Link href="/author" className="hover:text-yellow-400">
              Yazarlar
            </Link>
          </nav>
        </div>

        {/* MEGA MENU PANEL (hover içinde gezebilirsin) */}
        <div
          className={`absolute left-0 right-0 top-full bg-[#0f172a] border-t border-white/10
            transition-all duration-200 ease-out
            ${open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}
          `}
          onMouseEnter={() => open && safeOpen(open)}
          onMouseLeave={safeClose}
        >
          <div className="max-w-[1400px] mx-auto px-4 py-8">
            {open === "menu" && <MegaMenu type="menu" />}
            {open === "futbol" && <MegaMenu type="futbol" />}
            {open === "basketbol" && <MegaMenu type="basketbol" />}
          </div>
        </div>
      </div>
    </header>
  );
}

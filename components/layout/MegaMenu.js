"use client";

import { useEffect, useState } from "react";
import { sportsData } from "@/lib/sportsData";
import Link from "next/link";

export default function MegaMenu({ type }) {
  /* ================= STATIC DATA ================= */
  const futbol = sportsData?.futbol || [];
  const basketbol = sportsData?.basketbol || [];
  const diger = sportsData?.diger || [];

  /* ================= API STATE ================= */
  const [leagues, setLeagues] = useState([]);
  const [teams, setTeams] = useState([]);
  const API = process.env.NEXT_PUBLIC_API_URL;

  const HIDDEN_LEAGUES = [24, 570, 390, 27];
  /* ================= FETCH FUTBOL ================= */
  useEffect(() => {
    if (type !== "futbol") return;

    // 🔥 ligleri çek
    fetch(`${API}/api/sport/leagues`)
      .then((res) => res.json())
      .then((res) => {
        setLeagues(res.data || []);
      })
      .catch(console.error);

    // 🔥 süper lig üzerinden TR takımlar (standings mantığı)
    fetch(`${API}/api/sport/league/600/teams`)
      .then((res) => res.json())
      .then((res) => {
        setTeams(res.data || []);
      })
      .catch(console.error);
  }, [type]);

  /* ================= MENU ================= */
  if (type === "menu") {
    return (
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <h4 className="text-lime-400 font-bold mb-3">DİĞER SPORLAR</h4>

          <div className="grid grid-cols-2 gap-y-2 text-sm text-white/80">
            {diger.leagues.map((item) => (
              <Link
                key={item.slug}
                href={`/diger-sporlar/${item.slug}`}
                className="hover:text-white"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="mt-8 space-y-2 text-sm">
            <div className="text-white font-semibold">
              HANGİ MAÇ HANGİ KANALDA?
            </div>

            <Link href="/" className="block text-white/70 hover:text-white">
              GÜNLÜK MAÇ LİSTESİ
            </Link>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-3">SANTRAFOR ÜYESİ MİSİN ?</h4>

          <div className="space-y-2 text-sm text-white/80">
            <Link href="/giris" className="block hover:text-white">
              Üye Girişi
            </Link>
          </div>

          <h4 className="text-white font-bold mt-8 mb-3">BİZE ULAŞIN</h4>

          <div className="flex gap-2">
            {["f", "x", "in", "ig"].map((k) => (
              <div
                key={k}
                className="w-9 h-9 rounded flex items-center justify-center bg-white/10 hover:bg-white/20 transition cursor-pointer"
              >
                <span className="text-xs font-bold">{k.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:block">
          <div className="h-full rounded-xl bg-white/5 border border-white/10" />
        </div>
      </div>
    );
  }

  /* ================= BASKETBOL (AYNI) ================= */
  if (type === "basketbol") {
    return (
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <h4 className="text-lime-400 font-bold mb-3">
            LİGLER & ORGANİZASYONLAR
          </h4>

          <div className="space-y-2 text-sm text-white/80">
            {basketbol.leagues.map((item) => (
              <Link
                key={item.slug}
                href={`/basketbol/${item.slug}`}
                className="block hover:text-white"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <h4 className="text-lime-400 font-bold mt-8 mb-3">DİĞER</h4>

          <Link
            href="/basketbol/milli"
            className="block text-sm text-white/80 hover:text-white"
          >
            Milli Takımlar
          </Link>
        </div>

        <div className="hidden md:block">
          <div className="h-full rounded-xl bg-white/5 border border-white/10" />
        </div>
      </div>
    );
  }

  /* ================= FUTBOL (API) ================= */
  if (type === "futbol") {
    return (
      <div className="grid md:grid-cols-3 gap-10">
        {/* LİGLER */}
        <div>
          <h4 className="text-lime-400 font-bold mb-3">LİGLER</h4>

          <div className="grid grid-cols-2 gap-y-2 text-sm text-white/80">
            {leagues
              .filter((l) => !HIDDEN_LEAGUES.includes(l.id))
              .slice(0, 24)
              .map((item) => (
                <Link
                  key={item.id}
                  href={`/futbol/${item.id}`}
                  className="hover:text-white"
                >
                  {item.name}
                </Link>
              ))}
          </div>
        </div>

        {/* TAKIMLAR */}
        <div>
          <h4 className="text-lime-400 text-center font-bold mb-3">TAKIMLAR</h4>

          <div className="grid grid-cols-2 gap-y-2 text-sm text-white/80 text-right">
            {teams.slice(0, 20).map((team) => (
              <b key={team.id}>{team.name}</b>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

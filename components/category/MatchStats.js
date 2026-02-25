"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MatchStats({ teamId, teamName }) {
  const [matches, setMatches] = useState([]);
  const router = useRouter();
  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!teamId) return;

    fetch(`${API}/api/sport/team/${teamId}/matches`)
      .then((r) => r.json())
      .then((res) => {
        const data = res.data || {};
        setMatches(data);

        // 🔥 SON 6 MAÇTAN FORM HESAPLA
        const pastMatches = data.past || [];

        const form = pastMatches
          .slice(0, 6)
          .reverse() // 👉 en yeni sağda olsun
          .map((m) => {
            const isHome = m.home?.toLowerCase() === teamName?.toLowerCase();

            if (isHome) {
              if (m.homeScore > m.awayScore) return "G";
              if (m.homeScore < m.awayScore) return "M";
              return "B";
            } else {
              if (m.awayScore > m.homeScore) return "G";
              if (m.awayScore < m.homeScore) return "M";
              return "B";
            }
          });

        // 🔥 parent'a gönder
        if (onFormReady) onFormReady(form);
      })
      .catch((err) => {
        console.log("MATCH ERROR:", err);
      });
  }, [teamId, teamName]);

  const past = matches?.past || [];
  const upcoming = matches?.upcoming || [];

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "short",
      timeZone: "Europe/Istanbul",
    });

  return (
    <div className="max-w-[1400px] mx-auto px-4 mt-10 grid md:grid-cols-2 gap-6">
      {/* 🔥 SON MAÇLAR */}
      <div className="bg-[#111827] p-5 rounded-2xl shadow-lg">
        <h3 className="border-b border-red-500 pb-2 mb-4 font-semibold">
          SON MAÇLAR
        </h3>

        {past.slice(0, 6).map((m) => {
          const isWin =
            (m.home === teamName && m.homeScore > m.awayScore) ||
            (m.away === teamName && m.awayScore > m.homeScore);

          return (
            <div
              key={m.id}
              className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-white/5 transition cursor-pointer"
              onClick={() => router.push(`/matches/${m.id}`)}
            >
              {/* HOME */}
              <div className="flex items-center gap-2 w-[35%]">
                <img src={m.homeLogo} className="w-6 h-6" />
                <span className="text-sm truncate">{m.home}</span>
              </div>

              {/* SCORE */}
              <div
                className={`px-3 py-1 rounded-md text-sm font-bold ${
                  isWin
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {m.homeScore} - {m.awayScore}
              </div>

              {/* AWAY */}
              <div className="flex items-center gap-2 justify-end w-[35%]">
                <span className="text-sm truncate">{m.away}</span>
                <img src={m.awayLogo} className="w-6 h-6" />
              </div>

              {/* DATE */}
              <div className="text-xs text-gray-400 w-[70px] text-right">
                {formatDate(m.date)}
              </div>
            </div>
          );
        })}
      </div>

      {/* 🔥 FİKSTÜR */}
      <div className="bg-[#111827] p-5 rounded-2xl shadow-lg">
        <h3 className="border-b border-red-500 pb-2 mb-4 font-semibold">
          FİKSTÜR
        </h3>

        {upcoming.slice(0, 6).map((m) => (
          <div
            key={m.id}
            className="flex items-center justify-between py-3.5 px-3 rounded-lg hover:bg-white/5 transition"
          >
            {/* HOME */}
            <div className="flex items-center gap-2 w-[35%]">
              <img src={m.homeLogo} className="w-6 h-6" />
              <span className="text-sm truncate">{m.home}</span>
            </div>

            {/* VS */}
            <div className="px-3 py-1 bg-gray-700 text-gray-300 rounded-md text-xs">
              VS
            </div>

            {/* AWAY */}
            <div className="flex items-center gap-2 justify-end w-[35%]">
              <span className="text-sm truncate">{m.away}</span>
              <img src={m.awayLogo} className="w-6 h-6" />
            </div>

            {/* DATE */}
            <div className="text-xs text-gray-400 w-[70px] text-right">
              {formatDate(m.date)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LiveTicker() {
  const [matches, setMatches] = useState([]);
  const API = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API}/api/sport/combined`, {
          cache: "no-store",
        });
        const data = await res.json();
        setMatches(data.data || []);
      } catch (err) {
        console.log("TICKER ERROR:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [API]);

  if (!matches.length) return null;

  function goMatch(m) {
    if (!m?.id) return; // id yoksa tıklama
    router.push(`/matches/${m.id}`);
  }

  return (
    <div className="w-full overflow-hidden bg-[#0B1220] border-y border-white/10">
      <div className="ticker flex gap-6 py-3">
        {[...matches, ...matches].map((m, i) => (
          <button
            key={`${m?.id ?? "x"}-${i}`}
            type="button"
            onClick={() => goMatch(m)}
            className="flex items-center gap-3 text-sm bg-white/5 px-4 py-2 rounded-xl min-w-max hover:bg-white/10 transition cursor-pointer"
            title="Maç detayına git"
          >
            {/* HOME */}
            <div className="flex items-center gap-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.home.logo} className="w-4 h-4" alt="" />
              <span>{m.home.name}</span>
            </div>

            {/* SCORE / TIME */}
            <span className="font-bold text-yellow-400">
              {m.isLive ? (
                <>
                  {m.homeScore}-{m.awayScore} 🔴 {m.minute}
                </>
              ) : (
                new Date(m.time).toLocaleTimeString("tr-TR", {
                  hour: "2-digit",
                  minute: "2-digit",
                  timeZone: "Europe/Istanbul",
                })
              )}
            </span>

            {/* AWAY */}
            <div className="flex items-center gap-1">
              <span>{m.away.name}</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.away.logo} className="w-4 h-4" alt="" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

export default function LiveTicker() {
  const [matches, setMatches] = useState([]);
  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = () => {
      fetch(`${API}/api/sport/fixtures/today`)
        .then((res) => res.json())
        .then((res) => setMatches(res.data || []));
    };

    fetchData();

    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  if (!matches.length) return null;

  return (
    <div className="w-full overflow-hidden bg-[#0B1220] border-y border-white/10">
      <div className="ticker flex gap-6 py-3">
        {[...matches, ...matches].map((m, i) => {
          const isFinished = m.status === 5;

          return (
            <div
              key={i}
              className="flex items-center gap-3 text-sm bg-white/5 px-4 py-2 rounded-xl min-w-max"
            >
              {/* HOME */}
              <div className="flex items-center gap-1">
                <img src={m.home.logo} className="w-4 h-4" />
                <span>{m.home.name}</span>
              </div>

              {/* SCORE / TIME */}
              <span className="font-bold text-yellow-400">
                {isFinished
                  ? `${m.homeScore}-${m.awayScore}`
                  : new Date(m.time).toLocaleTimeString("tr-TR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
              </span>
              {/* AWAY */}
              <div className="flex items-center gap-1">
                <span>{m.away.name}</span>
                <img src={m.away.logo} className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

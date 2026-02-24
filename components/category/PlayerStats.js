"use client";

import { useMemo } from "react";

export default function PlayerStats({ squad = [], teamName }) {
  const players = useMemo(() => {
    return squad
      .map((p) => ({
        name: p.name,
        photo: p.photo,
        appearances: p.appearances || 0,
        goals: p.goals || 0,
        assists: p.assists || 0,
      }))
      .sort((a, b) => b.goals - a.goals)
      .slice(0, 10);
  }, [squad]);

  return (
    <div className="max-w-[1400px] mx-auto px-4 mt-10 grid lg:grid-cols-[1fr_2fr] gap-6">
      {/* 🔥 SOL - TOP 3 */}
      <div className="space-y-4">
        <div className="mb-3">
          <span className="inline-block bg-yellow-400/10 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full mb-2">
            ÖNE ÇIKAN
          </span>

          <h3 className="text-lg font-bold text-white">
            🏆 En Skorer Oyuncular
          </h3>

          <div className="mt-2 h-[2px] w-full bg-gradient-to-r from-yellow-400/40 via-yellow-400 to-transparent rounded-full" />
        </div>
        {players.slice(0, 6).map((p, i) => (
          <div
            key={i}
            className="flex items-center gap-3 bg-[#111827] p-3 rounded-xl border border-white/10"
          >
            <img
              src={p.photo}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold">{p.name}</p>
              <p className="text-xs text-gray-400">
                ⚽ {p.goals} gol • 🎯 {p.assists} asist
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 SAĞ - TABLO */}
      <div className="bg-[#111827] p-4 rounded-xl border border-white/10">
        <h3 className="text-center text-green-400 font-bold mb-4 text-sm">
          {teamName?.toUpperCase()} OYUNCU İSTATİSTİKLERİ
        </h3>

        <table className="w-full text-sm">
          <thead className="text-gray-400 text-xs">
            <tr>
              <th className="text-left py-2">Oyuncu</th>
              <th className="text-center">Maç</th>
              <th className="text-center">Gol</th>
              <th className="text-center">Asist</th>
            </tr>
          </thead>

          <tbody>
            {players.map((p, i) => (
              <tr key={i} className="border-b border-white/10">
                <td className="py-3 flex items-center gap-2">
                  <img
                    src={p.photo}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  {p.name}
                </td>

                <td className="text-center">{p.appearances}</td>

                <td className="text-center text-green-400 font-bold">
                  {p.goals}
                </td>

                <td className="text-center text-yellow-400 font-bold">
                  {p.assists}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

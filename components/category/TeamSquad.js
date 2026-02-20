"use client";

import { useState, useMemo } from "react";

const tabs = ["Kaleci", "Defans", "Orta Saha", "Hücum"];

const positionMap = {
  24: "Kaleci",
  25: "Defans",
  26: "Orta Saha",
  27: "Hücum",
};

export default function TeamSquad({ squad = [], teamName }) {
  const [active, setActive] = useState("Kaleci");

  const grouped = useMemo(() => {
    const result = {
      Kaleci: [],
      Defans: [],
      "Orta Saha": [],
      Hücum: [],
    };

    squad.forEach((item) => {
      const pos = positionMap[item.position_id] || "Orta Saha";

      result[pos].push({
        no: item.number || "-",
        name: item.name,
        photo: item.photo,
      });
    });

    return result;
  }, [squad]);

  const players = grouped[active] || [];

  return (
    <div className="bg-[#111827] rounded-xl overflow-hidden h-[450px] border-2 border-white/90">
      {/* HEADER */}
      <div className="bg-[#1f2937] text-center py-3 font-bold text-green-400">
        {teamName?.toUpperCase()} KADROSU
      </div>

      {/* TABS */}
      <div className="flex text-sm border-b border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`flex-1 py-3 font-semibold transition ${
              active === tab
                ? "text-white border-b-2 border-red-500"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="text-sm">
        {/* HEAD */}
        <div className="grid grid-cols-[40px_1fr] px-4 py-2 text-gray-400 border-b border-white/10 sticky top-0 bg-[#111827] z-10">
          <span>#</span>
          <span>Oyuncu</span>
        </div>

        {/* LIST */}
        <div className="max-h-[280px] overflow-y-auto">
          {players.map((p, i) => (
            <div
              key={i}
              className="grid grid-cols-[40px_1fr] items-center px-4 py-3 border-b border-white/5 hover:bg-white/5 transition"
            >
              {/* NUMARA */}
              <span className="text-gray-400">{p.no}</span>

              {/* FOTO + İSİM */}
              <div className="flex items-center gap-3">
                <img
                  src={p.photo}
                  alt={p.name}
                  className="w-8 h-8 rounded-full object-cover bg-white/10"
                />

                <span className="font-medium">{p.name}</span>
              </div>
            </div>
          ))}

          {!players.length && (
            <div className="p-4 text-gray-500 text-center">Veri bulunamadı</div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

const tabs = ["Kaleci", "Defans", "Orta Saha", "Hücum"];

const mockSquad = {
  Kaleci: [
    { no: 19, name: "Günay Güvenç", played: 7, g: 0, a: 0 },
    { no: 1, name: "Uğurcan Çakır", played: 14, g: 0, a: 0 },
    { no: 12, name: "Batuhan Ahmet Şen", played: 0, g: 0, a: 0 },
    { no: 70, name: "Enes Emre Büyük", played: 0, g: 0, a: 0 },
    { no: 60, name: "Arda Yılmaz", played: 0, g: 0, a: 0 },
    { no: 70, name: "Enes Emre Büyük", played: 0, g: 0, a: 0 },
    { no: 12, name: "Batuhan Ahmet Şen", played: 0, g: 0, a: 0 },
    { no: 1, name: "Uğurcan Çakır", played: 14, g: 0, a: 0 },
  ],
  Defans: [],
  "Orta Saha": [],
  Hücum: [],
};

export default function TeamSquad() {
  const [active, setActive] = useState("Kaleci");

  const players = mockSquad[active] || [];

  return (
    <div className="bg-[#111827] rounded-xl overflow-hidden h-[450px] border-2 border-white/90">
      {/* HEADER */}
      <div className="bg-[#1f2937] text-center py-3 font-bold text-green-400">
        GALATASARAY KADROSU
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
        <div className="grid grid-cols-4 px-4 py-2 text-gray-400 border-b border-white/10 sticky top-0 bg-[#111827] z-10">
          <span>#</span>
          <span>Oyuncu</span>
          <span className="text-center">Oyn</span>
          <span className="text-center">G</span>
        </div>

        {/* SCROLL AREA */}
        <div className="max-h-[280px] overflow-y-auto">
          {players.map((p, i) => (
            <div
              key={i}
              className="grid grid-cols-4 px-4 py-3 border-b border-white/5 hover:bg-white/5 transition"
            >
              <span className="text-gray-400">{p.no}</span>
              <span>{p.name}</span>
              <span className="text-center">{p.played}</span>
              <span className="text-center">{p.g}</span>
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

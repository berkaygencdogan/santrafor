"use client";

import { useState } from "react";
import Link from "next/link";
import StandingsTable from "@/components/ui/StandingsTable";
import { sportsData } from "@/lib/sportsData";

export default function AuthorsPage() {
  const [activeTab, setActiveTab] = useState("gunun");
  const [search, setSearch] = useState("");

  const authors = [
    {
      id: 1,
      name: "Hakkı Yalçın",
      slug: "hakki-yalcin",
      image: "https://picsum.photos/400/300",
      latest: "Sorgulama!",
      date: "17 Şubat 2026",
    },
    {
      id: 2,
      name: "Ender Bilgin",
      slug: "ender-bilgin",
      image: "https://picsum.photos/401/300",
      latest: "Juventus ile akıl oyunu",
      date: "17 Şubat 2026",
    },
    {
      id: 3,
      name: "Ahmet Çakar",
      slug: "ahmet-cakar",
      image: "https://picsum.photos/402/300",
      latest: "Hakem kararları tartışılıyor",
      date: "16 Şubat 2026",
    },
  ];

  // 🔥 ARAMA (sadece isim)
  const filteredAuthors = authors.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main className="max-w-[1400px] mx-auto px-4 mt-10 grid lg:grid-cols-[1fr_320px] gap-8 text-white">
      {/* SOL */}
      <div>
        {/* HEADER */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setActiveTab("gunun")}
            className={`px-5 py-2 rounded-full font-semibold transition ${
              activeTab === "gunun"
                ? "bg-yellow-400 text-black"
                : "bg-[#1a2236]"
            }`}
          >
            Günün Yazarları
          </button>

          <button
            onClick={() => setActiveTab("tum")}
            className={`px-5 py-2 rounded-full font-semibold transition ${
              activeTab === "tum" ? "bg-yellow-400 text-black" : "bg-[#1a2236]"
            }`}
          >
            Tüm Yazarlar
          </button>
        </div>

        {/* 🔍 SEARCH SADECE TÜM YAZARLAR */}
        {activeTab === "tum" && (
          <div className="flex gap-3 mb-8">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value.slice(0, 7))} // max 7 karakter
              placeholder="Yazar Ara..."
              className="flex-1 bg-[#111827] border border-white/10 px-4 py-3 rounded-xl focus:outline-none focus:border-yellow-400"
            />

            <button className="bg-yellow-400 text-black px-5 rounded-xl font-bold">
              Ara
            </button>
          </div>
        )}

        {/* CONTENT */}
        {activeTab === "gunun" ? (
          <div className="grid md:grid-cols-2 gap-6">
            {authors.map((a) => (
              <div
                key={a.id}
                className="rounded-xl overflow-hidden bg-[#111827] hover:bg-[#1a2236] transition"
              >
                <img src={a.image} className="w-full h-[180px] object-cover" />

                <div className="p-4">
                  <h3 className="font-bold text-lg">{a.name}</h3>

                  <Link href={`/authors/${a.slug}`}>
                    <p className="text-yellow-400 mt-2 font-semibold text-lg hover:underline">
                      {a.latest}
                    </p>
                  </Link>

                  <p className="text-gray-400 text-sm mt-2">{a.date}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* 🔥 TÜM YAZARLAR (FİLTRELİ) */
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAuthors.map((a) => (
              <Link
                key={a.id}
                href={`/authors/${a.slug}`}
                className="flex items-center gap-4 bg-[#111827] p-4 rounded-xl hover:bg-[#1a2236] transition"
              >
                <img
                  src={a.image}
                  className="w-16 h-16 rounded-full object-cover"
                />

                <div>
                  <h3 className="font-semibold">{a.name}</h3>
                  <p className="text-sm text-gray-400">Tüm yazılarını gör →</p>
                </div>
              </Link>
            ))}

            {/* sonuç yoksa */}
            {filteredAuthors.length === 0 && (
              <div className="text-gray-400 col-span-full text-center">
                Sonuç bulunamadı
              </div>
            )}
          </div>
        )}
      </div>

      {/* SAĞ */}
      <aside className="space-y-4">
        <StandingsTable
          standings={sportsData.futbol.leagues[0].standings}
          title="Süper Lig"
        />

        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 h-[250px] rounded-xl flex items-center justify-center font-bold">
          REKLAM
        </div>
      </aside>
    </main>
  );
}

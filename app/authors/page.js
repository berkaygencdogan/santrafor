"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import StandingsContainer from "@/components/ui/StandingsContainer";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function AuthorsPage() {
  const [activeTab, setActiveTab] = useState("gunun"); // gunun | tum
  const [search, setSearch] = useState("");

  const [authors, setAuthors] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);
        const res = await fetch(`${API}/api/authors`, { cache: "no-store" });
        const json = await res.json();
        if (!alive) return;
        setAuthors(json?.data || []);
      } catch (e) {
        console.log("AUTHORS FETCH ERROR:", e);
        if (!alive) return;
        setAuthors([]);
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, []);

  const todaysAuthors = useMemo(() => authors.slice(0, 6), [authors]);
  const filteredAuthors = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return authors;
    return authors.filter((a) => (a?.name || "").toLowerCase().includes(q));
  }, [authors, search]);

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

        {/* SEARCH */}
        {activeTab === "tum" && (
          <div className="flex gap-3 mb-8">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value.slice(0, 20))}
              placeholder="Yazar Ara..."
              className="flex-1 bg-[#111827] border border-white/10 px-4 py-3 rounded-xl focus:outline-none focus:border-yellow-400"
            />

            <button
              type="button"
              onClick={() => {}}
              className="bg-yellow-400 text-black px-5 rounded-xl font-bold"
            >
              Ara
            </button>
          </div>
        )}

        {/* LOADING */}
        {loading ? (
          <div className="bg-[#111827] border border-white/10 rounded-xl p-6 text-gray-300">
            Yükleniyor...
          </div>
        ) : null}

        {/* CONTENT */}
        {!loading && activeTab === "gunun" ? (
          <div className="grid md:grid-cols-2 gap-6">
            {todaysAuthors.map((a) => (
              <Link
                key={a.id}
                href={`/authors/${a.id}`}
                className="rounded-xl overflow-hidden bg-[#111827] hover:bg-[#1a2236] transition block"
              >
                <img
                  src={a.image || "/default-avatar.png"}
                  className="w-full h-[180px] object-cover"
                  alt={a.name || "author"}
                />

                <div className="p-4">
                  <h3 className="font-bold text-lg">{a.name}</h3>

                  <p className="text-yellow-400 mt-2 font-semibold text-lg">
                    {a.latest?.title || "Henüz yazı yok"}
                  </p>

                  <p className="text-gray-400 text-sm mt-2">
                    {a.latest?.date || ""}
                  </p>
                </div>
              </Link>
            ))}

            {!todaysAuthors.length && (
              <div className="text-gray-400 col-span-full text-center">
                Yazar bulunamadı
              </div>
            )}
          </div>
        ) : null}

        {!loading && activeTab === "tum" ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAuthors.map((a) => (
              <Link
                key={a.id}
                href={`/authors/${a.id}`}
                className="flex items-center gap-4 bg-[#111827] p-4 rounded-xl hover:bg-[#1a2236] transition"
              >
                <img
                  src={a.image || "/default-avatar.png"}
                  className="w-16 h-16 rounded-full object-cover"
                  alt={a.name || "author"}
                />

                <div className="min-w-0">
                  <h3 className="font-semibold truncate">{a.name}</h3>
                  <p className="text-sm text-gray-400 truncate">
                    {a.latest?.title ? a.latest.title : "Tüm yazılarını gör →"}
                  </p>
                </div>
              </Link>
            ))}

            {filteredAuthors.length === 0 && (
              <div className="text-gray-400 col-span-full text-center">
                Sonuç bulunamadı
              </div>
            )}
          </div>
        ) : null}
      </div>

      {/* SAĞ */}
      <aside className="space-y-4">
        <StandingsContainer leagueName="La Liga" />

        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 h-[250px] rounded-xl flex items-center justify-center font-bold">
          REKLAM
        </div>
      </aside>
    </main>
  );
}

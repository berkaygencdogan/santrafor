"use client";

import { useState } from "react";
import NewsCard from "@/components/home/NewsCard";
import { sportsData } from "@/lib/sportsData";
import Link from "next/link";
import StandingsTable from "../ui/StandingsTable";

export default function SportNews({ title, posts = [], sport }) {
  const [showAll, setShowAll] = useState(false);

  // 🔥 HABER DATA
  const generatePosts = (prefix) =>
    Array.from({ length: 20 }).map((_, i) => ({
      id: `${prefix}-${i}`,
      title: `${prefix} haber ${i + 1}`,
      image: `https://picsum.photos/400/300?random=${prefix}${i}`,
      date: `${10 + i} Şubat 2026`,
    }));

  const allPosts = posts.length ? posts : generatePosts(title || "spor");

  const visiblePosts = showAll ? allPosts : allPosts.slice(0, 9);

  // ✅ DOĞRU LEAGUE BULMA (name yerine slug daha sağlıklı ama şimdilik böyle)
  const leagueData = sportsData[sport]?.leagues.find((l) => l.name === title);

  return (
    <section className="max-w-[1400px] mx-auto px-4 mt-10">
      {/* TITLE */}
      {title && (
        <div className="mb-6 flex items-center justify-between">
          <Link
            href={`/${sport}/${leagueData?.slug || ""}`}
            className="text-2xl font-bold text-black hover:text-yellow-500 transition"
          >
            {leagueData?.name || title}
          </Link>

          <Link
            href={`/${sport}/${leagueData?.slug || ""}`}
            className="text-sm text-gray-500 hover:text-black transition"
          >
            Tümünü Gör →
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-8 items-start">
        {/* SOL */}
        <div>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            {visiblePosts.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>

          {!showAll && allPosts.length > 9 && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setShowAll(true)}
                className="px-6 py-3 rounded-xl bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition"
              >
                Daha Fazla
              </button>
            </div>
          )}
        </div>

        {/* SAĞ */}
        {leagueData && (
          <StandingsTable
            standings={leagueData.standings}
            title={leagueData.name}
          />
        )}
      </div>
    </section>
  );
}

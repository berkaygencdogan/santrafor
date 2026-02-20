"use client";

import { useState } from "react";
import NewsCard from "@/components/home/NewsCard";
import Link from "next/link";
import StandingsContainer from "../ui/StandingsContainer";

export default function SportNews({ title, leagueId, posts = [], sport }) {
  const [showAll, setShowAll] = useState(false);

  /* 🔥 HABER DATA */
  const generatePosts = (prefix) =>
    Array.from({ length: 20 }).map((_, i) => ({
      id: `${prefix}-${i}`,
      title: `${prefix} haber ${i + 1}`,
      image: `https://picsum.photos/400/300?random=${prefix}${i}`,
      date: `${10 + i} Şubat 2026`,
    }));

  const allPosts = posts.length ? posts : generatePosts(title || "spor");
  const visiblePosts = showAll ? allPosts : allPosts.slice(0, 9);

  return (
    <section className="max-w-[1400px] mx-auto px-4 mt-10">
      {/* TITLE */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href={`/${sport}/${title}`}
          className="text-2xl font-bold text-white hover:text-yellow-500 transition"
        >
          {title}
        </Link>

        <Link
          href={`/${sport}/${leagueId}`}
          className="text-sm text-gray-500 hover:text-black transition"
        >
          Tümünü Gör →
        </Link>
      </div>

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
        <StandingsContainer leagueName={title} />
      </div>
    </section>
  );
}

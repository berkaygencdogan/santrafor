"use client";

import { useState } from "react";
import NewsCard from "@/components/home/NewsCard";

export default function CategoryGrid({ posts = [] }) {
  const [showAll, setShowAll] = useState(false);

  if (!posts.length) return null;

  const visiblePosts = showAll ? posts : posts.slice(0, 9);

  const hasMore = posts.length > 9;

  return (
    <div className="max-w-[1400px] mx-auto px-4 mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        {/* SOL */}

        <div
          className={`grid gap-6
          ${
            showAll
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }
        `}
        >
          {visiblePosts.map((p) => (
            <NewsCard key={p.id} item={p} />
          ))}
        </div>

        {/* SAĞ REKLAM */}

        <div className="hidden lg:flex bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl items-center justify-center font-bold sticky top-6 h-fit min-h-[600px]">
          REKLAM ALANI
        </div>
      </div>

      {/* BUTTON */}

      {hasMore && (
        <div className="flex justify-center mt-10">
          {!showAll ? (
            <button
              onClick={() => setShowAll(true)}
              className="bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg hover:bg-yellow-400 transition"
            >
              Daha Fazla Haber
            </button>
          ) : (
            <button
              onClick={() => {
                setShowAll(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="bg-gray-700 text-white font-semibold px-6 py-3 rounded-lg hover:bg-gray-600 transition"
            >
              Daha Az Göster
            </button>
          )}
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetch(`${API}/api/posts`)
      .then((r) => r.json())
      .then((d) => setNews(d.data || []));
  }, []);

  return (
    <main className="max-w-[1400px] mx-auto px-4 mt-10 text-white">
      <h1 className="text-3xl font-bold mb-8 text-black">Tüm Haberler</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {news.map((item) => (
          <div
            key={item.id}
            className="bg-[#1F1F2E] rounded-2xl shadow-md overflow-hidden hover:scale-[1.02] transition"
          >
            {/* RESİM */}

            <img
              src={item.cover_image}
              alt={item.title}
              className="w-full h-[200px] object-cover"
            />

            {/* CONTENT */}

            <div className="p-4">
              <h2 className="font-bold text-lg mb-2 line-clamp-2">
                {item.title}
              </h2>

              <p className="text-sm text-gray-400 mb-3">
                {new Date(item.created_at).toLocaleDateString("tr-TR")}
              </p>

              {/* SUMMARY */}

              <p className="text-sm text-gray-300 mb-4 line-clamp-3">
                {item.summary}
              </p>

              <Link
                href={`/${item.league_slug}/${item.team_slug}/${item.slug}`}
                className="text-yellow-400 font-semibold hover:underline"
              >
                Devamını oku →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

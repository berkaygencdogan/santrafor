"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function NewsDetailPage() {
  const { slug } = useParams();
  const API = process.env.NEXT_PUBLIC_API_URL;

  const [news, setNews] = useState(null);
  const [latest, setLatest] = useState([]);

  useEffect(() => {
    if (!slug) return;

    fetch(`${API}/api/posts/${slug}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setNews(d.data);
      });

    fetch(`${API}/api/posts`)
      .then((r) => r.json())
      .then((d) => setLatest(d.data.slice(0, 5)));
  }, [slug]);

  if (!news) return <div className="p-10">Yükleniyor...</div>;

  return (
    <div className="max-w-[1400px] mx-auto px-4 mt-10 grid lg:grid-cols-[1fr_320px] gap-10 text-white">
      {/* LEFT */}
      <div>
        {/* 🔥 BREADCRUMB */}
        <div className="text-sm text-gray-400 mb-4 flex flex-wrap items-center gap-2">
          <Link href="/futbol" className="hover:text-yellow-400">
            Spor Haberleri
          </Link>

          {news.league_name && (
            <>
              <span>›</span>
              <Link
                href={`/futbol/${news.league_id}`}
                className="hover:text-yellow-400"
              >
                {news.league_name}
              </Link>
            </>
          )}

          {news.team_name && (
            <>
              <span>›</span>
              <Link
                href={`/futbol/team/${news.team_id}`}
                className="hover:text-yellow-400"
              >
                {news.team_name}
              </Link>
            </>
          )}

          <span>›</span>

          <span className="text-white font-semibold line-clamp-1">
            {news.title}
          </span>
        </div>

        {/* TITLE */}
        <h1 className="text-4xl font-bold mb-4">{news.title}</h1>

        {/* DATE */}
        <p className="text-gray-500 mb-6">
          {new Date(news.created_at).toLocaleDateString("tr-TR")}
        </p>

        {/* IMAGE */}
        <img src={news.cover_image} className="w-full rounded-xl mb-6" />

        {/* CONTENT */}
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: news.content }}
        />
      </div>

      {/* RIGHT */}
      <div className="space-y-6">
        {/* 🔥 TAKIM BLOĞU (VARSA) */}
        {news.team_name && (
          <div className="bg-[#1F1F2E] rounded-2xl p-4">
            <h3 className="font-bold mb-3">Takım</h3>
            <Link
              href={`/futbol/team/${news.team_id}`}
              className="text-yellow-400"
            >
              {news.team_name}
            </Link>
          </div>
        )}

        {/* 🔥 SON HABERLER */}
        <div className="bg-[#1F1F2E] rounded-2xl p-4">
          <h3 className="font-bold mb-3">Son Eklenenler</h3>

          <div className="space-y-4">
            {latest.map((item) => (
              <Link
                key={item.id}
                href={`/${item.league_slug}/${item.team_slug}/${item.slug}`}
                className="flex gap-3 items-center"
              >
                <img
                  src={item.cover_image}
                  className="w-16 h-16 object-cover rounded-lg"
                />

                <span className="text-sm font-medium line-clamp-2">
                  {item.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

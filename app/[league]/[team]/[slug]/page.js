"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function NewsDetailPage() {
  const { slug, league, team } = useParams();
  const API = process.env.NEXT_PUBLIC_API_URL;

  const [allPosts, setAllPosts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(1);
  const [latest, setLatest] = useState([]);

  const loaderRef = useRef(null);

  /* 🔥 TÜM HABERLERİ ÇEK */
  useEffect(() => {
    if (!API) return;

    fetch(`${API}/api/posts/list?team=${team || "genel"}`)
      .then((r) => r.json())
      .then((d) => {
        let data = d?.data || [];

        // 🔥 TIKLANAN HABERİ EN ÜSTE AL
        data = data.sort((a, b) => {
          if (a.slug === slug) return -1;
          if (b.slug === slug) return 1;
          return 0;
        });

        setAllPosts(data);
      });

    fetch(`${API}/api/posts`)
      .then((r) => r.json())
      .then((d) => setLatest((d?.data || []).slice(0, 5)));
  }, [slug, team, API]);

  /* 🔥 SCROLL → 1 ARTIR */
  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((prev) => {
            if (prev >= allPosts.length) return prev;
            return prev + 1;
          });
        }
      },
      { threshold: 1 },
    );

    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [allPosts]);

  /* 🔥 URL SYNC */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const index = Number(entry.target.dataset.index);
          const post = allPosts[index];

          if (!post) return;

          window.history.replaceState(
            null,
            "",
            `/${league || "futbol"}/${team || "genel"}/${post.slug}`,
          );
        });
      },
      { threshold: 0.6 },
    );

    const elements = document.querySelectorAll(".news-item");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [visibleCount, allPosts, league, team]);

  if (!allPosts.length) return <div className="p-10">Yükleniyor...</div>;

  const visiblePosts = allPosts.slice(0, visibleCount);

  return (
    <div className="max-w-[1400px] mx-auto px-4 mt-10 grid lg:grid-cols-[1fr_320px] gap-10 text-white">
      {/* LEFT */}
      <div>
        {visiblePosts.map((news, i) => (
          <div key={news.id} data-index={i} className="news-item mb-20">
            <h1 className="text-4xl font-bold mb-4">{news.title}</h1>

            <p className="text-gray-500 mb-6">
              {new Date(news.created_at).toLocaleDateString("tr-TR")}
            </p>

            <img src={news.cover_image} className="w-full rounded-xl mb-6" />

            <div dangerouslySetInnerHTML={{ __html: news.content }} />
          </div>
        ))}

        {/* 🔥 SCROLL TRIGGER */}
        {visibleCount < allPosts.length && (
          <div ref={loaderRef} className="h-10" />
        )}

        {visibleCount >= allPosts.length && (
          <div className="text-center text-gray-500 py-8">
            Tüm haberler gösterildi
          </div>
        )}
      </div>

      {/* RIGHT */}
      <div className="space-y-6">
        <div className="bg-[#1F1F2E] rounded-2xl p-4">
          <h3 className="font-bold mb-3">Son Eklenenler</h3>

          {latest.map((item) => (
            <Link
              key={item.id}
              href={`/${item.league_slug}/${item.team}/${item.slug}`}
              className="flex gap-3 items-center"
            >
              <img
                src={item.cover_image}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <span className="text-sm">{item.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

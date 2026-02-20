"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function NewsDetailPage() {
  const { id } = useParams();
  const API = process.env.NEXT_PUBLIC_API_URL;

  const [news, setNews] = useState(null);
  const [latest, setLatest] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/posts/${id}`)
      .then((r) => r.json())
      .then((d) => setNews(d.data));

    fetch(`${API}/api/posts`)
      .then((r) => r.json())
      .then((d) => setLatest(d.data.slice(0, 5)));
  }, [id]);

  if (!news) return <div className="p-10">Yükleniyor...</div>;

  return (
    <div className="max-w-[1400px] mx-auto px-4 mt-10 grid lg:grid-cols-[1fr_320px] gap-10 text-white">
      {/* LEFT */}
      <div>
        <div className="text-sm text-gray-500 mb-4">
          <Link href="/">Ana Sayfa</Link> › Haber ›{" "}
          <span className="text-black font-semibold">{news.title}</span>
        </div>

        <h1 className="text-4xl font-bold mb-4">{news.title}</h1>

        <p className="text-gray-500 mb-6">
          {new Date(news.created_at).toLocaleDateString("tr-TR")}
        </p>

        <img src={news.cover_image} className="w-full rounded-xl mb-6" />

        {/* CONTENT */}
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: news.content }}
        />
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="space-y-6">
        {/* KATEGORİLER */}
        <div className="bg-[#1F1F2E] rounded-2xl shadow p-4">
          <h3 className="font-bold mb-3">Kategoriler</h3>

          <div className="flex flex-col gap-2">
            <span className="bg-green-500 text-white px-3 py-2 rounded-xl">
              Diyet
            </span>
            <span className="bg-red-500 text-white px-3 py-2 rounded-xl">
              Beslenme
            </span>
            <span className="bg-blue-500 text-white px-3 py-2 rounded-xl">
              Sağlıklı Yaşam
            </span>
          </div>
        </div>

        {/* SON HABERLER */}
        <div className="bg-[#1F1F2E] rounded-2xl shadow p-4">
          <h3 className="font-bold mb-3">Son Eklenenler</h3>

          <div className="space-y-4">
            {latest.map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.id}`}
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

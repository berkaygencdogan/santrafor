// app/admin/posts/page.js
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetch(`${API}/api/posts`)
      .then((r) => r.json())
      .then((d) => setNews(d.data));
  }, []);

  const deleteNews = async (id) => {
    if (!confirm("Silinsin mi?")) return;

    const token = localStorage.getItem("token");

    const res = await fetch(`${API}/api/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Silinemedi");
      return;
    }

    setNews(news.filter((n) => n.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Haberler</h1>
        <Link
          href="/admin/news/create"
          className="bg-orange-500 px-4 py-2 rounded"
        >
          + Haber Ekle
        </Link>
      </div>

      <div className="space-y-3">
        {news.map((n) => (
          <div
            key={n.id}
            className="flex justify-between bg-[#1e293b] p-3 rounded"
          >
            <span>{n.title}</span>

            <div className="flex gap-2">
              <Link href={`/admin/news/${n.id}`} className="text-yellow-400">
                Düzenle
              </Link>

              <button onClick={() => deleteNews(n.id)} className="text-red-400">
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

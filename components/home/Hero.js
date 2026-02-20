"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Hero({ sliders = [], featured = [] }) {
  const router = useRouter();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!sliders.length) return;
    const t = setInterval(() => {
      setActive((p) => (p + 1) % sliders.length);
    }, 6000);
    return () => clearInterval(t);
  }, [sliders.length]);

  if (!sliders.length) return null;
  const current = sliders[active];

  return (
    <section className="bg-[#0b1220]">
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-6">
          {/* 🔥 SOL BÜYÜK */}
          <div
            onClick={() => router.push(`/news/${current.slug}`)}
            className="relative rounded-2xl overflow-hidden cursor-pointer group"
          >
            <img
              src={current.image}
              className="w-full h-[520px] object-cover group-hover:scale-105 transition"
              alt={current.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <span className="absolute left-6 bottom-24 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded">
              FUTBOL
            </span>

            <h2 className="absolute left-6 bottom-8 right-6 text-white font-extrabold text-4xl leading-tight">
              {current.title}
            </h2>

            {/* dots */}
            <div className="absolute left-6 bottom-2 flex gap-3">
              {sliders.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation(); // 🔥 click çakışmasını engeller
                    setActive(i);
                  }}
                  className={`h-2 w-2 rounded-full transition ${
                    i === active ? "bg-red-500 scale-125" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* 🔥 SAĞ */}
          <div className="rounded-2xl bg-[#0f172a] p-5">
            {/* ÜST FEATURED */}
            {featured[0] && (
              <div
                onClick={() => router.push(`/news/${featured[0].slug}`)}
                className="relative rounded-xl overflow-hidden cursor-pointer group"
              >
                <img
                  src={featured[0].image}
                  className="w-full h-[240px] object-cover group-hover:scale-105 transition"
                  alt={featured[0].title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="absolute left-3 bottom-12 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                  ÖNE ÇIKAN
                </span>
                <h3 className="absolute left-3 right-3 bottom-3 text-white font-bold">
                  {featured[0].title}
                </h3>
              </div>
            )}

            {/* ALT 3 */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {featured.slice(1, 10).map((p) => (
                <div
                  key={p.id}
                  onClick={() => router.push(`/news/${p.slug}`)}
                  className="relative rounded-lg overflow-hidden cursor-pointer group"
                >
                  <img
                    src={p.image}
                    className="w-full h-[110px] object-cover group-hover:scale-105 transition"
                    alt={p.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <p className="absolute left-2 right-2 bottom-2 text-[11px] text-white font-semibold leading-snug">
                    {p.title}
                  </p>
                </div>
              ))}
            </div>

            {/* REKLAM */}
            <div className="mt-5 grid grid-cols-1 gap-4">
              <div className="h-[90px] rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                REKLAM ALANI
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

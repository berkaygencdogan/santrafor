"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SportHero({ posts = [] }) {
  const [active, setActive] = useState(0);
  const router = useRouter();

  // 🔥 AUTO SLIDE
  useEffect(() => {
    if (!posts.length) return;

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % posts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [posts]);

  if (!posts.length) return null;

  const main = posts[active];

  // sağ taraf (aktif hariç ilk 3)
  const sidePosts = posts.filter((_, i) => i !== active).slice(0, 4);

  return (
    <section className="max-w-[1400px] mx-auto px-4 mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        {/* 🔥 SOL - BÜYÜK */}
        <div
          onClick={() =>
            router.push(`/${main.league_slug}/${main.team_slug}/${main.slug}`)
          }
          className="relative h-[420px] rounded-2xl overflow-hidden cursor-pointer group"
        >
          <img
            src={main.image}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />

          {/* overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

          {/* içerik */}
          <div className="absolute bottom-0 p-6">
            <h2 className="text-2xl font-bold text-white">{main.title}</h2>
          </div>

          {/* 🔥 SARI PROGRESS */}
          <div className="absolute bottom-0 left-0 h-[3px] bg-yellow-400 animate-progress w-full" />
        </div>

        {/* 🔥 SAĞ - KÜÇÜKLER */}
        <div className="flex flex-col gap-4 justify-between">
          {sidePosts.map((p) => (
            <div
              key={p.id}
              onClick={() => {
                const newIndex = posts.findIndex((x) => x.id === p.id);
                setActive(newIndex);
                router.push(`/${p.league_slug}/${p.team_slug}/${p.slug}`);
              }}
              className="flex gap-3 cursor-pointer group"
            >
              <img
                src={p.image}
                className="w-28 h-20 object-cover rounded-lg"
              />

              <div>
                <p className="text-sm text-gray-300 line-clamp-2 group-hover:text-yellow-400 transition">
                  {p.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

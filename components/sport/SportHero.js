"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";

export default function SportHero({ posts = [] }) {
  const [active, setActive] = useState(0);
  const router = useRouter();

  /* 🔥 AUTO SLIDE */
  useEffect(() => {
    if (!posts.length) return;

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % posts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [posts]);

  if (!posts.length) return null;

  const main = posts[active];

  /* 🔥 RANDOM SIDE POSTS */
  const sidePosts = useMemo(() => {
    const shuffled = [...posts]
      .filter((_, i) => i !== active)
      .sort(() => Math.random() - 0.5);

    return shuffled.slice(0, 4);
  }, [posts, active]);

  /* 🔥 URL BUILDER */
  const go = (p) => {
    const league = p.league_slug || "futbol";
    const team = p.team || "genel";

    router.push(`/${league}/${team}/${p.slug}`);
  };

  return (
    <section className="max-w-[1400px] mx-auto px-4 mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        {/* 🔥 SOL - BÜYÜK */}
        <div
          onClick={() => go(main)}
          className="relative h-[420px] rounded-2xl overflow-hidden cursor-pointer group"
        >
          <img
            src={main.cover_image}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            alt={main.title}
          />

          {/* overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

          {/* içerik */}
          <div className="absolute bottom-0 p-6">
            <h2 className="text-2xl font-bold text-white">{main.title}</h2>
          </div>

          {/* 🔥 PROGRESS BAR (RESET FIX) */}
          <div
            key={active}
            className="absolute bottom-0 left-0 h-[3px] bg-yellow-400 animate-progress w-full"
          />

          {/* 🔥 DOTS */}
          <div className="absolute bottom-4 left-6 flex gap-2">
            {posts.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setActive(i);
                }}
                className={`w-2 h-2 rounded-full transition ${
                  i === active ? "bg-yellow-400 scale-125" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* 🔥 SAĞ - KÜÇÜKLER (RANDOM) */}
        <div className="flex flex-col gap-4 justify-between">
          {sidePosts.map((p) => (
            <div
              key={p.id}
              onClick={() => {
                const newIndex = posts.findIndex((x) => x.id === p.id);
                setActive(newIndex);
                go(p);
              }}
              className="flex gap-3 cursor-pointer group"
            >
              <img
                src={p.cover_image}
                className="w-28 h-20 object-cover rounded-lg"
                alt={p.title}
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

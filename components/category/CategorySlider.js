"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CategorySlider({ posts = [] }) {
  const router = useRouter();

  // 🔥 sadece 10 post
  const limitedPosts = posts.slice(0, 10);

  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState("right");

  const current = limitedPosts[active];

  // 🔥 AUTO SLIDE
  useEffect(() => {
    if (!limitedPosts.length) return;

    const t = setInterval(() => {
      next();
    }, 5000);

    return () => clearInterval(t);
  }, [active, limitedPosts.length]);

  const next = () => {
    setDirection("right");
    setActive((prev) => (prev + 1) % limitedPosts.length);
  };

  const prev = () => {
    setDirection("left");
    setActive((prev) => (prev - 1 + limitedPosts.length) % limitedPosts.length);
  };

  if (!limitedPosts.length) return null;

  return (
    <div className="w-full">
      {/* 🔥 MAIN SLIDER */}
      <div
        className="relative rounded-2xl overflow-hidden h-[450px] cursor-pointer"
        onClick={() => router.push(current.slug)}
      >
        <div
          key={active}
          className={`absolute inset-0 transition-all duration-500 ease-in-out
          ${direction === "right" ? "animate-slideRight" : "animate-slideLeft"}
        `}
        >
          <img src={current.image} className="w-full h-full object-cover" />

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          <h2 className="absolute bottom-10 left-6 right-6 text-4xl font-extrabold text-white">
            {current.title}
          </h2>
        </div>

        {/* 🔥 ARROWS */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          className="absolute left-0 top-1/2 -translate-y-1/2 text-white text-3xl z-10 h-full w-16 flex items-center justify-center bg-black/20 hover:bg-black/40"
        >
          ‹
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          className="absolute right-0 top-1/2 -translate-y-1/2 text-white text-3xl z-10 h-full w-16 flex items-center justify-center bg-black/20 hover:bg-black/40"
        >
          ›
        </button>
      </div>

      {/* 🔥 THUMBNAILS */}
      <div className="mt-3 ml-4 mb-3 overflow-hidden">
        <div className="flex gap-2">
          {limitedPosts.map((item, i) => (
            <div
              key={item.id}
              onClick={(e) => {
                e.stopPropagation();
                setDirection(i > active ? "right" : "left");
                setActive(i);
              }}
              onMouseEnter={() => {
                setDirection(i > active ? "right" : "left");
                setActive(i);
              }}
              className={`relative cursor-pointer border-2 transition overflow-hidden ${
                i === active
                  ? "border-red-500 scale-105"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={item.image}
                className="w-[90px] h-[60px] object-cover"
              />

              {/* 🔥 aktif thumb progress bar */}
              {i === active && (
                <div className="absolute left-0 bottom-0 w-full h-[3px] bg-white/20">
                  <div
                    key={active}
                    className="h-full bg-yellow-400 animate-progress-5s"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

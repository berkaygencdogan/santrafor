"use client";

import { useEffect, useState } from "react";

export default function CategorySlider({ posts = [] }) {
  const [active, setActive] = useState(0);
  const [start, setStart] = useState(0);
  const [direction, setDirection] = useState("right");

  const visible = posts.slice(start, start + 10);
  const current = posts[active];

  // 🔥 AUTO SLIDE
  useEffect(() => {
    if (!posts.length) return;

    const t = setInterval(() => {
      next();
    }, 5000);

    return () => clearInterval(t);
  }, [active, posts.length]);

  const next = () => {
    setDirection("right");

    const newActive = (active + 1) % posts.length;
    setActive(newActive);

    // strip kaydır
    if (newActive >= start + 10) {
      setStart((prev) => prev + 1);
    }

    // başa dönünce reset
    if (newActive === 0) {
      setStart(0);
    }
  };

  const prev = () => {
    setDirection("left");

    const newActive = (active - 1 + posts.length) % posts.length;
    setActive(newActive);

    if (newActive < start) {
      setStart((prev) => Math.max(prev - 1, 0));
    }

    // en sona gidince strip sona gelsin
    if (newActive === posts.length - 1) {
      setStart(Math.max(posts.length - 10, 0));
    }
  };

  if (!posts.length) return null;

  return (
    <div className="w-full">
      {/* SLIDER */}
      <div className="relative rounded-2xl overflow-hidden h-[450px]">
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

        {/* ARROWS */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl z-10"
        >
          ‹
        </button>

        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl z-10"
        >
          ›
        </button>
      </div>

      {/* THUMBNAILS */}
      <div className="mt-3 ml-4 mb-3 overflow-hidden">
        <div className="flex gap-2">
          {visible.map((item, i) => {
            const realIndex = start + i;

            return (
              <div
                key={item.id}
                onClick={() => {
                  setDirection(realIndex > active ? "right" : "left");
                  setActive(realIndex);
                }}
                onMouseEnter={() => {
                  setDirection(realIndex > active ? "right" : "left");
                  setActive(realIndex);
                }}
                className={`cursor-pointer border-2 transition ${
                  realIndex === active
                    ? "border-red-500 scale-105"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={item.image}
                  className="w-[90px] h-[60px] object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

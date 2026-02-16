"use client";

import { useState } from "react";

export default function Hero({ sliders = [], featured = [] }) {
  const [active, setActive] = useState(0);

  const current = sliders[active];

  if (!sliders.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 mt-6 grid md:grid-cols-3 gap-4">
      {/* SOL BÜYÜK SLIDER */}
      <div className="md:col-span-2 relative">
        <div className="relative h-[350px] md:h-[420px] overflow-hidden rounded-xl">
          <img src={current.image_url} className="w-full h-full object-cover" />

          {/* overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

          {/* text */}
          <div className="absolute bottom-0 p-5 text-white">
            <h2 className="text-xl md:text-2xl font-bold">{current.title}</h2>
          </div>
        </div>

        {/* DOTS */}
        <div className="flex gap-2 mt-2 justify-center">
          {sliders.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-3 h-3 rounded-full ${
                i === active ? "bg-red-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* SAĞ KARTLAR */}
      <div className="flex flex-col gap-4">
        {featured.slice(0, 2).map((post) => (
          <div
            key={post.id}
            className="relative h-[165px] rounded-xl overflow-hidden"
          >
            <img
              src={post.cover_image}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/50" />

            <div className="absolute bottom-0 p-3 text-white">
              <h3 className="text-sm font-semibold leading-tight">
                {post.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

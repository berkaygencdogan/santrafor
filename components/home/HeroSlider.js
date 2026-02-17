"use client";

import { useState } from "react";

export default function HeroSlider({ sliders }) {
  const [active, setActive] = useState(0);

  const current = sliders[active];

  return (
    <div>
      <div className="relative h-[350px] md:h-[420px] overflow-hidden rounded-xl">
        <img
          src={current.image_url}
          alt={current.title}
          className="w-full h-full object-cover"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

        {/* badge */}
        <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-3 py-1 rounded">
          SON DAKİKA
        </span>

        {/* text */}
        <div className="absolute bottom-0 p-5 text-white">
          <h1 className="text-xl md:text-2xl font-bold leading-snug">
            {current.title}
          </h1>
        </div>
      </div>

      {/* DOTS */}
      <div className="flex gap-2 mt-3 justify-center">
        {sliders.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-3 h-3 rounded-full transition ${
              i === active ? "bg-red-600 scale-110" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

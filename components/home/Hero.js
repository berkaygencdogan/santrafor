"use client";

import { useState } from "react";

export default function Hero({ sliders = [], featured = [] }) {
  const [active, setActive] = useState(0);

  const current = sliders[active];
  if (!sliders.length) return null;

  return (
    <section className="w-full mt-4">
      {/* FULL WIDTH WRAPPER */}
      <div className="w-full bg-[#0f172a] py-6">
        {/* CONTENT CENTER */}
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-3 gap-6">
          {/* SOL SLIDER */}
          <div className="lg:col-span-2">
            <div className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden">
              <img src={current.image} className="w-full h-full object-cover" />

              {/* overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* TEXT */}
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <span className="bg-yellow-400 text-black px-3 py-1 text-xs font-bold rounded">
                  DIŞ HABER
                </span>

                <h2 className="text-4xl md:text-5xl font-extrabold mt-4 leading-tight">
                  {current.title}
                </h2>
              </div>

              {/* PAGINATION */}
              <div className="absolute bottom-6 left-8 flex gap-4 text-white text-sm">
                {sliders.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`${
                      i === active ? "text-red-500 font-bold" : "text-white/60"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* SAĞ */}
          <div className="flex flex-col gap-4">
            {/* ÜST */}
            {featured[0] && (
              <div className="relative h-[260px] rounded-xl overflow-hidden">
                <img
                  src={featured[0].image}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/50" />

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="bg-red-600 px-2 py-1 text-xs font-bold">
                    ÖNE ÇIKAN
                  </span>

                  <h3 className="text-base font-bold mt-2 leading-tight">
                    {featured[0].title}
                  </h3>
                </div>
              </div>
            )}

            {/* ALT GRID */}
            <div className="grid grid-cols-3 gap-3">
              {featured.slice(1, 4).map((item) => (
                <div
                  key={item.id}
                  className="relative h-[110px] rounded-lg overflow-hidden"
                >
                  <img
                    src={item.image}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-black/40" />

                  <div className="absolute bottom-1 left-1 right-1 text-white text-xs font-semibold leading-tight">
                    {item.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

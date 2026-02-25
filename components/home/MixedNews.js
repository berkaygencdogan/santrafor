"use client";

import { useRouter } from "next/navigation";

export default function MixedNews({ posts = [] }) {
  const router = useRouter();

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {posts.map((item) => (
        <div
          key={item.id}
          onClick={() =>
            router.push(
              `/${item.league_slug || "futbol"}/${item.team || "genel"}/${item.slug}`,
            )
          }
          className="relative rounded-xl overflow-hidden group cursor-pointer"
        >
          <img
            src={item.image}
            className="w-full h-[220px] object-cover group-hover:scale-105 transition duration-300"
            alt={item.title}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

          <span className="absolute bottom-16 left-3 text-xs bg-black/70 text-white px-2 py-1 rounded">
            {item.category}
          </span>

          <h3 className="absolute bottom-3 left-3 right-3 text-white font-semibold text-sm">
            {item.title}
          </h3>
        </div>
      ))}
    </section>
  );
}

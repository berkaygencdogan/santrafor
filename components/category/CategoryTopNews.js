"use client";

import NewsCard from "@/components/home/NewsCard";
import { useRouter } from "next/navigation";

export default function CategoryTopNews({ posts }) {
  const router = useRouter();
  const main = posts[0];
  const small = posts.slice(1, 5); // sadece 4 tane

  return (
    <div className="max-w-[1400px] mx-auto px-4 mt-10 grid lg:grid-cols-2 gap-6">
      {/* SOL - BÜYÜK */}
      <div
        className="group cursor-pointer"
        onClick={() =>
          router.push(`/${main.league_slug}/${main.team_slug}/${main.slug}`)
        }
      >
        <div className="relative overflow-hidden rounded-xl h-[92%]">
          <img
            src={main?.image || ""}
            alt={main?.title || ""}
            className="w-full h-full object-cover group-hover:scale-105 transition"
          />
        </div>

        <h2 className="mt-3 text-lg font-bold leading-snug">{main?.title}</h2>
      </div>

      {/* SAĞ - 4 KÜÇÜK */}
      <div className="grid grid-cols-2 gap-6">
        {small.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

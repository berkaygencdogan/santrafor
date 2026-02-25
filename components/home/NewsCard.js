"use client";

import { useRouter } from "next/navigation";

function getExcerpt(content, wordCount = 10) {
  if (!content) return "";

  const text = content
    .replace(/<[^>]*>/g, "") // html temizle
    .replace(/\s+/g, " ")
    .trim();

  const words = text.split(" ").slice(0, wordCount).join(" ");

  return words + "...";
}

export default function NewsCard({ item }) {
  const router = useRouter();
  return (
    <div
      onClick={() =>
        router.push(
          `/${item.category?.toLowerCase() || item.league_slug || item.sport || "futbol"}/${item.team || "genel"}/${item.slug}`,
        )
      }
      className="cursor-pointer rounded-xl overflow-hidden group"
    >
      <img
        src={item.image}
        className="w-full h-[220px] object-cover group-hover:scale-105 transition"
        alt={item.title}
      />

      <div className="p-3">
        <p className="text-xs text-gray-400">{item.category}</p>

        <h3 className="font-bold">{item.title}</h3>

        <p className="text-sm text-gray-400 mt-2 leading-snug">
          {getExcerpt(item.content, 10)}
        </p>
      </div>
    </div>
  );
}

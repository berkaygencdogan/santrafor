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

  const goPost = () => {
    router.push(
      `/${item.league_slug || item.sport || "futbol"}/${item.team || "genel"}/${item.slug}`,
    );
  };

  return (
    <div
      onClick={goPost}
      className="cursor-pointer rounded-xl overflow-hidden group bg-[#0f172a] max-h-[350px]"
    >
      <img
        src={item.cover_image || item.image}
        className="w-full h-[220px] object-cover group-hover:scale-105 transition"
        alt={item.title}
      />

      <div className="p-3">
        <p className="text-xs text-gray-400">{item.sport?.toUpperCase()}</p>

        <h3 className="font-bold text-white mt-1">{item.title}</h3>
      </div>
    </div>
  );
}

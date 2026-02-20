"use client";

import { useRouter } from "next/navigation";

export default function NewsCard({ item }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/news/${item.slug}`)}
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
      </div>
    </div>
  );
}

"use client";
import { useRouter } from "next/navigation";

export default function SideMiniCards({ posts = [] }) {
  const router = useRouter();

  return (
    <aside className="space-y-3 sticky top-4">
      <div className=" grid grid-cols-1 gap-4">
        {/* REKLAM / WIDGET ALANI */}
        <div className="h-[120px] rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
          REKLAM ALANI
        </div>
      </div>
      {posts.map((item) => (
        <div
          key={item.id}
          onClick={() =>
            router.push(
              `/${item.category.toLowerCase() || item.league_slug || "futbol"}/${item.team || "genel"}/${item.slug}`,
            )
          }
          className="flex gap-2 p-2 border rounded-lg cursor-pointer hover:shadow"
        >
          <img src={item.image} className="w-20 h-16 object-cover rounded" />

          <div>
            <p className="text-xs font-semibold">{item.title}</p>
            <p className="text-[11px] text-gray-500">{item.time}</p>
          </div>
        </div>
      ))}
    </aside>
  );
}

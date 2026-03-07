"use client";
import { useRouter } from "next/navigation";

export default function SideMiniCards({ posts = [] }) {
  const router = useRouter();

  const goPost = (item) => {
    router.push(
      `/${item.league_slug || item.sport || "futbol"}/${item.team_slug || "genel"}/${item.slug}`,
    );
  };

  return (
    <aside className="space-y-3 sticky top-4">
      <div className="grid grid-cols-1 gap-4">
        {/* REKLAM */}
        <div className="h-[120px] rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
          REKLAM ALANI
        </div>
      </div>

      {posts.map((item) => (
        <div
          key={item.id}
          onClick={() => goPost(item)}
          className="flex gap-2 p-2 border rounded-lg cursor-pointer hover:shadow transition border-1 border-black"
        >
          <img
            src={item.cover_image}
            className="w-20 h-16 object-cover rounded"
            alt={item.title}
          />

          <div className="flex flex-col justify-between">
            <p className="text-xs font-semibold leading-snug text-black">
              {item.title}
            </p>

            {item.created_at && (
              <p className="text-[11px] text-gray-500">
                {new Date(item.created_at).toLocaleTimeString("tr-TR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            )}
          </div>
        </div>
      ))}
    </aside>
  );
}

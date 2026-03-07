"use client";

import { useRouter } from "next/navigation";

export default function LastNews({ posts = [] }) {
  const router = useRouter();

  const goPost = (item) => {
    router.push(
      `/${item.league_slug || item.sport || "futbol"}/${item.team_slug || "genel"}/${item.slug}`,
    );
  };

  const last10 = posts.slice(0, 10);

  return (
    <aside className="bg-white rounded-xl shadow overflow-hidden sticky top-4">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white font-bold px-4 py-3 text-lg">
        SON HABERLER
      </div>

      {/* NEWS LIST */}
      <div>
        {last10.map((item) => (
          <div
            key={item.id}
            onClick={() => goPost(item)}
            className="flex items-center gap-3 px-4 py-2 border-b cursor-pointer hover:bg-gray-50 transition"
          >
            {/* TIME */}
            <span className="text-orange-600 font-bold w-[40px] text-sm flex-shrink-0">
              {item.created_at &&
                new Date(item.created_at).toLocaleTimeString("tr-TR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
            </span>

            {/* TITLE */}
            <p className="text-sm leading-tight line-clamp-1 text-black hover:text-yellow-400">
              {item.title}
            </p>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="flex items-center justify-between p-3">
        <button
          onClick={() => router.push("/haberler")}
          className="w-full cursor-pointer border border-red-500 text-red-600 px-4 py-1 rounded-md text-sm hover:bg-red-50"
        >
          TÜMÜ
        </button>
      </div>
    </aside>
  );
}

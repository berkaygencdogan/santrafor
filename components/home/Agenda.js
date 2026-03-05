"use client";

import { useRouter } from "next/navigation";

export default function Agenda({ posts = [], title }) {
  const router = useRouter();

  if (!posts?.length) return null;

  const goPost = (p) => {
    router.push(
      `/${p.league_slug || p.sport || "futbol"}/${p.team_slug || "genel"}/${p.slug}`,
    );
  };

  return (
    <section className="w-full bg-[#0f172a] text-white py-10 mt-10">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-1 h-5 bg-red-500 rounded" />
          <h2 className="font-extrabold tracking-wide">{title}</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* BÜYÜK HABER */}
          <div
            onClick={() => goPost(posts[0])}
            className="lg:col-span-2 relative rounded-2xl overflow-hidden cursor-pointer group"
          >
            <img
              src={posts[0].cover_image}
              className="w-full h-[420px] object-cover group-hover:scale-105 transition"
              alt={posts[0].title}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

            <h3 className="absolute bottom-4 left-4 right-4 font-extrabold text-2xl">
              {posts[0].title}
            </h3>
          </div>

          {/* SAĞ KÜÇÜKLER */}
          <div className="space-y-4">
            {posts.slice(1, 5).map((item) => (
              <div
                key={item.id}
                onClick={() => goPost(item)}
                className="relative rounded-xl overflow-hidden cursor-pointer group"
              >
                <img
                  src={item.cover_image}
                  className="w-full h-[120px] object-cover group-hover:scale-105 transition"
                  alt={item.title}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                <p className="absolute bottom-2 left-2 right-2 text-sm font-semibold">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

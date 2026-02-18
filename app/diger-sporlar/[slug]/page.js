import { sportsData } from "@/lib/sportsData";
import NewsCard from "@/components/home/NewsCard";

export default async function Page({ params }) {
  const { slug } = await params;

  const item = sportsData.diger.leagues.find((i) => i.slug === slug);

  if (!item) {
    return <div className="text-white p-10">Sayfa bulunamadı</div>;
  }

  // 🔥 15 HABER ÜRET
  const posts = Array.from({ length: 15 }).map((_, i) => ({
    id: `${slug}-${i}`,
    title: `${item.name} haber ${i + 1}`,
    image: `https://picsum.photos/400/300?random=${slug}${i}`,
    date: `${10 + i} Şubat 2026`,
  }));

  return (
    <div className="bg-[#0B1220] min-h-screen text-white">
      <div className="max-w-[1400px] mx-auto px-4 py-10">
        {/* 🔥 BAŞLIK */}
        <h1 className="text-3xl font-bold mb-8">{item.name}</h1>

        {/* 🔥 HABERLER (5'Lİ GRID) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {posts.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

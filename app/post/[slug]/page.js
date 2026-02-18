import StandingsTable from "@/components/ui/StandingsTable";
import Link from "next/link";
import { sportsData } from "@/lib/sportsData";

// 🔥 MOCK DATA
const posts = [
  {
    slug: "besiktas-gsaray-derbi",
    title: "Beşiktaş-G.Saray derbisinin tarihi belli oldu!",
    content:
      "Derbi tarihi açıklandı. TFF tarafından yapılan açıklamaya göre...",
    image: "https://picsum.photos/1200/600",
    category: "Galatasaray",
    author: "Ender Bilgin",
    date: "17 Şubat 2026",
  },
  {
    slug: "fenerbahce-transfer",
    title: "Fenerbahçe transferde hız kesmiyor",
    content: "Fenerbahçe yeni transfer hamlesiyle dikkat çekiyor...",
    image: "https://picsum.photos/1200/601",
    category: "Fenerbahçe",
    author: "Hakkı Yalçın",
    date: "16 Şubat 2026",
  },
];

export default async function PostDetail({ params }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return <div className="text-white p-10">Haber bulunamadı</div>;
  }

  return (
    <div className="bg-[#0B1220] min-h-screen text-white">
      {/* HEADER */}
      <div className="max-w-[1200px] mx-auto px-4 py-6 text-sm text-gray-400">
        <Link href="/">Anasayfa</Link> /{" "}
        <Link href={`/${post.category.toLowerCase()}/futbol`}>
          {post.category}
        </Link>{" "}
        / <span className="text-white">{post.title}</span>
      </div>

      {/* CONTENT */}
      <div className="max-w-[1200px] mx-auto flex gap-6 px-4">
        {/* 🟥 ANA İÇERİK */}
        <div className="flex-1">
          {/* görsel */}
          <img
            src={post.image}
            className="w-full h-[500px] object-cover rounded-xl"
          />

          {/* başlık */}
          <h1 className="text-3xl font-bold mt-6">{post.title}</h1>

          {/* meta */}
          <div className="text-sm text-gray-400 mt-2 flex gap-4">
            <span>{post.date}</span>
            <span>✍ {post.author}</span>
          </div>

          {/* içerik */}
          <div className="mt-6 text-gray-300 leading-7">
            {post.content}
            <p className="mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptate, minima.
            </p>
          </div>
        </div>

        {/* 🟩 SIDEBAR */}
        <div className="w-[320px] hidden lg:block space-y-6">
          <div className="bg-[#111827] p-4 rounded-xl">
            <StandingsTable
              standings={sportsData.futbol.leagues[0].standings}
              title="Süper Lig"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

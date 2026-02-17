import Link from "next/link";

// 🔥 MOCK DATA
const posts = [
  {
    id: 1,
    title: "Beşiktaş-G.Saray derbisinin tarihi belli oldu!",
    slug: "besiktas-gsaray-derbi",
    image: "https://picsum.photos/800/500",
    category: "Galatasaray",
    date: "17 Şubat 2026",
  },
  {
    id: 2,
    title: "Fenerbahçe transferde hız kesmiyor",
    slug: "fenerbahce-transfer",
    image: "https://picsum.photos/800/501",
    category: "Fenerbahçe",
    date: "16 Şubat 2026",
  },
];

export default function PostsPage() {
  return (
    <div className="bg-[#0B1220] min-h-screen text-white">
      {/* HEADER */}
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Tüm Haberler</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Link key={post.id} href={`/post/${post.slug}`}>
              <div className="group bg-[#111827] rounded-xl overflow-hidden cursor-pointer">
                <img
                  src={post.image}
                  className="w-full h-[250px] object-cover group-hover:scale-105 transition"
                />

                <div className="p-4">
                  <span className="text-xs text-green-400">
                    {post.category}
                  </span>

                  <h2 className="text-lg font-bold mt-2">{post.title}</h2>

                  <p className="text-sm text-gray-400 mt-1">{post.date}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

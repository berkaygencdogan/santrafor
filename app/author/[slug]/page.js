import Link from "next/link";

export default function AuthorDetail() {
  const author = {
    name: "Ender Bilgin",
    email: "ender@example.com",
    image: "https://picsum.photos/300/200",
  };

  const posts = [
    {
      id: 1,
      title: "Juventus ile akıl oyunu",
      slug: "juventus-akil-oyunu",
      date: "17 Şubat 2026",
      excerpt: "Juventus için Torino derbisi önemlidir...",
    },
    {
      id: 2,
      title: "Trabzon'da zirve mücadelesi",
      slug: "trabzon-zirve",
      date: "13 Şubat 2026",
      excerpt: "Trabzonspor - Fenerbahçe...",
    },
  ];

  return (
    <main className="max-w-[1400px] mx-auto px-4 mt-6 grid lg:grid-cols-[1fr_320px] gap-6">
      {/* SOL */}
      <div>
        {/* AUTHOR HEADER */}
        <div className="bg-gradient-to-r from-blue-900 to-gray-900 text-white p-6 rounded-lg flex gap-6 items-center">
          <img
            src={author.image}
            className="w-[120px] h-[120px] object-cover rounded"
          />

          <div>
            <h1 className="text-2xl font-bold">{author.name}</h1>
            <p className="text-sm text-gray-300">{author.email}</p>
          </div>
        </div>

        {/* SEARCH */}
        <div className="flex gap-3 mt-6">
          <input
            placeholder="Yazı Ara"
            className="flex-1 border px-4 py-2 rounded"
          />
          <button className="bg-red-600 text-white px-4">🔍</button>
        </div>

        {/* POSTS */}
        <div className="mt-6 space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="border-b pb-4">
              <Link href={`/posts/${post.slug}`}>
                <h2 className="text-lg font-bold hover:text-red-600">
                  {post.title}
                </h2>
              </Link>

              <p className="text-sm text-gray-500 mt-1">{post.date}</p>

              <p className="text-gray-700 mt-2">{post.excerpt}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SAĞ SIDEBAR */}
      <aside className="space-y-4">
        <div className="bg-gray-900 text-white p-4 rounded">
          <h3 className="font-bold mb-2">CANLI SKOR</h3>
          <p>GS 2 - 1 FB</p>
        </div>
      </aside>
    </main>
  );
}

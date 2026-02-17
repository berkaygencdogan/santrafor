import Link from "next/link";

// 🔥 GEÇİCİ MOCK DATA (sonra API bağlayacağız)
const mockCategories = [
  {
    slug: "galatasaray",
    name: "Galatasaray",
    description: "Galatasaray ile ilgili son haberler",
    posts: [
      {
        id: 1,
        title: "Beşiktaş-G.Saray derbisinin tarihi belli oldu!",
        slug: "besiktas-gsaray-derbi",
        image: "https://picsum.photos/800/500",
        date: "17 Şubat 2026",
      },
      {
        id: 2,
        title: "Galatasaray transfer bombası patlatıyor",
        slug: "galatasaray-transfer",
        image: "https://picsum.photos/800/501",
        date: "16 Şubat 2026",
      },
    ],
  },
  {
    slug: "fenerbahce",
    name: "Fenerbahçe",
    description: "Fenerbahçe haberleri",
    posts: [],
  },
];

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  const category = mockCategories.find((c) => c.slug === slug);

  if (!category) {
    return (
      <div className="text-center py-20 text-white">Kategori bulunamadı</div>
    );
  }

  return (
    <div className="bg-[#0B1220] min-h-screen text-white">
      {/* 🔥 HEADER */}
      <div className="bg-gradient-to-r from-black to-gray-900 p-8">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">{category.name}</h1>
            <p className="text-gray-400 mt-2">{category.description}</p>

            {/* Breadcrumb */}
            <div className="text-sm text-gray-500 mt-4">
              <Link href="/">Anasayfa</Link> /{" "}
              <span className="text-white">{category.name}</span>
            </div>
          </div>

          {/* Sağ info alanı */}
          <div className="hidden md:block text-right text-sm text-gray-400">
            <p>Son Güncelleme</p>
            <p className="text-white">17.02.2026 - 12:10</p>
          </div>
        </div>
      </div>

      {/* 🔥 CONTENT */}
      <div className="max-w-[1400px] mx-auto flex gap-6 mt-6 px-4">
        {/* 🟥 SOL - HABERLER */}
        <div className="flex-1 space-y-6">
          {category.posts.map((post) => (
            <Link
              key={post.id}
              href={`/posts/${post.slug}`}
              className="block group"
            >
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-[300px] object-cover group-hover:scale-105 transition"
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-black/50" />

                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-xl font-bold">{post.title}</h2>
                  <p className="text-sm text-gray-300 mt-1">{post.date}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 🟩 SAĞ SIDEBAR */}
        <div className="w-[320px] hidden lg:block space-y-6">
          {/* maç widget */}
          <div className="bg-[#111827] p-4 rounded-xl">
            <h3 className="text-green-400 font-bold mb-4">
              HANGİ MAÇ HANGİ KANALDA?
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>14:30</span>
                <span>Hatay - Iğdır</span>
              </div>
              <div className="flex justify-between">
                <span>17:00</span>
                <span>Ümraniye - Boluspor</span>
              </div>
              <div className="flex justify-between">
                <span>20:00</span>
                <span>İstanbulspor - Esenler</span>
              </div>
            </div>
          </div>

          {/* puan durumu */}
          <div className="bg-[#111827] p-4 rounded-xl">
            <h3 className="text-green-400 font-bold mb-4">PUAN DURUMU</h3>

            <div className="space-y-2 text-sm">
              <div>1. Galatasaray</div>
              <div>2. Fenerbahçe</div>
              <div>3. Trabzonspor</div>
              <div>4. Beşiktaş</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

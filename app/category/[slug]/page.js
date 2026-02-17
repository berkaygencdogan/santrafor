import CategorySlider from "@/components/category/CategorySlider";
import TeamSquad from "@/components/category/TeamSquad";
import Link from "next/link";

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
      <div className="bg-gradient-to-r from-black to-[#111827] py-10">
        <div className="max-w-[1400px] mx-auto px-4 flex flex-col lg:flex-row gap-8">
          {/* SOL */}
          <div className="flex items-center gap-6 mr-25">
            {/* LOGO */}
            <img
              src="https://images.seeklogo.com/logo-png/61/2/galatasaray-5-stars-logo-png_seeklogo-618553.png"
              className="object-contain"
              alt="logo"
            />

            {/* TEXT */}
            <div>
              <h1 className="text-4xl font-bold">{category.name}</h1>
              <p className="text-gray-400 mt-1">
                Galatasaray Süper Lig'de{" "}
                <span className="text-yellow-400 font-semibold">1. Sırada</span>
              </p>

              {/* FORM */}
              <div className="mt-4">
                <p className="text-sm text-gray-400 mb-2">
                  Galatasaray'ın Son 6 Maç Performansı
                </p>

                <div className="flex gap-1">
                  {["G", "G", "G", "G", "B", "G"].map((item, i) => (
                    <span
                      key={i}
                      className={`w-7 h-7 flex items-center justify-center text-xs font-bold rounded
                ${
                  item === "G"
                    ? "bg-green-500"
                    : item === "B"
                      ? "bg-yellow-400 text-black"
                      : "bg-red-500"
                }`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* BREADCRUMB */}
              <div className="text-sm text-gray-500 mt-4">
                <Link href="/">Haberler</Link> /{" "}
                <span className="text-white">{category.name}</span>
              </div>
            </div>
          </div>

          {/* SAĞ */}
          <div className="flex flex-col justify-center text-sm text-gray-300 max-w-[420px]">
            <div className="space-y-1">
              <p>
                Galatasaray'ın Stadyumu:{" "}
                <span className="text-yellow-400 font-semibold">
                  Rams Stadyumu
                </span>
              </p>

              <p>
                Galatasaray Başkanı:{" "}
                <span className="text-yellow-400 font-semibold">
                  Dursun Özbek
                </span>
              </p>

              <p>
                Galatasaray Teknik Direktörü:{" "}
                <span className="text-yellow-400 font-semibold">
                  Buruk, Okan
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 🔥 CONTENT */}

      <div className="max-w-[1400px] mx-auto flex gap-6 mt-6 px-4">
        <CategorySlider posts={category.posts} />
        {/* 🟩 SAĞ SIDEBAR */}
        <div className="w-[600px] hidden lg:block">
          <TeamSquad />
        </div>
      </div>
    </div>
  );
}

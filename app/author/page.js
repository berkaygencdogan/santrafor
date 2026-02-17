import Link from "next/link";

export default function AuthorsPage() {
  const authors = [
    {
      id: 1,
      name: "Hakkı Yalçın",
      slug: "hakki-yalcin",
      image: "https://picsum.photos/200/200",
      latest: "Sorgulama!",
      date: "17 Şubat 2026",
    },
    {
      id: 2,
      name: "Ender Bilgin",
      slug: "ender-bilgin",
      image: "https://picsum.photos/201/200",
      latest: "Juventus ile akıl oyunu",
      date: "17 Şubat 2026",
    },
  ];

  return (
    <main className="max-w-[1400px] mx-auto px-4 mt-6 grid lg:grid-cols-[1fr_320px] gap-6">
      {/* SOL */}
      <div>
        {/* HEADER */}
        <div className="flex gap-4 border-b pb-3 mb-4">
          <button className="bg-blue-900 text-white px-4 py-2 font-semibold">
            GÜNÜN YAZARLARI
          </button>
          <button className="bg-red-600 text-white px-4 py-2 font-semibold">
            TÜM YAZARLAR
          </button>
        </div>

        {/* SEARCH */}
        <div className="flex gap-3 mb-6">
          <input
            placeholder="Yazar Ara"
            className="flex-1 border px-4 py-2 rounded"
          />
          <button className="bg-red-600 text-white px-4">🔍</button>
        </div>

        {/* AUTHORS */}
        <div className="space-y-6">
          {authors.map((a) => (
            <div
              key={a.id}
              className="flex gap-4 border rounded-lg overflow-hidden"
            >
              <img src={a.image} className="w-[200px] h-[140px] object-cover" />

              <div className="flex-1 p-4">
                <h3 className="text-lg font-bold">{a.name}</h3>

                <Link href={`/authors/${a.slug}`}>
                  <p className="text-red-600 text-xl font-semibold mt-2 hover:underline">
                    {a.latest}
                  </p>
                </Link>

                <p className="text-gray-500 text-sm mt-2">{a.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SAĞ SIDEBAR */}
      <aside className="space-y-4">
        <div className="bg-gray-900 text-white p-4 rounded">
          <h3 className="font-bold mb-2">PUAN DURUMU</h3>
          <p>Galatasaray 55p</p>
          <p>Fenerbahçe 52p</p>
        </div>
      </aside>
    </main>
  );
}

import Link from "next/link";

export default function CategoryListPage() {
  const categories = [
    { name: "Galatasaray", slug: "galatasaray" },
    { name: "Fenerbahçe", slug: "fenerbahce" },
    { name: "Beşiktaş", slug: "besiktas" },
    { name: "Trabzonspor", slug: "trabzonspor" },
    { name: "Basketbol", slug: "basketbol" },
  ];

  return (
    <main className="max-w-[1400px] mx-auto px-4 mt-6">
      <h1 className="text-2xl font-bold mb-6">Kategoriler</h1>

      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="bg-gray-900 text-white p-6 rounded-xl hover:bg-red-600 transition"
          >
            <h2 className="text-lg font-bold">{cat.name}</h2>
          </Link>
        ))}
      </div>
    </main>
  );
}

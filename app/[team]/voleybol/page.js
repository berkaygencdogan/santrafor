import CategoryGrid from "@/components/category/CategoryGrid";

const generatePosts = (prefix, count = 20) =>
  Array.from({ length: count }).map((_, i) => ({
    id: i + 1,
    title: `Voleybol haber ${i + 1}`,
    slug: `${prefix}-haber-${i + 1}`,
    image: `https://picsum.photos/800/50${i % 10}?${prefix}${i}`,
    date: `${10 + i} Şubat 2026`,
  }));

const mockCategories = [
  {
    slug: "galatasaray",
    name: "Galatasaray",
    posts: generatePosts("galatasaray"),
  },
];

export default function Page({ params }) {
  const { team } = params;

  const category = mockCategories.find((c) => c.slug === team);

  if (!category) return <div className="text-white p-10">Takım yok</div>;

  return (
    <div className="bg-[#0B1220] min-h-screen text-white">
      <div className="max-w-[1400px] mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">{category.name} Voleybol</h1>

        <CategoryGrid posts={category.posts} />
      </div>
    </div>
  );
}

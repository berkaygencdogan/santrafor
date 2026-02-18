import { sportsData } from "@/lib/sportsData";
import CategoryGrid from "@/components/category/CategoryGrid";

export default function Page({ params }) {
  const { slug } = params;

  const item = sportsData.voleybol.find((i) => i.slug === slug);

  if (!item) {
    return <div className="text-white p-10">Sayfa bulunamadı</div>;
  }

  return (
    <div className="bg-[#0B1220] min-h-screen text-white">
      <div className="max-w-[1400px] mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">{item.name}</h1>

        <CategoryGrid posts={[]} />
      </div>
    </div>
  );
}

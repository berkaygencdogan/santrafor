import CategoryGrid from "@/components/category/CategoryGrid";
import CategorySlider from "@/components/category/CategorySlider";
import CategoryTopNews from "@/components/category/CategoryTopNews";
import MatchStats from "@/components/category/MatchStats";
import PlayerStats from "@/components/category/PlayerStats";
import TeamSquad from "@/components/category/TeamSquad";
import SportSwitch from "@/components/sport/SportSwitch";
import Link from "next/link";

/* MOCK */
const sports = ["futbol", "basketbol", "voleybol"];

const generatePosts = (prefix, count = 20) =>
  Array.from({ length: count }).map((_, i) => ({
    id: i + 1,
    title: `Futbol haber ${i + 1}`,
    slug: `${prefix}-haber-${i + 1}`,
    image: `https://picsum.photos/800/50${i % 10}?${prefix}${i}`,
    date: `${10 + i} Şubat 2026`,
    sport: sports[i % sports.length],
  }));

const mockCategories = [
  {
    slug: "galatasaray",
    name: "Galatasaray",
    posts: generatePosts("galatasaray"),
  },
  {
    slug: "fenerbahce",
    name: "Fenerbahçe",
    posts: generatePosts("fenerbahce"),
  },
];

export default async function Page({ params }) {
  const { team } = params;

  const category = mockCategories.find((c) => c.slug === team);

  if (!category) return <div className="text-white p-10">Takım yok</div>;

  const posts = category.posts.filter((p) => p.sport === "futbol");

  return (
    <div className="bg-[#0B1220] min-h-screen text-white">
      <div className="max-w-[1400px] mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">{category.name} Futbol</h1>

        <SportSwitch team={team} currentSport="futbol" />

        <CategorySlider posts={posts} />
        <MatchStats />
        <CategoryTopNews posts={posts} />
        <PlayerStats />
        <CategoryGrid posts={posts} />
      </div>
    </div>
  );
}

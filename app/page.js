import CategoryBlock from "@/components/home/CategoryBlock";
import Hero from "@/components/home/Hero";
import LastNews from "@/components/home/LastNews";
import MixedNews from "@/components/home/MixedNews";
import SideMiniCards from "@/components/home/SideMiniCards";

async function getHome() {
  const API = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${API}/api/home`, {
    cache: "no-store",
  });

  const json = await res.json();

  return json.data; // 🔥 burada düzelttik
}

function mergeSports(data) {
  if (!data) return { sliders: [], featured: [], mixed: [], sideNews: [] };

  const sports = Object.values(data);

  const sliders = sports
    .flatMap((s) => s.sliders || [])
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .filter((v, i, arr) => arr.findIndex((x) => x.id === v.id) === i)
    .slice(0, 10);

  const featured = sports
    .flatMap((s) => s.featured || [])
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .filter((v, i, arr) => arr.findIndex((x) => x.id === v.id) === i)
    .slice(0, 4);

  const mixed = sports
    .flatMap((s) => s.mixed || [])
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .filter((v, i, arr) => arr.findIndex((x) => x.id === v.id) === i)
    .slice(0, 6);

  const sideNews = sports
    .flatMap((s) => s.sideNews || [])
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .filter((v, i, arr) => arr.findIndex((x) => x.id === v.id) === i)
    .slice(0, 5);

  return { sliders, featured, mixed, sideNews };
}

export default async function Home() {
  const data = await getHome();
  const { sliders, featured, sideNews, mixed } = mergeSports(data);
  return (
    <main className="w-full">
      <Hero sliders={sliders} featured={featured} />

      <section className="max-w-[1400px] mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
          <MixedNews posts={mixed} />
          <LastNews posts={sliders} />
        </div>
      </section>

      <CategoryBlock cat={data.futbol} title="FUTBOL GÜNDEM" />
      <CategoryBlock cat={data.basketbol} title="BASKETBOL GÜNDEM" />
      <CategoryBlock cat={data.voleybol} title="VOLEYBOL GÜNDEM" />
    </main>
  );
}

import CategoryGrid from "@/components/category/CategoryGrid";
import Hero from "@/components/home/Hero";
import SportSwitch from "@/components/sport/SportSwitch";

/* ================= POSTS ================= */

async function getPosts(team) {
  const API = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(
    `${API}/api/posts/team/${team}?sport=voleybol&limit=40`,
    { cache: "no-store" },
  );

  if (!res.ok) return [];

  const data = await res.json();
  return data.data || [];
}

/* ================= TEAM INFO ================= */

async function getTeamInfo(trName) {
  const API = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${API}/api/sport/team/${trName}/squad`, {
      cache: "no-store",
    });

    const text = await res.text();
    const data = JSON.parse(text);

    return data.team || null;
  } catch (err) {
    console.log("TEAM INFO ERROR:", err);
    return null;
  }
}

/* ================= MAP ================= */

const mapPosts = (arr) =>
  arr.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    image: p.cover_image,
    date: p.created_at,
    team: p.team,
    sport: p.sport,
  }));

/* ================= PAGE ================= */

export default async function Page({ params }) {
  const { team } = await params;

  const trName =
    team === "galatasaray"
      ? "Galatasaray"
      : team === "fenerbahce"
        ? "Fenerbahçe"
        : team === "besiktas"
          ? "Beşiktaş"
          : team === "trabzonspor"
            ? "Trabzonspor"
            : null;

  if (!trName) {
    return <div className="text-white p-10">Takım yok</div>;
  }

  // 🔥 PARALLEL FETCH (önemli performans)
  const [rawPosts, teamInfo] = await Promise.all([
    getPosts(team),
    getTeamInfo(trName),
  ]);

  const posts = mapPosts(rawPosts);
  const sliderPosts = posts.slice(0, 5); // ilk 5
  const featuredPosts = posts.slice(5, 9); // sonraki 4

  return (
    <div className="bg-[#0B1220] min-h-screen text-white">
      <div className="bg-gradient-to-r from-black via-[#0f172a] to-[#111827] py-10 border-b border-white/10">
        <div className="max-w-[1400px] justify-between mx-auto px-4 flex flex-col lg:flex-row gap-8 items-center">
          <div className="flex items-center gap-6 ">
            <img
              src={teamInfo?.image_path}
              className=" object-contain"
              alt="logo"
            />
          </div>
          <div className="font-bold text-7xl">{teamInfo?.name}</div>
          <div className="text-sm text-gray-500 mt-4 flex gap-4">
            <SportSwitch
              team={teamInfo ? teamInfo.name.toLowerCase() : team}
              currentSport="voleybol"
              teamInfo={teamInfo}
            />
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">{trName} Voleybol</h1>
        <Hero sliders={sliderPosts} featured={featuredPosts} />

        <CategoryGrid posts={posts} />
      </div>
    </div>
  );
}

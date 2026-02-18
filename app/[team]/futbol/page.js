import CategoryGrid from "@/components/category/CategoryGrid";
import CategorySlider from "@/components/category/CategorySlider";
import CategoryTopNews from "@/components/category/CategoryTopNews";
import MatchStats from "@/components/category/MatchStats";
import PlayerStats from "@/components/category/PlayerStats";
import TeamSquad from "@/components/category/TeamSquad";
import SportSwitch from "@/components/sport/SportSwitch";
import Link from "next/link";

/* ---------------- MOCK ---------------- */

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
  {
    slug: "besiktas",
    name: "Beşiktaş",
    posts: generatePosts("besiktas"),
  },
  {
    slug: "trabzonspor",
    name: "Trabzonspor",
    posts: generatePosts("trabzonspor"),
  },
];

/* ---------------- LOGO ---------------- */

const teamLogos = {
  galatasaray:
    "https://images.seeklogo.com/logo-png/61/2/galatasaray-5-stars-logo-png_seeklogo-618553.png",
  fenerbahce:
    "https://upload.wikimedia.org/wikipedia/tr/thumb/8/86/Fenerbah%C3%A7e_SK.png/250px-Fenerbah%C3%A7e_SK.png",
};

/* ---------------- PAGE ---------------- */

export default async function Page({ params }) {
  const { team } = await params;

  const category = mockCategories.find((c) => c.slug === team);

  if (!category) return <div className="text-white p-10">Takım yok</div>;

  const posts = category.posts.filter((p) => p.sport === "futbol");

  return (
    <div className="bg-[#0B1220] min-h-screen text-white">
      {/* 🔥 HEADER (GERİ GELDİ) */}
      <div className="bg-gradient-to-r from-black via-[#0f172a] to-[#111827] py-10 border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 flex flex-col lg:flex-row gap-8 items-center">
          {/* LOGO + INFO */}
          <div className="flex items-center gap-6">
            <img
              src={teamLogos[team]}
              className="w-24 h-24 object-contain"
              alt="logo"
            />

            <div>
              <h1 className="text-4xl font-extrabold tracking-wide">
                {category.name}
              </h1>

              <p className="text-gray-400 mt-1">
                {category.name} Futbol Haberleri
              </p>

              {/* 🔥 FORM (SON 6 MAÇ) */}
              <div className="mt-4">
                <p className="text-sm text-gray-400 mb-2">
                  Son 6 Maç Performansı
                </p>

                <div className="flex gap-1">
                  {["G", "G", "B", "G", "M", "G"].map((item, i) => (
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
                <span className="text-white">{category.name}</span> / futbol
              </div>
            </div>
          </div>

          {/* SAĞ BİLGİ */}
          <div className="flex flex-col justify-center text-sm text-gray-300 max-w-[420px]">
            <p>
              Stadyum: <span className="text-yellow-400">Ali Sami Yen</span>
            </p>
            <p>
              Başkan: <span className="text-yellow-400">Dursun Özbek</span>
            </p>
            <p>
              Teknik Direktör:{" "}
              <span className="text-yellow-400">Okan Buruk</span>
            </p>
          </div>

          {/* SPORT SWITCH */}
          <SportSwitch team={team} currentSport="futbol" />
        </div>
      </div>

      {/* 🔥 CONTENT */}
      <div className="max-w-[1400px] mx-auto flex gap-6 mt-6 px-4">
        <CategorySlider posts={posts} />

        <div className="w-[600px] hidden lg:block">
          <TeamSquad />
        </div>
      </div>

      <MatchStats />

      <CategoryTopNews posts={posts} />

      <PlayerStats />

      <CategoryGrid posts={posts} />
    </div>
  );
}

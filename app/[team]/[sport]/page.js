import CategoryGrid from "@/components/category/CategoryGrid";
import CategorySlider from "@/components/category/CategorySlider";
import CategoryTopNews from "@/components/category/CategoryTopNews";
import MatchStats from "@/components/category/MatchStats";
import PlayerStats from "@/components/category/PlayerStats";
import TeamSquad from "@/components/category/TeamSquad";
import SportSwitch from "@/components/sport/SportSwitch";
import Link from "next/link";

/* ---------------- MOCK ---------------- */

const titles = [
  "Transfer bombası patladı!",
  "Derbi öncesi flaş gelişme",
  "Yıldız oyuncudan açıklama",
  "Teknik direktörden kritik karar",
  "Son dakika: kadro belli oldu",
];

const sports = ["futbol", "basketbol", "voleybol"];

const generatePosts = (prefix, count = 20) =>
  Array.from({ length: count }).map((_, i) => ({
    id: i + 1,
    title: titles[i % titles.length],
    slug: `${prefix}-haber-${i + 1}`,
    image: `https://picsum.photos/800/50${i % 10}?${prefix}${i}`,
    date: `${10 + i} Şubat 2026`,
    sport: sports[i % sports.length], // 🔥 önemli
  }));

const mockCategories = [
  {
    slug: "galatasaray",
    name: "Galatasaray",
    posts: generatePosts("galatasaray", 24),
  },
  {
    slug: "fenerbahce",
    name: "Fenerbahçe",
    posts: generatePosts("fenerbahce", 24),
  },
  {
    slug: "besiktas",
    name: "Beşiktaş",
    posts: generatePosts("besiktas", 24),
  },
  {
    slug: "trabzonspor",
    name: "Trabzonspor",
    posts: generatePosts("trabzonspor", 24),
  },
];

/* ---------------- LOGO ---------------- */

const teamLogos = {
  galatasaray:
    "https://images.seeklogo.com/logo-png/61/2/galatasaray-5-stars-logo-png_seeklogo-618553.png",
  fenerbahce:
    "https://upload.wikimedia.org/wikipedia/tr/thumb/8/86/Fenerbah%C3%A7e_SK.png/250px-Fenerbah%C3%A7e_SK.png",
  besiktas:
    "https://upload.wikimedia.org/wikipedia/tr/thumb/0/0d/Besiktas_JK.png/240px-Besiktas_JK.png",
  trabzonspor:
    "https://upload.wikimedia.org/wikipedia/tr/thumb/6/6b/Trabzonspor_logo.png/240px-Trabzonspor_logo.png",
};

/* ---------------- PAGE ---------------- */

export default async function SportPage({ params }) {
  const { team, sport } = await params;

  console.log("TEAM:", team);
  console.log("SPORT:", sport);

  const validSports = ["futbol", "basketbol", "voleybol"];

  if (!validSports.includes(sport)) {
    return <div className="text-white p-10">Spor bulunamadı</div>;
  }

  const category = mockCategories.find((c) => c.slug === team);

  if (!category) {
    return <div className="text-white p-10">Takım bulunamadı</div>;
  }

  // 🔥 SPORT FILTER
  const filteredPosts = category.posts.filter((p) => p.sport === sport);

  return (
    <div className="bg-[#0B1220] min-h-screen text-white">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-black to-[#111827] py-10">
        <div className="max-w-[1400px] mx-auto px-4 flex flex-col lg:flex-row gap-8">
          <div className="flex items-center gap-6">
            <img
              src={teamLogos[team]}
              className="object-contain w-24"
              alt="logo"
            />

            <div>
              <h1 className="text-4xl font-bold">{category.name}</h1>

              <p className="text-gray-400 mt-1">
                {category.name} {sport} kategorisi
              </p>

              {/* FORM */}
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
                <span className="text-white">{category.name}</span> / {sport}
              </div>
            </div>
          </div>

          {/* SAĞ */}
          <div className="flex flex-col justify-center text-sm text-gray-300 max-w-[420px]">
            <p>
              Stadyum: <span className="text-yellow-400">Ana Stadyum</span>
            </p>
            <p>
              Başkan: <span className="text-yellow-400">Yönetim</span>
            </p>
            <p>
              Teknik Direktör:{" "}
              <span className="text-yellow-400">Teknik Ekip</span>
            </p>
          </div>
          <SportSwitch team={team} currentSport={sport} />
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-[1400px] mx-auto flex gap-6 mt-6 px-4">
        <CategorySlider posts={filteredPosts} />
        <div className="w-[600px] hidden lg:block">
          <TeamSquad />
        </div>
      </div>

      <MatchStats />

      <CategoryTopNews posts={filteredPosts} />

      <PlayerStats />

      <CategoryGrid posts={filteredPosts} />
    </div>
  );
}

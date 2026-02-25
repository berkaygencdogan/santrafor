import CategoryGrid from "@/components/category/CategoryGrid";
import CategorySlider from "@/components/category/CategorySlider";
import CategoryTopNews from "@/components/category/CategoryTopNews";
import MatchStats from "@/components/category/MatchStats";
import PlayerStats from "@/components/category/PlayerStats";
import TeamSquad from "@/components/category/TeamSquad";
import SportSwitch from "@/components/sport/SportSwitch";
import Link from "next/link";

async function getTeamPosts(team) {
  const API = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${API}/api/posts/team/${team}`, {
    cache: "no-store",
  });

  if (!res.ok) return [];

  const data = await res.json();
  return data.data || [];
}

async function getTeamForm(teamId) {
  if (!teamId) return [];

  const API = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${API}/api/sport/team/${teamId}/matches`, {
      cache: "no-store",
    });

    const data = await res.json();
    return data?.data?.form || [];
  } catch (err) {
    console.log("FORM ERROR:", err);
    return [];
  }
}

const mapPosts = (arr) =>
  arr.map((p) => ({
    id: p.id,
    title: p.title,
    content: p.content,
    image: p.cover_image,
    slug: p.slug,
    sport: p.sport,
    team: p.team,
  }));

const normalize = (str) =>
  str
    ?.toLowerCase()
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .replace(/\s+/g, "");

export default async function Page({ params }) {
  const { team } = await params;
  let form = [];
  const trTeam =
    team === "galatasaray"
      ? "Galatasaray"
      : team === "fenerbahce"
        ? "Fenerbahçe"
        : team === "besiktas"
          ? "Beşiktaş"
          : team === "trabzonspor"
            ? "Trabzonspor"
            : null;
  let squad = [];
  let teamInfo = null;
  let standings = [];
  let slug = null;
  let name = null;
  let posts = [];
  let futbol = [];
  let basket = [];
  let voley = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/sport/team/${trTeam}/squad`,
      { cache: "no-store" },
    );

    const text = await res.text(); // 🔥 önce text al

    const data = JSON.parse(text); // sonra parse et
    squad = data.data || [];
    teamInfo = data.team || null;
    slug = teamInfo ? normalize(teamInfo.name) : null;
    name = teamInfo ? teamInfo.name : null;
    form = await getTeamForm(teamInfo?.id);
    const rawPosts = await getTeamPosts(team);
    posts = mapPosts(rawPosts);
    futbol = posts.filter((p) => p.sport === "futbol");
    basket = posts.filter((p) => p.sport === "basketbol");
    voley = posts.filter((p) => p.sport === "voleybol");
  } catch (error) {
    console.log("FETCH ERROR:", error);
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/sport/standings/600`,
      { cache: "no-store" },
    );

    const data = await res.json();
    standings = data.data || [];
  } catch (error) {
    console.log("STANDINGS ERROR:", error);
  }

  return (
    <div className="bg-[#0B1220] min-h-screen text-white">
      {/* 🔥 HEADER (GERİ GELDİ) */}
      <div className=" bg-gradient-to-r from-black via-[#0f172a] to-[#111827] py-10 border-b border-white/10">
        <div className="max-w-[1400px] justify-between mx-auto px-4 flex flex-col lg:flex-row gap-8 items-center">
          {/* LOGO + INFO */}
          <div className="flex items-center gap-6">
            <img
              src={teamInfo?.image_path}
              className="w-24 h-24 object-contain"
              alt="logo"
            />

            <div>
              <h1 className="text-4xl font-extrabold tracking-wide">
                {teamInfo?.name}
              </h1>

              <p className="text-gray-400 mt-1">
                {teamInfo?.name} Futbol Haberleri
              </p>

              {/* 🔥 FORM (SON 6 MAÇ) */}
              <div className="mt-4">
                <p className="text-sm text-gray-400 mb-2">
                  Son 6 Maç Performansı
                </p>

                <div className="flex gap-1">
                  {[...form].reverse().map((item, i) => (
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
                <Link href="/">Haberler</Link> /
                <span className="text-white">{teamInfo?.name}</span> / futbol
              </div>
            </div>
            <div className="text-sm text-gray-500 mt-4 flex gap-4">
              <SportSwitch team={teamInfo?.name} currentSport="futbol" />
            </div>
          </div>
          <div className="bg-[#0f172a] rounded-2xl p-4 text-white w-full max-w-[420px]">
            <h2 className="text-xl font-bold mb-4">Süper Lig Puan Durumu</h2>

            {/* 🔥 SCROLL */}
            <div className="max-h-[250px] overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-gray-700">
              {standings.map((t) => {
                const isActive = normalize(t.name) === team;

                return (
                  <div
                    key={t.id}
                    className={`flex items-center justify-between rounded-xl px-3 py-2 transition
          ${
            isActive
              ? "bg-orange-500/20 border border-orange-500"
              : "bg-[#1e293b] hover:bg-white/5"
          }`}
                  >
                    {/* SOL */}
                    <div className="flex items-center gap-3">
                      <span className="w-6 text-sm text-gray-400">
                        {t.position}
                      </span>

                      {/* 🔥 LOGO BÜYÜTÜLDÜ */}
                      <img
                        src={t.logo}
                        alt={t.name}
                        className="w-8 h-8 object-contain"
                      />

                      <span
                        className={`font-medium ${
                          isActive ? "text-orange-400 font-bold" : ""
                        }`}
                      >
                        {t.name}
                      </span>
                    </div>

                    {/* SAĞ */}
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-lg">{t.points}</span>

                      {/* FORM */}
                      <span
                        className={`text-xs ${
                          t.form === "up"
                            ? "text-green-400"
                            : t.form === "down"
                              ? "text-red-400"
                              : "text-gray-400"
                        }`}
                      >
                        {t.form === "up" ? "▲" : t.form === "down" ? "▼" : "—"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 🔥 CONTENT */}
      <div className="max-w-[1400px] mx-auto flex gap-6 mt-6 px-4">
        <CategorySlider posts={futbol} />

        <div className="w-[600px] hidden lg:block">
          <TeamSquad squad={squad} teamName={teamInfo?.name} />
        </div>
      </div>

      <MatchStats teamId={teamInfo?.id} teamName={teamInfo?.name} />
      <CategoryTopNews posts={futbol} />
      <PlayerStats squad={squad} teamName={teamInfo?.name} />
      <CategoryGrid posts={futbol} />
    </div>
  );
}

import CategoryGrid from "@/components/category/CategoryGrid";
import CategorySlider from "@/components/category/CategorySlider";
import CategoryTopNews from "@/components/category/CategoryTopNews";
import MatchStats from "@/components/category/MatchStats";
import PlayerStats from "@/components/category/PlayerStats";
import TeamSquad from "@/components/category/TeamSquad";
import MediaSection from "@/components/home/MediaSection";
import SportSwitch from "@/components/sport/SportSwitch";
import Link from "next/link";

const normalize = (str) =>
  str
    ?.toLowerCase()
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .replace(/[^a-z0-9]/g, "");

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

// ✅ 4 büyükler için seasons listesi
async function getTeamSeasons(teamId) {
  if (!teamId) return [];
  const API = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${API}/api/old/team/${teamId}/seasons`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data?.data || [];
  } catch (err) {
    console.log("TEAM SEASONS ERROR:", err);
    return [];
  }
}

const mapPosts = (arr) =>
  (arr || []).map((p) => ({
    id: p.id,
    title: p.title,
    content: p.content,
    image: p.cover_image,
    slug: p.slug,
    sport: p.sport,
    team: p.team,
    type: p.type,
  }));

export default async function Page({ params }) {
  const { league, team, sport } = await params;
  const API = process.env.NEXT_PUBLIC_API_URL;

  const BIG_FOUR = ["galatasaray", "fenerbahce", "besiktas", "trabzonspor"];
  const isBigFour = (teamName) => BIG_FOUR.includes(normalize(teamName));

  // ✅ burada sabit current sezon tutuyoruz (istersen env’den de alırız)
  const currentSeason = "2025-2026";

  let form = [];
  let squad = [];
  let teamInfo = null;
  let standings = [];
  let posts = [];
  let futbol = [];
  let basket = [];
  let voley = [];
  let seasons = [];

  // 0) leagueId bul
  let leagueId = null;
  try {
    const res = await fetch(`${API}/api/sport/leagues`, { cache: "no-store" });
    const data = await res.json();
    const leagues = data?.data || [];

    const foundLeague = leagues.find((l) => normalize(l.name) === league);
    leagueId = foundLeague?.id ?? (league === "superlig" ? 600 : null);
  } catch (e) {
    console.log("LEAGUE RESOLVE ERROR:", e);
  }

  if (!leagueId) {
    return (
      <div className="bg-[#0B1220] min-h-screen text-white p-10">
        Lig bulunamadı: <b>{league}</b>
      </div>
    );
  }

  // 1) standings
  try {
    const res = await fetch(`${API}/api/sport/standings/${leagueId}`, {
      cache: "no-store",
    });
    const data = await res.json();
    standings = data.data || [];
  } catch (error) {
    console.log("STANDINGS ERROR:", error);
  }

  const foundTeam = standings.find((t) => normalize(t.name) === team);

  if (!foundTeam) {
    return (
      <div className="bg-[#0B1220] min-h-screen text-white p-10">
        Takım bulunamadı: <b>{team}</b>
      </div>
    );
  }

  // 2) squad + teaminfo
  try {
    const trTeam = foundTeam.name;

    const res = await fetch(
      `${API}/api/sport/league/${leagueId}/team/${encodeURIComponent(trTeam)}/squad`,
      { cache: "no-store" },
    );

    const data = await res.json();

    squad = data?.data || [];
    teamInfo = data?.team || {
      id: foundTeam.id,
      name: foundTeam.name,
      image_path: foundTeam.logo,
    };

    // 3) form
    form = await getTeamForm(teamInfo?.id || foundTeam.id);

    // 4) posts
    const rawPosts = await getTeamPosts(team);
    posts = mapPosts(rawPosts);

    futbol = posts.filter((p) => p.sport === "futbol");
    basket = posts.filter((p) => p.sport === "basketbol");
    voley = posts.filter((p) => p.sport === "voleybol");

    // ✅ 5) seasons (sadece 4 büyükler)
    if (isBigFour(teamInfo?.name || foundTeam.name)) {
      seasons = await getTeamSeasons(teamInfo?.id || foundTeam.id);
    }
  } catch (error) {
    console.log("FETCH ERROR:", error);
  }

  // aktif sport listesi
  const activeSport = sport || "futbol";
  const sportPosts =
    activeSport === "basketbol"
      ? basket
      : activeSport === "voleybol"
        ? voley
        : futbol;

  // ✅ video+gallery: istersen sportPosts üzerinden yap
  const videos = sportPosts.filter((p) => p.type === "video");
  const gallery = sportPosts.filter((p) => p.type === "gallery");

  return (
    <div className="bg-[#0B1220] min-h-screen text-white pb-10">
      <div className="bg-gradient-to-r from-black via-[#0f172a] to-[#111827] py-10 border-b border-white/10">
        <div className="max-w-[1400px] justify-between mx-auto px-4 flex flex-col lg:flex-row gap-8 items-center">
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
                {teamInfo?.name} {activeSport} Haberleri
              </p>

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

              <div className="text-sm text-gray-500 mt-4">
                <Link href="/">Haberler</Link> /{" "}
                <span className="text-white">{teamInfo?.name}</span> /{" "}
                {activeSport}
              </div>
            </div>

            <div className="text-sm text-gray-500 mt-4 flex gap-4">
              {isBigFour(teamInfo?.name) && (
                <SportSwitch
                  league={league}
                  team={teamInfo?.name}
                  currentSport={activeSport}
                />
              )}
            </div>
          </div>

          <div className="bg-[#0f172a] rounded-2xl p-4 text-white w-full max-w-[420px]">
            <h2 className="text-xl font-bold mb-4">Puan Durumu</h2>

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
                    <div className="flex items-center gap-3">
                      <span className="w-6 text-sm text-gray-400">
                        {t.position}
                      </span>

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

                    <div className="flex items-center gap-3">
                      <span className="font-bold text-lg">{t.points}</span>
                      <span className="text-xs text-gray-400">—</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto flex gap-6 mt-6 px-4">
        <CategorySlider posts={sportPosts} />

        <div className="w-[600px] hidden lg:block">
          <TeamSquad
            squad={squad}
            teamName={teamInfo?.name}
            league={league}
            teamSlug={team}
            currentSeason={currentSeason}
            seasons={seasons}
          />
        </div>
      </div>

      <MatchStats
        teamId={teamInfo?.id}
        teamName={teamInfo?.name}
        league={league}
      />
      <CategoryTopNews posts={sportPosts} />
      <PlayerStats squad={squad} teamName={teamInfo?.name} />
      <CategoryGrid posts={sportPosts} />
      <MediaSection videos={videos} gallery={gallery} />
    </div>
  );
}

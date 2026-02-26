import SeasonSelect from "@/components/category/SeasonSelect";
import TeamSquad from "@/components/category/TeamSquad";

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

async function getLeagueIdBySlug(API, leagueSlug) {
  try {
    const res = await fetch(`${API}/api/sport/leagues`, { cache: "no-store" });
    const data = await res.json();
    const leagues = data?.data || [];

    const found = leagues.find((l) => normalize(l.name) === leagueSlug);
    return found?.id ?? (leagueSlug === "superlig" ? 600 : null);
  } catch {
    return null;
  }
}

async function getStandings(API, leagueId) {
  try {
    const res = await fetch(`${API}/api/sport/standings/${leagueId}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data?.data || [];
  } catch {
    return [];
  }
}

async function getOldSquad(API, teamId, seasonSlug) {
  const res = await fetch(`${API}/api/old/team/${teamId}/squad/${seasonSlug}`, {
    cache: "no-store",
  });

  if (!res.ok) return { data: [], team: null, seasonId: null, season: null };
  return res.json();
}

async function getTeamSeasons(API, teamId) {
  const res = await fetch(`${API}/api/old/team/${teamId}/seasons`, {
    cache: "no-store",
  });

  if (!res.ok) return [];
  const data = await res.json();
  return data?.data || [];
}

// ✅ TeamSquad'ın istediği shape'e çevir
function mapOldSquadToTeamSquad(squad = []) {
  return (
    (squad || [])
      .map((row) => {
        const player = row.player || {};

        return {
          id: player.id ?? row.player_id ?? row.id,
          number: row.jersey_number ?? "-", // TeamSquad: item.number
          name: player.display_name || player.name || "Unknown", // TeamSquad: item.name
          photo: player.image_path || null, // TeamSquad: item.photo
          position_id: player.position_id ?? row.position_id ?? null, // TeamSquad: item.position_id
        };
      })
      // bazen duplicate gelebiliyor, id'ye göre tekilleştir
      .filter((x) => x.id != null)
      .reduce(
        (acc, cur) => {
          if (!acc.seen.has(cur.id)) {
            acc.seen.add(cur.id);
            acc.list.push(cur);
          }
          return acc;
        },
        { list: [], seen: new Set() },
      ).list
  );
}

export default async function Page({ params }) {
  const { league, team, season } = await params; // season slug: "2024-2025"
  const API = process.env.NEXT_PUBLIC_API_URL;

  const leagueId = await getLeagueIdBySlug(API, league);
  if (!leagueId) {
    return (
      <div className="bg-[#0B1220] min-h-screen text-white p-10">
        Lig bulunamadı: <b>{league}</b>
      </div>
    );
  }

  const standings = await getStandings(API, leagueId);
  const foundTeam = standings.find((t) => normalize(t.name) === team);

  if (!foundTeam) {
    return (
      <div className="bg-[#0B1220] min-h-screen text-white p-10">
        Takım bulunamadı: <b>{team}</b>
      </div>
    );
  }

  const teamId = foundTeam.id;

  // ✅ paralel çek
  const [oldSquadRes, seasons] = await Promise.all([
    getOldSquad(API, teamId, season),
    getTeamSeasons(API, teamId),
  ]);

  // ✅ burada map'ledik
  const squad = mapOldSquadToTeamSquad(oldSquadRes?.data || []);
  const sortedSquad = [...squad].sort((a, b) => {
    const na = isNaN(a.number) ? 999 : Number(a.number);
    const nb = isNaN(b.number) ? 999 : Number(b.number);
    return na - nb;
  });

  const teamInfo = oldSquadRes?.team || {
    id: foundTeam.id,
    name: foundTeam.name,
    image_path: foundTeam.logo,
  };

  return (
    <div className="bg-[#0B1220] min-h-screen text-white">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={teamInfo?.image_path}
            className="w-14 h-14 object-contain"
            alt="logo"
          />
          <div className="flex-1">
            <div className="text-2xl font-extrabold">
              {teamInfo?.name} Kadro
            </div>
            <div className="text-gray-400 text-sm">
              Sezon: {(season || "").replace("-", "/")}
            </div>
          </div>

          {/* ✅ DROPDOWN */}
          <SeasonSelect
            league={league}
            teamSlug={team}
            currentSeason={season}
            seasons={seasons}
          />
        </div>

        <div className="bg-[#f3f3f3] rounded-xl p-6">
          <h2 className="text-2xl font-bold text-black mb-2">
            {teamInfo?.name?.toUpperCase()}
          </h2>

          <p className="text-gray-600 mb-6">Futbol A Takım Kadrosu</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {sortedSquad.map((p, i) => {
              const posMap = {
                24: "Kaleci",
                25: "Defans",
                26: "Orta Saha",
                27: "Forvet",
              };

              return (
                <div
                  key={p.id ?? i}
                  className="flex flex-col items-center text-center"
                >
                  {/* FOTO */}
                  <div className="w-[120px] h-[140px] bg-white border border-gray-300 flex items-center justify-center">
                    <img
                      src={p.photo}
                      alt={p.name}
                      className="max-h-full object-contain"
                    />
                  </div>

                  {/* NUMARA + İSİM */}
                  <div className="mt-2 text-sm text-gray-800 font-medium">
                    {p.number} - {p.name}
                  </div>

                  {/* POZİSYON */}
                  <div className="text-xs text-gray-500">
                    {posMap[p.position_id] || "-"}
                  </div>
                </div>
              );
            })}
          </div>

          {!squad.length && (
            <div className="text-center text-gray-500 mt-10">
              Kadro bulunamadı
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

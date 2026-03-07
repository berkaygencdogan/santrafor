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

export default async function Page({ params }) {
  const { league, team, season } = await params;
  const API = process.env.NEXT_PUBLIC_API_URL;

  let leagueId = null;
  let standings = [];
  let teamInfo = null;
  let matches = [];

  // ✅ 1) leagueSlug → leagueId
  try {
    const res = await fetch(`${API}/api/sport/leagues`, {
      cache: "no-store",
    });
    const data = await res.json();

    const foundLeague = data.data?.find((l) => normalize(l.name) === league);

    leagueId = foundLeague?.id ?? (league === "superlig" ? 600 : null);
  } catch (err) {
    console.log("LEAGUE ERROR:", err);
  }

  if (!leagueId) {
    return <div className="p-10 text-white">Lig bulunamadı</div>;
  }

  // ✅ 2) standings → takım bul
  try {
    const res = await fetch(`${API}/api/sport/standings/${leagueId}`, {
      cache: "no-store",
    });

    const data = await res.json();
    standings = data.data || [];
  } catch (err) {
    console.log("STANDINGS ERROR:", err);
  }

  const foundTeam = standings.find((t) => normalize(t.name) === team);

  if (!foundTeam) {
    return <div className="p-10 text-white">Takım bulunamadı</div>;
  }

  teamInfo = {
    id: foundTeam.id,
    name: foundTeam.name,
    logo: foundTeam.logo,
  };

  // ✅ 3) fixtures çek
  try {
    const [startYear, endYear] = season.split("-");

    const res = await fetch(
      `${API}/api/sport/team/${teamInfo.id}/fixtures?startYear=${startYear}&endYear=${endYear}&leagueId=${leagueId}`,
      { cache: "no-store" },
    );

    const text = await res.text(); // 🔥 JSON değil önce text

    console.log("RAW RESPONSE:", text);

    const data = JSON.parse(text); // sonra parse et
    matches = data.data || [];
  } catch (err) {
    console.log("FIXTURE ERROR:", err);
  }

  return (
    <div className="bg-[#ffffff] min-h-screen text-white">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-black via-[#0f172a] to-[#111827] py-10 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-4 flex items-center gap-6">
          <img src={teamInfo.logo} className="w-20 h-20 object-contain" />

          <div>
            <h1 className="text-3xl font-bold">{teamInfo.name}</h1>
            <p className="text-gray-400">{season} Sezonu Tüm Maçlar</p>

            <div className="text-sm text-gray-500 mt-2">
              <Link href="/">Haberler</Link> /
              <Link href={`/${league}`} className="ml-1">
                {league}
              </Link>{" "}
              /<span className="text-white ml-1">{teamInfo.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* LIST */}
      <div className="max-w-[1200px] mx-auto px-4 mt-8 space-y-3">
        {matches.map((m) => {
          const played = m.homeScore !== null;

          return (
            <Link key={m.id} href={`/matches/${m.id}`} className="block">
              <div className="flex items-center justify-between bg-[#111827] px-4 py-4 rounded-xl hover:bg-white/5 transition">
                {/* HOME */}
                <div className="flex items-center gap-3 w-[35%]">
                  <img src={m.homeLogo} className="w-6 h-6" />
                  <span className="text-sm">{m.home}</span>
                </div>

                {/* SCORE / TIME */}
                <div className="font-bold text-sm">
                  {played ? `${m.homeScore} - ${m.awayScore}` : m.time}
                </div>

                {/* AWAY */}
                <div className="flex items-center gap-3 justify-end w-[35%]">
                  <span className="text-sm">{m.away}</span>
                  <img src={m.awayLogo} className="w-6 h-6" />
                </div>

                {/* DATE */}
                <div className="text-xs text-gray-400 w-[80px] text-right">
                  {m.date}
                </div>
              </div>
            </Link>
          );
        })}

        {!matches.length && (
          <div className="text-center text-gray-500 mt-10">Maç bulunamadı</div>
        )}
      </div>
    </div>
  );
}

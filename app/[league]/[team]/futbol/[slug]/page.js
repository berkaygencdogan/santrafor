import { TrophyCard } from "@/components/ui/TrophyCard";
import React from "react";
import { FaFutbol } from "react-icons/fa";
import { GiTargetShot } from "react-icons/gi";
import { FaSquare } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa";
import { FaCrown } from "react-icons/fa";

async function getPlayer(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/player/${slug}`,
    { cache: "no-store" },
  );

  if (!res.ok) return null;

  return res.json();
}

const POSITION_MAP = {
  "Centre Forward": { x: "50%", y: "22%", color: "red" },

  "Right Wing": { x: "68%", y: "30%", color: "red" },
  "Left Wing": { x: "31%", y: "30%", color: "red" },

  "Attacking Midfield": { x: "50%", y: "35%", color: "red" },
  "Central Midfield": { x: "50%", y: "50%", color: "red" },
  "Defensive Midfield": { x: "50%", y: "62%", color: "red" },

  "Left Back": { x: "31%", y: "70%", color: "red" },
  "Centre Back": { x: "50%", y: "72%", color: "red" },
  "Right Back": { x: "68%", y: "70%", color: "red" },

  Goalkeeper: { x: "50%", y: "82%", color: "red" },
};

function PlayerDot({ player }) {
  const pos =
    POSITION_MAP[player.detailedposition?.name] ||
    POSITION_MAP["Central Midfield"];

  return (
    <div
      className="absolute"
      style={{
        left: pos.x,
        top: pos.y,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        className="w-10 h-10 flex items-center justify-center rounded-md text-white font-bold text-lg shadow-lg"
        style={{ background: pos.color }}
      >
        {player.teams[0].jersey_number}
      </div>
    </div>
  );
}

function buildSeasonStats(statistics = []) {
  const map = {};

  statistics.forEach((s) => {
    const season = s.season?.name;
    const league = s.season?.league?.name;
    const leagueLogo = s.season?.league?.image_path;
    const team = s.team?.name;
    const teamLogo = s.team?.image_path;

    if (!season || !league) return;

    const key = season + league;

    if (!map[key]) {
      map[key] = {
        season,
        league,
        leagueLogo,
        team,
        teamLogo,
        matches: 0,
        goals: 0,
        assists: 0,
        yellow: 0,
        red: 0,
        minutes: 0,
      };
    }

    (s.details || []).forEach((d) => {
      const code = d.type?.code;
      const val = d.value || {};

      if (code === "appearances") map[key].matches += val.total || 0;

      if (code === "goals") map[key].goals += val.total || val.goals || 0;

      if (code === "assists") map[key].assists += val.total || 0;

      if (code === "yellowcards") map[key].yellow += val.total || 0;

      if (code === "redcards") map[key].red += val.total || 0;

      if (code === "minutes-played") map[key].minutes += val.total || 0;
    });
  });

  return Object.values(map).sort((a, b) => b.season.localeCompare(a.season));
}

function groupBySeason(stats) {
  const map = {};
  stats.forEach((s) => {
    if (!map[s.season]) map[s.season] = [];
    map[s.season].push(s);
  });
  return map;
}
function buildLeagueList(player) {
  const trophies = player.trophies || [];

  return trophies.map((t) => ({
    id: t.league?.id || t.league_id,
    league: t.league?.name || "Bilinmiyor",
    logo: t.league?.image_path || null,
    season: t.season?.name || "Bilinmiyor",
    type: t.trophy?.name || "Bilinmiyor",
    team: t.team?.name || "Bilinmiyor",
    teamLogo: t.team?.image_path || "/no-team.png",
  }));
}

export default async function PlayerPage({ params }) {
  const { slug } = await params;
  const data = await getPlayer(slug);
  if (!data) return <div className="p-10">Oyuncu bulunamadı</div>;

  const player = data;
  const leagues = buildLeagueList(player);
  const seasonStats = buildSeasonStats(player.statistics || []);
  const seasonGroups = groupBySeason(seasonStats);
  const clubTotals = {
    matches: 0,
    goals: 0,
    assists: 0,
    yellow: 0,
    red: 0,
  };
  seasonStats.forEach((s) => {
    clubTotals.matches += s.matches;
    clubTotals.goals += s.goals;
    clubTotals.assists += s.assists;
    clubTotals.yellow += s.yellow;
    clubTotals.red += s.red;
  });
  const trophiesByTeam = {};

  leagues.forEach((t) => {
    const teamName = t.team || "Bilinmiyor";

    if (!trophiesByTeam[teamName]) {
      trophiesByTeam[teamName] = [];
    }

    trophiesByTeam[teamName].push(t);
  });
  const trophyTotals = {};

  leagues.forEach((t) => {
    if (t.type !== "Winner") return;

    const id = t.id;

    if (!trophyTotals[id]) {
      trophyTotals[id] = {
        id,
        name: t.league,
        logo: t.logo,
        count: 0,
      };
    }

    trophyTotals[id].count++;
  });

  const trophyList = Object.values(trophyTotals);

  const totalTrophies = trophyList.reduce((sum, t) => sum + t.count, 0);
  const formatDate = (d) => {
    if (!d) return "-";
    const date = new Date(d);
    return date.toLocaleDateString("tr-TR");
  };
  const getTransferInfo = (type) => {
    if (!type) return { label: "-", icon: "🔁" };

    const t = type.toLowerCase();

    if (t.includes("end")) return { label: "Kiralıktan Döndü", icon: "↩️" };

    if (t.includes("loan")) return { label: "Kiralık", icon: "📄" };

    if (t.includes("transfer")) return { label: "Transfer", icon: "💰" };

    if (t.includes("free")) return { label: "Bedelsiz", icon: "🆓" };

    return { label: type, icon: "🔁" };
  };
  const buildCareer = (player) => {
    const map = {};

    // ✅ 1. CURRENT TEAM (teams)
    (player.teams || []).forEach((t) => {
      const name = t.team?.name;

      if (!name) return;

      map[name] = {
        name,
        logo: t.team?.image_path,
        start: t.from,
        end: null, // aktif takım
      };
    });

    // ✅ 2. TROPHIES (eski takımlar)
    (player.trophies || []).forEach((t) => {
      const name = t.team?.name;

      if (!name) return;

      // zaten varsa skip (duplicate önler)
      if (map[name]) return;

      map[name] = {
        name,
        logo: t.team?.image_path,
        start: null,
        end: null,
      };
    });

    return Object.values(map);
  };
  const career = buildCareer(player);
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10 text-black">
      {/* 🔥 HEADER */}
      <div className="flex items-center justify-between bg-white rounded-2xl p-6 shadow">
        <div className="flex items-center gap-4">
          <img
            src={player.image_path}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold">{player.display_name}</h1>
            <div className="flex gap-3 text-sm text-gray-500">
              <span className="flex items-center">
                <img
                  src={player.teams?.[0]?.team?.image_path}
                  className="w-10 h-10 rounded-full mr-2 object-cover"
                />
                {player.teams?.[0]?.team?.name}
              </span>
              <span className="flex items-center">
                <img
                  src={player.nationality.image_path}
                  className="w-10 h-10 rounded-full mr-2 object-cover"
                />
                {player.nationality?.name}
              </span>
            </div>
          </div>
        </div>

        <div className="text-3xl font-bold text-gray-400">
          #{player.teams[0].jersey_number}
        </div>
      </div>

      {/* 🔥 INFO + CAREER */}
      <div className="grid md:grid-cols-3 gap-6 min-h-[350px]">
        {/* saha */}
        <div className="absolute right-70 -translate-y-[80px] w-[500px] h-[500px]">
          <img
            src="https://i.hizliresim.com/msh283b.png"
            className="absolute w-full h-full"
          />

          <PlayerDot player={player} />
        </div>

        {/* info */}
        <div className="bg-white rounded-2xl p-6 shadow space-y-3">
          <h3 className="font-semibold text-lg">Info</h3>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-gray-500">Boy</p>
              <p>{player.height} cm</p>
            </div>
            <div>
              <p className="text-gray-500">Kilo</p>
              <p>{player.weight} kg</p>
            </div>
            <div>
              <p className="text-gray-500">Doğum Tarihi</p>
              <p>{player.date_of_birth}</p>
            </div>
            <div>
              <p className="text-gray-500">Ayak</p>
              <p>{player.metadata[0]?.values}</p>
            </div>
            <div>
              <p className="text-gray-500">Ülke</p>
              <p>{player.nationality?.name}</p>
            </div>
            <div>
              <p className="text-gray-500">Pozisyon</p>
              <p>{player.detailedposition?.name}</p>
            </div>
          </div>
        </div>

        {/* career */}
        <div className="bg-white rounded-2xl p-6 shadow space-y-4">
          <h3 className="font-semibold text-lg">Career</h3>

          {career.map((c, i) => (
            <div key={i} className="flex items-center gap-4 border-b pb-3">
              <img src={c.logo} className="w-10 h-10" />

              <div>
                <p>{c.name}</p>
                <p className="text-sm text-gray-500">
                  {i === 0 ? "Devam Ediyor" : ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <h3 className="font-bold text-lg p-4 border-b">
          Sezon Bazlı İstatistikler
        </h3>

        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Lig</th>
              <th className="p-2 text-left">Takım</th>
              <th className="p-2">Maç</th>
              <th className="p-2">⚽</th>
              <th className="p-2">A</th>
              <th className="p-2">🟨</th>
              <th className="p-2">🟥</th>
              <th className="p-2">Dakika</th>
            </tr>
          </thead>

          <tbody>
            {Object.entries(seasonGroups)
              .sort((a, b) => b[0].localeCompare(a[0])) // 🔥 sezonu ters sırala
              .map(([season, rows]) => (
                <React.Fragment key={season}>
                  {/* SEASON HEADER */}
                  <tr className="bg-gray-200 font-semibold">
                    <td colSpan="8" className="p-2">
                      {season}
                    </td>
                  </tr>

                  {/* LEAGUE ROWS */}
                  {rows.map((s, i) => (
                    <tr key={i} className="border-t">
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          <img
                            src={s.leagueLogo}
                            className="w-5 h-5 object-contain"
                          />
                          {s.league}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          <img
                            src={s.teamLogo}
                            className="w-5 h-5 object-contain"
                          />
                          {s.team}
                        </div>
                      </td>
                      <td className="p-2 text-center">{s.matches}</td>
                      <td className="p-2 text-center">{s.goals}</td>
                      <td className="p-2 text-center">{s.assists}</td>
                      <td className="p-2 text-center">{s.yellow}</td>
                      <td className="p-2 text-center">{s.red}</td>
                      <td className="p-2 text-center">{s.minutes}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
          </tbody>
        </table>
      </div>
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <h3 className="p-4 font-bold border-b">Transfer Geçmişi</h3>

        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Tarih</th>
              <th className="p-2 text-left">Önceki</th>
              <th className="p-2 text-left">Takım</th>
              <th className="p-2">Tip</th>
              <th className="p-2">Bedel</th>
            </tr>
          </thead>

          <tbody>
            {(player.transfers || [])
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((t, i) => {
                const info = getTransferInfo(t.type?.name);

                return (
                  <tr key={i} className="border-t">
                    {/* DATE */}
                    <td className="p-2">{formatDate(t.date)}</td>

                    {/* FROM TEAM */}
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        <img
                          src={t.fromteam?.image_path}
                          className="w-5 h-5 object-contain"
                        />
                        {t.fromteam?.name}
                      </div>
                    </td>

                    {/* TO TEAM */}
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        <img
                          src={t.toteam?.image_path}
                          className="w-5 h-5 object-contain"
                        />
                        {t.toteam?.name}
                      </div>
                    </td>

                    {/* TYPE */}
                    <td className="p-2 text-center">
                      <span className="flex items-center justify-center gap-1">
                        <span>{info.icon}</span>
                        {info.label}
                      </span>
                    </td>

                    {/* AMOUNT */}
                    <td className="p-2 text-center">
                      {t.amount ? `${t.amount / 1000000} M €` : "-"}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {/* MATCHES */}
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p className="text-gray-500 flex items-center justify-center gap-1">
            <span>🏟️</span> Maç
          </p>
          <p className="text-xl font-bold">{clubTotals.matches}</p>
        </div>

        {/* GOALS */}
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p className="text-gray-500 flex items-center justify-center gap-2">
            <FaFutbol className="text-green-600" />
            Gol
          </p>
          <p className="text-xl font-bold">{clubTotals.goals}</p>
        </div>

        {/* ASSIST */}
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p className="text-gray-500 flex items-center justify-center gap-2">
            <GiTargetShot className="text-blue-500" />
            Asist
          </p>
          <p className="text-xl font-bold">{clubTotals.assists}</p>
        </div>

        {/* CARDS */}
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p className="text-gray-500 flex items-center justify-center gap-2">
            <FaSquare className="text-yellow-400" />
            <FaSquare className="text-red-500" />
            Kartlar
          </p>
          <p className="text-xl font-bold">
            {clubTotals.yellow} / {clubTotals.red}
          </p>
        </div>
      </div>
      <div className="space-y-6">
        <h3 className="text-xl font-bold">Trophies</h3>

        {Object.entries(trophiesByTeam).map(([team, trophies]) => (
          <div key={team} className="bg-white rounded-xl p-6 shadow">
            {/* TEAM HEADER */}
            <div className="flex items-center gap-3 mb-4">
              <img
                src={trophies[0].teamLogo}
                className="w-8 h-8 object-contain"
              />
              <h4 className="font-semibold text-lg">{team}</h4>
              <span className="text-gray-400 text-sm">
                {trophies.length} trophies
              </span>
            </div>

            {/* TROPHY GRID */}
            <div className="grid md:grid-cols-4 gap-4">
              {trophies.map((t, i) => (
                <div key={i} className="bg-gray-100 rounded-lg p-4 text-center">
                  {t.logo ? (
                    <img
                      src={t.logo}
                      className="w-8 h-8 mx-auto mb-2 object-contain"
                    />
                  ) : t.type === "Winner" ? (
                    <FaTrophy className="text-yellow-500 text-xl w-8 h-8 mx-auto mb-2 object-contain" />
                  ) : (
                    <FaCrown className="text-yellow-500 text-xl w-8 h-8 mx-auto mb-2 object-contain" />
                  )}
                  <p className="text-sm font-semibold">{t.league}</p>

                  <p className="text-xs text-gray-500">{t.season}</p>

                  <span
                    className={`text-xs px-2 py-1 rounded mt-2 inline-block
              ${
                t.type === "Winner"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
                  >
                    {t.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl p-6 shadow">
        <h3 className="text-xl font-bold mb-4">🏆 Kupalar ({totalTrophies})</h3>

        <div className="grid md:grid-cols-6 gap-4">
          {trophyList.map((t) => (
            <div
              key={t.id}
              className="border rounded-xl p-4 text-center hover:shadow-md transition bg-white"
            >
              <div className="flex justify-center mb-2">
                {t.logo ? (
                  <img src={t.logo} className="w-8 h-8 object-contain" />
                ) : t.type === "Winner" ? (
                  <FaTrophy className="text-yellow-500 text-xl w-8 h-8 mx-auto mb-2 object-contain" />
                ) : (
                  <FaCrown className="text-yellow-500 text-xl w-8 h-8 mx-auto mb-2 object-contain" />
                )}
              </div>

              <p className="text-sm font-semibold leading-tight">{t.name}</p>

              <p className="text-lg font-bold text-yellow-600 mt-1">
                🏆 {t.count}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

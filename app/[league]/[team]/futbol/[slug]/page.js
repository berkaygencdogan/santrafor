import { TrophyCard } from "@/components/ui/TrophyCard";

async function getPlayer(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/player/${slug}`,
    { cache: "no-store" },
  );

  if (!res.ok) return null;

  return res.json();
}

export default async function PlayerPage({ params }) {
  const { slug } = await params;
  const data = await getPlayer(slug);

  if (!data) return <div className="p-10">Oyuncu bulunamadı</div>;

  const player = data;

  const trophiesByTeam = {};
  (player.trophies || []).forEach((t) => {
    const teamName = t.team?.name || "Unknown";
    if (!trophiesByTeam[teamName]) trophiesByTeam[teamName] = [];
    trophiesByTeam[teamName].push(t);
  });

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
                  src={player.teams[0].team.image_path}
                  className="w-10 h-10 rounded-full mr-2 object-cover"
                />
                {player.teams[0].team.name}
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
          #{player.number || 9}
        </div>
      </div>

      {/* 🔥 INFO + CAREER */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* saha */}
        <div className="bg-[#111827] rounded-2xl h-[260px] flex items-center justify-center text-white">
          <div className="text-center">
            <div className="text-2xl">{player.number || 9}</div>
            <div className="text-xs opacity-70">Position</div>
          </div>
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
      {/* 🔥 TROPHIES */}
      <div className="space-y-6 bg-white p-5">
        <h3 className="text-xl font-bold">Trophies</h3>

        {Object.entries(trophiesByTeam).map(([team, trophies]) => {
          const teamLogo = trophies[0]?.team?.image_path;

          return (
            <div
              key={team}
              className="bg-white rounded-2xl p-6 shadow border-2"
            >
              <h4 className="flex items-center font-semibold mb-4">
                <img
                  src={teamLogo}
                  className="w-10 h-10 rounded-full object-cover mr-2"
                />
                {team}
              </h4>

              <div className="grid md:grid-cols-4 gap-4">
                {trophies.map((t, i) => (
                  <TrophyCard key={i} t={t} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

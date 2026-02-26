import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const toSlug = (str) =>
  str
    ?.toLowerCase()
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9]/g, "");

const getLeagueSlug = async (id) => {
  const API = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${API}/api/sport/leagues`, {
      cache: "force-cache", // 🔥 sürekli çekmesin
    });

    const data = await res.json();
    const leagues = data.data || [];

    // 🔥 id ile lig bul
    const found = leagues.find((l) => String(l.id) === String(id));

    if (!found) return "superlig"; // fallback

    // 🔥 ismi slug yap
    return toSlug(found.name);
  } catch (err) {
    console.log("LEAGUE SLUG ERROR:", err);
    return "futbol";
  }
};

export default async function LeaguePage({ params }) {
  const { id } = await params;
  const leagueSlug = await getLeagueSlug(id);
  let standings = [];

  try {
    const res = await fetch(`${API_URL}/api/sport/standings/${id}`, {
      cache: "no-store",
    });

    const data = await res.json();
    standings = data.data || [];
  } catch (error) {
    console.log("FETCH ERROR:", error);
  }

  if (!standings.length) {
    return <div className="text-white p-10">Veri bulunamadı</div>;
  }

  return (
    <div className="bg-[#0B1220] min-h-screen text-white">
      <div className="max-w-[1400px] mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-2">Puan Durumu</h1>
        <p className="text-gray-400 mb-8">Lig Tablosu</p>

        <div className="bg-[#111827] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#1f2937] text-gray-300">
              <tr>
                <th className="py-3 w-[40px] text-center">#</th>
                <th className="text-left px-2">Takım</th>

                <th className="text-center">Oynanan Maçlar</th>
                <th className="text-center">Galibiyet</th>
                <th className="text-center">Beraberlik</th>
                <th className="text-center">Mağlubiyet</th>
                <th className="text-center">Atılan Gol</th>
                <th className="text-center">Yenen Gol</th>
                <th className="text-center">Averaj</th>

                <th className="text-center font-bold">Puan</th>
                <th className="text-center">Form Durumu</th>
              </tr>
            </thead>

            <tbody>
              {standings.map((team) => (
                <tr
                  key={team.id}
                  className="border-b border-white/10 hover:bg-[#1f2937] transition"
                >
                  <td className="text-center py-3">{team.position}</td>

                  {/* ✅ Takım hücresi link */}
                  <td className="px-2">
                    <Link
                      href={`/${leagueSlug}/${toSlug(team.name)}/futbol`}
                      className="flex items-center gap-2 hover:text-yellow-400 transition"
                    >
                      <img
                        src={team.logo}
                        alt={team.name}
                        className="w-5 h-5 object-contain"
                      />
                      <span className="truncate">{team.name}</span>
                    </Link>
                  </td>

                  {/* STATS */}
                  <td className="text-center">{team.played ?? "-"}</td>
                  <td className="text-center">{team.won ?? "-"}</td>
                  <td className="text-center">{team.draw ?? "-"}</td>
                  <td className="text-center">{team.lost ?? "-"}</td>
                  <td className="text-center">{team.gf ?? "-"}</td>
                  <td className="text-center">{team.ga ?? "-"}</td>
                  <td className="text-center">
                    {team.goalDiff ??
                      (team.gf != null && team.ga != null
                        ? team.gf - team.ga
                        : "-")}
                  </td>

                  {/* POINT */}
                  <td className="text-center font-bold text-yellow-400">
                    {team.points}
                  </td>

                  {/* FORM */}
                  <td className="text-center">
                    <div className="flex gap-1 justify-center">
                      {team.form?.slice(-5).map((f, i) => (
                        <span
                          key={i}
                          className={`w-5 h-5 flex items-center justify-center text-xs rounded-full
                          ${
                            f === "W"
                              ? "bg-green-500"
                              : f === "L"
                                ? "bg-red-500"
                                : "bg-yellow-500"
                          }`}
                        >
                          {f === "W" ? "G" : f === "L" ? "M" : "B"}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import { sportsData } from "@/lib/sportsData";

export default async function LeaguePage({ params }) {
  const { slug } = await params;

  // ✅ slug ile bul
  const league = sportsData.basketbol.leagues.find((l) => l.slug === slug);

  if (!league) {
    return <div className="text-white p-10">Lig bulunamadı</div>;
  }

  return (
    <div className="bg-[#0B1220] min-h-screen text-white">
      <div className="max-w-[1400px] mx-auto px-4 py-10">
        {/* TITLE */}
        <h1 className="text-3xl font-bold mb-2">{league.name}</h1>
        <p className="text-gray-400 mb-8">{league.country} - Puan Durumu</p>

        {/* TABLE */}
        <div className="bg-[#111827] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#1f2937] text-gray-300">
              <tr>
                <th className="py-3">#</th>
                <th className="text-left">Takım</th>
                <th>O</th>
                <th>G</th>
                <th>M</th>
                <th>P</th>
              </tr>
            </thead>

            <tbody>
              {league.standings.map((team) => (
                <tr
                  key={team.rank}
                  className="border-b border-white/10 hover:bg-[#1f2937] transition"
                >
                  <td className="text-center py-3">{team.rank}</td>

                  <td className="px-2 font-medium">{team.team}</td>

                  <td className="text-center">{team.play}</td>
                  <td className="text-center">{team.win}</td>
                  <td className="text-center">{team.lose}</td>

                  <td className="text-center font-bold text-yellow-400">
                    {team.point}
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

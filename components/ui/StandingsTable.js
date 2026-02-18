export default function StandingsTable({ standings = [], title }) {
  if (!standings.length) return null;

  return (
    <div className="bg-[#111827] rounded-xl p-4 w-full">
      {/* HEADER */}
      <h3 className="text-center text-yellow-400 font-bold mb-4">
        {title} Puan Durumu
      </h3>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-[#111827] z-10">
            <tr className="text-gray-400 border-b border-white/10">
              <th className="py-2 text-left">#</th>
              <th className="py-2 text-left">Takım</th>
              <th className="py-2 text-center">O</th>
              <th className="py-2 text-center">G</th>
              <th className="py-2 text-center">P</th>
            </tr>
          </thead>

          <tbody>
            {standings.map((team) => (
              <tr
                key={team.rank}
                className="border-b border-white/5 hover:bg-white/5 transition text-white"
              >
                <td className="py-2">{team.rank}</td>

                <td className="py-2 font-medium">{team.team}</td>

                <td className="py-2 text-center">{team.play}</td>

                <td className="py-2 text-center">{team.win}</td>

                <td className="py-2 text-center font-bold text-yellow-400">
                  {team.point}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

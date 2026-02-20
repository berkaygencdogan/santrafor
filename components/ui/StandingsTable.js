export default function StandingsTable({ data, leagueName }) {
  return (
    <div className="bg-[#0f172a] rounded-2xl p-4 text-white">
      <h2 className="text-xl font-bold mb-4">{leagueName}</h2>

      <div className="space-y-2">
        {data.map((team) => (
          <div
            key={team.position}
            className="flex items-center justify-between bg-[#1e293b] rounded-xl px-3 py-2"
          >
            {/* sol */}
            <div className="flex items-center gap-3">
              <span className="w-5 text-sm text-gray-400">{team.position}</span>

              <img src={team.logo} alt={team.name} className="w-6 h-6" />

              <span className="font-medium">{team.name}</span>
            </div>

            {/* sağ */}
            <div className="flex items-center gap-3">
              <span className="font-bold">{team.points}</span>

              {/* form */}
              <span
                className={`text-xs ${
                  team.form === "up"
                    ? "text-green-400"
                    : team.form === "down"
                      ? "text-red-400"
                      : "text-gray-400"
                }`}
              >
                {team.form === "up" ? "▲" : team.form === "down" ? "▼" : "—"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function LeaguePage({ params }) {
  const { slug } = await params; // artık slug = name olacak
  let standings = [];

  try {
    const res = await fetch(
      `${API_URL}/api/sport/standings/live/leagues/${slug}`,
      {
        cache: "no-store", // canlı veri
      },
    );

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
        {/* TITLE */}
        <h1 className="text-3xl font-bold mb-2">Puan Durumu</h1>
        <p className="text-gray-400 mb-8">Lig Tablosu</p>

        {/* TABLE */}
        <div className="bg-[#111827] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#1f2937] text-gray-300">
              <tr>
                <th className="py-3">#</th>
                <th className="text-left">Takım</th>
                <th>P</th>
                <th>Form</th>
              </tr>
            </thead>

            <tbody>
              {standings.map((team) => (
                <tr
                  key={team.name}
                  className="border-b border-white/10 hover:bg-[#1f2937] transition"
                >
                  <td className="text-center py-3">{team.position}</td>

                  <td className="px-2 font-medium flex items-center gap-2">
                    <img src={team.logo} alt={team.name} className="w-5 h-5" />
                    {team.name}
                  </td>

                  <td className="text-center font-bold text-yellow-400">
                    {team.points}
                  </td>

                  <td className="text-center">
                    {team.form === "up"
                      ? "▲"
                      : team.form === "down"
                        ? "▼"
                        : "—"}
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

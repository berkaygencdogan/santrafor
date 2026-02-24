const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function LeaguePage({ params }) {
  const { id } = await params; // artık slug = name olacak
  console.log("object", id);
  let standings = [];

  try {
    const res = await fetch(`${API_URL}/api/sport/standings/${id}`, {
      cache: "no-store", // canlı veri
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
        {/* TITLE */}
        <h1 className="text-3xl font-bold mb-2">Puan Durumu</h1>
        <p className="text-gray-400 mb-8">Lig Tablosu</p>

        <div className="bg-[#111827] rounded-xl overflow-hidden">
          <table className="w-full text-sm table-fixed">
            <thead className="bg-[#1f2937] text-gray-300">
              <tr>
                <th className="py-3 w-[50px] text-center">#</th>
                <th className="text-left px-2">Takım</th>
                <th className="w-[60px] text-center">P</th>
                <th className="w-[60px] text-center">Form</th>
              </tr>
            </thead>

            <tbody>
              {standings.map((team) => (
                <tr
                  key={team.id}
                  className="border-b border-white/10 hover:bg-[#1f2937] transition"
                >
                  {/* POS */}
                  <td className="text-center py-3">{team.position}</td>

                  {/* TEAM */}
                  <td className="px-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <img
                        src={team.logo}
                        alt={team.name}
                        className="w-5 h-5 object-contain"
                      />
                      <span className="truncate">{team.name}</span>
                    </div>
                  </td>

                  {/* POINTS */}
                  <td className="text-center font-bold text-yellow-400">
                    {team.points}
                  </td>

                  {/* FORM */}
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

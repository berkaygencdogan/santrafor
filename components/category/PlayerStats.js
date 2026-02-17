export default function PlayerStats() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 mt-10 grid lg:grid-cols-[1fr_2fr] gap-6">
      {/* SOL */}
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex gap-3 bg-[#111827] p-3 rounded-xl border border-white/10 hover:bg-[#1a2236] transition"
          >
            <img
              src={`https://picsum.photos/200/150?${i}`}
              className="w-20 h-16 rounded object-cover"
            />
            <p className="text-sm leading-snug">Yan haber {i}</p>
          </div>
        ))}
      </div>

      {/* SAĞ */}
      <div className="bg-[#111827] p-4 rounded-xl border border-white/10">
        {/* TITLE */}
        <h3 className="text-center text-green-400 font-bold mb-4 text-sm tracking-wide">
          GALATASARAY OYUNCU İSTATİSTİKLERİ
        </h3>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-white/10 rounded-lg overflow-hidden">
            {/* HEAD */}
            <thead className="bg-[#0f172a] text-gray-400 text-xs uppercase">
              <tr>
                <th className="px-4 py-3 text-left border-b border-white/10">
                  Oyuncu
                </th>
                <th className="px-4 py-3 text-center border-b border-white/10">
                  Maç
                </th>
                <th className="px-4 py-3 text-center border-b border-white/10">
                  Gol
                </th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              <tr className="border-b border-white/10 hover:bg-[#1a2236] transition">
                <td className="px-4 py-3 font-medium">Mauro Icardi</td>
                <td className="px-4 py-3 text-center">20</td>
                <td className="px-4 py-3 text-center text-green-400 font-semibold">
                  10
                </td>
              </tr>

              <tr className="border-b border-white/10 hover:bg-[#1a2236] transition">
                <td className="px-4 py-3 font-medium">Victor Osimhen</td>
                <td className="px-4 py-3 text-center">18</td>
                <td className="px-4 py-3 text-center text-green-400 font-semibold">
                  9
                </td>
              </tr>

              <tr className="hover:bg-[#1a2236] transition">
                <td className="px-4 py-3 font-medium">Leroy Sane</td>
                <td className="px-4 py-3 text-center">17</td>
                <td className="px-4 py-3 text-center text-green-400 font-semibold">
                  6
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

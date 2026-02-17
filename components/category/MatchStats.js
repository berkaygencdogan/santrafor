export default function MatchStats() {
  const blocks = ["EN SON MAÇLAR", "FİKSTÜR", "PUAN DURUMU"];

  return (
    <div className="max-w-[1400px] mx-auto px-4 mt-10 grid md:grid-cols-3 gap-6">
      {blocks.map((title, i) => (
        <div
          key={i}
          className="bg-[#111827] p-4 rounded-xl border border-white/10"
        >
          <h3 className="text-sm font-semibold border-b border-red-500 pb-2 mb-4">
            GALATASARAY {title}
          </h3>

          <div className="space-y-3 text-sm text-gray-300">
            <p>Galatasaray 5-1 Eyüp</p>
            <p>Rizespor 0-3 Galatasaray</p>
            <p>Galatasaray 4-0 Kayseri</p>
          </div>
        </div>
      ))}
    </div>
  );
}

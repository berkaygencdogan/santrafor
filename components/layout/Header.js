export default function Header() {
  return (
    <div className="bg-black text-white text-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
        {/* SOL */}
        <div className="flex gap-4">
          <span className="cursor-pointer hover:text-red-500">
            🔴 CANLI SKOR
          </span>
          <span className="cursor-pointer hover:text-gray-300">Ana Sayfa</span>
        </div>

        {/* SAĞ */}
        <div className="text-gray-300">⚽ Beşiktaş 0 - 3 Galatasaray</div>
      </div>
    </div>
  );
}

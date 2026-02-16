export default function Footer() {
  return (
    <footer className="bg-black text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6">
        {/* LOGO */}
        <div>
          <h2 className="text-xl font-bold text-red-500">SANTRAFOR</h2>
          <p className="text-gray-400 mt-2">
            Güncel spor haberleri, analizler ve transfer gelişmeleri.
          </p>
        </div>

        {/* MENÜ */}
        <div>
          <h3 className="font-semibold mb-3">Kategoriler</h3>
          <ul className="space-y-2 text-gray-400">
            <li>Futbol</li>
            <li>Basketbol</li>
            <li>Transfer</li>
          </ul>
        </div>

        {/* SOSYAL */}
        <div>
          <h3 className="font-semibold mb-3">Bizi Takip Et</h3>
          <div className="flex gap-3 text-gray-400">
            <span>Facebook</span>
            <span>Twitter</span>
            <span>Instagram</span>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 pb-4">© 2026 Santrafor</div>
    </footer>
  );
}

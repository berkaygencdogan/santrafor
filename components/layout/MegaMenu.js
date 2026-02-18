import { sportsData } from "@/lib/sportsData";
import Link from "next/link";

export default function MegaMenu({ type }) {
  /* ================= SAFE DATA ================= */
  const futbol = sportsData?.futbol || [];
  const basketbol = sportsData?.basketbol || [];
  const diger = sportsData?.diger || [];

  /* ================= MENU ================= */
  if (type === "menu") {
    return (
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <h4 className="text-lime-400 font-bold mb-3">DİĞER SPORLAR</h4>

          <div className="grid grid-cols-2 gap-y-2 text-sm text-white/80">
            {diger.leagues.map((item) => (
              <Link
                key={item.slug}
                href={`/diger-sporlar/${item.slug}`}
                className="hover:text-white"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="mt-8 space-y-2 text-sm">
            <div className="text-white font-semibold">
              HANGİ MAÇ HANGİ KANALDA?
            </div>

            <Link href="/" className="block text-white/70 hover:text-white">
              GÜNLÜK MAÇ LİSTESİ
            </Link>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-3">SANTRAFOR ÜYESİ MİSİN ?</h4>

          <div className="space-y-2 text-sm text-white/80">
            <Link href="/giris" className="block hover:text-white">
              Üye Girişi
            </Link>
          </div>

          <h4 className="text-white font-bold mt-8 mb-3">BİZE ULAŞIN</h4>

          <div className="flex gap-2">
            {["f", "x", "in", "ig"].map((k) => (
              <div
                key={k}
                className="w-9 h-9 rounded flex items-center justify-center bg-white/10 hover:bg-white/20 transition cursor-pointer"
              >
                <span className="text-xs font-bold">{k.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:block">
          <div className="h-full rounded-xl bg-white/5 border border-white/10" />
        </div>
      </div>
    );
  }

  /* ================= BASKETBOL ================= */
  if (type === "basketbol") {
    return (
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <h4 className="text-lime-400 font-bold mb-3">
            LİGLER & ORGANİZASYONLAR
          </h4>

          <div className="space-y-2 text-sm text-white/80">
            {basketbol.leagues.map((item) => (
              <Link
                key={item.slug}
                href={`/basketbol/${item.slug}`}
                className="block hover:text-white"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <h4 className="text-lime-400 font-bold mt-8 mb-3">DİĞER</h4>

          <Link
            href="/basketbol/milli"
            className="block text-sm text-white/80 hover:text-white"
          >
            Milli Takımlar
          </Link>
        </div>

        <div className="hidden md:block">
          <div className="h-full rounded-xl bg-white/5 border border-white/10" />
        </div>
      </div>
    );
  }

  /* ================= FUTBOL ================= */
  if (type === "futbol") {
    return (
      <div className="grid md:grid-cols-3 gap-10">
        {/* LİGLER */}
        <div>
          <h4 className="text-lime-400 font-bold mb-3">LİGLER</h4>

          <div className="space-y-2 text-sm text-white/80">
            {futbol.leagues.map((item) => (
              <Link
                key={item.slug}
                href={`/futbol/${item.slug}`}
                className="block hover:text-white"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* TAKIMLAR */}
        <div>
          <h4 className="text-lime-400 font-bold mb-3">TAKIMLAR</h4>

          <div className="grid grid-cols-2 gap-y-2 text-sm text-white/80">
            {["besiktas", "fenerbahce", "galatasaray", "trabzonspor"].map(
              (team) => (
                <Link
                  key={team}
                  href={`/${team}/futbol`}
                  className="hover:text-white capitalize"
                >
                  {team}
                </Link>
              ),
            )}
          </div>

          <h4 className="text-lime-400 font-bold mt-8 mb-3">MİLLİ TAKIM</h4>

          <Link
            href="/futbol/milli"
            className="block text-sm text-white/80 hover:text-white"
          >
            A Milli Takım
          </Link>
        </div>

        {/* ORGANİZASYON */}
        <div>
          <h4 className="text-lime-400 font-bold mb-3">ORGANİZASYONLAR</h4>

          <div className="space-y-2 text-sm text-white/80">
            {["sampiyonlar-ligi", "avrupa-ligi", "turkiye-kupasi"].map(
              (org) => (
                <Link
                  key={org}
                  href={`/futbol/${org}`}
                  className="block hover:text-white capitalize"
                >
                  {org.replace("-", " ")}
                </Link>
              ),
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

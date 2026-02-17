export default function MegaMenu({ type }) {
  if (type === "menu") {
    return (
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <h4 className="text-lime-400 font-bold mb-3">DİĞER SPORLAR</h4>
          <div className="grid grid-cols-2 gap-y-2 text-sm text-white/80">
            <a className="hover:text-white" href="#">
              Espor
            </a>
            <a className="hover:text-white" href="#">
              Golf
            </a>
            <a className="hover:text-white" href="#">
              Voleybol
            </a>
            <a className="hover:text-white" href="#">
              Cimnastik
            </a>
            <a className="hover:text-white" href="#">
              Motor Sporları
            </a>
            <a className="hover:text-white" href="#">
              Judo
            </a>
            <a className="hover:text-white" href="#">
              Tenis
            </a>
            <a className="hover:text-white" href="#">
              Bilardo
            </a>
            <a className="hover:text-white" href="#">
              Yüzme
            </a>
            <a className="hover:text-white" href="#">
              Diğer
            </a>
            <a className="hover:text-white" href="#">
              Bisiklet
            </a>
            <a className="hover:text-white" href="#">
              Boks
            </a>
            <a className="hover:text-white" href="#">
              Güreş
            </a>
            <a className="hover:text-white" href="#">
              Halter
            </a>
            <a className="hover:text-white" href="#">
              Hentbol
            </a>
            <a className="hover:text-white" href="#">
              At Yarışı
            </a>
            <a className="hover:text-white" href="#">
              Atletizm
            </a>
          </div>

          <div className="mt-8 space-y-2 text-sm">
            <div className="text-white font-semibold">
              HANGİ MAÇ HANGİ KANALDA?
            </div>
            <a className="block text-white/70 hover:text-white" href="#">
              ARŞİV
            </a>
            <a className="block text-white/70 hover:text-white" href="#">
              10 NUMARA
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-3">BUGÜNKÜ FOTOMAÇ</h4>
          <div className="space-y-2 text-sm text-white/80">
            <a className="block hover:text-white" href="#">
              ÜYELİK İŞLEMLERİ
            </a>
            <a className="block hover:text-white" href="#">
              Üye Ol
            </a>
            <a className="block hover:text-white" href="#">
              Üye Girişi
            </a>
          </div>

          <h4 className="text-white font-bold mt-8 mb-3">BİZE ULAŞIN</h4>
          <div className="flex gap-2">
            {["f", "x", "n", "ig", "p", "yt", "rss"].map((k) => (
              <div
                key={k}
                className="w-9 h-9 rounded flex items-center justify-center bg-white/10 hover:bg-white/20 transition cursor-pointer"
                title={k.toUpperCase()}
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

  if (type === "basketbol") {
    return (
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <h4 className="text-lime-400 font-bold mb-3">
            LİGLER & ORGANİZASYONLAR
          </h4>
          <div className="space-y-2 text-sm text-white/80">
            <a className="block hover:text-white" href="#">
              TÜRKİYE BASKETBOL LİGİ
            </a>
            <a className="block hover:text-white" href="#">
              KADINLAR BASKETBOL LİGİ
            </a>
            <a className="block hover:text-white" href="#">
              THY EuroLeague
            </a>
            <a className="block hover:text-white" href="#">
              NBA
            </a>
            <a className="block hover:text-white" href="#">
              DİĞER
            </a>
          </div>

          <h4 className="text-lime-400 font-bold mt-8 mb-3">MİLLİ TAKIMLAR</h4>
          <div className="space-y-2 text-sm text-white/80">
            <a className="block hover:text-white" href="#">
              ERKEK MİLLİ
            </a>
            <a className="block hover:text-white" href="#">
              KADIN MİLLİ
            </a>
          </div>
        </div>

        <div className="hidden md:block">
          <div className="h-full rounded-xl bg-white/5 border border-white/10" />
        </div>
      </div>
    );
  }

  // futbol
  return (
    <div className="grid md:grid-cols-3 gap-10">
      <div>
        <h4 className="text-lime-400 font-bold mb-3">LİGLER</h4>
        <div className="space-y-2 text-sm text-white/80">
          <a className="block hover:text-white" href="#">
            Süper Lig
          </a>
          <a className="block hover:text-white" href="#">
            TFF 1.Lig
          </a>
          <a className="block hover:text-white" href="#">
            TFF 2.Lig
          </a>
          <a className="block hover:text-white" href="#">
            TFF 3.Lig
          </a>
          <a className="block hover:text-white" href="#">
            İngiltere Premier Lig
          </a>
          <a className="block hover:text-white" href="#">
            İspanya La Liga
          </a>
          <a className="block hover:text-white" href="#">
            İtalya Serie A
          </a>
          <a className="block hover:text-white" href="#">
            Almanya Bundesliga
          </a>
          <a className="block hover:text-white" href="#">
            Fransa Ligue 1
          </a>
          <a className="block hover:text-white" href="#">
            Diğer ligler
          </a>
        </div>
      </div>

      <div>
        <h4 className="text-lime-400 font-bold mb-3">SÜPER LİG</h4>
        <div className="grid grid-cols-2 gap-y-2 text-sm text-white/80">
          {[
            "Corendon Alanyaspor",
            "Fatih Karagümrük",
            "Hesap.com Antalyaspor",
            "Kocaelispor",
            "Rams Başakşehir",
            "Gençlerbirliği",
            "Beşiktaş",
            "Kasımpaşa",
            "Fenerbahçe",
            "Tümosan Konyaspor",
            "Galatasaray",
            "Çaykur Rizespor",
            "Gaziantep FK",
            "Samsunspor",
            "Göztepe",
            "Trabzonspor",
          ].map((t) => (
            <a key={t} className="hover:text-white" href="#">
              {t}
            </a>
          ))}
        </div>

        <h4 className="text-lime-400 font-bold mt-8 mb-3">MİLLİ TAKIMLAR</h4>
        <div className="space-y-2 text-sm text-white/80">
          <a className="block hover:text-white" href="#">
            A Milli Futbol Takımı
          </a>
          <a className="block hover:text-white" href="#">
            Diğer Milli Takımlar
          </a>
        </div>
      </div>

      <div>
        <h4 className="text-lime-400 font-bold mb-3">ORGANİZASYONLAR</h4>
        <div className="space-y-2 text-sm text-white/80">
          <a className="block hover:text-white" href="#">
            Dünya Kupası
          </a>
          <a className="block hover:text-white" href="#">
            UEFA Şampiyonlar Ligi
          </a>
          <a className="block hover:text-white" href="#">
            UEFA Avrupa Ligi
          </a>
          <a className="block hover:text-white" href="#">
            Ziraat Türkiye Kupası
          </a>
          <a className="block hover:text-white" href="#">
            Konferans Ligi
          </a>
          <a className="block hover:text-white" href="#">
            Olimpiyatlar
          </a>
        </div>
      </div>
    </div>
  );
}

import Hero from "@/components/home/Hero";
import TopStories from "@/components/home/TopStories";
import Sidebar from "@/components/home/Sidebar";
import CategorySection from "@/components/home/CategorySection";

export default function Home() {
  const data = {
    sliders: [
      {
        id: 1,
        title: "Asensio'ya beklenmedik talip!",
        image: "https://picsum.photos/800/500",
      },
      {
        id: 2,
        title: "Süper Lig'de gençlere verilen süre",
        image: "https://picsum.photos/801/500",
      },
    ],

    featured: [
      {
        id: 1,
        title: "İşte Süper Lig'in sıralamadaki yeri!",
        image: "https://picsum.photos/400/300",
      },
      {
        id: 2,
        title: "G.Saraylı yıldıza özel takip!",
        image: "https://picsum.photos/401/300",
      },
      {
        id: 3,
        title: "Onuachu tarihe geçiyor!",
        image: "https://picsum.photos/402/300",
      },
      {
        id: 4,
        title: "İşlenmiş gıdalara dikkat!",
        image: "https://picsum.photos/403/300",
      },
      {
        id: 5,
        title: "G.Saraylı yıldıza özel takip!",
        image: "https://picsum.photos/401/300",
      },
      {
        id: 6,
        title: "G.Saraylı yıldıza özel takip!",
        image: "https://picsum.photos/401/300",
      },
      {
        id: 7,
        title: "G.Saraylı yıldıza özel takip!",
        image: "https://picsum.photos/401/300",
      },
      {
        id: 8,
        title: "G.Saraylı yıldıza özel takip!",
        image: "https://picsum.photos/401/300",
      },
      {
        id: 9,
        title: "G.Saraylı yıldıza özel takip!",
        image: "https://picsum.photos/401/300",
      },
    ],
    topStories: [
      {
        id: 1,
        title: "A Spor canlı yayında kritik maç",
        image: "https://picsum.photos/300/200",
        category: "Futbol",
        time: "5 dk önce",
        isLive: true,
      },
      {
        id: 2,
        title: "G.Saray'da Devler Ligi mesaisi",
        image: "https://picsum.photos/301/200",
        category: "Futbol",
        time: "12 dk önce",
      },
      {
        id: 3,
        title: "Icardi'den rekor ve Juventus açıklaması",
        image: "https://picsum.photos/302/200",
        category: "Futbol",
        time: "25 dk önce",
      },
    ],
    futbol: [
      {
        id: 1,
        title: "Süper Lig'de puan durumu güncellendi",
        image: "https://picsum.photos/310/200",
        time: "10 dk önce",
      },
      {
        id: 2,
        title: "Nefesler tutuldu! Derbiden kritik anlar",
        image: "https://picsum.photos/311/200",
        time: "30 dk önce",
      },
      {
        id: 3,
        title: "Beşiktaş antrenmanda hazırlık yaptı",
        image: "https://picsum.photos/312/200",
        time: "1 saat önce",
      },
    ],

    basketbol: [
      {
        id: 1,
        title: "BSL'de bu haftanın programı",
        image: "https://picsum.photos/320/200",
        time: "15 dk önce",
      },
      {
        id: 2,
        title: "EuroLeague'de Türk takımları",
        image: "https://picsum.photos/321/200",
        time: "45 dk önce",
      },
      {
        id: 3,
        title: "Sırt geliştirme hareketleri | İZLE",
        image: "https://picsum.photos/322/200",
        time: "1 saat önce",
      },
    ],

    transfer: [
      {
        id: 1,
        title: "Yaz transferi söylentileri",
        image: "https://picsum.photos/330/200",
        time: "20 dk önce",
      },
      {
        id: 2,
        title: "Yıldız oyuncu için teklif",
        image: "https://picsum.photos/331/200",
        time: "1 saat önce",
      },
      {
        id: 3,
        title: "Kiralık gidenler listesi",
        image: "https://picsum.photos/332/200",
        time: "2 saat önce",
      },
    ],

    popular: [
      {
        id: 1,
        title: "Trabzonspor - Fenerbahçe ilk 11'leri",
        time: "5 dk önce",
      },
    ],
    latest: [
      { id: 1, title: "Son dakika: Kadro açıklaması", time: "2 dk önce" },
    ],
    trend: [{ id: 1, title: "Derbi maçı canlı skor", time: "Şimdi" }],
  };
  return (
    <main className="w-full">
      {/* HERO FULL */}
      <Hero sliders={data.sliders} featured={data.featured} />

      {/* ALT CONTENT */}
      <section className="mt-6">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
            <div className="space-y-6">
              <TopStories posts={data.topStories} />

              <CategorySection title="Futbol" posts={data.futbol} />
              <CategorySection title="Basketbol" posts={data.basketbol} />
              <CategorySection title="Transfer" posts={data.transfer} />
            </div>

            {/* SAĞ (SIDEBAR) */}
            <div className="w-full lg:w-[320px]">
              <Sidebar
                popular={data.popular}
                latest={data.latest}
                trend={data.trend}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

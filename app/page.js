import Hero from "@/components/home/Hero";
import MixedNews from "@/components/home/MixedNews";
import PopularList from "@/components/home/PopularList";
import SideMiniCards from "@/components/home/SideMiniCards";
import Agenda from "@/components/home/Agenda";
import MediaSection from "@/components/home/MediaSection";

export default function Home() {
  const data = {
    sliders: [
      {
        id: 1,
        title: "Asensio'ya beklenmedik talip!",
        image: "https://picsum.photos/1200/800?1",
      },
      {
        id: 2,
        title: "İşte Süper Lig'in sıralamadaki yeri!",
        image: "https://picsum.photos/1200/800?2",
      },
    ],
    featured: [
      {
        id: 1,
        title: "İşte Süper Lig'in sıralamadaki yeri!",
        image: "https://picsum.photos/800/500?3",
      },
      {
        id: 2,
        title: "G.Saraylı yıldıza özel takip!",
        image: "https://picsum.photos/400/300?4",
      },
      {
        id: 3,
        title: "Onuachu tarihe geçiyor!",
        image: "https://picsum.photos/400/300?5",
      },
      {
        id: 4,
        title: "İşlenmiş gıdalara dikkat!",
        image: "https://picsum.photos/400/300?6",
      },
    ],

    mixed: [
      {
        id: 1,
        title: "A Spor canlı yayında kritik maç",
        image: "https://picsum.photos/500/350?7",
        category: "Futbol",
      },
      {
        id: 2,
        title: "Galatasaray'dan teşekkür beratı",
        image: "https://picsum.photos/500/350?8",
        category: "Basketbol",
      },
      {
        id: 3,
        title: "Usta yorumcudan flaş iddia!",
        image: "https://picsum.photos/500/350?9",
        category: "Video",
      },
    ],

    popularList: Array.from({ length: 10 }).map((_, i) => ({
      id: i + 1,
      title: `Popüler konu başlığı ${i + 1}`,
      time: `${i + 2} dk önce`,
    })),

    sideNews: [
      {
        id: 1,
        title: "Trabzon'da çok iyi ağırlandık!",
        image: "https://picsum.photos/200/160?10",
        time: "12 dk önce",
      },
      {
        id: 2,
        title: "Maçtan kareler | İZLE",
        image: "https://picsum.photos/200/160?11",
        time: "30 dk önce",
      },
      {
        id: 3,
        title: "Transferde sürpriz gelişme",
        image: "https://picsum.photos/200/160?12",
        time: "1 saat önce",
      },
    ],

    agenda: [
      {
        id: 1,
        title: "O flaş listede F.Bahçe de var! En zor...",
        image: "https://picsum.photos/1200/800?13",
      },
      {
        id: 2,
        title: "Sadettin Saran: Trabzon'da çok iyi ağırlandık!",
        image: "https://picsum.photos/800/500?14",
      },
      {
        id: 3,
        title: "Trabzonspor kafilesi stadıma ulaştı!",
        image: "https://picsum.photos/800/500?15",
      },
      {
        id: 4,
        title: "Trabzonspor 2-3 Fenerbahçe | MAÇTAN KARELER",
        image: "https://picsum.photos/800/500?16",
      },
      {
        id: 5,
        title: "Kritik maç öncesi son durum",
        image: "https://picsum.photos/800/500?17",
      },
    ],

    videos: [
      {
        id: 1,
        title: "Adalı'dan açıklama!",
        image: "https://picsum.photos/900/600?18",
      },
      {
        id: 2,
        title: "Derbi öncesi son dakika!",
        image: "https://picsum.photos/900/600?19",
      },
      {
        id: 3,
        title: "Canlı yayın: Kritik maç",
        image: "https://picsum.photos/900/600?20",
      },
    ],

    gallery: [
      {
        id: 1,
        title: "RAMS Başakşehir 2-3 Beşiktaş | MAÇTAN KARELER",
        image: "https://picsum.photos/900/600?21",
      },
      {
        id: 2,
        title: "Trabzonspor 2-3 Fenerbahçe | MAÇTAN KARELER",
        image: "https://picsum.photos/900/600?22",
      },
      {
        id: 3,
        title: "Galatasaray 5-1 ... (MAÇTAN KARELER)",
        image: "https://picsum.photos/900/600?23",
      },
      {
        id: 4,
        title: "Haftanın en iyi 10 anı",
        image: "https://picsum.photos/900/600?24",
      },
      {
        id: 5,
        title: "Süper Lig gündem",
        image: "https://picsum.photos/900/600?25",
      },
    ],
  };

  return (
    <main className="w-full">
      {/* HERO */}
      <Hero sliders={data.sliders} featured={data.featured} />

      {/* SLIDER SONRASI: Mixed + Popüler + sağ alan */}
      <section className="max-w-[1400px] mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
          <div className="space-y-10">
            <MixedNews posts={data.mixed} />
            <PopularList posts={data.popularList} />
          </div>

          <SideMiniCards posts={data.sideNews} />
        </div>
      </section>

      {/* FOTOMAÇ GÜNDEM (FULL WIDTH) */}
      <Agenda posts={data.agenda} />

      {/* VIDEO + GALERİ (ORTA) */}
      <MediaSection videos={data.videos} gallery={data.gallery} />
    </main>
  );
}

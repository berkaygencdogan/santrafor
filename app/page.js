import Hero from "@/components/home/Hero";
import MixedNews from "@/components/home/MixedNews";
import SideMiniCards from "@/components/home/SideMiniCards";
import Agenda from "@/components/home/Agenda";
import MediaSection from "@/components/home/MediaSection";
import NewsCard from "@/components/home/NewsCard";

export default function Home() {
  const createPosts = (prefix, count = 5) =>
    Array.from({ length: count }).map((_, i) => ({
      id: i + 1,
      title: `${prefix} haber ${i + 1}`,
      image: `https://picsum.photos/800/500?${prefix}${i}`,
    }));

  const createSide = (prefix) =>
    Array.from({ length: 5 }).map((_, i) => ({
      id: i + 1,
      title: `${prefix} kısa ${i + 1}`,
      image: `https://picsum.photos/200/160?${prefix}s${i}`,
      time: `${i + 5} dk önce`,
    }));

  const createAgenda = (prefix) =>
    Array.from({ length: 5 }).map((_, i) => ({
      id: i + 1,
      title: `${prefix} gündem ${i + 1}`,
      image: `https://picsum.photos/1200/800?${prefix}a${i}`,
    }));

  const createMedia = (prefix) =>
    Array.from({ length: 5 }).map((_, i) => ({
      id: i + 1,
      title: `${prefix} medya ${i + 1}`,
      image: `https://picsum.photos/900/600?${prefix}m${i}`,
    }));

  const categories = {
    futbol: {
      sliders: createPosts("futbol-slider"),
      featured: createPosts("futbol-featured"),
      mixed: createPosts("futbol-mixed"),
      sideNews: createSide("futbol"),
      posts: createPosts("futbol"),
      agenda: createAgenda("futbol"),
      videos: createMedia("futbol-video"),
      gallery: createMedia("futbol-gallery"),
    },

    basketbol: {
      sliders: createPosts("basket-slider"),
      featured: createPosts("basket-featured"),
      mixed: createPosts("basket-mixed"),
      sideNews: createSide("basket"),
      posts: createPosts("basket"),
      agenda: createAgenda("basket"),
      videos: createMedia("basket-video"),
      gallery: createMedia("basket-gallery"),
    },

    voleybol: {
      sliders: createPosts("voley-slider"),
      featured: createPosts("voley-featured"),
      mixed: createPosts("voley-mixed"),
      sideNews: createSide("voley"),
      posts: createPosts("voley"),
      agenda: createAgenda("voley"),
      videos: createMedia("voley-video"),
      gallery: createMedia("voley-gallery"),
    },
  };

  const renderCategory = (cat, title) => (
    <>
      <Agenda posts={cat.agenda} title={title} />

      <div className="max-w-[1400px] mx-auto px-4 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-8">
          {/* SOL GRID */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 items-start">
            {cat.posts.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>

          {/* SAĞ */}
          <SideMiniCards posts={cat.sideNews} />
        </div>
      </div>

      <MediaSection videos={cat.videos} gallery={cat.gallery} />
    </>
  );

  return (
    <main className="w-full">
      {/* HERO */}
      <Hero
        sliders={categories.futbol.sliders}
        featured={categories.futbol.featured}
      />

      {/* ÜST ALAN */}
      <section className="max-w-[1400px] mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
          <MixedNews posts={categories.futbol.mixed} />
          <SideMiniCards posts={categories.futbol.sideNews} />
        </div>
      </section>

      {/* CATEGORY SECTIONS */}
      {renderCategory(categories.futbol, "FUTBOL GÜNDEM")}
      {renderCategory(categories.basketbol, "BASKETBOL GÜNDEM")}
      {renderCategory(categories.voleybol, "VOLEYBOL GÜNDEM")}
    </main>
  );
}

import CategoryBlock from "@/components/home/CategoryBlock";
import Hero from "@/components/home/Hero";
import MixedNews from "@/components/home/MixedNews";
import SideMiniCards from "@/components/home/SideMiniCards";

/* ================= API ================= */

async function getPosts({ sport, type, limit = 5 }) {
  const API = process.env.NEXT_PUBLIC_API_URL;

  const params = new URLSearchParams({
    sport,
    type,
    limit,
  });

  const res = await fetch(`${API}/api/posts?${params}`, {
    cache: "no-store",
  });

  if (!res.ok) return [];

  const data = await res.json();
  return data.data || [];
}

/* ================= MAPPER ================= */

const mapPosts = (arr) =>
  arr.map((p) => ({
    id: p.id,
    title: p.title,
    image: p.cover_image,
    slug: p.slug,
    category: p.sport?.toUpperCase(),
    team: p.team || "",
  }));

/* ================= PAGE ================= */

export default async function Home() {
  /* 🔥 PARALLEL FETCH */
  const [
    futbolNews,
    futbolVideos,
    futbolGallery,
    basketNews,
    basketVideos,
    basketGallery,
    voleyNews,
    voleyVideos,
    voleyGallery,
  ] = await Promise.all([
    getPosts({ sport: "futbol", type: "news", limit: 8 }),
    getPosts({ sport: "futbol", type: "video", limit: 5 }),
    getPosts({ sport: "futbol", type: "gallery", limit: 5 }),

    getPosts({ sport: "basketbol", type: "news", limit: 8 }),
    getPosts({ sport: "basketbol", type: "video", limit: 5 }),
    getPosts({ sport: "basketbol", type: "gallery", limit: 5 }),

    getPosts({ sport: "voleybol", type: "news", limit: 8 }),
    getPosts({ sport: "voleybol", type: "video", limit: 5 }),
    getPosts({ sport: "voleybol", type: "gallery", limit: 5 }),
  ]);

  /* ================= CATEGORY DATA ================= */

  const categories = {
    futbol: {
      sliders: mapPosts(futbolNews.slice(0, 5)),
      featured: mapPosts(futbolNews.slice(0, 4)),
      mixed: mapPosts(futbolNews.slice(0, 6)),
      sideNews: mapPosts(futbolNews.slice(0, 5)),
      posts: mapPosts(futbolNews),
      agenda: mapPosts(futbolNews.slice(0, 5)),
      videos: mapPosts(futbolVideos),
      gallery: mapPosts(futbolGallery),
    },

    basketbol: {
      sliders: mapPosts(basketNews.slice(0, 5)),
      featured: mapPosts(basketNews.slice(0, 4)),
      mixed: mapPosts(basketNews.slice(0, 6)),
      sideNews: mapPosts(basketNews.slice(0, 5)),
      posts: mapPosts(basketNews),
      agenda: mapPosts(basketNews.slice(0, 5)),
      videos: mapPosts(basketVideos),
      gallery: mapPosts(basketGallery),
    },

    voleybol: {
      sliders: mapPosts(voleyNews.slice(0, 5)),
      featured: mapPosts(voleyNews.slice(0, 4)),
      mixed: mapPosts(voleyNews.slice(0, 6)),
      sideNews: mapPosts(voleyNews.slice(0, 5)),
      posts: mapPosts(voleyNews),
      agenda: mapPosts(voleyNews.slice(0, 5)),
      videos: mapPosts(voleyVideos),
      gallery: mapPosts(voleyGallery),
    },
  };

  return (
    <main className="w-full">
      {/* HERO */}
      <Hero
        sliders={categories.futbol?.sliders || []}
        featured={categories.futbol?.featured || []}
      />

      {/* ÜST */}
      <section className="max-w-[1400px] mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
          <MixedNews posts={categories.futbol?.mixed || []} />
          <SideMiniCards posts={categories.futbol?.sideNews || []} />
        </div>
      </section>

      {/* KATEGORİLER */}
      <CategoryBlock cat={categories.futbol} title="FUTBOL GÜNDEM" />
      <CategoryBlock cat={categories.basketbol} title="BASKETBOL GÜNDEM" />
      <CategoryBlock cat={categories.voleybol} title="VOLEYBOL GÜNDEM" />
    </main>
  );
}

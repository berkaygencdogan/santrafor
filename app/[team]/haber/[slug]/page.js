import Link from "next/link";

/* MOCK DATA */
const generatePosts = (team) =>
  Array.from({ length: 20 }).map((_, i) => ({
    slug: `${team}-haber-${i + 1}`,
    title: `Haber ${i + 1}`,
    content: "Detaylı haber içeriği burada...",
    image: `https://picsum.photos/1200/600?${team}${i}`,
    date: `${10 + i} Şubat 2026`,
    author: "Editör",
  }));

export default function Page({ params }) {
  const { team, slug } = params;

  const posts = generatePosts(team);

  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return <div className="text-white p-10">Haber bulunamadı</div>;
  }

  return (
    <div className="bg-[#0B1220] min-h-screen text-white">
      {/* BREADCRUMB */}
      <div className="max-w-[1200px] mx-auto px-4 py-6 text-sm text-gray-400">
        <Link href="/">Anasayfa</Link> /{" "}
        <Link href={`/${team}/futbol`}>{team}</Link> /{" "}
        <span className="text-white">{post.title}</span>
      </div>

      {/* CONTENT */}
      <div className="max-w-[1200px] mx-auto px-4">
        <img
          src={post.image}
          className="w-full h-[500px] object-cover rounded-xl"
        />

        <h1 className="text-3xl font-bold mt-6">{post.title}</h1>

        <div className="text-sm text-gray-400 mt-2 flex gap-4">
          <span>{post.date}</span>
          <span>✍ {post.author}</span>
        </div>

        <div className="mt-6 text-gray-300 leading-7">{post.content}</div>
      </div>
    </div>
  );
}

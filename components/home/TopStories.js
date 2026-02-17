export default function TopStories({ posts = [] }) {
  if (!posts.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 mt-10">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Top Stories</h2>
        <div className="h-[2px] flex-1 bg-gray-200 ml-4" />
      </div>

      {/* GRID */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl overflow-hidden border hover:shadow-md transition cursor-pointer group"
          >
            {/* IMAGE */}
            <div className="relative h-[140px]">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition"
              />

              {/* CANLI */}
              {post.isLive && (
                <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                  CANLI
                </span>
              )}

              {/* CATEGORY */}
              <span className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {post.category}
              </span>
            </div>

            {/* CONTENT */}
            <div className="p-3">
              <h3 className="text-sm font-semibold leading-snug line-clamp-2">
                {post.title}
              </h3>

              <p className="text-xs text-gray-500 mt-2">{post.time}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

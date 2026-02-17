export default function CategorySection({ title, posts = [] }) {
  if (!posts.length) return null;

  return (
    <section className="mt-10">
      {/* HEADER */}
      <div className="flex items-center mb-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <div className="h-[2px] flex-1 bg-gray-200 ml-4" />
      </div>

      {/* GRID */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl border overflow-hidden hover:shadow-md transition cursor-pointer group"
          >
            {/* IMAGE */}
            <div className="h-[140px] overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition"
              />
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

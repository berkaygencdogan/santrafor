export default function PopularList({ posts = [] }) {
  return (
    <section>
      <div className="flex items-center gap-3 mb-3">
        <span className="w-1 h-5 bg-red-500 rounded" />
        <h2 className="font-bold">En Popüler</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((item, i) => (
          <div
            key={item.id}
            className="flex items-start gap-3 border-b border-gray-200 pb-3"
          >
            <span className="text-red-500 font-extrabold text-lg w-6">
              {i + 1}
            </span>
            <div>
              <h4 className="text-sm font-semibold leading-snug">
                {item.title}
              </h4>
              <p className="text-xs text-gray-500">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function SideMiniCards({ posts = [] }) {
  return (
    <aside className="space-y-3 sticky top-4">
      <div className="h-[140px] rounded-xl bg-white border border-gray-200" />

      {posts.map((item) => (
        <div
          key={item.id}
          className="flex gap-2 p-2 border border-gray-200 rounded-lg hover:shadow-sm transition"
        >
          <img
            src={item.image}
            className="w-20 h-16 object-cover rounded"
            alt={item.title}
          />
          <div>
            <p className="text-xs font-semibold leading-snug">{item.title}</p>
            <p className="text-[11px] text-gray-500 mt-1">{item.time}</p>
          </div>
        </div>
      ))}

      <div className="h-[220px] rounded-xl bg-white border border-gray-200" />
    </aside>
  );
}

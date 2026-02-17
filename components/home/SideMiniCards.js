export default function SideMiniCards({ posts = [] }) {
  return (
    <aside className="space-y-3 sticky top-4">
      <div className=" grid grid-cols-1 gap-4">
        {/* REKLAM / WIDGET ALANI */}
        <div className="h-[120px] rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
          REKLAM ALANI
        </div>
      </div>

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
    </aside>
  );
}

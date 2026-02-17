export default function Sidebar({ popular = [], latest = [], trend = [] }) {
  return (
    <aside className="space-y-6">
      {/* POPÜLER */}
      <div className="bg-white rounded-xl border p-4">
        <h3 className="font-semibold mb-3">Popüler</h3>

        <ul className="space-y-3 text-sm">
          {popular.map((item) => (
            <li key={item.id} className="border-b pb-2 last:border-none">
              <p className="font-medium leading-snug">{item.title}</p>
              <span className="text-xs text-gray-500">{item.time}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* SON HABERLER */}
      <div className="bg-white rounded-xl border p-4">
        <h3 className="font-semibold mb-3">Son Haberler</h3>

        <ul className="space-y-3 text-sm">
          {latest.map((item) => (
            <li key={item.id} className="border-b pb-2 last:border-none">
              <p className="font-medium leading-snug">{item.title}</p>
              <span className="text-xs text-gray-500">{item.time}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* TREND */}
      <div className="bg-white rounded-xl border p-4">
        <h3 className="font-semibold mb-3">Trend</h3>

        <ul className="space-y-3 text-sm">
          {trend.map((item) => (
            <li key={item.id} className="border-b pb-2 last:border-none">
              <p className="font-medium leading-snug">{item.title}</p>
              <span className="text-xs text-gray-500">{item.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

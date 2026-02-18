import { sportsData } from "@/lib/sportsData";
import Link from "next/link";

export default function OtherSportsPage() {
  return (
    <div className="bg-[#0B1220] min-h-screen text-white">
      <div className="max-w-[1400px] mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">Diğer Sporlar</h1>

        <div className="grid md:grid-cols-3 gap-6">
          {sportsData.diger.leagues.map((item) => (
            <Link
              key={item.slug}
              href={`/diger-sporlar/${item.slug}`}
              className="bg-[#111827] p-6 rounded-xl hover:bg-[#1a2236] transition group"
            >
              <h3 className="text-xl font-bold group-hover:text-yellow-400 transition">
                {item.name}
              </h3>

              <p className="text-sm text-gray-400 mt-2">Tüm haberleri gör →</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

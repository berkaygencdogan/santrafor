import { sportsData } from "@/lib/sportsData";
import Link from "next/link";

export default function VoleybolPage() {
  const leagues = sportsData?.voleybol?.leagues || [];

  return (
    <div className="max-w-[1400px] mx-auto px-4 mt-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Voleybol</h1>

      <div className="grid md:grid-cols-3 gap-4">
        {leagues.map((item) => (
          <Link
            key={item.slug}
            href={`/voleybol/${item.slug}`}
            className="bg-[#111827] p-6 rounded-xl hover:bg-[#1a2236]"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

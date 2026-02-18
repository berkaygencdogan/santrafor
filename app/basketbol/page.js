import { sportsData } from "@/lib/sportsData";
import Link from "next/link";
import SportNews from "@/components/sport/SportNews";

export default function BasketbolPage() {
  return (
    <div className="w-full mx-auto px-4 mt-10 text-black">
      <h1 className="mx-auto text-center text-3xl font-bold mb-10">
        Basketbol Gündemi
      </h1>

      {sportsData.basketbol.leagues.map((league) => (
        <div key={league.slug} className="mb-14">
          {/* HABERLER */}
          <SportNews
            title={league.name}
            showSidebar={false}
            sport="basketbol"
          />
        </div>
      ))}
    </div>
  );
}

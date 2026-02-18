import SportNews from "@/components/sport/SportNews";
import { sportsData } from "@/lib/sportsData";

export default function FutbolPage() {
  return (
    <div className="w-full mx-auto px-4 mt-10 text-black">
      <h1 className="mx-auto text-center text-3xl font-bold mb-10">
        Futbol Gündemi
      </h1>

      {/* TÜM LİGLER */}
      {sportsData.futbol.leagues.map((league) => (
        <div key={league.slug} className="mb-14">
          {/* HABERLER */}
          <SportNews title={league.name} showSidebar={false} sport="futbol" />
        </div>
      ))}
    </div>
  );
}

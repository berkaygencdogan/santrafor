import Link from "next/link";

const toSlug = (str) =>
  str
    ?.toLowerCase()
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9]/g, "");

export default function SportSwitch({ league, team, currentSport }) {
  const sports = [
    { key: "futbol", label: "Futbol", icon: "⚽" },
    { key: "basketbol", label: "Basketbol", icon: "🏀" },
    { key: "voleybol", label: "Voleybol", icon: "🏐" },
  ];

  const filtered = sports.filter((s) => s.key !== currentSport);

  const leagueSlug = league || "superlig";
  const teamSlug = toSlug(team) || "genel";

  return (
    <div className="max-w-[1400px] mx-auto px-4 mt-10 grid sm:grid-cols-2 gap-6">
      {filtered.map((sport) => (
        <Link
          key={sport.key}
          href={`/${leagueSlug}/${teamSlug}/${sport.key}`}
          className="group bg-[#111827] rounded-2xl p-10 flex flex-col items-center justify-center text-center border border-white/10 hover:border-yellow-400 hover:bg-[#1a2236] transition-all duration-300"
        >
          <div className="text-5xl mb-4 group-hover:scale-110 transition">
            {sport.icon}
          </div>
          <h3 className="text-2xl font-bold group-hover:text-yellow-400 transition">
            {sport.label}
          </h3>
        </Link>
      ))}
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const tabs = ["Tüm Kadro", "Kaleci", "Defans", "Orta Saha", "Hücum"];

const positionMap = {
  24: "Kaleci",
  25: "Defans",
  26: "Orta Saha",
  27: "Hücum",
};

const PAGE_SIZE = 6;
const BASE_HEIGHT = 300;
const ROW_HEIGHT = 52;

const BIG_FOUR = ["galatasaray", "fenerbahce", "besiktas", "trabzonspor"];

export default function TeamSquad({
  squad = [],
  teamName,
  league, // superlig
  teamSlug, // galatasaray
  currentSeason = "2025-2026", // url'den gelen "2024-2025" vs
  seasons = [], // ✅ API’den dinamik gelecek: [{id,name,...}]
}) {
  const [active, setActive] = useState("Tüm Kadro");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [tableHeight, setTableHeight] = useState(BASE_HEIGHT);

  const router = useRouter();
  const pathname = usePathname();

  const isBigFour = BIG_FOUR.includes(teamSlug);

  // sezon dropdown state
  const [season, setSeason] = useState(currentSeason);

  useEffect(() => {
    setSeason(currentSeason);
  }, [currentSeason]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
    setTableHeight(BASE_HEIGHT);
  }, [active, season]);

  const grouped = useMemo(() => {
    const result = {
      "Tüm Kadro": [],
      Kaleci: [],
      Defans: [],
      "Orta Saha": [],
      Hücum: [],
    };

    (squad || []).forEach((item) => {
      const pos = positionMap[item.position_id] || "Orta Saha";

      const player = {
        id: item.id,
        no: item.number || "-",
        name: item.name,
        photo: item.photo,
      };

      result[pos].push(player);
      result["Tüm Kadro"].push(player);
    });

    result["Tüm Kadro"].sort((a, b) => {
      const na = isNaN(a.no) ? 999 : Number(a.no);
      const nb = isNaN(b.no) ? 999 : Number(b.no);
      return na - nb;
    });

    return result;
  }, [squad]);

  const players = grouped[active] || [];
  const visiblePlayers = players.slice(0, visibleCount);
  const hasMore = visibleCount < players.length;

  const handleLoadMore = () => {
    setVisibleCount((c) => c + PAGE_SIZE);
    setTableHeight((h) => h + PAGE_SIZE * ROW_HEIGHT);
  };

  const toSlug = (name) =>
    name
      .toLowerCase()
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ı/g, "i")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c")
      .replace(/\s+/g, "-");

  const seasonNameToSlug = (name) => (name || "").replace(/\//g, "-"); // "2024/2025" -> "2024-2025"
  const seasonSlugToUi = (slug) => (slug || "").replace("-", "/"); // "2024-2025" -> "2024/2025"

  const handleSeasonChange = (newSeasonSlug) => {
    setSeason(newSeasonSlug);

    if (!isBigFour) return;

    // seçilen sezon zaten sayfadaysa hiçbir şey yapma
    if (newSeasonSlug === currentSeason) return;

    // kadro sezon sayfasına git
    router.push(`/${league}/${teamSlug}/kadro/${newSeasonSlug}`);
  };

  // dropdown option listesi: seasons API gelirse onu kullan, yoksa currentSeason'i en azından göster
  const seasonOptions = useMemo(() => {
    if (!seasons?.length) {
      return [
        {
          key: `cur-${currentSeason}`,
          label: seasonSlugToUi(currentSeason),
          value: currentSeason,
        },
      ];
    }

    const seen = new Set(); // value (2025-2026) duplicate olabilir
    const out = [];

    for (const s of seasons) {
      const value = seasonNameToSlug(s?.name); // 2025-2026
      if (!value) continue;

      // aynı sezon ismi tekrar ediyorsa TEK kez göster
      if (seen.has(value)) continue;
      seen.add(value);

      out.push({
        key: s?.id ? `season-${s.id}` : `season-${value}-${out.length}`, // ✅ unique key
        label: s.name, // 2025/2026
        value, // 2025-2026
      });
    }

    // en azından currentSeason listede yoksa ekle
    if (!seen.has(currentSeason)) {
      out.unshift({
        key: `cur-${currentSeason}`,
        label: seasonSlugToUi(currentSeason),
        value: currentSeason,
      });
    }

    return out;
  }, [seasons, currentSeason]);

  return (
    <div className="bg-[#111827] rounded-xl border-2 border-white/90 flex flex-col">
      {/* HEADER */}
      <div className="bg-[#1f2937] py-3 font-bold text-green-400 px-4 flex items-center justify-between gap-3">
        <div className="text-center flex-1">
          {teamName?.toUpperCase()} KADROSU
        </div>

        {isBigFour ? (
          <select
            value={season}
            onChange={(e) => handleSeasonChange(e.target.value)}
            className="bg-[#111827] text-white text-sm font-semibold rounded-lg px-3 py-2 border border-white/10 outline-none"
          >
            {seasonOptions.map((opt) => (
              <option key={opt.key} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          <div className="text-sm text-gray-300 font-semibold">
            {seasonSlugToUi(currentSeason)}
          </div>
        )}
      </div>

      {/* TABS */}
      <div className="flex text-sm border-b border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`flex-1 py-3 font-semibold transition ${
              active === tab
                ? "text-white border-b-2 border-red-500"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="text-sm flex flex-col">
        <div className="grid grid-cols-[40px_1fr] px-4 py-2 text-gray-400 border-b border-white/10 bg-[#111827]">
          <span>#</span>
          <span>Oyuncu</span>
        </div>

        <div
          style={{ height: tableHeight }}
          className="
            overflow-y-auto pr-2
            scrollbar scrollbar-w-3 scrollbar-thumb-gray-600 scrollbar-track-white/5
          "
        >
          {visiblePlayers.map((p, i) => (
            <div
              key={p.id ?? `${p.name}-${i}`}
              className="grid grid-cols-[40px_1fr] items-center px-4 py-3 border-b border-white/5 hover:bg-white/5 transition cursor-pointer"
              onClick={() => router.push(`${pathname}/${toSlug(p.name)}`)}
            >
              <span className="text-gray-400">{p.no}</span>

              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={p.photo}
                  alt={p.name}
                  className="w-8 h-8 rounded-full object-cover bg-white/10"
                />
                <span className="font-medium truncate">{p.name}</span>
              </div>
            </div>
          ))}

          {!players.length && (
            <div className="p-4 text-gray-500 text-center">Veri bulunamadı</div>
          )}
        </div>

        {players.length > 0 && (
          <div className="px-4 py-3 border-t border-white/10">
            {hasMore ? (
              <button
                onClick={handleLoadMore}
                className="w-full rounded-xl py-2 bg-white/5 hover:bg-white/10 transition text-sm font-semibold text-gray-200"
              >
                Daha fazla göster ({visiblePlayers.length}/{players.length})
              </button>
            ) : (
              <div className="text-center text-xs text-gray-500">
                Tüm oyuncular gösteriliyor ({players.length})
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

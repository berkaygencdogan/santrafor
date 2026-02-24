"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

function usePoll(url, { interval = 20000 } = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      setLoading(true);
      const r = await fetch(url, { cache: "no-store" });
      const j = await r.json();
      setData(j?.data || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let t;
    load();
    t = setInterval(load, interval);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, interval]);

  return { data, loading, refetch: load };
}

function normalizeUtcIso(dateStr) {
  if (!dateStr) return null;

  let s = String(dateStr).trim();

  // "2026-02-23 20:00:00" -> "2026-02-23T20:00:00"
  if (s.includes(" ") && !s.includes("T")) s = s.replace(" ", "T");

  // Eğer timezone bilgisi yoksa (Z veya +03:00 gibi) -> UTC kabul edip Z ekle
  const hasTZ = /([zZ]|[+\-]\d{2}:\d{2})$/.test(s);
  if (!hasTZ) s += "Z";

  return s;
}

function formatTimeTR(isoLike) {
  const iso = normalizeUtcIso(isoLike);
  if (!iso) return "--:--";

  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "--:--";

  return d.toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Istanbul",
  });
}

function FavoriteStar({ id }) {
  const key = "fav_matches";
  const [fav, setFav] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(key);
    const arr = raw ? JSON.parse(raw) : [];
    setFav(arr.includes(id));
  }, [id]);

  function toggle() {
    const raw = localStorage.getItem(key);
    const arr = raw ? JSON.parse(raw) : [];
    const next = fav ? arr.filter((x) => x !== id) : [...new Set([...arr, id])];
    localStorage.setItem(key, JSON.stringify(next));
    setFav(!fav);
  }

  return (
    <button
      onClick={toggle}
      className="grid h-8 w-8 place-items-center rounded-lg border border-gray-200 hover:bg-gray-50"
      title="Favori"
      aria-label="Favori"
      type="button"
    >
      <span className={fav ? "text-yellow-500" : "text-gray-400"}>★</span>
    </button>
  );
}

function TeamCell({ team }) {
  return (
    <div className="flex items-center gap-2 min-w-0">
      {team?.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={team.logo}
          alt={team?.name || ""}
          className="h-5 w-5 rounded-full"
        />
      ) : (
        <div className="h-5 w-5 rounded-full bg-gray-200" />
      )}
      <span className="truncate text-sm font-medium text-gray-900">
        {team?.name || "-"}
      </span>
    </div>
  );
}

function MatchRow({ m }) {
  const router = useRouter();

  const time = formatTimeTR(m.startingAt);

  const showScore = m?.score?.home !== null && m?.score?.away !== null;
  const homeScore = showScore ? m.score.home : "-";
  const awayScore = showScore ? m.score.away : "-";

  function goDetail() {
    router.push(`/matches/${m.id}`);
  }

  return (
    <div
      onClick={goDetail}
      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition"
    >
      <div className="w-20 flex flex-col gap-1">
        <div className="text-sm font-semibold text-gray-900">{time}</div>
      </div>

      <div className="flex-1 grid grid-cols-[1fr_auto_1fr] items-center gap-3 min-w-0">
        <TeamCell team={m.home} />
        <div className="text-sm font-bold text-gray-900 tabular-nums">
          {homeScore} - {awayScore}
        </div>
        <div className="flex justify-end min-w-0">
          <TeamCell team={m.away} />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* yıldıza tıklayınca sayfa gitmesin */}
        <div onClick={(e) => e.stopPropagation()}>
          <FavoriteStar id={m.id} />
        </div>
      </div>
    </div>
  );
}

function LeagueSection({ group }) {
  const { league, matches } = group;
  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-50 px-4 py-2">
        {league?.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={league.image}
            alt={league?.name || ""}
            className="h-5 w-5 rounded"
          />
        ) : (
          <div className="h-5 w-5 rounded bg-gray-200" />
        )}
        <div className="text-sm font-bold text-gray-900">{league?.name}</div>
        {league?.country ? (
          <div className="ml-2 text-xs text-gray-500">{league.country}</div>
        ) : null}
      </div>

      <div className="divide-y divide-gray-100">
        {(matches || []).map((m) => (
          <MatchRow key={m.id} m={m} />
        ))}
      </div>
    </section>
  );
}

export default function MatchesPage() {
  const [tab, setTab] = useState("today"); // today | live

  // Türkiye saatiyle bugünün tarihi (ISO date)
  const todayStr = useMemo(() => {
    const now = new Date();
    // basit: local date -> YYYY-MM-DD
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  const url =
    tab === "live"
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/matches/live`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/matches/today?date=${todayStr}`;

  const { data, loading } = usePoll(url, {
    interval: tab === "live" ? 15000 : 60000,
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold text-white">Maçlar</h1>

        <div className="flex overflow-hidden rounded-xl border border-gray-200 bg-white">
          <button
            className={`px-4 py-2 text-sm font-semibold ${
              tab === "today"
                ? "bg-gray-900 text-white"
                : "text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => setTab("today")}
            type="button"
          >
            Bugün
          </button>
          <button
            className={`px-4 py-2 text-sm font-semibold ${
              tab === "live"
                ? "bg-gray-900 text-white"
                : "text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => setTab("live")}
            type="button"
          >
            Canlı
          </button>
        </div>
      </div>

      {loading && !data?.length ? (
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-600">
          Yükleniyor...
        </div>
      ) : null}

      {!loading && (!data || data.length === 0) ? (
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-600">
          Maç bulunamadı.
        </div>
      ) : null}

      <div className="space-y-4">
        {(data || []).map((g) => (
          <LeagueSection key={g?.league?.id || g?.league?.name} group={g} />
        ))}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { FaFutbol, FaExchangeAlt, FaSquare, FaTv } from "react-icons/fa";
import { GiGoalKeeper } from "react-icons/gi";

const API = process.env.NEXT_PUBLIC_API_URL;

function cn(...a) {
  return a.filter(Boolean).join(" ");
}

function getHomeAway(participants = []) {
  const home = participants.find((p) => p?.meta?.location === "home");
  const away = participants.find((p) => p?.meta?.location === "away");
  return { home, away };
}

function getCurrentScore(scores = []) {
  // senin datada CURRENT description var :contentReference[oaicite:2]{index=2}
  const home = scores.find(
    (s) => s?.description === "CURRENT" && s?.score?.participant === "home",
  )?.score?.goals;
  const away = scores.find(
    (s) => s?.description === "CURRENT" && s?.score?.participant === "away",
  )?.score?.goals;
  return {
    home: home ?? "-",
    away: away ?? "-",
  };
}

function formatDateTRFromUnixSeconds(sec) {
  if (!sec) return "-";
  const d = new Date(sec * 1000);
  return d.toLocaleDateString("tr-TR", {
    timeZone: "Europe/Istanbul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function formatTimeTRFromUnixSeconds(sec) {
  if (!sec) return "--:--";
  const d = new Date(sec * 1000);
  return d.toLocaleTimeString("tr-TR", {
    timeZone: "Europe/Istanbul",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function TabButton({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "px-5 py-2 text-sm font-semibold rounded-full transition",
        active
          ? "bg-[#0B1530] text-white shadow"
          : "text-gray-700 hover:bg-gray-100",
      )}
    >
      {children}
    </button>
  );
}

function getGoalDetailIcon(ev) {
  const info = (ev?.info || ev?.addition || "").toLowerCase();

  if (!info) return null;

  if (info.includes("header")) {
    return <img src="/head.png" className=" w-20" alt="header" />;
  }

  if (info.includes("right")) {
    return <img src="/right-foot.png" className=" w-20" alt="right foot" />;
  }

  if (info.includes("left")) {
    return <img src="/left-foot.png" className=" w-20" alt="left foot" />;
  }

  return null;
}
function getEventIcon(ev) {
  const type = ev?.type?.name?.toLowerCase() || "";
  const info = (ev?.info || ev?.addition || "").toLowerCase();

  if (type.includes("own goal")) {
    return <FaFutbol className="text-red-600" />;
  }

  if (type.includes("goal")) {
    return <FaFutbol className="text-green-600" />;
  }

  if (type.includes("var")) {
    if (info.includes("disallowed")) {
      return <FaTv className="text-red-600" />;
    } else {
      return <FaTv className="text-green-600" />;
    }
  }

  if (type.includes("substitution")) {
    return <FaExchangeAlt className="text-blue-600" />;
  }

  if (type.includes("yellow")) {
    return <FaSquare className="text-yellow-400" />;
  }

  if (type.includes("red")) {
    return <FaSquare className="text-red-600" />;
  }

  if (type.includes("penalty")) {
    return <GiGoalKeeper className="text-green-600" />;
  }

  return <span>•</span>;
}

function EventRow({ ev, side }) {
  const minute = ev?.minute != null ? `${ev.minute}'` : "-";
  const type = ev?.type?.name || "";
  const player = ev?.player?.display_name || ev?.player_name || "-";
  const info = ev?.info || ev?.addition || "";
  const isRight = side === "away";

  return (
    <div
      className={cn(
        "flex items-center gap-3 py-3",
        isRight ? "justify-end" : "justify-start",
      )}
    >
      {!isRight && (
        <div className="w-12 text-center font-semibold text-[#0B1530]">
          {minute}
        </div>
      )}

      <div
        className={cn(
          "max-w-[420px] w-full rounded-xl border border-gray-200 bg-white px-4 py-3",
          "flex items-center gap-3",
          isRight ? "flex-row-reverse text-right" : "text-left",
        )}
      >
        {/* 🔥 SOL → ANA ICON */}
        <div className="text-lg shrink-0 text-black">{getEventIcon(ev)}</div>

        {/* 🔥 ORTA → TEXT */}
        <div className="flex-1 min-w-0">
          <div className="text-sm font-bold text-gray-900 truncate">
            {player}
          </div>
          <div className="text-xs text-gray-500">
            {type}
            {info ? ` • ${info}` : ""}
          </div>
        </div>

        {/* 🔥 SAĞ → DETAY ICON */}
        {ev?.type?.name?.toLowerCase().includes("goal") && (
          <div>{getGoalDetailIcon(ev)}</div>
        )}
      </div>

      {isRight && (
        <div className="w-12 text-center font-semibold text-[#0B1530]">
          {minute}
        </div>
      )}
    </div>
  );
}

function EventsTab({ fixture }) {
  const events = fixture?.events || [];
  const { home, away } = getHomeAway(fixture?.participants || []);

  // sağ/sol ayırma (participant_id ile)
  const homeEvents = events.filter((e) => e?.participant_id === home?.id);
  const awayEvents = events.filter((e) => e?.participant_id === away?.id);

  // dakikaya göre
  homeEvents.sort((a, b) => (a.minute || 0) - (b.minute || 0));
  awayEvents.sort((a, b) => (a.minute || 0) - (b.minute || 0));

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="mb-4 text-center text-lg font-extrabold text-[#0B1530]">
        Önemli Anlar
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="mb-2 flex items-center gap-2">
            {home?.image_path ? (
              <img src={home.image_path} className="h-6 w-6" alt="" />
            ) : null}
            <div className="font-bold text-gray-900">{home?.name}</div>
          </div>
          <div className="divide-y divide-gray-100">
            {homeEvents.map((ev) => (
              <EventRow key={ev.id} ev={ev} side="home" />
            ))}
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-end gap-2">
            <div className="font-bold text-gray-900">{away?.name}</div>
            {away?.image_path ? (
              <img src={away.image_path} className="h-6 w-6" alt="" />
            ) : null}
          </div>
          <div className="divide-y divide-gray-100">
            {awayEvents.map((ev) => (
              <EventRow key={ev.id} ev={ev} side="away" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LineupsTab({ fixture }) {
  const lineups = fixture?.lineups || [];
  const { home, away } = getHomeAway(fixture?.participants || []);

  const startersHome = lineups.filter(
    (x) => x?.team_id === home?.id && x?.type?.code === "lineup",
  );
  const benchHome = lineups.filter(
    (x) => x?.team_id === home?.id && x?.type?.code === "bench",
  );
  const startersAway = lineups.filter(
    (x) => x?.team_id === away?.id && x?.type?.code === "lineup",
  );
  const benchAway = lineups.filter(
    (x) => x?.team_id === away?.id && x?.type?.code === "bench",
  );

  // formation_field ör: "1:1" gibi geliyor, saha çizimi ayrı yapılır.
  // Şimdilik “kadrolar + yedekler” kısmını resimdeki gibi listeliyoruz.
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="mb-4 text-center text-lg font-extrabold text-[#0B1530]">
        Kadrolar
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="mb-3 flex items-center gap-2">
            {home?.image_path ? (
              <img src={home.image_path} className="h-7 w-7" alt="" />
            ) : null}
            <div className="font-bold">{home?.name}</div>
          </div>

          <div className="mb-2 text-sm font-semibold text-gray-700">İlk 11</div>
          <div className="space-y-2">
            {startersHome.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-3 rounded-xl border border-gray-200 px-3 py-2"
              >
                <img
                  src={p?.player?.image_path}
                  className="h-9 w-9 rounded-full"
                  alt=""
                />
                <div className="min-w-0">
                  <div className="truncate text-sm font-bold text-gray-900">
                    {p?.player?.display_name || p?.player_name}
                  </div>
                  <div className="text-xs text-gray-500">
                    #{p?.jersey_number ?? "-"}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 mb-2 text-sm font-semibold text-gray-700">
            Yedekler
          </div>
          <div className="space-y-2">
            {benchHome.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-3 rounded-xl border border-gray-200 px-3 py-2"
              >
                <img
                  src={p?.player?.image_path}
                  className="h-9 w-9 rounded-full"
                  alt=""
                />
                <div className="min-w-0">
                  <div className="truncate text-sm font-bold text-gray-900">
                    {p?.player?.display_name || p?.player_name}
                  </div>
                  <div className="text-xs text-gray-500">
                    #{p?.jersey_number ?? "-"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-end gap-2">
            <div className="font-bold">{away?.name}</div>
            {away?.image_path ? (
              <img src={away.image_path} className="h-7 w-7" alt="" />
            ) : null}
          </div>

          <div className="mb-2 text-sm font-semibold text-gray-700 text-right">
            İlk 11
          </div>
          <div className="space-y-2">
            {startersAway.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-end gap-3 rounded-xl border border-gray-200 px-3 py-2"
              >
                <div className="min-w-0 text-right">
                  <div className="truncate text-sm font-bold text-gray-900">
                    {p?.player?.display_name || p?.player_name}
                  </div>
                  <div className="text-xs text-gray-500">
                    #{p?.jersey_number ?? "-"}
                  </div>
                </div>
                <img
                  src={p?.player?.image_path}
                  className="h-9 w-9 rounded-full"
                  alt=""
                />
              </div>
            ))}
          </div>

          <div className="mt-6 mb-2 text-sm font-semibold text-gray-700 text-right">
            Yedekler
          </div>
          <div className="space-y-2">
            {benchAway.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-end gap-3 rounded-xl border border-gray-200 px-3 py-2"
              >
                <div className="min-w-0 text-right">
                  <div className="truncate text-sm font-bold text-gray-900">
                    {p?.player?.display_name || p?.player_name}
                  </div>
                  <div className="text-xs text-gray-500">
                    #{p?.jersey_number ?? "-"}
                  </div>
                </div>
                <img
                  src={p?.player?.image_path}
                  className="h-9 w-9 rounded-full"
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatsBar({ label, left, right }) {
  const L = Number(left ?? 0);
  const R = Number(right ?? 0);
  const total = L + R;
  const lp = total > 0 ? (L / total) * 100 : 50;

  return (
    <div className="py-3">
      <div className="mb-2 flex items-center justify-between text-sm">
        <div className="font-semibold text-gray-900 tabular-nums">
          {left ?? 0}
        </div>
        <div className="font-semibold text-gray-600">{label}</div>
        <div className="font-semibold text-gray-900 tabular-nums">
          {right ?? 0}
        </div>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div className="h-2 bg-[#2BA9FF]" style={{ width: `${lp}%` }} />
      </div>
    </div>
  );
}

function StatsTab({ fixture }) {
  const stats = fixture?.statistics || [];
  const { home, away } = getHomeAway(fixture?.participants || []);

  // ✅ 1. DEFAULT STAT LİSTESİ (her zaman gözükecek)
  const defaultStats = [
    { key: "Ball Possession %", label: "Topa Sahip Olma" },
    { key: "Shots Total", label: "Toplam Şut" },
    { key: "Shots On Target", label: "İsabetli Şut" },
    { key: "Passes", label: "Pas" },
    { key: "Corners", label: "Korner" },
    { key: "Fouls", label: "Faul" },
    { key: "Yellowcards", label: "Sarı Kart" },
    { key: "Redcards", label: "Kırmızı Kart" },
  ];

  // ✅ 2. MAP oluştur (default 0 değerli)
  const map = new Map();

  defaultStats.forEach((s) => {
    map.set(s.key, {
      label: s.label,
      home: 0,
      away: 0,
    });
  });

  // ✅ 3. API’den gelenleri override et
  for (const s of stats) {
    const rawKey = s?.type?.name || s?.type?.code;

    if (!rawKey) continue;

    // SportMonks key'lerini normalize et
    let key = rawKey;

    // 🔥 burada mapping yapıyoruz (API farklı isim döndürebilir)
    if (rawKey.includes("Possession")) key = "Ball Possession %";
    if (rawKey.includes("Shots Total")) key = "Shots Total";
    if (rawKey.includes("Shots On Target")) key = "Shots On Target";
    if (rawKey.includes("Passes")) key = "Passes";
    if (rawKey.includes("Corners")) key = "Corners";
    if (rawKey.includes("Fouls")) key = "Fouls";
    if (rawKey.includes("Yellow")) key = "Yellowcards";
    if (rawKey.includes("Red")) key = "Redcards";

    if (!map.has(key)) continue;

    const value = s?.data?.value ?? s?.value ?? 0;

    if (s?.participant_id === home?.id) map.get(key).home = value;
    if (s?.participant_id === away?.id) map.get(key).away = value;
  }

  const list = Array.from(map.values());

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="mb-4 text-center text-lg font-extrabold text-[#0B1530]">
        İstatistikler
      </div>

      <div className="space-y-2">
        {list.map((x) => (
          <StatsBar
            key={x.label}
            label={x.label}
            left={x.home}
            right={x.away}
          />
        ))}
      </div>
    </div>
  );
}

function VenueTab({ fixture }) {
  const v = fixture?.venue;
  const w = fixture?.weatherReport;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="mb-4 text-center text-lg font-extrabold text-[#0B1530]">
        Stad Bilgileri
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div>
          {v?.image_path ? (
            <img
              src={v.image_path}
              alt=""
              className="w-full rounded-2xl border border-gray-200"
            />
          ) : (
            <div className="h-64 w-full rounded-2xl border border-gray-200 bg-gray-50" />
          )}
        </div>

        <div className="space-y-3">
          <div className="rounded-xl border border-gray-200 p-4">
            <div className="text-sm font-semibold text-gray-600">Stad</div>
            <div className="text-lg font-extrabold text-gray-900">
              {v?.name || "-"}
            </div>
            <div className="mt-2 text-sm text-gray-700">
              <div>
                <span className="font-semibold">Şehir:</span>{" "}
                {v?.city_name || "-"}
              </div>
              <div>
                <span className="font-semibold">Kapasite:</span>{" "}
                {v?.capacity ?? "-"}
              </div>
              <div>
                <span className="font-semibold">Zemin:</span>{" "}
                {v?.surface || "-"}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 p-4">
            <div className="text-sm font-semibold text-gray-600">
              Hava Durumu
            </div>
            <div className="mt-2 grid grid-cols-2 gap-3 text-sm text-gray-700">
              <div>
                <span className="font-semibold">Sıcaklık:</span>{" "}
                {w?.temperature?.celsius ?? "-"}°C
              </div>
              <div>
                <span className="font-semibold">Bulut:</span> {w?.clouds ?? "-"}
                %
              </div>
              <div>
                <span className="font-semibold">Rüzgar:</span>{" "}
                {w?.wind?.speed ?? "-"}
              </div>
              <div>
                <span className="font-semibold">Nem:</span> {w?.humidity ?? "-"}
                %
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MatchDetailPage() {
  const params = useParams();
  const id = params.id;

  const [fixture, setFixture] = useState(null);
  const [tab, setTab] = useState("events"); // events | lineups | stats | venue
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    async function load() {
      setLoading(true);
      const r = await fetch(`${API}/api/fixtures/${id}`, { cache: "no-store" });
      const j = await r.json();
      if (!alive) return;
      setFixture(j?.data || null);
      setLoading(false);
    }

    load();
    return () => {
      alive = false;
    };
  }, [id]);

  const { home, away } = useMemo(
    () => getHomeAway(fixture?.participants || []),
    [fixture],
  );
  const score = useMemo(
    () => getCurrentScore(fixture?.scores || []),
    [fixture],
  );
  const dateTR = formatDateTRFromUnixSeconds(fixture?.starting_at_timestamp);
  const timeTR = formatTimeTRFromUnixSeconds(fixture?.starting_at_timestamp);
  const leagueName = fixture?.league?.name || "-";
  const venueName = fixture?.venue?.name || "-";
  const stateShort = fixture?.state?.short_name || fixture?.state?.state || "-";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {loading && !fixture ? (
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-600">
          Yükleniyor...
        </div>
      ) : null}

      {fixture ? (
        <>
          {/* TOP SCORE CARD */}
          <div className="overflow-hidden rounded-3xl border border-[#0B1530]/20 bg-gradient-to-r from-[#07112A] via-[#0B2147] to-[#07112A] p-6 text-white">
            <div className="flex items-center justify-between text-sm opacity-90">
              <div className="flex items-center gap-2">
                <span className="opacity-80">{dateTR}</span>
                <span className="opacity-50">•</span>
                <span className="font-semibold">{timeTR}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{leagueName}</span>
                <span className="opacity-50">•</span>
                <span className="opacity-90">{venueName}</span>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-10">
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-xl font-extrabold">
                    {home?.name || "-"}
                  </div>
                </div>
                {home?.image_path ? (
                  <img src={home.image_path} className="h-16 w-16" alt="" />
                ) : null}
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="text-xs font-bold opacity-90">{stateShort}</div>
                <div className="rounded-full bg-[#0B1530] px-10 py-4 text-2xl font-extrabold tabular-nums">
                  {score.home} - {score.away}
                </div>
              </div>

              <div className="flex items-center gap-4">
                {away?.image_path ? (
                  <img src={away.image_path} className="h-16 w-16" alt="" />
                ) : null}
                <div className="text-left">
                  <div className="text-xl font-extrabold">
                    {away?.name || "-"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TABS */}
          <div className="mt-6 flex justify-center">
            <div className="flex gap-2 rounded-full border border-gray-200 bg-white p-2">
              <TabButton
                active={tab === "events"}
                onClick={() => setTab("events")}
              >
                Önemli Anlar
              </TabButton>
              <TabButton
                active={tab === "lineups"}
                onClick={() => setTab("lineups")}
              >
                Kadrolar
              </TabButton>
              <TabButton
                active={tab === "stats"}
                onClick={() => setTab("stats")}
              >
                İstatistikler
              </TabButton>
              <TabButton
                active={tab === "venue"}
                onClick={() => setTab("venue")}
              >
                Stad
              </TabButton>
            </div>
          </div>

          {/* TAB CONTENT */}
          <div className="mt-6">
            {tab === "events" && <EventsTab fixture={fixture} />}
            {tab === "lineups" && <LineupsTab fixture={fixture} />}
            {tab === "stats" && <StatsTab fixture={fixture} />}
            {tab === "venue" && <VenueTab fixture={fixture} />}
          </div>
        </>
      ) : null}
    </div>
  );
}

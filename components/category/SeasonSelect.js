"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export default function SeasonSelect({
  league, // "superlig"
  teamSlug, // "galatasaray"
  currentSeason, // "2024-2025"
  seasons = [], // [{id,name,...}] => name: "2024/2025"
}) {
  const router = useRouter();
  const [value, setValue] = useState(currentSeason);

  const options = useMemo(() => {
    const toSlug = (name) => (name || "").replace(/\//g, "-"); // 2024/2025 -> 2024-2025

    // seasons içinden duplicate name varsa tekilleştir
    const seen = new Set();
    const out = [];

    for (const s of seasons || []) {
      const slug = toSlug(s?.name);
      if (!slug || seen.has(slug)) continue;
      seen.add(slug);
      out.push({ label: s.name, value: slug });
    }

    // hiç sezon gelmezse en az currentSeason göster
    if (!out.length && currentSeason) {
      out.push({
        label: currentSeason.replace("-", "/"),
        value: currentSeason,
      });
    }

    return out;
  }, [seasons, currentSeason]);

  const onChange = (e) => {
    const next = e.target.value;
    setValue(next);

    if (!next || next === currentSeason) return;

    router.push(`/${league}/${teamSlug}/kadro/${next}`);
  };

  return (
    <select
      value={value}
      onChange={onChange}
      className="bg-[#111827] text-white text-sm font-semibold rounded-lg px-3 py-2 border border-white/10 outline-none"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

"use client";

import { useState, useMemo } from "react";

export default function TagSelector({ tags, selected, onChange, onCreateTag }) {
  const [search, setSearch] = useState("");
  const [creating, setCreating] = useState(false);

  /* ================= FILTER ================= */
  const filtered = useMemo(() => {
    return tags.filter((t) =>
      t.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [tags, search]);

  /* ================= GROUP ================= */
  const grouped = useMemo(() => {
    return {
      league: filtered.filter((t) => t.type === "league"),
      team: filtered.filter((t) => t.type === "team"),
      general: filtered.filter((t) => !t.type || t.type === "general"),
    };
  }, [filtered]);

  /* ================= TOGGLE ================= */
  const toggle = (id) => {
    if (selected.includes(id)) {
      onChange(selected.filter((i) => i !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  /* ================= CREATE ================= */
  const handleCreate = async () => {
    if (!search.trim()) return;

    setCreating(true);

    const newTag = await onCreateTag(search);

    if (newTag) {
      onChange([...selected, newTag.id]);
      setSearch("");
    }

    setCreating(false);
  };

  /* ================= SELECTED TAGS ================= */
  const selectedTags = selected
    .map((id) => tags.find((t) => t.id === id))
    .filter(Boolean);

  /* ================= GROUP RENDER ================= */
  const renderGroup = (title, items) => {
    if (!items.length) return null;

    return (
      <div className="mb-4">
        <p className="text-xs text-gray-400 mb-2">{title}</p>

        <div className="flex flex-wrap gap-2">
          {items.map((t) => {
            const isSelected = selected.includes(t.id);

            return (
              <button
                key={t.id}
                onClick={() => toggle(t.id)}
                className={`px-3 py-1 rounded-full text-sm transition
                  ${
                    isSelected
                      ? "bg-yellow-400 text-black"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
              >
                {t.name}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#020617] p-3 rounded-lg border border-white/10">
      {/* 🔍 SEARCH + ADD */}
      <div className="flex gap-2 mb-3">
        <input
          placeholder="Etiket ara veya ekle..."
          className="flex-1 p-2 rounded bg-black text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={handleCreate}
          disabled={creating}
          className="px-3 bg-green-500 text-black rounded text-sm"
        >
          +
        </button>
      </div>

      {/* 🔥 SEÇİLEN TAGLER (ÜSTTE) */}
      {selectedTags.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-yellow-400 mb-2">Seçilenler</p>

          <div className="flex flex-wrap gap-2">
            {selectedTags.map((t) => (
              <button
                key={t.id}
                onClick={() => toggle(t.id)}
                className="px-3 py-1 rounded-full text-sm bg-yellow-400 text-black"
              >
                #{t.name} ✕
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 🔥 DİĞER ÜSTÜNDE SELECTED GÖRÜNÜYOR */}
      {renderGroup("🏆 Ligler", grouped.league)}
      {renderGroup("⚽ Takımlar", grouped.team)}
      {renderGroup("🏷️ Diğer", grouped.general)}
    </div>
  );
}

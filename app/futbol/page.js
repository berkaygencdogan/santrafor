"use client";

import { useEffect, useState, useMemo } from "react";
import SportNews from "@/components/sport/SportNews";
import SportHero from "@/components/sport/SportHero";

export default function FutbolPage() {
  const API = process.env.NEXT_PUBLIC_API_URL;

  const [leagues, setLeagues] = useState([]);
  const [heroPosts, setHeroPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const HIDDEN_LEAGUES = [24, 570, 390, 27];
  const TIER_ORDER = [8, 564, 384, 82, 301, 2, 3];

  useEffect(() => {
    if (!API) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const [postsRes, leaguesRes] = await Promise.all([
          fetch(`${API}/api/posts/featured`).then((r) => r.json()),
          fetch(`${API}/api/sport/leagues`).then((r) => r.json()),
        ]);

        console.log("🔥 HERO POSTS:", postsRes.data);
        console.log("🔥 LEAGUES:", leaguesRes.data);

        setHeroPosts(postsRes?.data || []);
        setLeagues(leaguesRes?.data || []);
      } catch (err) {
        console.log("FETCH ERROR:", err);
        setError("Veriler alınamadı");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API]);

  /* 🔥 LEAGUE SIRALAMA */
  const sortedLeagues = useMemo(() => {
    return leagues
      .filter((l) => l && !HIDDEN_LEAGUES.includes(l.id))
      .sort((a, b) => {
        const aIndex = TIER_ORDER.indexOf(a.id);
        const bIndex = TIER_ORDER.indexOf(b.id);

        if (aIndex === -1 && bIndex === -1) return 0;
        if (aIndex === -1) return 1;
        if (bIndex === -1) return -1;

        return aIndex - bIndex;
      });
  }, [leagues]);

  /* 🔥 LOADING */
  if (loading) {
    return <div className="text-center mt-20 text-gray-400">Yükleniyor...</div>;
  }

  /* 🔥 ERROR */
  if (error) {
    return <div className="text-center mt-20 text-red-400">{error}</div>;
  }

  return (
    <div className="w-full mx-auto px-4 mt-10 text-white">
      <h1 className="mx-auto text-center text-3xl font-bold mb-10">
        Futbol Gündemi
      </h1>

      {/* 🔥 HERO */}
      {heroPosts.length > 0 ? (
        <SportHero posts={heroPosts} />
      ) : (
        <p className="text-center text-gray-400 mb-10">
          Henüz öne çıkan haber yok
        </p>
      )}

      {/* 🔥 LEAGUES */}
      {sortedLeagues.length > 0 ? (
        sortedLeagues.map((league) => (
          <div key={league.id} className="mb-14">
            <SportNews
              title={league.name}
              leagueId={league.id}
              sport="futbol"
            />
          </div>
        ))
      ) : (
        <p className="text-center text-gray-400">Lig bulunamadı</p>
      )}
    </div>
  );
}

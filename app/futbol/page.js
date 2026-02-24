"use client";

import { useEffect, useState, useMemo } from "react";
import SportNews from "@/components/sport/SportNews";
import SportHero from "@/components/sport/SportHero";

export default function FutbolPage() {
  const API = process.env.NEXT_PUBLIC_API_URL;

  const [leagues, setLeagues] = useState([]);
  const [heroPosts, setHeroPosts] = useState([]);

  const HIDDEN_LEAGUES = [24, 570, 390, 27];

  const TIER_ORDER = [8, 564, 384, 82, 301, 2, 3];

  useEffect(() => {
    if (!API) return;

    Promise.all([
      fetch(`${API}/api/posts/featured`).then((r) => r.json()),
      fetch(`${API}/api/sport/leagues`).then((r) => r.json()),
    ])
      .then(([postsRes, leaguesRes]) => {
        setHeroPosts(postsRes.data || []);
        setLeagues(leaguesRes.data || []);
      })
      .catch(console.error);
  }, [API]);

  const sortedLeagues = useMemo(() => {
    return leagues
      .filter((l) => !HIDDEN_LEAGUES.includes(l.id))
      .sort((a, b) => {
        const aIndex = TIER_ORDER.indexOf(a.id);
        const bIndex = TIER_ORDER.indexOf(b.id);

        if (aIndex === -1 && bIndex === -1) return 0;
        if (aIndex === -1) return 1;
        if (bIndex === -1) return -1;

        return aIndex - bIndex;
      });
  }, [leagues]);

  return (
    <div className="w-full mx-auto px-4 mt-10 text-white">
      <h1 className="mx-auto text-center text-3xl font-bold mb-10">
        Futbol Gündemi
      </h1>

      <SportHero posts={heroPosts} />

      {sortedLeagues.map((league) => (
        <div key={league.id} className="mb-14">
          <SportNews title={league.name} leagueId={league.id} sport="futbol" />
        </div>
      ))}
    </div>
  );
}

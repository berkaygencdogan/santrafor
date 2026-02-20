"use client";

import { useEffect, useState } from "react";
import SportNews from "@/components/sport/SportNews";

export default function FutbolPage() {
  const [leagues, setLeagues] = useState([]);
  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetch(`${API}/api/sport/leagues`)
      .then((res) => res.json())
      .then((res) => setLeagues(res.data || []))
      .catch(console.error);
  }, []);

  return (
    <div className="w-full mx-auto px-4 mt-10 text-white">
      <h1 className="mx-auto text-center text-3xl font-bold mb-10">
        Futbol Gündemi
      </h1>

      {leagues.map((league) => (
        <div key={league.id} className="mb-14">
          <SportNews title={league.name} leagueId={league.id} sport="futbol" />
        </div>
      ))}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import StandingsTable from "./StandingsTable";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function StandingsContainer({ leagueId, leagueName }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/sport/standings/${leagueId}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res.data || []);
      })
      .catch((err) => {
        console.log("STANDINGS ERROR:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="bg-[#0f172a] rounded-2xl p-4 text-white">
        Yükleniyor...
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="bg-[#0f172a] rounded-2xl p-4 text-white">
        Veri bulunamadı
      </div>
    );
  }

  return <StandingsTable data={data} leagueName={leagueName} />;
}

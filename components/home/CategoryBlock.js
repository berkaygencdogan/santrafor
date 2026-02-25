"use client";

import { useState } from "react";
import NewsCard from "./NewsCard";
import SideMiniCards from "./SideMiniCards";
import Agenda from "./Agenda";
import MediaSection from "./MediaSection";

export default function CategoryBlock({ cat, title }) {
  const [visible, setVisible] = useState(9);

  const handleToggle = () => {
    if (visible >= (cat.posts?.length || 0)) {
      setVisible(9); // reset
    } else {
      setVisible((prev) => prev + 9);
    }
  };

  const isAllVisible = visible >= (cat.posts?.length || 0);

  return (
    <>
      <Agenda posts={cat.agenda || []} title={title} />

      <div className="max-w-[1400px] mx-auto px-4 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-8">
          {/* SOL */}
          <div>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {(cat.posts || []).slice(0, visible).map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>

            {/* 🔥 BUTTON */}
            {(cat.posts?.length || 0) > 9 && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleToggle}
                  className="px-6 py-3 bg-yellow-400 text-black font-bold rounded-lg hover:opacity-90"
                >
                  {isAllVisible ? "Daha Az Göster" : "Daha Fazla"}
                </button>
              </div>
            )}
          </div>

          {/* SAĞ */}
          <SideMiniCards posts={cat.sideNews || []} />
        </div>
      </div>

      <MediaSection videos={cat.videos || []} gallery={cat.gallery || []} />
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import NewsCard from "./NewsCard";
import SideMiniCards from "./SideMiniCards";
import Agenda from "./Agenda";
import MediaSection from "./MediaSection";

export default function CategoryBlock({ cat = {}, title }) {
  const posts = cat.posts || [];
  const agenda = cat.agenda || [];
  const sideNews = cat.sideNews || [];
  const videos = cat.videos || [];
  const gallery = cat.gallery || [];

  const [visible, setVisible] = useState(9);

  useEffect(() => {
    setVisible(9);
  }, [posts]);

  const handleToggle = () => {
    if (visible >= posts.length) {
      setVisible(9);
    } else {
      setVisible((prev) => prev + 9);
    }
  };

  const isAllVisible = visible >= posts.length;

  return (
    <>
      {/* AGENDA */}
      <Agenda posts={agenda} title={title} />

      <div className="max-w-[1400px] mx-auto px-4 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-8">
          {/* SOL */}
          <div>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {posts.slice(0, visible).map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>

            {/* BUTTON */}
            {posts.length > 9 && (
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
          <SideMiniCards posts={sideNews} />
        </div>
      </div>

      {/* VIDEO + GALERİ */}
      <MediaSection videos={videos} gallery={gallery} />
    </>
  );
}

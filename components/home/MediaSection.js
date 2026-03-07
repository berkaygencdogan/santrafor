"use client";

import { useEffect, useState } from "react";

export default function MediaSection({ videos = [], gallery = [] }) {
  const [v, setV] = useState(0);
  const [g, setG] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false);

  const curV = videos[v];
  const curG = gallery[g];

  /* VIDEO AUTO */

  useEffect(() => {
    if (!videos.length || videoPlaying) return;

    const t = setInterval(() => {
      setV((p) => (p + 1) % videos.length);
    }, 4000);

    return () => clearInterval(t);
  }, [videos.length, videoPlaying]);

  /* GALERİ AUTO */

  useEffect(() => {
    if (!gallery.length) return;

    const t = setInterval(() => {
      setG((p) => (p + 1) % gallery.length);
    }, 4000);

    return () => clearInterval(t);
  }, [gallery.length]);

  /* NAV */

  const nextVideo = () => {
    if (!videos.length) return;
    setV((p) => (p + 1) % videos.length);
    setVideoPlaying(false);
  };

  const prevVideo = () => {
    if (!videos.length) return;
    setV((p) => (p - 1 + videos.length) % videos.length);
    setVideoPlaying(false);
  };

  const nextGallery = () => {
    if (!gallery.length) return;
    setG((p) => (p + 1) % gallery.length);
  };

  const prevGallery = () => {
    if (!gallery.length) return;
    setG((p) => (p - 1 + gallery.length) % gallery.length);
  };

  return (
    <section className="max-w-[1400px] mx-auto px-4 mt-10">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* VIDEO */}

        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-1 h-5 bg-red-500 rounded" />
            <h3 className="font-extrabold text-black">VİDEO</h3>
          </div>

          <div className="relative group overflow-hidden rounded-xl border-2 border-gray-900">
            {curV ? (
              <>
                {!videoPlaying ? (
                  <div
                    onClick={() => setVideoPlaying(true)}
                    className="cursor-pointer w-full h-[320px]"
                  >
                    <img
                      src={curV.cover_image}
                      className="w-full h-full object-cover"
                      alt={curV.title}
                    />

                    {/* PLAY ICON */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl shadow-xl">
                        ▶
                      </div>
                    </div>
                  </div>
                ) : (
                  <video
                    src={curV.video_url}
                    controls
                    autoPlay
                    className="w-full h-[320px] object-cover"
                  />
                )}

                {/* TITLE */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white font-bold">{curV.title}</p>
                </div>

                {/* ARROWS */}

                <button
                  onClick={prevVideo}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black text-white w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                >
                  ‹
                </button>

                <button
                  onClick={nextVideo}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black text-white w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                >
                  ›
                </button>
              </>
            ) : (
              <div className="text-gray-400 font-semibold h-[320px] border rounded-xl flex justify-center items-center">
                Henüz video yüklenmedi
              </div>
            )}
          </div>
        </div>

        {/* GALERİ */}

        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-1 h-5 bg-red-500 rounded" />
            <h3 className="font-extrabold text-black">GALERİ</h3>
          </div>

          <div className="relative group overflow-hidden rounded-xl border-2 border-gray-900">
            {curG ? (
              <>
                <img
                  src={curG.cover_image}
                  className="w-full h-[320px] object-cover"
                  alt={curG.title}
                />

                {/* TITLE */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white font-bold">{curG.title}</p>
                </div>

                {/* ARROWS */}

                <button
                  onClick={prevGallery}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black text-white w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                >
                  ‹
                </button>

                <button
                  onClick={nextGallery}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black text-white w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                >
                  ›
                </button>
              </>
            ) : (
              <div className="text-gray-400 font-semibold h-[320px] border rounded-xl flex justify-center items-center">
                Henüz fotoğraf yüklenmedi
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

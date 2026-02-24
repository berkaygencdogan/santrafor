"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import StandingsContainer from "@/components/ui/StandingsContainer";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

const API = process.env.NEXT_PUBLIC_API_URL;

function formatTR(dateStr) {
  if (!dateStr) return "";

  const d = new Date(dateStr);

  const date = d.toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Istanbul",
  });

  const time = d.toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Istanbul",
  });

  return `${date} • ${time}`;
}

// basit excerpt: html/text kırp
function makeExcerpt(content, n = 140) {
  if (!content) return "";
  const s = String(content)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return s.length > n ? s.slice(0, n).trim() + "..." : s;
}

export default function AuthorDetailPage() {
  const { id } = useParams();

  const [author, setAuthor] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [q, setQ] = useState("");

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);
        const res = await fetch(`${API}/api/authors/${id}`, {
          cache: "no-store",
        });
        const json = await res.json();

        if (!alive) return;
        setAuthor(json?.author || null);
        setPosts(json?.posts || []);
      } catch (e) {
        console.log("AUTHOR DETAIL FETCH ERROR:", e);
        if (!alive) return;
        setAuthor(null);
        setPosts([]);
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    }

    if (id) load();
    return () => {
      alive = false;
    };
  }, [id]);

  const filteredPosts = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return posts;
    return posts.filter((p) => (p?.title || "").toLowerCase().includes(s));
  }, [posts, q]);

  return (
    <main className="max-w-[1400px] mx-auto px-4 mt-6 grid lg:grid-cols-[1fr_320px] gap-6 text-white">
      {/* SOL */}
      <div>
        {loading ? (
          <div className="bg-[#111827] border border-white/10 rounded-xl p-6 text-gray-300">
            Yükleniyor...
          </div>
        ) : null}

        {!loading && !author ? (
          <div className="bg-[#111827] border border-white/10 rounded-xl p-6 text-gray-300">
            Yazar bulunamadı.
          </div>
        ) : null}

        {author ? (
          <>
            {/* AUTHOR HEADER */}
            <div className="bg-gradient-to-r from-blue-900 to-gray-900 text-white p-6 rounded-lg flex gap-6 items-center">
              <img
                src={author.avatar || "/default-avatar.png"}
                className="w-[120px] h-[120px] object-cover rounded"
                alt="author"
              />

              <div className="min-w-0">
                <h1 className="text-2xl font-bold">
                  {(author.first_name || "") + " " + (author.last_name || "")}
                </h1>
                <p className="text-sm text-gray-300">
                  {author.bio ? author.bio : ""}
                </p>

                {/* sosyal linkler varsa */}
                <div className="mt-3 flex flex-wrap gap-3 w-full justify-end">
                  {author.twitter && (
                    <a
                      href={author.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 flex items-center justify-center rounded-full bg-black hover:bg-gray-800 transition"
                    >
                      <BsTwitterX className="text-white text-sm" />
                    </a>
                  )}

                  {author.instagram && (
                    <a
                      href={author.instagram}
                      target="_blank"
                      className="w-9 h-9 flex items-center justify-center rounded-full bg-pink-500/20 hover:bg-pink-500 transition"
                    >
                      <FaInstagram className="text-pink-400 hover:text-white text-sm" />
                    </a>
                  )}

                  {author.facebook && (
                    <a
                      href={author.facebook}
                      target="_blank"
                      className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-500/20 hover:bg-blue-500 transition"
                    >
                      <FaFacebookF className="text-blue-400 hover:text-white text-sm" />
                    </a>
                  )}

                  {author.youtube && (
                    <a
                      href={author.youtube}
                      target="_blank"
                      className="w-9 h-9 flex items-center justify-center rounded-full bg-red-500/20 hover:bg-red-500 transition"
                    >
                      <FaYoutube className="text-red-400 hover:text-white text-sm" />
                    </a>
                  )}
                  {author.whatsapp && (
                    <a
                      href={author.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 flex items-center justify-center rounded-full bg-green-500/20 hover:bg-green-500 transition"
                    >
                      <FaWhatsapp className="text-green-400 hover:text-white text-sm" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* SEARCH */}
            <div className="flex gap-3 mt-6">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value.slice(0, 30))}
                placeholder="Yazı Ara"
                className="flex-1 bg-[#111827] border border-white/10 px-4 py-3 rounded-xl focus:outline-none focus:border-yellow-400"
              />
            </div>

            {/* POSTS */}
            {/* POSTS */}
            <div className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post) => {
                  const img =
                    post.cover_image || post.image || "/default-cover.jpg";

                  return (
                    <Link
                      key={post.id}
                      href={`/${post.league_slug}/${post.team_slug}/${post.slug}`}
                      className="group rounded-2xl overflow-hidden bg-[#111827] border border-white/10 hover:bg-[#1a2236] transition block"
                    >
                      {/* IMAGE */}
                      <div className="relative h-[180px] w-full overflow-hidden">
                        <img
                          src={img}
                          alt={post.title}
                          className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      </div>

                      {/* BODY */}
                      <div className="p-4">
                        <h2 className="text-base font-extrabold text-white leading-snug line-clamp-2 group-hover:text-yellow-400 transition">
                          {post.title}
                        </h2>

                        <p className="text-xs text-gray-400 mt-2">
                          {formatTR(post.created_at)}
                        </p>

                        {/* excerpt opsiyonel */}
                        {post.content ? (
                          <p className="text-sm text-gray-300 mt-3 line-clamp-3">
                            {makeExcerpt(post.content, 140)}
                          </p>
                        ) : null}
                      </div>
                    </Link>
                  );
                })}
              </div>

              {!filteredPosts.length ? (
                <div className="text-gray-400 text-center bg-[#111827] border border-white/10 rounded-xl p-6 mt-6">
                  Yazı bulunamadı
                </div>
              ) : null}
            </div>
          </>
        ) : null}
      </div>

      {/* SAĞ SIDEBAR */}
      <aside className="space-y-4">
        <StandingsContainer leagueName="La Liga" />
      </aside>
    </main>
  );
}

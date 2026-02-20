"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Editor } from "@tinymce/tinymce-react";

export default function CreatePostPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    summary: "",
    content: "",
    cover_image: "",
    category_id: "",
    tags: [],
    status: "draft",
  });

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);

  const API = process.env.NEXT_PUBLIC_API_URL;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    fetch(`${API}/api/categories`)
      .then((r) => r.json())
      .then((d) => setCategories(d.data || []));

    fetch(`${API}/api/tags`)
      .then((r) => r.json())
      .then((d) => setTags(d.data || []));
  }, []);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${API}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Hata");
        return;
      }

      router.push("/admin/news");
    } catch (err) {
      console.log(err);
      alert("Sunucu hatası");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 text-white max-w-5xl">
      <h1 className="text-2xl font-bold mb-6">Haber Ekle</h1>

      {/* TITLE */}
      <input
        placeholder="Başlık"
        className="w-full mb-4 p-3 rounded bg-[#020617]"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      {/* SUMMARY */}
      <textarea
        placeholder="Özet"
        className="w-full mb-4 p-3 rounded bg-[#020617]"
        value={form.summary}
        onChange={(e) => setForm({ ...form, summary: e.target.value })}
      />

      {/* COVER URL */}
      <input
        placeholder="Kapak görsel URL (opsiyonel)"
        className="w-full mb-3 p-3 rounded bg-[#020617]"
        value={form.cover_image}
        onChange={(e) => setForm({ ...form, cover_image: e.target.value })}
      />

      {/* COVER UPLOAD */}
      <div className="flex items-center gap-3 mb-4">
        <input
          type="file"
          accept="image/*"
          className="text-sm"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const token = localStorage.getItem("token");
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch(`${API}/api/upload/cover`, {
              method: "POST",
              headers: { Authorization: `Bearer ${token}` },
              body: formData,
            });

            const data = await res.json();
            if (!res.ok) {
              alert(data.error || "Kapak upload başarısız");
              return;
            }

            // ✅ DB’ye yazılacak alan yine cover_image
            setForm((prev) => ({ ...prev, cover_image: data.url }));
          }}
        />

        {form.cover_image && (
          <img
            src={form.cover_image}
            alt="cover"
            className="w-20 h-14 object-cover rounded border border-white/10"
          />
        )}
      </div>

      {/* ================= CATEGORY ================= */}
      <div className="mb-4 flex flex-col gap-2">
        <select
          className="w-full p-3 rounded bg-[#020617]"
          value={form.category_id}
          onChange={(e) => setForm({ ...form, category_id: e.target.value })}
        >
          <option value="">Kategori seç</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <button
          onClick={async () => {
            const name = prompt("Yeni kategori adı");
            if (!name) return;

            const res = await fetch(`${API}/api/categories`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ name }),
            });

            const data = await res.json();

            if (res.ok) {
              setCategories([...categories, data.data]);

              setForm({
                ...form,
                category_id: data.data.id,
              });
            }
          }}
          className="px-4 py-2 bg-green-500 rounded"
        >
          + Yeni Kategori
        </button>
      </div>

      {/* ================= TAGS (UPGRADE) ================= */}
      <div className="mb-4">
        <p className="mb-2 text-sm text-gray-400">Etiketler</p>

        {/* TAG BUTTONS */}
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((t) => {
            const selected = form.tags.includes(t.id);

            return (
              <button
                key={t.id}
                onClick={() => {
                  if (selected) {
                    setForm({
                      ...form,
                      tags: form.tags.filter((id) => id !== t.id),
                    });
                  } else {
                    setForm({
                      ...form,
                      tags: [...form.tags, t.id],
                    });
                  }
                }}
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm transition
                ${
                  selected
                    ? "bg-yellow-400 text-black"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                {t.name}
                <span className="font-bold">{selected ? "✕" : "+"}</span>
              </button>
            );
          })}
        </div>

        {/* SEÇİLEN TAGLER */}
        {form.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {form.tags.map((id) => {
              const tag = tags.find((t) => t.id === id);
              if (!tag) return null;

              return (
                <span
                  key={id}
                  className="bg-[#1e293b] px-3 py-1 rounded-full text-sm text-yellow-400"
                >
                  #{tag.name}
                </span>
              );
            })}
          </div>
        )}

        {/* TAG EKLE */}
        <button
          onClick={async () => {
            const name = prompt("Yeni etiket adı");
            if (!name) return;

            const res = await fetch(`${API}/api/tags`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ name }),
            });

            const data = await res.json();

            if (res.ok) {
              setTags([...tags, data.data]);

              setForm({
                ...form,
                tags: [...form.tags, data.data.id],
              });
            }
          }}
          className="mt-3 px-4 py-2 bg-green-500 rounded"
        >
          + Yeni Etiket
        </button>
      </div>

      {/* STATUS */}
      <select
        className="w-full mb-4 p-3 rounded bg-[#020617]"
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      >
        <option value="draft">Taslak</option>
        <option value="published">Yayınla</option>
      </select>

      {/* CONTENT */}
      <div className="mb-6">
        <Editor
          apiKey={process.env.NEXT_PUBLIC_TINYMCE_KEY}
          value={form.content}
          onEditorChange={(content) => setForm({ ...form, content })}
          init={{
            height: 400,
            menubar: false,
            plugins: ["link", "image", "code", "table", "lists", "fullscreen"],
            toolbar:
              "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | link image | code fullscreen",

            images_upload_handler: async (blobInfo) => {
              const formData = new FormData();
              formData.append("file", blobInfo.blob());

              const res = await fetch(`${API}/api/upload/image`, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                body: formData,
              });

              const data = await res.json();
              return data.url;
            },
          }}
        />
      </div>

      {/* SUBMIT */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-yellow-400 text-black px-6 py-3 rounded font-bold"
      >
        {loading ? "Kaydediliyor..." : "Kaydet"}
      </button>
    </div>
  );
}

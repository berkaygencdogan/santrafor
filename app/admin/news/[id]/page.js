"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Editor } from "@tinymce/tinymce-react";
import TagSelector from "@/components/admin/TagSelector";

export default function EditNewsPage() {
  const router = useRouter();
  const { id } = useParams();

  const API = process.env.NEXT_PUBLIC_API_URL;

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
  const [pageLoading, setPageLoading] = useState(true);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  /* ================= DATA LOAD ================= */

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      try {
        // 🔥 POST
        const postRes = await fetch(`${API}/api/posts/${id}`);
        const postData = await postRes.json();

        if (postRes.ok && postData?.data) {
          const n = postData.data;

          setForm({
            title: n.title || "",
            summary: n.summary || "",
            content: n.content || "",
            cover_image: n.cover_image || "",
            category_id: n.category_id || "",
            tags: n.tags?.map((t) => t.id) || [],
            status: n.status || "draft",
          });
        } else {
          console.log("POST BULUNAMADI:", postData);
        }

        // 🔥 CATEGORY
        const catRes = await fetch(`${API}/api/categories`);
        const catData = await catRes.json();
        setCategories(catData.data || []);

        // 🔥 TAGS
        const tagRes = await fetch(`${API}/api/tags`);
        const tagData = await tagRes.json();
        setTags(tagData.data || []);
      } catch (err) {
        console.log("LOAD ERROR:", err);
      } finally {
        setPageLoading(false);
      }
    };

    load();
  }, [id]);

  /* ================= UPDATE ================= */

  const handleUpdate = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${API}/api/posts/${id}`, {
        method: "PUT",
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

      alert("Güncellendi");
      router.push("/admin/news");
    } catch (err) {
      console.log(err);
      alert("Sunucu hatası");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Silinsin mi?")) return;

    await fetch(`${API}/api/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    router.push("/admin/news");
  };

  /* ================= LOADING ================= */

  if (pageLoading) {
    return (
      <div className="p-10 text-white">
        <p>Yükleniyor...</p>
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div className="p-10 text-white max-w-5xl">
      <h1 className="text-2xl font-bold mb-6">Haberi Düzenle</h1>

      {/* TITLE */}
      <input
        className="w-full mb-4 p-3 rounded bg-[#020617]"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      {/* SUMMARY */}
      <textarea
        className="w-full mb-4 p-3 rounded bg-[#020617]"
        value={form.summary}
        onChange={(e) => setForm({ ...form, summary: e.target.value })}
      />

      {/* COVER URL */}
      <input
        placeholder="Kapak görsel URL"
        className="w-full mb-3 p-3 rounded bg-[#020617]"
        value={form.cover_image}
        onChange={(e) => setForm({ ...form, cover_image: e.target.value })}
      />

      {/* COVER UPLOAD */}
      <div className="flex items-center gap-3 mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch(`${API}/api/upload/cover`, {
              method: "POST",
              headers: { Authorization: `Bearer ${token}` },
              body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
              alert(data.error || "Upload hatası");
              return;
            }

            setForm((prev) => ({
              ...prev,
              cover_image: data.url,
            }));
          }}
        />

        {form.cover_image && (
          <img
            src={form.cover_image}
            className="w-20 h-14 object-cover rounded"
          />
        )}
      </div>

      {/* CATEGORY */}
      <select
        className="w-full mb-4 p-3 rounded bg-[#020617]"
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

      {/* TAG SELECTOR */}
      <div className="mb-4">
        <p className="mb-2 text-sm text-gray-400">Etiketler</p>

        <TagSelector
          tags={tags}
          selected={form.tags}
          onChange={(newTags) => setForm({ ...form, tags: newTags })}
          onCreateTag={async (name) => {
            const res = await fetch(`${API}/api/tags`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ name }),
            });

            const data = await res.json();

            if (!res.ok) {
              alert(data.error || "Tag eklenemedi");
              return null;
            }

            setTags((prev) => [...prev, data.data]);
            return data.data;
          }}
        />
      </div>

      {/* STATUS */}
      <select
        className="w-full mb-4 p-3 rounded bg-[#020617]"
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      >
        <option value="draft">Taslak</option>
        <option value="published">Yayınla</option>
      </select>

      {/* CONTENT */}
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

      {/* BUTTONS */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="bg-yellow-400 text-black px-6 py-3 rounded font-bold"
        >
          {loading ? "Kaydediliyor..." : "Güncelle"}
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-500 px-6 py-3 rounded font-bold"
        >
          Sil
        </button>
      </div>
    </div>
  );
}

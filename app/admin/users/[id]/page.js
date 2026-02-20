"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditUser() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    role: "author",
    first_name: "",
    last_name: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);
  const API = process.env.NEXT_PUBLIC_API_URL;
  // 🔥 USER GETİR
  useEffect(() => {
    fetch(`${API}/api/auth/users/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((r) => r.json())
      .then((d) => {
        setForm(d.data);
        setLoading(false);
      });
  }, [id]);

  // 🔥 UPDATE
  const handleUpdate = async () => {
    await fetch(`${API}/api/auth/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(form),
    });

    alert("Güncellendi");
    router.push("/admin/users");
  };

  if (loading) return <p>Yükleniyor...</p>;

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl mb-6 font-bold">Kullanıcı Düzenle</h1>

      <div className="space-y-4">
        <b>Kullanıcı Adı</b>
        <input
          className="w-full p-3 bg-[#020617] rounded"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <b>Kullanıcı Rolü</b>
        <select
          className="w-full p-3 bg-[#020617] rounded"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="author">Yazar</option>
          <option value="admin">Admin</option>
        </select>

        <b>Ad</b>

        <input
          placeholder="Ad"
          className="w-full p-3 bg-[#020617] rounded"
          value={form.first_name || ""}
          onChange={(e) => setForm({ ...form, first_name: e.target.value })}
        />
        <b>Soyad</b>

        <input
          placeholder="Soyad"
          className="w-full p-3 bg-[#020617] rounded"
          value={form.last_name || ""}
          onChange={(e) => setForm({ ...form, last_name: e.target.value })}
        />

        <b>Email</b>

        <input
          placeholder="Email"
          className="w-full p-3 bg-[#020617] rounded"
          value={form.email || ""}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* BUTTON */}
        <button
          onClick={handleUpdate}
          className="w-full bg-orange-500 py-3 rounded font-bold"
        >
          Güncelle
        </button>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/admin/Navbar";

export default function Page() {
  const [user, setUser] = useState(null);
  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    fetch(`${API}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => r.json())
      .then((res) => {
        setUser(res.user);
      })
      .catch(() => {
        localStorage.removeItem("token");
        window.location.href = "/login";
      });
  }, []);

  if (!user) return <div className="text-white p-10">Yükleniyor...</div>;

  return (
    <div className="p-10 text-white">
      <Navbar />

      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* 🔥 ADMIN */}
      {user.role === "admin" && (
        <div className="space-y-4">
          <p>Tüm yönetim paneli burada</p>
          <button className="bg-green-500 px-4 py-2 rounded">
            Kullanıcı Ekle
          </button>
          <button className="bg-blue-500 px-4 py-2 rounded">
            Haber Yönetimi
          </button>
        </div>
      )}

      {/* 🔥 AUTHOR */}
      {user.role === "author" && (
        <div className="space-y-4">
          <p>Yazar paneli</p>
          <button className="bg-purple-500 px-4 py-2 rounded">
            Yeni Haber Ekle
          </button>
        </div>
      )}
    </div>
  );
}

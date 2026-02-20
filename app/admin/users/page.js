"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const API = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    fetch(`${API}/api/auth/users`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((r) => r.json())
      .then((d) => setUsers(d.data || []));
  }, []);

  const deleteUser = async (id) => {
    if (!confirm("Silinsin mi?")) return;

    await fetch(`${API}/api/auth/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Kullanıcılar</h1>

        <Link
          href="/admin/users/create"
          className="bg-orange-500 px-4 py-2 rounded"
        >
          + Kullanıcı Oluştur
        </Link>
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {users.map((u) => (
          <div
            key={u.id}
            className="flex items-center justify-between bg-[#1e293b] p-4 rounded-xl"
          >
            {/* SOL */}
            <div>
              <p className="font-semibold">{u.username}</p>
              <p className="text-xs text-gray-400">{u.role}</p>
            </div>

            {/* SAĞ */}
            <div className="flex gap-3">
              <Link href={`/admin/users/${u.id}`} className="text-yellow-400">
                Düzenle
              </Link>

              <button onClick={() => deleteUser(u.id)} className="text-red-400">
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// app/admin/users/create/page.js
"use client";

import { generateUser } from "@/lib/generateUser";
import { useState } from "react";
export default function CreateUser() {
  const [user, setUser] = useState(generateUser());
  const [role, setRole] = useState("author");
  const API = process.env.NEXT_PUBLIC_API_URL;

  const create = async () => {
    await fetch(`${API}/api/auth/create-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
        role,
        first_name: "Yeni",
        last_name: "Yazar",
        email: `${user.username}@mail.com`,
      }),
    });

    alert("Oluşturuldu");
    setUser(generateUser());
  };

  return (
    <div>
      <h1 className="text-2xl mb-6">Kullanıcı Oluştur</h1>

      <div className="space-y-4 max-w-md">
        <input
          value={user.username}
          readOnly
          className="w-full p-3 bg-[#020617]"
        />

        <input
          value={user.password}
          readOnly
          className="w-full p-3 bg-[#020617]"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-3 bg-[#020617]"
        >
          <option value="author">Yazar</option>
          <option value="admin">Admin</option>
        </select>

        <button onClick={create} className="w-full bg-orange-500 py-3 rounded">
          Oluştur
        </button>
      </div>
    </div>
  );
}

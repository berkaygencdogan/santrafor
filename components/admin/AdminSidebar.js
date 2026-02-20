// components/admin/AdminSidebar.js
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const path = usePathname();

  const linkClass = (p) =>
    `block px-4 py-2 rounded ${
      path.startsWith(p)
        ? "bg-orange-500 text-white"
        : "text-gray-400 hover:bg-white/10"
    }`;

  return (
    <div className="w-60 bg-[#020617] p-4 space-y-2">
      <h2 className="text-xl font-bold mb-6">Admin</h2>

      <Link href="/admin/news" className={linkClass("/admin/news")}>
        Haberler
      </Link>

      <Link href="/admin/users" className={linkClass("/admin/users")}>
        Kullanıcılar
      </Link>
    </div>
  );
}

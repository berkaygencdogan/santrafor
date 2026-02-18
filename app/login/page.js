"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [active, setActive] = useState("yazar");
  const [anim, setAnim] = useState("");

  const handleSwitch = (type) => {
    if (type === active) return;

    setAnim(type === "admin" ? "animate-zoomOutLeft" : "animate-zoomOutRight");

    setTimeout(() => {
      setActive(type);
      setAnim(type === "admin" ? "animate-zoomInRight" : "animate-zoomInLeft");
    }, 300);
  };

  return (
    <div
      className="min-h-screen flex items-center pl-30"
      style={{
        backgroundImage: "url(https://i.hizliresim.com/32blpfj.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-5xl flex justify-between items-center relative">
        <div
          className={`
            w-full max-w-md transition-all duration-500
            ${active === "yazar" ? "translate-x-0" : "translate-x-[275%]"}
            ${anim}
          `}
        >
          <div className="relative bg-[#0f172a]/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10">
            {/* 🔥 GLOW EFFECT */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-yellow-400/20 to-orange-500/20 blur-xl opacity-30 pointer-events-none" />

            {/* HEADER */}
            <h2 className="relative text-3xl font-extrabold mb-8 text-center text-white tracking-wide">
              {active === "yazar" ? "Yazar Girişi" : "Admin Paneli"}
            </h2>

            {/* INPUT GROUP */}
            <div className="space-y-5 relative">
              {/* EMAIL */}
              <div className="group">
                <label className="text-xs text-gray-400 uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="ornek@mail.com"
                  className="w-full mt-2 px-4 py-3 rounded-xl bg-[#020617] border border-white/10 text-white 
                  focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30
                  transition-all duration-300 group-hover:border-white/20"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              {/* PASSWORD */}
              <div className="group">
                <label className="text-xs text-gray-400 uppercase tracking-wider">
                  Şifre
                </label>
                <input
                  type="password"
                  placeholder="********"
                  className="w-full mt-2 px-4 py-3 rounded-xl bg-[#020617] border border-white/10 text-white 
                  focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30
                  transition-all duration-300 group-hover:border-white/20"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </div>
            </div>

            {/* BUTTON */}
            <button
              className="
              w-full mt-8 py-3 rounded-xl font-bold text-black
              bg-gradient-to-r from-yellow-400 to-orange-500
              hover:from-yellow-300 hover:to-orange-400
              shadow-lg shadow-yellow-500/20
              hover:shadow-yellow-500/40
              transition-all duration-300
              active:scale-[0.98]
            "
              onClick={() => alert("deneme")}
            >
              Giriş Yap
            </button>

            <div className="flex bg-[#020617] rounded-xl p-1 mt-6 border border-white/10">
              <button
                onClick={() => handleSwitch("yazar")}
                className={`
      flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-300
      ${
        active === "yazar"
          ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-md"
          : "text-gray-400 hover:text-white"
      }
    `}
              >
                Yazar Girişi
              </button>

              <button
                onClick={() => handleSwitch("admin")}
                className={`
      flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-300
      ${
        active === "admin"
          ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-md"
          : "text-gray-400 hover:text-white"
      }
    `}
              >
                Admin Girişi
              </button>
            </div>

            {/* FOOTER */}
            <p className="text-center text-gray-500 text-xs mt-8">
              © 2026 Santrafor
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

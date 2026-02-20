"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [active, setActive] = useState("yazar");
  const [anim, setAnim] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const API = process.env.NEXT_PUBLIC_API_URL;

  const handleSwitch = (type) => {
    if (type === active) return;

    setAnim(type === "admin" ? "animate-zoomOutLeft" : "animate-zoomOutRight");

    setTimeout(() => {
      setActive(type);
      setAnim(type === "admin" ? "animate-zoomInRight" : "animate-zoomInLeft");
    }, 300);
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Giriş başarısız");
        setLoading(false);
        return;
      }

      // token kaydet
      localStorage.setItem("token", data.token);

      // decode
      const payload = JSON.parse(atob(data.token.split(".")[1]));
      console.log(localStorage.getItem("token"));
      // yönlendirme
      if (payload.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err) {
      console.log(err);
      setError("Sunucu hatası");
    } finally {
      setLoading(false);
    }
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
          className={`w-full max-w-md transition-all duration-500 ${
            active === "yazar" ? "translate-x-0" : "translate-x-[275%]"
          } ${anim}`}
        >
          <div className="relative">
            {/* GLOW */}
            <div className="absolute inset-0 -z-10 blur-2xl bg-gradient-to-r from-yellow-400/20 to-orange-500/20" />

            <div className="relative z-10 bg-[#0f172a]/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10">
              {/* HEADER */}
              <h2 className="text-3xl font-extrabold mb-8 text-center text-white">
                {active === "yazar" ? "Yazar Girişi" : "Admin Paneli"}
              </h2>

              {/* ERROR */}
              {error && (
                <div className="mb-4 text-red-400 text-sm text-center">
                  {error}
                </div>
              )}

              {/* INPUTS */}
              <div className="space-y-5">
                <div>
                  <label className="text-xs text-gray-400">Kullanıcı Adı</label>
                  <input
                    type="text"
                    className="w-full mt-2 px-4 py-3 rounded-xl bg-[#020617] border border-white/10 text-white focus:border-yellow-400 focus:outline-none"
                    value={form.username}
                    onChange={(e) =>
                      setForm({ ...form, username: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-400">Şifre</label>
                  <input
                    type="password"
                    className="w-full mt-2 px-4 py-3 rounded-xl bg-[#020617] border border-white/10 text-white focus:border-yellow-400 focus:outline-none"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* BUTTON */}
              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full mt-8 py-3 rounded-xl font-bold text-black
                bg-gradient-to-r from-yellow-400 to-orange-500
                hover:from-yellow-300 hover:to-orange-400
                transition-all duration-300
                disabled:opacity-50"
              >
                {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
              </button>

              {/* SWITCH */}
              <div className="flex bg-[#020617] rounded-xl p-1 mt-6 border border-white/10">
                <button
                  onClick={() => handleSwitch("yazar")}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${
                    active === "yazar"
                      ? "bg-yellow-400 text-black"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Yazar Girişi
                </button>

                <button
                  onClick={() => handleSwitch("admin")}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${
                    active === "admin"
                      ? "bg-yellow-400 text-black"
                      : "text-gray-400 hover:text-white"
                  }`}
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
    </div>
  );
}

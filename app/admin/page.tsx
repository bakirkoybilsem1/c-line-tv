"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Sign = {
  id: string;
  word: string;
  meaning: string;
  student_name: string;
  image_url: string;
  video_url: string;
  status: string;
};

const TEACHER_PASSWORD = "c-line12345";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");

  const [items, setItems] = useState<Sign[]>([]);
  const [message, setMessage] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (passwordInput === TEACHER_PASSWORD) {
      setAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Hatalı şifre. Lütfen tekrar deneyin.");
    }
  }

  async function loadItems() {
    const { data, error } = await supabase
      .from("signs")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setItems(data);
  }

  async function updateStatus(id: string, status: string) {
    const { error } = await supabase.from("signs").update({ status }).eq("id", id);
    if (!error) {
      setMessage("Durum güncellendi.");
      loadItems();
    }
  }

  async function deleteItem(id: string) {
    const { error } = await supabase.from("signs").delete().eq("id", id);
    if (!error) {
      setMessage("İçerik silindi.");
      loadItems();
    }
  }

  useEffect(() => {
    if (authenticated) loadItems();
  }, [authenticated]);

  if (!authenticated) {
    return (
      <main style={loginStyles.page}>
        <div style={loginStyles.card}>
          <div style={loginStyles.logoWrap}>
            <div style={loginStyles.logo}>C</div>
            <div>
              <h1 style={loginStyles.brand}>C-LINE TV</h1>
              <p style={loginStyles.brandSub}>Öğretmen Paneli</p>
            </div>
          </div>

          <p style={loginStyles.desc}>Devam etmek için şifrenizi girin.</p>

          <form onSubmit={handleLogin} style={loginStyles.form}>
            <input
              style={loginStyles.input}
              type="password"
              placeholder="Şifre"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              required
            />
            {authError && <p style={loginStyles.error}>{authError}</p>}
            <button style={loginStyles.button} type="submit">
              Giriş Yap
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <h1 style={styles.title}>Öğretmen Onay Paneli</h1>
      <p style={styles.desc}>
        Öğrenci yüklemelerini incele, fotoğraf/video indir, onayla, reddet veya sil.
      </p>

      {message && <p style={styles.message}>{message}</p>}

      <section style={styles.grid}>
        {items.map((item) => (
          <div key={item.id} style={styles.card}>
            <div style={styles.top}>
              <div>
                <p style={styles.small}>Kelime</p>
                <h2 style={styles.word}>{item.word}</h2>
              </div>
              <span style={styles.status}>{item.status}</span>
            </div>

            <p style={styles.meaning}>{item.meaning}</p>
            <p style={styles.student}>Öğrenci: {item.student_name || "Belirtilmedi"}</p>

            {item.image_url && (
              <div style={styles.mediaBox}>
                <img src={item.image_url} alt={item.word} style={styles.image} />
                <a
                  href={item.image_url}
                  download
                  target="_blank"
                  rel="noreferrer"
                  style={styles.download}
                >
                  Fotoğrafı İndir
                </a>
              </div>
            )}

            {item.video_url && (
              <div style={styles.mediaBox}>
                <video src={item.video_url} controls style={styles.video} />
                <a
                  href={item.video_url}
                  download
                  target="_blank"
                  rel="noreferrer"
                  style={styles.download}
                >
                  Videoyu İndir
                </a>
              </div>
            )}

            <div style={styles.actions}>
              <button
                style={styles.approve}
                onClick={() => updateStatus(item.id, "approved")}
              >
                Onayla
              </button>

              <button
                style={styles.reject}
                onClick={() => updateStatus(item.id, "rejected")}
              >
                Reddet
              </button>

              <button style={styles.delete} onClick={() => deleteItem(item.id)}>
                Sil
              </button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

const loginStyles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #020617, #0f172a)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    background: "rgba(255,255,255,.08)",
    border: "1px solid rgba(255,255,255,.15)",
    borderRadius: 30,
    padding: 36,
  },
  logoWrap: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    marginBottom: 20,
  },
  logo: {
    width: 54,
    height: 54,
    borderRadius: 18,
    background: "linear-gradient(135deg, #22d3ee, #facc15)",
    color: "#020617",
    display: "grid",
    placeItems: "center",
    fontSize: 30,
    fontWeight: 1000,
  } as React.CSSProperties,
  brand: { margin: 0, fontSize: 24, letterSpacing: -1 },
  brandSub: { margin: "4px 0 0", color: "#94a3b8", fontSize: 13 },
  desc: { color: "#cbd5e1", marginBottom: 24 },
  form: { display: "grid", gap: 14 },
  input: {
    padding: 15,
    borderRadius: 14,
    border: "1px solid #334155",
    background: "rgba(255,255,255,0.05)",
    color: "white",
    fontSize: 16,
  },
  error: { color: "#f87171", fontWeight: 700, margin: 0 },
  button: {
    padding: 16,
    borderRadius: 16,
    border: 0,
    background: "#22d3ee",
    color: "#020617",
    fontWeight: 900,
    fontSize: 16,
    cursor: "pointer",
  },
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#020617",
    color: "white",
    padding: 30,
    fontFamily: "Arial",
  },
  title: { fontSize: 42, margin: 0 },
  desc: { color: "#cbd5e1" },
  message: { color: "#fde68a", fontWeight: 700 },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
    gap: 20,
    marginTop: 30,
  },
  card: {
    background: "rgba(255,255,255,.08)",
    border: "1px solid rgba(255,255,255,.15)",
    borderRadius: 24,
    padding: 20,
  },
  top: {
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
  },
  small: { color: "#94a3b8", margin: 0 },
  word: { margin: "5px 0 0", fontSize: 28 },
  status: {
    background: "#facc15",
    color: "#020617",
    padding: "8px 12px",
    borderRadius: 999,
    fontWeight: 900,
    height: 34,
  },
  meaning: { color: "#e2e8f0", lineHeight: 1.6 },
  student: { color: "#67e8f9", fontWeight: 700 },
  mediaBox: { marginTop: 16 },
  image: {
    width: "100%",
    borderRadius: 18,
    maxHeight: 260,
    objectFit: "cover",
  },
  video: {
    width: "100%",
    borderRadius: 18,
    maxHeight: 260,
    background: "black",
  },
  download: {
    display: "block",
    marginTop: 8,
    textAlign: "center",
    background: "#22d3ee",
    color: "#020617",
    padding: 12,
    borderRadius: 14,
    textDecoration: "none",
    fontWeight: 900,
  },
  actions: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 8,
    marginTop: 16,
  },
  approve: {
    padding: 12,
    border: 0,
    borderRadius: 12,
    background: "#22c55e",
    color: "white",
    fontWeight: 900,
    cursor: "pointer",
  },
  reject: {
    padding: 12,
    border: 0,
    borderRadius: 12,
    background: "#f97316",
    color: "white",
    fontWeight: 900,
    cursor: "pointer",
  },
  delete: {
    padding: 12,
    border: 0,
    borderRadius: 12,
    background: "#ef4444",
    color: "white",
    fontWeight: 900,
    cursor: "pointer",
  },
};

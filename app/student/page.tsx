"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

const STUDENT_PASSWORD = "c-line12345";

export default function StudentPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");

  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [studentName, setStudentName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (passwordInput === STUDENT_PASSWORD) {
      setAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Hatalı şifre. Lütfen tekrar deneyin.");
    }
  }

  async function uploadFile(bucket: string, file: File) {
    const filePath = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (error) throw error;

    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

    return data.publicUrl;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setMessage("Yükleniyor...");

      let imageUrl = "";
      let videoUrl = "";

      if (image) {
        imageUrl = await uploadFile("sign-images", image);
      }

      if (video) {
        videoUrl = await uploadFile("sign-videos", video);
      }

      const { error } = await supabase.from("signs").insert({
        word,
        meaning,
        student_name: studentName,
        image_url: imageUrl,
        video_url: videoUrl,
        status: "pending",
      });

      if (error) throw error;

      setMessage("İçerik öğretmen onayına gönderildi.");
      setWord("");
      setMeaning("");
      setStudentName("");
      setImage(null);
      setVideo(null);
    } catch (err) {
      console.error(err);
      setMessage("Hata oluştu. Supabase ayarlarını kontrol et.");
    }
  }

  if (!authenticated) {
    return (
      <main style={loginStyles.page}>
        <div style={loginStyles.card}>
          <div style={loginStyles.logoWrap}>
            <div style={loginStyles.logo}>C</div>
            <div>
              <h1 style={loginStyles.brand}>C-LINE TV</h1>
              <p style={loginStyles.brandSub}>Öğrenci Paneli</p>
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
      <section style={styles.card}>
        <h1 style={styles.title}>Öğrenci Paneli</h1>
        <p style={styles.desc}>
          Kelime, anlam, fotoğraf ve video yükle. İçerik öğretmen onayından
          sonra sözlükte yayınlanır.
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            placeholder="Öğrenci adı"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            required
          />

          <input
            style={styles.input}
            placeholder="Kelime"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            required
          />

          <textarea
            style={styles.textarea}
            placeholder="Anlam / açıklama"
            value={meaning}
            onChange={(e) => setMeaning(e.target.value)}
            required
          />

          <label style={styles.label}>Fotoğraf yükle</label>
          <input
            style={styles.input}
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />

          <label style={styles.label}>Video yükle</label>
          <input
            style={styles.input}
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files?.[0] || null)}
          />

          <button style={styles.button}>Öğretmen Onayına Gönder</button>
        </form>

        {message && <p style={styles.message}>{message}</p>}
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
    background: "linear-gradient(135deg,#020617,#0f172a)",
    color: "white",
    padding: 30,
    fontFamily: "Arial",
  },
  card: {
    maxWidth: 680,
    margin: "40px auto",
    background: "rgba(255,255,255,.08)",
    border: "1px solid rgba(255,255,255,.15)",
    borderRadius: 30,
    padding: 30,
  },
  title: { fontSize: 42, margin: 0 },
  desc: { color: "#cbd5e1", lineHeight: 1.6 },
  form: { display: "grid", gap: 14 },
  input: {
    padding: 15,
    borderRadius: 14,
    border: "1px solid #334155",
    background: "rgba(255,255,255,0.05)",
    color: "white",
    fontSize: 16,
  },
  textarea: {
    padding: 15,
    borderRadius: 14,
    border: "1px solid #334155",
    background: "rgba(255,255,255,0.05)",
    color: "white",
    minHeight: 120,
    fontSize: 16,
  },
  label: { fontWeight: 700, color: "#67e8f9" },
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
  message: {
    marginTop: 20,
    color: "#fde68a",
    fontWeight: 700,
  },
};

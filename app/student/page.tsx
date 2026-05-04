"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function StudentPage() {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [studentName, setStudentName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [message, setMessage] = useState("");

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
    fontSize: 16,
  },
  textarea: {
    padding: 15,
    borderRadius: 14,
    border: "1px solid #334155",
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

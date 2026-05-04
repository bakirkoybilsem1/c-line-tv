"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Sign = {
  id: string;
  word: string;
  meaning: string;
  image_url: string;
  video_url: string;
  student_name: string;
};

export default function DictionaryPage() {
  const [items, setItems] = useState<Sign[]>([]);

  async function loadItems() {
    const { data, error } = await supabase
      .from("signs")
      .select("*")
      .eq("status", "approved")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setItems(data);
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <a href="/" style={styles.back}>← Ana sayfa</a>
        <h1 style={styles.title}>C-LINE TV Sözlük</h1>
        <p style={styles.desc}>
          Öğretmen tarafından onaylanan fotoğraflı ve videolu içerikler burada görünür.
        </p>
      </header>

      {items.length === 0 ? (
        <div style={styles.empty}>
          Henüz onaylanmış içerik yok.
        </div>
      ) : (
        <section style={styles.grid}>
          {items.map((item) => (
            <article key={item.id} style={styles.card}>
              <h2 style={styles.word}>{item.word}</h2>
              <p style={styles.meaning}>{item.meaning}</p>

              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={item.word}
                  style={styles.image}
                />
              )}

              {item.video_url && (
                <video
                  src={item.video_url}
                  controls
                  style={styles.video}
                />
              )}

              <p style={styles.student}>
                Katkı sağlayan öğrenci: {item.student_name || "Belirtilmedi"}
              </p>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top left, rgba(34,211,238,.25), transparent 30%), linear-gradient(135deg,#020617,#0f172a)",
    color: "white",
    padding: 30,
    fontFamily: "Arial, sans-serif",
  },
  header: {
    maxWidth: 1100,
    margin: "0 auto 30px",
  },
  back: {
    color: "#67e8f9",
    textDecoration: "none",
    fontWeight: 800,
  },
  title: {
    fontSize: 46,
    margin: "22px 0 10px",
  },
  desc: {
    color: "#cbd5e1",
    fontSize: 18,
    maxWidth: 760,
    lineHeight: 1.6,
  },
  empty: {
    maxWidth: 1100,
    margin: "40px auto",
    background: "rgba(255,255,255,.08)",
    border: "1px solid rgba(255,255,255,.14)",
    borderRadius: 24,
    padding: 30,
    color: "#fde68a",
    fontWeight: 800,
  },
  grid: {
    maxWidth: 1100,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
    gap: 22,
  },
  card: {
    background: "rgba(255,255,255,.08)",
    border: "1px solid rgba(255,255,255,.14)",
    borderRadius: 26,
    padding: 22,
    boxShadow: "0 20px 60px rgba(0,0,0,.25)",
  },
  word: {
    fontSize: 30,
    margin: 0,
  },
  meaning: {
    color: "#e2e8f0",
    lineHeight: 1.6,
    marginTop: 12,
  },
  image: {
    width: "100%",
    maxHeight: 260,
    objectFit: "cover",
    borderRadius: 18,
    marginTop: 14,
  },
  video: {
    width: "100%",
    maxHeight: 260,
    borderRadius: 18,
    background: "black",
    marginTop: 14,
  },
  student: {
    color: "#67e8f9",
    fontWeight: 800,
    marginTop: 16,
  },
};

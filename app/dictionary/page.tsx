"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Sign = {
  id: string;
  word: string;
  meaning: string;
  student_name: string;
  image_url: string;
  video_url: string;
};

export default function DictionaryPage() {
  const [items, setItems] = useState<Sign[]>([]);

  async function loadItems() {
    const { data, error } = await supabase
      .from("signs")
      .select("*")
      .eq("status", "approved")
      .order("created_at", { ascending: false });

    if (!error && data) setItems(data);
  }

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <main style={styles.page}>
      <h1 style={styles.title}>C-LINE TV Sözlük</h1>
      <p style={styles.desc}>Sadece öğretmen tarafından onaylanan içerikler görünür.</p>

      <section style={styles.grid}>
        {items.map((item) => (
          <div key={item.id} style={styles.card}>
            <h2 style={styles.word}>{item.word}</h2>
            <p style={styles.meaning}>{item.meaning}</p>

            {item.image_url && (
              <img src={item.image_url} alt={item.word} style={styles.image} />
            )}

            {item.video_url && (
              <video src={item.video_url} controls style={styles.video} />
            )}

            <p style={styles.student}>Katkı: {item.student_name}</p>
          </div>
        ))}
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
  title: { fontSize: 42, margin: 0 },
  desc: { color: "#cbd5e1" },
  grid: {
    marginTop: 30,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
    gap: 20,
  },
  card: {
    background: "rgba(255,255,255,.08)",
    borderRadius: 24,
    padding: 20,
    border: "1px solid rgba(255,255,255,.15)",
  },
  word: { fontSize: 30, margin: 0 },
  meaning: { color: "#e2e8f0", lineHeight: 1.6 },
  image: {
    width: "100%",
    borderRadius: 18,
    maxHeight: 260,
    objectFit: "cover",
    marginTop: 12,
  },
  video: {
    width: "100%",
    borderRadius: 18,
    maxHeight: 260,
    background: "black",
    marginTop: 12,
  },
  student: { color: "#67e8f9", fontWeight: 700 },
};

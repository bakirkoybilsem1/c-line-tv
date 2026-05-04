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

  async function loadData() {
    const { data, error } = await supabase
      .from("signs")
      .select("*")
      .eq("status", "approved")
      .order("created_at", { ascending: false });

    if (!error && data) setItems(data);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <main style={styles.page}>
      <h1 style={styles.title}>Sözlük</h1>

      <div style={styles.grid}>
        {items.map((item) => (
          <div key={item.id} style={styles.card}>
            <h2>{item.word}</h2>
            <p>{item.meaning}</p>

            {item.image_url && (
              <img src={item.image_url} style={styles.img} />
            )}

            {item.video_url && (
              <video src={item.video_url} controls style={styles.video} />
            )}

            <p style={styles.student}>👤 {item.student_name}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

const styles: any = {
  page: {
    padding: 30,
    background: "#020617",
    color: "white",
    minHeight: "100vh",
  },
  title: { fontSize: 40 },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
    gap: 20,
    marginTop: 20,
  },
  card: {
    background: "#0f172a",
    padding: 20,
    borderRadius: 20,
  },
  img: {
    width: "100%",
    borderRadius: 10,
    marginTop: 10,
  },
  video: {
    width: "100%",
    borderRadius: 10,
    marginTop: 10,
  },
  student: {
    color: "#22d3ee",
    marginTop: 10,
  },
};

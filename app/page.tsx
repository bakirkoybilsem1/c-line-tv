"use client";

import { useState } from "react";

type Lang = "tr" | "en" | "lv" | "it";

const tData = {
  tr: {
    hero: "Fotoğraf ve videoyla öğren",
    sub: "Öğrenciler içerik üretir, öğretmen onaylar",
    student: "Öğrenci Paneli",
    teacher: "Öğretmen Paneli",
    dict: "Sözlük",
  },
  en: {
    hero: "Learn with photos and videos",
    sub: "Students create, teachers approve",
    student: "Student Panel",
    teacher: "Teacher Panel",
    dict: "Dictionary",
  },
  lv: {
    hero: "Mācies ar foto un video",
    sub: "Skolēni veido, skolotāji apstiprina",
    student: "Skolēna panelis",
    teacher: "Skolotāja panelis",
    dict: "Vārdnīca",
  },
  it: {
    hero: "Impara con foto e video",
    sub: "Studenti creano, insegnanti approvano",
    student: "Pannello Studente",
    teacher: "Pannello Docente",
    dict: "Dizionario",
  },
};

export default function Home() {
  const [lang, setLang] = useState<Lang>("tr");
  const t = tData[lang];

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      
      {/* NAV */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">C-LINE TV</h1>
        <div className="flex gap-2">
          {["tr", "en", "lv", "it"].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l as Lang)}
              className={`px-3 py-1 rounded ${
                lang === l ? "bg-cyan-400 text-black" : "bg-white/10"
              }`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* HERO */}
      <div className="mt-20 text-center">
        <h2 className="text-5xl font-bold">{t.hero}</h2>
        <p className="mt-4 text-gray-300">{t.sub}</p>

        <div className="mt-8 flex justify-center gap-4">
          <button className="bg-cyan-400 text-black px-6 py-3 rounded">
            {t.student}
          </button>
          <button className="bg-yellow-400 text-black px-6 py-3 rounded">
            {t.teacher}
          </button>
          <button className="border px-6 py-3 rounded">
            {t.dict}
          </button>
        </div>
      </div>

      {/* DEMO */}
      <div className="mt-20 max-w-xl mx-auto bg-white/10 p-6 rounded-xl">
        <h3 className="text-2xl font-bold">👋 Hello</h3>
        <div className="flex gap-4 mt-4">
          <div className="w-1/2 h-32 bg-cyan-400 flex items-center justify-center">📷</div>
          <div className="w-1/2 h-32 bg-slate-800 flex items-center justify-center">🎥</div>
        </div>
        <p className="mt-4 text-gray-300">
          Greeting expression
        </p>
      </div>

      <footer className="mt-20 text-center text-gray-500">
        C-LINE TV · Multilingual Learning Platform
      </footer>
    </main>
  );
}

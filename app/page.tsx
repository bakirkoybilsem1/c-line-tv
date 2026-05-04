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
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 text-white">

      {/* NAVBAR */}
      <div className="flex justify-between items-center px-10 py-6">
        <h1 className="text-3xl font-black tracking-wide">
          C-LINE <span className="text-cyan-400">TV</span>
        </h1>

        <div className="flex gap-2">
          {(["tr","en","lv","it"] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-3 py-1 rounded-lg text-sm font-bold transition ${
                lang === l
                  ? "bg-cyan-400 text-black"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section className="text-center px-6 mt-20">
        <h2 className="text-5xl md:text-7xl font-black leading-tight">
          {t.hero}
        </h2>

        <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
          {t.sub}
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button className="bg-cyan-400 text-black px-8 py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition">
            {t.student}
          </button>

          <button className="bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition">
            {t.teacher}
          </button>

          <button className="border border-white/20 px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition">
            {t.dict}
          </button>
        </div>
      </section>

      {/* CARD */}
      <section className="mt-20 px-6 flex justify-center">
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 max-w-xl w-full shadow-2xl">

          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-gray-400">Sample</p>
              <h3 className="text-3xl font-black">👋 Hello</h3>
            </div>

            <span className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-bold">
              Approved
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="h-40 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-4xl">
              📷
            </div>

            <div className="h-40 rounded-2xl bg-slate-800 flex items-center justify-center text-4xl">
              🎥
            </div>
          </div>

          <p className="mt-5 text-gray-300">
            Greeting expression
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mt-24 px-6 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {[
          ["📷", "Photo Learning", "Students upload visual content"],
          ["🎥", "Video Learning", "Dynamic sign demonstrations"],
          ["🌍", "Multilingual", "TR / EN / LV / IT support"],
        ].map(([icon, title, desc]) => (
          <div
            key={title}
            className="bg-white/10 p-6 rounded-2xl border border-white/10 hover:scale-105 transition"
          >
            <div className="text-4xl mb-3">{icon}</div>
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-gray-400 mt-2">{desc}</p>
          </div>
        ))}
      </section>

      {/* FOOTER */}
      <footer className="mt-24 text-center text-gray-500 py-10 border-t border-white/10">
        C-LINE TV · Next.js + Supabase · Modern Learning Platform
      </footer>
    </main>
  );
}

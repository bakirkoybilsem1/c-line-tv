"use client";

import { useState } from "react";

const LANGS = {
  TR: {
    nav: ["Öğrenci Paneli", "Öğretmen Paneli", "Sözlük"],
    hero_badge: "Fotoğraf + Video + Çok Dilli Sözlük",
    hero_h1: ["Girişimcilik, Üretim,", "Kapsayıcılık &", "Yeşil Enerji"],
    hero_p: "Fırsat eşitliği ve eğitimde kapsayıcılık için tasarlanmış çok dilli görsel öğrenme platformu.",
    hero_btn1: "Öğrenci Paneli",
    hero_btn2: "Sözlüğü İncele",
    steps: ["Herkes İçin", "Hep Birlikte Öğreniyoruz", "ve Eğleniyoruz 🎉"],
    upload_title: "Öğrenci İçerik Yükleme Paneli",
    upload_word: "Kelime",
    upload_meaning: "Anlam / Açıklama",
    upload_name: "Öğrenci Adı",
    upload_photo: "Fotoğraf Yükle",
    upload_video: "Video Yükle",
    upload_btn: "Yükle",
    upload_success: "İçerik başarıyla yüklendi! Öğretmen onayı bekleniyor.",
    values: ["Girişimcilik", "Üretim", "Kapsayıcılık", "Yeşil Enerji", "Fırsat Eşitliği", "Eğitimde Kapsayıcılık"],
    erasmus_text: "Bakırköy Bilim ve Sanat Merkezi koordinatörlüğünde hazırlanan",
    erasmus_project: '"A Common Language for Integrative Entrepreneurship (C-LINE)"',
    erasmus_agency: "başlıklı Erasmus+ KA210-SCH projesi, Türkiye Ulusal Ajansı tarafından kabul edilmiştir.",
    dict_btn: "Sözlüğü İncele",
    sample_label: "Örnek Kelime",
    sample_meaning: "Selamlama sırasında kullanılan temel ifade.",
    student_video: "Öğrenci Videosu",
    footer_tagline: "Student Powered Learning System",
  },
  EN: {
    nav: ["Student Panel", "Teacher Panel", "Dictionary"],
    hero_badge: "Photo + Video + Multilingual Dictionary",
    hero_h1: ["Entrepreneurship, Production,", "Inclusivity &", "Green Energy"],
    hero_p: "A multilingual visual learning platform designed for equal opportunity and inclusive education.",
    hero_btn1: "Student Panel",
    hero_btn2: "Browse Dictionary",
    steps: ["For Everyone", "Learning Together", "Having Fun 🎉"],
    upload_title: "Student Content Upload Panel",
    upload_word: "Word",
    upload_meaning: "Meaning / Description",
    upload_name: "Student Name",
    upload_photo: "Upload Photo",
    upload_video: "Upload Video",
    upload_btn: "Upload",
    upload_success: "Content uploaded successfully! Awaiting teacher approval.",
    values: ["Entrepreneurship", "Production", "Inclusivity", "Green Energy", "Equal Opportunity", "Inclusive Education"],
    erasmus_text: "Coordinated by Bakırköy Science and Art Centre,",
    erasmus_project: '"A Common Language for Integrative Entrepreneurship (C-LINE)"',
    erasmus_agency: "Erasmus+ KA210-SCH project has been accepted by the Turkish National Agency.",
    dict_btn: "Browse Dictionary",
    sample_label: "Sample Word",
    sample_meaning: "A basic expression used during greetings.",
    student_video: "Student Video",
    footer_tagline: "Student Powered Learning System",
  },
  LV: {
    nav: ["Skolēna panelis", "Skolotāja panelis", "Vārdnīca"],
    hero_badge: "Foto + Video + Daudzvalodu vārdnīca",
    hero_h1: ["Uzņēmējdarbība, Ražošana,", "Iekļaušana &", "Zaļā enerģija"],
    hero_p: "Daudzvalodu vizuālās mācību platforma, kas veidota vienlīdzīgām iespējām un iekļaujošai izglītībai.",
    hero_btn1: "Skolēna panelis",
    hero_btn2: "Skatīt vārdnīcu",
    steps: ["Visiem", "Mācāmies Kopā", "Un Izklaidējamies 🎉"],
    upload_title: "Skolēna satura augšupielādes panelis",
    upload_word: "Vārds",
    upload_meaning: "Nozīme / Apraksts",
    upload_name: "Skolēna vārds",
    upload_photo: "Augšupielādēt foto",
    upload_video: "Augšupielādēt video",
    upload_btn: "Augšupielādēt",
    upload_success: "Saturs veiksmīgi augšupielādēts! Gaida skolotāja apstiprinājumu.",
    values: ["Uzņēmējdarbība", "Ražošana", "Iekļaušana", "Zaļā enerģija", "Vienlīdzīgas iespējas", "Iekļaujoša izglītība"],
    erasmus_text: "Bakırköy Zinātnes un mākslas centra koordinēts,",
    erasmus_project: '"A Common Language for Integrative Entrepreneurship (C-LINE)"',
    erasmus_agency: "Erasmus+ KA210-SCH projekts ir apstiprināts Turcijas Nacionālā aģentūra.",
    dict_btn: "Skatīt vārdnīcu",
    sample_label: "Parauga vārds",
    sample_meaning: "Pamata izteiksme, ko izmanto sveicināšanas laikā.",
    student_video: "Skolēna video",
    footer_tagline: "Student Powered Learning System",
  },
  IT: {
    nav: ["Pannello studente", "Pannello insegnante", "Dizionario"],
    hero_badge: "Foto + Video + Dizionario multilingue",
    hero_h1: ["Imprenditorialità, Produzione,", "Inclusività &", "Energia Verde"],
    hero_p: "Una piattaforma di apprendimento visivo multilingue progettata per le pari opportunità e l'istruzione inclusiva.",
    hero_btn1: "Pannello studente",
    hero_btn2: "Sfoglia dizionario",
    steps: ["Per Tutti", "Impariamo Insieme", "e Ci Divertiamo 🎉"],
    upload_title: "Pannello di caricamento contenuti studente",
    upload_word: "Parola",
    upload_meaning: "Significato / Descrizione",
    upload_name: "Nome studente",
    upload_photo: "Carica foto",
    upload_video: "Carica video",
    upload_btn: "Carica",
    upload_success: "Contenuto caricato con successo! In attesa dell'approvazione dell'insegnante.",
    values: ["Imprenditorialità", "Produzione", "Inclusività", "Energia Verde", "Pari opportunità", "Istruzione inclusiva"],
    erasmus_text: "Coordinato dal Centro Scientifico e Artistico di Bakırköy,",
    erasmus_project: '"A Common Language for Integrative Entrepreneurship (C-LINE)"',
    erasmus_agency: "Il progetto Erasmus+ KA210-SCH è stato accettato dall'Agenzia Nazionale turca.",
    dict_btn: "Sfoglia dizionario",
    sample_label: "Parola esempio",
    sample_meaning: "Un'espressione di base usata durante i saluti.",
    student_video: "Video studente",
    footer_tagline: "Student Powered Learning System",
  },
} as const;

type LangKey = keyof typeof LANGS;

const FLAGS: Record<LangKey, React.ReactNode> = {
  TR: (
    <svg width="28" height="20" viewBox="0 0 28 20" style={{borderRadius:3,display:"block"}}>
      <rect width="28" height="20" fill="#E30A17"/>
      <circle cx="11.5" cy="10" r="4.2" fill="white"/>
      <circle cx="13" cy="10" r="3.3" fill="#E30A17"/>
      <polygon points="17,10 18.8,12.8 20.8,11.2 20.1,14.4 23.2,14.1 21.2,16.6 23.7,18.2 20.6,18.5 21,21.7 18.5,19.8 17,22.6 15.5,19.8 13,21.7 13.4,18.5 10.3,18.2 12.8,16.6 10.8,14.1 13.9,14.4 13.2,11.2 15.2,12.8" fill="white" transform="scale(0.55) translate(12,-6)"/>
    </svg>
  ),
  EN: (
    <svg width="28" height="20" viewBox="0 0 60 40" style={{borderRadius:3,display:"block"}}>
      <rect width="60" height="40" fill="#012169"/>
      <path d="M0,0 L60,40 M60,0 L0,40" stroke="white" strokeWidth="8"/>
      <path d="M0,0 L60,40 M60,0 L0,40" stroke="#C8102E" strokeWidth="5"/>
      <path d="M30,0 V40 M0,20 H60" stroke="white" strokeWidth="12"/>
      <path d="M30,0 V40 M0,20 H60" stroke="#C8102E" strokeWidth="8"/>
    </svg>
  ),
  LV: (
    <svg width="28" height="20" viewBox="0 0 28 20" style={{borderRadius:3,display:"block"}}>
      <rect width="28" height="20" fill="#9E3039"/>
      <rect y="7.2" width="28" height="5.6" fill="white"/>
    </svg>
  ),
  IT: (
    <svg width="28" height="20" viewBox="0 0 30 20" style={{borderRadius:3,display:"block"}}>
      <rect width="10" height="20" fill="#009246"/>
      <rect x="10" width="10" height="20" fill="white"/>
      <rect x="20" width="10" height="20" fill="#CE2B37"/>
    </svg>
  ),
};

const ErasmusLogo = () => (
  <svg viewBox="0 0 120 36" width="120" height="36" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="36" rx="4" fill="#003DA5"/>
    <text x="8" y="13" fontFamily="Arial" fontSize="7" fill="#FFCC00" fontWeight="bold">ERASMUS+</text>
    <text x="8" y="25" fontFamily="Arial" fontSize="5.5" fill="white">European Commission</text>
    <circle cx="104" cy="18" r="12" fill="none" stroke="#FFCC00" strokeWidth="1.5"/>
    {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => {
      const a = (i * 30 - 90) * Math.PI / 180;
      return <circle key={i} cx={104 + 9*Math.cos(a)} cy={18 + 9*Math.sin(a)} r="1.5" fill="#FFCC00"/>;
    })}
  </svg>
);

export default function App() {
  const [lang, setLang] = useState<LangKey>("TR");
  const [showUpload, setShowUpload] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [form, setForm] = useState<{ word: string; meaning: string; name: string; photo: File | null; video: File | null }>({ word: "", meaning: "", name: "", photo: null, video: null });
  const [photoName, setPhotoName] = useState("");
  const [videoName, setVideoName] = useState("");

  const t = LANGS[lang];

  function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUploadSuccess(true);
    setForm({ word: "", meaning: "", name: "", photo: null, video: null });
    setPhotoName(""); setVideoName("");
    setTimeout(() => setUploadSuccess(false), 4000);
  }

  const styles = {
    body: {
      minHeight: "100vh",
      background: "linear-gradient(160deg, #050d1a 0%, #071428 40%, #0a1a1f 100%)",
      color: "white",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      margin: 0,
      padding: 0,
    },
    nav: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "18px 48px",
      borderBottom: "1px solid rgba(255,255,255,0.07)",
      position: "sticky",
      top: 0,
      background: "rgba(5,13,26,0.92)",
      backdropFilter: "blur(12px)",
      zIndex: 100,
    },
    logo: {
      display: "flex",
      alignItems: "center",
      gap: 12,
    },
    logoIcon: {
      width: 40,
      height: 40,
      borderRadius: 12,
      background: "linear-gradient(135deg, #22d3ee, #facc15)",
      color: "#050d1a",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 22,
      fontWeight: 900,
    },
    logoText: { margin: 0, fontSize: 18, fontWeight: 800, letterSpacing: -0.5 },
    logoSub: { margin: 0, fontSize: 11, color: "#64748b" },
    navLinks: {
      display: "flex",
      gap: 8,
      alignItems: "center",
    },
    navBtn: {
      padding: "8px 18px",
      borderRadius: 20,
      border: "1px solid rgba(255,255,255,0.15)",
      background: "transparent",
      color: "white",
      fontSize: 13,
      cursor: "pointer",
      fontWeight: 500,
      transition: "all 0.2s",
    },
    langBtns: {
      display: "flex",
      gap: 4,
    },
    langBtn: (active) => ({
      display: "flex",
      alignItems: "center",
      gap: 5,
      padding: "5px 10px",
      borderRadius: 16,
      border: active ? "1.5px solid #22d3ee" : "1px solid rgba(255,255,255,0.15)",
      background: active ? "rgba(34,211,238,0.15)" : "transparent",
      color: active ? "#22d3ee" : "#94a3b8",
      fontSize: 12,
      fontWeight: 700,
      cursor: "pointer",
    }),
    hero: {
      padding: "80px 48px 60px",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 60,
      alignItems: "center",
      maxWidth: 1200,
      margin: "0 auto",
    },
    badge: {
      display: "inline-block",
      padding: "6px 16px",
      borderRadius: 20,
      background: "rgba(34,211,238,0.12)",
      border: "1px solid rgba(34,211,238,0.3)",
      color: "#22d3ee",
      fontSize: 12,
      fontWeight: 600,
      marginBottom: 24,
    },
    h1: {
      fontSize: 48,
      fontWeight: 900,
      lineHeight: 1.1,
      margin: "0 0 20px",
      letterSpacing: -1.5,
    },
    heroP: {
      color: "#94a3b8",
      lineHeight: 1.7,
      fontSize: 16,
      margin: "0 0 32px",
    },
    heroBtns: { display: "flex", gap: 12 },
    btnPrimary: {
      padding: "14px 28px",
      borderRadius: 14,
      border: 0,
      background: "#22d3ee",
      color: "#050d1a",
      fontWeight: 900,
      fontSize: 15,
      cursor: "pointer",
    },
    btnSecondary: {
      padding: "14px 28px",
      borderRadius: 14,
      border: "1px solid rgba(255,255,255,0.2)",
      background: "transparent",
      color: "white",
      fontWeight: 700,
      fontSize: 15,
      cursor: "pointer",
    },
    sampleCard: {
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.12)",
      borderRadius: 24,
      padding: 24,
      backdropFilter: "blur(10px)",
    },
    sampleTop: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    approvedBadge: {
      background: "#facc15",
      color: "#050d1a",
      padding: "4px 12px",
      borderRadius: 20,
      fontSize: 12,
      fontWeight: 900,
    },
    mediaRow: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12,
      marginBottom: 16,
    },
    imgBox: {
      background: "linear-gradient(135deg, #22d3ee33, #3b82f633)",
      borderRadius: 14,
      height: 100,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 32,
    },
    videoBox: {
      background: "rgba(0,0,0,0.4)",
      borderRadius: 14,
      height: 100,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      fontSize: 13,
      color: "#94a3b8",
    },
    playBtn: {
      width: 36,
      height: 36,
      borderRadius: "50%",
      background: "rgba(255,255,255,0.2)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 16,
    },
    meaningBox: {
      background: "rgba(255,255,255,0.04)",
      borderRadius: 10,
      padding: "10px 14px",
    },
    meaningLabel: { color: "#64748b", fontSize: 11, marginBottom: 4 },
    steps: {
      background: "rgba(255,255,255,0.03)",
      padding: "60px 48px",
      borderTop: "1px solid rgba(255,255,255,0.06)",
    },
    stepsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 20,
      maxWidth: 900,
      margin: "0 auto",
    },
    stepCard: {
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: 20,
      padding: 28,
    },
    stepNum: { color: "#22d3ee", fontWeight: 900, fontSize: 14, marginBottom: 12 },
    stepIcon: { fontSize: 32, marginBottom: 12 },
    stepTitle: { fontWeight: 700, fontSize: 17 },
    uploadSection: {
      padding: "60px 48px",
      maxWidth: 700,
      margin: "0 auto",
    },
    uploadCard: {
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.12)",
      borderRadius: 24,
      padding: 36,
    },
    uploadTitle: { fontSize: 26, fontWeight: 800, marginBottom: 28 },
    inputRow: { marginBottom: 16 },
    label: { display: "block", color: "#94a3b8", fontSize: 13, marginBottom: 6 },
    input: {
      width: "100%",
      padding: "13px 16px",
      borderRadius: 12,
      border: "1px solid rgba(255,255,255,0.15)",
      background: "rgba(255,255,255,0.06)",
      color: "white",
      fontSize: 15,
      boxSizing: "border-box",
      outline: "none",
    },
    fileRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 },
    fileBtn: {
      padding: "12px",
      borderRadius: 12,
      border: "1.5px dashed rgba(255,255,255,0.2)",
      background: "transparent",
      color: "#94a3b8",
      fontSize: 13,
      cursor: "pointer",
      textAlign: "center",
    },
    successBox: {
      background: "rgba(34,197,94,0.12)",
      border: "1px solid rgba(34,197,94,0.3)",
      borderRadius: 12,
      padding: "14px 18px",
      color: "#4ade80",
      fontWeight: 600,
      marginBottom: 16,
    },
    valuesSection: {
      padding: "50px 48px",
      borderTop: "1px solid rgba(255,255,255,0.06)",
    },
    valuesGrid: {
      display: "flex",
      flexWrap: "wrap",
      gap: 10,
      marginTop: 20,
      maxWidth: 800,
      margin: "16px auto 0",
    },
    valueChip: {
      padding: "8px 20px",
      borderRadius: 20,
      background: "rgba(34,211,238,0.1)",
      border: "1px solid rgba(34,211,238,0.25)",
      color: "#22d3ee",
      fontSize: 14,
      fontWeight: 600,
    },
    erasmusSection: {
      padding: "50px 48px",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      textAlign: "center",
    },
    erasmusInner: {
      maxWidth: 700,
      margin: "0 auto",
    },
    erasmusFlags: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 20,
      marginBottom: 28,
    },
    flagItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 6,
    },
    flagLabel: { fontSize: 11, color: "#64748b" },
    erasmusText: {
      color: "#94a3b8",
      lineHeight: 1.8,
      fontSize: 15,
    },
    erasmusProject: {
      color: "#22d3ee",
      fontWeight: 700,
    },
    footer: {
      padding: "28px 48px",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      textAlign: "center",
      color: "#475569",
      fontSize: 13,
    },
  };

  const stepIcons = ["🌍", "🤝", "🎓"];

  return (
    <div style={styles.body}>
      {/* NAV */}
      <nav style={styles.nav}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>C</div>
          <div>
            <p style={styles.logoText}>C-LINE TV</p>
            <p style={styles.logoSub}>Visual Learning Platform</p>
          </div>
        </div>
        <div style={styles.navLinks}>
          <button style={styles.navBtn} onClick={() => setShowUpload(true)}>
            {t.nav[0]}
          </button>
          <button
            style={styles.navBtn}
            onClick={() => window.open("https://bakirkoybilsem1.github.io/c-line-tv/admin", "_blank")}
          >
            {t.nav[1]}
          </button>
          <button
            style={styles.navBtn}
            onClick={() => window.open("https://bakirkoybilsem1.github.io/c-line-tv/dictionary", "_blank")}
          >
            {t.nav[2]}
          </button>
        </div>
        <div style={styles.langBtns}>
          {(["TR", "EN", "LV", "IT"] as LangKey[]).map((l) => (
            <button key={l} style={styles.langBtn(lang === l)} onClick={() => setLang(l)}>
              {FLAGS[l]} {l}
            </button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section style={styles.hero}>
        <div>
          <span style={styles.badge}>{t.hero_badge}</span>
          <h1 style={styles.h1}>
            {t.hero_h1.map((line, i) => (
              <span key={i} style={{ display: "block", color: i === 1 ? "#22d3ee" : "white" }}>
                {line}
              </span>
            ))}
          </h1>
          <p style={styles.heroP}>{t.hero_p}</p>
          <div style={styles.heroBtns}>
            <button style={styles.btnPrimary} onClick={() => setShowUpload(true)}>
              {t.hero_btn1}
            </button>
            <button
              style={styles.btnSecondary}
              onClick={() => window.open("https://bakirkoybilsem1.github.io/c-line-tv/dictionary", "_blank")}
            >
              {t.hero_btn2}
            </button>
          </div>
        </div>
        <div style={styles.sampleCard}>
          <div style={styles.sampleTop}>
            <span style={{ color: "#64748b", fontSize: 12 }}>{t.sample_label}</span>
            <span style={styles.approvedBadge}>Approved</span>
          </div>
          <h2 style={{ fontSize: 36, margin: "0 0 14px", fontWeight: 900 }}>👋 Hello</h2>
          <div style={styles.mediaRow}>
            <div style={styles.imgBox}>📷</div>
            <div style={styles.videoBox}>
              <div style={styles.playBtn}>▶</div>
              <span>{t.student_video}</span>
            </div>
          </div>
          <div style={styles.meaningBox}>
            <p style={styles.meaningLabel}>Meaning</p>
            <p style={{ margin: 0, fontSize: 14, color: "#e2e8f0" }}>{t.sample_meaning}</p>
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section style={styles.steps}>
        <div style={styles.stepsGrid}>
          {t.steps.map((s, i) => (
            <div key={i} style={styles.stepCard}>
              <p style={styles.stepNum}>0{i + 1}</p>
              <div style={styles.stepIcon}>{stepIcons[i]}</div>
              <p style={styles.stepTitle}>{s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* UPLOAD PANEL */}
      {showUpload && (
        <section style={styles.uploadSection}>
          <div style={styles.uploadCard}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
              <h2 style={{ ...styles.uploadTitle, margin: 0 }}>{t.upload_title}</h2>
              <button
                onClick={() => setShowUpload(false)}
                style={{ background: "none", border: "none", color: "#64748b", fontSize: 22, cursor: "pointer" }}
              >✕</button>
            </div>
            {uploadSuccess && <div style={styles.successBox}>✅ {t.upload_success}</div>}
            <form onSubmit={handleUpload}>
              <div style={styles.inputRow}>
                <label style={styles.label}>{t.upload_word}</label>
                <input
                  style={styles.input}
                  value={form.word}
                  onChange={e => setForm({ ...form, word: e.target.value })}
                  required
                />
              </div>
              <div style={styles.inputRow}>
                <label style={styles.label}>{t.upload_meaning}</label>
                <textarea
                  style={{ ...styles.input, height: 90, resize: "vertical" }}
                  value={form.meaning}
                  onChange={e => setForm({ ...form, meaning: e.target.value })}
                  required
                />
              </div>
              <div style={styles.inputRow}>
                <label style={styles.label}>{t.upload_name}</label>
                <input
                  style={styles.input}
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div style={styles.fileRow}>
                <label style={styles.fileBtn}>
                  📷 {photoName || t.upload_photo}
                  <input type="file" accept="image/*" style={{ display: "none" }}
                    onChange={(e) => {
                      const file = e.target.files?.[0] ?? null;
                      setForm({ ...form, photo: file });
                      setPhotoName(file?.name || "");
                    }} />
                </label>
                <label style={styles.fileBtn}>
                  🎬 {videoName || t.upload_video}
                  <input type="file" accept="video/*" style={{ display: "none" }}
                    onChange={(e) => {
                      const file = e.target.files?.[0] ?? null;
                      setForm({ ...form, video: file });
                      setVideoName(file?.name || "");
                    }} />
                </label>
              </div>
              <button
                type="submit"
                style={{ ...styles.btnPrimary, width: "100%", fontSize: 16 }}
              >
                {t.upload_btn}
              </button>
            </form>
          </div>
        </section>
      )}

      {/* VALUES */}
      <section style={styles.valuesSection}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, color: "#94a3b8", marginBottom: 0 }}>
            C-LINE Değerleri / Values
          </h3>
          <div style={styles.valuesGrid}>
            {t.values.map((v, i) => (
              <span key={i} style={styles.valueChip}>{v}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ERASMUS SECTION */}
      <section style={styles.erasmusSection}>
        <div style={styles.erasmusInner}>
          <div style={styles.erasmusFlags}>
            <div style={styles.flagItem}>
              {FLAGS.TR}
              <span style={styles.flagLabel}>Türkiye</span>
            </div>
            <div style={styles.flagItem}>
              {FLAGS.LV}
              <span style={styles.flagLabel}>Latvija</span>
            </div>
            <div style={styles.flagItem}>
              {FLAGS.IT}
              <span style={styles.flagLabel}>Italia</span>
            </div>
            <div style={{ width: 1, height: 40, background: "rgba(255,255,255,0.1)" }} />
            <ErasmusLogo />
          </div>
          <p style={styles.erasmusText}>
            {t.erasmus_text}{" "}
            <span style={styles.erasmusProject}>{t.erasmus_project}</span>{" "}
            {t.erasmus_agency}
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        C-LINE TV · TR / EN / LV / IT · {t.footer_tagline}
      </footer>
    </div>
  );
}

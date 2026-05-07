"use client";

import { useState } from "react";

type Lang = "tr" | "en" | "lv" | "it";

const text = {
  tr: {
    hero: "İşaret Dili Kütüphanesi",
    slogan1: "Herkes İçin Girişimcilik",
    slogan2: "Kapsayıcılık",
    slogan3: "Herkes İçin Dijital Dönüşüm",
    slogan4: "Yeşil Enerji",
    student: "Öğrenci Paneli",
    teacher: "Öğretmen Paneli",
    dict: "Sözlüğü İncele",
    badge: "Fotoğraf ve Video Yükle",
    word: "Örnek Kelime",
    meaning: "Selamlaşma sırasında kullanılan temel ifade.",
    f1: "Öğrenci içerik yükler",
    f2: "Öğretmen onaylar",
    f3: "Sözlükte yayınlanır",
    footer: `Bakırköy Bilim ve Sanat Merkezi koordinatörlüğünde hazırlanan "A Common Language for Integrative Entrepreneurship (C-LINE)" başlıklı Erasmus+ KA210-SCH projesi, Türkiye Ulusal Ajansı tarafından kabul edilmiştir.`,
  },
  en: {
    hero: "Sign Language Library",
    slogan1: "Entrepreneurship for All",
    slogan2: "Inclusivity",
    slogan3: "Digital Transformation for All",
    slogan4: "Green Energy",
    student: "Student Panel",
    teacher: "Teacher Panel",
    dict: "View Dictionary",
    badge: "Upload Photo & Video",
    word: "Sample Word",
    meaning: "A basic expression used for greeting.",
    f1: "Student uploads content",
    f2: "Teacher approves",
    f3: "Published in dictionary",
    footer: `The Erasmus+ KA210-SCH project titled "A Common Language for Integrative Entrepreneurship (C-LINE)", coordinated by Bakırköy Science and Art Centre, has been accepted by the Turkish National Agency.`,
  },
  lv: {
    hero: "Zīmju valodas bibliotēka",
    slogan1: "Uzņēmējdarbība visiem",
    slogan2: "Iekļaušana",
    slogan3: "Digitālā transformācija visiem",
    slogan4: "Zaļā enerģija",
    student: "Skolēna panelis",
    teacher: "Skolotāja panelis",
    dict: "Skatīt vārdnīcu",
    badge: "Augšupielādēt foto un video",
    word: "Piemēra vārds",
    meaning: "Pamata izteiciens sveicienam.",
    f1: "Skolēns augšupielādē",
    f2: "Skolotājs apstiprina",
    f3: "Publicē vārdnīcā",
    footer: `Erasmus+ KA210-SCH projekts "A Common Language for Integrative Entrepreneurship (C-LINE)", ko koordinē Bakırköy Zinātnes un mākslas centrs, ir pieņemts Turcijas Nacionālās aģentūras.`,
  },
  it: {
    hero: "Biblioteca della Lingua dei Segni",
    slogan1: "Imprenditorialità per tutti",
    slogan2: "Inclusività",
    slogan3: "Trasformazione digitale per tutti",
    slogan4: "Energia verde",
    student: "Pannello Studente",
    teacher: "Pannello Docente",
    dict: "Visualizza Dizionario",
    badge: "Carica foto e video",
    word: "Parola Esempio",
    meaning: "Un'espressione di base usata per salutare.",
    f1: "Lo studente carica",
    f2: "Il docente approva",
    f3: "Pubblicato nel dizionario",
    footer: `Il progetto Erasmus+ KA210-SCH intitolato "A Common Language for Integrative Entrepreneurship (C-LINE)", coordinato dal Centro Scientifico e Artistico di Bakırköy, è stato accettato dall'Agenzia Nazionale Turca.`,
  },
};

const FLAGS: Record<string, string> = {
  TR: "🇹🇷",
  LV: "🇱🇻",
  IT: "🇮🇹",
};

export default function HomePage() {
  const [lang, setLang] = useState<Lang>("tr");
  const t = text[lang];

  return (
    <main className="page">
      <nav className="nav">
        <div className="brand">
          <div className="logo">C</div>
          <div>
            <h1>C-LINE TV</h1>
            <p>Visual Learning Platform</p>
          </div>
        </div>

        <div className="langs">
          {(["tr", "en", "lv", "it"] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={lang === l ? "active" : ""}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </nav>

      <section className="hero">
        <div className="heroText">
          <span className="badge">{t.badge}</span>
          <h2>{t.hero}</h2>

          <div className="slogans">
            {[t.slogan1, t.slogan2, t.slogan3, t.slogan4].map((s, i) => (
              <span key={i} className="slogan">{s}</span>
            ))}
          </div>

          <div className="actions">
            <a className="primary" href="/student">
              {t.student}
            </a>
            <a className="secondary" href="/admin">
              {t.teacher}
            </a>
            <a className="ghost" href="/dictionary">
              {t.dict}
            </a>
          </div>
        </div>

        <div className="preview">
          <div className="previewTop">
            <div>
              <small>{t.word}</small>
              <h3>👋 Hello</h3>
            </div>
            <span>Approved</span>
          </div>

          <div className="mediaGrid">
            <div className="photo">📷</div>
            <div className="video">
              <div className="play">▶</div>
              <p>Student Video</p>
            </div>
          </div>

          <div className="meaning">
            <small>Meaning</small>
            <p>{t.meaning}</p>
          </div>
        </div>
      </section>

      <section className="features">
        {[
          ["01", "📤", t.f1],
          ["02", "✅", t.f2],
          ["03", "🌍", t.f3],
        ].map(([no, icon, title]) => (
          <div className="feature" key={no}>
            <span>{no}</span>
            <div>{icon}</div>
            <h3>{title}</h3>
          </div>
        ))}
      </section>

      <footer>
        <div className="footerInner">
          <div className="erasmusLogo">
            <div className="erasmusIcon">E+</div>
            <span>Erasmus+</span>
          </div>

          <p className="footerText">{t.footer}</p>

          <div className="footerFlags">
            {Object.entries(FLAGS).map(([code, flag]) => (
              <span key={code} className="flagItem">
                {flag} {code}
              </span>
            ))}
          </div>

          <p className="footerSub">
            C-LINE TV · TR / EN / LV / IT · Student Powered Learning System
          </p>
        </div>
      </footer>

      <style jsx>{`
        .page {
          min-height: 100vh;
          background:
            radial-gradient(circle at 10% 10%, rgba(34, 211, 238, 0.35), transparent 30%),
            radial-gradient(circle at 90% 20%, rgba(250, 204, 21, 0.25), transparent 28%),
            radial-gradient(circle at 50% 80%, rgba(34, 197, 94, 0.15), transparent 35%),
            linear-gradient(135deg, #020617, #0f172a 55%, #111827);
          color: white;
          font-family: Inter, Arial, sans-serif;
          overflow-x: hidden;
        }

        .nav {
          width: min(1180px, calc(100% - 40px));
          margin: 0 auto;
          padding: 28px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .logo {
          width: 54px;
          height: 54px;
          border-radius: 18px;
          background: linear-gradient(135deg, #22d3ee, #facc15);
          color: #020617;
          display: grid;
          place-items: center;
          font-size: 30px;
          font-weight: 1000;
          box-shadow: 0 20px 50px rgba(34, 211, 238, 0.25);
        }

        .brand h1 {
          margin: 0;
          font-size: 28px;
          letter-spacing: -1px;
        }

        .brand p {
          margin: 4px 0 0;
          color: #94a3b8;
          font-size: 13px;
        }

        .langs {
          display: flex;
          gap: 8px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          padding: 6px;
          border-radius: 18px;
          backdrop-filter: blur(16px);
        }

        .langs button {
          border: 0;
          border-radius: 12px;
          padding: 10px 13px;
          background: transparent;
          color: #cbd5e1;
          font-weight: 800;
          cursor: pointer;
        }

        .langs button.active {
          background: #22d3ee;
          color: #020617;
        }

        .hero {
          width: min(1180px, calc(100% - 40px));
          margin: 55px auto 0;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 48px;
          align-items: center;
        }

        .badge {
          display: inline-block;
          padding: 10px 16px;
          border-radius: 999px;
          border: 1px solid rgba(34, 211, 238, 0.35);
          background: rgba(34, 211, 238, 0.12);
          color: #a5f3fc;
          font-weight: 800;
          font-size: 14px;
        }

        .hero h2 {
          margin: 24px 0 0;
          font-size: clamp(42px, 6vw, 78px);
          line-height: 0.95;
          letter-spacing: -3px;
          max-width: 780px;
        }

        .slogans {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 28px;
        }

        .slogan {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 999px;
          background: rgba(34, 197, 94, 0.12);
          border: 1px solid rgba(34, 197, 94, 0.3);
          color: #86efac;
          font-size: 13px;
          font-weight: 700;
        }

        .slogan::before {
          content: "✦";
          font-size: 10px;
          opacity: 0.7;
        }

        .actions {
          margin-top: 34px;
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
        }

        .actions a {
          text-decoration: none;
          padding: 16px 22px;
          border-radius: 18px;
          font-weight: 900;
          transition: 0.2s;
        }

        .actions a:hover {
          transform: translateY(-3px);
        }

        .primary {
          background: #22d3ee;
          color: #020617;
          box-shadow: 0 18px 40px rgba(34, 211, 238, 0.25);
        }

        .secondary {
          background: #facc15;
          color: #020617;
          box-shadow: 0 18px 40px rgba(250, 204, 21, 0.2);
        }

        .ghost {
          background: rgba(255, 255, 255, 0.08);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.14);
        }

        .preview {
          border-radius: 34px;
          padding: 24px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.14);
          backdrop-filter: blur(20px);
          box-shadow: 0 30px 90px rgba(0, 0, 0, 0.35);
        }

        .previewTop {
          display: flex;
          justify-content: space-between;
          align-items: start;
          gap: 20px;
          margin-bottom: 20px;
        }

        small {
          color: #94a3b8;
          font-weight: 800;
        }

        .preview h3 {
          margin: 6px 0 0;
          font-size: 38px;
        }

        .previewTop span {
          background: #facc15;
          color: #020617;
          padding: 9px 13px;
          border-radius: 999px;
          font-weight: 1000;
          font-size: 13px;
        }

        .mediaGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .photo,
        .video {
          min-height: 230px;
          border-radius: 28px;
          display: grid;
          place-items: center;
          text-align: center;
        }

        .photo {
          font-size: 72px;
          background: linear-gradient(135deg, #22d3ee, #2563eb);
        }

        .video {
          background: linear-gradient(135deg, #1e293b, #020617);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .play {
          width: 70px;
          height: 70px;
          display: grid;
          place-items: center;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.12);
          font-size: 28px;
          margin: 0 auto 12px;
        }

        .video p {
          color: #cbd5e1;
          margin: 0;
          font-weight: 800;
        }

        .meaning {
          margin-top: 18px;
          padding: 20px;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.07);
        }

        .meaning p {
          margin: 8px 0 0;
          font-size: 18px;
          color: white;
        }

        .features {
          width: min(1180px, calc(100% - 40px));
          margin: 70px auto 0;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .feature {
          padding: 28px;
          border-radius: 30px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.11);
        }

        .feature span {
          color: #22d3ee;
          font-weight: 1000;
        }

        .feature div {
          margin-top: 20px;
          font-size: 42px;
        }

        .feature h3 {
          margin: 16px 0 0;
          font-size: 24px;
        }

        footer {
          margin-top: 70px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.03);
        }

        .footerInner {
          width: min(1180px, calc(100% - 40px));
          margin: 0 auto;
          padding: 48px 0 36px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          text-align: center;
        }

        .erasmusLogo {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .erasmusIcon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: linear-gradient(135deg, #003399, #ffcc00);
          color: white;
          display: grid;
          place-items: center;
          font-size: 18px;
          font-weight: 900;
          letter-spacing: -1px;
        }

        .erasmusLogo span {
          font-size: 22px;
          font-weight: 900;
          color: #ffcc00;
          letter-spacing: -0.5px;
        }

        .footerText {
          max-width: 780px;
          color: #cbd5e1;
          line-height: 1.7;
          font-size: 15px;
          margin: 0;
        }

        .footerFlags {
          display: flex;
          gap: 24px;
          align-items: center;
        }

        .flagItem {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 20px;
          font-weight: 800;
          color: #e2e8f0;
          letter-spacing: 1px;
        }

        .footerSub {
          color: #64748b;
          font-size: 13px;
          margin: 0;
        }

        @media (max-width: 900px) {
          .nav {
            flex-direction: column;
            align-items: flex-start;
          }

          .hero {
            grid-template-columns: 1fr;
            margin-top: 30px;
          }

          .features {
            grid-template-columns: 1fr;
          }

          .mediaGrid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}

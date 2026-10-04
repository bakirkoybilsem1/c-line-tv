import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Footer from '../components/Footer'
import LanguageSwitcher from '../components/LanguageSwitcher'

const slogans = [
  { icon: '🌍', key: 'home.slogans.s1' },
  { icon: '💡', key: 'home.slogans.s2' },
  { icon: '🚀', key: 'home.slogans.s3' },
  { icon: '🤝', key: 'home.slogans.s4' },
  { icon: '✨', key: 'home.slogans.s5' },
]

const features = [
  { icon: '🤟', key: 'home.features.f1' },
  { icon: '🎓', key: 'home.features.f2' },
  { icon: '👩‍🏫', key: 'home.features.f3' },
]

export default function Home() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-blue-700 tracking-tight">C-LINE TV</span>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link to="/dictionary" className="text-gray-600 hover:text-blue-700 font-medium text-sm transition px-3 py-2">
              📖 {t('common.dictionary')}
            </Link>
            <Link to="/login" className="bg-blue-700 text-white font-semibold px-5 py-2 rounded-full hover:bg-blue-600 transition text-sm">
              {t('common.login')} →
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 bg-gradient-to-br from-blue-950 via-blue-800 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '60px 60px'}}></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block bg-white/10 border border-white/20 rounded-full px-4 py-1 text-sm text-blue-100 mb-6">
            {t('home.badge')}
          </div>
          <h1 className="text-6xl font-black mb-6 leading-tight">
            C-LINE TV
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-4 leading-relaxed">
            A Common Language for Integrative Entrepreneurship
          </p>
          <p className="text-blue-200 text-lg mb-10">
            {t('home.tagline')} 🤟
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/dictionary" className="bg-white text-blue-700 font-bold px-8 py-4 rounded-full hover:bg-blue-50 transition text-lg shadow-lg">
              📖 {t('home.goDictionary')}
            </Link>
            <Link to="/login" className="bg-white/10 border border-white/30 text-white font-bold px-8 py-4 rounded-full hover:bg-white/20 transition text-lg backdrop-blur">
              {t('common.login')} →
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-center text-gray-900 mb-4">{t('home.howTitle')}</h2>
          <p className="text-center text-gray-500 mb-12">{t('home.howSubtitle')}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition hover:-translate-y-1">
                <div className="text-5xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{t(`${f.key}.title`)}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{t(`${f.key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Slogans */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-center text-gray-900 mb-4">{t('home.visionTitle')}</h2>
          <p className="text-center text-gray-500 mb-12">{t('home.visionSubtitle')}</p>
          <div className="space-y-4">
            {slogans.map((s, i) => (
              <div key={i} className="flex items-start gap-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl px-6 py-5">
                <span className="text-2xl mt-0.5">{s.icon}</span>
                <p className="text-gray-700 font-medium leading-relaxed">{t(s.key)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-blue-700 text-white text-center">
        <h2 className="text-4xl font-black mb-4">{t('home.ctaTitle')}</h2>
        <p className="text-blue-100 mb-8 text-lg">{t('home.ctaText')}</p>
        <Link to="/login" className="bg-white text-blue-700 font-bold px-10 py-4 rounded-full hover:bg-blue-50 transition text-lg inline-block">
          {t('common.login')} →
        </Link>
      </section>

      <Footer />
    </div>
  )
}

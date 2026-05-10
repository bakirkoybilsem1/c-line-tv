import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const slogans = [
  'Sınırları ve sorunları ortadan kaldıran platform…',
  'Farklılıklarla Güçlenen Fikirler, Ortak Bir Dilde Üreten Gelecek.',
  'Girişimcilikte Sınır Yok, Bütünleştiren Adımlar Var!',
  'Sorunları Aşan Fikirler, Herkese Açık Fırsatlar.',
  'Çeşitlilikten Doğan Yenilik, Hepimiz İçin Girişimcilik.',
]

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="bg-blue-700 text-white py-6 px-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">C-LINE TV</h1>
          <p className="text-blue-200 text-sm mt-1">A Common Language for Integrative Entrepreneurship</p>
        </div>
        <nav className="flex gap-4">
          <Link to="/dictionary" className="bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 transition">
            📖 Sözlük
          </Link>
          <Link to="/login" className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-400 transition">
            Giriş Yap
          </Link>
        </nav>
      </header>

      <div className="bg-gradient-to-br from-blue-700 to-blue-500 text-white py-24 px-8 text-center">
        <h2 className="text-5xl font-extrabold mb-4">C-LINE TV</h2>
        <p className="text-xl text-blue-100 max-w-2xl mx-auto">
          İşaret dili ile köprüler kuran, fikirleri birleştiren platform
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <Link to="/dictionary" className="bg-white text-blue-700 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition text-lg">
            📖 Sözlüğe Git
          </Link>
          <Link to="/login" className="bg-blue-900 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-800 transition text-lg">
            Giriş Yap
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-16 px-8 w-full">
        <h3 className="text-2xl font-bold text-blue-700 mb-8 text-center">Vizyonumuz</h3>
        <div className="grid gap-4">
          {slogans.map((slogan, i) => (
            <div key={i} className="bg-blue-50 border-l-4 border-blue-500 px-6 py-4 rounded-r-xl text-gray-700 text-lg font-medium">
              {slogan}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

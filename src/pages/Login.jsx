import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Footer from '../components/Footer'

export default function Login() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function handleLogin() {
    setLoading(true)
    setTimeout(() => {
      if (password === 'cline12345') {
        sessionStorage.setItem('role', 'student')
        navigate('/upload')
      } else if (password === 'admin12345') {
        sessionStorage.setItem('role', 'teacher')
        navigate('/teacher')
      } else {
        setError('Şifre hatalı. Lütfen tekrar deneyin.')
        setLoading(false)
      }
    }, 500)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-950 via-blue-800 to-blue-600">
      <header className="py-6 px-8">
        <Link to="/" className="text-white text-2xl font-bold tracking-tight">C-LINE TV</Link>
      </header>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-10 w-full max-w-md shadow-2xl">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">🤟</div>
            <h2 className="text-3xl font-bold text-white mb-2">Giriş Yap</h2>
            <p className="text-blue-200 text-sm">C-LINE TV platformuna hoş geldiniz</p>
          </div>

          <div className="mb-5">
            <label className="block text-blue-100 font-medium mb-2 text-sm">Şifre</label>
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError('') }}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              placeholder="••••••••••"
              className="w-full bg-white/10 border border-white/30 text-white placeholder-blue-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
            />
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-400/30 text-red-200 rounded-xl px-4 py-3 mb-5 text-sm text-center">
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading || !password}
            className="w-full bg-white text-blue-700 font-bold py-3 rounded-xl hover:bg-blue-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '...' : 'Giriş Yap →'}
          </button>

          <div className="mt-6 text-center">
            <Link to="/dictionary" className="text-blue-200 text-sm hover:text-white transition">
              📖 Sözlüğe göz at
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

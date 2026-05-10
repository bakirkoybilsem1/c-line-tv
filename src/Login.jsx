import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Footer from '../components/Footer'

export default function Login() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleLogin() {
    if (password === 'cline12345') {
      sessionStorage.setItem('role', 'student')
      navigate('/upload')
    } else if (password === 'admin12345') {
      sessionStorage.setItem('role', 'teacher')
      navigate('/teacher')
    } else {
      setError('Şifre hatalı. Lütfen tekrar deneyin.')
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-blue-700 text-white py-4 px-8 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">C-LINE TV</Link>
      </header>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md">
          <h2 className="text-2xl font-bold text-blue-700 mb-2 text-center">Giriş Yap</h2>
          <p className="text-gray-500 text-center mb-8 text-sm">Öğrenci veya öğretmen şifrenizi girin</p>

          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">Şifre</label>
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError('') }}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              placeholder="Şifrenizi girin"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            onClick={handleLogin}
            className="w-full bg-blue-700 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Giriş Yap
          </button>

          <div className="mt-6 text-center text-sm text-gray-400 space-y-1">
            <p>🎓 Öğrenci: cline12345</p>
            <p>👩‍🏫 Öğretmen: admin12345</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

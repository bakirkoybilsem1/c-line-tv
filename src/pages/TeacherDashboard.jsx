import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Footer from '../components/Footer'

export default function TeacherDashboard() {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('pending')
  const navigate = useNavigate()

  function logout() {
    sessionStorage.removeItem('role')
    navigate('/')
  }

  async function fetchSubmissions(status) {
    setLoading(true)
    const { data } = await supabase
      .from('submissions')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false })
    setSubmissions(data || [])
    setLoading(false)
  }

  async function handleStatus(id, status) {
    await supabase.from('submissions').update({ status }).eq('id', id)
    fetchSubmissions(tab)
  }

  async function handleDelete(id) {
    if (!confirm('Bu kelimeyi silmek istediğinizden emin misiniz?')) return
    await supabase.from('submissions').delete().eq('id', id)
    fetchSubmissions(tab)
  }

  useEffect(() => { fetchSubmissions(tab) }, [tab])

  const tabs = [
    { key: 'pending', label: '⏳ Bekleyen' },
    { key: 'approved', label: '✅ Onaylanan' },
    { key: 'rejected', label: '❌ Reddedilen' },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-blue-700 text-white py-4 px-8 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">C-LINE TV</Link>
        <div className="flex items-center gap-4">
          <span className="text-blue-200 text-sm">👩‍🏫 Öğretmen Paneli</span>
          <button onClick={logout} className="text-sm bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-400 transition">Çıkış</button>
        </div>
      </header>

      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">Kelime Yönetimi</h2>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-5 py-2 rounded-lg font-medium transition ${
                tab === t.key
                  ? 'bg-blue-700 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {loading && <div className="text-center text-gray-400 py-20">Yükleniyor...</div>}

        {!loading && submissions.length === 0 && (
          <div className="text-center bg-white rounded-2xl shadow p-16 text-gray-400">
            <p className="text-5xl mb-4">📭</p>
            <p className="text-lg font-medium">Bu kategoride kelime yok</p>
          </div>
        )}

        <div className="grid gap-6">
          {submissions.map(sub => (
            <div key={sub.id} className="bg-white rounded-2xl shadow p-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{sub.word}</h3>
                  {sub.student_name && (
                    <p className="text-sm text-gray-500">👤 {sub.student_name}</p>
                  )}
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(sub.created_at).toLocaleDateString('tr-TR')}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                  <p className="text-sm text-gray-500 mb-2">📷 Fotoğraf</p>
                  <img src={sub.photo_url} alt={sub.word} className="w-full h-40 object-cover rounded-lg border" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">🎥 Video</p>
                  <video src={sub.video_url} controls className="w-full h-40 rounded-lg border bg-black" />
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                {tab !== 'approved' && (
                  <button onClick={() => handleStatus(sub.id, 'approved')}
                    className="flex-1 bg-green-600 text-white font-bold py-2 rounded-lg hover:bg-green-500 transition">
                    ✅ Onayla
                  </button>
                )}
                {tab !== 'pending' && (
                  <button onClick={() => handleStatus(sub.id, 'pending')}
                    className="flex-1 bg-yellow-500 text-white font-bold py-2 rounded-lg hover:bg-yellow-400 transition">
                    ⏳ Beklemeye Al
                  </button>
                )}
                {tab !== 'rejected' && (
                  <button onClick={() => handleStatus(sub.id, 'rejected')}
                    className="flex-1 bg-red-500 text-white font-bold py-2 rounded-lg hover:bg-red-400 transition">
                    ❌ Reddet
                  </button>
                )}
                <button onClick={() => handleDelete(sub.id)}
                  className="bg-gray-200 text-gray-700 font-bold px-4 py-2 rounded-lg hover:bg-gray-300 transition">
                  🗑️ Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

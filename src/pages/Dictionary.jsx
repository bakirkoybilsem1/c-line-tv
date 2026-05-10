import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Footer from '../components/Footer'

export default function Dictionary() {
  const [words, setWords] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    async function fetchWords() {
      const { data } = await supabase
        .from('submissions')
        .select('*')
        .eq('status', 'approved')
        .order('word', { ascending: true })
      setWords(data || [])
      setLoading(false)
    }
    fetchWords()
  }, [])

  function randomWord() {
    if (words.length === 0) return
    const random = words[Math.floor(Math.random() * words.length)]
    setSelected(random)
    setSearch('')
  }

  const filtered = words.filter(w =>
    w.word.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-blue-700 text-white py-4 px-8 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">C-LINE TV</Link>
        <Link to="/login" className="text-sm bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-400 transition">
          Giriş Yap
        </Link>
      </header>

      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
        <h2 className="text-2xl font-bold text-blue-700 mb-2">📖 İşaret Dili Sözlüğü</h2>
        <p className="text-gray-500 mb-8 text-sm">Öğrenciler tarafından hazırlanan işaret dili videoları</p>

        {/* Arama ve Rastgele */}
        <div className="flex gap-3 mb-8">
          <input
            type="text"
            value={search}
            onChange={e => { setSearch(e.target.value); setSelected(null) }}
            placeholder="Kelime ara..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
          <button
            onClick={randomWord}
            className="bg-blue-700 text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-600 transition whitespace-nowrap"
          >
            🎲 Rastgele
          </button>
        </div>

        {/* Seçili kelime */}
        {selected && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-2 border-blue-200">
            <h3 className="text-2xl font-bold text-blue-700 mb-4">{selected.word}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-2">📷 Fotoğraf</p>
                <img
                  src={selected.photo_url}
                  alt={selected.word}
                  className="w-full h-48 object-cover rounded-lg border"
                />

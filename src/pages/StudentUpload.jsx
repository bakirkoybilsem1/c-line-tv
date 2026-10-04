import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { supabase } from '../lib/supabase'
import Footer from '../components/Footer'
import LanguageSwitcher from '../components/LanguageSwitcher'

export default function StudentUpload() {
  const { t } = useTranslation()
  const [name, setName] = useState('')
  const [word, setWord] = useState('')
  const [photo, setPhoto] = useState(null)
  const [video, setVideo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  // error: null | { type: 'fill' } | { type: 'api', detail: string }
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  function logout() {
    sessionStorage.removeItem('role')
    navigate('/')
  }

  // Dosya adındaki boşlukları ve özel karakterleri temizler
  function sanitize(filename) {
    return filename.replace(/\s+/g, '_').replace(/[^\w.\-]/g, '')
  }

  async function handleSubmit() {
    if (!name || !word || !photo || !video) {
      setError({ type: 'fill' })
      return
    }
    setLoading(true)
    setError(null)
    setSuccess(false)
    try {
      const photoPath = `photos/${Date.now()}-${sanitize(photo.name)}`
      const { data: photoData, error: photoError } = await supabase.storage.from('media').upload(photoPath, photo)
      if (photoError) throw photoError

      const videoPath = `videos/${Date.now()}-${sanitize(video.name)}`
      const { data: videoData, error: videoError } = await supabase.storage.from('media').upload(videoPath, video)
      if (videoError) throw videoError

      const photoUrl = supabase.storage.from('media').getPublicUrl(photoData.path).data.publicUrl
      const videoUrl = supabase.storage.from('media').getPublicUrl(videoData.path).data.publicUrl

      const { error: dbError } = await supabase.from('submissions').insert({
        student_name: name, word, photo_url: photoUrl, video_url: videoUrl, status: 'pending'
      })
      if (dbError) throw dbError

      setSuccess(true)
      setName('')
      setWord('')
      setPhoto(null)
      setVideo(null)
    } catch (err) {
      setError({ type: 'api', detail: JSON.stringify(err) })
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-blue-700 text-white py-4 px-8 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">C-LINE TV</Link>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <button onClick={logout} className="text-sm bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-400 transition">{t('common.logout')}</button>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-lg">
          <h2 className="text-2xl font-bold text-blue-700 mb-2">{t('upload.title')}</h2>
          <p className="text-gray-500 mb-8 text-sm">{t('upload.subtitle')}</p>

          {success && (
            <div className="bg-green-50 border border-green-300 text-green-700 rounded-lg px-4 py-3 mb-6">
              ✅ {t('upload.success')}
            </div>
          )}

          <div className="mb-5">
            <label className="block text-gray-600 font-medium mb-2">👤 {t('upload.fullName')}</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder={t('upload.namePlaceholder')}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="mb-5">
            <label className="block text-gray-600 font-medium mb-2">🤟 {t('upload.wordLabel')}</label>
            <input type="text" value={word} onChange={e => setWord(e.target.value)} placeholder={t('upload.wordPlaceholder')}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="mb-5">
            <label className="block text-gray-600 font-medium mb-2">📷 {t('common.photo')}</label>
            <input type="file" accept="image/*" onChange={e => setPhoto(e.target.files[0])}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-600" />
          </div>

          <div className="mb-8">
            <label className="block text-gray-600 font-medium mb-2">🎥 {t('common.video')}</label>
            <input type="file" accept="video/*" onChange={e => setVideo(e.target.files[0])}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-600" />
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-4">
              {error.type === 'fill' ? t('upload.fillAll') : t('upload.errorPrefix') + error.detail}
            </p>
          )}

          <button onClick={handleSubmit} disabled={loading}
            className="w-full bg-blue-700 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition disabled:opacity-50">
            {loading ? t('upload.uploading') : t('upload.submit')}
          </button>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 px-8 mt-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center gap-6 mb-6">
          <div className="flex flex-col items-center gap-1">
            <span className="text-4xl">🇹🇷</span>
            <span className="text-xs text-gray-400">Türkiye</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-4xl">🇮🇹</span>
            <span className="text-xs text-gray-400">İtalya</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-4xl">🇱🇻</span>
            <span className="text-xs text-gray-400">Letonya</span>
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-lg px-4 py-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Erasmus%2B_Logo.svg/320px-Erasmus%2B_Logo.svg.png"
              alt="Erasmus+ Logo"
              className="h-10"
            />
          </div>
        </div>

        <p className="text-center text-gray-400 text-sm leading-relaxed max-w-2xl mx-auto">
          Bakırköy Bilim ve Sanat Merkezi koordinatörlüğünde hazırlanan{' '}
          <span className="text-white font-semibold">
            "A Common Language for Integrative Entrepreneurship (C-LINE)"
          </span>{' '}
          başlıklı Erasmus+ KA210-SCH projesi, Türkiye Ulusal Ajansı tarafından kabul edilmiştir.
        </p>
      </div>
    </footer>
  )
}

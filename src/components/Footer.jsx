export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10 px-8 mt-auto">
      <div className="max-w-4xl mx-auto">

        {/* Bayraklar */}
        <div className="flex justify-center gap-8 mb-6 text-5xl">
          <span title="Türkiye">🇹🇷</span>
          <span title="İtalya">🇮🇹</span>
          <span title="Letonya">🇱🇻</span>
        </div>

        {/* Erasmus+ Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Erasmus%2B_Logo.svg/320px-Erasmus%2B_Logo.svg.png"
            alt="Erasmus+ Logo"
            className="h-12"
          />
        </div>

        {/* Açıklama */}
        <p className="text-center text-gray-300 text-sm leading-relaxed max-w-2xl mx-auto">
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

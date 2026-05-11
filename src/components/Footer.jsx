export default function Footer() {
  const flags = [
    { code: 'tr', name: 'Türkiye', color: '#E30A17' },
    { code: 'it', name: 'İtalya', color: '#009246' },
    { code: 'lv', name: 'Letonya', color: '#9E3039' },
  ]

  return (
    <footer className="bg-gray-900 text-white py-12 px-8 mt-auto">
      <div className="max-w-4xl mx-auto">

        {/* Bayraklar */}
        <div className="flex justify-center gap-8 mb-8">
          {flags.map(f => (
            <div key={f.code} className="flex flex-col items-center gap-2">
              <img
                src={`https://flagcdn.com/w80/${f.code}.png`}
                alt={f.name}
                className="w-12 h-8 object-cover rounded shadow"
              />
              <span className="text-xs text-gray-400">{f.name}</span>
            </div>
          ))}
        </div>

        {/* Erasmus+ Logo */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl px-6 py-3">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Erasmus%2B_Logo.svg/320px-Erasmus%2B_Logo.svg.png"
              alt="Erasmus+"
              className="h-10 object-contain"
              onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='block' }}
            />
            <span style={{display:'none'}} className="text-blue-700 font-bold text-lg">Erasmus+</span>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6">
          <p className="text-center text-gray-400 text-sm leading-relaxed max-w-2xl mx-auto">
            Bakırköy Bilim ve Sanat Merkezi koordinatörlüğünde hazırlanan{' '}
            <span className="text-white font-semibold">
              "A Common Language for Integrative Entrepreneurship (C-LINE)"
            </span>{' '}
            başlıklı Erasmus+ KA210-SCH projesi, Türkiye Ulusal Ajansı tarafından kabul edilmiştir.
          </p>
        </div>

      </div>
    </footer>
  )
}

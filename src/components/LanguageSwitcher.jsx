import { useTranslation } from 'react-i18next'

const languages = [
  { code: 'tr', label: 'TR' },
  { code: 'lv', label: 'LV' },
  { code: 'it', label: 'IT' },
]

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const current = i18n.resolvedLanguage

  return (
    <div className="flex gap-1">
      {languages.map(l => (
        <button
          key={l.code}
          onClick={() => i18n.changeLanguage(l.code)}
          className={`px-2 py-1 text-sm rounded font-medium ${
            current === l.code
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}

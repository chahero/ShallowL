import { useTranslationStore } from '../../store/translationStore'
import { LANGUAGES } from '../../utils/languages'

interface LanguageSelectorProps {
  isSource: boolean
  onSelect: () => void
}

export default function LanguageSelector({
  isSource,
  onSelect,
}: LanguageSelectorProps) {
  const { setSourceLang, setTargetLang } = useTranslationStore()

  const handleSelect = (code: string) => {
    if (isSource) {
      setSourceLang(code)
    } else {
      setTargetLang(code)
    }
    onSelect()
  }

  return (
    <div className="absolute top-full mt-2 left-0 bg-white border border-gray-300 rounded-lg shadow-lg z-50 w-64 max-h-96 overflow-y-auto">
      {Object.entries(LANGUAGES).map(([key, lang]) => (
        <button
          key={key}
          onClick={() => handleSelect(lang.code)}
          className="w-full text-left px-4 py-3 hover:bg-deepl-50 border-b border-gray-100 last:border-b-0 transition-colors"
        >
          <span className="text-lg mr-2">{lang.flag}</span>
          <span className="text-gray-900 font-medium">{lang.name}</span>
        </button>
      ))}
    </div>
  )
}

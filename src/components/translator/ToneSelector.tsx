import { useState } from 'react'
import { useTranslationStore } from '../../store/translationStore'
import { TONES } from '../../utils/languages'

export default function ToneSelector() {
  const { tone, setTone } = useTranslationStore()
  const [isOpen, setIsOpen] = useState(false)

  const currentTone = TONES.find((t) => t.value === tone)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg border border-gray-300 text-gray-700 font-medium transition-colors"
      >
        {currentTone?.label || 'Tone'}
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-50 w-48">
          {TONES.map((t) => (
            <button
              key={t.value}
              onClick={() => {
                setTone(t.value)
                setIsOpen(false)
              }}
              className={`w-full text-left px-4 py-3 border-b border-gray-100 last:border-b-0 transition-colors ${
                tone === t.value
                  ? 'bg-deepl-50 text-deepl-700 font-medium'
                  : 'hover:bg-gray-50 text-gray-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

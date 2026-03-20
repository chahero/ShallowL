import { useState } from 'react'
import { useTranslationStore } from '../../store/translationStore'
import { LANGUAGES } from '../../utils/languages'
import LanguageSelector from './LanguageSelector'
import SwapButton from './SwapButton'
import ToneSelector from './ToneSelector'

export default function LanguageBar() {
  const { sourceLang, targetLang, tone, detectedLang } = useTranslationStore()
  const [showSourceSelector, setShowSourceSelector] = useState(false)
  const [showTargetSelector, setShowTargetSelector] = useState(false)

  const getLanguageDisplay = (code: string) => {
    const lang = LANGUAGES[code as keyof typeof LANGUAGES]
    return lang ? `${lang.flag} ${lang.name}` : code
  }

  const getSourceDisplay = () => {
    if (sourceLang === 'auto' && detectedLang) {
      return `${getLanguageDisplay(detectedLang)} (detected)`
    }
    return getLanguageDisplay(sourceLang)
  }

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white">
      <div className="flex items-center gap-4 flex-1">
        {/* Source Language */}
        <div className="relative">
          <button
            onClick={() => setShowSourceSelector(!showSourceSelector)}
            className="px-4 py-2 bg-deepl-50 hover:bg-deepl-100 rounded-lg border border-deepl-200 text-deepl-700 font-medium transition-colors"
          >
            {getSourceDisplay()}
          </button>
          {showSourceSelector && (
            <LanguageSelector
              onSelect={() => setShowSourceSelector(false)}
              isSource={true}
            />
          )}
        </div>

        {/* Swap Button */}
        <SwapButton />

        {/* Target Language */}
        <div className="relative">
          <button
            onClick={() => setShowTargetSelector(!showTargetSelector)}
            className="px-4 py-2 bg-deepl-50 hover:bg-deepl-100 rounded-lg border border-deepl-200 text-deepl-700 font-medium transition-colors"
          >
            {getLanguageDisplay(targetLang)}
          </button>
          {showTargetSelector && (
            <LanguageSelector
              onSelect={() => setShowTargetSelector(false)}
              isSource={false}
            />
          )}
        </div>
      </div>

      {/* Tone Selector */}
      <ToneSelector />
    </div>
  )
}

import { useTranslationStore } from '../../store/translationStore'
import CharCounter from './CharCounter'

export default function SourcePanel() {
  const { sourceText, setSourceText } = useTranslationStore()

  return (
    <div className="flex-1 flex flex-col p-6 overflow-hidden">
      <textarea
        value={sourceText}
        onChange={(e) => setSourceText(e.target.value)}
        placeholder="Enter text to translate..."
        className="flex-1 w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-deepl-500 focus:border-transparent resize-none text-base"
      />
      <div className="mt-4">
        <CharCounter text={sourceText} />
      </div>
    </div>
  )
}

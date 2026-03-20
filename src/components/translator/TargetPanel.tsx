import { useTranslationStore } from '../../store/translationStore'
import CopyButton from './CopyButton'
import CharCounter from './CharCounter'

export default function TargetPanel() {
  const { targetText, isLoading } = useTranslationStore()

  return (
    <div className="flex-1 flex flex-col p-6 overflow-hidden">
      <div className="flex-1 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 rounded-lg">
            <div className="animate-spin">
              <div className="w-6 h-6 border-3 border-deepl-500 border-t-transparent rounded-full" />
            </div>
          </div>
        )}
        <div className="w-full h-full p-4 border border-gray-200 rounded-lg bg-gray-50 overflow-auto text-base text-gray-900 whitespace-pre-wrap break-words">
          {targetText}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <CharCounter text={targetText} />
        <CopyButton text={targetText} />
      </div>
    </div>
  )
}

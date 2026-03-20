import { useTranslationStore } from '../../store/translationStore'

export default function SwapButton() {
  const { sourceLang, swapLanguages } = useTranslationStore()

  const isDisabled = sourceLang === 'auto'

  return (
    <button
      onClick={swapLanguages}
      disabled={isDisabled}
      className="p-2 text-deepl-500 hover:bg-deepl-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      title={isDisabled ? "Can't swap with auto-detect" : 'Swap languages'}
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
        />
      </svg>
    </button>
  )
}

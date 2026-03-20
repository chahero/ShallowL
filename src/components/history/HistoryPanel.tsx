import { useHistory } from '../../hooks/useHistory'
import { useTranslationStore } from '../../store/translationStore'
import { getLanguageName } from '../../utils/languages'

export default function HistoryPanel() {
  const { items, removeFromHistory, clearAllHistory } = useHistory()
  const { setSourceText, setSourceLang, setTargetLang } = useTranslationStore()

  const handleRestoreItem = (item: any) => {
    setSourceText(item.source_text)
    setSourceLang(item.source_lang)
    setTargetLang(item.target_lang)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-gray-200">
        <h2 className="font-semibold text-gray-900">History</h2>
        <p className="text-xs text-gray-500 mt-1">{items.length} items</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {items.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500 text-sm">
            No history yet
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-3 hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <button
                  onClick={() => handleRestoreItem(item)}
                  className="w-full text-left"
                >
                  <p className="text-xs text-gray-500 mb-1">
                    {getLanguageName(item.source_lang)} → {getLanguageName(item.target_lang)}
                  </p>
                  <p className="text-sm text-gray-900 line-clamp-2">
                    {item.source_text}
                  </p>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFromHistory(item.id)
                  }}
                  className="text-xs text-red-500 hover:text-red-700 mt-2"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div className="border-t border-gray-200 p-3">
          <button
            onClick={clearAllHistory}
            className="w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  )
}

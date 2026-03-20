interface StatusBarProps {
  isConnected: boolean
  onToggleHistory: () => void
}

export default function StatusBar({
  isConnected,
  onToggleHistory,
}: StatusBarProps) {
  return (
    <div className="flex items-center justify-between px-6 py-3 bg-gray-50 text-sm">
      <div className="flex items-center gap-2">
        <div
          className={`w-2 h-2 rounded-full ${
            isConnected ? 'bg-green-500' : 'bg-red-500'
          }`}
        />
        <span className="text-gray-600">
          {isConnected ? 'Ollama connected' : 'Ollama disconnected'}
        </span>
      </div>

      <button
        onClick={onToggleHistory}
        className="px-3 py-1 bg-deepl-500 text-white rounded hover:bg-deepl-600 transition-colors text-xs font-medium"
      >
        History
      </button>
    </div>
  )
}

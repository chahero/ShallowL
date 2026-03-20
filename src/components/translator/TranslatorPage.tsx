import { useState, useEffect, useRef } from 'react'
import { useTranslationStore } from '../../store/translationStore'
import { useTranslation } from '../../hooks/useTranslation'
import { useHistory } from '../../hooks/useHistory'
import { useOllama } from '../../hooks/useOllama'
import { useToast } from '../../hooks/useToast'
import SourcePanel from './SourcePanel'
import TargetPanel from './TargetPanel'
import LanguageBar from './LanguageBar'
import StatusBar from '../common/StatusBar'
import HistoryPanel from '../history/HistoryPanel'
import ToastContainer from '../common/ToastContainer'

export default function TranslatorPage() {
  const [showHistory, setShowHistory] = useState(false)
  const { isConnected } = useOllama()
  const { toasts, addToast, removeToast } = useToast()
  const {
    sourceText,
    targetText,
    sourceLang,
    targetLang,
    tone,
    isLoading,
  } = useTranslationStore()
  const { addNewHistory } = useHistory()
  const prevTargetRef = useRef<string | null>(null)

  // Use the debounce hook
  useTranslation()

  // Save to history when translation is complete
  useEffect(() => {
    if (
      sourceText.trim() &&
      targetText.trim() &&
      !isLoading &&
      targetText !== prevTargetRef.current
    ) {
      prevTargetRef.current = targetText
      addNewHistory({
        id: '',
        source_text: sourceText,
        source_lang: sourceLang,
        target_lang: targetLang,
        result: targetText,
        tone,
        timestamp: new Date().toISOString(),
      })
    }
  }, [targetText, isLoading, sourceText, sourceLang, targetLang, tone, addNewHistory])

  // Listen for translation errors
  useEffect(() => {
    const handleError = (event: any) => {
      addToast(event.detail.message, 'error')
    }

    window.addEventListener('translation-error', handleError)
    return () => {
      window.removeEventListener('translation-error', handleError)
    }
  }, [addToast])

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <LanguageBar />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* History Panel */}
        {showHistory && (
          <div className="w-64 border-r border-gray-200 bg-gray-50">
            <HistoryPanel />
          </div>
        )}

        {/* Translator */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Source and Target Panels */}
          <div className="flex flex-1 overflow-hidden">
            <SourcePanel />
            <div className="w-px bg-gray-200" />
            <TargetPanel />
          </div>

          {/* Status Bar */}
          <div className="border-t border-gray-200 bg-gray-50">
            <StatusBar
              isConnected={isConnected}
              onToggleHistory={() => setShowHistory(!showHistory)}
            />
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  )
}

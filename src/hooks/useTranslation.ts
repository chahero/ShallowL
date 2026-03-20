import { useEffect, useRef, useCallback } from 'react'
import { useTranslationStore } from '../store/translationStore'
import { translateText } from '../utils/electron'

export function useTranslation() {
  const {
    sourceText,
    sourceLang,
    targetLang,
    tone,
    model,
    setTargetText,
    setIsLoading,
  } = useTranslationStore()

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

  const performTranslation = useCallback(async () => {
    if (!sourceText.trim()) {
      setTargetText('')
      return
    }

    setIsLoading(true)
    setTargetText('')

    try {
      const response = await translateText({
        source_text: sourceText,
        source_lang: sourceLang,
        target_lang: targetLang,
        tone,
        model,
      })
      setTargetText(response.result)
    } catch (error) {
      console.error('Translation error:', error)
      const errorMessage = error instanceof Error ? error.message : String(error)
      setTargetText('')

      // Emit error event that can be caught by the component
      window.dispatchEvent(
        new CustomEvent('translation-error', {
          detail: { message: errorMessage },
        })
      )
    } finally {
      setIsLoading(false)
    }
  }, [sourceText, sourceLang, targetLang, tone, model, setTargetText, setIsLoading])

  useEffect(() => {
    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // Set new timer for debounced translation (800ms)
    debounceTimerRef.current = setTimeout(() => {
      performTranslation()
    }, 800)

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [sourceText, sourceLang, targetLang, tone, model, performTranslation])
}

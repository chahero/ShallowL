import { create } from 'zustand'

interface TranslationState {
  sourceText: string
  targetText: string
  sourceLang: string
  targetLang: string
  tone: string
  model: string
  isLoading: boolean
  selectedModel: string
  detectedLang?: string

  setSourceText: (text: string) => void
  setTargetText: (text: string) => void
  setSourceLang: (lang: string) => void
  setTargetLang: (lang: string) => void
  setTone: (tone: string) => void
  setModel: (model: string) => void
  setIsLoading: (loading: boolean) => void
  setSelectedModel: (model: string) => void
  setDetectedLang: (lang?: string) => void
  swapLanguages: () => void
  reset: () => void
}

export const useTranslationStore = create<TranslationState>((set) => ({
  sourceText: '',
  targetText: '',
  sourceLang: 'auto',
  targetLang: 'en',
  tone: 'neutral',
  model: 'translategemma:12b',
  isLoading: false,
  selectedModel: 'translategemma:12b',

  setSourceText: (text: string) => set({ sourceText: text }),
  setTargetText: (text: string) => set({ targetText: text }),
  setSourceLang: (lang: string) => set({ sourceLang: lang }),
  setTargetLang: (lang: string) => set({ targetLang: lang }),
  setTone: (tone: string) => set({ tone }),
  setModel: (model: string) => set({ model }),
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
  setSelectedModel: (model: string) => set({ selectedModel: model }),
  setDetectedLang: (lang?: string) => set({ detectedLang: lang }),

  swapLanguages: () =>
    set((state) => {
      // Don't swap if source is auto-detect
      if (state.sourceLang === 'auto') {
        return state
      }
      return {
        sourceLang: state.targetLang,
        targetLang: state.sourceLang,
      }
    }),

  reset: () =>
    set({
      sourceText: '',
      targetText: '',
      sourceLang: 'auto',
      targetLang: 'en',
      tone: 'neutral',
    }),
}))

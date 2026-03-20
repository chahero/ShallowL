import { create } from 'zustand'

export interface HistoryItem {
  id: string
  source_text: string
  source_lang: string
  target_lang: string
  result: string
  tone: string
  timestamp: string
}

interface HistoryState {
  items: HistoryItem[]
  setItems: (items: HistoryItem[]) => void
  addItem: (item: HistoryItem) => void
  removeItem: (id: string) => void
  clear: () => void
}

export const useHistoryStore = create<HistoryState>((set) => ({
  items: [],

  setItems: (items: HistoryItem[]) => set({ items }),

  addItem: (item: HistoryItem) =>
    set((state) => ({
      items: [item, ...state.items],
    })),

  removeItem: (id: string) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  clear: () => set({ items: [] }),
}))

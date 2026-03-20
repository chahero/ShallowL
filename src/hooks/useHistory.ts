import { useEffect } from 'react'
import { useHistoryStore } from '../store/historyStore'
import {
  getHistory,
  addHistory,
  deleteHistory,
  clearHistory,
} from '../utils/electron'

export function useHistory() {
  const { items, setItems, addItem, removeItem, clear } = useHistoryStore()

  const fetchHistory = async () => {
    try {
      const history = await getHistory()
      setItems(history)
    } catch (error) {
      console.error('Failed to fetch history:', error)
    }
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  const addNewHistory = async (item: any) => {
    try {
      await addHistory(item)
      addItem(item)
    } catch (error) {
      console.error('Failed to add history:', error)
    }
  }

  const removeFromHistory = async (id: string) => {
    try {
      await deleteHistory(id)
      removeItem(id)
    } catch (error) {
      console.error('Failed to delete history:', error)
    }
  }

  const clearAllHistory = async () => {
    try {
      await clearHistory()
      clear()
    } catch (error) {
      console.error('Failed to clear history:', error)
    }
  }

  return {
    items,
    addNewHistory,
    removeFromHistory,
    clearAllHistory,
    fetchHistory,
  }
}

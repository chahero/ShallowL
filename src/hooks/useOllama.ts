import { useEffect, useState } from 'react'
import { checkOllamaStatus, listOllamaModels } from '../utils/electron'

export function useOllama() {
  const [isConnected, setIsConnected] = useState(false)
  const [models, setModels] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkStatus = async () => {
      try {
        setLoading(true)
        const connected = await checkOllamaStatus()
        setIsConnected(connected)

        if (connected) {
          const modelList = await listOllamaModels()
          setModels(modelList)
        }
      } catch (error) {
        console.error('Failed to check Ollama status:', error)
        setIsConnected(false)
      } finally {
        setLoading(false)
      }
    }

    checkStatus()
    // Check status every 5 seconds
    const interval = setInterval(checkStatus, 5000)

    return () => clearInterval(interval)
  }, [])

  return { isConnected, models, loading }
}

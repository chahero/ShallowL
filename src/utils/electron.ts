// Electron IPC 래퍼

declare global {
  interface Window {
    electron: {
      invoke: (channel: string, ...args: any[]) => Promise<any>
    }
  }
}

export interface TranslateRequest {
  source_text: string
  source_lang: string
  target_lang: string
  tone: string
  model: string
}

export interface TranslateResponse {
  result: string
  detected_lang?: string
}

export async function translateText(
  request: TranslateRequest
): Promise<TranslateResponse> {
  const messages = [
    {
      role: 'system',
      content: 'You are a professional translator. Output ONLY the translated text.',
    },
    {
      role: 'user',
      content: `Translate from ${request.source_lang} to ${request.target_lang}: ${request.tone}\n${request.source_text}`,
    },
  ]

  const result = await window.electron.invoke('translate', {
    model: request.model,
    messages,
  })

  if (result.success) {
    return {
      result: result.data.message.content,
      detected_lang: undefined,
    }
  }

  throw new Error(result.error)
}

export async function checkOllamaStatus(): Promise<boolean> {
  return window.electron.invoke('check-ollama')
}

export async function listOllamaModels(): Promise<string[]> {
  return window.electron.invoke('list-models')
}

// Mock history functions for Electron (use localStorage instead)
export async function getHistory(): Promise<any[]> {
  const stored = localStorage.getItem('shallowl-history')
  return stored ? JSON.parse(stored) : []
}

export async function addHistory(item: any): Promise<void> {
  const history = await getHistory()
  history.unshift(item)
  localStorage.setItem('shallowl-history', JSON.stringify(history.slice(0, 100)))
}

export async function deleteHistory(id: string): Promise<void> {
  const history = await getHistory()
  const filtered = history.filter((item) => item.id !== id)
  localStorage.setItem('shallowl-history', JSON.stringify(filtered))
}

export async function clearHistory(): Promise<void> {
  localStorage.removeItem('shallowl-history')
}

const electron = (window as any).electron

export interface TranslateRequest {
  model: string
  messages: any[]
}

export interface TranslateResponse {
  success: boolean
  data?: any
  error?: string
}

export async function translate(request: TranslateRequest): Promise<TranslateResponse> {
  return electron.invoke('translate', request)
}

export async function checkOllamaStatus(): Promise<boolean> {
  return electron.invoke('check-ollama')
}

export async function listOllamaModels(): Promise<string[]> {
  return electron.invoke('list-models')
}

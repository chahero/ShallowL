import { app, BrowserWindow, ipcMain, Menu, globalShortcut } from 'electron'
import path from 'path'
import { createServer } from 'vite'

let mainWindow: BrowserWindow | null = null
let viteDevServer: any = null

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 700,
    minWidth: 800,
    minHeight: 500,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  })

  if (viteDevServer) {
    mainWindow.loadURL('http://localhost:5173')
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // 전역 단축키 (Ctrl+Alt+T)
  globalShortcut.register('Control+Alt+T', () => {
    if (mainWindow) {
      if (mainWindow.isVisible()) {
        mainWindow.hide()
      } else {
        mainWindow.show()
        mainWindow.focus()
      }
    }
  })
}

app.on('ready', async () => {
  if (process.env.NODE_ENV !== 'production') {
    viteDevServer = await createServer({
      configFile: path.join(__dirname, '../../vite.config.ts'),
    })
    await viteDevServer.listen()
  }
  createWindow()
})

app.on('window-all-closed', async () => {
  if (viteDevServer) {
    await viteDevServer.close()
  }
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// IPC 핸들러 - Ollama API 호출 (Node.js에서 직접 처리)
ipcMain.handle('translate', async (event, request) => {
  try {
    const response = await fetch('http://192.168.0.67:11434/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: request.model,
        messages: request.messages,
        stream: false,
        temperature: 0.1,
      }),
    })

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    return { success: false, error: String(error) }
  }
})

ipcMain.handle('check-ollama', async () => {
  try {
    const response = await fetch('http://192.168.0.67:11434/api/version')
    return response.ok
  } catch {
    return false
  }
})

ipcMain.handle('list-models', async () => {
  try {
    const response = await fetch('http://192.168.0.67:11434/api/tags')
    const data = await response.json()
    return data.models?.map((m: any) => m.name) || []
  } catch {
    return []
  }
})

import { useEffect } from 'react'
import TranslatorPage from './components/translator/TranslatorPage'

function App() {
  useEffect(() => {
    // Prevent default drag-drop behavior in Tauri app
    document.addEventListener('dragover', (e) => {
      e.preventDefault()
      e.stopPropagation()
    })
    document.addEventListener('drop', (e) => {
      e.preventDefault()
      e.stopPropagation()
    })
  }, [])

  return (
    <div className="h-screen w-screen bg-white overflow-hidden">
      <TranslatorPage />
    </div>
  )
}

export default App

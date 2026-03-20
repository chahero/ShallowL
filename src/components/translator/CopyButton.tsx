import { useState } from 'react'

interface CopyButtonProps {
  text: string
}

export default function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!text) return

    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  return (
    <button
      onClick={handleCopy}
      disabled={!text}
      className="px-4 py-2 bg-deepl-500 text-white rounded-lg hover:bg-deepl-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {copied ? '✓ Copied' : 'Copy'}
    </button>
  )
}

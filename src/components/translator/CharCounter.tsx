interface CharCounterProps {
  text: string
}

export default function CharCounter({ text }: CharCounterProps) {
  const charCount = text.length
  const wordCount = text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length

  return (
    <div className="text-sm text-gray-600 flex gap-4">
      <span>{charCount} characters</span>
      <span>{wordCount} words</span>
    </div>
  )
}

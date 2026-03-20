export const LANGUAGES = {
  auto: { code: 'auto', name: 'Auto-detect', flag: '🌐' },
  ko: { code: 'ko', name: '한국어', flag: '🇰🇷' },
  en: { code: 'en', name: 'English', flag: '🇬🇧' },
  ja: { code: 'ja', name: '日本語', flag: '🇯🇵' },
  zh_cn: { code: 'zh_cn', name: '中文(简体)', flag: '🇨🇳' },
  zh_tw: { code: 'zh_tw', name: '中文(繁體)', flag: '🇹🇼' },
  de: { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  fr: { code: 'fr', name: 'Français', flag: '🇫🇷' },
  es: { code: 'es', name: 'Español', flag: '🇪🇸' },
  it: { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  pt: { code: 'pt', name: 'Português', flag: '🇵🇹' },
  ru: { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  ar: { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  vi: { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
} as const

export const LANGUAGE_CODES = Object.keys(LANGUAGES).map(
  (key) => LANGUAGES[key as keyof typeof LANGUAGES]
)

export const TONES = [
  { value: 'formal', label: '정중한 (Formal)' },
  { value: 'casual', label: '캐주얼 (Casual)' },
  { value: 'neutral', label: '중립적 (Neutral)' },
]

export function getLanguageName(code: string): string {
  const lang = LANGUAGE_CODES.find((l) => l.code === code)
  return lang ? lang.name : code
}

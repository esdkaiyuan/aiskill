'use client'

import { useLang } from '@/context/LanguageContext'

export default function LangToggle() {
  const { t, toggle } = useLang()
  return (
    <button
      onClick={toggle}
      className="px-3 py-1 text-xs border border-black dark:border-white rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
    >
      {t.lang}
    </button>
  )
}

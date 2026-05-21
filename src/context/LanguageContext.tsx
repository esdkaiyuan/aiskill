'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { type Lang, translations } from '@/lib/i18n'

interface LangCtx {
  lang: Lang
  t: typeof translations['en']
  toggle: () => void
}

const LanguageContext = createContext<LangCtx>({
  lang: 'en',
  t: translations['en'],
  toggle: () => {},
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang | null
    if (saved === 'zh' || saved === 'en') setLang(saved)
  }, [])

  const toggle = () => {
    const next: Lang = lang === 'en' ? 'zh' : 'en'
    setLang(next)
    localStorage.setItem('lang', next)
  }

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], toggle }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}

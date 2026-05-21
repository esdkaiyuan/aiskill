'use client'

import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import LangToggle from './LangToggle'
import { useLang } from '@/context/LanguageContext'

export default function Header() {
  const { t } = useLang()
  return (
    <header className="border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="text-sm font-medium tracking-wide uppercase">
          {t.siteTitle}
        </Link>
        <div className="flex items-center gap-2">
          <LangToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

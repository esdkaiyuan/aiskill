'use client'

import { useState } from 'react'
import { useLang } from '@/context/LanguageContext'

export default function CopyUrlButton({ id }: { id: string }) {
  const [copied, setCopied] = useState(false)
  const { t } = useLang()

  const handleCopy = async () => {
    const url = `${window.location.origin}/api/skills/${id}`
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="px-3 py-1 text-xs border border-neutral-300 dark:border-neutral-700 rounded hover:border-black dark:hover:border-white transition-colors"
    >
      {copied ? t.copied : t.copyUrl}
    </button>
  )
}

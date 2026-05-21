'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useLang } from '@/context/LanguageContext'

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter()
  const { t } = useLang()
  const [confirming, setConfirming] = useState(false)

  const handleDelete = async () => {
    await fetch(`/api/skills/${id}`, { method: 'DELETE' })
    router.push('/')
    router.refresh()
  }

  if (confirming) {
    return (
      <div className="flex gap-1">
        <button
          onClick={handleDelete}
          className="px-3 py-1 text-xs bg-black text-white dark:bg-white dark:text-black rounded hover:opacity-80 transition-opacity"
        >
          {t.confirm}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="px-3 py-1 text-xs border border-neutral-300 dark:border-neutral-700 rounded hover:border-black dark:hover:border-white transition-colors"
        >
          {t.cancel}
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="px-3 py-1 text-xs border border-neutral-300 dark:border-neutral-700 rounded hover:border-black dark:hover:border-white transition-colors"
    >
      {t.deleteBtn}
    </button>
  )
}

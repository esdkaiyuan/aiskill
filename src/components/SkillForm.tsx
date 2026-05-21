'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLang } from '@/context/LanguageContext'

export default function SkillForm() {
  const router = useRouter()
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    id: '',
    title: '',
    description: '',
    content: '',
    tags: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
        }),
      })
      if (res.ok) {
        setForm({ id: '', title: '', description: '', content: '', tags: '' })
        setOpen(false)
        router.refresh()
      }
    } finally {
      setLoading(false)
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 text-xs border border-black dark:border-white rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
      >
        {t.newSkill}
      </button>
    )
  }

  return (
    <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder={t.idPlaceholder}
            value={form.id}
            onChange={(e) => setForm({ ...form, id: e.target.value })}
            required
            className="w-full px-3 py-2 text-xs border border-neutral-300 dark:border-neutral-700 rounded bg-transparent focus:outline-none focus:border-black dark:focus:border-white"
          />
          <input
            type="text"
            placeholder={t.titlePlaceholder}
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="w-full px-3 py-2 text-xs border border-neutral-300 dark:border-neutral-700 rounded bg-transparent focus:outline-none focus:border-black dark:focus:border-white"
          />
        </div>
        <input
          type="text"
          placeholder={t.descPlaceholder}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full px-3 py-2 text-xs border border-neutral-300 dark:border-neutral-700 rounded bg-transparent focus:outline-none focus:border-black dark:focus:border-white"
        />
        <textarea
          placeholder={t.contentPlaceholder}
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          required
          rows={8}
          className="w-full px-3 py-2 text-xs border border-neutral-300 dark:border-neutral-700 rounded bg-transparent focus:outline-none focus:border-black dark:focus:border-white resize-y font-mono"
        />
        <input
          type="text"
          placeholder={t.tagsPlaceholder}
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
          className="w-full px-3 py-2 text-xs border border-neutral-300 dark:border-neutral-700 rounded bg-transparent focus:outline-none focus:border-black dark:focus:border-white"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-xs bg-black text-white dark:bg-white dark:text-black rounded hover:opacity-80 transition-opacity disabled:opacity-50"
          >
            {loading ? t.saving : t.save}
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="px-4 py-2 text-xs border border-neutral-300 dark:border-neutral-700 rounded hover:border-black dark:hover:border-white transition-colors"
          >
            {t.cancel}
          </button>
        </div>
      </form>
    </div>
  )
}

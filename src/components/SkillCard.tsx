'use client'

import Link from 'next/link'
import { useLang } from '@/context/LanguageContext'

interface SkillCardProps {
  id: string
  title: string
  titleZh?: string
  description: string
  descriptionZh?: string
  tags: string[]
}

export default function SkillCard({ id, title, titleZh, description, descriptionZh, tags }: SkillCardProps) {
  const { lang } = useLang()
  const displayTitle = lang === 'zh' && titleZh ? titleZh : title
  const displayDesc = lang === 'zh' && descriptionZh ? descriptionZh : description
  return (
    <Link href={`/skill/${id}`}>
      <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-5 hover:border-black dark:hover:border-white transition-colors cursor-pointer">
        <h3 className="text-sm font-medium mb-2">{displayTitle}</h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3 line-clamp-2">
          {displayDesc}
        </p>
        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 border border-neutral-300 dark:border-neutral-700 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}

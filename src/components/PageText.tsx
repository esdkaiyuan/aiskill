'use client'

import { useLang } from '@/context/LanguageContext'

export function HomeHeading({ count }: { count: number }) {
  const { t } = useLang()
  return (
    <div>
      <h1 className="text-lg font-medium">{t.skills}</h1>
      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
        {t.skillsAvailable(count)}
      </p>
    </div>
  )
}

export function NoSkillsText() {
  const { t } = useLang()
  return (
    <p className="text-xs text-neutral-400 text-center py-12">
      {t.noSkills}
    </p>
  )
}

export function SkillDetailTitle({
  title, titleZh, description, descriptionZh,
}: {
  title: string; titleZh?: string; description: string; descriptionZh?: string
}) {
  const { lang } = useLang()
  const displayTitle = lang === 'zh' && titleZh ? titleZh : title
  const displayDesc = lang === 'zh' && descriptionZh ? descriptionZh : description
  return (
    <div>
      <h1 className="text-base font-medium">{displayTitle}</h1>
      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{displayDesc}</p>
    </div>
  )
}

export function BackLink() {
  const { t } = useLang()
  return (
    <a
      href="/"
      className="text-xs text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
    >
      {t.back}
    </a>
  )
}

export function ApiLabel({ id }: { id: string }) {
  const { t } = useLang()
  return (
    <p className="text-[10px] text-neutral-400">
      {t.apiLabel} /api/skills/{id}
    </p>
  )
}

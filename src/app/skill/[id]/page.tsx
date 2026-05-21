import { getSkillById } from '@/lib/skills'
import { notFound } from 'next/navigation'
import CopyUrlButton from './CopyUrlButton'
import { BackLink, ApiLabel, SkillDetailTitle } from '@/components/PageText'

export const dynamic = 'force-dynamic'

export default function SkillPage({ params }: { params: { id: string } }) {
  const skill = getSkillById(params.id)
  if (!skill) notFound()

  return (
    <div>
      <div className="mb-6">
        <BackLink />
      </div>

      <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <SkillDetailTitle
            title={skill.title}
            titleZh={skill.titleZh}
            description={skill.description}
            descriptionZh={skill.descriptionZh}
          />
          <div className="flex gap-2">
            <CopyUrlButton id={skill.id} />
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {skill.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 border border-neutral-300 dark:border-neutral-700 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4">
          <pre className="text-xs whitespace-pre-wrap font-mono leading-relaxed text-neutral-700 dark:text-neutral-300">
            {skill.content}
          </pre>
        </div>

        <div className="border-t border-neutral-200 dark:border-neutral-800 mt-4 pt-4">
          <ApiLabel id={skill.id} />
        </div>
      </div>
    </div>
  )
}

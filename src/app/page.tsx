import { getAllSkills } from '@/lib/skills'
import SkillCard from '@/components/SkillCard'
import SkillForm from '@/components/SkillForm'
import { HomeHeading, NoSkillsText } from '@/components/PageText'

export const dynamic = 'force-dynamic'

export default function HomePage() {
  const skills = getAllSkills()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <HomeHeading count={skills.length} />
        <SkillForm />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <SkillCard
            key={skill.id}
            id={skill.id}
            title={skill.title}
            titleZh={skill.titleZh}
            description={skill.description}
            descriptionZh={skill.descriptionZh}
            tags={skill.tags}
          />
        ))}
      </div>

      {skills.length === 0 && (
        <NoSkillsText />
      )}
    </div>
  )
}

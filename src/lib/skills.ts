import fs from 'fs'
import path from 'path'

export interface Skill {
  id: string
  title: string
  titleZh?: string
  description: string
  descriptionZh?: string
  content: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

const DATA_PATH = path.join(process.cwd(), 'data', 'skills.json')

function readSkills(): Skill[] {
  const raw = fs.readFileSync(DATA_PATH, 'utf-8')
  return JSON.parse(raw)
}

function writeSkills(skills: Skill[]) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(skills, null, 2), 'utf-8')
}

export function getAllSkills(): Skill[] {
  return readSkills()
}

export function getSkillById(id: string): Skill | undefined {
  const skills = readSkills()
  return skills.find((s) => s.id === id)
}

export function createSkill(data: Omit<Skill, 'createdAt' | 'updatedAt'>): Skill {
  const skills = readSkills()
  const now = new Date().toISOString()
  const skill: Skill = { ...data, createdAt: now, updatedAt: now }
  skills.push(skill)
  writeSkills(skills)
  return skill
}

export function updateSkill(id: string, data: Partial<Omit<Skill, 'id' | 'createdAt'>>): Skill | null {
  const skills = readSkills()
  const index = skills.findIndex((s) => s.id === id)
  if (index === -1) return null
  skills[index] = { ...skills[index], ...data, updatedAt: new Date().toISOString() }
  writeSkills(skills)
  return skills[index]
}

export function deleteSkill(id: string): boolean {
  const skills = readSkills()
  const filtered = skills.filter((s) => s.id !== id)
  if (filtered.length === skills.length) return false
  writeSkills(filtered)
  return true
}

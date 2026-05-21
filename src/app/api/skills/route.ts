import { NextRequest, NextResponse } from 'next/server'
import { getAllSkills, createSkill } from '@/lib/skills'
import { requireAuth, rateLimit } from '@/lib/auth'

const MAX_CONTENT_LENGTH = 100_000 // 100KB max content
const MAX_TITLE_LENGTH = 200
const MAX_ID_LENGTH = 100
const MAX_TAGS = 20

export async function GET(request: NextRequest) {
  const limited = rateLimit(request)
  if (limited) return limited

  const skills = getAllSkills()
  return NextResponse.json(skills)
}

export async function POST(request: NextRequest) {
  const limited = rateLimit(request)
  if (limited) return limited

  const authError = requireAuth(request)
  if (authError) return authError

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { id, title, titleZh, description, descriptionZh, content, tags } = body as {
    id?: string; title?: string; titleZh?: string
    description?: string; descriptionZh?: string
    content?: string; tags?: string[]
  }

  if (!id || !title || !content) {
    return NextResponse.json({ error: 'id, title, content are required' }, { status: 400 })
  }

  // Input length validation
  if (id.length > MAX_ID_LENGTH) {
    return NextResponse.json({ error: `id must be <= ${MAX_ID_LENGTH} chars` }, { status: 400 })
  }
  if (title.length > MAX_TITLE_LENGTH) {
    return NextResponse.json({ error: `title must be <= ${MAX_TITLE_LENGTH} chars` }, { status: 400 })
  }
  if (content.length > MAX_CONTENT_LENGTH) {
    return NextResponse.json({ error: `content must be <= ${MAX_CONTENT_LENGTH} chars` }, { status: 400 })
  }
  if (tags && (!Array.isArray(tags) || tags.length > MAX_TAGS)) {
    return NextResponse.json({ error: `tags must be array with <= ${MAX_TAGS} items` }, { status: 400 })
  }

  // Sanitize id: only allow alphanumeric, dashes, underscores
  if (!/^[a-zA-Z0-9_-]+$/.test(id)) {
    return NextResponse.json({ error: 'id must contain only a-z, 0-9, - and _' }, { status: 400 })
  }

  const skill = createSkill({
    id,
    title,
    titleZh: typeof titleZh === 'string' ? titleZh.slice(0, MAX_TITLE_LENGTH) : undefined,
    description: typeof description === 'string' ? description.slice(0, 500) : '',
    descriptionZh: typeof descriptionZh === 'string' ? descriptionZh.slice(0, 500) : undefined,
    content,
    tags: Array.isArray(tags) ? tags.slice(0, MAX_TAGS).map(t => String(t).slice(0, 50)) : [],
  })

  return NextResponse.json(skill, { status: 201 })
}

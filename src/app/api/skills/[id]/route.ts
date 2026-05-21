import { NextRequest, NextResponse } from 'next/server'
import { getSkillById, updateSkill, deleteSkill } from '@/lib/skills'
import { requireAuth, rateLimit } from '@/lib/auth'

const ALLOWED_UPDATE_FIELDS = ['title', 'titleZh', 'description', 'descriptionZh', 'content', 'tags'] as const
const MAX_CONTENT_LENGTH = 100_000

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const limited = rateLimit(request)
  if (limited) return limited

  const skill = getSkillById(params.id)
  if (!skill) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const accept = request.headers.get('accept') || ''
  if (accept.includes('text/plain') || accept.includes('text/markdown')) {
    return new Response(skill.content, {
      headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
    })
  }

  return NextResponse.json(skill)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

  // Whitelist allowed fields only
  const sanitized: Record<string, unknown> = {}
  for (const field of ALLOWED_UPDATE_FIELDS) {
    if (field in body) {
      sanitized[field] = body[field]
    }
  }

  // Validate content length
  if (typeof sanitized.content === 'string' && sanitized.content.length > MAX_CONTENT_LENGTH) {
    return NextResponse.json({ error: `content must be <= ${MAX_CONTENT_LENGTH} chars` }, { status: 400 })
  }

  // Validate tags
  if (sanitized.tags && (!Array.isArray(sanitized.tags) || sanitized.tags.length > 20)) {
    return NextResponse.json({ error: 'tags must be array with <= 20 items' }, { status: 400 })
  }

  const updated = updateSkill(params.id, sanitized)
  if (!updated) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json(updated)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const limited = rateLimit(request)
  if (limited) return limited

  const authError = requireAuth(request)
  if (authError) return authError

  const deleted = deleteSkill(params.id)
  if (!deleted) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json({ success: true })
}

import { NextRequest, NextResponse } from 'next/server'

/**
 * Simple API key authentication for write operations.
 * Set ADMIN_API_KEY in environment or falls back to a default dev key.
 * In production, always set a strong ADMIN_API_KEY env variable.
 */
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || ''

export function requireAuth(request: NextRequest): NextResponse | null {
  // If no ADMIN_API_KEY is configured, block all write access in production
  if (!ADMIN_API_KEY) {
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: 'Write operations are disabled (no API key configured)' },
        { status: 403 }
      )
    }
    // In development, allow without key
    return null
  }

  const authHeader = request.headers.get('authorization')
  const apiKey = authHeader?.replace('Bearer ', '') || request.headers.get('x-api-key')

  if (!apiKey || apiKey !== ADMIN_API_KEY) {
    return NextResponse.json(
      { error: 'Unauthorized: invalid or missing API key' },
      { status: 401 }
    )
  }

  return null
}

/**
 * Basic rate limiting using in-memory store.
 * Limits per IP, resets every windowMs.
 */
const rateStore = new Map<string, { count: number; resetAt: number }>()
const MAX_REQUESTS = 30 // max requests per window
const WINDOW_MS = 60 * 1000 // 1 minute

export function rateLimit(request: NextRequest): NextResponse | null {
  const ip = request.headers.get('x-real-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    'unknown'
  const now = Date.now()
  const entry = rateStore.get(ip)

  if (!entry || now > entry.resetAt) {
    rateStore.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return null
  }

  entry.count++
  if (entry.count > MAX_REQUESTS) {
    return NextResponse.json(
      { error: 'Too many requests, please try again later' },
      { status: 429 }
    )
  }

  return null
}

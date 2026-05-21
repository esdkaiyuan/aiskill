// Seed script: writes a curated set of dev skills to data/skills.json
// Run: node scripts/seed-skills.mjs
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dataPath = path.join(__dirname, '..', 'data', 'skills.json')

const now = new Date().toISOString()

const skill = (id, title, titleZh, description, descriptionZh, tags, content) => ({
  id,
  title,
  titleZh,
  description,
  descriptionZh,
  tags,
  content,
  createdAt: now,
  updatedAt: now,
})

const skills = [
  skill(
    'nextjs-app-router',
    'Next.js App Router',
    'Next.js 应用路由',
    'Next.js 14 App Router architecture, server components, data fetching.',
    'Next.js 14 App Router 架构、服务端组件与数据获取策略。',
    ['nextjs', 'react', 'frontend'],
    `# Next.js App Router

## File conventions
- \`app/page.tsx\` route UI
- \`app/layout.tsx\` shared layout (must render children)
- \`app/loading.tsx\` Suspense fallback
- \`app/error.tsx\` error boundary ('use client' required)
- \`app/not-found.tsx\` 404
- \`app/route.ts\` API route handler

## Server vs Client
- Default: Server Component. Can be async, fetch data directly, access env, no hooks.
- Add \`'use client'\` at the top only when you need: state, effects, event handlers, browser APIs.
- Keep client components as leaves; pass server data down as props.

## Data fetching
\`\`\`ts
// Server component
async function Page() {
  const res = await fetch('https://api.example.com/data', {
    next: { revalidate: 60 },     // ISR
    // cache: 'no-store',         // SSR
    // cache: 'force-cache',      // SSG (default)
  })
  const data = await res.json()
  return <pre>{JSON.stringify(data)}</pre>
}
\`\`\`

## Route handlers
\`\`\`ts
// app/api/items/route.ts
import { NextRequest, NextResponse } from 'next/server'
export async function GET(req: NextRequest) {
  return NextResponse.json({ ok: true })
}
\`\`\`

## Dynamic segments
\`app/posts/[slug]/page.tsx\` -> \`params: { slug: string }\`

## Server Actions
\`\`\`ts
'use server'
export async function createItem(formData: FormData) { /* ... */ }
\`\`\`
`
  ),
  skill(
    'react-hooks-patterns',
    'React Hooks Patterns',
    'React Hooks 模式',
    'Idiomatic React hooks usage: state, effects, memo, refs, custom hooks.',
    '惯用 React Hooks 用法：state、effect、memo、ref 及自定义 Hook。',
    ['react', 'frontend'],
    `# React Hooks Patterns

## useState
- Functional updates when next state depends on previous: \`setX(prev => prev + 1)\`
- Lazy init for expensive default: \`useState(() => compute())\`

## useEffect
- Cleanup pattern:
\`\`\`tsx
useEffect(() => {
  const id = setInterval(tick, 1000)
  return () => clearInterval(id)
}, [])
\`\`\`
- Avoid object/array literals in deps (recreated each render). Memoize or use primitives.
- Don't put effects inside conditionals; gate inside the effect.

## useMemo / useCallback
- Use only when:
  - Dep equality check is cheaper than the computation, OR
  - The memoized value is passed to a \`React.memo\` child / hook dep.
- Premature memoization adds noise.

## useRef
- Mutable box that doesn't trigger re-render: \`ref.current = value\`
- DOM ref: \`<input ref={inputRef} />\`

## Custom hooks
- Name starts with \`use\`. Compose hooks freely.
\`\`\`ts
function useDebounce<T>(value: T, ms = 300) {
  const [v, setV] = useState(value)
  useEffect(() => {
    const id = setTimeout(() => setV(value), ms)
    return () => clearTimeout(id)
  }, [value, ms])
  return v
}
\`\`\`

## Rules
- Call hooks at the top level, never in loops/conditions.
- Only call from React function components or other hooks.
`
  ),
  skill(
    'typescript-essentials',
    'TypeScript Essentials',
    'TypeScript 核心',
    'Practical TypeScript: utility types, generics, narrowing, common patterns.',
    '实用 TypeScript：工具类型、泛型、类型收窄与常见模式。',
    ['typescript', 'language'],
    `# TypeScript Essentials

## Utility types
- \`Partial<T>\` all optional
- \`Required<T>\` all required
- \`Readonly<T>\` immutable
- \`Pick<T, K>\` / \`Omit<T, K>\`
- \`Record<K, V>\`
- \`ReturnType<typeof fn>\`
- \`Awaited<T>\` unwrap Promise
- \`NonNullable<T>\`

## Generics
\`\`\`ts
function first<T>(arr: T[]): T | undefined { return arr[0] }
type ApiResponse<T> = { data: T; error: string | null }
\`\`\`

## Narrowing
- \`typeof\` for primitives
- \`in\` operator for property presence
- \`instanceof\` for classes
- Discriminated unions:
\`\`\`ts
type Shape =
  | { kind: 'circle'; r: number }
  | { kind: 'square'; size: number }
function area(s: Shape) {
  switch (s.kind) {
    case 'circle': return Math.PI * s.r ** 2
    case 'square': return s.size ** 2
  }
}
\`\`\`

## as const
Locks literals so they're not widened:
\`\`\`ts
const roles = ['admin', 'user'] as const  // readonly ['admin', 'user']
type Role = typeof roles[number]          // 'admin' | 'user'
\`\`\`

## satisfies
Validate without widening:
\`\`\`ts
const config = { host: 'x', port: 80 } satisfies Record<string, unknown>
\`\`\`

## Avoid
- \`any\` -- prefer \`unknown\` then narrow.
- Enums -- prefer \`as const\` objects or string literal unions.
`
  ),
  skill(
    'tailwindcss-patterns',
    'TailwindCSS Patterns',
    'TailwindCSS 模式',
    'Responsive design, dark mode, common layout recipes, performance.',
    '响应式设计、暗色模式、常用布局配方与性能建议。',
    ['css', 'tailwind', 'frontend'],
    `# TailwindCSS Patterns

## Responsive (mobile-first)
\`sm: 640 / md: 768 / lg: 1024 / xl: 1280 / 2xl: 1536\`
\`class="w-full md:w-1/2 lg:w-1/3"\`

## Dark mode
\`tailwind.config.js\` -> \`darkMode: 'class'\`. Toggle \`<html class="dark">\`.
\`class="bg-white text-black dark:bg-neutral-950 dark:text-white"\`

## Layout recipes
- Centered container: \`max-w-5xl mx-auto px-6\`
- Flex row: \`flex items-center justify-between gap-4\`
- Grid: \`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4\`
- Sticky header: \`sticky top-0 z-10 backdrop-blur\`
- Fullscreen: \`min-h-screen\`

## State variants
\`hover:\`, \`focus:\`, \`active:\`, \`disabled:\`, \`group-hover:\`, \`peer-checked:\`
\`focus-visible:ring-2 focus-visible:ring-black\`

## Arbitrary values
\`class="top-[117px] grid-cols-[1fr_2fr]"\`

## Avoid
- Long repeated class strings -> extract to component or use \`@apply\` in a CSS layer.
- Inline styles where a utility exists.
`
  ),
  skill(
    'python-modern',
    'Modern Python',
    '现代 Python',
    'Python 3.10+ features: type hints, match, dataclasses, pathlib, async.',
    'Python 3.10+ 特性：类型提示、match 语句、dataclass、pathlib、async。',
    ['python', 'language'],
    `# Modern Python (3.10+)

## Type hints
\`\`\`py
from typing import Iterable
def total(nums: Iterable[int]) -> int:
    return sum(nums)
\`\`\`
- Use \`list[int]\`, \`dict[str, int]\` directly (3.9+).
- \`X | None\` instead of \`Optional[X]\` (3.10+).

## match statement
\`\`\`py
match event:
    case {'type': 'click', 'x': x, 'y': y}: ...
    case {'type': 'key', 'code': code}: ...
    case _: raise ValueError
\`\`\`

## dataclasses
\`\`\`py
from dataclasses import dataclass, field
@dataclass(frozen=True, slots=True)
class Point:
    x: float
    y: float
    tags: list[str] = field(default_factory=list)
\`\`\`

## pathlib (no os.path)
\`\`\`py
from pathlib import Path
p = Path('data') / 'file.json'
p.write_text(json.dumps(obj))
for f in Path('logs').glob('*.log'): ...
\`\`\`

## async basics
\`\`\`py
import asyncio
async def fetch(u): ...
async def main():
    results = await asyncio.gather(*(fetch(u) for u in urls))
asyncio.run(main())
\`\`\`

## Tooling
- \`uv\` or \`poetry\` for env/dependency management
- \`ruff\` for lint+format (replaces flake8/black/isort)
- \`pytest\` for tests; \`mypy\` or \`pyright\` for type-check
`
  ),
  skill(
    'fastapi-essentials',
    'FastAPI Essentials',
    'FastAPI 核心',
    'Build typed async REST APIs with FastAPI + Pydantic v2.',
    '使用 FastAPI + Pydantic v2 构建类型安全的异步 REST API。',
    ['python', 'backend', 'api'],
    `# FastAPI Essentials

## Minimal app
\`\`\`py
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    price: float

@app.post('/items')
async def create(item: Item) -> Item:
    return item
\`\`\`
Run: \`uvicorn main:app --reload\`

## Path / query / body
\`\`\`py
@app.get('/items/{item_id}')
async def get_item(item_id: int, q: str | None = None): ...
\`\`\`

## Dependencies
\`\`\`py
from fastapi import Depends

def get_db():
    db = Session()
    try: yield db
    finally: db.close()

@app.get('/users')
async def list_users(db = Depends(get_db)): ...
\`\`\`

## Auth via dependency
\`\`\`py
from fastapi import Header, HTTPException
def auth(x_token: str = Header()):
    if x_token != 'secret':
        raise HTTPException(401)
\`\`\`

## Response models
\`response_model=ItemOut\` strips fields not in schema. Useful for hiding password hashes.

## Background tasks
\`\`\`py
from fastapi import BackgroundTasks
@app.post('/send')
async def send(bg: BackgroundTasks):
    bg.add_task(send_email, 'a@b.c')
\`\`\`

## OpenAPI: auto at \`/docs\` and \`/redoc\`.
`
  ),
  skill(
    'docker-basics',
    'Docker Essentials',
    'Docker 核心',
    'Dockerfile best practices, multi-stage builds, compose, volumes, networks.',
    'Dockerfile 最佳实践、多阶段构建、Compose、数据卷与网络。',
    ['docker', 'devops'],
    `# Docker Essentials

## Dockerfile (Node example, multi-stage)
\`\`\`dockerfile
# Stage 1: deps
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# Stage 2: build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 3: runtime
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY package.json ./
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

## Best practices
- Pin base image versions (e.g. \`node:20-alpine\`, not \`latest\`).
- Order layers by change frequency (deps before source).
- Use \`.dockerignore\` (mirror .gitignore + add node_modules, .next, .git).
- Run as non-root: \`USER node\`.
- One process per container; use \`tini\` if needed for signal handling.

## docker-compose.yml
\`\`\`yaml
services:
  app:
    build: .
    ports: ['3000:3000']
    env_file: .env
    depends_on: [db]
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: pw
    volumes: ['db:/var/lib/postgresql/data']
volumes:
  db:
\`\`\`

## Useful commands
- \`docker build -t app .\`
- \`docker run -p 3000:3000 --rm app\`
- \`docker logs -f <id>\`
- \`docker compose up -d --build\`
- \`docker exec -it <id> sh\`
`
  ),
  skill(
    'git-workflow',
    'Git Workflow',
    'Git 工作流',
    'Daily git commands, rebase vs merge, undo recipes, conventional commits.',
    '日常 Git 命令、rebase 与 merge、撤销操作、约定式提交。',
    ['git', 'devops'],
    `# Git Workflow

## Daily commands
\`\`\`bash
git status
git diff                       # unstaged
git diff --staged              # staged
git add -p                     # interactive staging
git commit -m "feat: ..."
git push -u origin feature/x
git pull --rebase
\`\`\`

## Branching
- \`git switch -c feature/login\`
- \`git switch main\` then \`git merge feature/login\` (merge commit)
- Or rebase: on feature -> \`git rebase main\`, then fast-forward merge

## Rebase vs merge
- Merge preserves history (use for shared/long-lived branches).
- Rebase makes linear history (use for personal feature branches before PR).
- Never rebase commits that have been pushed and others may have based work on.

## Undo recipes
- Discard local change: \`git restore <file>\`
- Unstage: \`git restore --staged <file>\`
- Amend last commit: \`git commit --amend\`
- Undo last commit, keep changes: \`git reset --soft HEAD~1\`
- Undo last commit, discard changes: \`git reset --hard HEAD~1\`
- Recover deleted commit: \`git reflog\` then \`git reset --hard <sha>\`

## Conventional commits
\`<type>(<scope>): <subject>\`
Types: feat, fix, docs, style, refactor, perf, test, build, ci, chore.
Example: \`fix(auth): handle expired refresh token\`

## Stash
\`git stash push -m "wip"\` / \`git stash pop\` / \`git stash list\`
`
  ),
  skill(
    'github-actions-ci',
    'GitHub Actions CI/CD',
    'GitHub Actions 自动化',
    'Workflow syntax, matrix builds, secrets, common patterns for test+deploy.',
    '工作流语法、矩阵构建、密钥管理与测试部署常用模式。',
    ['ci', 'github', 'devops'],
    `# GitHub Actions

## Basic workflow
\`.github/workflows/ci.yml\`
\`\`\`yaml
name: CI
on:
  push: { branches: [main] }
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node: [18, 20]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node }}
          cache: 'npm'
      - run: npm ci
      - run: npm test
\`\`\`

## Secrets
Use \`\${{ secrets.NAME }}\`. Set in repo settings -> Secrets and variables -> Actions.

## Conditional steps
\`\`\`yaml
- if: github.ref == 'refs/heads/main'
  run: npm run deploy
\`\`\`

## Cache
\`\`\`yaml
- uses: actions/cache@v4
  with:
    path: ~/.npm
    key: npm-\${{ hashFiles('package-lock.json') }}
\`\`\`

## Reusable workflows
\`workflow_call\` makes a workflow callable from others via \`uses: ./.github/workflows/x.yml\`.

## Common third-party actions
- \`docker/build-push-action@v5\` -- build/push images
- \`peaceiris/actions-gh-pages@v3\` -- deploy to gh-pages
- \`softprops/action-gh-release@v1\` -- create releases
`
  ),
  skill(
    'postgresql-patterns',
    'PostgreSQL Patterns',
    'PostgreSQL 模式',
    'Indexes, joins, JSON, CTEs, window functions, performance basics.',
    '索引、JOIN、JSON、CTE、窗口函数与性能基础。',
    ['sql', 'postgres', 'database'],
    `# PostgreSQL Patterns

## Indexes
- B-tree (default): equality + range
- GIN: jsonb, full-text, array containment
- BRIN: huge time-series tables
- Partial: \`CREATE INDEX ON orders(user_id) WHERE status='open';\`
- Multi-column: leftmost prefix matters

## Common joins
\`\`\`sql
SELECT u.id, COUNT(o.id) AS orders
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
GROUP BY u.id;
\`\`\`

## CTEs
\`\`\`sql
WITH recent AS (
  SELECT * FROM events WHERE created_at > now() - interval '7 days'
)
SELECT user_id, count(*) FROM recent GROUP BY user_id;
\`\`\`

## Window functions
\`\`\`sql
SELECT
  user_id,
  amount,
  SUM(amount) OVER (PARTITION BY user_id ORDER BY created_at) AS running_total,
  ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC) AS rn
FROM payments;
\`\`\`

## JSONB
\`\`\`sql
SELECT data->>'name' AS name FROM users WHERE data @> '{"active": true}';
CREATE INDEX users_data_gin ON users USING gin(data);
\`\`\`

## UPSERT
\`\`\`sql
INSERT INTO kv(k, v) VALUES('x', 1)
ON CONFLICT (k) DO UPDATE SET v = EXCLUDED.v;
\`\`\`

## Performance
- \`EXPLAIN (ANALYZE, BUFFERS) SELECT ...\`
- Avoid \`SELECT *\` in hot paths.
- \`VACUUM ANALYZE\` after big writes; autovacuum usually handles it.
- Use \`LIMIT\` + keyset pagination (\`WHERE id > last_id ORDER BY id LIMIT 50\`).
`
  ),
  skill(
    'rest-api-design',
    'REST API Design',
    'REST API 设计',
    'Resource modeling, HTTP semantics, status codes, versioning, pagination.',
    '资源建模、HTTP 语义、状态码、版本控制与分页。',
    ['api', 'http', 'backend'],
    `# REST API Design

## Resources, not actions
- Good: \`POST /orders\`, \`GET /orders/123\`, \`PATCH /orders/123\`
- Bad: \`POST /createOrder\`

## HTTP verbs
- GET: safe, idempotent, no body, cacheable
- POST: create, not idempotent
- PUT: full replace, idempotent
- PATCH: partial update
- DELETE: idempotent

## Status codes
- 200 OK, 201 Created (+ Location header), 204 No Content
- 301 Moved, 304 Not Modified
- 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 422 Unprocessable
- 429 Rate Limited (+ Retry-After)
- 500 Server Error, 503 Unavailable

## Pagination
- Offset: \`?page=2&limit=20\` -- simple but slow at scale, unstable
- Cursor/keyset: \`?cursor=eyJpZCI6MTAwfQ\` -- stable + fast

## Filtering / sorting
\`GET /users?role=admin&sort=-createdAt\`

## Versioning
- URL: \`/v1/...\` (most common, simple)
- Header: \`Accept: application/vnd.api+json; version=1\`

## Errors -- consistent shape
\`\`\`json
{
  "error": {
    "code": "invalid_email",
    "message": "Email is not valid",
    "field": "email"
  }
}
\`\`\`

## Other
- Use ISO 8601 timestamps in UTC.
- Use plural nouns for collections.
- Don't leak internal IDs unnecessarily; consider opaque IDs.
- Return created/updated resource in response.
`
  ),
  skill(
    'regex-cookbook',
    'Regex Cookbook',
    '正则表达式手册',
    'Common regex patterns for emails, URLs, dates, validation, capture groups.',
    '邮箱、URL、日期等常用正则模式与捕获组用法。',
    ['regex', 'utility'],
    `# Regex Cookbook

## Anchors / classes
- \`^\` start, \`$\` end
- \`\\d\` digit, \`\\D\` non-digit
- \`\\w\` word char, \`\\W\` non-word
- \`\\s\` whitespace, \`\\S\` non-whitespace
- \`.\` any (except newline; \`/s\` flag for dotall)

## Quantifiers
- \`*\` 0+, \`+\` 1+, \`?\` 0 or 1
- \`{n}\`, \`{n,}\`, \`{n,m}\`
- Lazy: \`*?\`, \`+?\` (match as little as possible)

## Groups
- \`(...)\` capture
- \`(?:...)\` non-capture
- \`(?<name>...)\` named
- \`\\1\` backreference

## Lookaround
- \`(?=...)\` lookahead, \`(?!...)\` negative lookahead
- \`(?<=...)\` lookbehind, \`(?<!...)\` negative lookbehind

## Common patterns
- Email (pragmatic): \`^[\\w.+-]+@[\\w-]+\\.[\\w.-]+$\`
- URL (rough): \`^https?:\\/\\/[^\\s/$.?#].[^\\s]*$\`
- ISO date: \`^\\d{4}-\\d{2}-\\d{2}$\`
- IPv4: \`^(?:\\d{1,3}\\.){3}\\d{1,3}$\`
- Hex color: \`^#(?:[0-9a-f]{3}|[0-9a-f]{6})$\`
- Slug: \`^[a-z0-9]+(?:-[a-z0-9]+)*$\`
- UUID: \`^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$\`

## Tips
- Use \`/i\` for case-insensitive, \`/g\` for global, \`/m\` for multiline.
- For complex regex, use \`/x\` (extended) where supported or build with comments.
- Prefer parsers for HTML/JSON, not regex.
`
  ),
  skill(
    'linux-shell',
    'Linux Shell Toolkit',
    'Linux Shell 工具箱',
    'Essential Unix commands: file ops, text processing, process mgmt, networking.',
    '文件操作、文本处理、进程管理与网络命令大全。',
    ['linux', 'shell', 'bash'],
    `# Linux Shell Toolkit

## Files
- \`ls -lah\` -- list with sizes
- \`find . -name '*.log' -mtime -7\` -- modified within 7 days
- \`du -sh *\` / \`df -h\` -- disk usage
- \`tree -L 2\`
- \`stat file\` -- detailed info

## Text processing
- \`grep -rni 'pattern' .\` -- recursive, line numbers, ignore case
- \`rg pattern\` -- ripgrep, faster
- \`sed -i 's/foo/bar/g' file\` -- in-place replace
- \`awk '{print $1, $3}' file\` -- column extract
- \`sort | uniq -c | sort -rn\` -- frequency count
- \`cut -d',' -f1,3 file.csv\`
- \`jq '.users[].name' data.json\`

## Pipes & redirection
- \`cmd1 | cmd2\` -- pipe stdout
- \`cmd > file\` overwrite, \`cmd >> file\` append
- \`cmd 2>&1\` redirect stderr to stdout
- \`cmd 2>/dev/null\` discard errors
- \`< file cmd\` -- feed file as stdin

## Processes
- \`ps aux | grep node\`
- \`top\` / \`htop\`
- \`kill -9 PID\` / \`pkill -f node\`
- \`nohup cmd &\` -- run detached
- \`jobs\`, \`fg %1\`, \`bg %1\`

## Networking
- \`curl -sS https://x\` / \`curl -X POST -d @body.json -H 'Content-Type: application/json' url\`
- \`wget url\`
- \`ss -tlnp\` -- listening sockets (replaces netstat)
- \`ping host\`, \`dig host\`, \`nslookup host\`

## SSH
- \`ssh user@host\`
- \`scp file user@host:/path\`
- \`rsync -avz src/ user@host:/dst/\`
- Forward: \`ssh -L 8080:localhost:80 user@host\`

## Permissions
- \`chmod 755 file\` (rwx r-x r-x)
- \`chown user:group file\`
- Find SUID files: \`find / -perm -4000 2>/dev/null\`
`
  ),
  skill(
    'sqlalchemy-orm',
    'SQLAlchemy 2.0 ORM',
    'SQLAlchemy 2.0 ORM',
    'Modern SQLAlchemy 2.x patterns: models, sessions, relationships, queries.',
    '现代 SQLAlchemy 2.x 模式：模型、会话、关联关系与查询。',
    ['python', 'database', 'orm'],
    `# SQLAlchemy 2.0 ORM

## Setup
\`\`\`py
from sqlalchemy import create_engine, ForeignKey, String
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship, Session

engine = create_engine('postgresql+psycopg://user:pw@host/db', echo=True)

class Base(DeclarativeBase): pass

class User(Base):
    __tablename__ = 'users'
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True)
    posts: Mapped[list['Post']] = relationship(back_populates='author', cascade='all, delete-orphan')

class Post(Base):
    __tablename__ = 'posts'
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str]
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id'))
    author: Mapped[User] = relationship(back_populates='posts')

Base.metadata.create_all(engine)
\`\`\`

## Sessions
\`\`\`py
with Session(engine) as s, s.begin():
    s.add(User(email='a@b.c'))
# commit on context exit
\`\`\`

## Querying (2.0 style)
\`\`\`py
from sqlalchemy import select
stmt = select(User).where(User.email == 'a@b.c')
user = s.scalars(stmt).first()

stmt = select(User).join(User.posts).where(Post.title.ilike('%hello%'))
users = s.scalars(stmt).all()
\`\`\`

## Eager loading (avoid N+1)
\`\`\`py
from sqlalchemy.orm import selectinload, joinedload
select(User).options(selectinload(User.posts))
\`\`\`

## Update / delete
\`\`\`py
from sqlalchemy import update, delete
s.execute(update(User).where(User.id==1).values(email='x@y.z'))
s.execute(delete(Post).where(Post.user_id==1))
\`\`\`

## Migrations
Use Alembic: \`alembic init migrations\`, \`alembic revision --autogenerate -m "msg"\`, \`alembic upgrade head\`.
`
  ),
  skill(
    'vue3-composition',
    'Vue 3 Composition API',
    'Vue 3 组合式 API',
    'ref, reactive, computed, watch, lifecycle, script setup syntax.',
    'ref、reactive、computed、watch、生命周期与 script setup 语法。',
    ['vue', 'frontend'],
    `# Vue 3 Composition API

## Script setup (recommended)
\`\`\`vue
<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

const count = ref(0)                       // primitive -> ref
const user = reactive({ name: 'A' })       // object -> reactive
const double = computed(() => count.value * 2)

watch(count, (n, o) => console.log(n, o))

onMounted(() => { /* ... */ })

function inc() { count.value++ }
</script>

<template>
  <button @click="inc">{{ count }} / {{ double }}</button>
</template>
\`\`\`

## Props / emits
\`\`\`ts
const props = defineProps<{ title: string; count?: number }>()
const emit = defineEmits<{ (e: 'change', value: number): void }>()
\`\`\`

## v-model on custom component
- Child: \`defineModel<string>()\` (3.4+) or props 'modelValue' + emit 'update:modelValue'
- Parent: \`<Child v-model="text" />\`

## Composables (custom hooks)
\`\`\`ts
// useCounter.ts
import { ref } from 'vue'
export function useCounter(start = 0) {
  const count = ref(start)
  const inc = () => count.value++
  return { count, inc }
}
\`\`\`

## Lifecycle
\`onBeforeMount\`, \`onMounted\`, \`onBeforeUpdate\`, \`onUpdated\`, \`onBeforeUnmount\`, \`onUnmounted\`.

## Provide / inject
\`\`\`ts
// parent
provide('theme', ref('dark'))
// child
const theme = inject<Ref<string>>('theme')
\`\`\`
`
  ),
  skill(
    'rust-ownership',
    'Rust Ownership & Borrowing',
    'Rust 所有权与借用',
    'Ownership rules, references, lifetimes, common patterns.',
    '所有权规则、引用、生命周期与常见模式。',
    ['rust', 'language'],
    `# Rust Ownership & Borrowing

## Three rules
1. Each value has one owner.
2. When the owner goes out of scope, the value is dropped.
3. There can be many immutable references \`&T\` OR one mutable reference \`&mut T\`, never both at the same time.

## Move vs Copy
- Types without \`Copy\` (e.g. \`String\`, \`Vec<T>\`) are moved on assignment/argument.
- \`Copy\` types (e.g. \`i32\`, \`bool\`, fixed arrays of Copy) are duplicated.

## Borrowing
\`\`\`rust
fn len(s: &String) -> usize { s.len() }       // immutable borrow
fn push(s: &mut String) { s.push_str("!"); } // mutable borrow

let mut s = String::from("hi");
push(&mut s);
println!("{}", len(&s));
\`\`\`

## Lifetimes
Tell the compiler how long references are valid.
\`\`\`rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}
\`\`\`

## Common pitfalls & fixes
- "Cannot move out of borrowed content" -> use \`.clone()\` or take ownership.
- "Borrow checker conflict" in loops -> split logic, scope borrows, use indices.
- Need shared mutation -> \`Rc<RefCell<T>>\` (single-thread), \`Arc<Mutex<T>>\` (multi-thread).

## Smart pointers
- \`Box<T>\` heap allocation, owned
- \`Rc<T>\` shared ownership, single-thread
- \`Arc<T>\` shared, thread-safe
- \`RefCell<T>\` interior mutability, runtime borrow check
- \`Cow<'a, T>\` clone-on-write

## Slices
\`&str\` is \`&[u8]\` UTF-8 view. \`&[T]\` is a view into an array/Vec.
`
  ),
  skill(
    'testing-pyramid',
    'Testing Strategy',
    '测试策略',
    'Unit, integration, e2e -- when to use each; doubles, fixtures, naming.',
    '单元、集成、端到端——何时选用；测试替身、夹具与命名规范。',
    ['testing', 'quality'],
    `# Testing Strategy

## The pyramid
- **Unit** (many, fast, ms): pure functions, single module. No I/O.
- **Integration** (some, seconds): module + DB / HTTP / FS. Real boundaries with test infra.
- **End-to-end** (few, slow, minutes): full stack through UI/API.

## Naming
\`describe('Cart')\` / \`it('applies discount when coupon valid')\`
Pattern: \`<unit>_<scenario>_<expected>\` or BDD \`Given/When/Then\`.

## Arrange-Act-Assert
\`\`\`ts
test('subtract', () => {
  // Arrange
  const a = 5, b = 2
  // Act
  const r = sub(a, b)
  // Assert
  expect(r).toBe(3)
})
\`\`\`

## Test doubles
- **Stub**: returns canned data (no behavior verification).
- **Mock**: verifies interaction (\`toHaveBeenCalledWith\`).
- **Fake**: working light implementation (in-memory DB).
- **Spy**: wraps real impl + records calls.
Prefer fakes > stubs > mocks for resilience.

## Fixtures
- Build helpers, not raw data: \`makeUser({ email: 'x' })\`.
- Reset state between tests; use transactions for DB.

## What to test
- Public behavior, not implementation details.
- Boundary conditions, error paths.
- Don't test framework code or trivial getters.

## E2E (Playwright)
\`\`\`ts
test('login', async ({ page }) => {
  await page.goto('/login')
  await page.getByLabel('Email').fill('a@b.c')
  await page.getByLabel('Password').fill('pw')
  await page.getByRole('button', { name: 'Sign in' }).click()
  await expect(page).toHaveURL('/dashboard')
})
\`\`\`
`
  ),
  skill(
    'redis-patterns',
    'Redis Patterns',
    'Redis 模式',
    'Caching, rate limiting, pub/sub, distributed locks, common data structures.',
    '缓存、限流、发布订阅、分布式锁与常用数据结构。',
    ['redis', 'cache', 'backend'],
    `# Redis Patterns

## Data structures
- **String**: SET/GET, INCR for counters, with TTL: \`SET k v EX 60\`
- **Hash**: object storage \`HSET user:1 name A email a@b.c\`
- **List**: queue \`LPUSH/RPOP\`, capped log \`LPUSH ... LTRIM 0 999\`
- **Set**: unique members, intersections (mutual friends)
- **Sorted Set**: leaderboards \`ZADD score member\`, range \`ZRANGE\`
- **Stream**: event log with consumer groups \`XADD/XREAD\`

## Cache-aside
\`\`\`pseudo
v = redis.get(k)
if v is None:
  v = db.fetch(k)
  redis.set(k, v, ex=300)
return v
\`\`\`
Invalidate on write. Use jittered TTL to avoid thundering herd.

## Rate limit (token bucket via Lua)
Simpler: fixed window
\`\`\`
key = "rl:" + user_id + ":" + minute
count = redis.incr(key)
if count == 1: redis.expire(key, 60)
if count > LIMIT: reject
\`\`\`

## Distributed lock (Redlock-lite single-node)
\`\`\`
SET lock:resource <random> NX EX 30
# do work
# release: Lua compare-and-delete to avoid releasing someone else's lock
\`\`\`

## Pub/Sub
- \`SUBSCRIBE chan\` / \`PUBLISH chan msg\`
- For durable delivery prefer Streams + consumer groups.

## Pipelining vs transactions
- Pipeline: batch commands, fewer round-trips (no atomicity).
- MULTI/EXEC: atomic, but other clients can still INTERLEAVE READS only between TX.
- Lua scripts: atomic + server-side logic.

## Gotchas
- Don't use \`KEYS *\` in prod -> use \`SCAN\`.
- Watch eviction policy (\`maxmemory-policy\`).
- Beware of big keys / hot keys.
`
  ),
  skill(
    'system-design-basics',
    'System Design Basics',
    '系统设计基础',
    'Scaling, caching, queues, CAP, sharding, common interview building blocks.',
    '扩展、缓存、消息队列、CAP 定理、分片与常见面试构建模块。',
    ['system-design', 'architecture'],
    `# System Design Basics

## Scale up vs out
- **Vertical** (bigger box): simple, limited, single point of failure.
- **Horizontal** (more boxes): requires stateless services + load balancer + shared state.

## Load balancing
- L4 (TCP) vs L7 (HTTP, content-aware routing).
- Algorithms: round-robin, least connections, consistent hashing (for sticky cache nodes).

## Caching layers
- Client (browser, ETag, Cache-Control)
- CDN (static + edge cache)
- Reverse proxy (Varnish, Nginx)
- Application (Redis/Memcached)
- DB query cache
Patterns: cache-aside, write-through, write-back.

## Database scaling
- **Read replicas**: scale reads, eventual consistency.
- **Sharding**: by user ID hash, range, or geo. Resharding is hard -> use consistent hashing.
- **CQRS**: separate read model from write model.

## Async via queues
- Smooth bursty traffic, decouple producers/consumers.
- At-least-once delivery is the norm -> consumers must be idempotent.
- Kafka (log, replayable, partitioned), RabbitMQ (smart broker), SQS (managed).

## CAP / PACELC
In a partition you pick Consistency or Availability. Even without partition you trade Latency vs Consistency.
- CP: HBase, ZooKeeper, etcd
- AP: Cassandra, DynamoDB (tunable), Couchbase

## Consistency models
Strong > Linearizable > Sequential > Causal > Read-your-writes > Eventual.

## Availability math
- 99.9% -> 8.76h/year downtime
- 99.99% -> 52.6m/year
- Each "nine" ~10x harder.

## Building blocks checklist
LB | API GW | Auth | App tier | Cache | DB primary+replicas | Queue | Object storage | CDN | Search index | Metrics/logs/traces
`
  ),
  skill(
    'cursor-prompting',
    'Effective AI Coding Prompts',
    '高效 AI 编程提示词',
    'How to write prompts that get accurate code from AI assistants.',
    '如何撰写能让 AI 助手准确输出代码的提示词。',
    ['ai', 'prompting', 'meta'],
    `# Effective AI Coding Prompts

## Provide context first
- Tech stack (language, framework, version)
- Existing file structure / relevant snippets
- Constraints (browser support, perf budget, no new deps)

## State the goal, not the solution
Bad: "Add useState here"
Good: "When user clicks the row it should expand to show details; data is already in the parent."

## Specify acceptance criteria
- Inputs / outputs / edge cases
- Error handling expectations
- Tests required? Where?

## Anchor to real code
Paste the relevant function or share file paths. Don't make the AI guess naming conventions.

## Iterative refinement
1. Ask for a plan first ("List steps before coding").
2. Confirm assumptions.
3. Then request implementation.
4. Review diff; ask for fixes specifically.

## Useful prompt skeleton
\`\`\`
Context: <stack, file path, snippet>
Task: <what to do>
Constraints: <perf, deps, style>
Acceptance: <how I'll know it's done>
\`\`\`

## Anti-patterns
- "Make it better" (unbounded).
- Asking for code without sharing existing code.
- Mixing 5 changes in one prompt; reviewer can't isolate.

## Debugging with AI
Share: the exact error, full stack trace, what changed last, the minimal repro. Then ask for hypotheses ranked by likelihood before any fix.
`
  ),
]

fs.writeFileSync(dataPath, JSON.stringify(skills, null, 2) + '\n', 'utf-8')
console.log('Wrote ' + skills.length + ' skills to ' + dataPath)

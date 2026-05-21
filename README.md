# AI Skill Library

A remote AI skill memory library. Store development skills as structured content, then give AI the URL to load specific skills on demand.

## Setup

```bash
npm install
npm run dev
```

## Usage

- **Web UI**: Browse, create, and manage skills at `http://localhost:3000`
- **API (JSON)**: `GET /api/skills/:id` returns skill data as JSON
- **API (Markdown)**: `GET /api/skills/:id` with `Accept: text/plain` header returns raw markdown content
- **Create**: `POST /api/skills` with JSON body `{ id, title, description, content, tags }`
- **Update**: `PUT /api/skills/:id`
- **Delete**: `DELETE /api/skills/:id`

> Write operations (POST/PUT/DELETE) require an `Authorization: Bearer <ADMIN_API_KEY>` header in production.
> Set the `ADMIN_API_KEY` environment variable on your server to enable write access.

## How AI uses it

Give AI a URL like:

```
curl -H "Accept: text/plain" https://your-domain.com/api/skills/nextjs-app-router
```

AI will receive the skill content as markdown and use it as context for development.

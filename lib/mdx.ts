import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const POSTS_DIR = path.join(process.cwd(), 'content/posts')

export type PostMeta = {
  slug: string
  title: string
  date: string
  summary: string
  tags: string[]
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return []

  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((filename) => {
      const slug = filename.replace('.mdx', '')
      const raw = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf-8')
      const { data } = matter(raw)
      return {
        slug,
        title: data.title ?? 'Untitled',
        date: data.date ?? '',
        summary: data.summary ?? '',
        tags: data.tags ?? [],
      } as PostMeta
    })
    .filter((p) => p.date)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string): {
  meta: PostMeta
  content: string
} {
  const filepath = path.join(POSTS_DIR, `${slug}.mdx`)

  if (!fs.existsSync(filepath)) {
    throw new Error(`Post not found: ${slug}`)
  }

  const raw = fs.readFileSync(filepath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    meta: {
      slug,
      title: data.title ?? 'Untitled',
      date: data.date ?? '',
      summary: data.summary ?? '',
      tags: data.tags ?? [],
    },
    content,
  }
}

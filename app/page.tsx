import Link from 'next/link'
import { getAllPosts } from '@/lib/mdx'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Writing about web development, design, and building things.',
}

export default function BlogIndex() {
  const posts = getAllPosts()

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="mb-14">
        <h1 className="text-3xl font-semibold tracking-tight mb-3">Writing</h1>
        <p className="text-[var(--muted)]">
          Thoughts on web development, design, and things I'm building.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-[var(--muted)]">No posts yet. Check back soon.</p>
      ) : (
        <ul className="space-y-0 divide-y divide-[var(--border)]">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex items-start justify-between gap-8 py-6 hover:opacity-80 transition-opacity"
              >
                <div className="flex-1 min-w-0">
                  <h2 className="font-medium text-[var(--foreground)] mb-1 group-hover:underline underline-offset-4 decoration-[var(--muted)]">
                    {post.title}
                  </h2>
                  <p className="text-sm text-[var(--muted)] line-clamp-2">
                    {post.summary}
                  </p>
                  {post.tags?.length > 0 && (
                    <div className="flex gap-1.5 mt-2 flex-wrap">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-full border border-[var(--border)] text-[var(--muted)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <time
                  dateTime={post.date}
                  className="text-sm text-[var(--muted)] whitespace-nowrap pt-0.5 shrink-0"
                >
                  {formatDate(post.date)}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

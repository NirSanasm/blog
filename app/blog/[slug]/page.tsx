import { getPostBySlug, getAllPosts } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Comments from '@/components/blog/Comments'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params
    const { meta } = getPostBySlug(slug)
    return {
      title: meta.title,
      description: meta.summary,
    }
  } catch {
    return {}
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  let post
  try {
    post = getPostBySlug(slug)
  } catch {
    notFound()
  }

  const { meta, content } = post

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-10 group"
      >
        <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
        All posts
      </Link>

      {/* Post header */}
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <time dateTime={meta.date} className="text-sm text-[var(--muted)]">
            {formatDate(meta.date)}
          </time>
          {meta.tags?.length > 0 && (
            <>
              <span className="text-[var(--border)]">·</span>
              <div className="flex gap-1.5 flex-wrap">
                {meta.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full border border-[var(--border)] text-[var(--muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
        <h1 className="text-4xl font-semibold tracking-tight leading-tight">
          {meta.title}
        </h1>
        {meta.summary && (
          <p className="mt-3 text-lg text-[var(--muted)] leading-relaxed">
            {meta.summary}
          </p>
        )}
      </header>

      {/* MDX content */}
      <article className="prose prose-neutral dark:prose-invert max-w-none
        prose-headings:font-semibold prose-headings:tracking-tight
        prose-a:text-[var(--foreground)] prose-a:underline-offset-4
        prose-code:text-sm prose-code:bg-[var(--card)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
        prose-pre:bg-[var(--card)] prose-pre:border prose-pre:border-[var(--border)]
        prose-img:rounded-lg prose-img:border prose-img:border-[var(--border)]
        prose-hr:border-[var(--border)]
      ">
        <MDXRemote source={content} />
      </article>

      {/* Comments */}
      <div className="mt-16 pt-12 border-t border-[var(--border)]">
        <h2 className="text-lg font-semibold mb-6">Comments</h2>
        <Comments />
      </div>
    </div>
  )
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

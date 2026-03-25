import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-32 text-center">
      <p className="text-6xl font-semibold text-[var(--border)] mb-6">404</p>
      <h1 className="text-xl font-medium mb-3">Post not found</h1>
      <p className="text-[var(--muted)] mb-8">
        This post doesn't exist or may have been moved.
      </p>
      <Link
        href="/"
        className="text-sm underline underline-offset-4 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
      >
        ← Back to all posts
      </Link>
    </div>
  )
}

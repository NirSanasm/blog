'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function Nav() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-sm">
      <nav className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-medium text-sm hover:opacity-70 transition-opacity"
        >
          Niranjit
          <span className="text-[var(--muted)] font-normal"> / blog</span>
        </Link>

        <div className="flex items-center gap-4">
          <a
            href="https://niranjit.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            Portfolio
          </a>
          <a
            href="https://github.com/NirSanasm"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            GitHub
          </a>

          {mounted && (
            <button
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="w-8 h-8 flex items-center justify-center rounded-md border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--foreground)] transition-colors text-sm"
              aria-label="Toggle theme"
            >
              {resolvedTheme === 'dark' ? '☀' : '○'}
            </button>
          )}
        </div>
      </nav>
    </header>
  )
}

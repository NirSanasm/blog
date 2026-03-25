import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { ThemeProvider } from '@/components/blog/ThemeProvider'
import Nav from '@/components/blog/Nav'

export const metadata: Metadata = {
  title: {
    default: 'Niranjit — Blog',
    template: '%s · Niranjit',
  },
  description: 'Writing about web development, design, and building things.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://blog.niranjit.com',
    siteName: 'Niranjit — Blog',
  },
  twitter: {
    card: 'summary',
    creator: '@NirSanasm',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Nav />
            <main className="flex-1">{children}</main>
            <footer className="border-t border-[var(--border)] py-8 mt-16">
              <div className="max-w-2xl mx-auto px-4 flex items-center justify-between text-sm text-[var(--muted)]">
                <span>© {new Date().getFullYear()} Niranjit</span>
                <a
                  href="https://niranjit.com"
                  className="hover:text-[var(--foreground)] transition-colors"
                >
                  ← Portfolio
                </a>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import { LanguageProvider } from '@/context/LanguageContext'

export const metadata: Metadata = {
  title: 'AI Skill Library',
  description: 'Remote AI skill memory library',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-white dark:bg-neutral-950 text-black dark:text-white antialiased">
        <LanguageProvider>
          <Header />
          <main className="max-w-5xl mx-auto px-6 py-8">
            {children}
          </main>
        </LanguageProvider>
      </body>
    </html>
  )
}

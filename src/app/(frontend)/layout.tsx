import React from 'react'
import './global.css'
import { Roboto } from 'next/font/google'
import { cn } from '@/lib/utils'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ThemeProvider } from 'next-themes'

const robo = Roboto({ subsets: ['latin'] })

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('relative h-full font-sans antialiased', robo.className)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="relative flex min-h-screen flex-col">
            {<Navbar />}
            <div className="flex-1 flex-grow">{children}</div>
            {<Footer />}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}

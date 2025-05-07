import React from 'react'
import './global.css'
import { Roboto } from 'next/font/google'
import { cn } from '@/lib/utils'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ThemeProvider } from 'next-themes'

const robo = Roboto({ subsets: ['latin'] })

export const metadata = {
  description: 'At Jarvis, we solve the toughest challenges in data, AI, and technology by leveraging proven technologies to empower organizations to innovate and drive business success. Our team of expert advisors and technologists delivers forward-thinking solutions.',
  title: 'Mock Jarvis Consulting Group | Innovate. Empower. Impact',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn('relative h-full font-sans antialiased', robo.className)}
        aria-label="Root layout of the application"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          aria-label="Theme provider for light and dark mode"
        >
          <main
            className="relative flex min-h-screen flex-col"
            aria-label="Main content area"
          >
            <Navbar aria-label="Application navigation bar" />
            <div className="flex-1 flex-grow" aria-label="Page content">
              {children}
            </div>
            <Footer aria-label="Application footer" />
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
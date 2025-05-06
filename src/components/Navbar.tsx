'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'

export default function Navbar() {
  const { theme, setTheme } = useTheme()

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 shadow-sm bg-background/80 backdrop-blur">
      <Link href="/" className="text-xl font-bold">
        <Image src={'/images/jrvs-logo.png'} width={150} height={150} alt="Jarvis" />
      </Link>

      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        <span className="sr-only">Toggle theme</span>
      </Button>
    </nav>
  )
}

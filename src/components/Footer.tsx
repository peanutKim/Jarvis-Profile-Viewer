'use client'

import Link from 'next/link'
import { Linkedin, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-background border-t py-6 px-6">
      <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-base text-foreground">jrvs</span>
        </div>

        <p className="text-center">
          &copy; {new Date().getFullYear()} Jarvis. All rights reserved.
        </p>

        <div className="flex gap-4">
          <Link
            href="https://www.linkedin.com/company/jarvisconsulting/"
            target="_blank"
            aria-label="Linkedin"
          >
            <Linkedin className="h-5 w-5 hover:text-foreground transition-colors" />
          </Link>
          <Link
            href="https://www.instagram.com/jarvisconsultinggroup/"
            target="_blank"
            aria-label="Instagram"
          >
            <Instagram className="h-5 w-5 hover:text-foreground transition-colors" />
          </Link>
          <Link href="https://x.com/jrvsconsulting" aria-label="Twitter">
            <Twitter className="h-5 w-5 hover:text-foreground transition-colors" />
          </Link>
        </div>
      </div>
    </footer>
  )
}

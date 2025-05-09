import React from 'react'
import './global.css'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'

export default async function HomePage() {

  return (
    <>
      <MaxWidthWrapper>
        <div
          className="mx-auto -mb-5 flex max-w-3xl flex-col items-center py-20 text-center"
          aria-label="Homepage content"
        >
          <h1 className="text-4xl font-light tracking-tight sm:text-6xl">
            Grow your team with conversion to permanent employees at {' '}
            <span className="text-red-600">no cost</span>.
          </h1>
          <p className="mt-6 max-w-prose text-lg text-muted-foreground">
            Our unique talent model offers a scalable solution for building a successful talent pipeline, including full-time conversion at no-cost.
          </p>
          <div
            className="mt-6 flex flex-col gap-4 sm:flex-row"
            aria-label="Call-to-action buttons"
          >
            <Link
              href="/consultants"
              className={`${buttonVariants()} bg-red-600 hover:bg-red-700`}
              aria-label="Discover top talent"
            >
              Discover Top Talent
            </Link>
            <Link
              href="/admin"
              aria-label="Go to admin page"
            >
              <Button variant="ghost">Admin &rarr;</Button>
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  )
}
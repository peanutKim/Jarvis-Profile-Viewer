import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './global.css'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  return (
    <>
      <MaxWidthWrapper>
        <div className="mx-auto -mb-5 flex max-w-3xl flex-col items-center py-20 text-center">
          {!user && <h1>Welcome to your new proect.</h1>}
          {user && <h1>Welcome back, {user.email}</h1>}
          <h1 className="text-2xl font-light tracking-tight text-gray-900 sm:text-6xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit{' '}
            <span className="text-red-600">sed do eiusmod</span>.
          </h1>
          <p className="mt-6 max-w-prose text-lg text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Link href="/consultants" className={buttonVariants()}>
              Check Out Our Talent
            </Link>
            <Link href="/admin">
              <Button variant="ghost">Admin &rarr;</Button>
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  )
}

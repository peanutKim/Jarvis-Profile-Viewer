"use client"

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { useEffect, useState } from 'react'
import Profile from '@/components/Profile'
import { useParams } from 'next/navigation'
import { NotFoundPage } from '@payloadcms/next/views'

interface Consultant {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  bio: string
  profilePicture?: { url: string }
}

export default function ProfilePage() {
  const { id } = useParams() as { id: string }
  const [consultant, setConsultant] = useState<Consultant | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchConsultant = async () => {
      try {
        const response = await fetch(`/api/get-consultant/${id}`)

        if (!response.ok) {
          throw new Error('Consultant not found')
        }

        const data = await response.json()
        setConsultant(data)
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }

    fetchConsultant()
  }, [id])

  if (loading) {
    return (
      <MaxWidthWrapper>
        <div aria-label="Loading profile">Loading profile...</div>
      </MaxWidthWrapper>
    )
  }

  if (!consultant) {
    return (
      <MaxWidthWrapper>
        <div aria-label="Consultant not found">404 | Consultant not found.</div>
      </MaxWidthWrapper>
    )
  }

  return (
    <MaxWidthWrapper>
      <Profile
        consultant={consultant}
        aria-label={`Profile of ${consultant.firstName} ${consultant.lastName}`}
      />
    </MaxWidthWrapper>
  )
}
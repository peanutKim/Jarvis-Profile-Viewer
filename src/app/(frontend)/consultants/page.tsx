'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Consultant } from '@/payload-types'

const Page = () => {
  const [consultants, setConsultants] = useState<Consultant[]>([])

  useEffect(() => {
    const fetchConsultants = async () => {
      const response = await fetch('/api/get-consultants')
      const data = await response.json()
      setConsultants(data.docs)
    }

    fetchConsultants()
  }, [])

  return (
    <MaxWidthWrapper>
      <h1>Consultants</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {consultants.map((consultant) => (
          <Card key={consultant.id} className="shadow-md">
            <CardHeader>
              <CardTitle>
                {consultant.firstName} {consultant.lastName}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Email:</strong> {consultant.email}
              </p>
              <p>
                <strong>Phone:</strong> {consultant.phoneNumber}
              </p>
              {consultant.profilePicture && (
                <img
                  src={
                    consultant.profilePicture &&
                    (typeof consultant.profilePicture === 'string'
                      ? consultant.profilePicture
                      : consultant.profilePicture.url || '/default-image.jpg')
                  }
                  alt={`${consultant.firstName} ${consultant.lastName}`}
                  width={500} // Default width
                  height={500} // Default height
                  className="w-full h-auto mt-2 object-cover"
                />
              )}
            </CardContent>
            <CardFooter className="flex justify-end">
              <Link href={`/profile?id=${consultant.id}`} passHref>
                <Button variant="outline">View Profile</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </MaxWidthWrapper>
  )
}

export default Page

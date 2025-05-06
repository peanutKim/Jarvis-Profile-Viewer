'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Consultant } from '@/payload-types'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'

const Page = () => {
  const [consultants, setConsultants] = useState<Consultant[]>([])
  const [filter, setFilter] = useState("")
  const searchParams = useSearchParams()

  useEffect(() => {
    const fetchConsultants = async () => {
      const response = await fetch('/api/consultants')
      const data = await response.json()

      if(searchParams.toString() == "") {
        return setConsultants(data.docs)
      }

      if(searchParams.get("email") != null) {
        data.docs = data.docs.filter((item: { email: (string | null)[] }) => item.email.includes(searchParams.get("email")));
      }

      if(searchParams.get("firstName") != null) {
        let firstName = String(searchParams.get("firstName")).toUpperCase();
        data.docs = data.docs.filter((item: { firstName: string }) => item.firstName.toUpperCase().includes(firstName));
      }

      if(searchParams.get("lastName") != null) {
        let lastName = String(searchParams.get("lastName")).toUpperCase();
        data.docs = data.docs.filter((item: { lastName: string }) => item.lastName.toUpperCase().includes(lastName));
      }

      if(searchParams.get("phoneNumber") != null) {
        data.docs = data.docs.filter((item: { phoneNumber: (string | null)[] }) => item.phoneNumber.includes(searchParams.get("phoneNumber")));
      }

      if(searchParams.get("bio") != null) {
        let bio = String(searchParams.get("bio")).toUpperCase();
        data.docs = data.docs.filter((item: { bio: string }) => item.bio.toUpperCase().includes(bio));
      }

      setConsultants(data.docs)
    }

    fetchConsultants()
  }, [])

  function submitSearch() {
    if(filter != "") {
      window.location.replace(window.location.origin + "/consultants?firstName=" + filter)
    } else {
      window.location.replace(window.location.origin + "/consultants")
    }
  }

  return (
    <MaxWidthWrapper>
      <div className="pt-3">
      <h1>Consultants</h1>
      <div className="flex w-full max-w-sm items-center space-x-2 pt-3 pb-3">
      <Input type="text" id="filter" value={filter} placeholder="Search by first name" onInput={e => {setFilter(e.target.value)}}/>
      <Button type="submit" onClick={submitSearch}>Search</Button>
    </div>
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
                <Image
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
      </div>
    </MaxWidthWrapper>
  )
}

export default Page

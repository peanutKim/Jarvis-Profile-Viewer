'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Consultant } from '@/payload-types'
import { Suspense } from 'react';

const ConsultantsPageContent = () => {
  const searchParams = useSearchParams();
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [masterCopy, setMasterCopy] = useState<Consultant[]>([]);
  const [filter, setFilter] = useState("");

  const fetchConsultants = async () => {
    const response = await fetch('/api/get-consultants');
    const data = await response.json();
    setMasterCopy(data.docs);

    if (searchParams.toString() === "") {
      return setConsultants(data.docs);
    }

    if (searchParams.get("email") != null) {
      data.docs = data.docs.filter((item: { email: (string | null)[] }) => item.email.includes(searchParams.get("email")));
    }

    if (searchParams.get("firstName") != null) {
      const firstName = String(searchParams.get("firstName")).toUpperCase();
      data.docs = data.docs.filter((item: { firstName: string }) => item.firstName.toUpperCase().includes(firstName));
    }

    if (searchParams.get("lastName") != null) {
      const lastName = String(searchParams.get("lastName")).toUpperCase();
      data.docs = data.docs.filter((item: { lastName: string }) => item.lastName.toUpperCase().includes(lastName));
    }

    if (searchParams.get("phoneNumber") != null) {
      data.docs = data.docs.filter((item: { phoneNumber: (string | null)[] }) => item.phoneNumber.includes(searchParams.get("phoneNumber")));
    }

    if (searchParams.get("bio") != null) {
      const bio = String(searchParams.get("bio")).toUpperCase();
      data.docs = data.docs.filter((item: { bio: string }) => item.bio.toUpperCase().includes(bio));
    }

    setConsultants(data.docs);
  };

  useEffect(() => {
    fetchConsultants();
  }, [searchParams]);

  useEffect(() => {
    if (filter != null) {
      const firstName = filter.toUpperCase();
       setConsultants(masterCopy.filter((item: { firstName: string }) => item.firstName.toUpperCase().includes(firstName)))
    }
  }, [filter])

  return (
    <div>
      <div className="flex justify-center items-center w-full">
        <div className="flex w-full max-w-sm items-center space-x-2 pt-3 pb-3">
          <Input
            type="text"
            id="filter"
            value={filter}
            placeholder="Search by name"
            onInput={(e) => {
              setFilter((e.target as HTMLInputElement).value);
            }}
          />
        </div>
      </div>
      <div className="mb-5 mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {consultants.map((consultant) => (
          <Card key={consultant.id} className="shadow-md">
            <CardContent className="flex flex-col items-center text-center">
              <h1 className="text-4xl font-light">
                {consultant.firstName} {consultant.lastName}
              </h1>
              <p className="text-muted-foreground">{consultant.email}</p>
              <Image
                src={
                  typeof consultant.profilePicture === 'string'
                    ? consultant.profilePicture
                    : consultant.profilePicture?.url || '/default-image.jpg'
                }
                alt={`${consultant.firstName} ${consultant.lastName}`}
                width={500}
                height={500}
                className="w-full h-auto mt-2 object-cover"
              />
            </CardContent>
            <CardFooter className="flex justify-center">
              <Link href={`/profile/${consultant.id}`} passHref>
                <Button>View Profile</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <MaxWidthWrapper>
      <Suspense fallback={<div>Loading...</div>}>
        <ConsultantsPageContent />
      </Suspense>
    </MaxWidthWrapper>
  );
};

export default Page

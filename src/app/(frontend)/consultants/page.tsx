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
  
      <div className="mb-5 mt-2 flex flex-wrap justify-center gap-6">
        {consultants.map((consultant) => {
          const fullName = `${consultant.firstName} ${consultant.lastName}`;
          const imageUrl =
            typeof consultant.profilePicture === "string"
              ? consultant.profilePicture
              : consultant.profilePicture?.url || "/default-image.jpg";
  
          return (
            <Card
              key={consultant.id}
              className="overflow-hidden border rounded-2xl shadow-md hover:shadow-lg transition-shadow min-w-[300px]"
            >
              <CardContent className="flex flex-col items-center text-center p-6 space-y-4">
                <Image
                  src={imageUrl}
                  alt={fullName}
                  width={96}
                  height={96}
                  className="w-24 h-24 rounded-full object-cover ring-2 ring-gray-200"
                />
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    {fullName}
                  </h2>
                  <p className="text-sm text-muted-foreground">{consultant.email}</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center pb-6">
                <Link href={`/profile/${consultant.id}`} passHref>
                  <Button className="w-full max-w-[200px]">View Profile</Button>
                </Link>
              </CardFooter>
            </Card>
          );
        })}
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

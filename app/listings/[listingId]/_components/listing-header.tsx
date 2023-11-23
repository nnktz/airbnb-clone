'use client'

import Image from 'next/image'

import useCountries from '@/hooks/use-contries'
import { SafeUser } from '@/types'

import { Heading } from '@/components/heading'
import { HeartButton } from '@/components/heart-button'

interface ListingHeaderProps {
  title: string
  imageSrc: string
  locationValue: string
  id: string
  currentUser?: SafeUser | null
}

export const ListingHeader = ({
  title,
  imageSrc,
  locationValue,
  id,
  currentUser,
}: ListingHeaderProps) => {
  const { getByValue } = useCountries()

  const location = getByValue(locationValue)

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />

      <div className="relative h-[60vh] w-full overflow-hidden rounded-xl">
        <Image
          src={imageSrc}
          alt="Image"
          fill
          className="w-full object-cover"
        />

        <div className="absolute right-5 top-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  )
}

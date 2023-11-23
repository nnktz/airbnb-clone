'use client'

import dynamic from 'next/dynamic'
import { IconType } from 'react-icons'

import useCountries from '@/hooks/use-contries'
import { SafeUser } from '@/types'

import { Avatar } from '@/components/avatar'
import { ListingCategory } from './listing-category'

const Map = dynamic(() => import('@/components/map'), {
  ssr: false,
})

interface ListingInfoProps {
  user: SafeUser
  category:
    | {
        label: string
        icon: IconType
        description: string
      }
    | undefined
  description: string
  roomCount: number
  bathroomCount: number
  guestCount: number
  locationValue: string
}

export const ListingInfo = ({
  user,
  category,
  description,
  roomCount,
  bathroomCount,
  guestCount,
  locationValue,
}: ListingInfoProps) => {
  const { getByValue } = useCountries()

  const coordinates = getByValue(locationValue)?.latlng

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2 text-xl font-semibold">
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>

        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>

      <hr />

      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}

      <hr />

      <div className="text-lg font-light text-neutral-500">{description}</div>

      <hr />

      <Map center={coordinates} />
    </div>
  )
}

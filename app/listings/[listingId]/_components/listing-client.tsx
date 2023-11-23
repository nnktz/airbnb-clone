'use client'

import { Reservation } from '@prisma/client'
import { useMemo } from 'react'

import { SafeListing, SafeUser } from '@/types'

import { categories } from '@/components/layout/nav-bar/categories'
import { Container } from '@/components/container'
import { ListingHeader } from './listing-header'
import { ListingInfo } from './listing-info'

interface ListingClientProps {
  listing: SafeListing & {
    user: SafeUser
  }
  reservations?: Reservation[]
  currentUser?: SafeUser | null
}

export const ListingClient = ({
  listing,
  reservations,
  currentUser,
}: ListingClientProps) => {
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category)
  }, [listing.category])

  return (
    <Container>
      <div className="mx-auto max-w-screen-lg">
        <div className="flex flex-col gap-6">
          <ListingHeader
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />

          <div className="mt-6 grid grid-cols-1 md:grid-cols-7 md:gap-10">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              bathroomCount={listing.bathroomCount}
              guestCount={listing.guestCount}
              locationValue={listing.locationValue}
            />
          </div>
        </div>
      </div>
    </Container>
  )
}

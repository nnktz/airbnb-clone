'use client'

import axios from 'axios'
import toast from 'react-hot-toast'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns'
import { Range } from 'react-date-range'

import { SafeListing, SafeReservation, SafeUser } from '@/types'
import { useLoginModal } from '@/hooks/use-login-modal'

import { categories } from '@/components/layout/nav-bar/categories'
import { Container } from '@/components/container'
import { ListingHeader } from './listing-header'
import { ListingInfo } from './listing-info'
import { ListingReservation } from './listing-reservation'

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
}

interface ListingClientProps {
  listing: SafeListing & {
    user: SafeUser
  }
  reservations?: SafeReservation[]
  currentUser?: SafeUser | null
}

export const ListingClient = ({
  listing,
  reservations,
  currentUser,
}: ListingClientProps) => {
  const loginModal = useLoginModal()
  const router = useRouter()

  const disabledDates = useMemo(() => {
    let dates: Date[] = []

    reservations?.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      })

      dates = [...dates, ...range]
    })

    return dates
  }, [reservations])

  const [isLoading, setIsLoading] = useState(false)
  const [totalPrice, setTotalPrice] = useState(listing.price)
  const [dateRange, setDateRange] = useState<Range>(initialDateRange)

  const onCreateReservation = useCallback(async () => {
    try {
      if (!currentUser) {
        return loginModal.onOpen()
      }

      setIsLoading(true)

      await axios
        .post('/api/reservations', {
          totalPrice,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
          listingId: listing.id,
        })
        .then((response) => {
          toast.success('Listing reserved.')
          setDateRange(initialDateRange)
          router.push('/trips')
          router.refresh()
        })
    } catch (error) {
      toast.error('Something went wrong.')
    } finally {
      setIsLoading(false)
    }
  }, [
    currentUser,
    dateRange.endDate,
    dateRange.startDate,
    listing.id,
    loginModal,
    router,
    totalPrice,
  ])

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate,
      )

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price)
      } else {
        setTotalPrice(listing.price)
      }
    }
  }, [dateRange.endDate, dateRange.startDate, listing.price])

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

            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

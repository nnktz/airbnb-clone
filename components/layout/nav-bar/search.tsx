'use client'

import { useMemo } from 'react'
import { BiSearch } from 'react-icons/bi'
import { differenceInDays } from 'date-fns'
import { useSearchParams } from 'next/navigation'

import { useSearchModal } from '@/hooks/use-search-modal'
import useCountries from '@/hooks/use-contries'

export const Search = () => {
  const searchModal = useSearchModal()
  const searchParams = useSearchParams()
  const { getByValue } = useCountries()

  const locationValue = searchParams?.get('locationValue')
  const startDate = searchParams?.get('startDate')
  const endDate = searchParams?.get('endDate')
  const guestCount = searchParams?.get('guestCount')

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label
    }

    return 'Anywhere'
  }, [getByValue, locationValue])

  const duration = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string)
      const end = new Date(endDate as string)
      let diff = differenceInDays(end, start)

      if (diff === 0) {
        diff = 1
      }

      return `${diff} Days`
    }

    return 'Any Week'
  }, [endDate, startDate])

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`
    }

    return 'Add Guests'
  }, [guestCount])

  return (
    <div
      role="button"
      onClick={searchModal.onOpen}
      className="w-full rounded-full border-[1px] py-2 shadow-sm transition hover:shadow-md md:w-auto"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="px-6 text-sm font-semibold">{locationLabel}</div>

        <div className="hidden flex-1 border-x-[1px] px-6 text-center text-sm font-semibold sm:block">
          {duration}
        </div>

        <div className="flex flex-row items-center gap-3 pl-6 pr-2 text-sm text-gray-600">
          <div className="hidden sm:block">{guestLabel}</div>
          <div className="rounded-full bg-rose-500 p-2 text-white">
            <BiSearch />
          </div>
        </div>
      </div>
    </div>
  )
}

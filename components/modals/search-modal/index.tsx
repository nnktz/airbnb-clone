'use client'

import qs from 'query-string'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import { Range } from 'react-date-range'
import { formatISO } from 'date-fns'

import { useSearchModal } from '@/hooks/use-search-modal'

import { CountrySelectValue } from '@/components/country-select'
import { Modal } from '../modal'
import { LocationContent } from './location-content'
import { DateContent } from './date-content'
import { InfoContent } from './info-content'

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

export const SearchModal = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isOpen = useSearchModal((state) => state.isOpen)
  const onClose = useSearchModal((state) => state.onClose)

  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(STEPS.LOCATION)
  const [location, setLocation] = useState<CountrySelectValue>()
  const [guestCount, setGuestCount] = useState(1)
  const [roomCount, setRoomCount] = useState(1)
  const [bathroomCount, setBathroomCount] = useState(1)
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  })

  const onBack = useCallback(() => {
    setStep((value) => value - 1)
  }, [])

  const onNext = useCallback(() => {
    setStep((value) => value + 1)
  }, [])

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext()
    }

    setIsLoading(true)

    let currentQuery = {}

    if (searchParams) {
      currentQuery = qs.parse(searchParams.toString())
    }

    const updateQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    }

    if (dateRange.startDate) {
      updateQuery.startDate = formatISO(dateRange.startDate)
    }

    if (dateRange.endDate) {
      updateQuery.endDate = formatISO(dateRange.endDate)
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updateQuery,
      },
      { skipNull: true },
    )

    setIsLoading(false)
    setStep(STEPS.LOCATION)
    onClose()
    router.push(url)
  }, [
    bathroomCount,
    dateRange.endDate,
    dateRange.startDate,
    guestCount,
    location?.value,
    onClose,
    onNext,
    roomCount,
    router,
    searchParams,
    step,
  ])

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return 'Search'
    }

    return 'Next'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined
    }

    return 'Back'
  }, [step])

  let bodyContent = (
    <LocationContent
      location={location}
      onChange={(value) => setLocation(value as CountrySelectValue)}
    />
  )

  if (step === STEPS.DATE) {
    bodyContent = (
      <DateContent
        value={dateRange}
        onChange={(value) => setDateRange(value.selection)}
      />
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <InfoContent
        guestCount={guestCount}
        roomCount={roomCount}
        bathroomCount={bathroomCount}
        onChangeGuestCount={(value) => setGuestCount(value)}
        onChangeRoomCount={(value) => setRoomCount(value)}
        onChangeBathroomCount={(value) => setBathroomCount(value)}
      />
    )
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      title="Filters"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      body={bodyContent}
      disabled={isLoading}
    />
  )
}

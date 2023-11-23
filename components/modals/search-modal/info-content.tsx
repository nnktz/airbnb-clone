'use client'

import { Heading } from '@/components/heading'
import { Counter } from '@/components/counter'

interface InfoContentProps {
  guestCount: number
  roomCount: number
  bathroomCount: number
  onChangeGuestCount: (value: number) => void
  onChangeRoomCount: (value: number) => void
  onChangeBathroomCount: (value: number) => void
}

export const InfoContent = ({
  guestCount,
  roomCount,
  bathroomCount,
  onChangeGuestCount,
  onChangeRoomCount,
  onChangeBathroomCount,
}: InfoContentProps) => {
  return (
    <div className="flex flex-col gap-4">
      <Heading title="More information" subtitle="Find your perfect place!" />

      <Counter
        title="Guests"
        subTitle="How many guests are coming?"
        value={guestCount}
        onChange={onChangeGuestCount}
      />

      <Counter
        title="Rooms"
        subTitle="How many rooms do you need?"
        value={roomCount}
        onChange={onChangeRoomCount}
      />

      <Counter
        title="Bathrooms"
        subTitle="How many bathrooms do you need?"
        value={bathroomCount}
        onChange={onChangeBathroomCount}
      />
    </div>
  )
}

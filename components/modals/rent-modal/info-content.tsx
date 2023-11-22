'use client'

import { Counter } from '@/components/counter'
import { Heading } from '@/components/heading'

interface InfoContentProps {
  setCustomValueGuest: (value: number) => void
  setCustomValueRoom: (value: number) => void
  setCustomValueBathroom: (value: number) => void
  guestCount: any
  roomCount: any
  bathroomCount: any
}

export const InfoContent = ({
  setCustomValueGuest,
  setCustomValueRoom,
  setCustomValueBathroom,
  guestCount,
  roomCount,
  bathroomCount,
}: InfoContentProps) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Share some basic about your place?"
        subtitle="What amenities do you have?"
      />

      <Counter
        title="Guests"
        subTitle="How many guests do you allow?"
        value={guestCount}
        onChange={setCustomValueGuest}
      />

      <hr />

      <Counter
        title="Rooms"
        subTitle="How many rooms do you have?"
        value={roomCount}
        onChange={setCustomValueRoom}
      />

      <hr />

      <Counter
        title="Bathrooms"
        subTitle="How many bathrooms do you have?"
        value={bathroomCount}
        onChange={setCustomValueBathroom}
      />
    </div>
  )
}

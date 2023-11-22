'use client'

import dynamic from 'next/dynamic'
import { useMemo } from 'react'

import { Heading } from '@/components/heading'
import { CountrySelect, CountrySelectValue } from '@/components/contry-select'

interface LocationContentProps {
  setCustomValue: (value: CountrySelectValue) => void
  location: any
}

export const LocationContent = ({
  setCustomValue,
  location,
}: LocationContentProps) => {
  const Map = useMemo(
    () =>
      dynamic(() => import('@/components/map'), {
        ssr: false,
      }),
    [location],
  )

  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where is your place located?"
        subtitle="Help guests find you!"
      />

      <CountrySelect value={location} onChange={setCustomValue} />

      <Map center={location?.latlng} />
    </div>
  )
}

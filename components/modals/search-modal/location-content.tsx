'use client'

import dynamic from 'next/dynamic'
import { useMemo } from 'react'

import { CountrySelect, CountrySelectValue } from '@/components/country-select'
import { Heading } from '@/components/heading'

interface LocationContentProps {
  location: CountrySelectValue | undefined
  onChange: (value: CountrySelectValue) => void
}

export const LocationContent = ({
  location,
  onChange,
}: LocationContentProps) => {
  const Map = useMemo(
    () =>
      dynamic(() => import('@/components/map'), {
        ssr: false,
      }),
    [location],
  )

  return (
    <div className="flex flex-col gap-4">
      <Heading
        title="Where do you wanna go?"
        subtitle="Find the perfect location!"
      />

      <CountrySelect value={location} onChange={onChange} />

      <hr />

      <Map center={location?.latlng} />
    </div>
  )
}

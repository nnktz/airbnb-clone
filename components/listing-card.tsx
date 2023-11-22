'use client'

import Image from 'next/image'
import { Listing, Reservation } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { format } from 'date-fns'

import { SafeUser } from '@/types'
import useCountries from '@/hooks/use-contries'

import { HeartButton } from './heart-button'
import { Button } from './ui/button'

interface ListingCardProps {
  data: Listing
  currentUser: SafeUser | null
  reservation?: Reservation
  disabled?: boolean
  onAction?: (id: string) => void
  actionLabel?: string
  actionId?: string
}

export const ListingCard = ({
  data,
  currentUser,
  reservation,
  disabled,
  onAction,
  actionId = '',
  actionLabel,
}: ListingCardProps) => {
  const router = useRouter()
  const { getByValue } = useCountries()

  const location = getByValue(data.locationValue)

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (disabled) {
        return
      }

      onAction?.(actionId)
    },
    [actionId, disabled, onAction],
  )

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice
    }

    return data.price
  }, [data.price, reservation])

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null
    }

    const start = new Date(reservation.startDate)
    const end = new Date(reservation.endDate)

    return `${format(start, 'PP')} - ${format(end, 'PP')}`
  }, [reservation])

  return (
    <div
      role="button"
      onClick={() => router.push(`/listings/${data.id}`)}
      className="group col-span-1"
    >
      <div className="flex w-full flex-col gap-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl">
          <Image
            src={data.imageSrc}
            alt="Listing"
            fill
            className="h-full w-full object-cover transition group-hover:scale-110"
          />

          <div className="absolute right-3 top-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>

        <div className="text-lg font-semibold">
          {location?.region}, {location?.label}
        </div>

        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>

        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>

          {!reservation && <div className="font-light">night</div>}
        </div>

        {onAction && actionLabel && (
          <Button
            small
            disabled={disabled}
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  )
}

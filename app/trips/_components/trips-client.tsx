'use client'

import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

import { SafeReservation, SafeUser } from '@/types'

import { Container } from '@/components/container'
import { Heading } from '@/components/heading'
import { ListingCard } from '@/components/listing-card'

interface TripsClientProps {
  reservations: SafeReservation[]
  currentUser?: SafeUser | null
}

export const TripsClient = ({
  reservations,
  currentUser,
}: TripsClientProps) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState('')

  const onCancel = useCallback(
    async (id: string) => {
      try {
        setDeletingId(id)

        await axios
          .delete(`/api/reservations/${id}`)
          .then(() => {
            toast.success('Reservation cancelled.')
            router.refresh()
          })
          .catch((error) => {
            toast.error(error?.response?.data?.error)
          })
      } finally {
        setDeletingId('')
      }
    },
    [router],
  )

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going."
      />

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            currentUser={currentUser}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel reservation"
          />
        ))}
      </div>
    </Container>
  )
}

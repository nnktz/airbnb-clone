import getCurrentUser from '@/actions/get-current-user'
import getReservations from '@/actions/get-reservations'

import { EmptyState } from '@/components/empty-state'
import { TripsClient } from './_components/trips-client'

const TripsPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subTitle="Please login!" />
  }

  const reservations = await getReservations({
    userId: currentUser.id,
  })

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subTitle="Looks like you haven't reserved any trips."
      />
    )
  }

  return <TripsClient reservations={reservations} currentUser={currentUser} />
}

export default TripsPage

import getCurrentUser from '@/actions/get-current-user'
import getReservations from '@/actions/get-reservations'

import { EmptyState } from '@/components/empty-state'
import { ReservationsClient } from './_components/reservations-client'

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return <EmptyState title="Authorized" subTitle="Please login!" />
  }

  const reservations = await getReservations({
    authorId: currentUser.id,
  })

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No reservations found"
        subTitle="Looks like you haven't reservations on your properties."
      />
    )
  }

  return (
    <ReservationsClient reservations={reservations} currentUser={currentUser} />
  )
}

export default ReservationsPage

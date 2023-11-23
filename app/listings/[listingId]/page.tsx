import getListingById from '@/actions/get-listing-by-id'
import getCurrentUser from '@/actions/get-current-user'
import getReservations from '@/actions/get-reservations'

import { EmptyState } from '@/components/empty-state'
import { ListingClient } from './_components/listing-client'

interface IParams {
  listingId: string
}

const ListingIdPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params)
  const reservations = await getReservations(params)
  const currentUser = await getCurrentUser()

  if (!listing) {
    return <EmptyState />
  }

  return (
    <ListingClient
      listing={listing}
      reservations={reservations}
      currentUser={currentUser}
    />
  )
}

export default ListingIdPage

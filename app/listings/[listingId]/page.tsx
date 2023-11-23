import getListingById from '@/actions/get-listing-by-id'
import getCurrentUser from '@/actions/get-current-user'

import { EmptyState } from '@/components/empty-state'
import { ListingClient } from './_components/listing-client'

interface IParams {
  listingId: string
}

const ListingIdPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params)
  const currentUser = await getCurrentUser()

  if (!listing) {
    return <EmptyState />
  }

  return <ListingClient listing={listing} currentUser={currentUser} />
}

export default ListingIdPage

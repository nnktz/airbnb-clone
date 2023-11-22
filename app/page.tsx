import getCurrentUser from '@/actions/get-current-user'
import getListings from '@/actions/get-listings'

import { Container } from '@/components/container'
import { EmptyState } from '@/components/empty-state'
import { ListingCard } from '@/components/listing-card'

export default async function Home() {
  const listings = await getListings()
  const currentUser = await getCurrentUser()

  if (listings.length === 0) {
    return <EmptyState showReset />
  }

  return (
    <Container>
      <div className="grid grid-cols-1 gap-8 pt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {listings.map((listing) => (
          <ListingCard
            currentUser={currentUser}
            data={listing}
            key={listing.id}
          />
        ))}
      </div>
    </Container>
  )
}

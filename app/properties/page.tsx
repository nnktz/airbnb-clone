import getCurrentUser from '@/actions/get-current-user'
import getListings from '@/actions/get-listings'

import { EmptyState } from '@/components/empty-state'
import { PropertiesClient } from './_components/properties-client'

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subTitle="Please login!" />
  }

  const listings = await getListings({
    userId: currentUser.id,
  })

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No properties found"
        subTitle="Looks like you haven't properties."
      />
    )
  }

  return <PropertiesClient listings={listings} currentUser={currentUser} />
}

export default PropertiesPage

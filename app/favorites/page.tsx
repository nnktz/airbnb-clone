import getCurrentUser from '@/actions/get-current-user'
import getFavorites from '@/actions/get-favorites'

import { EmptyState } from '@/components/empty-state'
import { FavoritesClient } from './_components/favorites-client'

const FavoritesPage = async () => {
  const favoriteListings = await getFavorites()
  const currentUser = await getCurrentUser()

  if (favoriteListings.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subTitle="Looks like you haven't no favorite listings."
      />
    )
  }

  return (
    <FavoritesClient
      favoriteListings={favoriteListings}
      currentUser={currentUser}
    />
  )
}

export default FavoritesPage

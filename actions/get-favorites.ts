import db from '@/lib/db'
import getCurrentUser from './get-current-user'

export default async function getFavorites() {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return []
    }

    const favorites = await db.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    })

    const safeFavorites = favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toISOString(),
    }))

    return safeFavorites
  } catch (error: any) {
    throw new Error(error)
  }
}

import db from '@/lib/db'

export interface IListingSParams {
  userId?: string
}

export default async function getListings(params: IListingSParams) {
  try {
    const { userId } = params

    let query: any = {}

    if (userId) {
      query.userId = userId
    }

    const listings = await db.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc',
      },
    })

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }))

    return safeListings
  } catch (error: any) {
    throw new Error(error)
  }
}

import { NextResponse } from 'next/server'

import getCurrentUser from '@/actions/get-current-user'
import db from '@/lib/db'

export async function DELETE(
  req: Request,
  { params }: { params: { listingId: string } },
) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      throw new NextResponse('Unauthorized', { status: 401 })
    }

    if (!params.listingId || typeof params.listingId !== 'string') {
      throw new NextResponse('Invalid Id', { status: 400 })
    }

    const listing = await db.listing.deleteMany({
      where: {
        id: params.listingId,
        userId: currentUser.id,
      },
    })

    return NextResponse.json(listing)
  } catch (error) {
    console.log('[LISTING_ID_DELETE_ERROR]', error)
    throw new NextResponse('Internal Error', { status: 500 })
  }
}

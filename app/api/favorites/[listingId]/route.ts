import { NextResponse } from 'next/server'

import db from '@/lib/db'
import getCurrentUser from '@/actions/get-current-user'

export async function POST(
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

    let favoriteIds = [...(currentUser.favoriteIds || [])]

    favoriteIds.push(params.listingId)

    const user = await db.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoriteIds,
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.log('[LISTING_ID_POST_ERROR]', error)
    throw new NextResponse('Internal Error', { status: 500 })
  }
}

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

    let favoriteIds = [...(currentUser.favoriteIds || [])]

    favoriteIds = favoriteIds.filter((id) => id !== params.listingId)

    const user = await db.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoriteIds,
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.log('[LISTING_ID_DELETE_ERROR]', error)
    throw new NextResponse('Internal Error', { status: 500 })
  }
}

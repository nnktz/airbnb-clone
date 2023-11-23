import { NextResponse } from 'next/server'

import getCurrentUser from '@/actions/get-current-user'
import db from '@/lib/db'

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      throw new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { listingId, startDate, endDate, totalPrice } = body

    if (!listingId || !startDate || !endDate || !totalPrice) {
      return NextResponse.error()
    }

    const listingAndReservation = await db.listing.update({
      where: {
        id: listingId,
      },
      data: {
        reservations: {
          create: {
            userId: currentUser.id,
            startDate,
            endDate,
            totalPrice,
          },
        },
      },
    })

    return NextResponse.json(listingAndReservation)
  } catch (error) {
    console.log('[RESERVATIONS_POST_ERROR]', error)
    throw new NextResponse('Internal error', { status: 500 })
  }
}

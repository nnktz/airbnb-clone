import { NextResponse } from 'next/server'

import getCurrentUser from '@/actions/get-current-user'
import db from '@/lib/db'

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      reservationId: string
    }
  },
) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      throw new NextResponse('Unauthorized', { status: 401 })
    }

    if (!params.reservationId || typeof params.reservationId !== 'string') {
      throw new NextResponse('Invalid Id', { status: 400 })
    }

    const reservation = await db.reservation.deleteMany({
      where: {
        id: params.reservationId,
        OR: [
          { userId: currentUser.id },
          {
            listing: {
              userId: currentUser.id,
            },
          },
        ],
      },
    })

    return NextResponse.json(reservation)
  } catch (error) {
    console.log('[RESERVATION_ID_DELETE_ERROR]', error)
    throw new NextResponse('Internal Error', { status: 500 })
  }
}

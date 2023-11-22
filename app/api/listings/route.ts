import { NextResponse } from 'next/server'

import db from '@/lib/db'
import getCurrentUser from '@/actions/get-current-user'

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      throw new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const {
      title,
      description,
      price,
      imageSrc,
      category,
      guestCount,
      roomCount,
      bathroomCount,
      location,
    } = body

    Object.keys(body).forEach((value: any) => {
      if (!body[value]) {
        NextResponse.error()
      }
    })

    const listing = await db.listing.create({
      data: {
        title,
        description,
        price: parseInt(price, 10),
        imageSrc,
        category,
        guestCount,
        roomCount,
        bathroomCount,
        locationValue: location.value,
        userId: currentUser.id,
      },
    })

    return NextResponse.json(listing)
  } catch (error) {
    throw new NextResponse('Internal Error', { status: 500 })
  }
}

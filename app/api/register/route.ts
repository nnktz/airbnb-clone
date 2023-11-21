import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

import db from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name } = body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await db.user.create({
      data: {
        email,
        hashedPassword,
        name,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    throw new NextResponse('Internal Error', { status: 500 });
  }
}

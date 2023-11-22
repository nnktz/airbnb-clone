'use client'

import Image from 'next/image'
import Link from 'next/link'

export const Logo = () => {
  return (
    <Link href={'/'}>
      <div className="hidden transition hover:opacity-75 md:block">
        <Image src="/airbnb.svg" alt="Logo" height={100} width={100} />
      </div>
    </Link>
  )
}

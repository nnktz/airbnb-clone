'use client'

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

import { cn } from '@/lib/utils'
import { SafeUser } from '@/types'
import useFavorite from '@/hooks/useFavorite'

interface HeartButtonProps {
  listingId: string
  currentUser?: SafeUser | null
}

export const HeartButton = ({ listingId, currentUser }: HeartButtonProps) => {
  const { toggleFavorite, hasFavorited } = useFavorite({
    listingId,
    currentUser,
  })

  return (
    <div
      role="button"
      onClick={toggleFavorite}
      className="relative transition hover:opacity-75"
    >
      <AiOutlineHeart
        size={28}
        className="absolute -right-[2px] -top-[2px] fill-white"
      />

      <AiFillHeart
        size={24}
        className={cn('fill-neutral-500/70', hasFavorited && 'fill-rose-500')}
      />
    </div>
  )
}

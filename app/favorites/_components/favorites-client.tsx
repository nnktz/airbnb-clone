'use client'

import { SafeListing, SafeUser } from '@/types'

import { Container } from '@/components/container'
import { Heading } from '@/components/heading'
import { ListingCard } from '@/components/listing-card'

interface FavoritesClientProps {
  favoriteListings: SafeListing[]
  currentUser?: SafeUser | null
}

export const FavoritesClient = ({
  favoriteListings,
  currentUser,
}: FavoritesClientProps) => {
  return (
    <Container>
      <Heading
        title="Favorites"
        subtitle="List of places you have favorited."
      />

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {favoriteListings.map((favorite) => (
          <ListingCard
            key={favorite.id}
            currentUser={currentUser}
            data={favorite}
          />
        ))}
      </div>
    </Container>
  )
}

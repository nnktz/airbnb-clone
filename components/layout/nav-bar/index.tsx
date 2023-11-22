'use client'

import { SafeUser } from '@/types'

import { Container } from '@/components/container'
import { Logo } from '@/components/logo'
import { Search } from './search'
import { UserMenu } from './user-menu'
import { Categories } from './categories'

interface NavBarProps {
  currentUser?: SafeUser | null
}

export const NavBar = ({ currentUser }: NavBarProps) => {
  return (
    <div className="fixed z-10 w-full bg-white shadow-sm">
      <div className="border-b-[1px] py-4">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>

      <Categories />
    </div>
  )
}

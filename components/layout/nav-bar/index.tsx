'use client';

import { User } from '@prisma/client';

import { Container } from '@/components/container';
import { Logo } from '@/components/logo';
import { Search } from './search';
import { UserMenu } from './user-menu';

interface NavBarProps {
  currentUser?: User | null;
}

export const NavBar = ({ currentUser }: NavBarProps) => {
  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
      <div className='py-4 border-b-[1px]'>
        <Container>
          <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </div>
  );
};

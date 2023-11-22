'use client'

import { AiOutlineMenu } from 'react-icons/ai'
import { useCallback, useState } from 'react'
import { signOut } from 'next-auth/react'

import { useRegisterModal } from '@/hooks/use-register-modal'
import { useLoginModal } from '@/hooks/use-login-modal'
import { useRentModal } from '@/hooks/use-rent-modal'
import { SafeUser } from '@/types'

import { Avatar } from '@/components/avatar'
import { MenuItem } from './menu-item'

interface UserMenuProps {
  currentUser?: SafeUser | null
}

export const UserMenu = ({ currentUser }: UserMenuProps) => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const rentModal = useRentModal()

  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value)
  }, [])

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen()
    }

    rentModal.onOpen()
  }, [currentUser, loginModal, rentModal])

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          role="button"
          onClick={onRent}
          className="hidden rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 md:block"
        >
          Airbnb your home
        </div>

        <div
          role="button"
          onClick={toggleOpen}
          className="flex flex-row items-center gap-3 rounded-full border-[1px] border-neutral-200 p-4 transition hover:shadow-md md:px-2 md:py-1"
        >
          <AiOutlineMenu />

          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-md md:w-3/4">
          <div className="flex cursor-pointer flex-col">
            {currentUser ? (
              <>
                <MenuItem onClick={() => {}} label="My trips" />

                <MenuItem onClick={() => {}} label="My favorites" />

                <MenuItem onClick={() => {}} label="My reservations" />

                <MenuItem onClick={() => {}} label="My properties" />

                <MenuItem
                  onClick={() => {
                    rentModal.onOpen()
                    setTimeout(() => {
                      setIsOpen(false)
                    }, 100)
                  }}
                  label="Airbnb my home"
                />

                <hr />

                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem
                  onClick={() => {
                    loginModal.onOpen()
                    setTimeout(() => {
                      setIsOpen(false)
                    }, 100)
                  }}
                  label="Login"
                />

                <MenuItem
                  onClick={() => {
                    registerModal.onOpen()
                    setTimeout(() => {
                      setIsOpen(false)
                    }, 100)
                  }}
                  label="Sign up"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

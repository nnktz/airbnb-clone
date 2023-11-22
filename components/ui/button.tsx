'use client'

import { IconType } from 'react-icons'

import { cn } from '@/lib/utils'

interface ButtonProps {
  label: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  outline?: boolean
  small?: boolean
  icon?: IconType
}

export const Button = ({
  label,
  onClick,
  type,
  disabled,
  outline,
  small,
  icon: Icon,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={cn(
        'relative w-full select-none rounded-lg transition hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-60',
        outline
          ? 'border-black bg-white text-black'
          : 'border-rose-500 bg-rose-500 text-white',
        small
          ? 'border-[1px] py-1 text-sm font-light'
          : 'border-2 py-3 text-base font-semibold',
      )}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {label}
    </button>
  )
}

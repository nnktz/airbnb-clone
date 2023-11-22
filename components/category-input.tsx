'use client'

import { cn } from '@/lib/utils'
import { IconType } from 'react-icons'

interface CategoryInputProps {
  icon: IconType
  label: string
  selected?: boolean
  onClick: (value: string) => void
}

export const CategoryInput = ({
  icon: Icon,
  label,
  selected,
  onClick,
}: CategoryInputProps) => {
  return (
    <div
      role="button"
      onClick={() => onClick(label)}
      className={cn(
        'flex flex-col gap-3 rounded-xl border-2 border-neutral-200 p-4 transition hover:border-black',
        selected && 'border-black',
      )}
    >
      <Icon size={30} />

      <div className="font-semibold">{label}</div>
    </div>
  )
}

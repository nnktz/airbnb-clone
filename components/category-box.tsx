'use client'

import qs from 'query-string'
import { useRouter, useSearchParams } from 'next/navigation'
import { IconType } from 'react-icons'
import { useCallback } from 'react'

import { cn } from '@/lib/utils'

interface CategoryBoxProps {
  label: string
  icon: IconType
  selected?: boolean
}

export const CategoryBox = ({
  label,
  icon: Icon,
  selected,
}: CategoryBoxProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleClick = useCallback(() => {
    let currentQuery = {}

    if (searchParams) {
      currentQuery = qs.parse(searchParams.toString())
    }

    const updateQuery: any = {
      ...currentQuery,
      category: label,
    }

    if (searchParams?.get('category') === label) {
      delete updateQuery?.category
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updateQuery,
      },
      {
        skipNull: true,
      },
    )

    router.push(url)
  }, [label, searchParams, router])

  return (
    <div
      role="button"
      onClick={handleClick}
      className={cn(
        'flex flex-col items-center justify-center gap-2 border-b-2 border-transparent p-3 text-neutral-500 transition hover:text-neutral-800',
        selected && 'border-b-neutral-800 text-neutral-800',
      )}
    >
      <Icon size={26} />

      <div className="text-sm font-semibold">{label}</div>
    </div>
  )
}

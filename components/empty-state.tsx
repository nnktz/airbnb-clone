'use client'

import { useRouter } from 'next/navigation'
import { Heading } from './heading'
import { Button } from './ui/button'

interface EmptyStateProps {
  title?: string
  subTitle?: string
  showReset?: boolean
}

export const EmptyState = ({
  title = 'No exact matches',
  subTitle = 'Try changing or removing some of filters',
  showReset,
}: EmptyStateProps) => {
  const router = useRouter()

  return (
    <div className="flex h-[60vh] flex-col items-center justify-center gap-2">
      <Heading title={title} subtitle={subTitle} center />

      <div className="mt-4 w-48">
        {showReset && (
          <Button
            outline
            label="Remove all filters"
            onClick={() => router.push('/')}
          />
        )}
      </div>
    </div>
  )
}

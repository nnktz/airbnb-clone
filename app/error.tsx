'use client'

import { EmptyState } from '@/components/empty-state'
import { useEffect } from 'react'

interface ErrorStateProps {
  error: Error
}

const ErrorState = ({ error }: ErrorStateProps) => {
  useEffect(() => {
    console.log(error)
  }, [error])

  return <EmptyState title="Oh no" subTitle="Something went wrong." />
}

export default ErrorState

'use client'

import { Heading } from '@/components/heading'
import { Input } from '@/components/ui/input'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface PriceContentProps {
  register: UseFormRegister<FieldValues>
  errors: FieldErrors<FieldValues>
  isLoading: boolean
}

export const PriceContent = ({
  register,
  errors,
  isLoading,
}: PriceContentProps) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Now, set your place"
        subtitle="How much do you charge per night?"
      />

      <Input
        id="price"
        label="Price"
        formatPrice
        type="number"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )
}

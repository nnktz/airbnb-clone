'use client'

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

import { Heading } from '@/components/heading'
import { Input } from '@/components/ui/input'

interface DescriptionContentProps {
  register: UseFormRegister<FieldValues>
  errors: FieldErrors<FieldValues>
  isLoading: boolean
}

export const DescriptionContent = ({
  register,
  errors,
  isLoading,
}: DescriptionContentProps) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="How would you describe your place?"
        subtitle="Short and sweet works best!"
      />

      <Input
        id="title"
        label="Title"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <hr />

      <Input
        id="description"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )
}

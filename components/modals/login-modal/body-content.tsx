'use client'

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

import { Heading } from '@/components/heading'
import { Input } from '@/components/ui/input'

interface BodyContentProps {
  isLoading: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors<FieldValues>
}

export const BodyContent = ({
  isLoading,
  register,
  errors,
}: BodyContentProps) => {
  return (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account!" />

      <Input
        id="email"
        type="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )
}

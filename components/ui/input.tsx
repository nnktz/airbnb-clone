'use client'

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import { BiDollar } from 'react-icons/bi'

import { cn } from '@/lib/utils'

interface InputProps {
  id: string
  label: string
  type?: string
  disabled?: boolean
  formatPrice?: boolean
  required?: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
}

export const Input = ({
  id,
  label,
  type = 'text',
  disabled,
  formatPrice,
  register,
  required,
  errors,
}: InputProps) => {
  return (
    <div className="relative w-full">
      {formatPrice && (
        <BiDollar
          size={24}
          className="absolute left-2 top-5 text-neutral-700"
        />
      )}

      <input
        type={type}
        id={id}
        disabled={disabled}
        placeholder=""
        {...register(id, { required })}
        className={cn(
          'peer w-full rounded-md border-2 bg-white p-4 pt-6 font-light outline-none transition disabled:cursor-not-allowed disabled:opacity-75',
          formatPrice ? 'pl-9' : 'pl-4',
          errors[id]
            ? 'border-rose-500 focus:border-rose-500'
            : 'border-x-neutral-300 focus:border-black',
        )}
      />

      <label
        className={cn(
          'absolute top-5 z-10 origin-[0] -translate-y-3 transform text-base duration-500 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75',
          formatPrice ? 'left-9' : 'left-4',
          errors[id] ? 'text-rose-500' : 'text-zinc-400',
        )}
      >
        {label}
      </label>
    </div>
  )
}

'use client';

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { BiDollar } from 'react-icons/bi';

import { cn } from '@/lib/utils';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
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
    <div className='w-full relative'>
      {formatPrice && (
        <BiDollar
          size={24}
          className='text-neutral-700 absolute top-5 left-2'
        />
      )}

      <input
        type={type}
        id={id}
        disabled={disabled}
        placeholder=''
        {...register(id, { required })}
        className={cn(
          'peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-75 disabled:cursor-not-allowed',
          formatPrice ? 'pl-9' : 'pl-4',
          errors[id]
            ? 'border-rose-500 focus:border-rose-500'
            : 'border-x-neutral-300 focus:border-black'
        )}
      />

      <label
        className={cn(
          'absolute text-base duration-500 transform -translate-y-3 top-5 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4',
          formatPrice ? 'left-9' : 'left-4',
          errors[id] ? 'text-rose-500' : 'text-zinc-400'
        )}>
        {label}
      </label>
    </div>
  );
};

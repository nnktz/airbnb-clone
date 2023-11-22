'use client'

import toast from 'react-hot-toast'
import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

import { useLoginModal } from '@/hooks/use-login-modal'

import { Modal } from '../modal'
import { BodyContent } from './body-content'
import { FooterContent } from './footer-content'

export const LoginModal = () => {
  const router = useRouter()
  const isOpen = useLoginModal((state) => state.isOpen)
  const onClose = useLoginModal((state) => state.onClose)

  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data: any) => {
    setIsLoading(true)

    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false)

      if (callback?.ok) {
        toast.success('Logged in.')
        reset()
        onClose()
        router.refresh()
      }

      if (callback?.error) {
        toast.error(callback.error)
      }
    })
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      title="Login"
      actionLabel="Continue"
      body={
        <BodyContent
          isLoading={isLoading}
          register={register}
          errors={errors}
        />
      }
      footer={<FooterContent />}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  )
}

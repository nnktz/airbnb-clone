'use client'

import axios from 'axios'
import toast from 'react-hot-toast'
import { useCallback, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import { useRegisterModal } from '@/hooks/use-register-modal'
import { useLoginModal } from '@/hooks/use-login-modal'

import { Modal } from '../modal'
import { BodyContent } from './body-content'
import { FooterContent } from './footer-content'

export const RegisterModal = () => {
  const router = useRouter()
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()

  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const toggle = useCallback(() => {
    registerModal.onClose()
    router.refresh()
    loginModal.onOpen()
  }, [loginModal, registerModal, router])

  const onSubmit: SubmitHandler<FieldValues> = async (data: any) => {
    try {
      setIsLoading(true)

      await axios.post('api/register', data).then((response) => {
        toast.success('Register success.')
        reset()
        toggle()
      })
    } catch (error: any) {
      toast.error('Something went wrong.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      body={
        <BodyContent
          isLoading={isLoading}
          register={register}
          errors={errors}
        />
      }
      footer={<FooterContent />}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  )
}

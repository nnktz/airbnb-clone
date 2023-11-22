'use client'

import { useMemo, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'

import { useRentModal } from '@/hooks/use-rent-modal'

import { Modal } from '../modal'
import { BodyContent } from './body-content'

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

export const RentModal = () => {
  const isOpen = useRentModal((state) => state.isOpen)
  const onClose = useRentModal((state) => state.onClose)

  const [step, setStep] = useState(STEPS.CATEGORY)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
    },
  })

  const category = watch('category')

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  const onBack = () => {
    setStep((value) => value - 1)
  }

  const onNext = () => {
    setStep((value) => value + 1)
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create'
    }

    return 'Next'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined
    }

    return 'Back'
  }, [step])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={() => {}}
      actionLabel="Submit"
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title="Airbnb your home"
      body={
        <BodyContent
          category={category}
          setCustomValue={(category) => setCustomValue('category', category)}
        />
      }
    />
  )
}

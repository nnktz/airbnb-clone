'use client'

import axios from 'axios'
import toast from 'react-hot-toast'
import { useMemo, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import { useRentModal } from '@/hooks/use-rent-modal'

import { Modal } from '../modal'
import { CategoryContent } from './category-content'
import { LocationContent } from './location-content'
import { InfoContent } from './info-content'
import { ImagesContent } from './images-content'
import { DescriptionContent } from './description-content'
import { PriceContent } from './price-content'

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

export const RentModal = () => {
  const router = useRouter()
  const isOpen = useRentModal((state) => state.isOpen)
  const onClose = useRentModal((state) => state.onClose)

  const [step, setStep] = useState(STEPS.CATEGORY)
  const [isLoading, setIsLoading] = useState(false)

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
      title: '',
      description: '',
      price: 1,
    },
  })

  const category = watch('category')
  const location = watch('location')
  const guestCount = watch('guestCount')
  const roomCount = watch('roomCount')
  const bathroomCount = watch('bathroomCount')
  const imageSrc = watch('imageSrc')

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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      if (step !== STEPS.PRICE) {
        return onNext()
      }

      setIsLoading(true)

      await axios.post('/api/listings', data).then((response) => {
        toast.success('Listing created.')
        reset()
        setStep(STEPS.CATEGORY)
        onClose()
        router.refresh()
      })
    } catch (error) {
      toast.error('Something went wrong.')
    } finally {
      setIsLoading(false)
    }
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

  let bodyContent = (
    <CategoryContent
      category={category}
      setCustomValue={(category) => setCustomValue('category', category)}
    />
  )

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <LocationContent
        location={location}
        setCustomValue={(value) => setCustomValue('location', value)}
      />
    )
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <DescriptionContent
        isLoading={isLoading}
        register={register}
        errors={errors}
      />
    )
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <PriceContent isLoading={isLoading} register={register} errors={errors} />
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <InfoContent
        guestCount={guestCount}
        roomCount={roomCount}
        bathroomCount={bathroomCount}
        setCustomValueGuest={(value) => setCustomValue('guestCount', value)}
        setCustomValueRoom={(value) => setCustomValue('roomCount', value)}
        setCustomValueBathroom={(value) =>
          setCustomValue('bathroomCount', value)
        }
      />
    )
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <ImagesContent
        imageSrc={imageSrc}
        setCustomValue={(value) => setCustomValue('imageSrc', value)}
      />
    )
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title="Airbnb your home"
      body={bodyContent}
    />
  )
}

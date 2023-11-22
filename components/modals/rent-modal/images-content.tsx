'use client'

import { Heading } from '@/components/heading'
import { ImageUpload } from '@/components/image-upload'

interface ImagesContentProps {
  setCustomValue: (value: string) => void
  imageSrc: any
}

export const ImagesContent = ({
  setCustomValue,
  imageSrc,
}: ImagesContentProps) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Add a photo of your place"
        subtitle="Show guests what your place looks like!"
      />

      <ImageUpload value={imageSrc} onChange={setCustomValue} />
    </div>
  )
}
